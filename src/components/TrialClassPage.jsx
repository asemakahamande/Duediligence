import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  BookOpen,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  GraduationCap,
  Video
} from 'lucide-react';
import { countryCodes } from '../data/countryCodes';
import { youngCodersCourses } from '../data/youngCodersData';
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT, GOOGLE_TRIAL_FORM_EMBED_URL } from '../config/forms';
import { TURNSTILE_SITE_KEY, LIMITS, clean, validateContact, checkRateLimit, recordSubmission } from '../config/formSecurity';
import TurnstileWidget from './TurnstileWidget';

const trialTimeSlots = [
  'Morning: 10:00 AM – 11:00 AM (GMT+1)',
  'Midday: 12:00 PM – 1:00 PM (GMT+1)',
  'Afternoon: 2:00 PM – 3:00 PM (GMT+1)',
  'Late Afternoon: 4:00 PM – 5:00 PM (GMT+1)',
  'Evening: 6:00 PM – 7:00 PM (GMT+1)',
  'Weekend Morning: Saturday 10:00 AM – 11:00 AM (GMT+1)',
  'Weekend Afternoon: Saturday 2:00 PM – 3:00 PM (GMT+1)'
];

const TrialClassPage = ({ initialCourseId = '', onNavigate, onOpenApply }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+234',
    phone: '',
    age: '',
    location: '',
    course: initialCourseId || youngCodersCourses[0].id,
    trialDate: '',
    trialTime: trialTimeSlots[3]
  });

  useEffect(() => {
    if (initialCourseId && youngCodersCourses.some((c) => c.id === initialCourseId)) {
      setFormData((prev) => ({ ...prev, course: initialCourseId }));
    }
  }, [initialCourseId]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const selectedCourseObj =
    youngCodersCourses.find((c) => c.id === formData.course) || youngCodersCourses[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
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
      phone: clean(formData.phone),
      age: clean(formData.age),
      location: clean(formData.location),
      trialDate: clean(formData.trialDate),
      trialTime: clean(formData.trialTime)
    };

    if (!data.fullName || !data.email || !data.phone || !data.age || !data.location || !data.trialDate || !data.trialTime) {
      setError('Please fill in all required fields (Name, Email, Phone, Age, Location, and Trial Class Date & Time).');
      return;
    }

    const validationError = validateContact({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone
    });
    if (validationError) {
      setError(validationError);
      return;
    }

    const numericAge = Number(data.age);
    if (Number.isNaN(numericAge) || numericAge < 4 || numericAge > 25) {
      setError('Please enter a valid student age (between 4 and 25).');
      return;
    }

    if (data.location.length < 2) {
      setError('Please enter your city and country/state.');
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
      submissionBody.append(
        'subject',
        `🎯 New Trial Class Booking: ${data.fullName} (Age ${data.age}) - ${selectedCourseObj.title}`
      );
      submissionBody.append('from_name', 'Due Diligence Young Coders Trial Booking');
      submissionBody.append('Person / Student Name', data.fullName);
      submissionBody.append('Phone Number', `${formData.countryCode} ${data.phone}`);
      submissionBody.append('Email', data.email);
      submissionBody.append('Student Age', `${data.age} years old`);
      submissionBody.append('Location', data.location);
      submissionBody.append('Selected Course', `${selectedCourseObj.title} (${selectedCourseObj.gradeLevel})`);
      submissionBody.append('Preferred Trial Date', data.trialDate);
      submissionBody.append('Preferred Trial Time', data.trialTime);
      submissionBody.append('Class Format', '100% Live Online (1-Hour Trial Session)');
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
        setError(result.message || 'Unable to book trial class right now. Please try again.');
      }
    } catch {
      setError('Network error occurred. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Minimum selectable date = today
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-20 pb-20">
      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <button
              onClick={() => {
                if (onNavigate) onNavigate('young-coders');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Young Coders</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Live Online • 1-on-1 Trial Session</span>
            </div>
          </div>

          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4 flex-wrap">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight size={12} className="text-slate-600" />
            <button
              onClick={() => onNavigate && onNavigate('young-coders')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Young Coders
            </button>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-slate-200 font-semibold">Book a Trial Class</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-400/30">
              <Sparkles size={13} />
              <span>Young Coders Academy • Grade 1 – 12</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Book a Live Online Trial Class
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed font-normal">
              Let your child experience a live, interactive 1-hour coding session with our instructors before enrolling in the full track. Fill out the details below and choose your preferred trial time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Trial Class Booking Form (or Google Form Embed) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                  Trial Session Reservation
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Schedule Your Child’s Trial Class
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Provide the student’s name, phone number, age, location, and preferred trial class date and time.
                </p>
              </div>

              {GOOGLE_TRIAL_FORM_EMBED_URL ? (
                <iframe
                  src={GOOGLE_TRIAL_FORM_EMBED_URL}
                  width="100%"
                  height="720"
                  frameBorder="0"
                  className="w-full rounded-2xl border border-slate-200"
                  title="Book a Trial Class Google Form"
                >
                  Loading Trial Class Form…
                </iframe>
              ) : isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 px-4 sm:px-8 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <CheckCircle2 size={44} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                    Trial Class Booked Successfully!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed mb-6">
                    Thank you, <strong>{formData.fullName}</strong>! Your trial class request for{' '}
                    <strong>{selectedCourseObj.title}</strong> has been sent to our team. We will contact you via WhatsApp and Email shortly with your live online meeting link.
                  </p>

                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto mb-8 text-left space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Course:</span>
                      <span className="font-bold text-slate-900">{selectedCourseObj.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Name:</span>
                      <span className="font-bold text-slate-900">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Age:</span>
                      <span className="font-bold text-slate-900">{formData.age} years old</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Phone:</span>
                      <span className="font-bold text-slate-900">{formData.countryCode} {formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Location:</span>
                      <span className="font-bold text-slate-900">{formData.location}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200">
                      <span className="text-slate-500 font-semibold">Trial Date:</span>
                      <span className="font-bold text-primary">{formData.trialDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Trial Time:</span>
                      <span className="font-bold text-primary">{formData.trialTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/2349039982165?text=Hello%2C%20I%20just%20booked%20a%20trial%20class%20for%20${encodeURIComponent(
                        selectedCourseObj.title
                      )}%20(Name%3A%20${encodeURIComponent(formData.fullName)}%2C%20Age%3A%20${encodeURIComponent(
                        formData.age
                      )}%2C%20Time%3A%20${encodeURIComponent(formData.trialDate + ' ' + formData.trialTime)}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle size={17} />
                      <span>Confirm on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          countryCode: '+234',
                          phone: '',
                          age: '',
                          location: '',
                          course: selectedCourseObj.id,
                          trialDate: '',
                          trialTime: trialTimeSlots[3]
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                    >
                      Book Another Trial Class
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="trial_company_website">Website</label>
                    <input
                      type="text"
                      id="trial_company_website"
                      name="trial_company_website"
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

                  {/* Young Coders Course Selection */}
                  <div className="bg-amber-50/70 border border-amber-200/80 p-5 rounded-2xl">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <BookOpen size={15} className="text-amber-600" />
                      <span>Select Young Coders Course for Trial Class</span>
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-semibold text-slate-900 bg-white transition-all outline-none cursor-pointer"
                    >
                      {youngCodersCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.pathEmoji} {c.title} ({c.gradeLevel} • {c.ageRange})
                        </option>
                      ))}
                    </select>

                    <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-amber-200/60 text-xs text-slate-600">
                      <span><strong>Grade Level:</strong> {selectedCourseObj.gradeLevel} ({selectedCourseObj.ageRange})</span>
                      <span><strong>Format:</strong> 100% Live Online</span>
                      <span className="text-primary font-bold">Full Track: {selectedCourseObj.price}</span>
                    </div>
                  </div>

                  {/* Person / Student Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Student / Parent Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        maxLength={LIMITS.name}
                        placeholder="e.g. David Adekunle"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          maxLength={LIMITS.email}
                          placeholder="e.g. parent@example.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all outline-none"
                        />
                      </div>
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
                          maxLength={LIMITS.phone}
                          placeholder="08012345678"
                          className="w-full px-3 py-3 text-sm font-medium outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Age & Location Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Child's Age */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Student Age (Years) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <GraduationCap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          type="number"
                          name="age"
                          min="4"
                          max="25"
                          value={formData.age}
                          onChange={handleChange}
                          required
                          placeholder="e.g. 10"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Location (City, State / Country) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          maxLength={120}
                          placeholder="e.g. Lagos, Nigeria / London, UK"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferred Date & Time for the Trial Class */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Calendar size={14} className="text-primary" />
                        <span>Preferred Trial Date <span className="text-red-500">*</span></span>
                      </label>
                      <input
                        type="date"
                        name="trialDate"
                        min={todayStr}
                        value={formData.trialDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium bg-white transition-all outline-none cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Clock size={14} className="text-primary" />
                        <span>Preferred Trial Time <span className="text-red-500">*</span></span>
                      </label>
                      <select
                        name="trialTime"
                        value={formData.trialTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium bg-white transition-all outline-none cursor-pointer"
                      >
                        {trialTimeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
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
                        <span>Booking Trial Class...</span>
                      </>
                    ) : (
                      <>
                        <span>Book Trial Class for {selectedCourseObj.title}</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Our admissions team will email and WhatsApp you the live class link for your selected time.</span>
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Course Summary & What to Expect */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1 block">
                Selected Trial Track
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {selectedCourseObj.title}
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                {selectedCourseObj.gradeLevel} ({selectedCourseObj.ageRange}) • 100% Live Online
              </p>

              <div className="space-y-3 pb-5 border-b border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Video size={14} className="text-primary" /> Trial Format:
                  </span>
                  <span className="font-bold text-emerald-700">1-Hr Live Online Session</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Clock size={14} className="text-primary" /> Full Course Duration:
                  </span>
                  <span className="font-bold text-slate-900">{selectedCourseObj.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-primary" /> Weekly Rate:
                  </span>
                  <span className="font-bold text-slate-900">{selectedCourseObj.weeklyRate}</span>
                </div>
              </div>

              <div className="pt-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  What Happens in the Trial Class?
                </p>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>1-on-1 live interactive coding session with a friendly instructor</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Your child builds a working mini-game or project in their very first hour</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Skill-level assessment & personalized learning roadmap for parents</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('curriculum', selectedCourseObj.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-primary text-slate-700 hover:text-primary text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen size={14} />
                  <span>View Full Course Curriculum</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenApply && onOpenApply(selectedCourseObj.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Enroll Directly in Full Course</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialClassPage;
