import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react'

const experience = [
  {
    role: "Undergraduate Trainee Software Engineer",
    company: "IFS R&D International (Pvt) Ltd",
    duration: "July 2025 – Present",
    type: "work",
    points: [
      "Deliver user stories within agile sprints, supporting feature development",
      "Develop functional enhancements aligned with system requirements",
      "Identify and resolve software defects across releases",
      "Handle customer-reported issues to ensure timely fixes",
      "Apply spec-driven development to translate specifications into implementations",
      "Contribute to LUMOS by developing MCP tools for AI-assisted engineering",
      "Apply agentic AI workflows to streamline development and problem-solving",
    ],
    tech: ["PL/SQL", "IFS Aurena", "Bitbucket", "Jira"]
  }
]

const education = [
  {
    degree: "BSc (Hons) Computer Science",
    institution: "IIT – University of Westminster",
    duration: "2024 – Present",
    detail: "Level 04: 80.67% avg | Level 05: 74.8% avg"
  },
  {
    degree: "Foundation Certificate in Higher Education",
    institution: "Informatics Institute of Technology",
    duration: "2023",
    detail: "Distinction"
  },
  {
    degree: "Primary & Secondary Education",
    institution: "Hindu College Colombo",
    duration: "2009 – 2022",
    detail: "9 A's – GCE O/L Examination (2019)"
  }
]

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">03. Experience</p>
          <h2 className="section-title">
            My <span className="gradient-text">Journey</span>
          </h2>
          <div className="divider" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px' }}>
          {/* Work Experience */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', fontSize: '1.1rem', fontWeight: 700 }}
            >
              <Briefcase size={20} color="#a78bfa" /> Work Experience
            </motion.h3>

            {experience.map((exp, i) => (
              <motion.div
                key={i}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: 'linear-gradient(90deg, #7c3aed, #06b6d4)'
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{exp.role}</h4>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem', color: 'var(--accent-cyan)',
                    background: 'rgba(6,182,212,0.1)', padding: '3px 10px',
                    borderRadius: '6px', border: '1px solid rgba(6,182,212,0.2)'
                  }}>
                    {exp.duration}
                  </span>
                </div>
                <p style={{ color: '#a78bfa', fontSize: '0.9rem', fontWeight: 600, marginBottom: '16px' }}>
                  {exp.company}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                      <CheckCircle2 size={14} color="#34d399" style={{ flexShrink: 0, marginTop: 3 }} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {exp.tech.map(t => <span key={t} className="tag" style={{ fontSize: '0.75rem' }}>{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', fontSize: '1.1rem', fontWeight: 700 }}
            >
              <GraduationCap size={20} color="#38bdf8" /> Education
            </motion.h3>

            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              <div style={{
                position: 'absolute', left: '8px', top: 0, bottom: 0, width: '2px',
                background: 'linear-gradient(180deg, #7c3aed, #06b6d4, transparent)'
              }} />

              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                  style={{ position: 'relative', marginBottom: '28px' }}
                >
                  <div style={{
                    position: 'absolute', left: '-28px', top: '6px',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                    boxShadow: '0 0 12px rgba(124,58,237,0.5)'
                  }} />
                  <div className="card" style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{edu.degree}</h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
                        {edu.duration}
                      </span>
                    </div>
                    <p style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>{edu.institution}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{edu.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
