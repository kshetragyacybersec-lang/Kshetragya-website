import { Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './AdminAuthContext.jsx';
import RequireAdmin from './RequireAdmin.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import AdminPostEditor from './AdminPostEditor.jsx';
import { usePageMeta } from '../usePageMeta.js';
import { ADMIN_META } from '../pageMeta.js';

export default function AdminApp() {
  usePageMeta(ADMIN_META);
  return (
    <AdminAuthProvider>
      <main style={{ minHeight: '100vh', background: '#0b0c0f' }}>
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          <Route
            index
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
          <Route
            path="blog/new"
            element={
              <RequireAdmin>
                <AdminPostEditor kind="blog" />
              </RequireAdmin>
            }
          />
          <Route
            path="blog/:id"
            element={
              <RequireAdmin>
                <AdminPostEditor kind="blog" />
              </RequireAdmin>
            }
          />
          <Route
            path="case-studies/new"
            element={
              <RequireAdmin>
                <AdminPostEditor kind="case" />
              </RequireAdmin>
            }
          />
          <Route
            path="case-studies/:id"
            element={
              <RequireAdmin>
                <AdminPostEditor kind="case" />
              </RequireAdmin>
            }
          />
        </Routes>
      </main>
    </AdminAuthProvider>
  );
}
