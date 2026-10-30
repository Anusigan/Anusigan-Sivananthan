import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const BOOT = [
  ['ANUSIGAN BIOS v2.0.26', ''],
  ['checking memory', '16384K OK'],
  ['loading react, node, python, pl/sql', 'OK'],
  ['mounting /dev/agentic-ai', 'OK'],
  ['starting mcp tool server', 'OK'],
  ['waking up byte (pet.exe)', 'OK'],
]
const BLOCKS = 24

export default function Loader({ onDone }) {
  const [shown, setShown] = useState(0)
  const [blocks, setBlocks] = useState(0)

  useEffect(() => {
    const timers = BOOT.map((_, i) => setTimeout(() => setShown(i + 1), 120 + i * 170))
    const start = 120 + BOOT.length * 170
    const bar = setInterval(() => setBlocks(b => Math.min(BLOCKS, b + 1)), 60)
    const end = setTimeout(onDone, start + 450)
    const skip = () => onDone()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(bar)
      clearTimeout(end)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'brightness(3)', transition: { duration: 0.35 } }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, background: '#030806',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
    >
      <div style={{ width: 'min(520px, 100%)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#34d399', textShadow: '0 0 8px rgba(16,185,129,0.5)' }}>
        {BOOT.slice(0, shown).map(([label, status], i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, color: i === 0 ? '#d1fae5' : undefined }}>
            <span>{label}</span>
            {status && <span style={{ flex: 1, borderBottom: '1px dotted rgba(52,211,153,0.3)', transform: 'translateY(-4px)' }} />}
            {status && <span style={{ color: '#d1fae5' }}>{status}</span>}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 3, marginTop: 22 }}>
          {Array.from({ length: BLOCKS }, (_, i) => (
            <span key={i} style={{ flex: 1, height: 12, background: i < blocks ? '#10b981' : 'rgba(16,185,129,0.12)' }} />
          ))}
        </div>
        <div style={{ marginTop: 14, fontFamily: "'Silkscreen', monospace", fontSize: '0.65rem', color: '#1f6f52', letterSpacing: '0.1em' }}>
          press any key to skip
        </div>
      </div>
    </motion.div>
  )
}
