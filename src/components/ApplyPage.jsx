import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  ChevronRight,
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Send, 
  ShieldCheck, 
  BookOpen, 
  Clock, 
  GraduationCap, 
  CreditCard, 
  MessageCircle, 
  Phone, 
  ArrowRight,
  HelpCircle,
  FileText
} from 'lucide-react';
import { countryCodes } from '../data/countryCodes';
import { coursesData } from '../data/coursesData';
import { youngCodersCourses } from '../data/youngCodersData';
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../config/forms';
import { TURNSTILE_SITE_KEY, clean, validateContact, checkRateLimit, recordSubmission } from '../config/formSecurity';
import TurnstileWidget from './TurnstileWidget';

const courses = [
  ...coursesData.map(c => ({
    id: c.id,
    name: `${c.title} (${c.duration})`,
    title: c.title,
    price: c.price,
    duration: c.duration,
    level: c.level,
    mode: c.mode,
    category: 'Professional Tracks'
  })),
  ...youngCodersCourses.map(c => ({
    id: c.id,
    name: `[Young Coders] ${c.title} (${c.gradeLevel || 'Grade 1 - 14'})`,
    title: c.title,
    price: c.price,
    duration: c.duration,
    level: c.gradeLevel || 'Grade 1 - 14',
    mode: c.mode,
    category: 'Young Coders Academy (Grade 1-14)'
  }))
];

