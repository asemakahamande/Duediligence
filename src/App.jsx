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
import CurriculumPage from './components/CurriculumPage';
import ContactPage from './components/ContactPage';
import ApplyPage from './components/ApplyPage';
import CookieConsent from './components/CookieConsent';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#apply')) {
      return window.location.hash.split('/')[1] || '';
    }
    return '';
  });
  const [selectedCurriculumCourse, setSelectedCurriculumCourse] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#curriculum')) {
      return window.location.hash.split('/')[1] || '';
    }
    return '';
  });

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#curriculum')) {
        setCurrentPage('curriculum');
        const parts = hash.split('/');
        if (parts[1]) {
          setSelectedCurriculumCourse(parts[1]);
        } else {
          setSelectedCurriculumCourse('');
        }
      } else if (hash.startsWith('#apply')) {
        setCurrentPage('apply');
        const parts = hash.split('/');
        if (parts[1]) {
          setSelectedCourse(parts[1]);
        }
      } else if (hash === '#contact') {
        setCurrentPage('contact');
      } else if (hash === '#young-coders') {
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

  const handleNavigate = (page, param = '') => {
    if (page === 'curriculum') {
      handleOpenCurriculum(param);
      return;
    }
    if (page === 'apply') {
      handleOpenApply(param);
      return;
    }
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#${page}`;
  };

  const handleOpenCurriculum = (courseId = '') => {
    if (courseId) {
      setSelectedCurriculumCourse(courseId);
      window.location.hash = `#curriculum/${courseId}`;
    } else {
      setSelectedCurriculumCourse('');
      window.location.hash = '#curriculum';
    }
    setCurrentPage('curriculum');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApply = (courseId = '') => {
    setSelectedCourse(courseId || '');
    if (courseId) {
      window.location.hash = `#apply/${courseId}`;
    } else {
      window.location.hash = '#apply';
    }
    setCurrentPage('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseApply = () => {
    setIsApplyModalOpen(false);
  };

  const handleOpenContact = () => {
    handleNavigate('contact');
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
        ) : currentPage === 'apply' ? (
          <ApplyPage 
            initialCourseId={selectedCourse} 
            onNavigate={handleNavigate} 
          />
        ) : currentPage === 'contact' ? (
          <ContactPage 
            onNavigate={handleNavigate} 
            onOpenApply={(courseId) => handleOpenApply(courseId)} 
          />
        ) : currentPage === 'young-coders' ? (
          <YoungCodersPage 
            onOpenApply={(courseId) => handleOpenApply(courseId)}
            onNavigateHome={() => handleNavigate('home')}
            onOpenCurriculum={handleOpenCurriculum}
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'why-duediligence' ? (
          <WhyDueDiligencePage 
            onOpenApply={(courseId) => handleOpenApply(courseId)}
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'curriculum' ? (
          <CurriculumPage 
            initialCourseId={selectedCurriculumCourse}
            onOpenApply={(courseId) => handleOpenApply(courseId)}
            onNavigateHome={() => handleNavigate('home')}
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
              onOpenCurriculum={handleOpenCurriculum}
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