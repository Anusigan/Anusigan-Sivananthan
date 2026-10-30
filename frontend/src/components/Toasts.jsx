import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SECRETS, getUnlocked } from '../secrets'
import PixelIcon from './PixelIcon'

export default function Toasts() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const onSecret = (e) => {
      const s = SECRETS.find(x => x.id === e.detail)
      if (!s) return
      const key = Math.random()
      setToasts(t => [...t, { ...s, key, count: getUnlocked().size }])
      setTimeout(() => setToasts(t => t.filter(x => x.key !== key)), 3600)
    }
    window.addEventListener('secret', onSecret)
    return () => window.removeEventListener('secret', onSecret)
  }, [])

  return (
    <div className="toasts" aria-live="polite">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.key}
            className="toast"
            initial={{ x: 340, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 340, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <PixelIcon name="trophy" size={36} />
            <div>
              <div className="toast-kicker">achievement unlocked · {t.count}/{SECRETS.length}</div>
              <div className="toast-title">{t.title}</div>
              <div className="toast-desc">{t.desc}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
