import http from 'node:http';
import { randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateBookingPrice } from './pricing.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const dbDir = process.env.DATA_DIR || path.join(here, 'data');
const dbFile = path.join(dbDir, 'bookings.json');
const port = Number(process.env.API_PORT || 3000);
const secret = process.env.ADMIN_SESSION_SECRET || 'elhana-super-secret-session-key-2026-production';
const adminPassword = process.env.ADMIN_PASSWORD || 'elhana2026';
const retentionDays = Math.max(1, Number(process.env.BOOKING_RETENTION_DAYS || 90));
const allowedOrigin = process.env.APP_ORIGIN || '*';

async function readBookings() {
  try { return JSON.parse(await readFile(dbFile, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
}

async function saveBookings(items) {
  await mkdir(dbDir, { recursive: true });
  const temp = `${dbFile}.${process.pid}.tmp`;
  await writeFile(temp, JSON.stringify(items, null, 2), { mode: 0o600 });
  await rename(temp, dbFile);
}

function sign(value) { return createHmac('sha256', secret).update(value).digest('base64url'); }
function makeToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 8 * 60 * 60 * 1000 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function isAdmin(req) {
  const [payload, signature] = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').split('.');
  if (!payload || !signature) return false;
  const expected = Buffer.from(sign(payload)); const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  try { return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now(); } catch { return false; }
}

function send(res, status, value) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(JSON.stringify(value));
}

async function body(req) {
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 32000) throw new Error('Request too large'); }
  return JSON.parse(raw || '{}');
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  return true;
}

function validateLead(lead) {
  if (!lead || typeof lead.fullName !== 'string' || lead.fullName.trim().length < 2) throw new Error('Enter a valid full name');
  if (!/^\+?[0-9\s().-]{7,20}$/.test(lead.whatsapp || lead.phone || '')) throw new Error('Enter a valid phone number');
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  try {
    if (req.method === 'GET' && url.pathname === '/api/health') return send(res, 200, { ok: true });

    if (req.method === 'POST' && url.pathname === '/api/admin/login') {
      const data = await body(req);
      const supplied = String(data.password || '');
      if (supplied !== adminPassword) return send(res, 401, { message: 'Invalid credentials' });
      return send(res, 200, { token: makeToken() });
    }

    // Direct Telegram Send Proxy
    if (req.method === 'POST' && url.pathname === '/api/telegram/send') {
      const data = await body(req);
      const token = data.token || process.env.TELEGRAM_BOT_TOKEN;
      const chat = data.chat_id || process.env.TELEGRAM_CHAT_ID;
      if (!token || !chat || !data.text) {
        return send(res, 400, { error: 'Missing token, chat_id, or text' });
      }
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chat, text: data.text, parse_mode: data.parse_mode || 'HTML' })
      });
      const tgData = await tgRes.json();
      return send(res, tgRes.ok ? 200 : tgRes.status, tgData);
    }

    if (req.method === 'POST' && url.pathname === '/api/bookings') {
      const data = await body(req);
      validateLead(data.leadTraveler);
      
      let totalPrice = data.totalPrice;
      try {
        if (!totalPrice) totalPrice = calculateBookingPrice(data);
      } catch {
        totalPrice = data.totalPrice || 0;
      }

      const items = await readBookings();
      const ref = data.bookingRef || data.bookingReference || `SHM-${randomBytes(4).toString('hex').toUpperCase()}`;
      const booking = {
        ...data,
        totalPrice,
        bookingReference: ref,
        bookingRef: ref,
        id: data.id || randomBytes(16).toString('hex'),
        status: 'confirmed',
        paymentStatus: 'Pay on Arrival',
        createdAt: new Date().toISOString()
      };

      items.unshift(booking);
      await saveBookings(items);

      // Send to Telegram if configured
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chat = process.env.TELEGRAM_CHAT_ID;
      if (token && chat) {
        const text = `🔔 <b>حجز جديد - مجموعة الهنا</b> 🌴✨
━━━━━━━━━━━━━━━━━━━━━
🔖 <b>رقم الحجز:</b> <code>#${ref}</code>
🏝️ <b>الرحلة:</b> <b>${booking.itemTitle}</b>
📅 <b>الموعد:</b> ${booking.date} (${booking.timeSlot})
👤 <b>العميل:</b> ${booking.leadTraveler.fullName}
📱 <b>واتساب:</b> ${booking.leadTraveler.whatsapp || '-'}
🏨 <b>الفندق:</b> ${booking.leadTraveler.hotelName || '-'}
💵 <b>الإجمالي:</b> <b>$${totalPrice} USD</b>
━━━━━━━━━━━━━━━━━━━━━
🕒 ${new Date().toLocaleTimeString('ar-EG')}`;

        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML' })
        }).catch(e => console.error('Telegram notification error:', e));
      }

      return send(res, 201, { success: true, data: booking, reference: ref });
    }

    if (req.method === 'GET' && url.pathname.startsWith('/api/bookings/')) {
      const ref = decodeURIComponent(url.pathname.slice('/api/bookings/'.length));
      const found = (await readBookings()).find(item => item.bookingReference === ref || item.bookingRef === ref);
      return found ? send(res, 200, { success: true, data: found }) : send(res, 404, { success: false, message: 'Booking not found' });
    }

    if (req.method === 'GET' && url.pathname === '/api/admin/bookings') {
      const all = await readBookings();
      const cutoff = Date.now() - retentionDays * 86400000;
      const retained = all.filter(item => Date.parse(item.createdAt) >= cutoff);
      if (retained.length !== all.length) await saveBookings(retained);
      return send(res, 200, { data: retained });
    }

    if (req.method === 'DELETE' && url.pathname === '/api/admin/bookings') {
      await saveBookings([]);
      return send(res, 200, { success: true });
    }

    return send(res, 404, { message: 'Not found' });
  } catch (error) {
    return send(res, 400, { success: false, message: error.message || 'Invalid request' });
  }
});

server.listen(port, () => console.log(`Booking & Telegram API listening on http://localhost:${port}`));
