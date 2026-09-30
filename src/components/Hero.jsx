import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const courseCategories = 'Software Engineering | Data Science | Data Analysis | Artificial Intelligence | Cyber Security | Digital Marketing | Cloud Computing';

const slides = [
  {
    id: 1,
    categories: courseCategories,
    title: 'Data Analytics for All',
    subtitle: 'Innovate with Data, Lead with Confidence',
    ctaText: 'INDIVIDUALS AND BUSINESSES',
    ctaLink: '#services',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2000&q=80'
  },
  {
    id: 2,
    categories: courseCategories,
    title: 'Developing World-Class Programmers',
    subtitle: 'Learn, Build, and Launch Scalable Global Software',
    ctaText: 'EXPLORE TECH COURSES',
    ctaLink: '#services',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80'
  },
  {
    id: 3,
    categories: courseCategories,
    title: 'Master Next-Gen AI & Tech',
    subtitle: 'Empowering You to Solve Real-World Challenges with Cutting-Edge AI',
    ctaText: 'START YOUR TECH CAREER',
    ctaLink: '#services',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2000&q=80'
  }
];

const Hero = ({ onOpenApply }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const currentSlide = slides[currentIndex];

  return (
    <section 
      className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white select-none pt-20 lg:pt-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${currentSlide.image})` }}
        >
          {/* Light, Soft Cinematic Overlay allowing image brightness through */}
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-slate-950/60 via-blue-950/20 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 text-center pt-24 pb-16 flex flex-col items-center">
        
        {/* Categories Bar */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`cat-${currentSlide.id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm md:text-base font-semibold tracking-wide text-slate-200/90 mb-6 drop-shadow-md max-w-4xl leading-relaxed"
          >
            {currentSlide.categories}
          </motion.p>
        </AnimatePresence>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${currentSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-lg"
          >
            {currentSlide.title}
          </motion.h1>
        </AnimatePresence>

        {/* Accent Divider Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 sm:w-36 h-0.5 bg-primary rounded-full mb-6"
        />

        {/* Subtitle */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${currentSlide.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-xl md:text-2xl text-slate-200 font-light max-w-3xl mb-10 drop-shadow"
          >
            {currentSlide.subtitle}
          </motion.p>
        </AnimatePresence>

        {/* CTA Button */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`cta-${currentSlide.id}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => {
                if (onOpenApply) onOpenApply();
              }}
              className="inline-block px-8 py-3.5 sm:px-10 sm:py-4 bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(5,111,236,0.4)] hover:shadow-[0_0_30px_rgba(5,111,236,0.7)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              {currentSlide.ctaText}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrow - Left */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-xs focus:outline-none cursor-pointer"
      >
        <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={2.5} />
      </button>

      {/* Navigation Arrow - Right */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-xs focus:outline-none cursor-pointer"
      >
        <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={2.5} />
      </button>

      {/* Slide Indicators / Dots at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-xs focus:outline-none cursor-pointer ${
              currentIndex === index
                ? 'w-4 h-4 border-2 border-primary bg-primary shadow-[0_0_12px_rgba(5,111,236,0.8)]'
                : 'w-3.5 h-3.5 border-2 border-primary/50 bg-transparent hover:border-primary'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
