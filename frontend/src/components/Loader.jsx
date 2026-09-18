import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--bg-primary)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '24px'
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 56, height: 56,
          borderRadius: '50%',
          border: '3px solid rgba(124,58,237,0.15)',
          borderTopColor: '#7c3aed',
          borderRightColor: '#06b6d4'
        }}
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          letterSpacing: '0.1em'
        }}
      >
        initializing...
      </motion.p>
    </motion.div>
  )
}
