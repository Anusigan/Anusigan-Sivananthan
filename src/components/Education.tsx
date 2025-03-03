import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const educationData = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      duration: "2021 - Present",
      gpa: "3.8/4.0",
      description: "Specializing in Artificial Intelligence and Machine Learning. Relevant coursework includes Data Structures & Algorithms, Database Systems, Operating Systems, Computer Networks, and Software Engineering.",
      achievements: [
        "Dean's List: Fall 2021, Spring 2022, Fall 2022, Spring 2023",
        "Undergraduate Research Assistant: Working on Natural Language Processing projects",
        "Teaching Assistant: Data Structures & Algorithms (Spring 2023)"
      ]
    },
    {
      degree: "High School Diploma",
      institution: "Central High School",
      duration: "2017 - 2021",
      gpa: "4.0/4.0",
      description: "Advanced Placement courses in Computer Science, Calculus, Physics, and Statistics.",
      achievements: [
        "Valedictorian",
        "President of Computer Science Club",
        "First place in Regional Programming Competition"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
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
      id="education" 
      className="py-16"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="mb-12 text-center" variants={titleVariants}>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Education</h2>
        <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto"></div>
      </motion.div>
      
      <div className="space-y-12">
        {educationData.map((edu, index) => (
          <motion.div 
            key={index} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mr-4">
                <GraduationCap className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{edu.degree}</h3>
                <h4 className="text-lg text-indigo-600 dark:text-indigo-400 mb-2">{edu.institution}</h4>
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                  <Calendar size={16} className="mr-2" />
                  <span>{edu.duration}</span>
                  <span className="mx-3">•</span>
                  <span>GPA: {edu.gpa}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{edu.description}</p>
                
                {edu.achievements.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Highlights:</h5>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Education;