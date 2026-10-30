import { useState } from 'react'
import { Github, Linkedin, Mail, Copy, Check } from 'lucide-react'
import SectionHead from './SectionHead'
import { PROFILE } from '../data'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  const submit = (e) => {
    e.preventDefault()
    setStatus('sending')
    window.dispatchEvent(new CustomEvent('byte', { detail: { action: 'deliver', text: `special delivery for Anusigan! ✉` } }))
    const subject = encodeURIComponent(`Hello from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    setTimeout(() => {
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    }, 1100)
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHead eyebrow="06 — contact" title="Let's build something" sub="Based in Sri Lanka, open to remote roles and collaborations worldwide. Byte will carry your message." />
        <div className="contact">
          <div className="contact-info">
            <div className="contact-card">
              <span className="pixel-label">email</span>
              <div className="contact-email">
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                <button className="icon-pixel" onClick={copy} aria-label="Copy email address" title="Copy email">
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>
              {copied && <span className="pixel-label" style={{ color: 'var(--accent)' }}>copied to clipboard ✓</span>}
            </div>
            <div className="contact-card">
              <span className="pixel-label">phone</span>
              <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}>{PROFILE.phone}</a>
            </div>
            <div className="contact-card">
              <span className="pixel-label">location</span>
              <span>{PROFILE.location}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {[
                { icon: Github, href: PROFILE.github, label: 'GitHub' },
                { icon: Linkedin, href: PROFILE.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${PROFILE.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label} className="icon-pixel"><Icon size={16} /></a>
              ))}
            </div>
          </div>

          <form className="letter" onSubmit={submit}>
            <div className="letter-head">
              <span className="pixel-label">new_message.txt</span>
              <span className="pixel-label" style={{ color: 'var(--text-3)' }}>to: anusigan</span>
            </div>
            <div className="letter-row">
              <label className="field">
                <span className="pixel-label">name</span>
                <input value={form.name} onChange={set('name')} required placeholder="Ada Lovelace" />
              </label>
              <label className="field">
                <span className="pixel-label">email</span>
                <input type="email" value={form.email} onChange={set('email')} required placeholder="you@company.com" />
              </label>
            </div>
            <label className="field">
              <span className="pixel-label">message</span>
              <textarea value={form.message} onChange={set('message')} required rows={5} placeholder="What are you working on?" />
            </label>
            <button type="submit" className="btn-pixel" disabled={status === 'sending'} style={{ justifyContent: 'center' }}>
              {status === 'sending' ? 'byte is running…' : status === 'sent' ? 'delivered ✓ check your mail app' : '▶ hand it to byte'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
