import apiClient from './client';

export const bookingsApi = {
  async createBooking(bookingData) {
    const response = await apiClient.post('/bookings', bookingData);
    return response;
  },
  async getByReference(reference) {
    try { return await apiClient.get(`/bookings/${encodeURIComponent(reference)}`); }
    catch (error) { if (error.response?.status === 404) return { success: false, message: 'Booking reference not found' }; throw error; }
  }
};
