import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Clock, 
  GraduationCap, 
  Briefcase,
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Monitor,
  Wrench,
  FolderOpen,
  Trophy,
  BookOpen,
  MessageCircle,
  Share2,
  Check,
  ChevronRight,
  Code2,
  Cpu
} from 'lucide-react';
import { coursesData } from '../data/coursesData';
import { youngCodersCourses } from '../data/youngCodersData';

const CurriculumPage = ({ 
  initialCourseId, 
  onOpenApply, 
  onNavigateHome, 
  onNavigate 
}) => {
  // Combine all courses for quick lookup
  const allCourses = useMemo(() => {
    return [
      ...coursesData.map(c => ({ ...c, trackType: 'professional' })),
      ...youngCodersCourses.map(c => ({ ...c, trackType: 'young-coders' }))
    ];
  }, []);

  // Determine initial selected course
  const [selectedCourseId, setSelectedCourseId] = useState(() => {
    if (initialCourseId && allCourses.some(c => c.id === initialCourseId)) {
      return initialCourseId;
    }
    return coursesData[0]?.id || 'software-engineering';
  });

  const [copiedLink, setCopiedLink] = useState(false);

  // Sync state if initialCourseId changes from props or hash
  useEffect(() => {
    if (initialCourseId && allCourses.some(c => c.id === initialCourseId)) {
      setSelectedCourseId(initialCourseId);
    }
  }, [initialCourseId, allCourses]);

  const currentCourse = useMemo(() => {
    return allCourses.find(c => c.id === selectedCourseId) || coursesData[0];
  }, [allCourses, selectedCourseId]);

  const currentCategory = currentCourse.trackType; // 'professional' | 'young-coders'

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
    window.location.hash = `#curriculum/${courseId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleBack = () => {
    if (currentCategory === 'young-coders') {
      if (onNavigate) {
        onNavigate('young-coders');
      } else if (onNavigateHome) {
        onNavigateHome();
      }
    } else {
      if (onNavigate) {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (onNavigateHome) {
        onNavigateHome();
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isYoungCoders = currentCourse.trackType === 'young-coders';
  const IconComponent = currentCourse.icon || BookOpen;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-20 pb-20">
      
      {/* Top Header / Breadcrumb Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-white relative overflow-hidden">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          
          {/* Top Actions: Back Button & Share */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to {isYoungCoders ? 'Young Coders' : 'Courses'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-medium transition-all cursor-pointer"
              title="Copy link to this curriculum"
            >
              {copiedLink ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  <span>Share Curriculum</span>
                </>
              )}
            </button>
          </div>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4 flex-wrap">
            <button 
              onClick={() => onNavigate && onNavigate('home')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight size={12} className="text-slate-600" />
            <button 
              onClick={() => onNavigate && onNavigate(isYoungCoders ? 'young-coders' : 'home')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {isYoungCoders ? 'Young Coders Academy' : 'Professional Courses'}
            </button>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-slate-200 font-semibold">{currentCourse.title}</span>
          </nav>

          {/* Main Hero Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isYoungCoders 
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                    : 'bg-primary/20 text-blue-300 border border-primary/30'
                }`}>
                  <Sparkles size={13} />
                  <span>{isYoungCoders ? 'Young Coders Track' : 'Professional Tech Career Track'}</span>
                </span>
                {currentCourse.pathEmoji && currentCourse.pathLabel && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/20">
                    {currentCourse.pathEmoji} {currentCourse.pathLabel}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Full Syllabus & Roadmap
                </span>
              </div>

              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary flex-shrink-0 mt-1 shadow-inner">
                  <IconComponent size={32} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    {currentCourse.title}
                  </h1>
                  <p className="text-base sm:text-lg text-slate-300 mt-2 font-normal leading-relaxed">
                    {currentCourse.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl flex items-center justify-between sm:justify-start gap-5">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Tuition</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-400">{currentCourse.price}</span>
                </div>
                <button
                  onClick={() => onOpenApply(currentCourse.id)}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <Clock size={20} className="text-primary flex-shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-bold">Duration</span>
                <span className="text-xs sm:text-sm font-bold text-white">{currentCourse.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <GraduationCap size={20} className="text-primary flex-shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-bold">
                  {currentCourse.gradeLevel ? 'Grade Level' : 'Audience Level'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {currentCourse.gradeLevel || currentCourse.level}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <Monitor size={20} className="text-primary flex-shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-bold">Format</span>
                <span className="text-xs sm:text-sm font-bold text-white">{currentCourse.mode}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <Trophy size={20} className="text-amber-400 flex-shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-bold">Outcome</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400">Live Projects & Cert</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Course Switcher Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none">
            
            {/* Category tabs */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline">
                Track:
              </span>
              <button
                onClick={() => {
                  if (currentCategory !== 'professional') {
                    handleSelectCourse(coursesData[0].id);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentCategory === 'professional'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>Professional Tracks</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700 text-white">7</span>
              </button>

              <button
                onClick={() => {
                  if (currentCategory !== 'young-coders') {
                    handleSelectCourse(youngCodersCourses[0].id);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentCategory === 'young-coders'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Sparkles size={12} className={currentCategory === 'young-coders' ? 'text-amber-200' : 'text-amber-500'} />
                <span>Young Coders</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700 text-white">4</span>
              </button>
            </div>

            {/* Course Selector Dropdown or Pills */}
            <div className="flex items-center gap-2 flex-nowrap flex-shrink-0">
              <span className="text-xs font-semibold text-slate-500 hidden md:inline">Select Course:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {(currentCategory === 'professional' ? coursesData : youngCodersCourses).map((c) => {
                  const isSelected = c.id === currentCourse.id;
                  const CourseIcon = c.icon || BookOpen;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCourse(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                      }`}
                    >
                      <CourseIcon size={13} className={isSelected ? 'text-white' : 'text-primary'} />
                      <span>{c.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Page Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Left Content Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Why This Course Is Vital Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-primary text-xs font-extrabold uppercase tracking-wider mb-3">
                <Sparkles size={16} />
                <span>Why This Course Is Vital in the Modern Era</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                High-Impact Skills for Today’s Digital Economy
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {currentCourse.modernNeed}
              </p>
            </motion.div>

            {/* Career Opportunities (For Professional Courses) */}
            {!isYoungCoders && currentCourse.careerRoles && currentCourse.careerRoles.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 text-sm font-bold uppercase tracking-wider mb-4">
                  <Briefcase size={18} className="text-primary" />
                  <span>Career Roles You Will Qualify For</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentCourse.careerRoles.map((role, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 hover:border-primary/40 transition-colors"
                    >
                      <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What Kids Learn (For Young Coders) */}
            {isYoungCoders && currentCourse.whatKidsLearn && currentCourse.whatKidsLearn.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 text-sm font-bold uppercase tracking-wider mb-4">
                  <Trophy size={18} className="text-amber-500" />
                  <span>Key Skills Your Child Will Master</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentCourse.whatKidsLearn.map((skill, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-slate-800 text-xs sm:text-sm font-semibold flex items-start gap-2.5"
                    >
                      <CheckCircle2 size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools & Technologies Mastered */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 text-sm font-bold uppercase tracking-wider mb-4">
                <Wrench size={18} className="text-primary" />
                <span>Industry Tools & Technologies Covered</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {(currentCourse.tools || []).map((tool, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-primary/40 text-slate-800 hover:text-primary text-xs sm:text-sm font-bold rounded-xl transition-all shadow-2xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Young Coders Projects & End Result */}
            {isYoungCoders && currentCourse.projects && currentCourse.projects.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 text-sm font-bold uppercase tracking-wider mb-4">
                  <FolderOpen size={18} className="text-primary" />
                  <span>Hands-On Projects Your Child Will Build</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {currentCourse.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-blue-50/70 to-indigo-50/50 border border-blue-100 hover:border-primary/40 transition-colors"
                    >
                      <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{proj}</span>
                    </div>
                  ))}
                </div>

                {currentCourse.endResult && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-300">
                    <div className="flex items-start gap-3">
                      <Trophy size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">Guaranteed End Result</p>
                        <p className="text-sm text-slate-800 font-semibold leading-relaxed">{currentCourse.endResult}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Comprehensive Curriculum Roadmap */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-primary text-xs font-extrabold uppercase tracking-wider mb-1">
                    <Layers size={16} />
                    <span>Structured Roadmap</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Comprehensive Curriculum Syllabus
                  </h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full w-fit">
                  {currentCourse.curriculum?.length || 0} Complete Modules
                </span>
              </div>

              {/* Module Timeline List */}
              <div className="space-y-4">
                {currentCourse.curriculum.map((item, idx) => {
                  const isCapstone = item.module === 'Capstone Project';
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                        isCapstone
                          ? 'bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border-amber-300 shadow-sm'
                          : 'bg-slate-50 hover:bg-white border-slate-200/80 hover:border-primary/40 hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 text-xs font-black rounded-lg uppercase tracking-wider flex-shrink-0 flex items-center gap-1.5 ${
                              isCapstone
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                                : 'bg-primary text-white'
                            }`}
                          >
                            {isCapstone && <Trophy size={13} />}
                            {item.module}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-xs font-semibold text-slate-400 sm:text-right">
                          Part {idx + 1} of {currentCourse.curriculum.length}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2 pl-0.5">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
            
            {/* Enrollment / Apply Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">
                Tuition & Enrollment
              </span>
              <div className="text-3xl font-black text-slate-900 mb-1">
                {currentCourse.price}
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Flexible installment payment plans available. Fully mentored with live project defense.
              </p>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => onOpenApply(currentCourse.id)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Apply for this Course</span>
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={`https://wa.me/2349039982165?text=Hello%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(currentCourse.title)}%20curriculum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={17} />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>

              {/* Guarantees List */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Live 1:1 instructor feedback & weekly office hours</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Capstone project verified by technical mentors</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Globally shareable Certificate of Completion</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Lifetime access to cohort Discord community</span>
                </div>
              </div>
            </div>

            {/* Other Courses in this category */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span>Other {isYoungCoders ? 'Young Coders Tracks' : 'Career Tracks'}</span>
              </h4>

              <div className="space-y-2">
                {(isYoungCoders ? youngCodersCourses : coursesData)
                  .filter(c => c.id !== currentCourse.id)
                  .map((other) => {
                    const OtherIcon = other.icon || BookOpen;
                    return (
                      <button
                        key={other.id}
                        onClick={() => handleSelectCourse(other.id)}
                        className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between gap-2 group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                            <OtherIcon size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
                              {other.title}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {other.duration} • {other.price}
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={15} className="text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </button>
                    );
                  })}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default CurriculumPage;
