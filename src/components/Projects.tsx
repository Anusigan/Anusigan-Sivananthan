import React, { useState } from 'react';
import { ExternalLink, Github, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const projects = [
    {
      title: "AI-Powered Study Assistant",
      description: "A machine learning application that helps students organize study materials and creates personalized quizzes based on their learning patterns.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      technologies: ["Python", "TensorFlow", "Flask", "React"],
      category: "AI/ML",
      github: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application with features like product catalog, shopping cart, user authentication, and payment integration.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      category: "Web Development",
      github: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Smart Home IoT System",
      description: "An IoT system that connects various smart home devices and provides a unified interface for monitoring and control.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      technologies: ["Raspberry Pi", "Python", "MQTT", "React Native"],
      category: "IoT",
      github: "https://github.com",
      demo: null
    },
    {
      title: "Inventory Management System",
      description: "A database-driven application for tracking inventory, managing suppliers, and generating reports for small businesses.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "Thymeleaf"],
      category: "Software Development",
      github: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Facial Recognition Attendance System",
      description: "An automated attendance system using facial recognition to track student presence in classrooms.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      technologies: ["Python", "OpenCV", "TensorFlow", "Flask"],
      category: "AI/ML",
      github: "https://github.com",
      demo: null
    },
    {
      title: "Personal Finance Tracker",
      description: "A mobile application for tracking expenses, setting budgets, and visualizing spending patterns.",
      image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      technologies: ["React Native", "Firebase", "Chart.js"],
      category: "Mobile Development",
      github: "https://github.com",
      demo: "https://example.com"
    }
  ];

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
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

  const filterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
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

  return (
    <motion.section 
      id="projects" 
      className="py-16"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="mb-12 text-center" variants={titleVariants}>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Projects</h2>
        <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-8"></div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          variants={filterVariants}
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category 
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setActiveFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeFilter}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="h-48 overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <motion.a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} className="mr-1" />
                    <span>Code</span>
                  </motion.a>
                  {project.demo && (
                    <motion.a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} className="mr-1" />
                      <span>Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
};

export default Projects;