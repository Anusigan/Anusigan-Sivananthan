export const PROFILE = {
  name: 'Anusigan Sivananthan',
  email: 'sivananthan.20230297@iit.ac.lk',
  phone: '+94 775 810 310',
  location: 'Wellawatte, Colombo, Sri Lanka',
  github: 'https://github.com/Anusigan',
  githubUser: 'Anusigan',
  linkedin: 'https://linkedin.com/in/Anusigan-Sivananthan',
}

export const PROJECTS = [
  {
    id: 'memoraid',
    title: 'MemoRaid',
    subtitle: 'Personalized memory rehabilitation platform',
    description: 'A memory recovery platform for amnesia rehabilitation. Patients get personalised cognitive exercises with real-time progress tracking, and difficulty adapts as they improve.',
    role: 'SDGP project lead',
    tech: ['Flutter', 'Dart', 'Node.js', 'Supabase', 'React'],
    category: 'Full stack · HealthTech',
    link: 'https://github.com/Anusigan/MemoRaid-Landing-Page',
    linkLabel: 'landing page repo',
    color: '#f472b6',
    icon: 'brain',
  },
  {
    id: 'myattenef',
    title: 'MyAttenef',
    subtitle: 'University attendance management system',
    description: 'QR-based check-in with geolocation verification and real-time dashboards for students and lecturers, plus a CI/CD pipeline and a companion Flutter mobile app.',
    tech: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'Flutter'],
    category: 'Full stack · EdTech',
    link: 'https://github.com/Anusigan',
    linkLabel: 'github',
    color: '#60a5fa',
    icon: 'qr',
  },
  {
    id: 'ticketing',
    title: 'Event Ticketing',
    subtitle: 'Concurrent full-stack ticketing system',
    description: 'High-volume ticket sales built on a Producer–Consumer model. Thread-safe operations keep concurrent buyers from racing each other or losing tickets.',
    tech: ['React', 'Spring Boot', 'Java'],
    category: 'Full stack · Concurrency',
    link: 'https://github.com/Anusigan',
    linkLabel: 'github',
    color: '#fbbf24',
    icon: 'ticket',
  },
  {
    id: 'resume',
    title: 'NLP Resume Analyzer',
    subtitle: 'AI-driven skill gap analyzer',
    description: 'Compares resumes against job descriptions with NLP to surface skill gaps, calculate match percentages and give actionable career recommendations. spaCy handles entity extraction.',
    tech: ['Python', 'spaCy', 'NLP', 'Data Visualization'],
    category: 'AI / ML',
    link: 'https://github.com/Anusigan',
    linkLabel: 'github',
    color: '#a78bfa',
    icon: 'doc',
  },
]

export const WORK = {
  role: 'Undergraduate Trainee Software Engineer',
  company: 'IFS R&D International',
  duration: 'July 2025 – present',
  location: 'Colombo, Sri Lanka',
  points: [
    'Deliver user stories within agile sprints, supporting feature development',
    'Develop functional enhancements aligned with system requirements',
    'Identify and resolve software defects across releases',
    'Handle customer-reported issues to ensure timely fixes',
    'Collaborate with developers, QA and product owners',
    'Apply spec-driven development to turn specifications into structured implementations',
    'Contribute to LUMOS by developing MCP tools for AI-assisted engineering',
    'Apply agentic AI workflows to streamline development and problem-solving',
  ],
  tech: ['PL/SQL', 'IFS Aurena', 'Bitbucket', 'Jira'],
}

export const EDUCATION = [
  { id: 'bsc', title: 'BSc (Hons) Computer Science', org: 'Informatics Institute of Technology · University of Westminster', duration: '2024 – present', reward: 'Level 4: 80.67% · Level 5: 74.8%', status: 'in progress' },
  { id: 'found', title: 'Foundation Certificate in Higher Education', org: 'Informatics Institute of Technology', duration: '2023', reward: 'Distinction', status: 'complete' },
  { id: 'school', title: 'Primary & Secondary Education', org: 'Hindu College Colombo', duration: '2009 – 2022', reward: "9 A's at GCE O/L (2019)", status: 'complete' },
]

export const ACHIEVEMENTS = [
  { title: 'Semi-finalist', event: 'Masterminds', org: 'IFS', year: '2026', tier: 'gold', icon: 'trophy' },
  { title: 'Finalist', event: 'Traveltech 3.0', org: 'Acornic Ventures', year: '2025', tier: 'silver', icon: 'star' },
  { title: 'Finalist', event: 'Haxmas 2024', org: 'Ascentic & RACIIT', year: '2024', tier: 'silver', icon: 'star' },
  { title: 'Third place', event: 'Haxpedition', org: 'IEEE Student Branch of IIT', year: '2024', tier: 'bronze', icon: 'medal' },
  { title: 'Global rank 1214', event: 'IEEE Xtreme 17.0', org: 'Country rank 96 · University rank 4', year: '2023', tier: 'gold', icon: 'globe' },
  { title: 'Distinction', event: 'Foundation Certificate', org: 'Informatics Institute of Technology', year: '2023', tier: 'silver', icon: 'scroll' },
  { title: "9 A's", event: 'GCE O/L Examination', org: 'Hindu College Colombo', year: '2019', tier: 'bronze', icon: 'scroll' },
]

