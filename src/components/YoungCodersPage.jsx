import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Gamepad2, 
  ShieldCheck, 
  Users, 
  Award, 
  Flame, 
  CheckCircle2, 
  Laptop,
  Lightbulb,
  HeartHandshake,
  Layers,
  GraduationCap
} from 'lucide-react';
import { youngCodersCourses, gradeGroups } from '../data/youngCodersData';
import CurriculumModal from './CurriculumModal';
import heroVideo from '../assets/video.mp4';

const YoungCodersPage = ({ onOpenApply, onNavigateHome }) => {
  const [activeCourse, setActiveCourse] = useState(null);
  const [selectedGradeGroup, setSelectedGradeGroup] = useState('all');

  const handleOpenCurriculum = (course) => {
    setActiveCourse(course);
  };

  const handleCloseCurriculum = () => {
    setActiveCourse(null);
  };

  const filteredCourses = selectedGradeGroup === 'all'
    ? youngCodersCourses
    : youngCodersCourses.filter(c => c.gradeGroup === selectedGradeGroup);

  const getCourseCountForGroup = (groupId) => {
    if (groupId === 'all') return youngCodersCourses.length;
    return youngCodersCourses.filter(c => c.gradeGroup === groupId).length;
  };

  return (
    <div className="pt-20 bg-white">
      {/* Young Coders Hero Banner with Local Video Background */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24 min-h-[75vh] flex items-center justify-center">
        {/* Crystal-Clear Background Video from Assets */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-80 sm:opacity-85 scale-105"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Ultra-Light Transparent Overlay for Full Video Visibility with Crisp Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-slate-950/50" />
          <div className="absolute inset-0 bg-blue-950/15 mix-blend-multiply" />
        </div>

        {/* Subtle Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none z-1" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-blue-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5">
              <Sparkles size={16} className="text-amber-400" />
              <span>Young Coders Academy • Grade 1 - 12 Pathways</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
              Turn Screen Time Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-amber-400">Superpowers</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 font-light leading-relaxed">
              Empowering the next generation of digital creators. Tailored learning tracks grouped for <strong>Grade 1–3</strong>, <strong>Grade 4–5</strong>, <strong>Grade 6–8</strong>, and <strong>Grade 9–12</strong> to build mobile apps, 2D & 3D games, websites, and artificial intelligence.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenApply('scratch-coding')}
                className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-[0_0_25px_rgba(5,111,236,0.5)] hover:shadow-[0_0_35px_rgba(5,111,236,0.8)] transition-all hover:scale-105 cursor-pointer text-sm uppercase tracking-wider"
              >
                Enroll Your Child Today
              </button>
              <a
                href="#young-courses"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all cursor-pointer text-sm"
              >
                Explore By Grade Level
              </a>
            </div>
          </motion.div>

          {/* Quick Value Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800 text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Gamepad2 className="text-primary flex-shrink-0" size={24} />
              <div>
                <p className="text-xs text-slate-400 font-medium">Learning Style</p>
                <p className="text-xs sm:text-sm font-bold text-white">Gamified & Fun</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Users className="text-primary flex-shrink-0" size={24} />
              <div>
                <p className="text-xs text-slate-400 font-medium">Class Size</p>
                <p className="text-xs sm:text-sm font-bold text-white">Small Live Cohorts</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Award className="text-amber-400 flex-shrink-0" size={24} />
              <div>
                <p className="text-xs text-slate-400 font-medium">Outcome</p>
                <p className="text-xs sm:text-sm font-bold text-white">Live Project Portfolios</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <ShieldCheck className="text-emerald-400 flex-shrink-0" size={24} />
              <div>
                <p className="text-xs text-slate-400 font-medium">Environment</p>
                <p className="text-xs sm:text-sm font-bold text-white">Safe & Child-Friendly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Young Coders Need Coding Today */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Why Start Early?</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Giving Young Minds a Lifelong Advantage
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                <Lightbulb size={24} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Logical Problem Solving</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Coding teaches kids how to break big, overwhelming problems down into small, logical steps—a superpower that boosts math, science, and school performance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4">
                <Laptop size={24} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">From Consumers to Creators</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instead of simply playing games or scrolling videos, students learn the magic behind the screen, gaining the confidence to design their own apps, animations, and worlds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-100 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4">
                <HeartHandshake size={24} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Future-Proof Resilience</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                AI and automation are shaping tomorrow's careers. Children who master technology concepts early build natural fluency with digital innovation and computational logic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses List with Grade Level Grouping Filter Tabs */}
      <section className="py-12 sm:py-16 bg-slate-50" id="young-courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} />
              <span>Structured Grade-Level Pathways</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Courses for Young Coders
            </h2>
            <p className="text-base text-slate-600">
              Carefully calibrated by cognitive stage into four structured grade levels: <strong>Grade 1–3</strong>, <strong>Grade 4–5</strong>, <strong>Grade 6–8</strong>, and <strong>Grade 9–12</strong>.
            </p>
          </div>

          {/* Grade Level Filter Tabs */}
          <div className="mb-10 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-2.5 p-2 bg-slate-200/70 rounded-2xl sm:rounded-full shadow-inner border border-slate-300/60">
              {gradeGroups.map((group) => {
                const isSelected = selectedGradeGroup === (group.id === 'all' ? 'all' : group.group);
                const count = getCourseCountForGroup(group.id === 'all' ? 'all' : group.group);
                return (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGradeGroup(group.id === 'all' ? 'all' : group.group)}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-md shadow-primary/30 scale-[1.02]'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-white/70'
                    }`}
                  >
                    <span>{group.label}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold transition-colors ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-300/80 text-slate-700'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Grade Group Description Banner */}
            {selectedGradeGroup !== 'all' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center p-3 rounded-xl bg-blue-50/70 border border-blue-100 max-w-xl mx-auto"
              >
                <p className="text-xs text-slate-700 font-medium">
                  Showing courses tailored for <strong className="text-primary">{selectedGradeGroup}</strong> ({gradeGroups.find(g => g.group === selectedGradeGroup)?.ages}): {gradeGroups.find(g => g.group === selectedGradeGroup)?.desc}
                </p>
              </motion.div>
            )}
          </div>

          {/* Courses Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedGradeGroup}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCourses.map((course, index) => {
                const IconComp = course.icon;
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-3xl border border-slate-200/80 hover:border-primary/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
                  >
                    <div className="p-6 sm:p-7 flex-1 flex flex-col">
                      {/* Header with Icon & Grade Badge */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                          <IconComp size={26} />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs font-bold rounded-full shadow-xs">
                            <GraduationCap size={13} className="text-amber-700" />
                            {course.gradeLevel}
                          </span>
                          {course.ageRange && (
                            <span className="text-[11px] text-slate-500 font-medium pr-1">
                              {course.ageRange}
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-1.5 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs font-semibold text-primary mb-4">
                        {course.tagline}
                      </p>

                      {/* Why this course */}
                      <div className="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                          <Flame size={13} className="text-amber-500" />
                          Why Kids Love This
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {course.modernNeed}
                        </p>
                      </div>

                      {/* What they will build & learn */}
                      <div className="mb-5 space-y-2 flex-1">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Key Skills Mastered:
                        </h4>
                        {course.whatKidsLearn.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 size={13} className="text-primary flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="pt-3.5 border-t border-slate-100 mt-auto flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-primary" />
                          {course.duration}
                        </span>
                        <span className="font-extrabold text-slate-900">{course.price}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
                      <button
                        onClick={() => handleOpenCurriculum(course)}
                        className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 hover:border-primary text-slate-700 hover:text-primary font-bold text-xs bg-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <BookOpen size={14} />
                        <span>Curriculum</span>
                      </button>
                      <button
                        onClick={() => onOpenApply(course.id)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Enroll Child</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Curriculum Modal for Young Coders */}
      <CurriculumModal
        isOpen={!!activeCourse}
        onClose={handleCloseCurriculum}
        course={activeCourse}
        onApply={(courseId) => onOpenApply(courseId)}
        showCareerRoles={false}
      />
    </div>
  );
};

export default YoungCodersPage;

