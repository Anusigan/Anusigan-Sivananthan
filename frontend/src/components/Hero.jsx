import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react'

const roles = ["Full Stack Developer", "AI Enthusiast", "Problem Solver", "CS Undergraduate"]

function Typewriter({ words }) {
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const word = words[idx]
    const speed = deleting ? 50 : 90

    const timer = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setText(word.substring(0, charIdx + 1))
        setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === word.length) {
        setTimeout(() => setDeleting(true), 1800)
      } else if (deleting && charIdx > 0) {
        setText(word.substring(0, charIdx - 1))
        setCharIdx(c => c - 1)
      } else if (deleting && charIdx === 0) {
        setDeleting(false)
        setIdx(i => (i + 1) % words.length)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, idx, words])

  return (
    <span style={{ color: '#a78bfa', fontWeight: 700 }}>
      {text}
      <span style={{ animation: 'blink 1s step-end infinite', color: '#06b6d4' }}>|</span>
    </span>
  )
}

function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const W = canvas.width = window.innerWidth
    const H = canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '124,58,237' : '6,182,212'
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`
        ctx.fill()
      })

      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(124,58,237,${0.1 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0
    }} />
  )
}

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.06) 0%, transparent 60%)'
    }}>
      <Particles />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '100px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.9rem', color: 'var(--accent-cyan)',
              letterSpacing: '0.15em', marginBottom: '16px'
            }}
          >
            👋 Hello, World! I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 900, lineHeight: 1.05,
              marginBottom: '16px', letterSpacing: '-0.02em'
            }}
          >
            <span className="gradient-text">Anusigan</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>Sivananthan</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', marginBottom: '28px', minHeight: '2rem' }}
          >
            <Typewriter words={roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              color: 'var(--text-secondary)', fontSize: '1.05rem',
              maxWidth: '560px', lineHeight: 1.7, marginBottom: '40px'
            }}
          >
            Passionate CS undergraduate & Trainee Software Engineer at{' '}
            <span style={{ color: '#a78bfa', fontWeight: 600 }}>IFS R&D</span>.
            Building intelligent systems where{' '}
            <span style={{ color: 'var(--accent-cyan)' }}>AI meets great engineering</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </motion.button>
            <motion.a
              href="mailto:sivananthan.20230297@iit.ac.lk"
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={16} /> Get In Touch
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            style={{ display: 'flex', gap: '16px', marginTop: '40px' }}
          >
            {[
              { icon: Github, href: 'https://github.com/Anusigan', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/Anusigan-Sivananthan', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:sivananthan.20230297@iit.ac.lk', label: 'Email' }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, color: '#a78bfa' }}
                title={label}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44, borderRadius: '10px',
                  border: '1px solid var(--border-hover)',
                  color: 'var(--text-secondary)', transition: 'all 0.2s'
                }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute', bottom: '40px', left: '50%',
            transform: 'translateX(-50%)', cursor: 'pointer'
          }}
          onClick={scrollToAbout}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
      `}</style>
    </section>
  )
}