const ApplyPage = ({ initialCourseId = '', onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+234',
    phone: '',
    gender: '',
    course: initialCourseId || courses[0].id,
    learningMode: 'Online (Virtual Live)',
    agreedToTerms: false
  });

  useEffect(() => {
    if (initialCourseId && courses.some(c => c.id === initialCourseId)) {
      setFormData((prev) => ({ ...prev, course: initialCourseId }));
    }
  }, [initialCourseId]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const selectedCourseObj = courses.find((c) => c.id === formData.course) || courses[0];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) {
      setIsSubmitted(true);
      return;
    }

    const data = {
      fullName: clean(formData.fullName),
      email: clean(formData.email),
      phone: clean(formData.phone)
    };

    if (!data.fullName || !data.email || !data.phone || !formData.gender) {
      setError('Please fill in all required fields.');
      return;
    }
    const validationError = validateContact(data);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!formData.agreedToTerms) {
      setError('Please review and agree to the Student Agreement before proceeding.');
      return;
    }
    const limitError = checkRateLimit();
    if (limitError) {
      setError(limitError);
      return;
    }
    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setError('Please complete the security check.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const submissionBody = new FormData();
      submissionBody.append('access_key', WEB3FORMS_ACCESS_KEY);
      submissionBody.append('subject', `🎓 New Student Application: ${data.fullName} - ${selectedCourseObj.name}`);
      submissionBody.append('from_name', 'Due Diligence Institute Admissions');
      submissionBody.append('Full Name', data.fullName);
      submissionBody.append('Email', data.email);
      submissionBody.append('Phone Number', `${formData.countryCode} ${data.phone}`);
      submissionBody.append('Gender', formData.gender);
      submissionBody.append('Selected Course', selectedCourseObj.name);
      submissionBody.append('Tuition Fee', selectedCourseObj.price);
      submissionBody.append('Duration', selectedCourseObj.duration);
      submissionBody.append('Learning Mode', formData.learningMode);
      submissionBody.append('Agreed to Terms', 'Yes');
      if (captchaToken) submissionBody.append('cf-turnstile-response', captchaToken);

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: submissionBody
      });

      const result = await response.json();

      if (response.ok && result.success) {
        recordSubmission();
        setIsSubmitted(true);
      } else {
        setError(result.message || 'Unable to submit application. Please check your network and try again.');
      }
    } catch (err) {
      setError('Network error occurred. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-20 pb-20">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          
          <div className="flex items-center justify-between gap-4 mb-4">
            <button
              onClick={() => {
                if (onNavigate) onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Cohorts Enrolling Now</span>
            </div>
          </div>

          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4">
            <button 
              onClick={() => onNavigate && onNavigate('home')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight size={12} className="text-slate-600" />
            <button 
              onClick={() => onNavigate && onNavigate('curriculum')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Programs
            </button>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-slate-200 font-semibold">Student Application</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 border border-primary/30">
              <Sparkles size={13} />
              <span>Direct Admissions Portal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Apply for Upcoming Cohort
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed font-normal">
              Take the next decisive step in your career. Submit your application below to secure your seat in our mentor-led, hands-on training program.
            </p>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Full Application Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                  Admissions Application
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Student Enrollment Form
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Please provide accurate contact details so our admissions committee can reach you with cohort schedules and onboarding resources.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-4 sm:px-8 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <CheckCircle2 size={44} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed mb-6">
                    Congratulations, <strong>{formData.fullName}</strong>! We have received your application for <strong>{selectedCourseObj.title}</strong>. An admissions advisor will contact you within 24 hours via email and WhatsApp with next steps and payment instructions.
                  </p>

                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto mb-8 text-left space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Program:</span>
                      <span className="font-bold text-slate-900">{selectedCourseObj.title}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Duration:</span>
                      <span className="font-bold text-slate-900">{selectedCourseObj.duration}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Format:</span>
                      <span className="font-bold text-slate-900">{formData.learningMode}</span>
                    </div>
                    <div className="flex justify-between text-xs pt-2 border-t border-slate-200">
                      <span className="text-slate-500 font-semibold">Tuition:</span>
                      <span className="font-extrabold text-primary text-sm">{selectedCourseObj.price}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/2349039982165?text=Hello%2C%20I%20just%20submitted%20my%20application%20for%20${encodeURIComponent(selectedCourseObj.title)}%20and%20would%20like%20to%20confirm%20my%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle size={17} />
                      <span>Confirm via WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          countryCode: '+234',
                          phone: '',
                          gender: '',
                          course: courses[0].id,
                          learningMode: 'Online (Virtual Live)',
                          agreedToTerms: false
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                    >
                      Submit Another Application
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  
                  {/* Honeypot field for bot protection */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="user_company_url">Website</label>
                    <input
                      type="text"
                      id="user_company_url"
                      name="user_company_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5"
                    >
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-600" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Program Selection */}
                  <div className="bg-blue-50/60 border border-blue-100 p-5 rounded-2xl">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <BookOpen size={15} className="text-primary" />
                      <span>Select Your Desired Program / Track</span>
                      <span className="text-red-500">*</span>
                    </label>
                    
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-semibold text-slate-900 bg-white transition-all outline-none cursor-pointer"
                    >
                      <optgroup label="🎓 Professional Tech Career Tracks">
                        {courses.filter(c => c.category === 'Professional Tracks').map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} — {c.price}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🚀 Young Coders Academy (Grade 1–14)">
                        {courses.filter(c => c.category.includes('Young Coders')).map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} — {c.price}
                          </option>
                        ))}
                      </optgroup>
                    </select>

                    <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-blue-100 text-xs text-slate-600">
                      <span><strong>Duration:</strong> {selectedCourseObj.duration}</span>
                      <span><strong>Level:</strong> {selectedCourseObj.level}</span>
                      <span className="text-primary font-black text-sm">{selectedCourseObj.price}</span>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Samuel Adekunle"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="e.g. samuel@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all outline-none"
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Phone Number (WhatsApp) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex rounded-xl border border-slate-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 overflow-hidden transition-all">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="bg-slate-50 border-r border-slate-200 px-3 py-3 text-xs font-bold text-slate-700 outline-none cursor-pointer"
                          >
                            {countryCodes.map((c) => (
                              <option key={`${c.code}-${c.dial_code}`} value={c.dial_code}>
                                {c.code} ({c.dial_code})
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="08012345678"
                            className="w-full px-3 py-3 text-sm font-medium outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Gender & Learning Mode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all outline-none bg-white cursor-pointer"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other / Prefer not to say</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Preferred Learning Mode
                        </label>
                        <select
                          name="learningMode"
                          value={formData.learningMode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all outline-none bg-white cursor-pointer"
                        >
                          <option value="Online (Virtual Live)">Online (Virtual Live + Interactive Labs)</option>
                          <option value="Physical Training">Physical Hub Session</option>
                          <option value="Hybrid (Virtual + Weekend Hub)">Hybrid (Virtual + Weekend Lab)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Student Terms Agreement */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreedToTerms"
                        checked={formData.agreedToTerms}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 rounded text-primary focus:ring-primary border-slate-300 cursor-pointer"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        I confirm that the information provided is accurate, and I agree to the{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate && onNavigate('terms')}
                          className="text-primary hover:underline font-semibold"
                        >
                          Terms of Service
                        </button>{' '}
                        and{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate && onNavigate('privacy')}
                          className="text-primary hover:underline font-semibold"
                        >
                          Privacy Policy
                        </button>
                        . I understand that cohort seats are reserved on a confirmed tuition basis.
                      </span>
                    </label>
                  </div>

                  {/* Cloudflare Turnstile */}
                  {TURNSTILE_SITE_KEY && (
                    <div className="pt-1">
                      <TurnstileWidget onVerify={(token) => setCaptchaToken(token)} />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Processing Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application for {selectedCourseObj.title}</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Your submission is encrypted. No payment is charged immediately on this form.</span>
                  </p>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Program Highlights & Advisor Support */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Selected Program Summary Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">
                Selected Track
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {selectedCourseObj.title}
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                {selectedCourseObj.category}
              </p>

              <div className="space-y-3 pb-5 border-b border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Clock size={14} className="text-primary" /> Duration:
                  </span>
                  <span className="font-bold text-slate-900">{selectedCourseObj.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-primary" /> Target Level:
                  </span>
                  <span className="font-bold text-slate-900">{selectedCourseObj.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <CreditCard size={14} className="text-primary" /> Total Tuition:
                  </span>
                  <span className="font-extrabold text-base text-slate-900">{selectedCourseObj.price}</span>
                </div>
              </div>

              {/* Program Guarantees */}
              <div className="pt-5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Live 1:1 weekly mentor code reviews & debugging</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Production-grade capstone project for portfolio</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Official Certificate of Completion upon defense</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Installment payments available (50% deposit)</span>
                </div>
              </div>

              {/* Explore Syllabus Link */}
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('curriculum', selectedCourseObj.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full mt-6 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-primary text-slate-700 hover:text-primary text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookOpen size={14} />
                <span>View Full Curriculum Syllabus</span>
              </button>
            </div>

            {/* Need Help Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Have Admissions Questions?
              </span>
              <h4 className="text-lg font-bold text-white mb-2">
                Talk to an Admissions Advisor
              </h4>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Need guidance on which track matches your background, or want to discuss installment arrangements?
              </p>

              <div className="space-y-2.5">
                <a
                  href={`https://wa.me/2349039982165?text=Hello%2C%20I%20have%20questions%20regarding%20enrolling%20in%20Due%20Diligence.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="tel:09039982165"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone size={15} />
                  <span>Call: 09039982165</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default ApplyPage;
