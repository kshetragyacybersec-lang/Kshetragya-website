import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext.jsx';

export default function AdminDashboard() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('blog');
  const [posts, setPosts] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const [postsRes, csRes] = await Promise.all([
      fetch('/api/posts?all=1').then((r) => r.json()),
      fetch('/api/case-studies?all=1').then((r) => r.json()),
    ]);
    setPosts(postsRes.posts || []);
    setCaseStudies(csRes.caseStudies || []);
    setLoading(false);
  }

  async function handleDelete(kind, id) {
    if (!confirm('Delete this permanently?')) return;
    const url = kind === 'blog' ? `/api/posts/${id}` : `/api/case-studies/${id}`;
    await fetch(url, { method: 'DELETE' });
    load();
  }

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  const items = tab === 'blog' ? posts : caseStudies;

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Content Admin</h1>
          <p style={styles.subtitle}>Signed in as {user?.name} ({user?.email})</p>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Log out
        </button>
      </div>

      <div style={styles.tabs}>
        <button
          onClick={() => setTab('blog')}
          style={tab === 'blog' ? styles.tabActive : styles.tab}
        >
          Blog Posts ({posts.length})
        </button>
        <button
          onClick={() => setTab('case')}
          style={tab === 'case' ? styles.tabActive : styles.tab}
        >
          Case Studies ({caseStudies.length})
        </button>
        <Link
          to={tab === 'blog' ? '/admin/blog/new' : '/admin/case-studies/new'}
          style={styles.newBtn}
        >
          + New {tab === 'blog' ? 'Blog Post' : 'Case Study'}
        </Link>
      </div>

      {loading ? (
        <p style={{ color: '#9aa0aa' }}>Loading…</p>
      ) : items.length === 0 ? (
        <p style={{ color: '#9aa0aa' }}>Nothing here yet.</p>
      ) : (
        <div style={styles.list}>
          {items.map((item) => (
            <div key={item.id} style={styles.row}>
              <div>
                <div style={styles.rowTitle}>
                  {item.title}{' '}
                  {!item.published && <span style={styles.draftTag}>Draft</span>}
                </div>
                <div style={styles.rowMeta}>
                  {item.date} · by {item.author_name || 'Unknown'}
                </div>
              </div>
              <div style={styles.rowActions}>
                <Link
                  to={
                    tab === 'blog'
                      ? `/admin/blog/${item.id}`
                      : `/admin/case-studies/${item.id}`
                  }
                  style={styles.editLink}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(tab, item.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
  },
  title: { margin: 0, color: '#fff', fontSize: '1.5rem' },
  subtitle: { margin: '0.2rem 0 0', color: '#9aa0aa', fontSize: '0.85rem' },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #333742',
    color: '#c7cad1',
    borderRadius: '8px',
    padding: '0.5rem 0.9rem',
    cursor: 'pointer',
  },
  tabs: { display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
  tab: {
    background: 'transparent',
    border: '1px solid #333742',
    color: '#c7cad1',
    borderRadius: '8px',
    padding: '0.5rem 0.9rem',
    cursor: 'pointer',
  },
  tabActive: {
    background: '#5b8cff',
    border: '1px solid #5b8cff',
    color: '#fff',
    borderRadius: '8px',
    padding: '0.5rem 0.9rem',
    cursor: 'pointer',
  },
  newBtn: {
    marginLeft: 'auto',
    background: '#1f7a4d',
    color: '#fff',
    borderRadius: '8px',
    padding: '0.5rem 0.9rem',
    textDecoration: 'none',
    fontWeight: 600,
  },
  list: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#111318',
    border: '1px solid #2a2d35',
    borderRadius: '10px',
    padding: '0.9rem 1.1rem',
  },
  rowTitle: { color: '#fff', fontWeight: 600 },
  rowMeta: { color: '#8a8f99', fontSize: '0.8rem', marginTop: '0.2rem' },
  draftTag: {
    fontSize: '0.7rem',
    background: '#3a2f14',
    color: '#e0b25a',
    padding: '0.1rem 0.5rem',
    borderRadius: '5px',
    marginLeft: '0.5rem',
  },
  rowActions: { display: 'flex', gap: '0.5rem' },
  editLink: {
    color: '#5b8cff',
    textDecoration: 'none',
    padding: '0.4rem 0.7rem',
  },
  deleteBtn: {
    background: 'transparent',
    border: '1px solid #4a2626',
    color: '#ff9b9b',
    borderRadius: '6px',
    padding: '0.4rem 0.7rem',
    cursor: 'pointer',
  },
};
