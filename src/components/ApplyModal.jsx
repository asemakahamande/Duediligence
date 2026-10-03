import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, FileText, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { countryCodes } from '../data/countryCodes';
import { coursesData } from '../data/coursesData';
import { youngCodersCourses } from '../data/youngCodersData';
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../config/forms';
import { TURNSTILE_SITE_KEY, LIMITS, clean, validateContact, checkRateLimit, recordSubmission } from '../config/formSecurity';
import TurnstileWidget from './TurnstileWidget';

// Replace this URL with your Google Form embed URL if you want the Google Form iframe directly
// Example: "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true"
export const GOOGLE_FORM_EMBED_URL = ""; 

const courses = [
  ...coursesData.map(c => ({
    id: c.id,
    name: `${c.title} (${c.duration})`,
    price: c.price,
    duration: c.duration,
    category: 'Professional Tracks'
  })),
  ...youngCodersCourses.map(c => ({
    id: c.id,
    name: `[Young Coders] ${c.title} (${c.gradeLevel || 'Grade 1 - 14'})`,
    price: c.price,
    duration: c.duration,
    category: 'Young Coders Academy (Grade 1-14)'
  }))
];

const ApplyModal = ({ isOpen, onClose, defaultCourse = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+234',
    phone: '',
    gender: '',
    course: defaultCourse || courses[0].id,
    learningMode: 'Online (Virtual Live)',
    agreedToTerms: false
  });

  useEffect(() => {
    if (defaultCourse) {
      setFormData((prev) => ({ ...prev, course: defaultCourse }));
    }
  }, [defaultCourse]);

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

    // Honeypot: bots fill hidden fields. Pretend success, send nothing.
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
      setError('Please review and agree to the Student Agreement.');
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

  const handleReset = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col border border-slate-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} /> Admissions Open
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Student Application Form
            </h3>
            <p className="text-blue-100 text-sm mt-1">
              Fill out the details below to secure your spot for the upcoming cohort.
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {GOOGLE_FORM_EMBED_URL ? (
              // If user provided a Google Form Embed URL
              <iframe
                src={GOOGLE_FORM_EMBED_URL}
                width="100%"
                height="600"
                frameBorder="0"
                className="w-full rounded-xl border border-slate-200"
                title="Google Form Application"
              >
                Loading Application Form…
              </iframe>
            ) : isSubmitted ? (
              // Submission Success State
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900">Application Submitted!</h4>
                <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. We have received your application for <strong className="text-primary">{selectedCourseObj.name}</strong>.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left max-w-md mx-auto text-xs space-y-1.5 text-slate-600">
                  <p><strong>Selected Course:</strong> {selectedCourseObj.name}</p>
                  <p><strong>Tuition Fee:</strong> {selectedCourseObj.price}</p>
                  <p><strong>Phone / WhatsApp:</strong> {formData.countryCode} {formData.phone}</p>
                  <p><strong>Confirmation sent to:</strong> {formData.email}</p>
                </div>
                <p className="text-xs text-slate-500">
                  Our admissions team will reach out to you via WhatsApp and Email within 24 hours with next steps.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-md"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              // Interactive Form
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. John Doe"
                    maxLength={LIMITS.name}
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-900"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@example.com"
                      maxLength={LIMITS.email}
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-40 sm:w-48 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium text-slate-900 shrink-0 truncate"
                      >
                        {countryCodes.map((item, idx) => (
                          <option key={idx} value={item.code}>
                            {item.country} ({item.code})
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="801 234 5678"
                        maxLength={LIMITS.phone}
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-900"
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
                      required
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-900"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Learning Mode
                    </label>
                    <select
                      name="learningMode"
                      value={formData.learningMode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-900"
                    >
                      <option value="Online (Virtual Live)">Online (Virtual Live)</option>
                      <option value="In-Person Campus">In-Person Campus</option>
                      <option value="Weekend Cohort">Weekend Cohort</option>
                    </select>
                  </div>
                </div>

                {/* Course Selection Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium text-slate-900"
                  >
                    <optgroup label="Professional Tracks">
                      {courses.filter(c => c.category === 'Professional Tracks').map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Young Coders Academy (Grade 1–14)">
                      {courses.filter(c => c.category.includes('Young Coders')).map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Course Pricing & Fee Box */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-amber-50/50 border border-blue-100 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500 tracking-wider">Tuition Fee</p>
                    <p className="text-lg sm:text-xl font-black text-primary">{selectedCourseObj.price}</p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-white border border-blue-200 text-slate-700 rounded-full font-semibold shadow-xs">
                    {selectedCourseObj.duration}
                  </span>
                </div>

                {/* Agreement and Terms Link */}
                <div className="pt-2">
                  <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <input
                      type="checkbox"
                      id="agreedToTerms"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary cursor-pointer"
                    />
                    <label htmlFor="agreedToTerms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                      I have read and agree to the{' '}
                      <a
                        href="#terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-bold inline-flex items-center gap-1"
                      >
                        <FileText size={13} />
                        Student Agreement & Training Terms
                      </a>
                      . I agree to abide by the school rules and payment schedules.
                    </label>
                  </div>
                </div>

                {/* Honeypot (hidden from humans) */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(ev) => setHoneypot(ev.target.value)}
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />

                <TurnstileWidget onToken={setCaptchaToken} />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary hover:bg-amber-500 hover:text-slate-950 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 text-sm tracking-wider uppercase shadow-lg shadow-primary/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ApplyModal;
