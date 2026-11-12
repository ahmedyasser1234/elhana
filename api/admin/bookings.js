import { isAuthenticatedAdmin } from '../_auth.js';
import { getBookings, deleteBooking, clearBookings, updateBookingStatus } from '../_store.js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Admin authentication verification
  const admin = isAuthenticatedAdmin(req);
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Admin token required.' });
  }

  if (req.method === 'GET') {
    try {
      const bookings = await getBookings();
      return res.status(200).json({
        success: true,
        data: bookings,
        count: bookings.length
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query || {};
      if (id) {
        const deleted = await deleteBooking(id);
        return res.status(200).json({ success: true, deleted, message: `Booking ${id} deleted` });
      }
      await clearBookings();
      return res.status(200).json({ success: true, message: 'All bookings cleared' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id, status } = req.body || {};
      if (!id || !status) {
        return res.status(400).json({ success: false, message: 'id and status required' });
      }
      const updated = await updateBookingStatus(id, status);
      return res.status(200).json({ success: Boolean(updated), data: updated });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
