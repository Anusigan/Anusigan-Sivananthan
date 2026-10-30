import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import SectionHead from './SectionHead'
import { PROJECTS, ACHIEVEMENTS, CERTIFICATIONS, LEADERSHIP, INTERESTS, PROFILE } from '../data'

const COMPETITIONS = ACHIEVEMENTS.filter(a => !/GCE|Foundation/.test(a.event))

const STATS = [
  { value: PROJECTS.length, suffix: '', label: 'projects shipped', back: PROJECTS.map(p => p.title) },
  { value: COMPETITIONS.length, suffix: '', label: 'competitions', back: COMPETITIONS.map(a => `${a.title} · ${a.event}`) },
  { value: CERTIFICATIONS.length, suffix: '', label: 'certifications', back: [...CERTIFICATIONS.slice(0, 4).map(c => c.name), `+${CERTIFICATIONS.length - 4} more`] },
  { value: 80.67, suffix: '%', label: 'level 4 average', back: ['Level 4: 80.67%', 'Level 5: 74.8%', 'Foundation: Distinction', "GCE O/L: 9 A's"] },
]

const SHEET = [
  ['name', PROFILE.name],
  ['class', 'Software Engineer'],
  ['guild', 'IFS R&D International'],
  ['base', 'Colombo, Sri Lanka'],
  ['level', 'Final-year CS @ IIT'],
  ['status', 'open to opportunities'],
]

function Count({ to, active, decimals }) {
  const [v, setV] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now) => {
      const k = Math.min(1, (now - start) / 1200)
      setV(to * (1 - Math.pow(1 - k, 3)))
      if (k < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [active, to])
  return v.toFixed(decimals)
}

function StatCard({ s, active }) {
  const [flip, setFlip] = useState(false)
  return (
    <button className={`stat ${flip ? 'is-flipped' : ''}`} onClick={() => setFlip(f => !f)} aria-pressed={flip}>
      <span className="stat-inner">
        <span className="stat-face stat-front">
          <span className="stat-value"><Count to={s.value} active={active} decimals={s.value % 1 ? 2 : 0} />{s.suffix}</span>
          <span className="pixel-label stat-label">{s.label}</span>
          <span className="pixel-label stat-hint">tap to flip ↻</span>
        </span>
        <span className="stat-face stat-back">
          {s.back.map(line => <span key={line} className="stat-line">▸ {line}</span>)}
        </span>
      </span>
    </button>
  )
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead eyebrow="03 — about" title="Character sheet" />
        <div className="sheet" ref={ref}>
          <div className="sheet-id">
            <div className="sheet-avatar" aria-hidden="true">
              <span>AS</span>
              <i className="sheet-lvl pixel-label">final yr</i>
            </div>
            <dl className="sheet-rows">
              {SHEET.map(([k, v]) => (
                <div key={k} className="sheet-row">
                  <dt className="pixel-label">{k}</dt>
                  <dd>{k === 'status' ? <><span className="live-dot" style={{ display: 'inline-block', marginRight: 8 }} />{v}</> : v}</dd>
                </div>
              ))}
            </dl>
            <div className="sheet-bio">
              <p>
                I&apos;m a final-year <strong>Computer Science undergraduate</strong> at IIT (University of Westminster) and a
                {' '}<strong>trainee software engineer at IFS R&D</strong>, where I deliver features in agile sprints, fix
                customer-reported defects, and build MCP tools for LUMOS to support AI-assisted engineering.
              </p>
              <p>
                I&apos;m drawn to problems where reliability meets intelligence: systems that are fast, maintainable and
                genuinely useful. Outside work you&apos;ll find me at hackathons, leading student teams, or shipping side projects.
              </p>
            </div>
          </div>

          <div className="sheet-side">
            <p className="pixel-label sheet-cap">stats</p>
            <div className="stats">
              {STATS.map(s => <StatCard key={s.label} s={s} active={inView} />)}
            </div>

            <p className="pixel-label sheet-cap">perks · areas of interest</p>
            <div className="perks">
              {INTERESTS.map(i => <span key={i} className="perk">✦ {i}</span>)}
            </div>

            <p className="pixel-label sheet-cap">party · {LEADERSHIP.length} guild roles</p>
            <p className="sheet-note">
              {LEADERSHIP.slice(0, 3).map(l => `${l.role} (${l.org})`).join(' · ')} and more in the quest log.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
