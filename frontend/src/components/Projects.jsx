import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, Github, Star } from 'lucide-react'
import SectionHead from './SectionHead'
import PixelIcon, { drawIcon } from './PixelIcon'
import { PROJECTS, PROFILE } from '../data'
import { unlock } from '../secrets'

const SW = 160
const SH = 96
const RES = 3

const hex = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
const shade = (h, k) => `rgb(${hex(h).map(v => Math.round(v * k)).join(',')})`

function ConsoleScreen({ project, booting }) {
  const ref = useRef(null)
  const state = useRef({ project, booting })
  state.current = { project, booting }

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    ctx.setTransform(RES, 0, 0, RES, 0, 0)
    ctx.imageSmoothingEnabled = false
    const stars = Array.from({ length: 34 }, () => ({ x: Math.random() * SW, y: Math.random() * 70, s: 0.2 + Math.random() * 0.9 }))
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    let raf, last = 0, scroll = 0
    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      if (!visible || t - last < 33) return
      last = t
      const { project: p, booting: b } = state.current
      if (b) {
        for (let y = 0; y < SH; y += 2) for (let x = 0; x < SW; x += 2) {
          const v = Math.random() * 255 | 0
          ctx.fillStyle = `rgb(${v * 0.3 | 0},${v * 0.6 | 0},${v * 0.45 | 0})`
          ctx.fillRect(x, y, 2, 2)
        }
        return
      }
      scroll += 0.6
      const top = hex('#04070a'), bot = hex(p.color).map(v => v * 0.35)
      for (let y = 0; y < SH; y += 2) {
        const k = y / SH
        ctx.fillStyle = `rgb(${top.map((v, i) => Math.round(v + (bot[i] - v) * k)).join(',')})`
        ctx.fillRect(0, y, SW, 2)
      }
      stars.forEach(s => {
        s.x -= s.s
        if (s.x < 0) { s.x = SW; s.y = Math.random() * 70 }
        ctx.fillStyle = `rgba(255,255,255,${0.3 + s.s * 0.6})`
        ctx.fillRect(Math.round(s.x), Math.round(s.y), 1, 1)
      })
      for (let x = 0; x < SW; x++) {
        const h1 = 10 + Math.round(Math.sin((x + scroll * 0.5) / 14) * 4 + Math.sin((x + scroll * 0.5) / 5) * 1.5)
        ctx.fillStyle = shade(p.color, 0.28)
        ctx.fillRect(x, SH - h1 - 6, 1, h1 + 6)
        const h2 = 5 + Math.round(Math.sin((x + scroll) / 9) * 2)
        ctx.fillStyle = shade(p.color, 0.5)
        ctx.fillRect(x, SH - h2, 1, h2)
      }
      const bob = Math.round(Math.sin(t / 400) * 2)
      ctx.fillStyle = 'rgba(0,0,0,0.35)'
      ctx.fillRect(16, 78, 32, 3)
      drawIcon(ctx, p.icon, 16, 26 + bob, 3)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [])

  return <canvas ref={ref} width={SW * RES} height={SH * RES} className="console-canvas" />
}

function timeAgo(iso) {
  const days = Math.round((Date.now() - new Date(iso)) / 86400000)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  if (days < 1) return 'today'
  if (days < 31) return rtf.format(-days, 'day')
  if (days < 365) return rtf.format(-Math.round(days / 30), 'month')
  return rtf.format(-Math.round(days / 365), 'year')
}

const LANG = { TypeScript: '#3178c6', JavaScript: '#f1e05a', Java: '#b07219', Python: '#3572A5', HTML: '#e34c26', CSS: '#563d7c' }
const HIDE = new Set(['Anusigan', 'Anusigan-Sivananthan'])

function GitHubFeed() {
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '200px' })
  const [repos, setRepos] = useState(null)

  useEffect(() => {
    if (!inView) return
    const key = 'gh-repos'
    try {
      const cached = JSON.parse(sessionStorage.getItem(key) || 'null')
      if (cached) return setRepos(cached)
    } catch { /* ignore */ }
    fetch(`https://api.github.com/users/${PROFILE.githubUser}/repos?sort=pushed&per_page=20`)
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(list => {
        const picked = list.filter(r => !r.fork && !HIDE.has(r.name)).slice(0, 6)
          .map(r => ({ name: r.name, url: r.html_url, lang: r.language, stars: r.stargazers_count, pushed: r.pushed_at }))
        setRepos(picked)
        try { sessionStorage.setItem(key, JSON.stringify(picked)) } catch { /* ignore */ }
      })
      .catch(() => setRepos([]))
  }, [inView])

  return (
    <div ref={ref} className="gh-feed">
      <div className="gh-head">
        <span className="pixel-label"><span className="live-dot" style={{ display: 'inline-block', marginRight: 8 }} />save files · live from github</span>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="pixel-label gh-all">all 39+ repos <ArrowUpRight size={12} /></a>
      </div>
      <div className="gh-grid">
        {(repos || Array.from({ length: 6 }, () => null)).map((r, i) => r ? (
          <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="gh-card">
            <span className="gh-slot pixel-label">slot {String(i + 1).padStart(2, '0')}</span>
            <span className="gh-name">{r.name.replace(/[-_]/g, ' ')}</span>
            <span className="gh-meta">
              {r.lang && <span><i style={{ background: LANG[r.lang] || '#9ca3af' }} />{r.lang}</span>}
              {r.stars > 0 && <span><Star size={11} /> {r.stars}</span>}
              <span>{timeAgo(r.pushed)}</span>
            </span>
          </a>
        ) : <div key={i} className="gh-card gh-skeleton" />)}
      </div>
    </div>
  )
}

