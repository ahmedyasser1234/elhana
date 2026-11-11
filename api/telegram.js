import { isAuthenticatedAdmin } from './_auth.js';

export default async function handler(req, res) {
  // CORS
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
    const { text, parse_mode, isTest, testToken, testChatId } = req.body || {};

    // If it's a test from the admin dashboard:
    if (isTest) {
      const admin = isAuthenticatedAdmin(req);
      if (!admin) {
        return res.status(401).json({ error: 'Unauthorized test request. Please login to admin dashboard.' });
      }
      const token = (testToken || process.env.TELEGRAM_BOT_TOKEN || '').trim();
      const chat = (testChatId || process.env.TELEGRAM_CHAT_ID || '').trim();
      if (!token || !chat) {
        return res.status(400).json({ error: 'يرجى إدخال رمز البوت (Bot Token) ومعرف الشات (Chat ID).' });
      }

      const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(8000),
        body: JSON.stringify({
          chat_id: chat,
          text: text || '✅ Test Telegram notification from El Hana Group',
          parse_mode: parse_mode || 'HTML'
        })
      });
      const data = await tgRes.json();
      if (!tgRes.ok || !data.ok) {
        return res.status(400).json({
          error: data.description || 'فشل إرسال الرسالة عبر تليجرام.',
          description: data.description
        });
      }
      return res.status(200).json(data);
    }

    // Standard notification (server-only env vars, never from client body)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn('Telegram notifications skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set.');
      return res.status(200).json({ skipped: true, message: 'Telegram credentials not configured in server environment.' });
    }

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text message is required' });
    }

    const cleanText = text.slice(0, 4000);

    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(6000),
      body: JSON.stringify({
        chat_id: chatId,
        text: cleanText,
        parse_mode: parse_mode || 'HTML'
      })
    });

    const data = await tgRes.json();
    return res.status(tgRes.ok ? 200 : tgRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
