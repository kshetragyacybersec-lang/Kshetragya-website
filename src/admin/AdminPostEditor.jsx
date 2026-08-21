import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminPostEditor({ kind }) {
  // kind is 'blog' or 'case'
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const apiBase = kind === 'blog' ? '/api/posts' : '/api/case-studies';
  const listPath = '/admin';

  const [form, setForm] = useState({
    title: '',
    client: '',
    excerpt: '',
    cover: '',
    body: '',
    date: new Date().toISOString().slice(0, 10),
    published: true,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;
    fetch(`${apiBase}/${id}`)
      .then((r) => r.json())
      .then((data) => {
        const item = data.post || data.caseStudy;
        if (item) {
          setForm({
            title: item.title || '',
            client: item.client || '',
            excerpt: item.excerpt || '',
            cover: item.cover || '',
            body: item.body || '',
            date: item.date ? item.date.slice(0, 10) : '',
            published: item.published,
          });
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const url = isNew ? apiBase : `${apiBase}/${id}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
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
          Cover Image URL (optional)
          <input
            value={form.cover}
            onChange={(e) => update('cover', e.target.value)}
            placeholder="https://…"
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Content (Markdown supported — e.g. ## Heading, **bold**)
          <textarea
            required
            value={form.body}
            onChange={(e) => update('body', e.target.value)}
            rows={14}
            style={styles.textareaLarge}
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
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrap: { maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' },
  title: { color: '#fff', marginBottom: '1.2rem' },
  error: {
    background: '#3a1414',
    color: '#ff9b9b',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    marginBottom: '1rem',
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
  textareaLarge: {
    padding: '0.7rem 0.8rem',
    borderRadius: '8px',
    border: '1px solid #333742',
    background: '#0b0c0f',
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: 'ui-monospace, monospace',
    resize: 'vertical',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#c7cad1',
    fontSize: '0.9rem',
  },
  actions: { display: 'flex', gap: '0.7rem', marginTop: '0.5rem' },
  saveBtn: {
    background: '#5b8cff',
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
};
