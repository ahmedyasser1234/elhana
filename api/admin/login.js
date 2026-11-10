import { verifyAdminPassword, makeSessionToken, getAdminUser } from '../_auth.js';

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

  try {
    const { email, password } = req.body || {};

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    const isValid = verifyAdminPassword(password);
    if (!isValid) {
      // Artificial delay to prevent brute-force timing attacks
      await new Promise(resolve => setTimeout(resolve, 500));
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = getAdminUser();
    const token = makeSessionToken(user);

    return res.status(200).json({
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
