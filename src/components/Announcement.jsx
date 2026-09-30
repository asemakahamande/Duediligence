import React from 'react';
import { motion } from 'framer-motion';

const Announcement = ({ onOpenApply }) => {
  return (
    <section className="bg-slate-900 py-10 sm:py-12 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
        >
          Join Our Next Cohort Starting Soon!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-slate-300 mb-6"
        >
          Limited seats available for our intensive cohorts. Secure your spot now and kickstart your tech career.
        </motion.p>
        <motion.button 
          onClick={onOpenApply}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="px-8 py-3 bg-primary hover:bg-primary-dark transition-all duration-300 text-white font-bold rounded-lg shadow-lg cursor-pointer"
        >
          Apply for the Next Cohort
        </motion.button>
      </div>
    </section>
  );
};

export default Announcement;
