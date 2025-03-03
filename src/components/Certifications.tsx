import React from 'react';
import { FileCheck, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const certifications = [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "August 2023",
      credentialId: "AWS-CCP-123456",
      link: "https://aws.amazon.com/certification/",
      skills: ["Cloud Computing", "AWS Services", "Cloud Security", "Cloud Architecture"]
    },
    {
      title: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "May 2023",
      credentialId: "TF-DEV-789012",
      link: "https://www.tensorflow.org/certificate",
      skills: ["Deep Learning", "Neural Networks", "Computer Vision", "NLP"]
    },
    {
      title: "Full Stack Web Development",
      issuer: "Udemy",
      date: "January 2023",
      credentialId: "UC-FSWD-345678",
      link: "https://www.udemy.com",
      skills: ["React", "Node.js", "MongoDB", "Express", "REST APIs"]
    },
    {
      title: "Python for Data Science and Machine Learning",
      issuer: "Coursera",
      date: "October 2022",
      credentialId: "COURSERA-PDSML-901234",
      link: "https://www.coursera.org",
      skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Data Visualization"]
    },
    {
      title: "Agile Software Development",
      issuer: "Scrum.org",
      date: "July 2022",
      credentialId: "PSM-I-567890",
      link: "https://www.scrum.org",
      skills: ["Scrum", "Agile Methodologies", "Sprint Planning", "Product Backlog"]
    },
    {
      title: "Cybersecurity Fundamentals",
      issuer: "Cisco Networking Academy",
      date: "March 2022",
      credentialId: "CISCO-CF-123789",
      link: "https://www.netacad.com",
      skills: ["Network Security", "Cryptography", "Threat Detection", "Security Protocols"]
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
      id="certifications" 
      className="py-16"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="mb-12 text-center" variants={titleVariants}>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Certifications</h2>
        <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto"></div>
      </motion.div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
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
            <div className="flex items-start mb-4">
              <motion.div 
                className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mr-4 text-indigo-600 dark:text-indigo-400"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <FileCheck size={24} />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{cert.title}</h3>
                <p className="text-indigo-600 dark:text-indigo-400">{cert.issuer}</p>
              </div>
            </div>
            
            <div className="ml-16">
              <p className="text-gray-600 dark:text-gray-300 mb-1">Issued: {cert.date}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Credential ID: {cert.credentialId}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.map((skill, i) => (
                  <span key={i} className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              
              <motion.a 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                whileHover={{ x: 3 }}
                whileTap={{ x: 0 }}
              >
                <span>View Certificate</span>
                <ExternalLink size={16} className="ml-1" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Certifications;