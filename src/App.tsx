import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Award, BookOpen, Code, Briefcase, GraduationCap, FileCheck, Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <About />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      
      {/* Floating theme toggle button for mobile */}
      <motion.button
        className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg md:hidden z-50"
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
    </div>
  );
}

export default App;