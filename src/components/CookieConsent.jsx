import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'dd_cookie_consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const choose = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: value, date: new Date().toISOString() }));
    } catch {
      /* storage unavailable */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-20 sm:right-auto sm:max-w-md z-40 bg-slate-900/95 backdrop-blur-md text-slate-200 border border-slate-700 rounded-2xl shadow-2xl p-5"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <Cookie size={20} />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-bold text-white mb-1">We value your privacy</h2>
              <p className="text-xs leading-relaxed text-slate-400">
                We use essential cookies and similar technologies to keep the site secure (including form
                spam protection) and working properly. You can accept all or keep only the essentials.{' '}
                <a href="#privacy" className="text-primary hover:underline font-semibold">Privacy Policy</a>
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2">
                <ShieldCheck size={13} className="text-primary" />
                Protected by Cloudflare security checks
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => choose('all')}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Accept All
                </button>
                <button
                  onClick={() => choose('essential')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Essential Only
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
