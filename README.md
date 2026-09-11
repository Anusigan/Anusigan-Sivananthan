# Anusigan Sivananthan — Portfolio

A two-part app:

- **`/frontend`** — React (Vite) single-page site. All copy comes from the API, not hardcoded.
- **`/backend`** — Express API that serves the portfolio content (`/api/content`) and handles
  the contact form (`/api/contact`), saving submissions to `backend/db.json` and optionally
  emailing you if SMTP is configured.

## Run it locally

```bash
# 1. backend
cd backend
npm install
cp .env.example .env      # edit if you want email notifications, otherwise leave as is
npm run dev                # http://localhost:4000

# 2. frontend (new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev                 # http://localhost:5173
```

Open http://localhost:5173 — the page fetches its content from the API on load.

## Updating content

Everything on the page — profile text, experience, projects, skills, education,
achievements, certifications, leadership — lives in **`backend/data.json`**.
Edit that file and restart the backend; no React code changes needed.

## Contact form

`POST /api/contact` accepts `{ name, email, message }`, validates it, rate-limits
by IP, and stores it in `backend/db.json`. If you fill in `SMTP_HOST` / `SMTP_USER`
/ `SMTP_PASS` in `backend/.env`, it will also email you a copy via `nodemailer`
(works with Gmail app passwords, SendGrid, Resend's SMTP, etc.).

## Deploying

GitHub Pages only serves static files, so it can host `/frontend`'s production
build but **not** the Express backend. A simple split that works well:

- **Backend** → Render, Railway, or Fly.io (all have a free/cheap tier for a small
  Node API). Set the environment variables from `backend/.env.example` there.
- **Frontend** → build with `npm run build` inside `/frontend`, then deploy the
  resulting `dist/` folder to GitHub Pages, Vercel, or Netlify. Set `VITE_API_URL`
  to your deployed backend's URL before building.

```bash
cd frontend
VITE_API_URL=https://your-backend.onrender.com npm run build
```

If you'd rather keep everything on one host, Render and Railway can also serve
the built frontend directly from the Express app (add `express.static` for
`frontend/dist` in `server.js`) — ask if you want that wired up.