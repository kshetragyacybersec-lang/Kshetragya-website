import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import Hero from '../components/Hero.jsx';
import MarqueeTicker from '../components/MarqueeTicker.jsx';
import Services from '../components/Services.jsx';
import Areas from '../components/Areas.jsx';
import Process from '../components/Process.jsx';
import Contact from '../components/Contact.jsx';

const chapters = [
  { id: 'main-content', label: 'Intro' },
  { id: 'services', label: 'Services' },
  { id: 'areas', label: 'Coverage' },
  { id: 'process', label: 'Method' },
  { id: 'contact', label: 'Contact' },
];

function StoryProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.2 });
  const [active, setActive] = useState('main-content');

  useEffect(() => {
    const observers = chapters.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: '-42% 0px -45% 0px', threshold: 0 }
      );
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <>
      <motion.div className="story-progress" style={{ scaleX }} aria-hidden="true" />
      <nav className="story-rail" aria-label="Page sections">
        {chapters.map((chapter) => (
          <a key={chapter.id} href={`#${chapter.id}`} className={active === chapter.id ? 'is-active' : ''}>
            <span>{chapter.label}</span>
            <i aria-hidden="true" />
          </a>
        ))}
      </nav>
    </>
  );
}

export default function Home() {
  const location = useLocation();

  // When arriving at "/" with a hash (e.g. from /services/x clicking "Process" or "#contact"),
  // scroll to that section once this page's content is mounted.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const scrollTarget = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    // Run immediately and also after transition frames settle
    scrollTarget();
    const t = setTimeout(scrollTarget, 100);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <main className="home-shell">
      <StoryProgress />
      <Hero />
      <MarqueeTicker />
      <Services />
      <Areas />
      <Process />
      <Contact />
    </main>
  );
}
