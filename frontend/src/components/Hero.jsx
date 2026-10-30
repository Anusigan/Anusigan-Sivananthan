import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import Scene from './Scene'
import { scrollToId } from '../smoothScroll'

function useClock() {
  const fmt = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Colombo' })
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

const WORDS = ['full-stack', 'agentic', 'enterprise', 'AI-powered']
const GLYPHS = '!<>-_\\/[]{}=+*^?#01'

function ScrambleWord() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(WORDS[0])

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const target = WORDS[index]
    let frame = 0
    const total = 18
    const id = setInterval(() => {
      frame++
      const reveal = Math.floor((frame / total) * target.length)
      setText(target.split('').map((ch, i) =>
        i < reveal ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      ).join(''))
      if (frame >= total) { clearInterval(id); setText(target) }
    }, 35)
    return () => clearInterval(id)
  }, [index])

  return <span className="scramble">{text}</span>
}

const TECH = [
  'React', 'Node.js', 'Flutter', 'Python', 'Spring Boot',
  'TypeScript', 'PL/SQL', 'Java', 'Supabase', 'PostgreSQL',
  'Express.js', 'Dart', 'IFS Aurena', 'Docker', 'MCP',
]

function Marquee() {
  const items = [...TECH, ...TECH]
  return (
    <div style={{ overflow: 'hidden', marginTop: '64px', paddingTop: '24px', borderTop: '1px dashed rgba(255,255,255,0.08)' }}>
      <div style={{ display: 'flex', animation: 'marquee 34s linear infinite', width: 'max-content' }}>
        {items.map((t, i) => (
          <span key={i} className="pixel-label" style={{ marginRight: '36px', flexShrink: 0, color: 'var(--text-3)' }}>
            {t}<span style={{ marginLeft: '36px', color: 'var(--accent)' }}>■</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const time = useClock()
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] },
  })

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 0 40px' }}>
      <div className="container" style={{ width: '100%' }}>
        <div className="hero-grid">
          <div>
            <motion.div {...fadeUp(0.05)} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
              <span className="pixel-chip pixel-chip--live">
                <span className="live-dot" /> open to opportunities
              </span>
              <span className="pixel-chip">colombo · {time} LKT</span>
            </motion.div>

            <motion.h1 {...fadeUp(0.15)} className="hero-title">
              <span className="hero-line">I build</span>
              <span className="hero-line"><ScrambleWord /></span>
              <span className="hero-line">software that <span className="underline-squiggle">ships</span>.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.3)} style={{ color: 'var(--text-2)', fontSize: '1.05rem', maxWidth: '500px', lineHeight: 1.75, marginBottom: '20px' }}>
              Trainee software engineer at <strong style={{ color: 'var(--text)' }}>IFS R&D</strong> and final-year CS student at IIT.
              I write the PL/SQL that enterprise systems run on, build MCP tools that let AI agents do real engineering work,
              and ship side projects like MemoRaid.
            </motion.p>

            <motion.p {...fadeUp(0.38)} className="pixel-label" style={{ color: 'var(--text-3)', marginBottom: '36px' }}>
              ↳ psst — click around the room. and say hi to the robot.
            </motion.p>

            <motion.div {...fadeUp(0.45)} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href="#projects"
                className="btn-pixel"
                onClick={e => { e.preventDefault(); scrollToId('projects') }}
              >
                see my work <ArrowUpRight size={15} />
              </a>
              <a href="mailto:sivananthan.20230297@iit.ac.lk" className="btn-pixel btn-pixel--ghost">say hello</a>
              <div style={{ display: 'flex', gap: '6px', marginLeft: '4px' }}>
                {[
                  { icon: Github, href: 'https://github.com/Anusigan', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/Anusigan-Sivananthan', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:sivananthan.20230297@iit.ac.lk', label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label} className="icon-pixel">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Scene />
          </motion.div>
        </div>

        <Marquee />
      </div>
    </section>
  )
}