export default function Projects() {
  const [sel, setSel] = useState(0)
  const [booting, setBooting] = useState(false)
  const played = useRef(new Set([0]))
  const bootTimer = useRef(null)
  const [areaRef, inView] = useInView({ threshold: 0.25 })
  const p = PROJECTS[sel]

  const select = useCallback((i) => {
    const n = (i + PROJECTS.length) % PROJECTS.length
    setSel(n)
    setBooting(true)
    clearTimeout(bootTimer.current)
    bootTimer.current = setTimeout(() => setBooting(false), 550)
    played.current.add(n)
    if (played.current.size === PROJECTS.length) unlock('cartridge')
  }, [])

  useEffect(() => {
    if (!inView) return
    const onKey = (e) => {
      if (/input|textarea/i.test(document.activeElement?.tagName)) return
      if (e.key === 'ArrowRight') { e.preventDefault(); select(sel + 1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select(sel - 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inView, sel, select])

  useEffect(() => {
    const onSelect = (e) => {
      const i = PROJECTS.findIndex(x => x.title === e.detail)
      if (i >= 0) select(i)
    }
    window.addEventListener('select-project', onSelect)
    return () => window.removeEventListener('select-project', onSelect)
  }, [select])

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead eyebrow="01 — work" title="Things I've built" sub="Pick a cartridge to load it. The ← → keys and the d-pad work too." />

        <div className="arcade" ref={areaRef}>
          <div className="console">
            <div className="console-top">
              <span className="console-led" style={{ background: booting ? '#fbbf24' : '#10b981' }} />
              <span className="pixel-label">power</span>
              <span className="console-brand pixel-label">byte station</span>
            </div>
            <div className="console-bezel">
              <div className="console-screen">
                <ConsoleScreen project={p} booting={booting} />
                <AnimatePresence mode="wait">
                  {!booting && (
                    <motion.div
                      key={p.id}
                      className="console-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="console-level">level {String(sel + 1).padStart(2, '0')}</span>
                      <span className="console-title">{p.title}</span>
                      <span className="console-start">▶ press A</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="console-controls">
              <div className="dpad">
                <button aria-label="Previous project" className="dpad-l" onClick={() => select(sel - 1)} />
                <button aria-label="Next project" className="dpad-r" onClick={() => select(sel + 1)} />
                <span className="dpad-v" />
                <span className="dpad-c" />
              </div>
              <div className="console-speaker" />
              <div className="ab">
                <button aria-label="Shuffle project" className="ab-b" onClick={() => select(sel + 1 + Math.floor(Math.random() * (PROJECTS.length - 1)))}>B</button>
                <a aria-label={`Open ${p.title}`} className="ab-a" href={p.link} target="_blank" rel="noopener noreferrer">A</a>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              className="project-detail"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <span className="pixel-chip" style={{ color: p.color, borderColor: p.color }}>{p.category}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-sub">{p.subtitle}</p>
              {p.role && <p className="pixel-label project-role">role: {p.role}</p>}
              <p className="project-desc">{p.description}</p>
              <p className="pixel-label" style={{ color: 'var(--text-3)', marginBottom: 10 }}>power-ups</p>
              <div className="powerups">
                {p.tech.map(t => <span key={t} className="powerup" style={{ '--c': p.color }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-pixel">
                  <Github size={14} /> {p.linkLabel}
                </a>
                <button className="btn-pixel btn-pixel--ghost" onClick={() => select(sel + 1)}>next level →</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="carts">
          {PROJECTS.map((proj, i) => (
            <button
              key={proj.id}
              className={`cart ${i === sel ? 'is-in' : ''}`}
              style={{ '--c': proj.color }}
              onClick={() => select(i)}
              aria-pressed={i === sel}
            >
              <span className="cart-label">
                <PixelIcon name={proj.icon} size={40} />
                <span className="cart-title">{proj.title}</span>
              </span>
              <span className="cart-foot pixel-label">{i === sel ? '▶ loaded' : `cart 0${i + 1}`}</span>
            </button>
          ))}
          <a className="cart cart--more" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            <span className="cart-label">
              <span className="cart-plus">+</span>
              <span className="cart-title">more on github</span>
            </span>
            <span className="cart-foot pixel-label">39 repos</span>
          </a>
        </div>

        <GitHubFeed />
      </div>
    </section>
  )
}
