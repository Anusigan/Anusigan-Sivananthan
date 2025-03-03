import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

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

  const leftColVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const rightColVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.4
      }
    }
  };

  const contactItemVariants = {
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

  return (
    <motion.section 
      id="contact" 
      className="py-16"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="mb-12 text-center" variants={titleVariants}>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Contact Me</h2>
        <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto"></div>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div variants={leftColVariants}>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Get In Touch</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Feel free to reach out to me using the contact information below or by filling out the form.
          </p>
          
          <div className="space-y-6">
            <motion.div 
              className="flex items-start"
              variants={contactItemVariants}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mr-4 text-indigo-600 dark:text-indigo-400"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Mail size={20} />
              </motion.div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Email</h4>
                <a href="mailto:john.doe@example.com" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  john.doe@example.com
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              variants={contactItemVariants}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mr-4 text-indigo-600 dark:text-indigo-400"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Phone size={20} />
              </motion.div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Phone</h4>
                <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              variants={contactItemVariants}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mr-4 text-indigo-600 dark:text-indigo-400"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <MapPin size={20} />
              </motion.div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Location</h4>
                <p className="text-gray-600 dark:text-gray-300">San Francisco, California, USA</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6"
          variants={rightColVariants}
          whileHover={{ 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send a Message</h3>
          
          {submitStatus === 'success' && (
            <motion.div 
              className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {submitMessage}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 mb-2">Name</label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 mb-2">Email</label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 dark:text-gray-200 mb-2">Subject</label>
              <motion.input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 mb-2">Message</label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              ></motion.textarea>
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors flex items-center justify-center w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;