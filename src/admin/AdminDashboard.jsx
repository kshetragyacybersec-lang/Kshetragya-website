import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext.jsx';
import { csrfFetch } from './csrfFetch.js';

const PAGE_SIZE = 8;

export default function AdminDashboard() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('blog');
  const [posts, setPosts] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null); // { kind, id, title }
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    load();
  }, []);

  // Reset to page 1 whenever the tab or search term changes
  useEffect(() => {
    setPage(1);
  }, [tab, search]);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const [postsRes, csRes] = await Promise.all([
        fetch('/api/posts?all=1'),
        fetch('/api/case-studies?all=1'),
      ]);

      if (!postsRes.ok || !csRes.ok) {
        throw new Error('Server returned an error while loading content.');
      }

      const [postsData, csData] = await Promise.all([postsRes.json(), csRes.json()]);
      setPosts(postsData.posts || []);
      setCaseStudies(csData.caseStudies || []);
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? "Couldn't reach the server. Check your connection and try again."
          : err.message || 'Something went wrong while loading content.'
      );
    } finally {
      setLoading(false);
    }
  }

  function requestDelete(kind, item) {
    setPendingDelete({ kind, id: item.id, title: item.title });
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    setError('');
    try {
      const { kind, id } = pendingDelete;
      const url = kind === 'blog' ? `/api/posts/${id}` : `/api/case-studies/${id}`;
      const res = await csrfFetch(url, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed. Please try again.');
      await load();
    } catch (err) {
      setError(err.message || 'Delete failed. Please try again.');
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  }

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  const allItems = tab === 'blog' ? posts : caseStudies;

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.author_name?.toLowerCase().includes(q)
    );
  }, [allItems, search]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

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

      {error && (
        <div style={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={load} style={styles.retryBtn}>
            Retry
          </button>
        </div>
      )}

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

      <input
        type="text"
        placeholder="Search by title or author…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {loading ? (
        <div style={styles.list}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={styles.skeletonRow} />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <p style={{ color: '#9aa0aa' }}>
          {search ? 'No items match your search.' : 'Nothing here yet.'}
        </p>
      ) : (
        <>
          <div style={styles.list}>
            {pageItems.map((item) => (
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
                    onClick={() => requestDelete(tab, item)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={currentPage === 1 ? styles.pageBtnDisabled : styles.pageBtn}
              >
                ← Prev
              </button>
              <span style={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={currentPage === totalPages ? styles.pageBtnDisabled : styles.pageBtn}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {pendingDelete && (
        <div style={styles.modalOverlay} onClick={() => !deleting && setPendingDelete(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Delete this permanently?</h2>
            <p style={styles.modalBody}>
              "{pendingDelete.title}" will be permanently removed. This can't be undone.
            </p>
            <div style={styles.modalActions}>
              <button
                onClick={() => setPendingDelete(null)}
                disabled={deleting}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                style={styles.confirmDeleteBtn}
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
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
  errorBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#3a1414',
    color: '#ff9b9b',
    padding: '0.7rem 1rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    marginBottom: '1.2rem',
    gap: '1rem',
  },
  retryBtn: {
    background: 'transparent',
    border: '1px solid #ff9b9b',
    color: '#ff9b9b',
    borderRadius: '6px',
    padding: '0.3rem 0.7rem',
    cursor: 'pointer',
    flexShrink: 0,
  },
  tabs: { display: 'flex', gap: '0.6rem', marginBottom: '1.2rem', flexWrap: 'wrap' },
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
  search: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    border: '1px solid #333742',
    background: '#111318',
    color: '#fff',
    fontSize: '0.9rem',
    marginBottom: '1.2rem',
  },
  list: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  skeletonRow: {
    height: '58px',
    borderRadius: '10px',
    background:
      'linear-gradient(90deg, #111318 25%, #171a20 37%, #111318 63%)',
    backgroundSize: '400% 100%',
    animation: 'admin-skeleton-pulse 1.4s ease infinite',
    border: '1px solid #2a2d35',
  },
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
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '1.2rem',
  },
  pageBtn: {
    background: 'transparent',
    border: '1px solid #333742',
    color: '#c7cad1',
    borderRadius: '8px',
    padding: '0.4rem 0.8rem',
    cursor: 'pointer',
  },
  pageBtnDisabled: {
    background: 'transparent',
    border: '1px solid #24262c',
    color: '#4a4d55',
    borderRadius: '8px',
    padding: '0.4rem 0.8rem',
    cursor: 'not-allowed',
  },
  pageInfo: { color: '#9aa0aa', fontSize: '0.85rem' },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    width: '100%',
    maxWidth: '380px',
    background: '#15171d',
    border: '1px solid #2a2d35',
    borderRadius: '12px',
    padding: '1.5rem',
  },
  modalTitle: { margin: '0 0 0.6rem', color: '#fff', fontSize: '1.1rem' },
  modalBody: { margin: '0 0 1.2rem', color: '#9aa0aa', fontSize: '0.88rem', lineHeight: 1.5 },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' },
  cancelBtn: {
    background: 'transparent',
    border: '1px solid #333742',
    color: '#c7cad1',
    borderRadius: '8px',
    padding: '0.5rem 0.9rem',
    cursor: 'pointer',
  },
  confirmDeleteBtn: {
    background: '#7a2020',
    border: '1px solid #7a2020',
    color: '#fff',
    borderRadius: '8px',
    padding: '0.5rem 0.9rem',
    cursor: 'pointer',
    fontWeight: 600,
  },
};
