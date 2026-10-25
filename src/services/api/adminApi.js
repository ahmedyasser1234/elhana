import apiClient from './client';

export const adminApi = {
  async login(password) {
    const { data } = await apiClient.post('/admin/login', { password });
    sessionStorage.setItem('admin_token', data.token);
    return data;
  },
  async listBookings() { return (await apiClient.get('/admin/bookings')).data.data; },
  async clearBookings() { await apiClient.delete('/admin/bookings'); },
  logout() { sessionStorage.removeItem('admin_token'); }
};
