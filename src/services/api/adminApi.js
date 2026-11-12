import apiClient from './client';

export const adminApi = {
  async login(password) {
    const { data } = await apiClient.post('/admin/login', { password });
    sessionStorage.setItem('admin_token', data.token);
    return data;
  },
  async listBookings() { 
    const res = await apiClient.get('/admin/bookings'); 
    return res.data?.data || [];
  },
  async deleteBooking(id) {
    const res = await apiClient.delete(`/admin/bookings?id=${encodeURIComponent(id)}`);
    return res.data;
  },
  async updateBookingStatus(id, status) {
    const res = await apiClient.patch('/admin/bookings', { id, status });
    return res.data;
  },
  async clearBookings() { 
    return (await apiClient.delete('/admin/bookings')).data; 
  },
  async getSettings() {
    const res = await apiClient.get('/admin/settings');
    return res.data?.data;
  },
  async saveSettings(settings) {
    const res = await apiClient.post('/admin/settings', settings);
    return res.data?.data;
  },
  logout() { 
    sessionStorage.removeItem('admin_token'); 
    localStorage.removeItem('admin_token');
  }
};
