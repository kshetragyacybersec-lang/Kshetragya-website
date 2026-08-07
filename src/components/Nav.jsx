import { useState, useEffect, useRef } from 'react';
import { services } from '../data.js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const burgerRef = useRef(null);
  const drawerRef = useRef(null);
  const megaRef = useRef(null);
  const svcTriggerRef = useRef(null);

  useEffect(() => {
    function onResize() { if (window.innerWidth > 768) setOpen(false); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close mega menu on outside click or Escape
  useEffect(() => {
    if (!megaOpen) return;
    function onClick(e) {
      if (megaRef.current && !megaRef.current.contains(e.target) && !svcTriggerRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') { setMegaOpen(false); svcTriggerRef.current?.focus(); }
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [megaOpen]);

  // Escape closes the drawer and returns focus to the trigger.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      // Simple focus trap: keep Tab / Shift+Tab cycling within the drawer.
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    // Move initial focus into the drawer for keyboard/screen-reader users.
    const firstLink = drawerRef.current?.querySelector('a[href]');
    firstLink?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav aria-label="Primary">
        <a className="logo" href="#">
          <span className="logo-mark" aria-hidden="true">K</span>
          <span className="logo-text">
            <span className="logo-en">Kshetragya Cybersec</span>
            <span className="logo-sub">Ahmedabad, India</span>
          </span>
        </a>
        <ul
          className={`nav-links${open ? ' open' : ''}`}
          id="navLinks"
          ref={drawerRef}
        >
          <li className="nav-svc-item">
            <button
              ref={svcTriggerRef}
              type="button"
              className={`nav-svc-trigger${megaOpen ? ' open' : ''}`}
              aria-expanded={megaOpen}
              aria-haspopup="true"
              onClick={() => { setMegaOpen(o => !o); close(); }}
            >
              Services
            </button>
          </li>
          <li><a href="#process" onClick={close}>Process</a></li>
          <li><a href="#contact" className="nav-cta" onClick={close}>Begin Assessment</a></li>
        </ul>
        <button
          ref={burgerRef}
          className={`nav-burger${open ? ' open' : ''}`}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* SERVICES MEGA MENU */}
      <div className={`mega-scrim${megaOpen ? ' open' : ''}`} onClick={() => setMegaOpen(false)} aria-hidden="true"></div>
      <div className={`mega-menu${megaOpen ? ' open' : ''}`} ref={megaRef} role="dialog" aria-label="Services menu">
        <div className="mega-list">
          {services.map((s, i) => (
            <button
              key={s.n}
              type="button"
              className={`mega-item${activeIdx === i ? ' active' : ''}`}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => setActiveIdx(i)}
            >
              <span>{s.name}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2.5L9.5 7L5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>
        <div className="mega-detail" key={activeIdx}>
          <span className="mega-detail-cat">{services[activeIdx].cat}</span>
          <h3 className="mega-detail-title">{services[activeIdx].name}</h3>
          <p className="mega-detail-desc">{services[activeIdx].desc}</p>
          <div className="mega-detail-tags">
            {services[activeIdx].tags.map(t => <span key={t} className="mega-tag">{t}</span>)}
          </div>
          <a href="#contact" className="mega-detail-cta" onClick={() => setMegaOpen(false)}>Request this assessment →</a>
        </div>
      </div>
      <div
        className={`nav-scrim${open ? ' open' : ''}`}
        onClick={close}
        aria-hidden="true"
      ></div>
    </>
  );
}
