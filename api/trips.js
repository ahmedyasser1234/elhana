import { fetchTrips, fetchTripBySlug } from './_db.js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { slug, category } = req.query || {};

    if (slug) {
      const trip = await fetchTripBySlug(slug);
      if (!trip) {
        return res.status(404).json({ success: false, message: 'Trip not found' });
      }
      return res.status(200).json({ success: true, data: trip });
    }

    const trips = await fetchTrips({ category });
    return res.status(200).json({ success: true, count: trips.length, data: trips });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
