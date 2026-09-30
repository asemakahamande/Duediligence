import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  GraduationCap, 
  Briefcase, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Monitor,
  Wrench
} from 'lucide-react';

const CurriculumModal = ({ isOpen, onClose, course, onApply }) => {
  if (!isOpen || !course) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 relative overflow-hidden flex-shrink-0">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute right-20 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                  {React.createElement(course.icon, { size: 30, className: "text-primary" })}
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-blue-300 text-xs font-semibold mb-2">
                    <Sparkles size={13} />
                    <span>Comprehensive Syllabus</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{course.title}</h3>
                  <p className="text-slate-300 text-sm mt-1">{course.tagline}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock size={16} className="text-primary flex-shrink-0" />
                <span><strong>Duration:</strong> {course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <GraduationCap size={16} className="text-primary flex-shrink-0" />
                <span><strong>{course.gradeLevel ? 'Grade:' : 'Level:'}</strong> {course.gradeLevel || course.level}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Monitor size={16} className="text-primary flex-shrink-0" />
                <span><strong>Format:</strong> {course.mode}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <Sparkles size={16} className="text-amber-400 flex-shrink-0" />
                <span><strong>Tuition:</strong> {course.price}</span>
              </div>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {/* Why This Course Matters */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 sm:p-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                Why This Course Is Vital in the Modern Generation
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {course.modernNeed}
              </p>
            </div>

            {/* Career Opportunities */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Briefcase size={16} className="text-primary" />
                Career Roles You Will Qualify For
              </h4>
              <div className="flex flex-wrap gap-2">
                {course.careerRoles.map((role, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-primary" />
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Technologies */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Wrench size={16} className="text-primary" />
                Tools & Technologies Mastered
              </h4>
              <div className="flex flex-wrap gap-2">
                {course.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-md">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Curriculum Breakdown */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <Layers size={16} className="text-primary" />
                Structured Curriculum & Learning Roadmap
              </h4>
              <div className="space-y-4">
                {course.curriculum.map((item, idx) => {
                  const isCapstone = item.module === 'Capstone Project';
                  return (
                    <div 
                      key={idx}
                      className={`p-5 rounded-2xl border transition-all ${
                        isCapstone 
                          ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-300 shadow-xs' 
                          : 'bg-slate-50 border-slate-200/80 hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className={`px-2.5 py-0.5 text-xs font-extrabold rounded-md uppercase tracking-wider ${
                          isCapstone ? 'bg-amber-500 text-white' : 'bg-primary text-white'
                        }`}>
                          {item.module}
                        </span>
                        <h5 className="font-bold text-slate-900 text-base">{item.title}</h5>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mt-2 pl-1">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
            <div>
              <span className="text-xs text-slate-500 block">Tuition & Enrollment</span>
              <span className="text-xl font-extrabold text-slate-900">{course.price}</span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onApply(course.id);
                }}
                className="w-1/2 sm:w-auto px-7 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Apply for this Course
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CurriculumModal;
