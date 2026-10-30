let target = 0
let current = 0
let running = false
let enabled = false

const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight

function canScrollInside(el, dy) {
  while (el && el !== document.body) {
    const style = getComputedStyle(el)
    if (/(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight) {
      if ((dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) || (dy < 0 && el.scrollTop > 0)) return true
    }
    el = el.parentElement
  }
  return false
}

function tick() {
  current += (target - current) * 0.1
  if (Math.abs(target - current) < 0.5) {
    current = target
    running = false
  }
  window.scrollTo(0, current)
  if (running) requestAnimationFrame(tick)
}

function start() {
  if (!running) {
    running = true
    requestAnimationFrame(tick)
  }
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY
  if (!enabled) return window.scrollTo({ top: y, behavior: 'smooth' })
  current = window.scrollY
  target = Math.max(0, Math.min(maxScroll(), y))
  start()
}

export function installSmoothScroll() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = window.matchMedia('(pointer: fine)').matches
  if (reduce || !fine) return
  enabled = true
  target = current = window.scrollY

  window.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.defaultPrevented) return
    const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY
    if (canScrollInside(e.target, dy)) return
    e.preventDefault()
    if (!running) current = target = window.scrollY
    target = Math.max(0, Math.min(maxScroll(), target + dy))
    start()
  }, { passive: false })

  window.addEventListener('scroll', () => {
    if (!running || Math.abs(window.scrollY - current) > 2) {
      target = current = window.scrollY
      running = false
    }
  }, { passive: true })
}