export const CERTIFICATIONS = [
  { name: 'IFS Certified Practitioner – Development (IFS Cloud)', by: 'IFS' },
  { name: 'Operational Report Development', by: 'IFS Learning' },
  { name: 'Lifecycle Experience', by: 'IFS Learning' },
  { name: 'Develop Generative AI Solutions with Azure OpenAI', by: 'Microsoft' },
  { name: 'Explore Azure DevOps with GitHub', by: 'Microsoft' },
  { name: 'Postman Student Expert', by: 'Postman' },
  { name: 'Networking Foundations', by: 'LinkedIn' },
  { name: 'Introduction to Python', by: 'University of Moratuwa' },
  { name: 'Java Development', by: 'SoloLearn' },
]

export const LEADERSHIP = [
  { role: 'Media Director', org: 'IET on Campus, IIT' },
  { role: 'Team Recruitment Lead', org: 'Hult Prize On Campus Program' },
  { role: 'SDGP Project Lead', org: 'MemoRaid' },
  { role: 'Member', org: 'IEEE, IIT' },
  { role: 'Member', org: 'IEEE Computer Society, IIT' },
  { role: 'Member', org: 'Rotaract Club of IIT' },
]

export const INTERESTS = ['Machine Learning', 'Agentic AI', 'System Design', 'Explainable AI', 'Cybersecurity', 'Software Engineering']

export const SKILLS = [
  { name: 'Python', short: 'PY', kind: 'language', color: '#3b82f6' },
  { name: 'JavaScript', short: 'JS', kind: 'language', color: '#eab308' },
  { name: 'TypeScript', short: 'TS', kind: 'language', color: '#2563eb' },
  { name: 'Java', short: 'JV', kind: 'language', color: '#ea580c' },
  { name: 'PL/SQL', short: 'SQL', kind: 'language', color: '#dc2626', aliases: ['SQL / PL-SQL'] },
  { name: 'Dart', short: 'DT', kind: 'language', color: '#0ea5e9' },
  { name: 'PHP', short: 'PHP', kind: 'language', color: '#8b5cf6' },
  { name: 'React', short: 'RE', kind: 'framework', color: '#22d3ee' },
  { name: 'Node.js', short: 'ND', kind: 'framework', color: '#22c55e' },
  { name: 'Express.js', short: 'EX', kind: 'framework', color: '#a3a3a3' },
  { name: 'Spring Boot', short: 'SB', kind: 'framework', color: '#65a30d' },
  { name: 'Flutter', short: 'FL', kind: 'framework', color: '#38bdf8' },
  { name: 'IFS Aurena', short: 'IFS', kind: 'framework', color: '#7c3aed' },
  { name: 'spaCy', short: 'NLP', kind: 'framework', color: '#06b6d4' },
  { name: 'Supabase', short: 'SU', kind: 'tool', color: '#10b981' },
  { name: 'PostgreSQL', short: 'PG', kind: 'tool', color: '#3b82f6' },
  { name: 'Git', short: 'GIT', kind: 'tool', color: '#f97316' },
  { name: 'Bitbucket', short: 'BB', kind: 'tool', color: '#2563eb' },
  { name: 'Jira', short: 'JR', kind: 'tool', color: '#3b82f6' },
  { name: 'Docker', short: 'DK', kind: 'tool', color: '#0ea5e9' },
  { name: 'Azure DevOps', short: 'AZ', kind: 'tool', color: '#0284c7' },
  { name: 'Postman', short: 'PM', kind: 'tool', color: '#f97316' },
  { name: 'Figma', short: 'FG', kind: 'tool', color: '#ec4899' },
  { name: 'MCP', short: 'MCP', kind: 'tool', color: '#10b981' },
]

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

export function usedIn(skill) {
  const names = [skill.name, ...(skill.aliases || [])].map(norm)
  const hits = PROJECTS.filter(p => p.tech.some(t => names.includes(norm(t)))).map(p => p.title)
  if (WORK.tech.some(t => names.includes(norm(t)))) hits.unshift('IFS R&D')
  if (skill.name === 'MCP') hits.unshift('IFS R&D (LUMOS)')
  return hits
}
