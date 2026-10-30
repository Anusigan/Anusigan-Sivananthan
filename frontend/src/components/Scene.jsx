import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Terminal from './Terminal'
import { scrollToId } from '../smoothScroll'
import { unlock } from '../secrets'

const W = 160
const H = 120
const RES = 4

const DIGITS = {
  0: ['111', '101', '101', '101', '111'], 1: ['010', '110', '010', '010', '111'],
  2: ['111', '001', '111', '100', '111'], 3: ['111', '001', '111', '001', '111'],
  4: ['101', '101', '111', '001', '001'], 5: ['111', '100', '111', '001', '111'],
  6: ['111', '100', '111', '101', '111'], 7: ['111', '001', '010', '010', '010'],
  8: ['111', '101', '111', '101', '111'], 9: ['111', '101', '111', '001', '111'],
}

const HOTSPOTS = [
  { id: 'duck', r: [96, 71, 11, 9], label: 'rubber duck' },
  { id: 'mug', r: [106, 66, 11, 14], label: 'sip coffee' },
  { id: 'trophy', r: [138, 24, 11, 12], label: 'achievements →' },
  { id: 'books', r: [113, 23, 19, 13], label: 'skills →' },
  { id: 'clock', r: [72, 12, 24, 11], label: 'time travel' },
  { id: 'notes', r: [116, 40, 36, 12], label: 'to-do list' },
  { id: 'lamp', r: [123, 54, 22, 26], label: 'toggle lamp' },
  { id: 'me', r: [22, 56, 30, 40], label: 'that’s me' },
  { id: 'monitor', r: [50, 38, 56, 32], label: 'open terminal' },
  { id: 'window', r: [12, 12, 48, 42], label: 'change weather' },
]

const SKY = {
  day: ['#3b82c4', '#a5d8f3'],
  dusk: ['#2b1b4a', '#f59e5b'],
  night: ['#050916', '#1b2552'],
}
const FAKE_TIME = { day: [12, 30], dusk: [18, 15], night: [23, 47] }
const BUILDINGS = [[14, 5, 10], [19, 4, 6], [23, 6, 15], [29, 4, 8], [33, 6, 11], [39, 4, 6], [46, 6, 10], [52, 6, 14]]
const CODE_COLORS = ['#34d399', '#a7f3d0', '#fbbf24', '#f472b6', '#60a5fa', '#94a3b8']
const ME_LINES = ['that’s me — probably refactoring something.', 'currently: building MCP tools.', 'headphones on = deep work mode.']
const TODO = ['todo: ship portfolio ✓', 'todo: write more tests', 'todo: learn something new']

function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const hex = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))
const rgb = (c) => `rgb(${c.join(',')})`

function colomboTime() {
  const [h, m] = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).split(':').map(Number)
  return [h, m]
}

function codeLine(rand) {
  const indent = Math.floor(rand() * 4) * 2
  const segs = []
  let len = indent
  const n = 1 + Math.floor(rand() * 4)
  for (let i = 0; i < n; i++) {
    const w = 2 + Math.floor(rand() * 9)
    if (len + w > 46) break
    segs.push({ w, c: CODE_COLORS[Math.floor(rand() * CODE_COLORS.length)] })
    len += w + 1
  }
  return { indent, segs, len }
}

