import { useEffect, useState, useRef } from 'react';
import { useMagnetic } from '../useMagnetic.js';

const STATS = [
  { key: 'svc',    label: 'Service Lines',      target: 11,   suffix: '',  tooltip: 'Network, SOC, VAPT, GRC, Cloud and more, covering the full spectrum.' },
  { key: 'turn',   label: 'Report Turnaround',   target: 72,  suffix: 'h', tooltip: 'From the kickoff call to your first delivered report draft.' },
  { key: 'global', label: 'Service Area',       target: null, display: 'Pan-India', tooltip: 'Based in Gujarat, available on-site across India, remote delivery too.' },
];

function useCountUp(target, start, duration = 1100) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (target === null || !start) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { setValue(target); setDone(true); return; }

    let raf = null;
    let startTs = null;
    function step(ts) {
      if (startTs === null) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setValue(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setDone(true);
      }
    }
    raf = requestAnimationFrame(step);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [target, start, duration]);

  return [value, done];
}

function StatNode({ stat, start }) {
  const [count, done] = useCountUp(stat.target, start);
  const displayValue = stat.target === null ? stat.display : count;
  // For the "Pan-India" stat (no numeric target), pulse once it's revealed.
  const pulse = stat.target === null ? start : done;

  return (
    <div className="hstat" tabIndex={0}>
      <dt className="hstat-lbl">{stat.label}</dt>
      <dd className={`hstat-num${pulse ? ' hstat-pulse' : ''}`}>{displayValue}{stat.suffix}</dd>
      <span className="hstat-tip" role="tooltip">{stat.tooltip}</span>
    </div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const magneticRef = useMagnetic();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { setLoaded(true); return; }
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Stat counters only start once the stats panel actually scrolls into
  // view, rather than immediately on mount.
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle parallax: overlay/content drift at a fraction of scroll speed
  // while the hero is in view. Skipped for prefers-reduced-motion and
  // disabled once the hero has scrolled out of view (perf).
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let ticking = false;
    function update() {
      ticking = false;
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      setParallaxY(window.scrollY * 0.25);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hl = n => `hero-load hero-load-${n}${loaded ? ' hero-load-in' : ''}`;

  return (
    <section className="hero" id="main-content" tabIndex={-1} ref={heroRef}>
      <div
        className="hero-overlay"
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${parallaxY * 0.5}px, 0)` }}
      ></div>

      <dl className={`hero-stats ${hl(6)}`} ref={statsRef}>
        {STATS.map(s => <StatNode stat={s} start={statsVisible} key={s.key} />)}
      </dl>

      <div className="hero-content" style={{ transform: `translate3d(0, ${parallaxY * -0.15}px, 0)` }}>
        <div className={`hero-ch ${hl(1)}`}>
          <span className="hero-ch-mark">Bhagavad Gita, Chapter XIII, Verse 2</span>
          <span className="hero-ch-rule" aria-hidden="true"></span>
        </div>
        <p className={`hero-sk ${hl(2)}`} lang="sa">यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति</p>
        <h1 className={`hero-h1 ${hl(3)}`}>He who knows the field,<br/>that one is called <em>Kshetragya.</em></h1>
        <p className={`hero-p ${hl(4)}`}>From network infrastructure to CCTV surveillance to cybersecurity, we know your network, your terrain, your field, before problems find it. Based in Gujarat, delivering across India.</p>
        <div className={`hero-actions ${hl(5)}`}>
          <a className="btn-v btn-magnetic" href="#contact" ref={magneticRef}>Request Free Assessment</a>
          <a className="btn-g" href="#services">View All Services</a>
        </div>
        <div className="hero-scroll">
          <span className="scroll-lbl">Enter the field</span>
          <span className="scroll-line" aria-hidden="true"></span>
        </div>
      </div>
    </section>
  );
}
