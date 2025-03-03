import React from 'react';
import { Award, Trophy, Star, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const achievements = [
    {
      title: "1st Place - National Hackathon 2023",
      description: "Led a team of 4 to develop an AI-powered solution for healthcare accessibility, competing against 50+ teams nationwide.",
      icon: <Trophy size={24} />,
      date: "June 2023"
    },
    {
      title: "Dean's List",
      description: "Recognized for academic excellence with a GPA of 3.8+ for four consecutive semesters.",
      icon: <Star size={24} />,
      date: "2021 - Present"
    },
    {
      title: "Best Student Research Paper",
      description: "Awarded for research on 'Optimizing Neural Networks for Edge Computing Devices' at the Annual Computer Science Symposium.",
      icon: <Award size={24} />,
      date: "April 2023"
    },
    {
      title: "3rd Place - ACM Programming Contest",
      description: "Solved complex algorithmic problems in a timed competition against teams from 20 universities.",
      icon: <Medal size={24} />,
      date: "November 2022"
    },
    {
      title: "Open Source Contributor",
      description: "Recognized as a top contributor to TensorFlow's documentation project with over 15 accepted pull requests.",
      icon: <Star size={24} />,
      date: "2022 - Present"
    },
    {
      title: "University Merit Scholarship",
      description: "Awarded a full-tuition scholarship based on academic achievements and leadership potential.",
      icon: <Award size={24} />,
      date: "2021 - Present"
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

  return (
    <motion.section 
      id="achievements" 
      className="py-16 bg-gray-50 dark:bg-gray-800"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="mb-12 text-center" variants={titleVariants}>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Achievements</h2>
        <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto"></div>
      </motion.div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div 
            key={index} 
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            variants={cardVariants}
            whileHover={{ 
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-start">
              <motion.div 
                className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mr-4 text-indigo-600 dark:text-indigo-400"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {achievement.icon}
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{achievement.title}</h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">{achievement.date}</p>
                <p className="text-gray-600 dark:text-gray-300">{achievement.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Achievements;