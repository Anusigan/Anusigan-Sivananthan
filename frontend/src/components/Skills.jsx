import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const languages = [
  { name: "Python", level: 90, color: '#a78bfa' },
  { name: "JavaScript", level: 88, color: '#38bdf8' },
  { name: "Java", level: 85, color: '#34d399' },
  { name: "TypeScript", level: 75, color: '#a78bfa' },
  { name: "SQL / PL-SQL", level: 85, color: '#38bdf8' },
  { name: "Dart", level: 72, color: '#34d399' },
  { name: "PHP", level: 70, color: '#a78bfa' },
]

const frameworks = [
  { name: "React", level: 88, color: '#38bdf8' },
  { name: "Node.js", level: 85, color: '#34d399' },
  { name: "Spring Boot", level: 80, color: '#a78bfa' },
  { name: "Express.js", level: 83, color: '#38bdf8' },
  { name: "Flutter", level: 75, color: '#34d399' },
  { name: "IFS Aurena", level: 80, color: '#a78bfa' },
]

const tools = [
  "Git", "Bitbucket", "Jira", "Figma", "VS Code",
  "IntelliJ", "Postman", "Supabase", "PostgreSQL",
  "Adobe Photoshop", "Docker", "Azure DevOps"
]

function SkillBar({ name, level, color, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div ref={ref} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.92rem', fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
          {level}%
        </span>
      </div>
      <div style={{
        height: '6px', borderRadius: '3px',
        background: 'rgba(255,255,255,0.06)', overflow: 'hidden'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            height: '100%', borderRadius: '3px',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 12px ${color}40`
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="section" ref={ref} style={{ background: 'rgba(13,13,26,0.5)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">02. Skills</p>
          <h2 className="section-title">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="divider" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.3rem' }}>⌨️</span> Languages
            </h3>
            {languages.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={0.3 + i * 0.07} />
            ))}
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.3rem' }}>🚀</span> Frameworks & Tech
            </h3>
            {frameworks.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={0.4 + i * 0.07} />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{ marginTop: '40px' }}
          className="card"
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.3rem' }}>🛠️</span> Tools & Platforms
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                className="tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.04 }}
                whileHover={{ scale: 1.08, borderColor: 'rgba(124,58,237,0.5)' }}
                style={{ cursor: 'default', fontSize: '0.85rem', padding: '6px 14px' }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
