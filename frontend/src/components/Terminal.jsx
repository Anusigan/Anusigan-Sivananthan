import { useEffect, useRef, useState } from 'react'
import { unlock } from '../secrets'

const EMAIL = 'sivananthan.20230297@iit.ac.lk'
const PROMPT = 'guest@anusigan:~$'

const byte = (detail) => window.dispatchEvent(new CustomEvent('byte', { detail }))
import { scrollToId as goto } from '../smoothScroll'

const COMMANDS = {
  help: () => [
    'available commands:',
    '  whoami      who am I',
    '  projects    things I’ve built',
    '  skills      what I work with',
    '  experience  where I’ve worked',
    '  contact     how to reach me',
    '  goto <s>    scroll to a section',
    '  byte        summon the pet',
    '  ls          list files',
    '  clear       wipe the screen',
    'there are also a few hidden ones.',
  ],
  whoami: () => [
    'Anusigan Sivananthan',
    'trainee software engineer @ IFS R&D',
    'BSc (Hons) CS @ IIT × University of Westminster',
    'currently: agentic AI workflows + MCP tooling',
  ],
  projects: () => [
    '01  MemoRaid            memory rehab platform   [flutter, node, supabase]',
    '02  MyAttenef           attendance system       [react, postgres, flutter]',
    '03  Event Ticketing     concurrent ticketing    [spring boot, java]',
    '04  NLP Resume Analyzer skill-gap analysis      [python, spaCy]',
    'tip: `goto projects` for the full write-ups',
  ],
  skills: () => [
    'lang   python  javascript  typescript  java  sql/plsql  dart  php',
    'build  react  node  express  spring boot  flutter  ifs aurena',
    'tools  git  docker  supabase  postgres  figma  jira  azure devops',
  ],
  experience: () => [
    '2025 → now   trainee SWE, IFS R&D International',
    '              agile delivery · defect fixing · MCP tools for LUMOS',
    '2024 → now   BSc (Hons) CS, IIT — L4 80.67% · L5 74.8%',
  ],
  contact: () => [
    `email     ${EMAIL}`,
    'github    github.com/Anusigan',
    'linkedin  linkedin.com/in/Anusigan-Sivananthan',
    'or just run: sudo hire anusigan',
  ],
  ls: () => ['about.txt  projects/  skills.json  contact.sh  secret.txt'],
  'cat secret.txt': () => ['↑ ↑ ↓ ↓ ← → ← → b a', '(press it anywhere on the page)'],
  'cat about.txt': () => ['I like building things that are fast, maintainable and actually useful.', 'currently exploring: explainable AI, system design, cybersecurity.'],
  byte: () => { byte({ action: 'jump', text: 'you rang? ↑' }); return ['summoning byte... look down ↓'] },
  party: () => { byte({ action: 'party' }); return ['✨ party mode engaged'] },
  date: () => [new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' }) + ' LKT'],
  'rm -rf /': () => ['nice try.'],
  exit: () => ['there is no escape. (try `contact` instead)'],
  coffee: () => ['   ( (', '    ) )', '  ........', '  |      |]', '  \\      /', '   `----’', 'brewing... ☕ ok, now hire me.'],
  sudo: () => ['usage: sudo hire anusigan'],
}

const SECTIONS = ['about', 'skills', 'experience', 'projects', 'achievements', 'contact']

export default function Terminal({ autoFocus = false }) {
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const [ready, setReady] = useState(false)
  const [focused, setFocused] = useState(false)
  const history = useRef([])
  const hIdx = useRef(-1)
  const screenRef = useRef(null)
  const inputRef = useRef(null)

  const print = (out, type = 'out') => setLines(l => [...l, ...out.map(text => ({ type, text }))])

  useEffect(() => {
    let cancelled = false
    const boot = async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms))
      await wait(700)
      const cmd = 'whoami'
      for (let i = 1; i <= cmd.length; i++) {
        if (cancelled) return
        setInput(cmd.slice(0, i))
        await wait(90)
      }
      await wait(250)
      if (cancelled) return
      setInput('')
      print([`${PROMPT} ${cmd}`], 'in')
      print(COMMANDS.whoami())
      await wait(300)
      if (cancelled) return
      print(['', 'type `help` to look around.'], 'sys')
      setReady(true)
    }
    boot()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus({ preventScroll: true })
  }, [autoFocus])

  useEffect(() => {
    const el = screenRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, input])

  const run = (raw) => {
    const cmd = raw.trim().replace(/\s+/g, ' ')
    print([`${PROMPT} ${raw}`], 'in')
    if (!cmd) return
    unlock('terminal')
    history.current.unshift(cmd)
    hIdx.current = -1
    const lower = cmd.toLowerCase()

    if (lower === 'clear') return setLines([])
    if (lower.startsWith('echo ')) return print([cmd.slice(5)])
    if (lower.startsWith('goto')) {
      const target = lower.split(' ')[1]
      if (SECTIONS.includes(target)) { goto(target); return print([`scrolling to #${target}...`]) }
      return print([`goto: pick one of ${SECTIONS.join(', ')}`])
    }
    if (lower === 'sudo hire anusigan') {
      unlock('hire')
      print(['[sudo] password for recruiter: ********'])
      setTimeout(() => print(['access granted ✓', 'opening mail client...'], 'sys'), 700)
      setTimeout(() => { byte({ action: 'jump', text: 'great choice!!' }); window.location.href = `mailto:${EMAIL}?subject=Let%27s%20work%20together` }, 1500)
      return
    }
    const fn = COMMANDS[lower]
    if (fn) return print(fn())
    print([`command not found: ${cmd.split(' ')[0]} — try \`help\``], 'err')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!ready) return
      run(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.current.length) {
        hIdx.current = Math.min(hIdx.current + 1, history.current.length - 1)
        setInput(history.current[hIdx.current])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      hIdx.current = Math.max(hIdx.current - 1, -1)
      setInput(hIdx.current === -1 ? '' : history.current[hIdx.current])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = Object.keys(COMMANDS).find(c => c.startsWith(input.toLowerCase()) && !c.includes(' '))
      if (input && match) setInput(match)
    }
  }

  const color = { in: 'var(--crt-dim)', out: 'var(--crt)', sys: 'var(--crt-bright)', err: '#f87171' }

  return (
    <div className="crt" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="crt-bar">
        <span className="crt-dot" style={{ background: '#f87171' }} />
        <span className="crt-dot" style={{ background: '#fbbf24' }} />
        <span className="crt-dot" style={{ background: '#10b981' }} />
        <span className="crt-title">anusigan.sh — interactive</span>
      </div>
      <div className="crt-screen" ref={screenRef}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: color[l.type], whiteSpace: 'pre-wrap', minHeight: '1.5em' }}>{l.text}</div>
        ))}
        <div style={{ display: 'flex', gap: 8, color: 'var(--crt)' }}>
          <span style={{ color: 'var(--crt-dim)', flexShrink: 0 }}>{PROMPT}</span>
          <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {input}
            <span className={`crt-caret ${focused || !ready ? 'on' : ''}`} />
          </span>
        </div>
        {ready && !focused && !lines.some(l => l.type === 'in' && l.text !== `${PROMPT} whoami`) && (
          <div className="crt-hint">▸ click here and start typing</div>
        )}
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label="Terminal input"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
        />
      </div>
      <div className="crt-scanlines" />
    </div>
  )
}
