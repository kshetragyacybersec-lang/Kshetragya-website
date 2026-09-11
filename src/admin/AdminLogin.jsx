import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext.jsx';

export default function AdminLogin() {
  const { user, login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrap}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Content Admin</h1>
        <p style={styles.subtitle}>Kshetragya Cybersec</p>

        {error && <div style={styles.error}>{error}</div>}

        <label style={styles.label}>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            autoFocus
          />
        </label>

        <label style={styles.label}>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </label>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrap: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    width: '100%',
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
    background: '#111318',
    border: '1px solid #2a2d35',
    borderRadius: '12px',
    padding: '2rem',
  },
  title: { margin: 0, fontSize: '1.4rem', color: '#fff' },
  subtitle: { margin: '0 0 0.5rem', color: '#9aa0aa', fontSize: '0.9rem' },
  error: {
    background: '#3a1414',
    color: '#ff9b9b',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    fontSize: '0.85rem',
    color: '#c7cad1',
  },
  input: {
    padding: '0.6rem 0.7rem',
    borderRadius: '8px',
    border: '1px solid #333742',
    background: '#0b0c0f',
    color: '#fff',
    fontSize: '0.95rem',
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.65rem',
    borderRadius: '8px',
    border: 'none',
    background: '#5b8cff',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
