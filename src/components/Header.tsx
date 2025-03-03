import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-800 shadow-md' 
          : 'bg-transparent dark:bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <motion.a 
            href="#" 
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            John Doe
          </motion.a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>
          
          {/* Social Links and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ y: 0, scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ y: 0, scale: 0.9 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a 
              href="mailto:john.doe@example.com" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ y: 0, scale: 0.9 }}
            >
              <Mail size={20} />
            </motion.a>
            <motion.button
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ rotate: 0, scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none" 
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden py-4 bg-white dark:bg-gray-800 rounded-b-lg shadow-lg"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
            >
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href} 
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-4"
                    onClick={() => setIsMenuOpen(false)}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.div 
                  className="flex space-x-4 pt-2 px-4"
                  variants={itemVariants}
                >
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="mailto:john.doe@example.com" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <Mail size={20} />
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;