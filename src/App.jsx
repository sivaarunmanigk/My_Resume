import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Hooks
import { useLenis } from './hooks/useLenis.js';

// Infrastructure
import Loader from './components/Loader/Loader.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import CustomCursor from './components/Cursor/CustomCursor.jsx';

// Sections
import Hero from './components/Hero/Hero.jsx';
import IntroSection from './components/Intro/IntroSection.jsx';
import AboutSection from './components/About/AboutSection.jsx';
import SpecializationSection from './components/Specialization/SpecializationSection.jsx';
import SelectedProjects from './components/Projects/SelectedProjects.jsx';
import SkillsSection from './components/Skills/SkillsSection.jsx';
import ExperienceTimeline from './components/Experience/ExperienceTimeline.jsx';
import NameReveal from './components/NameReveal/NameReveal.jsx';
import ContactSection from './components/Contact/ContactSection.jsx';

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = ['hero', 'intro', 'about', 'specialization', 'projects', 'skills', 'experience', 'contact'];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialise Lenis smooth scroll
  useLenis();

  // Global scroll tracking
  useEffect(() => {
    if (loading) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? scrolled / total : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading]);

  // Refresh ScrollTrigger after loader exits
  const handleLoadComplete = () => {
    setLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise" aria-hidden="true" />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Boot loader */}
      {loading && <Loader onComplete={handleLoadComplete} />}

      {/* Site — hidden until loader completes */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease',
          pointerEvents: loading ? 'none' : 'auto',
        }}
        role="main"
      >
        {/* Navigation overlay */}
        <Navigation scrollProgress={scrollProgress} />

        {/* ── SECTIONS ─── */}
        <Hero />
        <IntroSection />
        <AboutSection />
        <SpecializationSection />
        <SelectedProjects />
        <SkillsSection />
        <ExperienceTimeline />
        <NameReveal />
        <ContactSection />
      </div>
    </>
  );
}
