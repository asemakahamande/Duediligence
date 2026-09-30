import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Sparkles } from 'lucide-react';
import logoImage from '../assets/logo1.jpg';

const Navbar = ({ onOpenApply, onOpenContact, currentPage = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target, action) => {
    setIsMobileMenuOpen(false);
    if (action) {
      action();
      return;
    }
    if (target === 'young-coders') {
      if (onNavigate) onNavigate('young-coders');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'why-duediligence') {
      if (onNavigate) onNavigate('why-duediligence');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'courses') {
      if (currentPage !== 'home' && onNavigate) {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (target === 'home') {
      if (onNavigate) onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-100 shadow-xs'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img src={logoImage} alt="Due Diligence Logo" className="h-14 sm:h-18 w-auto object-contain rounded-md" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-between flex-1 ml-8">
            <div className="flex items-center space-x-6 mx-auto">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-sm font-bold transition-colors relative group cursor-pointer ${
                  currentPage === 'home' ? 'text-primary' : 'text-slate-800 hover:text-primary'
                }`}
              >
                Home
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  currentPage === 'home' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>

              <button
                onClick={() => handleNavClick('why-duediligence')}
                className={`text-sm font-bold transition-colors relative group cursor-pointer ${
                  currentPage === 'why-duediligence' ? 'text-primary' : 'text-slate-800 hover:text-primary'
                }`}
              >
                Why Due Diligence
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  currentPage === 'why-duediligence' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>

              <button
                onClick={() => handleNavClick('courses')}
                className="text-sm font-bold text-slate-800 hover:text-primary transition-colors relative group cursor-pointer"
              >
                Courses
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>

              <button
                onClick={() => handleNavClick('young-coders')}
                className={`text-sm font-bold transition-all relative group cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-full ${
                  currentPage === 'young-coders'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-slate-800 hover:text-primary bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/40'
                }`}
              >
                <Sparkles size={14} className={currentPage === 'young-coders' ? 'text-amber-300' : 'text-amber-600'} />
                <span>Young Coders</span>
              </button>

              <button
                onClick={onOpenContact}
                className="text-sm font-bold text-slate-800 hover:text-primary transition-colors relative group cursor-pointer"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Phone size={16} className="text-primary" />
                <span>09039982165</span>
              </div>
              <button 
                onClick={() => onOpenApply(currentPage === 'young-coders' ? 'thunkable-apps' : '')}
                className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-900 hover:text-primary transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-6">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-base font-bold text-slate-800 hover:text-primary block py-2 border-b border-slate-50 text-left w-full cursor-pointer"
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('why-duediligence')}
              className="text-base font-bold text-slate-800 hover:text-primary block py-2 border-b border-slate-50 text-left w-full cursor-pointer"
            >
              Why Due Diligence
            </button>

            <button
              onClick={() => handleNavClick('courses')}
              className="text-base font-bold text-slate-800 hover:text-primary block py-2 border-b border-slate-50 text-left w-full cursor-pointer"
            >
              Professional Courses
            </button>

            <button
              onClick={() => handleNavClick('young-coders')}
              className="text-base font-bold text-slate-800 hover:text-primary py-2 border-b border-slate-50 text-left w-full cursor-pointer flex items-center justify-between"
            >
              <span>Young Coders</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-800 text-xs font-bold">Grade 1–12</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-base font-bold text-slate-800 hover:text-primary block py-2 border-b border-slate-50 text-left w-full cursor-pointer"
            >
              Contact
            </button>

            <div className="pt-2 flex flex-col space-y-3">
              <div className="flex items-center justify-center gap-2 py-1 text-sm font-bold text-slate-800">
                <Phone size={16} className="text-primary" />
                <span>Call us: 09039982165</span>
              </div>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenApply(currentPage === 'young-coders' ? 'thunkable-apps' : '');
                }}
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors shadow-md cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
