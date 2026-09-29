import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Layout, Smartphone, Code, Shield, Database } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, tags, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-[var(--color-secondary-bg)] p-8 rounded-2xl border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center"
  >
    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon size={32} className="text-primary" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-600 mb-6 text-sm leading-relaxed">{description}</p>
    <div className="flex flex-wrap gap-2 justify-center mt-auto">
      {tags.map((tag, idx) => (
        <span key={idx} className="px-3 py-1 bg-white border border-blue-100 text-slate-600 text-xs rounded-full font-semibold">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const Services = () => {
  const services = [
    {
      icon: BookOpen,
      title: "Technology Training",
      description: "We make technology accessible, practical, and engaging for learners of all ages. From beginner to advanced, we help you learn, practice, and build.",
      tags: ["Python", "React", "AI & ML", "Cybersecurity"]
    },
    {
      icon: Layout,
      title: "Custom Website Development",
      description: "Modern, responsive, secure, and user-friendly websites tailored to your brand and business objectives.",
      tags: ["Corporate", "E-commerce", "Portfolios"]
    },
    {
      icon: Smartphone,
      title: "Custom Application Development",
      description: "Your idea, our technology. We develop custom web and mobile applications designed around your specific business processes.",
      tags: ["Web Apps", "Mobile Apps", "UI/UX"]
    }
  ];

  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">+48 professional developers tech tools</h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">
            Comprehensive Digital Solutions
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
