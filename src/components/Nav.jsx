import { useState, useEffect } from 'react';

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onResize() { if (window.innerWidth > 768) setOpen(false); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav>
        <a className="logo" href="#">
          <span className="logo-mark">K</span>
          <span className="logo-text">
            <span className="logo-en">Kshetragya Cybersec</span>
            <span className="logo-sub">LLP · Ahmedabad, India</span>
          </span>
        </a>
        <ul className={`nav-links${open ? ' open' : ''}`} id="navLinks">
          <li><a href="#services" onClick={close}>Services</a></li>
          <li><a href="#process" onClick={close}>Process</a></li>
          <li><a href="#credentials" onClick={close}>Credentials</a></li>
          <li><a href="#contact" className="nav-cta" onClick={close}>Begin Assessment</a></li>
        </ul>
        <button
          className={`nav-burger${open ? ' open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`nav-scrim${open ? ' open' : ''}`} onClick={close}></div>
    </>
  );
}
