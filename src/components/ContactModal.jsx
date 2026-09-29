import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MessageSquare, AlertCircle, Mail, Phone, User, Send } from 'lucide-react';
import { countryCodes } from '../data/countryCodes';

// Replace this URL with your Google Contact Form embed URL if you want the Google Form iframe directly
// Example: "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true"
export const GOOGLE_CONTACT_FORM_EMBED_URL = ""; 

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+234',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
      setError('Please fill in all 4 required fields.');
      return;
    }

    // Process contact submission
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      countryCode: '+234',
      phone: '',
      message: ''
    });
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
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col border border-slate-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <MessageSquare size={12} /> Get in Touch
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Contact Us
            </h3>
            <p className="text-blue-100 text-sm mt-1">
              Have questions or inquiries? Send us a message and we'll reply promptly.
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {GOOGLE_CONTACT_FORM_EMBED_URL ? (
              // If user provided a Google Form Embed URL
              <iframe
                src={GOOGLE_CONTACT_FORM_EMBED_URL}
                width="100%"
                height="550"
                frameBorder="0"
                className="w-full rounded-xl border border-slate-200"
                title="Google Contact Form"
              >
                Loading Contact Form…
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
                <h4 className="text-2xl font-bold text-slate-900">Message Sent Successfully!</h4>
                <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. We have received your inquiry and our team will get back to you shortly.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left max-w-md mx-auto text-xs space-y-1.5 text-slate-600">
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.countryCode} {formData.phone}</p>
                  <p><strong>Message:</strong> {formData.message}</p>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-4 px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              // 4-Field Contact Form
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Field 1: Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    1. Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-900"
                    />
                  </div>
                </div>

                {/* Field 2: Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    2. Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-900"
                    />
                  </div>
                </div>

                {/* Field 3: Phone Number with Country Code */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    3. Phone Number <span className="text-red-500">*</span>
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
                    <div className="relative w-full">
                      <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="801 234 5678"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-900"
                      />
                    </div>
                  </div>
                </div>


                {/* Field 4: Reason / Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    4. Reason or Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Tell us what you'd like to discuss or inquire about..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-900 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-primary hover:bg-amber-500 hover:text-slate-950 text-white font-bold rounded-xl transition-all duration-300 text-sm tracking-wider uppercase shadow-lg shadow-primary/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ContactModal;
