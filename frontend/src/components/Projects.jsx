import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Layers } from 'lucide-react'

const projects = [
  {
    title: "MemoRaid",
    subtitle: "Personalized Memory Rehabilitation Platform",
    description: "A memory recovery platform for amnesia rehabilitation, providing personalized cognitive exercises and real-time progress tracking. Built as an SDGP project with a team lead role.",
    tech: ["Flutter", "Dart", "Node.js", "Supabase", "React"],
    category: "Full Stack",
    emoji: "🧠",
    github: "https://github.com/Anusigan",
    featured: true,
    color: "#7c3aed"
  },
  {
    title: "MyAttenef",
    subtitle: "University Attendance Management System",
    description: "Full-stack attendance system with QR-based marking and geolocation verification for students & lecturers. Includes CI/CD pipeline and mobile app built in Flutter.",
    tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Supabase", "Flutter"],
    category: "Full Stack",
    emoji: "📱",
    github: "https://github.com/Anusigan",
    featured: true,
    color: "#06b6d4"
  },
  {
    title: "Event Ticketing System",
    subtitle: "Concurrent Full Stack Application",
    description: "Full-stack event ticketing system using a Producer–Consumer model for efficient concurrent ticket management, handling high-volume ticket sales with thread-safe operations.",
    tech: ["React", "Spring Boot", "Java"],
    category: "Full Stack",
    emoji: "🎟️",
    github: "https://github.com/Anusigan",
    featured: true,
    color: "#34d399"
  },
  {
    title: "NLP Resume Analyzer",
    subtitle: "AI-Driven Skill Gap Analyzer",
    description: "AI system that analyzes resumes against job descriptions to identify skill gaps, calculate skill-match percentages, and provide actionable career recommendations using NLP.",
    tech: ["Python", "spaCy", "NLP", "Data Visualization"],
    category: "AI / ML",
    emoji: "🤖",
    github: "https://github.com/Anusigan",
    featured: false,
    color: "#ec4899"
  }
]

const categories = ['All', 'Full Stack', 'AI / ML']

export default function Projects() {
  const [active, setActive] = useState('All')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <section id="projects" className="section" ref={ref} style={{ background: 'rgba(13,13,26,0.5)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">04. Projects</p>
          <h2 className="section-title">
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <div className="divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '8px 20px', borderRadius: '8px', cursor: 'pointer',
                fontSize: '0.88rem', fontWeight: 500, fontFamily: 'Inter',
                border: '1px solid',
                transition: 'all 0.25s',
                background: active === cat ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' : 'transparent',
                borderColor: active === cat ? 'transparent' : 'var(--border-hover)',
                color: active === cat ? 'white' : 'var(--text-secondary)',
                boxShadow: active === cat ? '0 0 20px rgba(124,58,237,0.3)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: `linear-gradient(90deg, ${project.color}, transparent)`
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '12px',
                    background: `${project.color}18`,
                    border: `1px solid ${project.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.6rem'
                  }}>
                    {project.emoji}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <motion.a
                      href={project.github} target="_blank" rel="noopener noreferrer"
                      whileHover={{ y: -2, color: '#a78bfa' }}
                      style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                    >
                      <Github size={18} />
                    </motion.a>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem', color: project.color, fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  marginBottom: '6px', fontFamily: "'JetBrains Mono', monospace"
                }}>
                  {project.category}
                </span>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px' }}>{project.title}</h3>
                <p style={{ fontSize: '0.82rem', color: '#a78bfa', marginBottom: '12px', fontWeight: 500 }}>{project.subtitle}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.tech.map(t => (
                    <span key={t} className="tag" style={{ fontSize: '0.72rem' }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <a
            href="https://github.com/Anusigan"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ display: 'inline-flex' }}
          >
            <Github size={16} /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
