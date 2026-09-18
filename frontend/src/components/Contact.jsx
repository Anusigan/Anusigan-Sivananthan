import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    borderRadius: '10px', color: 'var(--text-primary)',
    fontSize: '0.95rem', fontFamily: 'Inter',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box'
  }

  return (
    <section id="contact" className="section" ref={ref} style={{ background: 'rgba(13,13,26,0.5)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <p className="section-label">06. Contact</p>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            I'm always open to new opportunities, collaborations, and conversations.
            Whether it's a job opportunity or just a hello — my inbox is always open.
          </p>
          <div className="divider" style={{ margin: '24px auto 0' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>
              Get In Touch
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.7 }}>
              Based in Sri Lanka, open to remote opportunities and internships worldwide. Let's build something amazing together.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              {[
                { icon: Mail, text: 'sivananthan.20230297@iit.ac.lk', href: 'mailto:sivananthan.20230297@iit.ac.lk' },
                { icon: Phone, text: '+94 775 810 310', href: 'tel:+94775810310' },
                { icon: MapPin, text: 'Wellawatte, Sri Lanka', href: null },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '10px',
                    background: 'rgba(124,58,237,0.12)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Icon size={16} color="#a78bfa" />
                  </div>
                  {href
                    ? <a href={href} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }} target={href.startsWith('mailto') || href.startsWith('tel') ? '_self' : '_blank'}>{text}</a>
                    : <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>{text}</span>
                  }
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: Github, href: 'https://github.com/Anusigan', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/Anusigan-Sivananthan', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:sivananthan.20230297@iit.ac.lk', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -3, color: '#a78bfa' }}
                  title={label}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 44, height: 44, borderRadius: '10px',
                    border: '1px solid var(--border-hover)',
                    color: 'var(--text-secondary)', transition: 'all 0.2s', textDecoration: 'none'
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Name</label>
                  <input
                    style={inputStyle}
                    placeholder="Your Name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Email</label>
                  <input
                    type="email"
                    style={inputStyle}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Message</label>
                <textarea
                  style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                  onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                className="btn btn-primary"
                style={{ justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? 'Sending...' : status === 'success'
                  ? <><CheckCircle size={16} /> Message Sent!</>
                  : <><Send size={16} /> Send Message</>
                }
              </motion.button>
              {status === 'error' && (
                <p style={{ color: '#f87171', fontSize: '0.85rem', textAlign: 'center' }}>
                  Failed to send. Please email me directly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
