import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './index.css';
import App from './App.jsx';
import './sentry.js';
import ErrorBoundary from './ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
    {/* Vercel Analytics: only sends pageview data when deployed on Vercel,
        a no-op elsewhere (e.g. local dev). No cookie banner required. */}
    <Analytics />
  </StrictMode>
);
