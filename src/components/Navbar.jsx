import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Phone } from 'lucide-react';
import logoImage from '../assets/logo1.jpg';

const Navbar = ({ onOpenApply, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Courses', href: '#services' },
    { name: 'Contact', action: onOpenContact },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-100 shadow-xs'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logoImage} alt="Due Diligence Logo" className="h-16 sm:h-20 w-auto object-contain rounded-md" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-between flex-1 ml-12">
            <div className="flex space-x-8 mx-auto">
              {navLinks.map((link) => (
                link.action ? (
                  <button
                    key={link.name}
                    onClick={link.action}
                    className="text-sm font-bold text-slate-800 hover:text-primary transition-colors relative group cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ) : (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-sm font-bold text-slate-800 hover:text-primary transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                )
              ))}
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Phone size={16} className="text-primary" />
                <span>Call us: 09039982165</span>
              </div>
              <button 
                onClick={onOpenApply}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-900 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-5 px-6">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              link.action ? (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    link.action();
                  }}
                  className="text-base font-bold text-slate-800 hover:text-primary block py-2 border-b border-slate-50 text-left w-full cursor-pointer"
                >
                  {link.name}
                </button>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-base font-bold text-slate-800 hover:text-primary block py-2 border-b border-slate-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <div className="flex items-center justify-center gap-2 py-2 text-base font-bold text-slate-800">
                <Phone size={18} className="text-primary" />
                <span>Call us: 09039982165</span>
              </div>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenApply) onOpenApply();
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
