import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import logoImage from '../assets/logo1.jpg';

const Footer = ({ onOpenApply, onOpenContact, onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 pb-5 border-t border-slate-800" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="Duediligence Technologies Logo" className="h-12 w-auto object-contain rounded-md bg-white p-1" />
              <span className="text-xl font-bold text-white tracking-tight">Duediligence Technologies</span>
            </div>
            <p className="text-slate-400 mb-4 max-w-md leading-relaxed text-sm">
              We help people build digital skills and help businesses use technology to solve problems and create future-ready solutions.
            </p>
            <div className="flex gap-3">
              <span className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white text-sm font-bold">X</span>
              <span className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white text-sm font-bold">in</span>
              <span className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white text-sm font-bold">fb</span>
            </div>
          </div>

          <div className="lg:col-span-3 lg:pl-8">
            <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => {
                    if (onNavigate) onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onNavigate) onNavigate('why-duediligence');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Why Due Diligence
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onNavigate) onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById('services');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} 
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Professional Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onNavigate) onNavigate('young-coders');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  <span>Young Coders Academy</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContact} 
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenApply()} 
                  className="hover:text-primary transition-colors cursor-pointer text-left font-semibold text-primary"
                >
                  Apply for Cohort
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-lg font-semibold text-white mb-3">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span>hello@duediligence.tech</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span>09039982165</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span>123 Innovation Drive, Tech District</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Duediligence Technologies. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button onClick={() => { if (onNavigate) onNavigate('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => { if (onNavigate) onNavigate('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
