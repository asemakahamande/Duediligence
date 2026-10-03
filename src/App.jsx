import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Announcement from './components/Announcement';
import Footer from './components/Footer';
import ApplyModal from './components/ApplyModal';
import ContactModal from './components/ContactModal';
import YoungCodersPage from './components/YoungCodersPage';
import WhyDueDiligencePage from './components/WhyDueDiligencePage';
import WhatsAppChat from './components/WhatsAppChat';
import LegalPage from './components/LegalPage';
import CookieConsent from './components/CookieConsent';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#young-coders') {
        setCurrentPage('young-coders');
      } else if (hash === '#why-duediligence') {
        setCurrentPage('why-duediligence');
      } else if (hash === '#privacy') {
        setCurrentPage('privacy');
      } else if (hash === '#terms') {
        setCurrentPage('terms');
      } else if (hash === '#home' || hash === '') {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#${page}`;
  };

  const handleOpenApply = (courseId = '') => {
    setSelectedCourse(courseId);
    setIsApplyModalOpen(true);
  };

  const handleCloseApply = () => {
    setIsApplyModalOpen(false);
  };

  const handleOpenContact = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div className="min-h-screen font-sans bg-white flex flex-col justify-between">
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenApply={(courseId) => handleOpenApply(courseId)} 
        onOpenContact={handleOpenContact}
      />

      <main className="flex-grow">
        {currentPage === 'privacy' || currentPage === 'terms' ? (
          <LegalPage type={currentPage} onNavigate={handleNavigate} />
        ) : currentPage === 'young-coders' ? (
          <YoungCodersPage 
            onOpenApply={(courseId) => handleOpenApply(courseId)}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : currentPage === 'why-duediligence' ? (
          <WhyDueDiligencePage 
            onOpenApply={(courseId) => handleOpenApply(courseId)}
            onNavigate={handleNavigate}
          />
        ) : (
          <>
            <Hero 
              onOpenApply={() => handleOpenApply()} 
            />
            <Announcement 
              onOpenApply={() => handleOpenApply()} 
            />
            <Services 
              onOpenApply={(courseId) => handleOpenApply(courseId)} 
            />
          </>
        )}
      </main>

      <Footer 
        onOpenApply={() => handleOpenApply()} 
        onOpenContact={handleOpenContact}
        onNavigate={handleNavigate}
      />

      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseApply}
        defaultCourse={selectedCourse}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContact}
      />

      {/* Floating WhatsApp Chat Button on Every Page */}
      <WhatsAppChat />

      {/* Cookie consent banner */}
      <CookieConsent />
    </div>
  );
}

export default App;