import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim());

// ---------- content (read-only reference data) ----------
const content = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8')
);

// ---------- contact submissions store (lowdb / JSON file) ----------
const dbFile = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { submissions: [] });
await db.read();
db.data ||= { submissions: [] };
await db.write();

// ---------- optional email notification ----------
const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

// ---------- app ----------
const app = express();
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: '20kb' }));

// simple in-memory rate limit for the contact endpoint (per IP)
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const max = 5;
  const record = hits.get(ip) || { count: 0, start: now };
  if (now - record.start > windowMs) {
    record.count = 0;
    record.start = now;
  }
  record.count += 1;
  hits.set(ip, record);
  return record.count > max;
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/content', (_req, res) => {
  res.json(content);
});

app.get('/api/projects', (_req, res) => res.json(content.projects));
app.get('/api/skills', (_req, res) => res.json(content.skills));

app.post('/api/contact', async (req, res) => {
  const ip = req.ip;
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many requests. Try again later.' });
  }

  const { name, email, message, honeypot } = req.body || {};

  // honeypot field: real users never fill this in; bots often do
  if (honeypot) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email and message are required.' });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ ok: false, error: 'That email address doesn\'t look valid.' });
  }
  if (message.length > 4000) {
    return res.status(400).json({ ok: false, error: 'Message is too long.' });
  }

  const submission = {
    id: nanoid(),
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    message: String(message).slice(0, 4000),
    receivedAt: new Date().toISOString(),
  };

  db.data.submissions.push(submission);
  await db.write();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Portfolio contact form" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO_EMAIL || content.profile.email,
        replyTo: submission.email,
        subject: `New portfolio message from ${submission.name}`,
        text: submission.message,
      });
    } catch (err) {
      // Submission is already saved to db.json even if email delivery fails.
      console.error('Email send failed:', err.message);
    }
  }

  res.status(201).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Portfolio API listening on http://localhost:${PORT}`);
  if (!smtpConfigured) {
    console.log('SMTP not configured - contact submissions will be saved to backend/db.json only.');
  }
});
