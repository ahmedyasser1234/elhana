import { isAuthenticatedAdmin } from '../_auth.js';
import { uploadImageToStorage } from '../_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const admin = isAuthenticatedAdmin(req);
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Admin login required.' });
  }

  try {
    const { filename, base64, contentType } = req.body || {};

    if (!base64 || typeof base64 !== 'string') {
      return res.status(400).json({ success: false, message: 'Base64 image data is required' });
    }

    // Strip data URL header if present (e.g. data:image/jpeg;base64,...)
    const pureBase64 = base64.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');
    const buffer = Buffer.from(pureBase64, 'base64');

    // Limit upload to 10MB
    if (buffer.length > 10 * 1024 * 1024) {
      return res.status(413).json({ success: false, message: 'Image size exceeds 10MB limit' });
    }

    const safeFilename = filename || `trip_${Date.now()}.jpg`;
    const safeType = contentType || 'image/jpeg';

    const publicUrl = await uploadImageToStorage(safeFilename, buffer, safeType);

    return res.status(200).json({
      success: true,
      url: publicUrl,
      filename: safeFilename
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
