import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  ChevronRight,
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  User,
  Loader2,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { countryCodes } from '../data/countryCodes';
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../config/forms';
import { TURNSTILE_SITE_KEY, clean, cleanMultiline, validateContact, checkRateLimit, recordSubmission } from '../config/formSecurity';
import TurnstileWidget from './TurnstileWidget';

const ContactPage = ({ onNavigate, onOpenApply }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+234',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

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
      message: cleanMultiline(formData.message)
    };

    if (!data.fullName || !data.email || !data.phone || !data.message) {
      setError('Please fill in all required fields.');
      return;
    }

    const validationError = validateContact(data);
    if (validationError) {
      setError(validationError);
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
      submissionBody.append('subject', `💬 [${formData.subject}] New Contact Inquiry from ${data.fullName}`);
      submissionBody.append('from_name', 'Due Diligence Website Contact Page');
      submissionBody.append('Full Name', data.fullName);
      submissionBody.append('Email', data.email);
      submissionBody.append('Phone Number', `${formData.countryCode} ${data.phone}`);
      submissionBody.append('Inquiry Category', formData.subject);
      submissionBody.append('Message', data.message);
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
        setError(result.message || 'Unable to send message. Please try again.');
      }
    } catch (err) {
      setError('Network error occurred. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How fast do you respond to inquiries?',
      a: 'Our admissions and student support team typically responds within 1 to 3 hours during active business hours.'
    },
    {
      q: 'Can I speak directly with an admissions advisor?',
      a: 'Yes! You can call us directly at 09039982165 or chat with an advisor on WhatsApp for instant 1:1 guidance.'
    },
    {
      q: 'Where do classes take place?',
      a: 'We offer intensive live virtual training with real-time screen sharing, interactive labs, and class recordings, as well as physical hub sessions.'
    },
    {
      q: 'Are payment installments available?',
      a: 'Yes, we provide flexible installment payment plans so that tuition is paid comfortably across the duration of your cohort.'
    },
    {
      q: 'Will I receive a verified certificate upon completion?',
      a: 'Yes, every graduate who successfully completes the coursework and capstone project receives a globally verifiable Certificate of Completion.'
    },
    {
      q: 'Can I apply without prior coding or tech experience?',
      a: 'Absolutely! Our tracks are carefully designed with foundational beginner modules that ramp you up to advanced production standards.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-20 pb-20">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          
          {/* Breadcrumb & Back */}
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
              <span>Admissions Office Online</span>
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
            <span className="text-slate-200 font-semibold">Contact & Inquiries</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 border border-primary/30">
              <Sparkles size={13} />
              <span>Direct Support & Inquiries</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Get in Touch with Our Team
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed font-normal">
              Have questions about our curriculums, cohort start dates, tuition plans, or admissions? We’re here to help you take the next confident step in your tech journey.
            </p>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info Cards & FAQs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Info Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <MessageSquare size={20} className="text-primary" />
                <span>Contact Channels</span>
              </h2>

              <div className="space-y-4">
                {/* Phone */}
                <a 
                  href="tel:09039982165"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-primary/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Phone & Hotline</span>
                    <span className="text-base font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                      09039982165
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">Direct line to our admissions desk</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:hello@duediligence.tech"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-primary/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Official Email</span>
                    <span className="text-base font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                      hello@duediligence.tech
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">Responses within 1–3 business hours</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/2349039982165?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Due%20Diligence%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/60 border border-emerald-200/80 hover:border-emerald-400 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">WhatsApp Direct Chat</span>
                    <span className="text-base font-extrabold text-emerald-950 group-hover:text-emerald-700 transition-colors">
                      Chat with an Advisor
                    </span>
                    <p className="text-xs text-emerald-700 mt-0.5">Fastest reply for curriculum & enrollment questions</p>
                  </div>
                </a>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-12 h-12 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Operating Hours</span>
                    <span className="text-sm font-bold text-slate-900 block">
                      Monday – Friday: 8:00 AM – 6:00 PM
                    </span>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      Saturday: 9:00 AM – 4:00 PM (GMT+1)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Admissions CTA */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 border border-slate-700 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Ready to Join a Cohort?
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Fast-Track Your Course Application
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                If you already know the course or track you want to pursue, submit your application form directly.
              </p>
              <button
                onClick={() => onOpenApply && onOpenApply()}
                className="w-full py-3 px-5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Course Application</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>

          {/* Right Column: Full Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                  Send a Direct Message
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  How Can We Help You?
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Fill out the form below and an advisor will get back to you promptly.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-6 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <CheckCircle2 size={42} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed mb-6">
                    Thank you for reaching out, <strong>{formData.fullName}</strong>. We have received your inquiry and our team will get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        countryCode: '+234',
                        phone: '',
                        subject: 'General Inquiry',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company_website">Company Website</label>
                    <input
                      type="text"
                      id="company_website"
                      name="company_website"
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

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Samuel Adekunle"
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
                          placeholder="e.g. samuel@example.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Phone Number <span className="text-red-500">*</span>
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

                  {/* Inquiry Topic */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Topic / Category
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all outline-none bg-white cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Course Curriculum Question">Course Curriculum & Syllabus</option>
                      <option value="Young Coders Academy">Young Coders Academy (Kids & Teens)</option>
                      <option value="Admissions & Schedules">Admissions & Upcoming Cohorts</option>
                      <option value="Installments & Pricing">Tuition Plans & Installments</option>
                      <option value="Corporate / Team Training">Corporate & Enterprise Training</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us what you'd like to ask or achieve..."
                      className="w-full p-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all outline-none resize-none"
                    ></textarea>
                  </div>

                  {/* Cloudflare Turnstile CAPTCHA */}
                  {TURNSTILE_SITE_KEY && (
                    <div className="pt-1">
                      <TurnstileWidget onVerify={(token) => setCaptchaToken(token)} />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Your contact information is strictly protected and never shared.</span>
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Full-Width Frequently Asked Questions Section */}
        <div className="mt-14 sm:mt-20 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle size={14} />
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Everything you need to know about reaching our admissions team, schedules, payment options, and training format.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-start"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 text-primary text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ContactPage;
