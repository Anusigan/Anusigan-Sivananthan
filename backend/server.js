import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const portfolioData = {
  personal: {
    name: "Anusigan Sivananthan",
    title: "Software Engineer",
    roles: ["Full Stack Developer", "AI Enthusiast", "Problem Solver", "Computer Science Undergraduate"],
    email: "sivananthan.20230297@iit.ac.lk",
    phone: "+94 775 810 310",
    location: "Wellawatte, Sri Lanka",
    github: "https://github.com/Anusigan",
    linkedin: "https://linkedin.com/in/Anusigan-Sivananthan",
    bio: "Driven Computer Science final year undergraduate with strong programming and problem-solving skills, complemented by hands-on industry experience as an Intern Software Engineer at IFS R&D. Passionate about building reliable systems and contributing to impactful software projects."
  },
  skills: {
    languages: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "Java", level: 85 },
      { name: "TypeScript", level: 75 },
      { name: "PHP", level: 70 },
      { name: "Dart", level: 72 },
      { name: "SQL / PL-SQL", level: 85 },
    ],
    frameworks: [
      { name: "React", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "Spring Boot", level: 80 },
      { name: "Flutter", level: 75 },
      { name: "Express.js", level: 83 },
      { name: "IFS Aurena", level: 80 },
    ],
    tools: ["Git", "Bitbucket", "Jira", "Figma", "VS Code", "IntelliJ", "Postman", "Supabase", "PostgreSQL", "Adobe Photoshop"]
  },
  experience: [
    {
      role: "Undergraduate Trainee Software Engineer",
      company: "IFS R&D International (Pvt) Ltd",
      duration: "July 2025 – Present",
      location: "Sri Lanka",
      points: [
        "Deliver user stories within agile sprints, supporting feature development",
        "Develop functional enhancements aligned with system requirements",
        "Identify and resolve software defects across releases",
        "Handle customer-reported issues to ensure timely fixes",
        "Collaborate with developers, QA, and product owners",
        "Apply spec-driven development to translate specifications into structured implementations",
        "Contribute to LUMOS by developing MCP tools for AI-assisted engineering",
        "Apply agentic AI workflows to streamline development and problem-solving"
      ],
      tech: ["PL/SQL", "IFS Aurena Framework", "Bitbucket", "Jira"]
    }
  ],
  education: [
    {
      degree: "BSc (Hons) Computer Science",
      institution: "Informatics Institute of Technology",
      affiliation: "Affiliated with the University of Westminster",
      duration: "2024 – Present",
      grades: "Level 04: 80.67% avg | Level 05: 74.8% avg"
    },
    {
      degree: "Foundation Certificate in Higher Education",
      institution: "Informatics Institute of Technology",
      duration: "2023",
      grades: "Distinction"
    },
    {
      degree: "Primary & Secondary Education",
      institution: "Hindu College Colombo",
      duration: "2009 – 2022",
      grades: "9 A's – GCE O/L (2019)"
    }
  ],
  projects: [
    {
      title: "MemoRaid",
      subtitle: "Personalized Memory Rehabilitation Platform",
      description: "A memory recovery platform for amnesia rehabilitation, providing personalized cognitive exercises and progress tracking for patients recovering from memory impairments.",
      tech: ["Flutter", "Dart", "Node.js", "Supabase", "React"],
      category: "Full Stack",
      github: "https://github.com/Anusigan",
      featured: true
    },
    {
      title: "MyAttenef",
      subtitle: "University Attendance Management System",
      description: "Full-stack attendance management system with QR-based attendance marking and geolocation verification for students and lecturers, with CI/CD pipeline.",
      tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Supabase", "Flutter"],
      category: "Full Stack",
      github: "https://github.com/Anusigan",
      featured: true
    },
    {
      title: "Event Ticketing System",
      subtitle: "Concurrent Full Stack Application",
      description: "Full-stack event ticketing system using a Producer–Consumer model for efficient concurrent ticket management, handling high-volume ticket sales.",
      tech: ["React", "Spring Boot", "Java"],
      category: "Full Stack",
      github: "https://github.com/Anusigan",
      featured: true
    },
    {
      title: "NLP Resume Analyzer",
      subtitle: "AI-Driven Skill Gap Analyzer",
      description: "AI system that analyzes resumes against job descriptions to identify skill gaps, calculate skill-match percentages, and provide actionable recommendations.",
      tech: ["Python", "spaCy", "NLP", "Data Visualization"],
      category: "AI / ML",
      github: "https://github.com/Anusigan",
      featured: false
    }
  ],
  achievements: [
    { title: "Semi-Finalists – Masterminds", org: "IFS", year: "2026", icon: "trophy" },
    { title: "Finalist – Traveltech 3.0", org: "Acornic Ventures", year: "2025", icon: "star" },
    { title: "Finalist – Haxmas 2024", org: "Ascentic & RACIIT", year: "2024", icon: "star" },
    { title: "Third Place – Haxpedition", org: "IEEE Student Branch of IIT", year: "2024", icon: "medal" },
    { title: "Global Rank 1214 | Country Rank 96 | University Rank 4", org: "IEEE Xtreme 17.0", year: "2023", icon: "globe" },
    { title: "Distinction – Foundation Certificate", org: "IIT", year: "2023", icon: "award" },
    { title: "9 A's – GCE O/L Examination", org: "Hindu College", year: "2019", icon: "award" }
  ],
  certifications: [
    "IFS Certified Practitioner – Development (IFS Cloud)",
    "IFS Learning Achievement – Operational Report Development",
    "IFS Learning Achievement – Lifecycle Experience",
    "Postman Student Expert",
    "Networking Foundations – LinkedIn",
    "Introduction to Python – University of Moratuwa",
    "Develop Generative AI Solutions with Azure OpenAI – Microsoft",
    "Java Development – SoloLearn",
    "Explore Azure DevOps with GitHub – Microsoft"
  ],
  leadership: [
    "Media Director – IET on Campus, IIT",
    "Team Recruitment Lead – Hult Prize On Campus Program",
    "SDGP Project Lead – MemoRaid",
    "Member – IEEE, Informatics Institute of Technology",
    "Member – IEEE Computer Society, IIT",
    "Member – Rotaract Club of IIT"
  ]
};

app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }
  console.log(`[Contact] From: ${name} <${email}> — ${message}`);
  res.json({ success: true, message: 'Message received! I will get back to you soon.' });
});

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`);
});
