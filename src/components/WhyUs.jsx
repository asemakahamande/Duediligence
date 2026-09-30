import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const WhyUs = () => {
  return (
    <section className="py-12 sm:py-16 bg-white" id="why-us">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-primary font-bold tracking-widest uppercase mb-2 text-sm">Program Overview</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Learn Tech Skills and Start Building
          </h3>
          
          <div className="space-y-4 text-base sm:text-lg text-slate-600 mb-8 text-left bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
            <p>
              Our curriculum is designed to take you from a complete beginner to a confident technology professional. We focus on hands-on learning, practical exercises, and building real-world projects that you can showcase to employers.
            </p>
            <p>
              You don't need a background in math or computer science. Our expert instructors will guide you step-by-step through the fundamentals all the way to advanced concepts.
            </p>
            <div className="pt-4 border-t border-slate-200 mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-primary" size={24} />
                <span className="font-bold text-slate-900">Hands-on Projects</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-primary" size={24} />
                <span className="font-bold text-slate-900">1:1 Mentorship</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-primary" size={24} />
                <span className="font-bold text-slate-900">Career Support</span>
              </div>
            </div>
          </div>
          
          {/* Pricing Badge / Callout */}
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">Starting From</p>
            <p className="text-4xl font-black text-primary mb-1">$299<span className="text-lg text-slate-500 font-normal">/course</span></p>
            <p className="text-sm text-slate-500">Flexible payment plans available</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;

