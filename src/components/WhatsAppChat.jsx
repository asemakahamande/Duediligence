import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppChat = ({ phoneNumber = "2349039982165", message = "Hello Due Diligence Technologies, I would like to inquire about your courses and programs." }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside 
      aria-label="WhatsApp Support Chat"
      className="fixed bottom-6 right-5 sm:right-7 z-50 flex items-center gap-2.5 select-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 cursor-pointer no-underline"
      >
        {/* Speech Bubble Pill with Pointer Arrow */}
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative bg-[#25D366] text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs sm:text-sm font-semibold tracking-tight max-w-[210px] sm:max-w-[230px] leading-snug text-center transition-all duration-300 group-hover:bg-[#20bd5a] group-hover:shadow-2xl"
        >
          <span>Chat with one of our advisors on Whatsapp</span>
          
          {/* Right Arrow pointing to WhatsApp Icon */}
          <span 
            className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-[#25D366] group-hover:border-l-[#20bd5a] transition-colors"
          />
        </motion.div>

        {/* Circular WhatsApp Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.7)] transition-all duration-300"
        >
          {/* Official WhatsApp SVG Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-7 h-7 sm:w-8 sm:h-8"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z"/>
          </svg>
        </motion.div>
      </a>
    </aside>
  );
};

export default WhatsAppChat;
