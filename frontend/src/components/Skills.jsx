import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHead from './SectionHead'
import { SKILLS, usedIn, PROJECTS } from '../data'
import { scrollToId } from '../smoothScroll'

const TABS = [
  ['all', 'all'],
  ['language', 'languages'],
  ['framework', 'frameworks'],
  ['tool', 'tools'],
]
const KIND = { language: 'language', framework: 'framework / platform', tool: 'tool / infra' }
const COLS = 6

export default function Skills() {
  const [tab, setTab] = useState('all')
  const [sel, setSel] = useState(SKILLS[0])
  const items = useMemo(() => SKILLS.filter(s => tab === 'all' || s.kind === tab), [tab])
  const empties = (COLS - (items.length % COLS)) % COLS
  const uses = usedIn(sel)
  const projectTitles = new Set(PROJECTS.map(p => p.title))

  const openProject = (title) => {
    window.dispatchEvent(new CustomEvent('select-project', { detail: title }))
    scrollToId('projects')
  }

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead eyebrow="04 — skills" title="Inventory" sub={`${SKILLS.length} items. Hover or tap one to inspect it.`} />
        <div className="inv">
          <div>
            <div className="inv-tabs" role="tablist">
              {TABS.map(([k, label]) => (
                <button key={k} role="tab" aria-selected={tab === k} className={`inv-tab ${tab === k ? 'is-on' : ''}`} onClick={() => setTab(k)}>
                  {label}
                </button>
              ))}
            </div>
            <motion.div className="inv-grid" layout>
              <AnimatePresence initial={false}>
                {items.map(s => (
                  <motion.button
                    layout
                    key={s.name}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.18 }}
                    className={`slot ${sel.name === s.name ? 'is-sel' : ''}`}
                    style={{ '--c': s.color }}
                    onMouseEnter={() => setSel(s)}
                    onFocus={() => setSel(s)}
                    onClick={() => setSel(s)}
                    aria-label={s.name}
                  >
                    <span className="slot-mono">{s.short}</span>
                    <span className="slot-pip" />
                  </motion.button>
                ))}
                {Array.from({ length: empties }, (_, i) => <motion.span layout key={`e${i}`} className="slot slot--empty" />)}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="inspect">
            <p className="pixel-label" style={{ color: 'var(--text-3)' }}>item inspector</p>
            <AnimatePresence mode="wait">
              <motion.div key={sel.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <div className="inspect-top">
                  <span className="slot slot--big" style={{ '--c': sel.color }}><span className="slot-mono">{sel.short}</span></span>
                  <div>
                    <h3 className="inspect-name">{sel.name}</h3>
                    <span className="pixel-label" style={{ color: sel.color }}>{KIND[sel.kind]}</span>
                  </div>
                </div>
                <p className="pixel-label inspect-cap">equipped in</p>
                {uses.length ? (
                  <div className="inspect-uses">
                    {uses.map(u => projectTitles.has(u)
                      ? <button key={u} className="powerup powerup--link" style={{ '--c': sel.color }} onClick={() => openProject(u)}>{u} →</button>
                      : <span key={u} className="powerup" style={{ '--c': sel.color }}>{u}</span>)}
                  </div>
                ) : (
                  <p className="inspect-none">Part of the everyday toolkit across coursework, hackathons and side projects.</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
