import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // More direct, bold container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  // Stronger, more direct item animations
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  // More bold, strong image animation
  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  // Dark theme-friendly background decoration
  const decorationVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.4,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20,
        delay: 0.4
      }
    }
  };

  return (
    <motion.section 
      id="about" 
      className="py-20 relative overflow-hidden bg-gray-50 dark:bg-gray-900"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background decorations - darker for dark theme */}
      <motion.div 
        className="absolute top-20 left-10 w-40 h-40 bg-blue-800 rounded-full filter blur-[80px] opacity-10 dark:opacity-20 z-0"
        variants={decorationVariants}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-60 h-60 bg-indigo-900 rounded-full filter blur-[100px] opacity-10 dark:opacity-20 z-0"
        variants={decorationVariants}
      />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-sm uppercase tracking-widest text-blue-700 dark:text-blue-500 font-bold">About Me</h2>
          <div className="h-1 w-24 bg-blue-700 dark:bg-blue-500 mx-auto mt-1 mb-6 rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div className="order-2 md:order-1" variants={containerVariants}>
            <motion.h1 
              className="text-5xl font-bold text-gray-800 dark:text-white mb-4 relative" 
              variants={itemVariants}
            >
              Anusigan Sivananthan
              <span className="absolute -bottom-2 left-0 h-1 w-20 bg-blue-700 dark:bg-blue-500"></span>
            </motion.h1>
            
            <motion.h2 
              className="text-2xl font-medium text-blue-700 dark:text-blue-500 mb-8" 
              variants={itemVariants}
            >
              Computer Science Undergraduate
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg" 
              variants={itemVariants}
            >
              I'm a passionate computer science student with a focus on software development and artificial intelligence. 
              Currently pursuing my Bachelor's degree at University of Technology, I combine strong theoretical knowledge 
              with practical experience through various projects and internships.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-lg" 
              variants={itemVariants}
            >
              My goal is to leverage technology to solve real-world problems and create impactful solutions. 
              I'm constantly learning and exploring new technologies to expand my skill set.
            </motion.p>
            
            <motion.a 
              href="/resume.pdf" 
              className="inline-flex items-center bg-blue-700 dark:bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors text-lg font-medium shadow-lg dark:shadow-blue-900/30"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(30, 64, 175, 0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={20} className="mr-2" />
              Download Resume
            </motion.a>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2 flex justify-center"
            variants={imageVariants}
          >
            <motion.div 
              className="relative w-72 h-72 md:w-96 md:h-96"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Main image with dark-theme friendly border */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-900 p-1 shadow-xl">
                <div className="absolute inset-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                    alt="John Doe" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Subtle geometric elements instead of bouncy circles */}
              <motion.div 
                className="absolute -bottom-6 -right-6 w-24 h-24 border-4 border-blue-700 dark:border-blue-600 rounded-md z-[-1]"
                animate={{ 
                  rotate: [0, 90],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div 
                className="absolute -top-3 -left-3 w-16 h-16 border-2 border-indigo-800 dark:border-indigo-600 rounded-md z-[-1]"
                animate={{ 
                  rotate: [0, -45],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;