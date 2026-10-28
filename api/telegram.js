export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { token, chat_id, text, parse_mode } = req.body || {};
    const botToken = token || process.env.TELEGRAM_BOT_TOKEN;
    const chatId = chat_id || process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId || !text) {
      return res.status(400).json({ error: 'token, chat_id, and text are required' });
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parse_mode || 'HTML'
      })
    });

    const data = await tgRes.json();
    return res.status(tgRes.ok ? 200 : tgRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
