import { useState, useEffect, useRef } from 'react';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    function onResize() { if (window.innerWidth > 768) setOpen(false); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
          <li><a href="#services" onClick={close}>Services</a></li>
          <li><a href="#process" onClick={close}>Process</a></li>
          <li><a href="#credentials" onClick={close}>Credentials</a></li>
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
      <div
        className={`nav-scrim${open ? ' open' : ''}`}
        onClick={close}
        aria-hidden="true"
      ></div>
    </>
  );
}
