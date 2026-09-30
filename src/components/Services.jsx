import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Layers, 
  CheckCircle, 
  FileText,
  Flame
} from 'lucide-react';
import { coursesData } from '../data/coursesData';
import CurriculumModal from './CurriculumModal';

const Services = ({ onOpenApply }) => {
  const [activeCurriculumCourse, setActiveCurriculumCourse] = useState(null);

  const handleOpenCurriculum = (course) => {
    setActiveCurriculumCourse(course);
  };

  const handleCloseCurriculum = () => {
    setActiveCurriculumCourse(null);
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 relative overflow-hidden" id="services">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <Sparkles size={16} />
            <span>High-Demand Tech Careers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Industry-Aligned Tech Courses
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Engineered for the demands of the modern digital generation. Gain practical hands-on experience, build enterprise-grade portfolio projects, and launch high-growth careers.
          </p>
        </div>

        {/* 7 Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData.map((course, index) => {
            const IconComponent = course.icon;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-3xl border border-slate-200/80 hover:border-primary/50 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Card Header & Icon */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                      <IconComponent size={28} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-full">
                      <Clock size={12} className="text-primary" />
                      {course.duration}
                    </span>
                  </div>

                  {/* Course Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-primary mb-4">
                    {course.tagline}
                  </p>

                  {/* Modern Generation Importance */}
                  <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                      <Flame size={14} className="text-amber-500" />
                      Modern Generation Relevance
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {course.modernNeed}
                    </p>
                  </div>

                  {/* Curriculum Highlights */}
                  <div className="mb-6 space-y-2 flex-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                      <Layers size={14} className="text-primary" />
                      Core Curriculum Tracks
                    </h4>
                    {course.curriculum.slice(0, 3).map((mod, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle size={14} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1 font-medium">{mod.title}</span>
                      </div>
                    ))}
                    <div className="flex items-start gap-2 text-xs text-amber-600 font-semibold pt-1">
                      <Sparkles size={14} className="flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">Includes Capstone Enterprise Project</span>
                    </div>
                  </div>

                  {/* Tools / Tech Stack Tags */}
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {course.tools.slice(0, 4).map((tool, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-medium rounded-md">
                          {tool}
                        </span>
                      ))}
                      {course.tools.length > 4 && (
                        <span className="px-2 py-1 bg-blue-50 text-primary text-[11px] font-bold rounded-md">
                          +{course.tools.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleOpenCurriculum(course)}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 hover:border-primary text-slate-700 hover:text-primary font-bold text-xs sm:text-sm bg-white hover:bg-blue-50/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen size={15} />
                    <span>Curriculum</span>
                  </button>
                  <button
                    onClick={() => onOpenApply(course.id)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Curriculum Detail Modal */}
      <CurriculumModal
        isOpen={!!activeCurriculumCourse}
        onClose={handleCloseCurriculum}
        course={activeCurriculumCourse}
        onApply={(courseId) => onOpenApply(courseId)}
      />
    </section>
  );
};

export default Services;
