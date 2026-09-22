import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RichTextEditor from './RichTextEditor.jsx';
import { csrfFetch } from './csrfFetch.js';

const emptyForm = {
  title: '',
  client: '',
  excerpt: '',
  cover: '',
  body: '',
  date: new Date().toISOString().slice(0, 10),
  published: true,
};

export default function AdminPostEditor({ kind }) {
  // kind is 'blog' or 'case'
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const apiBase = kind === 'blog' ? '/api/posts' : '/api/case-studies';
  const listPath = '/admin';
  const draftKey = `draft:${kind}:${id || 'new'}`;
  const coverInputRef = useRef(null);

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [restoredDraft, setRestoredDraft] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverError, setCoverError] = useState('');

  // Load existing content (edit mode), then check for a locally saved
  // draft that is newer than what is on the server; offer to restore it.
  useEffect(() => {
    if (isNew) {
      const saved = readDraft();
      if (saved) {
        setForm(saved);
        setRestoredDraft(true);
      }
      return;
    }
    fetch(`${apiBase}/${id}`)
      .then((r) => r.json())
      .then((data) => {
        const item = data.post || data.caseStudy;
        if (item) {
          const loaded = {
            title: item.title || '',
            client: item.client || '',
            excerpt: item.excerpt || '',
            cover: item.cover || '',
            body: item.body || '',
            date: item.date ? item.date.slice(0, 10) : '',
            published: item.published,
          };
          const saved = readDraft();
          if (saved && JSON.stringify(saved) !== JSON.stringify(loaded)) {
            setForm(saved);
            setRestoredDraft(true);
          } else {
            setForm(loaded);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  function readDraft() {
    try {
      const raw = window.localStorage.getItem(draftKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  // Auto-save to the browser every few seconds so nothing is lost if the
  // tab closes, the laptop sleeps, or the browser crashes mid-edit.
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => {
      try {
        window.localStorage.setItem(draftKey, JSON.stringify(form));
        setLastSavedAt(new Date());
      } catch {
        // storage full or unavailable: safe to ignore, not critical
      }
    }, 1500);
    return () => clearTimeout(t);
  }, [form, loading]);

  function discardDraft() {
    window.localStorage.removeItem(draftKey);
    setRestoredDraft(false);
    setForm(emptyForm);
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function triggerCoverUpload() {
    setCoverError('');
    coverInputRef.current?.click();
  }

  async function handleCoverFileChosen(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setCoverUploading(true);
    setCoverError('');
    try {
      const res = await csrfFetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': file.type, 'x-filename': file.name },
        body: file,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      update('cover', data.url);
    } catch (err) {
      setCoverError(err.message);
    } finally {
      setCoverUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const plainText = form.body.replace(/<[^>]*>/g, '').trim();
    if (!plainText) {
      setError('Content cannot be empty.');
      return;
    }
    setSaving(true);
    try {
      const url = isNew ? apiBase : `${apiBase}/${id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await csrfFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      window.localStorage.removeItem(draftKey);
      navigate(listPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: '2rem', color: '#9aa0aa' }}>Loading…</div>;

  return (
    <div style={styles.wrap}>
      <h1 style={styles.title}>
        {isNew ? 'New' : 'Edit'} {kind === 'blog' ? 'Blog Post' : 'Case Study'}
      </h1>

      {restoredDraft && (
        <div style={styles.notice}>
          Restored your unsaved work from before.{' '}
          <button type="button" onClick={discardDraft} style={styles.discardBtn}>
            Discard and start fresh
          </button>
        </div>
      )}

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Title
          <input
            required
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            style={styles.input}
          />
        </label>

        {kind === 'case' && (
          <label style={styles.label}>
            Client
            <input
              value={form.client}
              onChange={(e) => update('client', e.target.value)}
              style={styles.input}
            />
          </label>
        )}

        <label style={styles.label}>
          Date
          <input
            type="date"
            value={form.date}
            onChange={(e) => update('date', e.target.value)}
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Excerpt (short summary shown in listings)
          <textarea
            value={form.excerpt}
            onChange={(e) => update('excerpt', e.target.value)}
            rows={2}
            style={styles.textarea}
          />
        </label>

        <label style={styles.label}>
          Cover Image
          <input
            ref={coverInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            style={{ display: 'none' }}
            onChange={handleCoverFileChosen}
          />
          <div style={styles.coverRow}>
            <button
              type="button"
              onClick={triggerCoverUpload}
              disabled={coverUploading}
              style={styles.uploadBtn}
            >
              {coverUploading ? 'Uploading…' : form.cover ? 'Replace Image' : 'Upload Image'}
            </button>
            {form.cover && (
              <img src={form.cover} alt="Cover preview" style={styles.coverPreview} />
            )}
          </div>
          {coverError && <div style={styles.inlineError}>{coverError}</div>}
        </label>

        <label style={styles.label}>
          Content
          <RichTextEditor
            value={form.body}
            onChange={(html) => update('body', html)}
          />
        </label>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update('published', e.target.checked)}
          />
          Published (visible on the live site)
        </label>

        <div style={styles.actions}>
          <button type="submit" disabled={saving} style={styles.saveBtn}>
            {saving ? 'Saving…' : isNew ? 'Publish' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate(listPath)}
            style={styles.cancelBtn}
          >
            Cancel
          </button>
          {lastSavedAt && (
            <span style={styles.autosaveNote}>
              Draft auto-saved {lastSavedAt.toLocaleTimeString()}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrap: { maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' },
  title: { color: '#fff', marginBottom: '1.2rem' },
  notice: {
    background: '#1a2b3a',
    color: '#9cc9ff',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    marginBottom: '1rem',
  },
  discardBtn: {
    background: 'transparent',
    border: 'none',
    color: '#9cc9ff',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '0.85rem',
    padding: 0,
  },
  error: {
    background: '#3a1414',
    color: '#ff9b9b',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    marginBottom: '1rem',
  },
  inlineError: {
    color: '#ff9b9b',
    fontSize: '0.8rem',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
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
  textarea: {
    padding: '0.6rem 0.7rem',
    borderRadius: '8px',
    border: '1px solid #333742',
    background: '#0b0c0f',
    color: '#fff',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  coverRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  uploadBtn: {
    background: '#1c1f26',
    border: '1px solid #3a3f4a',
    color: '#e5e7eb',
    borderRadius: '6px',
    padding: '0.6rem 1rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  coverPreview: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #333742',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#c7cad1',
    fontSize: '0.9rem',
  },
  actions: { display: 'flex', gap: '0.7rem', marginTop: '0.5rem', alignItems: 'center', flexWrap: 'wrap' },
  saveBtn: {
    background: '#3562d6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.65rem 1.3rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  cancelBtn: {
    background: 'transparent',
    border: '1px solid #333742',
    color: '#c7cad1',
    borderRadius: '8px',
    padding: '0.65rem 1.3rem',
    cursor: 'pointer',
  },
  autosaveNote: {
    color: '#6b7280',
    fontSize: '0.78rem',
    marginLeft: 'auto',
  },
};
