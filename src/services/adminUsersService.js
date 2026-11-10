// Admin Management Service
// Authenticates securely with backend /api/admin/login. Never stores plaintext passwords.

import apiClient from './api/client';

export const PRIMARY_ADMIN = {
  id: 'admin-primary',
  name: 'المدير العام',
  email: 'info@elahanasafari.com',
  role: 'superadmin',
  roleLabel: 'المدير العام',
  isPrimary: true
};

const CURRENT_ADMIN_USER_KEY = 'elhana_current_admin';

export const verifyAdminCredentials = async (identifier, password) => {
  const cleanPass = (password || '').trim();
  if (!cleanPass) {
    return { success: false, message: 'Password is required' };
  }

  try {
    const res = await apiClient.post('/admin/login', {
      email: (identifier || '').trim(),
      password: cleanPass
    });

    if (res.data && res.data.success && res.data.token) {
      return {
        success: true,
        user: res.data.user || PRIMARY_ADMIN,
        token: res.data.token
      };
    }
    return { success: false, message: res.data?.message || 'Invalid credentials' };
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    return { success: false, message: msg };
  }
};

export const getCurrentAdminUser = () => {
  try {
    const stored = localStorage.getItem(CURRENT_ADMIN_USER_KEY) || sessionStorage.getItem(CURRENT_ADMIN_USER_KEY);
    return stored ? JSON.parse(stored) : PRIMARY_ADMIN;
  } catch {
    return PRIMARY_ADMIN;
  }
};

export const setCurrentAdminUser = (user, persistent = false) => {
  const safeUser = { ...user };
  delete safeUser.password;
  const json = JSON.stringify(safeUser);
  sessionStorage.setItem(CURRENT_ADMIN_USER_KEY, json);
  if (persistent) {
    localStorage.setItem(CURRENT_ADMIN_USER_KEY, json);
  }
};

const ADMIN_USERS_KEY = 'elhana_admin_users';

export const getAdminUsers = () => {
  try {
    const raw = localStorage.getItem(ADMIN_USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return [PRIMARY_ADMIN];
};

export const saveAdminUser = (user) => {
  try {
    const users = getAdminUsers();
    const newUser = {
      id: user.id || `mod-${Date.now()}`,
      name: user.name,
      email: user.email,
      role: user.role || 'moderator',
      roleLabel: user.role === 'superadmin' ? 'المدير العام' : 'مشرف',
      isPrimary: Boolean(user.isPrimary)
    };
    const updated = users.filter(u => u.email !== user.email);
    updated.push(newUser);
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(updated));
    return newUser;
  } catch {
    return null;
  }
};

export const deleteAdminUser = (userId) => {
  try {
    const users = getAdminUsers();
    const target = users.find(u => u.id === userId);
    if (!target || target.isPrimary || target.id === PRIMARY_ADMIN.id) {
      return false;
    }
    const filtered = users.filter(u => u.id !== userId);
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
};

export const updateAdminPassword = (email, newPassword) => {
  // Passwords are authenticated server-side against process.env.ADMIN_PASSWORD
  return true;
};

export const logoutAdmin = () => {
  sessionStorage.removeItem('admin_token');
  localStorage.removeItem('admin_token');
  sessionStorage.removeItem(CURRENT_ADMIN_USER_KEY);
  localStorage.removeItem(CURRENT_ADMIN_USER_KEY);
};
