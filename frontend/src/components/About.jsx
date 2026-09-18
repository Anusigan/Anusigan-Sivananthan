import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Cpu, Globe, Users } from 'lucide-react'

const stats = [
  { value: '3+', label: 'Projects Built', icon: Code2 },
  { value: '80%+', label: 'Academic Average', icon: Globe },
  { value: '5+', label: 'Hackathons', icon: Cpu },
  { value: 'IFS', label: 'Industry Experience', icon: Users },
]

const interests = [
  'Machine Learning', 'Software Engineering', 'System Design',
  'Cybersecurity & Secure Systems', 'Explainable AI (XAI)', 'Agentic AI'
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">01. About Me</p>
          <h2 className="section-title">
            Crafting <span className="gradient-text">Digital Experiences</span>
          </h2>
          <div className="divider" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{
              width: '100%', maxWidth: '360px', aspectRatio: '1',
              borderRadius: '20px', position: 'relative',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))',
              border: '1px solid var(--border-hover)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 30% 30%, rgba(124,58,237,0.2), transparent 60%)'
              }} />
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '5rem', marginBottom: '12px' }}>👨‍💻</div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                  anusigan.dev
                </p>
              </div>
              <div style={{
                position: 'absolute', bottom: '-30px', right: '-30px',
                width: '120px', height: '120px', borderRadius: '50%',
                background: 'rgba(6,182,212,0.08)', filter: 'blur(20px)'
              }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '20px', fontSize: '1.05rem' }}>
              I'm a final-year <strong style={{ color: 'var(--text-primary)' }}>Computer Science undergraduate</strong> at
              Informatics Institute of Technology (University of Westminster) and a{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Trainee Software Engineer at IFS R&D</strong>, where I work on
              enterprise software, agile feature development, and AI-driven tooling.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '28px', fontSize: '1.05rem' }}>
              I love building systems that are fast, elegant, and impactful — from full-stack web apps to
              NLP-driven AI tools. Currently exploring <span style={{ color: '#a78bfa' }}>agentic AI workflows</span> and
              contributing to <span style={{ color: 'var(--accent-cyan)' }}>MCP tooling</span> in production.
            </p>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Areas of Interest
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
              {interests.map(i => (
                <span key={i} className="tag">{i}</span>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {stats.map(({ value, label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '8px',
                    background: 'rgba(124,58,237,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={16} color="#a78bfa" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
