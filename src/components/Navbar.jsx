import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import logoImage from '../assets/file_00000000c9a871fd9100ea4a0ecbb765.png';

const Navbar = () => {
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
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logoImage} alt="Due Diligence Logo" className="h-20 w-auto object-contain" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-between flex-1 ml-12">
            <div className="flex space-x-8 mx-auto">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm font-bold text-slate-700 hover:text-primary transition-colors relative group">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <div className="flex items-center">
              <button className="px-8 py-3 bg-primary hover:opacity-90 text-white text-sm font-bold rounded-lg transition-all duration-300 shadow-md">
                Apply Now
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-900 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-base font-bold text-slate-700 hover:text-primary block py-2 border-b border-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <button className="w-full py-3 bg-primary hover:opacity-90 text-white font-bold rounded-lg transition-colors">
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
