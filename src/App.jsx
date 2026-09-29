import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Announcement from './components/Announcement';
import WhyUs from './components/WhyUs';
import Footer from './components/Footer';
import './index.css'; // Make sure this is imported if not in main.jsx

function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <Announcement />
      <Services />
      <WhyUs />
      <Footer />
    </div>
  );
}

export default App;