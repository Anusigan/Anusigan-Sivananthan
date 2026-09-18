import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Trophy, Star, Award, Globe, Medal } from 'lucide-react'

const achievements = [
  { title: "Semi-Finalists – Masterminds", org: "IFS", year: "2026", icon: Trophy, color: "#f59e0b" },
  { title: "Finalist – Traveltech 3.0", org: "Acornic Ventures", year: "2025", icon: Star, color: "#a78bfa" },
  { title: "Finalist – Haxmas 2024", org: "Ascentic & RACIIT", year: "2024", icon: Star, color: "#38bdf8" },
  { title: "Third Place – Haxpedition", org: "IEEE Student Branch of IIT", year: "2024", icon: Medal, color: "#34d399" },
  { title: "IEEE Xtreme 17.0 – Global Rank 1214", org: "Country Rank 96 | University Rank 4", year: "2023", icon: Globe, color: "#ec4899" },
  { title: "Distinction – Foundation Certificate", org: "Informatics Institute of Technology", year: "2023", icon: Award, color: "#f59e0b" },
  { title: "9 A's – GCE O/L Examination", org: "Hindu College Colombo", year: "2019", icon: Award, color: "#a78bfa" },
]

const certifications = [
  "IFS Certified Practitioner – Development (IFS Cloud)",
  "IFS Learning Achievement – Operational Report Development",
  "IFS Learning Achievement – Lifecycle Experience",
  "Postman Student Expert",
  "Networking Foundations – LinkedIn",
  "Introduction to Python – University of Moratuwa",
  "Develop Generative AI Solutions with Azure OpenAI – Microsoft",
  "Java Development – SoloLearn",
  "Explore Azure DevOps with GitHub – Microsoft"
]

const leadership = [
  { role: "Media Director", org: "IET on Campus, IIT", icon: "📢" },
  { role: "Team Recruitment Lead", org: "Hult Prize On Campus Program", icon: "🚀" },
  { role: "SDGP Project Lead", org: "MemoRaid", icon: "🧠" },
  { role: "Member", org: "IEEE & IEEE Computer Society, IIT", icon: "⚡" },
  { role: "Member", org: "Rotaract Club of IIT", icon: "🤝" },
]

export default function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="achievements" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">05. Recognition</p>
          <h2 className="section-title">
            Achievements & <span className="gradient-text">Milestones</span>
          </h2>
          <div className="divider" />
        </motion.div>

        {/* Achievements Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '60px' }}>
          {achievements.map((a, i) => {
            const Icon = a.icon
            return (
              <motion.div
                key={i}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px' }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: '10px', flexShrink: 0,
                  background: `${a.color}18`, border: `1px solid ${a.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={18} color={a.color} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: '4px' }}>{a.title}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '4px' }}>{a.org}</p>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
                    color: a.color, background: `${a.color}15`, padding: '2px 8px',
                    borderRadius: '4px', border: `1px solid ${a.color}25`
                  }}>{a.year}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {/* Certifications */}
          <motion.div
            className="card"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🎓</span> Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%', marginTop: 7, flexShrink: 0,
                    background: 'linear-gradient(135deg, #7c3aed, #06b6d4)'
                  }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.5 }}>{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            className="card"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>👑</span> Leadership & Volunteering
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {leadership.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.07 }}
                  style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', borderRadius: '10px', background: 'rgba(124,58,237,0.06)', border: '1px solid var(--border)' }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{l.icon}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{l.role}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{l.org}</p>
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
