import { useEffect, useRef } from 'react'

const ellipse = (px, cx, cy, rx, ry, c) => {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
      if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1) px(x, y, 1, 1, c)
    }
  }
}

const ICONS = {
  brain(px) {
    ellipse(px, 7.5, 7.5, 6.5, 5, '#f472b6')
    ellipse(px, 6, 5.5, 2.5, 1.5, '#f9a8d4')
    ;[[4, 6, 3], [9, 5, 3], [6, 9, 4], [10, 8, 2], [3, 9, 2]].forEach(([x, y, w]) => px(x, y, w, 1, '#be185d'))
    px(7, 3, 1, 10, '#db2777')
    px(7, 12, 2, 3, '#f472b6')
  },
  qr(px) {
    let s = 11
    const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
    px(1, 1, 14, 14, '#e0f2fe')
    for (let y = 1; y < 15; y++) for (let x = 1; x < 15; x++) if (r() > 0.55) px(x, y, 1, 1, '#1e3a8a')
    ;[[1, 1], [10, 1], [1, 10]].forEach(([x, y]) => {
      px(x, y, 5, 5, '#1e3a8a'); px(x + 1, y + 1, 3, 3, '#e0f2fe'); px(x + 2, y + 2, 1, 1, '#1e3a8a')
    })
  },
  ticket(px) {
    px(1, 4, 14, 9, '#fbbf24')
    px(1, 4, 14, 1, '#fde68a')
    px(1, 7, 1, 3, 'transparent')
    px(0, 7, 2, 3, null); px(14, 7, 2, 3, null)
    for (let y = 4; y < 13; y += 2) px(10, y, 1, 1, '#92400e')
    px(3, 6, 5, 1, '#92400e'); px(3, 8, 4, 1, '#b45309'); px(3, 10, 5, 1, '#b45309')
    px(12, 7, 1, 3, '#92400e')
  },
  doc(px) {
    px(2, 1, 9, 13, '#f5f5f4'); px(2, 1, 9, 1, '#ffffff')
    ;[3, 5, 7, 9].forEach((y, i) => px(4, y, i % 2 ? 4 : 6, 1, '#a8a29e'))
    ellipse(px, 10, 9, 3, 3, '#7c3aed'); ellipse(px, 10, 9, 2, 2, '#c4b5fd')
    px(12, 12, 2, 2, '#4c1d95'); px(14, 14, 1, 1, '#4c1d95')
  },
  trophy(px) {
    px(4, 2, 8, 5, '#fbbf24'); px(5, 7, 6, 1, '#fbbf24'); px(6, 8, 4, 1, '#f59e0b')
    px(10, 2, 2, 5, '#d97706'); px(5, 3, 1, 3, '#fef3c7')
    px(2, 3, 2, 1, '#fbbf24'); px(2, 4, 1, 2, '#fbbf24'); px(3, 6, 1, 1, '#fbbf24')
    px(12, 3, 2, 1, '#fbbf24'); px(13, 4, 1, 2, '#fbbf24'); px(12, 6, 1, 1, '#fbbf24')
    px(7, 9, 2, 2, '#d97706'); px(5, 11, 6, 1, '#fbbf24'); px(4, 12, 8, 2, '#78350f')
  },
  star(px) {
    const c = '#e5e7eb'
    px(7, 1, 2, 3, c); px(6, 4, 4, 1, c); px(1, 5, 14, 1, c); px(2, 6, 12, 1, c); px(3, 7, 10, 1, c)
    px(4, 8, 8, 2, c); px(3, 10, 4, 1, c); px(9, 10, 4, 1, c); px(3, 11, 3, 1, c); px(10, 11, 3, 1, c)
    px(2, 12, 2, 1, c); px(12, 12, 2, 1, c); px(7, 5, 1, 2, '#ffffff'); px(9, 6, 3, 2, '#9ca3af')
  },
  medal(px) {
    px(4, 0, 3, 7, '#ef4444'); px(9, 0, 3, 7, '#3b82f6'); px(6, 5, 4, 2, '#1f2937')
    ellipse(px, 7.5, 10.5, 4, 4, '#d97706'); ellipse(px, 7.5, 10.5, 2.5, 2.5, '#fbbf24')
    px(7, 9, 1, 3, '#92400e')
  },
  globe(px) {
    ellipse(px, 7.5, 7.5, 6.5, 6.5, '#2563eb')
    ;[[4, 3, 4, 2], [3, 5, 3, 3], [9, 6, 4, 3], [5, 10, 3, 2], [10, 11, 2, 1]].forEach(([x, y, w, h]) => px(x, y, w, h, '#22c55e'))
    px(7, 1, 1, 14, 'rgba(255,255,255,0.35)'); px(1, 7, 14, 1, 'rgba(255,255,255,0.35)')
  },
  scroll(px) {
    px(3, 3, 10, 10, '#fef3c7'); px(2, 2, 12, 2, '#d6b98c'); px(2, 12, 12, 2, '#d6b98c')
    ;[5, 7, 9].forEach(y => px(5, y, 6, 1, '#a8a29e'))
    px(10, 9, 3, 3, '#dc2626'); px(11, 12, 1, 2, '#dc2626')
  },
  lock(px) {
    px(5, 2, 6, 1, '#6b7280'); px(4, 3, 1, 4, '#6b7280'); px(11, 3, 1, 4, '#6b7280')
    px(3, 7, 10, 7, '#4b5563'); px(3, 7, 10, 1, '#6b7280'); px(7, 9, 2, 2, '#111827'); px(7, 11, 1, 2, '#111827')
  },
}

export function drawIcon(ctx, name, ox = 0, oy = 0, scale = 1) {
  const fn = ICONS[name]
  if (!fn) return
  fn((x, y, w, h, c) => {
    if (c === null) { ctx.clearRect(ox + x * scale, oy + y * scale, w * scale, h * scale); return }
    if (c === 'transparent') return
    ctx.fillStyle = c
    ctx.fillRect(ox + x * scale, oy + y * scale, w * scale, h * scale)
  })
}

export default function PixelIcon({ name, size = 32, className, style }) {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = ref.current.getContext('2d')
    ctx.clearRect(0, 0, 16, 16)
    drawIcon(ctx, name)
  }, [name])
  return (
    <canvas
      ref={ref}
      width={16}
      height={16}
      className={className}
      aria-hidden="true"
      style={{ width: size, height: size, imageRendering: 'pixelated', display: 'block', ...style }}
    />
  )
}
