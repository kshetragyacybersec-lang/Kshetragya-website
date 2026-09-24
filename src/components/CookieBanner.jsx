import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const KEY = 'ksc-cookie-consent';
const GA_ID = 'G-4E59DZT5W0';

function readChoice() {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function saveChoice(value) {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage may be blocked; the banner simply reappears next visit */
  }
}

// Loads GA4 only after the visitor has accepted analytics cookies.
function loadAnalytics() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(tag);
  const init = document.createElement('script');
  init.src = '/ga-init.js';
  document.head.appendChild(init);
}

export default function CookieBanner() {
  const [choice, setChoice] = useState('pending');

  useEffect(() => {
    const saved = readChoice();
    setChoice(saved);
    if (saved === 'accepted') loadAnalytics();
  }, []);

  if (choice === 'pending' || choice === 'accepted' || choice === 'declined') return null;

  const decide = (value) => {
    saveChoice(value);
    setChoice(value);
    if (value === 'accepted') loadAnalytics();
  };

  const btn = {
    padding: '9px 18px',
    borderRadius: 'var(--radius-btn, 3px)',
    border: '1px solid rgba(248, 245, 240, 0.35)',
    background: 'transparent',
    color: '#f8f5f0',
    fontFamily: 'var(--f-h, Inter, system-ui, sans-serif)',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 1000,
        maxWidth: 520,
        margin: '0 auto',
        padding: '16px 18px',
        background: 'var(--navy, #171412)',
        color: '#f8f5f0',
        border: '1px solid #3a322b',
        borderTop: '2px solid var(--blue, #e5432a)',
        borderRadius: 'var(--radius-card, 2px)',
        boxShadow: '0 20px 50px -16px rgba(23, 20, 18, 0.55)',
        fontFamily: 'var(--f-i, Inter, system-ui, sans-serif)',
        fontSize: 14,
        lineHeight: 1.55,
      }}
    >
      <p style={{ margin: '0 0 10px' }}>
        We use Google Analytics cookies to understand how the site is used. They are only set if
        you accept.{' '}
        <Link to="/privacy-policy" style={{ color: 'var(--cyan, #ff8b6b)' }}>
          Privacy Policy
        </Link>
      </p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button type="button" style={btn} onClick={() => decide('declined')}>
          Decline
        </button>
        <button
          type="button"
          style={{ ...btn, background: 'var(--blue-fill, #d23a20)', borderColor: 'var(--blue-fill, #d23a20)', color: '#fff' }}
          onClick={() => decide('accepted')}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
