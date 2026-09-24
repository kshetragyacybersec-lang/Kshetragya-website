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
    padding: '8px 16px',
    borderRadius: 6,
    border: '1px solid #4b5563',
    background: 'transparent',
    color: '#f3f4f6',
    font: 'inherit',
    fontSize: 14,
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
        maxWidth: 560,
        margin: '0 auto',
        padding: '14px 16px',
        background: '#111827',
        color: '#f3f4f6',
        border: '1px solid #374151',
        borderRadius: 10,
        boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
        fontSize: 14,
        lineHeight: 1.5,
      }}
    >
      <p style={{ margin: '0 0 10px' }}>
        We use Google Analytics cookies to understand how the site is used. They are only set if
        you accept.{' '}
        <Link to="/privacy-policy" style={{ color: '#93c5fd' }}>
          Privacy Policy
        </Link>
      </p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button type="button" style={btn} onClick={() => decide('declined')}>
          Decline
        </button>
        <button
          type="button"
          style={{ ...btn, background: '#2563eb', borderColor: '#2563eb' }}
          onClick={() => decide('accepted')}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
