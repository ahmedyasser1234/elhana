import apiClient from './client';
import { EXPERIENCES, CATEGORIES } from '../../data/experiences';

export const experiencesApi = {
  // GET /api/trips
  getAll: async (filters = {}) => {
    try {
      const res = await apiClient.get('/trips', { params: filters });
      if (res.data && res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        return { success: true, data: res.data.data, count: res.data.data.length };
      }
    } catch {
      // Backend offline or running purely static -> fallback to seed data
    }

    // Graceful fallback to local seed data
    let list = [...EXPERIENCES];
    if (filters.category && filters.category !== 'all') {
      if (filters.category === 'safari') {
        list = list.filter(item => ['safari', 'atv', 'buggy', 'bedouin', 'camel', 'horse'].includes(item.category));
      } else if (filters.category === 'sea') {
        list = list.filter(item => ['sea', 'yacht', 'snorkeling', 'diving', 'parasailing', 'banana'].includes(item.category));
      } else {
        list = list.filter(item => item.category === filters.category);
      }
    }
    return { success: true, data: list, count: list.length };
  },

  // GET /api/trips?slug=...
  getBySlug: async (slug) => {
    try {
      const res = await apiClient.get('/trips', { params: { slug } });
      if (res.data && res.data.success && res.data.data) {
        return { success: true, data: res.data.data };
      }
    } catch {
      // Fallback
    }

    const found = EXPERIENCES.find(e => e.slug === slug || e.id === slug) || EXPERIENCES[0];
    return { success: true, data: found };
  },

  // PUT /api/admin/trips (Authenticated Admin only)
  updateTrip: async (slugOrId, updates) => {
    const res = await apiClient.put('/admin/trips', { slugOrId, updates });
    return res.data;
  },

  // POST /api/admin/upload (Authenticated Admin only)
  uploadImage: async (filename, base64, contentType = 'image/jpeg') => {
    const res = await apiClient.post('/admin/upload', { filename, base64, contentType });
    return res.data;
  },

  // GET /api/categories
  getCategories: async () => {
    return { success: true, data: CATEGORIES };
  }
};
