import { Component } from 'react';
import * as Sentry from '@sentry/react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Sends to Sentry only if VITE_SENTRY_DSN was configured in sentry.js;
    // otherwise this is a harmless no-op and the error is still logged below.
    Sentry.captureException(error, { extra: info });
    console.error('Uncaught error in the app:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '0.75rem' }}>Something went wrong.</h1>
          <p style={{ marginBottom: '1.5rem' }}>
            Please refresh the page. If the problem continues, email{' '}
            <a href="mailto:info@kshetragyacybersec.com">info@kshetragyacybersec.com</a>.
          </p>
          <a href="/">Back to home</a>
        </div>
      );
    }
    return this.props.children;
  }
}
