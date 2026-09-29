import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Announcement from './components/Announcement';
import WhyUs from './components/WhyUs';
import Footer from './components/Footer';
import ApplyModal from './components/ApplyModal';
import ContactModal from './components/ContactModal';
import './index.css';

function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

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
    <div className="min-h-screen font-sans">
      <Navbar 
        onOpenApply={() => handleOpenApply()} 
        onOpenContact={handleOpenContact}
      />
      <Hero 
        onOpenApply={() => handleOpenApply()} 
      />
      <Announcement 
        onOpenApply={() => handleOpenApply()} 
      />
      <Services 
        onOpenApply={(courseId) => handleOpenApply(courseId)} 
      />
      <WhyUs 
        onOpenApply={() => handleOpenApply()} 
      />
      <Footer 
        onOpenApply={() => handleOpenApply()} 
        onOpenContact={handleOpenContact}
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
    </div>
  );
}

export default App;