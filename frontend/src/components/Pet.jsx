import { useEffect, useRef, useState } from 'react'
import { unlock } from '../secrets'

const PAL = {
  K: '#04110b', G: '#10b981', D: '#047857', L: '#6ee7b7',
  S: '#052e1f', W: '#d1fae5', A: '#fbbf24', a: '#78350f', R: '#f472b6', l: '#1f6f52',
}

const BODY = [
  '.......A........',
  '.......K........',
  '...KKKKKKKKKK...',
  '..KGGGGGGGGGGK..',
  '..KGSSSSSSSSGK..',
  '..KGSSSSSSSSGK..',
  '..KGSSSSSSSSGK..',
  '..KGSSSSSSSSGK..',
  '..KLGGGGGGGGDK..',
  '...KKKKKKKKKK...',
  '....KKKKKKKK....',
  '...KGGGGGGGGK...',
  '..KDGLGGGGGGDK..',
  '...KGGGGGGGGK...',
  '....KKKKKKKK....',
]

const LEGS = {
  idle: ['.....KK..KK.....', '.....KK..KK.....'],
  walkA: ['....KK....KK....', '....KK....KK....'],
  walkB: ['......KKKK......', '......KKKK......'],
  air: ['.....KK..KK.....', '................'],
}

const SPRITE_W = 16
const SPRITE_H = 17
const SCALE = 4
const W = SPRITE_W * SCALE
const H = SPRITE_H * SCALE
const GROUND = 14

function eyes(mood, look) {
  const o = Math.max(-1, Math.min(1, Math.round(look)))
  const L = 5 + o, R = 9 + o
  const pair = (rows, c = 'W') => rows.flatMap(y => [[L, y, c], [L + 1, y, c], [R, y, c], [R + 1, y, c]])
  switch (mood) {
    case 'blink': return pair([6])
    case 'sleep': return pair([6], 'l')
    case 'surprised': return pair([4, 5, 6])
    case 'happy': return [
      [4, 6, 'W'], [5, 5, 'W'], [6, 6, 'W'], [9, 6, 'W'], [10, 5, 'W'], [11, 6, 'W'],
      [4, 7, 'R'], [11, 7, 'R'],
    ]
    case 'dizzy': return [
      [4, 4, 'W'], [6, 4, 'W'], [5, 5, 'W'], [4, 6, 'W'], [6, 6, 'W'],
      [9, 4, 'W'], [11, 4, 'W'], [10, 5, 'W'], [9, 6, 'W'], [11, 6, 'W'],
    ]
    default: return pair([5, 6])
  }
}

function drawSprite(ctx, { mood, look, legs, party, talking, t }) {
  ctx.clearRect(0, 0, SPRITE_W, SPRITE_H)
  const pal = party
    ? { ...PAL, G: `hsl(${(t * 0.25) % 360} 85% 55%)`, D: `hsl(${(t * 0.25 + 40) % 360} 80% 35%)` }
    : PAL
  const antennaOn = talking ? Math.floor(t / 120) % 2 === 0 : Math.floor(t / 900) % 2 === 0
  BODY.forEach((row, y) => {
    for (let x = 0; x < SPRITE_W; x++) {
      let c = row[x]
      if (c === '.') continue
      if (c === 'A' && !antennaOn) c = 'a'
      ctx.fillStyle = pal[c]
      ctx.fillRect(x, y, 1, 1)
    }
  })
  LEGS[legs].forEach((row, i) => {
    for (let x = 0; x < SPRITE_W; x++) {
      if (row[x] === '.') continue
      ctx.fillStyle = pal[row[x]]
      ctx.fillRect(x, 15 + i, 1, 1)
    }
  })
  eyes(mood, look).forEach(([x, y, c]) => {
    ctx.fillStyle = pal[c]
    ctx.fillRect(x, y, 1, 1)
  })
}

const POKE_LINES = [
  'beep boop. hi!',
  'I run on coffee and PL/SQL.',
  'drag me. I dare you.',
  'type `byte` in the terminal ;)',
  'I am 100% hand-drawn pixels.',
  'psst... try the konami code',
]
const ANNOYED_LINES = [
  'ok ok I’m awake!!',
  'I’m an AI agent, not a button.',
  'filing a bug report on you.',
]
const SECTION_LINES = {
  projects: 'insert a cartridge! I recommend MemoRaid.',
  experience: 'the main quest: IFS R&D.',
  about: 'stats are real. I checked.',
  skills: '24 items in the inventory. no potions though.',
  achievements: 'psst — you can unlock some too.',
  contact: 'write something. I’ll carry it myself.',
}
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

