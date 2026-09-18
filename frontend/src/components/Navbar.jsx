import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActive(href)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(5,5,8,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(124,58,237,0.12)' : 'none',
          transition: 'all 0.4s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.1rem', fontWeight: 700,
              background: 'linear-gradient(90deg, #a78bfa, #38bdf8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              textDecoration: 'none', cursor: 'pointer'
            }}
          >
            &lt;Anusigan /&gt;
          </motion.a>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="nav-desktop">
            {links.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                whileHover={{ color: '#a78bfa' }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: active === link.href ? '#a78bfa' : 'var(--text-secondary)',
                  fontSize: '0.9rem', fontWeight: 500, padding: '8px 14px',
                  borderRadius: '8px', fontFamily: 'Inter',
                  transition: 'color 0.2s'
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              href="mailto:sivananthan.20230297@iit.ac.lk"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              style={{ padding: '9px 20px', fontSize: '0.88rem', marginLeft: '8px' }}
            >
              Hire Me
            </motion.a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile-btn"
            style={{
              background: 'none', border: '1px solid var(--border-hover)',
              borderRadius: '8px', padding: '8px', cursor: 'pointer',
              color: 'var(--text-primary)', display: 'none'
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 999,
              background: 'rgba(5,5,8,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)', padding: '16px 24px 24px',
              display: 'flex', flexDirection: 'column', gap: '4px'
            }}
          >
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 500,
                  padding: '12px 0', textAlign: 'left', fontFamily: 'Inter',
                  borderBottom: '1px solid var(--border)'
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
