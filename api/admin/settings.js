import { isAuthenticatedAdmin } from '../_auth.js';
import { getSettings, saveSettings } from '../_store.js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');

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
      const settings = await getSettings();
      // Mask token slightly for security if desired, or return full for editing
      return res.status(200).json({ success: true, data: settings });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const newSettings = req.body || {};
      const saved = await saveSettings(newSettings);
      return res.status(200).json({
        success: true,
        message: 'Settings saved successfully',
        data: saved
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
