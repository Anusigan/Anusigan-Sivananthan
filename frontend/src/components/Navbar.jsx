import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { scrollToId } from '../smoothScroll'

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact']
    const navIds = links.map(l => l.href.slice(1))
    const observers = sections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(navIds.includes(id) ? '#' + id : '') },
        { rootMargin: '-40% 0px -50% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const scrollTo = (href) => {
    scrollToId(href.slice(1))
    setActive(href)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        x: '-50%',
        zIndex: 1000,
        background: '#050a08',
        border: '2px solid #1d2a23',
        padding: '5px',
        display: 'flex',
        gap: '2px',
        boxShadow: '4px 4px 0 rgba(16,185,129,0.15)',
      }}
    >
      {links.map(link => (
        <button
          key={link.href}
          onClick={() => scrollTo(link.href)}
          style={{
            background: active === link.href ? 'var(--accent)' : 'transparent',
            border: 'none',
            padding: '9px clamp(9px, 3vw, 16px)',
            color: active === link.href ? '#02140c' : '#71717a',
            fontSize: '0.72rem',
            letterSpacing: '0.04em',
            fontFamily: "'Silkscreen', monospace",
            textTransform: 'lowercase',
            transition: 'background 0.1s steps(2), color 0.1s',
            whiteSpace: 'nowrap',
          }}
        >
          {link.label}
        </button>
      ))}
    </motion.nav>
  )
}
