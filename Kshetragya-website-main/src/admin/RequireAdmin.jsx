import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext.jsx';

export default function RequireAdmin({ children }) {
  const { user } = useAdminAuth();

  if (user === undefined) {
    return <div style={{ padding: '3rem', color: '#9aa0aa' }}>Loading…</div>;
  }
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