export default function Scene() {
  const wrapRef = useRef(null)
  const tiltRef = useRef(null)
  const canvasRef = useRef(null)
  const [hover, setHover] = useState(null)
  const [bubble, setBubble] = useState(null)
  const [term, setTerm] = useState(false)
  const [status, setStatus] = useState({ phase: 'auto', rain: false, lamp: true })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.setTransform(RES, 0, 0, RES, 0, 0)
    ctx.imageSmoothingEnabled = false
    const rand = rng(7)
    const px = (c, x, y, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h) }

    const wins = []
    BUILDINGS.forEach(([x, w, h]) => {
      for (let yy = 52 - h + 2; yy < 51; yy += 2) {
        for (let xx = x + 1; xx < x + w - 1; xx += 2) wins.push({ x: xx, y: yy, lit: rand() > 0.55 })
      }
    })

    const S = {
      phase: 'auto', rain: false, lamp: true, hover: null,
      duckUntil: 0, sipUntil: 0, flash: 0,
      lines: Array.from({ length: 13 }, () => codeLine(rand)), reveal: 0,
      drops: Array.from({ length: 34 }, () => ({ x: 14 + rand() * 46, y: 14 + rand() * 38, s: 0.9 + rand() * 0.9 })),
      clouds: [{ x: 16, y: 19, w: 10 }, { x: 40, y: 26, w: 8 }, { x: 28, y: 16, w: 6 }],
      stars: Array.from({ length: 16 }, () => ({ x: 15 + Math.floor(rand() * 42), y: 15 + Math.floor(rand() * 20), p: rand() * 6 })),
      wins, mx: 0, my: 0, tx: 0, ty: 0, visible: true,
    }

    const phaseNow = () => {
      if (S.phase !== 'auto') return S.phase
      const [h, m] = colomboTime()
      const hh = h + m / 60
      if (hh >= 7 && hh < 17) return 'day'
      if ((hh >= 5 && hh < 7) || (hh >= 17 && hh < 19)) return 'dusk'
      return 'night'
    }

    const draw = (t) => {
      const phase = phaseNow()
      const day = phase === 'day', dusk = phase === 'dusk', night = phase === 'night'
      const bx = Math.round(-S.tx), by = Math.round(-S.ty * 0.6)

      // wall
      px('#0e1b16', 0, 0, W, H)
      for (let x = 2; x < W; x += 6) px('#10201a', x, 0, 1, 80)
      px('#0a1511', 0, 78, W, 2)

      ctx.save()
      ctx.translate(bx, by)

      // sky
      ctx.save()
      ctx.beginPath()
      ctx.rect(14, 14, 44, 38)
      ctx.clip()
      const [top, bot] = SKY[phase].map(hex)
      for (let y = 14; y < 52; y++) {
        let c = lerp(top, bot, (y - 14) / 37)
        if (S.rain) c = lerp(c, [52, 60, 74], 0.55)
        px(rgb(c), 14, y, 44, 1)
      }
      if (!S.rain) {
        if (night) {
          S.stars.forEach(s => px(`rgba(255,255,235,${0.35 + 0.65 * Math.abs(Math.sin(t / 700 + s.p))})`, s.x, s.y))
          for (let dx = -4; dx <= 4; dx++) for (let dy = -4; dy <= 4; dy++) {
            if (dx * dx + dy * dy <= 14) px('#efecd2', 50 + dx, 21 + dy)
          }
          px('#d4d0b2', 49, 20, 2, 1); px('#d4d0b2', 51, 23)
        } else {
          const [sx, sy, r, c] = day ? [22, 21, 4, '#fde68a'] : [26, 46, 5, '#fb923c']
          for (let dx = -r; dx <= r; dx++) for (let dy = -r; dy <= r; dy++) {
            if (dx * dx + dy * dy <= r * r - 2) px(c, sx + dx, sy + dy)
          }
          if (day) {
            S.clouds.forEach(cl => {
              cl.x += 0.03
              if (cl.x > 60) cl.x = 4
              const x = Math.round(cl.x)
              px('rgba(255,255,255,0.92)', x, cl.y, cl.w, 2)
              px('rgba(255,255,255,0.92)', x + 2, cl.y - 1, cl.w - 4, 1)
            })
          }
        }
      } else {
        px('rgba(30,35,45,0.6)', 14, 14, 44, 8)
        px('rgba(30,35,45,0.4)', 14, 22, 44, 4)
      }
      const bcol = night ? '#0a1426' : day ? '#5b7a95' : '#3b2a4a'
      BUILDINGS.forEach(([x, w, h]) => px(bcol, x, 52 - h, w, h))
      if (!day) {
        S.wins.forEach(wn => {
          if (Math.random() < 0.0008) wn.lit = !wn.lit
          if (wn.lit) px(night ? '#fde68a' : '#f59e0b', wn.x, wn.y)
        })
      }
      // Lotus Tower
      px(bcol, 44, 21, 1, 31)
      px(bcol, 43, 28, 3, 1); px(bcol, 42, 29, 5, 2); px(bcol, 43, 31, 3, 1); px(bcol, 44, 32, 1, 1)
      if (!day) {
        const hue = (t / 25) % 360
        px(`hsl(${hue} 85% 65%)`, 42, 29, 5, 1)
        px(`hsl(${(hue + 90) % 360} 85% 60%)`, 43, 31, 3, 1)
        if (Math.floor(t / 700) % 2) px('#f87171', 44, 20)
      }
      if (S.rain) {
        S.drops.forEach(d => {
          d.y += d.s
          d.x -= d.s * 0.3
          if (d.y > 52) { d.y = 14; d.x = 16 + Math.random() * 46 }
          px('rgba(190,210,255,0.55)', Math.round(d.x), Math.round(d.y), 1, 2)
        })
        if (Math.random() < 0.004) S.flash = t + 110
      }
      ctx.restore()

      // window frame + sill + plant
      const fc = '#2b3d35'
      px(fc, 12, 12, 48, 2); px(fc, 12, 52, 48, 2); px(fc, 12, 12, 2, 42); px(fc, 58, 12, 2, 42)
      px(fc, 35, 14, 2, 38); px(fc, 14, 32, 44, 1)
      px('#3a5046', 10, 54, 52, 2); px('#4a6358', 10, 54, 52, 1)
      px('#9a3412', 51, 50, 5, 4); px('#7c2d12', 51, 53, 5, 1)
      px('#22c55e', 53, 44, 1, 6); px('#22c55e', 51, 47, 2, 1); px('#22c55e', 54, 46, 2, 1)
      px('#16a34a', 50, 48, 1, 1); px('#16a34a', 56, 47, 1, 1); px('#16a34a', 52, 45, 1, 1)

      // clock
      px(fc, 72, 12, 24, 11); px('#04100b', 73, 13, 22, 9)
      const [ch, cm] = S.phase === 'auto' ? colomboTime() : FAKE_TIME[S.phase]
      const digits = `${String(ch).padStart(2, '0')}${String(cm).padStart(2, '0')}`
      ;[75, 79, 85, 89].forEach((x, i) => {
        DIGITS[digits[i]].forEach((row, j) => [...row].forEach((b, k) => { if (b === '1') px('#34d399', x + k, 15 + j) }))
      })
      if (Math.floor(t / 500) % 2) { px('#34d399', 83, 16); px('#34d399', 83, 18) }

      // shelf, books, trophy
      px('#4a3423', 112, 36, 42, 2); px('#2a1d14', 112, 38, 42, 1)
      px('#2a1d14', 116, 39, 1, 3); px('#2a1d14', 150, 39, 1, 3)
      ;[[114, 3, 11, '#2563eb'], [117, 3, 9, '#dc2626'], [120, 4, 12, '#10b981'], [124, 3, 10, '#f59e0b'], [127, 2, 8, '#a855f7']].forEach(([x, w, h, c]) => {
        px(c, x, 36 - h, w, h)
        px('rgba(255,255,255,0.25)', x, 36 - h, w, 1)
        px('rgba(0,0,0,0.25)', x, 36 - h + 3, w, 1)
      })
      px('#f59e0b', 130, 34, 7, 2); px('rgba(255,255,255,0.2)', 130, 34, 7, 1)
      px('#fbbf24', 140, 26, 7, 5); px('#b45309', 145, 26, 2, 5)
      px('#fbbf24', 139, 27, 1, 2); px('#fbbf24', 147, 27, 1, 2)
      px('#d97706', 143, 31, 1, 2); px('#78350f', 141, 33, 5, 3)
      if (t % 3200 < 220) px('#ffffff', 141, 27)

      // sticky notes
      ;[[118, 42, '#fde047', '#a16207'], [130, 41, '#f9a8d4', '#9d174d'], [142, 43, '#86efac', '#166534']].forEach(([x, y, c, l]) => {
        px(c, x, y, 8, 8); px('rgba(0,0,0,0.15)', x, y + 7, 8, 1)
        px(l, x + 1, y + 2, 5, 1); px(l, x + 1, y + 4, 4, 1)
      })

      if (!S.rain && !night) {
        ctx.globalCompositeOperation = 'lighter'
        ctx.fillStyle = day ? 'rgba(255,244,214,0.05)' : 'rgba(251,146,60,0.06)'
        ctx.beginPath()
        ctx.moveTo(14, 52); ctx.lineTo(58, 52); ctx.lineTo(84, 80); ctx.lineTo(34, 80)
        ctx.fill()
        ctx.globalCompositeOperation = 'source-over'
      }
      ctx.restore()

      // desk
      px('#5c4330', 4, 80, 152, 1); px('#4a3423', 4, 81, 152, 3); px('#2e2117', 6, 84, 148, 36)
      px('#241a12', 84, 92, 66, 1); px('#241a12', 84, 92, 1, 28); px('#7c6a58', 112, 97, 10, 1)

      // monitor
      const hovMon = S.hover === 'monitor'
      px('#1a1e1c', 50, 38, 56, 32); px('#262c29', 50, 38, 56, 1)
      px(hovMon ? '#073522' : '#03170e', 52, 40, 52, 27)
      const last = S.lines.length - 1
      S.lines.forEach((ln, i) => {
        const y = 42 + i * 2
        let x = 54 + ln.indent
        let budget = i === last ? S.reveal : Infinity
        for (const sg of ln.segs) {
          if (budget <= 0) break
          const w = Math.min(sg.w, budget)
          px(sg.c, x, y, w, 1)
          x += sg.w + 1
          budget -= sg.w + 1
        }
        if (i === last && Math.floor(t / 300) % 2) px('#d1fae5', 54 + Math.min(S.reveal, ln.len), y, 2, 1)
      })
      if (hovMon) {
        px('rgba(3,23,14,0.8)', 52, 40, 52, 27)
        ;['100', '010', '001', '010', '100'].forEach((row, j) => [...row].forEach((b, k) => { if (b === '1') px('#34d399', 70 + k * 2, 48 + j * 2, 2, 2) }))
        if (Math.floor(t / 400) % 2) px('#34d399', 79, 56, 7, 2)
      }
      px('#10b981', 102, 68)
      px('#262b29', 76, 70, 4, 8); px('#262b29', 70, 78, 16, 2)

      // keyboard
      px('#262b29', 58, 78, 36, 2)
      for (let x = 59; x < 93; x += 2) px('#3f4643', x, 78)
      if (S.hover !== 'me') px('#34d399', 59 + 2 * Math.floor(Math.random() * 17), 78)

      // mug + steam
      px('#e5e7eb', 108, 73, 6, 7); px('#f9fafb', 108, 72, 6, 1); px('#3f2a1e', 109, 72, 4, 1)
      px('#e5e7eb', 114, 74); px('#e5e7eb', 115, 75, 1, 2); px('#e5e7eb', 114, 77); px('#10b981', 110, 76, 2, 2)
      const puffs = t < S.sipUntil ? 4 : 3
      for (let k = 0; k < puffs; k++) {
        for (let j = 0; j < 6; j++) {
          const y = 70 - j * 2 - ((t / 160) % 2)
          const x = 109 + k * 1.6 + Math.sin(t / 380 + j * 0.9 + k * 2) * 1.3
          px(`rgba(255,255,255,${(0.32 - j * 0.05) * (t < S.sipUntil ? 1.8 : 1)})`, Math.round(x), Math.round(y))
        }
      }

      // rubber duck
      const dq = t < S.duckUntil ? -Math.round(Math.abs(Math.sin((S.duckUntil - t) / 70)) * 3) : 0
      px('#facc15', 97, 76 + dq, 7, 3); px('#facc15', 100, 73 + dq, 4, 3)
      px('#f97316', 104, 74 + dq, 2, 1); px('#111827', 102, 74 + dq); px('#eab308', 98, 77 + dq, 3, 1)

      // lamp
      px('#1f2a25', 124, 78, 11, 2)
      for (let i = 0; i <= 16; i++) px('#3b4a43', Math.round(129 + (6 * i) / 16), Math.round(77 - i))
      px('#10b981', 131, 56, 9, 1); px('#10b981', 130, 57, 11, 1); px('#10b981', 129, 58, 13, 1)
      px('#10b981', 128, 59, 15, 1); px('#0b7a57', 128, 60, 15, 1)
      px(S.lamp ? '#fef9c3' : '#4b5563', 134, 61, 3, 1)

      // me (back view) + chair
      const cx = 36
      const hy = S.hover === 'me' ? 0 : (Math.floor(t / 110) % 2 ? 0 : -1)
      for (let i = 0; i <= 14; i++) px('#1e3a2f', 45 + i, Math.round(76 + ((79 + hy - 76) * i) / 14), 2, 3)
      px('#8d5a3b', 59, 78 + hy, 3, 2)
      ;[6, 8, 10, 12, 12, 12, 12, 12, 12, 10, 8].forEach((w, r) => px('#16100d', cx - w / 2, 58 + r, w, 1))
      px('#2b201a', 33, 60, 3, 1); px('#2b201a', 32, 61, 2, 1)
      px('#8d5a3b', 34, 69, 4, 2)
      px('#10b981', 33, 57, 6, 1)
      ;[[32, 39, 58], [31, 40, 59], [30, 41, 60], [29, 42, 61]].forEach(([l, r, y]) => { px('#10b981', l, y); px('#10b981', r, y) })
      px('#0b5d43', 28, 62, 3, 5); px('#0b5d43', 41, 62, 3, 5)
      ;[12, 18, 22, 24, 26].forEach((w, r) => px('#1e3a2f', cx - w / 2, 71 + r, w, 1))
      px('#1e3a2f', 23, 76, 26, 14); px('#162c24', 44, 74, 5, 16); px('#13261f', 32, 70, 8, 3)
      px('#23232b', 25, 85, 22, 1); px('#23232b', 24, 86, 24, 25); px('#33333d', 26, 87, 1, 22); px('#23232b', 35, 111, 3, 9)

      // lighting
      let dark = night ? 0.38 : dusk ? 0.2 : 0
      if (S.rain) dark += 0.1
      if (!S.lamp) dark += night ? 0.2 : 0.07
      if (dark > 0) {
        ctx.fillStyle = `rgba(3,6,14,${dark})`
        ctx.beginPath()
        ctx.rect(0, 0, W, H)
        ctx.rect(14 + bx, 14 + by, 44, 38)
        ctx.fill('evenodd')
      }
      ctx.globalCompositeOperation = 'lighter'
      px('rgba(16,185,129,0.06)', 44, 32, 68, 46)
      px('rgba(16,185,129,0.08)', 52, 40, 52, 27)
      px('rgba(16,185,129,0.1)', 56, 80, 44, 2)
      if (S.lamp) {
        ctx.fillStyle = 'rgba(254,240,138,0.09)'
        ctx.beginPath()
        ctx.moveTo(129, 61); ctx.lineTo(142, 61); ctx.lineTo(158, 80); ctx.lineTo(108, 80)
        ctx.fill()
        px('rgba(254,240,138,0.14)', 108, 80, 50, 2)
        px('rgba(254,249,195,0.45)', 132, 61, 7, 2)
      }
      if (t < S.flash) px('rgba(220,230,255,0.35)', 0, 0, W, H)
      ctx.globalCompositeOperation = 'source-over'

      // typing
      if (S.hover !== 'me') {
        S.reveal += 1.2
        if (S.reveal >= S.lines[last].len) {
          S.lines.shift()
          S.lines.push(codeLine(rand))
          S.reveal = 0
        }
      }
    }

    let bubbleTimer
    const say = (id, text) => {
      const r = HOTSPOTS.find(h => h.id === id).r
      setBubble({ text, x: r[0] + r[2] / 2, y: r[1], key: Math.random() })
      clearTimeout(bubbleTimer)
      bubbleTimer = setTimeout(() => setBubble(null), 2600)
    }
    const sync = () => setStatus({ phase: S.phase, rain: S.rain, lamp: S.lamp })
    let meIdx = 0, todoIdx = 0
    const act = (id) => {
      const t = performance.now()
      if (id === 'monitor') return setTerm(true)
      if (id === 'window') { S.rain = !S.rain; say('window', S.rain ? 'monsoon mode. very colombo.' : 'skies cleared.') }
      if (id === 'clock') {
        const order = ['auto', 'day', 'dusk', 'night']
        S.phase = order[(order.indexOf(S.phase) + 1) % order.length]
        say('clock', S.phase === 'auto' ? 'back to real colombo time' : `time travel → ${S.phase}`)
      }
      if (id === 'lamp') { S.lamp = !S.lamp; say('lamp', S.lamp ? 'click.' : 'lights out.') }
      if (id === 'mug') { S.sipUntil = t + 1400; say('mug', '+10 focus') }
      if (id === 'duck') { S.duckUntil = t + 700; say('duck', 'quack. (have you tried logging it?)') }
      if (id === 'trophy') scrollToId('achievements')
      if (id === 'books') scrollToId('skills')
      if (id === 'me') say('me', ME_LINES[meIdx++ % ME_LINES.length])
      if (id === 'notes') say('notes', TODO[todoIdx++ % TODO.length])
      if (S.rain) unlock('monsoon')
      if (S.phase === 'night') unlock('night')
      if (id === 'duck') unlock('duck')
      sync()
    }

    const hit = (e) => {
      const r = canvas.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * W
      const y = ((e.clientY - r.top) / r.height) * H
      return HOTSPOTS.find(({ r: [hx, hy, hw, hh] }) => x >= hx && x < hx + hw && y >= hy && y < hy + hh)
    }
    const onMove = (e) => {
      const spot = hit(e)
      const id = spot?.id || null
      if (id !== S.hover) {
        S.hover = id
        setHover(spot || null)
        canvas.style.cursor = spot ? 'var(--px-pointer, pointer)' : ''
      }
    }
    const onLeave = () => { S.hover = null; setHover(null); canvas.style.cursor = '' }
    const onClick = (e) => { const spot = hit(e); if (spot) act(spot.id) }

    const fine = window.matchMedia('(pointer: fine)').matches
    const onWinMove = (e) => {
      const r = wrapRef.current.getBoundingClientRect()
      S.mx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / r.width))
      S.my = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / r.height))
    }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('click', onClick)
    if (fine) window.addEventListener('mousemove', onWinMove)

    const io = new IntersectionObserver(([en]) => { S.visible = en.isIntersecting })
    io.observe(wrapRef.current)

    let raf, lastDraw = 0, lastTilt = ''
    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      if (!S.visible) return
      S.tx += (S.mx - S.tx) * 0.08
      S.ty += (S.my - S.ty) * 0.08
      const tilt = `rotateY(${(S.tx * 7).toFixed(2)}deg) rotateX(${(-S.ty * 5).toFixed(2)}deg)`
      if (tilt !== lastTilt) { tiltRef.current.style.transform = tilt; lastTilt = tilt }
      if (t - lastDraw < 33) return
      lastDraw = t
      draw(t)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(bubbleTimer)
      io.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('click', onClick)
      window.removeEventListener('mousemove', onWinMove)
    }
  }, [])

  useEffect(() => {
    if (!term) return
    const onKey = (e) => { if (e.key === 'Escape') setTerm(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [term])

  const pos = ([x, y, w]) => ({ left: `${((x + w / 2) / W) * 100}%`, top: `${(y / H) * 100}%` })
  const weather = status.rain ? 'rain' : 'clear'
  const time = status.phase === 'auto' ? 'live time' : status.phase

  return (
    <div className="scene" ref={wrapRef}>
      <div className="scene-tilt" ref={tiltRef}>
        <div className="scene-frame">
          <canvas ref={canvasRef} width={W * RES} height={H * RES} aria-label="Interactive pixel-art room: Anusigan coding at a desk" />
          {hover && !bubble && (
            <div className="scene-tip" style={pos(hover.r)}>{hover.label}</div>
          )}
          {bubble && (
            <div key={bubble.key} className="pixel-bubble scene-bubble" style={{ left: `${(bubble.x / W) * 100}%`, top: `${(bubble.y / H) * 100}%` }}>
              {bubble.text}
            </div>
          )}
        </div>
      </div>
      <div className="scene-status pixel-label">
        <span><span className="live-dot" style={{ display: 'inline-block', marginRight: 6 }} />room.exe</span>
        <span>{time} · {weather} · lamp {status.lamp ? 'on' : 'off'}</span>
        <span className="scene-hint">everything is clickable</span>
      </div>

      {createPortal(<AnimatePresence>
        {term && (
          <motion.div
            className="term-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setTerm(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.18 }}
              onClick={e => e.stopPropagation()}
              style={{ width: 'min(680px, 100%)' }}
            >
              <Terminal autoFocus />
              <button className="term-close pixel-label" onClick={() => setTerm(false)}>[esc] close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </div>
  )
}
