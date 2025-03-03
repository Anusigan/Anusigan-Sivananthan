import React from 'react';
import { Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.footer 
      className="bg-gray-900 dark:bg-black text-white py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-8"
          variants={containerVariants}
        >
          <motion.div className="mb-6 md:mb-0" variants={itemVariants}>
            <h2 className="text-2xl font-bold text-indigo-400 mb-2">John Doe</h2>
            <p className="text-gray-400">Computer Science Undergraduate</p>
          </motion.div>
          
          <div className="flex space-x-4">
            {[
              { icon: <Github size={20} />, url: "https://github.com" },
              { icon: <Linkedin size={20} />, url: "https://linkedin.com" },
              { icon: <Mail size={20} />, url: "mailto:john.doe@example.com" },
              { icon: <Twitter size={20} />, url: "https://twitter.com" },
              { icon: <Instagram size={20} />, url: "https://instagram.com" }
            ].map((social, index) => (
              <motion.a 
                key={index}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-indigo-600 transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                custom={index}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-800 pt-8"
          variants={containerVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-gray-400 mb-4 md:mb-0"
              variants={itemVariants}
            >
              &copy; {currentYear} John Doe. All rights reserved.
            </motion.p>
            
            <motion.nav 
              className="flex flex-wrap justify-center gap-4"
              variants={containerVariants}
            >
              {[
                { name: "About", href: "#about" },
                { name: "Education", href: "#education" },
                { name: "Skills", href: "#skills" },
                { name: "Projects", href: "#projects" },
                { name: "Achievements", href: "#achievements" },
                { name: "Certifications", href: "#certifications" },
                { name: "Contact", href: "#contact" }
              ].map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.href} 
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.nav>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;