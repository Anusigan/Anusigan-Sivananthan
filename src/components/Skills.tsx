import React from 'react';
import { Code, Database, Globe, Server, Cpu, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code size={24} />,
      skills: [
        { name: "Python", proficiency: 90 },
        { name: "Java", proficiency: 85 },
        { name: "JavaScript", proficiency: 80 },
        { name: "C++", proficiency: 75 },
        { name: "TypeScript", proficiency: 70 }
      ]
    },
    {
      title: "Web Development",
      icon: <Globe size={24} />,
      skills: [
        { name: "HTML/CSS", proficiency: 90 },
        { name: "React", proficiency: 85 },
        { name: "Node.js", proficiency: 75 },
        { name: "Express", proficiency: 70 },
        { name: "Tailwind CSS", proficiency: 80 }
      ]
    },
    {
      title: "Databases",
      icon: <Database size={24} />,
      skills: [
        { name: "MySQL", proficiency: 85 },
        { name: "MongoDB", proficiency: 80 },
        { name: "PostgreSQL", proficiency: 75 },
        { name: "Firebase", proficiency: 70 }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: <Server size={24} />,
      skills: [
        { name: "Git", proficiency: 90 },
        { name: "Docker", proficiency: 75 },
        { name: "AWS", proficiency: 65 },
        { name: "CI/CD", proficiency: 70 }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: <Cpu size={24} />,
      skills: [
        { name: "TensorFlow", proficiency: 75 },
        { name: "PyTorch", proficiency: 70 },
        { name: "Scikit-learn", proficiency: 80 },
        { name: "Computer Vision", proficiency: 65 }
      ]
    },
    {
      title: "UI/UX Design",
      icon: <Layout size={24} />,
      skills: [
        { name: "Figma", proficiency: 80 },
        { name: "Adobe XD", proficiency: 70 },
        { name: "Responsive Design", proficiency: 85 },
        { name: "User Research", proficiency: 75 }
      ]
    }
  ];

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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (i: number) => ({
      width: `${i}%`,
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 0.3
      }
    })
  };

  return (
    <motion.section 
      id="skills" 
      className="py-16 bg-gray-50 dark:bg-gray-800"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="mb-12 text-center" variants={titleVariants}>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Skills</h2>
        <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto"></div>
      </motion.div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <motion.div 
            key={index} 
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            variants={cardVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full mr-3">
                <span className="text-indigo-600 dark:text-indigo-400">{category.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{category.title}</h3>
            </div>
            
            <div className="space-y-4">
              {category.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-200">{skill.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <motion.div 
                      className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full" 
                      custom={skill.proficiency}
                      variants={progressVariants}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;