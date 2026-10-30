import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHead from './SectionHead'
import { WORK, EDUCATION, LEADERSHIP } from '../data'

const QUESTS = [
  { group: 'main quest', id: 'ifs', title: WORK.company, meta: WORK.duration, status: 'active' },
  ...EDUCATION.map(e => ({ group: 'education', id: e.id, title: e.title, meta: e.duration, status: e.status === 'complete' ? 'done' : 'active' })),
  { group: 'guild roles', id: 'guild', title: 'Leadership & communities', meta: `${LEADERSHIP.length} roles`, status: 'done' },
]

function Detail({ id }) {
  if (id === 'ifs') {
    return (
      <>
        <span className="pixel-chip pixel-chip--live"><span className="live-dot" /> quest active</span>
        <h3 className="quest-title">{WORK.role}</h3>
        <p className="quest-org">{WORK.company} · {WORK.location}</p>
        <p className="pixel-label quest-when">{WORK.duration}</p>
        <p className="pixel-label quest-sub">objectives</p>
        <ul className="objectives">
          {WORK.points.map((pt, i) => (
            <motion.li
              key={pt}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.06 }}
            >
              <motion.span
                className="check"
                initial={{ background: 'rgba(16,185,129,0)' }}
                animate={{ background: 'rgba(16,185,129,1)' }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.01 }}
              >✓</motion.span>
              {pt}
            </motion.li>
          ))}
        </ul>
        <p className="pixel-label quest-sub">loot</p>
        <div className="powerups">{WORK.tech.map(t => <span key={t} className="powerup" style={{ '--c': '#10b981' }}>{t}</span>)}</div>
      </>
    )
  }
  if (id === 'guild') {
    return (
      <>
        <span className="pixel-chip">side quests</span>
        <h3 className="quest-title">Leadership & communities</h3>
        <p className="quest-org">Roles outside the code editor.</p>
        <div className="guild">
          {LEADERSHIP.map((l, i) => (
            <motion.div key={l.role + l.org} className="guild-row" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <span className="guild-role">{l.role}</span>
              <span className="guild-org">{l.org}</span>
            </motion.div>
          ))}
        </div>
      </>
    )
  }
  const e = EDUCATION.find(x => x.id === id)
  return (
    <>
      <span className={`pixel-chip ${e.status !== 'complete' ? 'pixel-chip--live' : ''}`}>{e.status === 'complete' ? '✓ quest complete' : 'in progress'}</span>
      <h3 className="quest-title">{e.title}</h3>
      <p className="quest-org">{e.org}</p>
      <p className="pixel-label quest-when">{e.duration}</p>
      <p className="pixel-label quest-sub">reward</p>
      <motion.div className="reward" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}>
        <span className="reward-star">★</span> {e.reward}
      </motion.div>
    </>
  )
}

export default function Experience() {
  const [sel, setSel] = useState('ifs')
  let lastGroup = null

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead eyebrow="02 — experience" title="Quest log" sub="Select a quest to see the details." />
        <div className="quest">
          <div className="quest-list" role="tablist">
            {QUESTS.map(q => {
              const header = q.group !== lastGroup ? (lastGroup = q.group) : null
              return (
                <div key={q.id}>
                  {header && <p className="pixel-label quest-group">{header}</p>}
                  <button
                    role="tab"
                    aria-selected={sel === q.id}
                    className={`quest-item ${sel === q.id ? 'is-sel' : ''}`}
                    onClick={() => setSel(q.id)}
                  >
                    <span className={`quest-dot ${q.status}`} />
                    <span className="quest-item-title">{q.title}</span>
                    <span className="quest-item-meta pixel-label">{q.meta}</span>
                  </button>
                </div>
              )
            })}
          </div>
          <div className="quest-detail">
            <AnimatePresence mode="wait">
              <motion.div key={sel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <Detail id={sel} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