function spawn(layer, x, y, { text, color = '#10b981', size = 6, dx = 0, dy = -60, duration = 1200, font }) {
  const el = document.createElement('span')
  el.textContent = text || ''
  Object.assign(el.style, {
    position: 'fixed', left: `${x}px`, top: `${y}px`, pointerEvents: 'none',
    color, fontFamily: font || "'Silkscreen', monospace", fontSize: '12px', lineHeight: 1,
    ...(text ? {} : { width: `${size}px`, height: `${size}px`, background: color }),
  })
  layer.appendChild(el)
  el.animate(
    [{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }],
    { duration, easing: 'cubic-bezier(.2,.7,.4,1)' }
  ).onfinish = () => el.remove()
}

export default function Pet() {
  const layerRef = useRef(null)
  const petRef = useRef(null)
  const canvasRef = useRef(null)
  const bubbleRef = useRef(null)
  const [bubble, setBubble] = useState(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    const layer = layerRef.current
    const now = () => performance.now()

    const S = {
      x: 40, y: 0, vx: 0, vy: 0, dir: 1,
      mouseX: null, mouseY: null, lastMove: now(),
      press: null, held: false, grab: { x: 0, y: 0 }, trail: [],
      blinkAt: now() + 2500, happyUntil: 0, dizzyUntil: 0, partyUntil: 0, talkUntil: 0,
      sleeping: false, pokes: 0, lastPoke: 0, wanderX: null, nextWander: now() + 5000,
      lastZ: 0, lastConfetti: 0, konami: 0, seen: new Set(),
    }
    let bubbleTimer

    const say = (text, ms = 3200) => {
      setBubble({ text, key: Math.random() })
      S.talkUntil = now() + ms
      clearTimeout(bubbleTimer)
      bubbleTimer = setTimeout(() => setBubble(null), ms)
    }
    const petTop = () => window.innerHeight - GROUND - S.y - H
    const burst = (n, opts) => {
      for (let i = 0; i < n; i++) {
        spawn(layer, S.x + W / 2 + (Math.random() - 0.5) * 30, petTop() + 10, {
          dx: (Math.random() - 0.5) * 120, dy: -40 - Math.random() * 80, ...opts(i),
        })
      }
    }
    const wake = (line) => {
      if (!S.sleeping) return false
      S.sleeping = false
      S.lastMove = now()
      S.vy = 5
      say(line || 'wha—? I was debugging my dreams.')
      return true
    }
    const poke = () => {
      unlock('poke')
      if (wake()) return
      const t = now()
      S.pokes = t - S.lastPoke < 1500 ? S.pokes + 1 : 1
      S.lastPoke = t
      S.vy = 8
      S.happyUntil = t + 1200
      burst(4, () => ({ text: '♥', color: '#f472b6' }))
      if (S.pokes >= 4) say(ANNOYED_LINES[Math.min(S.pokes - 4, ANNOYED_LINES.length - 1)])
      else say(POKE_LINES[Math.floor(Math.random() * POKE_LINES.length)])
    }
    const party = () => {
      unlock('konami')
      S.partyUntil = now() + 6000
      S.sleeping = false
      S.vy = 9
      say('PARTY_MODE.exe launched', 3000)
    }

    const onMove = (e) => {
      S.mouseX = e.clientX
      S.mouseY = e.clientY
      S.lastMove = now()
      if (S.sleeping && Math.hypot(e.clientX - (S.x + W / 2), e.clientY - (petTop() + H / 2)) < 90) {
        wake('huh? oh, hi!')
      }
    }
    const onKey = (e) => {
      S.konami = e.key === KONAMI[S.konami] ? S.konami + 1 : (e.key === KONAMI[0] ? 1 : 0)
      if (S.konami === KONAMI.length) { S.konami = 0; party() }
    }
    const onByte = (e) => {
      const { action, text } = e.detail || {}
      if (action === 'party') return party()
      if (action === 'deliver') {
        S.sleeping = false
        S.vy = 10
        S.vx = S.x < window.innerWidth / 2 ? 16 : -16
        S.happyUntil = now() + 2000
        say(text, 2600)
        return
      }
      wake('')
      S.vy = 8
      S.happyUntil = now() + 1200
      if (text) say(text)
    }

    const canvas = canvasRef.current
    const onDown = (e) => {
      canvas.setPointerCapture(e.pointerId)
      S.press = { x: e.clientX, y: e.clientY }
      S.grab = { x: e.clientX - S.x, y: e.clientY - petTop() }
      S.trail = [{ x: e.clientX, y: e.clientY, t: now() }]
    }
    const onDrag = (e) => {
      if (!S.press) return
      if (!S.held && Math.hypot(e.clientX - S.press.x, e.clientY - S.press.y) > 5) {
        S.held = true
        S.sleeping = false
        say('wheee!', 1600)
      }
      if (!S.held) return
      S.x = e.clientX - S.grab.x
      S.y = Math.max(0, window.innerHeight - GROUND - H - (e.clientY - S.grab.y))
      S.trail.push({ x: e.clientX, y: e.clientY, t: now() })
      if (S.trail.length > 5) S.trail.shift()
    }
    const onUp = () => {
      if (!S.press) return
      if (S.held) {
        const a = S.trail[0], b = S.trail[S.trail.length - 1]
        const dt = Math.max(16, b.t - a.t) / 16
        S.vx = Math.max(-25, Math.min(25, (b.x - a.x) / dt))
        S.vy = Math.max(-25, Math.min(25, -(b.y - a.y) / dt))
        S.held = false
        if (Math.hypot(S.vx, S.vy) > 8) unlock('throw')
      } else {
        poke()
      }
      S.press = null
      S.lastMove = now()
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onDrag)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('keydown', onKey)
    window.addEventListener('byte', onByte)

    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        const id = en.target.id
        if (en.isIntersecting && !S.seen.has(id) && SECTION_LINES[id]) {
          S.seen.add(id)
          if (now() > S.talkUntil) say(SECTION_LINES[id])
        }
      })
    }, { threshold: 0.3 })
    Object.keys(SECTION_LINES).forEach(id => {
      const el = document.getElementById(id)
      if (el) sectionObs.observe(el)
    })

    const greet = setTimeout(() => say('hi! I’m Byte. drag me around →', 4000), 1400)

    let raf, frame = 0, last = now(), navRect = null
    const floorAt = (x) => {
      if (!navRect) return 0
      const cx = x + W / 2
      if (cx < navRect.left + 4 || cx > navRect.right - 4) return 0
      return Math.max(0, window.innerHeight - GROUND - navRect.top)
    }

    const loop = () => {
      const t = now()
      const dt = Math.min(3, (t - last) / 16.67)
      last = t
      frame++
      const vw = window.innerWidth
      let legs = 'idle'
      let walking = false
      navRect = document.querySelector('nav')?.getBoundingClientRect() || null
      const floor = floorAt(S.x)

      if (S.held) {
        legs = 'air'
      } else if (S.y > floor + 0.5 || S.vy !== 0) {
        S.vy -= 0.55 * dt
        S.y += S.vy * dt
        S.x += S.vx * dt
        S.vx *= 0.995
        if (S.x < 0) { S.x = 0; S.vx = -S.vx * 0.6 }
        if (S.x > vw - W) { S.x = vw - W; S.vx = -S.vx * 0.6 }
        const maxY = window.innerHeight - GROUND - H
        if (S.y > maxY) { S.y = maxY; S.vy = -Math.abs(S.vy) * 0.4 }
        legs = 'air'
        const landY = floorAt(S.x)
        if (S.y <= landY && S.vy <= 0) {
          S.y = landY
          if (S.vy < -9) {
            S.vy = -S.vy * 0.35
            S.vx *= 0.5
            S.dizzyUntil = t + 1600
            say('whoa... I see stack traces', 2000)
            burst(3, () => ({ text: '*', color: '#fbbf24' }))
          } else {
            S.vy = 0
            S.vx = 0
          }
        }
      } else if (t < S.dizzyUntil) {
        // stunned
      } else {
        const idleFor = t - S.lastMove
        if (!S.sleeping && idleFor > 14000 && t > S.talkUntil && t > S.partyUntil) {
          S.sleeping = true
          say('zzz... (saving my progress)', 2200)
        }
        if (!S.sleeping) {
          let target = null
          if (S.mouseX !== null && idleFor < 5000) {
            target = S.mouseX - W / 2
          } else {
            if (t > S.nextWander) {
              S.wanderX = 20 + Math.random() * Math.max(0, vw - W - 40)
              S.nextWander = t + 5000 + Math.random() * 4000
            }
            target = S.wanderX
          }
          if (target !== null) {
            const dist = target - S.x
            if (Math.abs(dist) > 36) {
              const sp = Math.min(2.4, Math.abs(dist) * 0.03 + 0.7) * dt
              S.dir = Math.sign(dist)
              const ledge = floorAt(S.x + S.dir * (sp + 6)) - S.y
              if (ledge > 2) {
                S.vy = Math.sqrt(2 * 0.55 * (ledge + 14))
                S.vx = S.dir * 2.2
              } else {
                S.x += S.dir * sp
              }
              walking = true
            } else if (S.wanderX !== null && target === S.wanderX) {
              S.wanderX = null
            }
          }
          if (walking) legs = Math.floor(frame / 7) % 2 ? 'walkA' : 'walkB'
        }
      }
      S.x = Math.max(0, Math.min(vw - W, S.x))

      if (S.partyUntil > t && t - S.lastConfetti > 140) {
        S.lastConfetti = t
        if (S.vy === 0 && !S.held) S.vy = 6
        burst(3, () => ({ color: `hsl(${Math.random() * 360} 90% 60%)`, size: 5 }))
      }
      if (S.sleeping && t - S.lastZ > 1100) {
        S.lastZ = t
        spawn(layer, S.x + W - 10, petTop(), { text: 'z', color: '#6ee7b7', dx: 20, dy: -50, duration: 1800 })
      }

      if (t > S.blinkAt + 140) S.blinkAt = t + 2000 + Math.random() * 3500
      let mood = 'open'
      if (S.held) mood = 'surprised'
      else if (t < S.dizzyUntil) mood = 'dizzy'
      else if (t < S.happyUntil || t < S.partyUntil) mood = 'happy'
      else if (S.sleeping) mood = 'sleep'
      else if (t > S.blinkAt) mood = 'blink'

      let look = 0
      if (walking) look = S.dir
      else if (S.mouseX !== null) look = (S.mouseX - (S.x + W / 2)) / 160

      drawSprite(ctx, {
        mood, look, legs, party: t < S.partyUntil, talking: t < S.talkUntil, t,
      })

      const bob = !walking && S.vy === 0 && !S.held && !S.sleeping ? (Math.floor(t / 500) % 2) * 2 : 0
      const squish = S.sleeping ? 'scaleY(0.94)' : ''
      petRef.current.style.transform = `translate3d(${S.x}px, ${-S.y - bob}px, 0) ${squish}`

      const b = bubbleRef.current
      if (b) {
        const bw = b.offsetWidth
        const bx = Math.max(8, Math.min(vw - bw - 8, S.x + W / 2 - bw / 2))
        b.style.transform = `translate3d(${bx}px, ${petTop() - b.offsetHeight - 12}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(greet)
      clearTimeout(bubbleTimer)
      sectionObs.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onDrag)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('byte', onByte)
    }
  }, [])

  return (
    <div ref={layerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 900 }}>
      <div
        ref={petRef}
        style={{ position: 'absolute', left: 0, bottom: GROUND, width: W, height: H, transformOrigin: 'bottom center' }}
      >
        <canvas
          ref={canvasRef}
          width={SPRITE_W}
          height={SPRITE_H}
          title="Byte — drag me, click me"
          style={{
            width: W, height: H, imageRendering: 'pixelated', pointerEvents: 'auto',
            cursor: 'grab', touchAction: 'none',
          }}
        />
      </div>
      {bubble && (
        <div
          key={bubble.key}
          ref={bubbleRef}
          className="pixel-bubble"
          style={{ position: 'absolute', left: 0, top: 0 }}
        >
          {bubble.text}
        </div>
      )}
    </div>
  )
}
