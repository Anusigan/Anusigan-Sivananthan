import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHead from './SectionHead'
import PixelIcon from './PixelIcon'
import { ACHIEVEMENTS, CERTIFICATIONS } from '../data'
import { SECRETS, getUnlocked } from '../secrets'

const TIER = { gold: '#fbbf24', silver: '#cbd5e1', bronze: '#f59e0b' }

function Badge({ a, i, live }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!live) return
    const id = setTimeout(() => setOpen(true), 250 + i * 220)
    return () => clearTimeout(id)
  }, [live, i])

  return (
    <div className={`badge ${open ? 'is-open' : ''}`} style={{ '--t': TIER[a.tier] }}>
      <div className="badge-inner">
        <div className="badge-face badge-locked">
          <PixelIcon name="lock" size={34} />
          <span className="pixel-label">???</span>
        </div>
        <div className="badge-face badge-front">
          <div className="badge-top">
            <PixelIcon name={a.icon} size={40} />
            <span className="pixel-label badge-year">{a.year}</span>
          </div>
          <span className="badge-title">{a.title}</span>
          <span className="badge-event">{a.event}</span>
          <span className="badge-org">{a.org}</span>
          <span className="pixel-label badge-tier">{a.tier}</span>
        </div>
      </div>
    </div>
  )
}

function VisitorAchievements() {
  const [found, setFound] = useState(() => new Set(getUnlocked()))
  useEffect(() => {
    const on = () => setFound(new Set(getUnlocked()))
    window.addEventListener('secret', on)
    return () => window.removeEventListener('secret', on)
  }, [])
  const pct = Math.round((found.size / SECRETS.length) * 100)

  return (
    <div className="visitor">
      <div className="visitor-head">
        <div>
          <p className="pixel-label" style={{ color: 'var(--accent)' }}>your achievements</p>
          <p className="visitor-count">{found.size}<span>/{SECRETS.length}</span> secrets found</p>
        </div>
        <div className="visitor-bar" aria-label={`${pct}% complete`}>
          {Array.from({ length: SECRETS.length }, (_, i) => <span key={i} className={i < found.size ? 'on' : ''} />)}
        </div>
      </div>
      <div className="visitor-grid">
        {SECRETS.map(s => {
          const got = found.has(s.id)
          return (
            <motion.div key={s.id} className={`secret ${got ? 'got' : ''}`} layout>
              <PixelIcon name={got ? 'trophy' : 'lock'} size={24} />
              <div>
                <span className="secret-title">{got ? s.title : '???'}</span>
                <span className="secret-hint">{got ? s.desc : `hint: ${s.hint}`}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [allCerts, setAllCerts] = useState(false)
  const certs = allCerts ? CERTIFICATIONS : CERTIFICATIONS.slice(0, 6)

  return (
    <section id="achievements" className="section">
      <div className="container">
        <SectionHead eyebrow="05 — achievements" title="Unlocked" sub="Competitions, ranks and grades, in the order they happened." />

        <div className="badges" ref={ref}>
          {ACHIEVEMENTS.map((a, i) => <Badge key={a.event} a={a} i={i} live={inView} />)}
        </div>

        <div className="certs">
          <div className="certs-head">
            <p className="pixel-label" style={{ color: 'var(--text-2)' }}>certifications · {CERTIFICATIONS.length} collected</p>
            <button className="pixel-label certs-toggle" onClick={() => setAllCerts(v => !v)}>
              {allCerts ? 'show less' : `show all ${CERTIFICATIONS.length}`}
            </button>
          </div>
          <div className="certs-grid">
            {certs.map((c, i) => (
              <motion.div key={c.name} className="cert" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}>
                <PixelIcon name="scroll" size={22} />
                <div>
                  <span className="cert-name">{c.name}</span>
                  <span className="cert-by">{c.by}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <VisitorAchievements />
      </div>
    </section>
  )
}
