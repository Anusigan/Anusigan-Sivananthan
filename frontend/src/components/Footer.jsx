import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px 0',
      background: 'var(--bg-primary)'
    }}>
      <div className="container" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'
      }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1rem', fontWeight: 700,
            background: 'linear-gradient(90deg, #a78bfa, #38bdf8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}
        >
          &lt;Anusigan /&gt;
        </motion.p>

        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { icon: Github, href: 'https://github.com/Anusigan' },
            { icon: Linkedin, href: 'https://linkedin.com/in/Anusigan-Sivananthan' },
            { icon: Mail, href: 'mailto:sivananthan.20230297@iit.ac.lk' },
          ].map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i} href={href} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -2, color: '#a78bfa' }}
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          Built with <Heart size={12} color="#ec4899" fill="#ec4899" /> by Anusigan Sivananthan · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
