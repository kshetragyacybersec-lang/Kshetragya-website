import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Process from '../components/Process.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  const location = useLocation();

  // When arriving at "/" with a hash (e.g. from /services/x clicking "Process"),
  // scroll to that section once this page's content is mounted.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Process />
      <Contact />
    </>
  );
}
