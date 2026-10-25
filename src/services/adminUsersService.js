// Admin & Moderators Management Service (Client-Side, No Backend Required)

const ADMIN_USERS_STORAGE_KEY = 'elhana_admin_users';
const CURRENT_ADMIN_USER_KEY = 'elhana_current_admin';

export const PRIMARY_ADMIN = {
  id: 'admin-primary',
  name: 'أحمد ياسر (المدير الرئيسي)',
  email: 'ahmedyasser697@gmail.com',
  password: 'Ahmed123@@Ahmed',
  role: 'superadmin',
  roleLabel: 'المدير العام',
  createdAt: '2026-10-25',
  isPrimary: true
};

export const getAdminUsers = () => {
  try {
    const stored = localStorage.getItem(ADMIN_USERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify([PRIMARY_ADMIN]));
      return [PRIMARY_ADMIN];
    }
    const list = JSON.parse(stored);
    // Ensure primary admin always exists
    if (!list.find(u => u.email.toLowerCase() === PRIMARY_ADMIN.email.toLowerCase())) {
      const merged = [PRIMARY_ADMIN, ...list];
      localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
    return list;
  } catch (err) {
    console.error('Failed to load admin users:', err);
    return [PRIMARY_ADMIN];
  }
};

export const saveAdminUser = (userData) => {
  try {
    const users = getAdminUsers();
    let updated;
    if (userData.id) {
      updated = users.map(u => (u.id === userData.id ? { ...u, ...userData } : u));
    } else {
      const newUser = {
        id: `mod-${Date.now()}`,
        name: userData.name || 'مشرف جديد',
        email: userData.email.trim().toLowerCase(),
        password: userData.password.trim(),
        role: userData.role || 'moderator',
        roleLabel: userData.role === 'superadmin' ? 'مدير عام' : 'مشرف',
        createdAt: new Date().toISOString().split('T')[0],
        isPrimary: false
      };
      updated = [...users, newUser];
    }
    localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('elhana_admins_updated'));
    return updated;
  } catch (err) {
    console.error('Failed to save admin user:', err);
    return null;
  }
};

export const deleteAdminUser = (userId) => {
  try {
    const users = getAdminUsers();
    // Prevent deleting primary admin
    const updated = users.filter(u => u.id !== userId && !u.isPrimary && u.email.toLowerCase() !== PRIMARY_ADMIN.email.toLowerCase());
    localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('elhana_admins_updated'));
    return updated;
  } catch (err) {
    console.error('Failed to delete admin user:', err);
    return [];
  }
};

export const verifyAdminCredentials = (identifier, password) => {
  const cleanId = (identifier || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  // 1. Check Primary Admin directly
  if (
    (cleanId === PRIMARY_ADMIN.email.toLowerCase() || cleanId === 'ahmed' || cleanId === 'admin' || cleanId === '') &&
    cleanPass === PRIMARY_ADMIN.password
  ) {
    return { success: true, user: PRIMARY_ADMIN };
  }

  // 2. Check registered admin & moderator users
  const users = getAdminUsers();
  const matchedUser = users.find(u => {
    const emailMatches = u.email.toLowerCase() === cleanId || cleanId === '';
    const passMatches = u.password === cleanPass;
    return emailMatches && passMatches;
  });

  if (matchedUser) {
    return { success: true, user: matchedUser };
  }

  // 3. Fallback master emergency passwords (for convenience)
  if (
    cleanPass === PRIMARY_ADMIN.password ||
    cleanPass === 'elhana2026' ||
    cleanPass === 'admin123' ||
    cleanPass === (localStorage.getItem('elhana_admin_password') || '')
  ) {
    return { success: true, user: PRIMARY_ADMIN };
  }

  return { success: false, user: null };
};

export const updateAdminPassword = (email, newPassword) => {
  try {
    const users = getAdminUsers();
    const targetEmail = (email || PRIMARY_ADMIN.email).toLowerCase();
    const updated = users.map(u => {
      if (u.email.toLowerCase() === targetEmail || (u.isPrimary && targetEmail === PRIMARY_ADMIN.email.toLowerCase())) {
        return { ...u, password: newPassword };
      }
      return u;
    });
    localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem('elhana_admin_password', newPassword);
    
    // Also update current admin if it matches
    const current = getCurrentAdminUser();
    if (current && (current.email.toLowerCase() === targetEmail || current.isPrimary)) {
      setCurrentAdminUser({ ...current, password: newPassword }, true);
    }

    window.dispatchEvent(new CustomEvent('elhana_admins_updated'));
    return true;
  } catch (err) {
    console.error('Failed to update admin password:', err);
    return false;
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
  const json = JSON.stringify(user);
  sessionStorage.setItem(CURRENT_ADMIN_USER_KEY, json);
  if (persistent) {
    localStorage.setItem(CURRENT_ADMIN_USER_KEY, json);
  }
};
