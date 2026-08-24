import { useEffect, useRef } from 'react';

// A simple, no-dependency rich text editor that feels like Word/Google Docs
// for non-technical editors: click a button, it formats the selected text.
// Output is plain HTML, stored directly in the post's body field.
export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const isInternalChange = useRef(false);

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

  function insertImage() {
    const url = window.prompt('Paste the image URL (must end in .jpg, .png, etc.):');
    if (url) exec('insertImage', url);
  }

  const buttons = [
    { label: 'B', title: 'Bold', action: () => exec('bold'), style: { fontWeight: 700 } },
    { label: 'I', title: 'Italic', action: () => exec('italic'), style: { fontStyle: 'italic' } },
    { label: 'U', title: 'Underline', action: () => exec('underline'), style: { textDecoration: 'underline' } },
    { label: 'H2', title: 'Heading', action: () => exec('formatBlock', '<h2>') },
    { label: 'H3', title: 'Subheading', action: () => exec('formatBlock', '<h3>') },
    { label: '¶', title: 'Normal paragraph', action: () => exec('formatBlock', '<p>') },
    { label: '• List', title: 'Bullet list', action: () => exec('insertUnorderedList') },
    { label: '1. List', title: 'Numbered list', action: () => exec('insertOrderedList') },
    { label: '" "', title: 'Quote', action: () => exec('formatBlock', '<blockquote>') },
    { label: 'Link', title: 'Insert link', action: insertLink },
    { label: 'Image', title: 'Insert image by URL', action: insertImage },
    { label: 'Clear', title: 'Clear formatting', action: () => exec('removeFormat') },
    { label: 'Undo', title: 'Undo', action: () => exec('undo') },
    { label: 'Redo', title: 'Redo', action: () => exec('redo') },
  ];

  return (
    <div style={styles.wrap}>
      <div style={styles.toolbar}>
        {buttons.map((btn) => (
          <button
            key={btn.title}
            type="button"
            title={btn.title}
            onMouseDown={(e) => e.preventDefault()} // keep text selection intact
            onClick={btn.action}
            style={{ ...styles.btn, ...(btn.style || {}) }}
          >
            {btn.label}
          </button>
        ))}
      </div>
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
    gap: '0.3rem',
    padding: '0.5rem',
    borderBottom: '1px solid #333742',
    background: '#15171c',
  },
  btn: {
    background: '#1c1f26',
    border: '1px solid #333742',
    color: '#e5e7eb',
    borderRadius: '5px',
    padding: '0.3rem 0.6rem',
    fontSize: '0.8rem',
    cursor: 'pointer',
    minWidth: '2rem',
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
