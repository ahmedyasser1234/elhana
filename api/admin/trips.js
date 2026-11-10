import { isAuthenticatedAdmin } from '../_auth.js';
import { updateTripInDb, fetchTrips } from '../_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Verify Admin Authentication on Server
  const admin = isAuthenticatedAdmin(req);
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Valid admin token required.' });
  }

  if (req.method === 'GET') {
    try {
      const trips = await fetchTrips();
      return res.status(200).json({ success: true, data: trips });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { slugOrId, updates } = req.body || {};
      if (!slugOrId || !updates) {
        return res.status(400).json({ success: false, message: 'slugOrId and updates are required' });
      }

      const updated = await updateTripInDb(slugOrId, updates);
      return res.status(200).json({ success: true, data: updated });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
