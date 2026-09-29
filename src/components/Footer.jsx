import React from 'react';
import { Terminal, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = ({ onOpenApply, onOpenContact }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top CTA section */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 sm:p-12 mb-20 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 mb-8 md:mb-0 md:mr-8 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Technology Journey</h2>
            <p className="text-blue-100 text-lg max-w-xl">Learn a skill. Build your idea. Create your future. We are ready to work with you.</p>
          </div>
          <button 
            onClick={onOpenContact}
            className="relative z-10 whitespace-nowrap px-8 py-4 bg-white text-primary hover:bg-amber-400 hover:text-slate-950 font-bold rounded-full transition-all duration-300 shadow-lg flex items-center gap-2 cursor-pointer"
          >
            Contact Us Today
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Terminal size={28} className="text-primary" />
              <span className="text-2xl font-bold text-white tracking-tight">Duediligence Technologies</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              We help people develop the skills to participate in the digital economy and help businesses use technology to solve problems, improve their operations, and reach more customers.
            </p>
            <div className="flex gap-4">
              <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">X</span>
              <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">in</span>
              <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">fb</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><button onClick={onOpenApply} className="hover:text-primary transition-colors cursor-pointer">Technology Training</button></li>
              <li><button onClick={onOpenContact} className="hover:text-primary transition-colors cursor-pointer">Website Development</button></li>
              <li><button onClick={onOpenContact} className="hover:text-primary transition-colors cursor-pointer">Application Development</button></li>
              <li><a href="#why-us" className="hover:text-primary transition-colors">About Us</a></li>
              <li><button onClick={onOpenContact} className="hover:text-primary transition-colors cursor-pointer">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-amber-400 flex-shrink-0 mt-1" />
                <span>hello@duediligence.tech</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-amber-400 flex-shrink-0 mt-1" />
                <span>09039982165</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-amber-400 flex-shrink-0 mt-1" />
                <span>123 Innovation Drive, Tech District</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Duediligence Technologies. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
