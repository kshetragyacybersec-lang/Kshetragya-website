import { useEffect, useRef, useState } from 'react';

// A simple, no-dependency rich text editor that feels like Word/Google Docs
// for non-technical editors: click a button, it formats the selected text.
// Output is plain HTML, stored directly in the post's body field.
export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const isInternalChange = useRef(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  function handleInput() {
    isInternalChange.current = true;
    onChange(editorRef.current.innerHTML);
  }

  function exec(command, arg = null) {
    editorRef.current.focus();
    document.execCommand(command, false, arg);
    handleInput();
  }

  function insertLink() {
    const url = window.prompt('Paste the link URL:');
    if (url) exec('createLink', url);
  }

  function triggerImageUpload() {
    setUploadError('');
    fileInputRef.current?.click();
  }

  async function handleFileChosen(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setUploading(true);
    setUploadError('');
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': file.type,
          'x-filename': file.name,
        },
        body: file,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      exec('insertImage', data.url);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  }

  const groups = [
    [
      { label: 'Bold', title: 'Bold', action: () => exec('bold'), style: { fontWeight: 800 } },
      { label: 'Italic', title: 'Italic', action: () => exec('italic'), style: { fontStyle: 'italic' } },
      { label: 'Underline', title: 'Underline', action: () => exec('underline'), style: { textDecoration: 'underline' } },
    ],
    [
      { label: 'Heading', title: 'Big heading', action: () => exec('formatBlock', '<h2>') },
      { label: 'Subheading', title: 'Smaller heading', action: () => exec('formatBlock', '<h3>') },
      { label: 'Normal Text', title: 'Normal paragraph', action: () => exec('formatBlock', '<p>') },
    ],
    [
      { label: '• Bullet List', title: 'Bullet list', action: () => exec('insertUnorderedList') },
      { label: '1. Numbered List', title: 'Numbered list', action: () => exec('insertOrderedList') },
      { label: '" Quote', title: 'Quote block', action: () => exec('formatBlock', '<blockquote>') },
    ],
    [
      { label: '🔗 Link', title: 'Insert link', action: insertLink },
      { label: uploading ? 'Uploading…' : '🖼 Upload Image', title: 'Upload an image from your computer', action: triggerImageUpload, disabled: uploading },
    ],
    [
      { label: 'Clear Formatting', title: 'Remove all formatting from selection', action: () => exec('removeFormat') },
      { label: '↶ Undo', title: 'Undo', action: () => exec('undo') },
      { label: '↷ Redo', title: 'Redo', action: () => exec('redo') },
    ],
  ];

  return (
    <div style={styles.wrap}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: 'none' }}
        onChange={handleFileChosen}
      />
      <div style={styles.toolbar}>
        {groups.map((group, gi) => (
          <div key={gi} style={styles.group}>
            {group.map((btn) => (
              <button
                key={btn.title}
                type="button"
                title={btn.title}
                disabled={btn.disabled}
                onMouseDown={(e) => e.preventDefault()}
                onClick={btn.action}
                style={{
                  ...styles.btn,
                  ...(btn.style || {}),
                  ...(btn.disabled ? styles.btnDisabled : {}),
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      {uploadError && <div style={styles.uploadError}>{uploadError}</div>}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={styles.editor}
        suppressContentEditableWarning
      />
    </div>
  );
}

const styles = {
  wrap: {
    border: '1px solid #333742',
    borderRadius: '8px',
    overflow: 'hidden',
    background: '#0b0c0f',
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.6rem',
    padding: '0.7rem',
    borderBottom: '1px solid #333742',
    background: '#15171c',
  },
  group: {
    display: 'flex',
    gap: '0.4rem',
    paddingRight: '0.6rem',
    borderRight: '1px solid #2a2d35',
  },
  btn: {
    background: '#1c1f26',
    border: '1px solid #3a3f4a',
    color: '#e5e7eb',
    borderRadius: '6px',
    padding: '0.5rem 0.8rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  btnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  uploadError: {
    background: '#3a1414',
    color: '#ff9b9b',
    padding: '0.5rem 0.8rem',
    fontSize: '0.85rem',
  },
  editor: {
    minHeight: '320px',
    padding: '0.9rem 1rem',
    color: '#fff',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    outline: 'none',
  },
};
