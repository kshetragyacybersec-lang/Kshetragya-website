import { createContext, useContext, useEffect, useState } from 'react';
import { csrfFetch } from './csrfFetch.js';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still checking

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  async function login(email, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    await csrfFetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    clearAllDrafts();
  }

  // Post/case-study drafts are auto-saved to localStorage as `draft:<kind>:<id>`
  // (see AdminPostEditor.jsx) so nothing is lost if the tab closes mid-edit.
  // On logout, wipe all of them so unpublished or sensitive draft content
  // doesn't linger in the browser's storage on a shared or public device.
  function clearAllDrafts() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith('draft:')) keysToRemove.push(key);
      }
      keysToRemove.forEach((key) => window.localStorage.removeItem(key));
    } catch {
      // storage unavailable — safe to ignore, not critical
    }
  }

  return (
    <AdminAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
