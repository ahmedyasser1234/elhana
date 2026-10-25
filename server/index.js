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
const secret = process.env.ADMIN_SESSION_SECRET || '';
const adminPassword = process.env.ADMIN_PASSWORD || '';
const retentionDays = Math.max(1, Number(process.env.BOOKING_RETENTION_DAYS || 90));
const allowedOrigin = process.env.APP_ORIGIN || 'http://localhost:5173';
if (secret.length < 32 || adminPassword.length < 12) {
  console.error('Set ADMIN_SESSION_SECRET (32+ chars) and ADMIN_PASSWORD (12+ chars) before starting.');
  process.exit(1);
}
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
  const [y, m, d] = value.split('-').map(Number);
  if (new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10) !== value) return false;
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return value >= today;
}
function validateLead(lead) {
  if (!lead || typeof lead.fullName !== 'string' || lead.fullName.trim().length < 2 || lead.fullName.length > 120) throw new Error('Enter a valid full name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email || '') || lead.email.length > 254) throw new Error('Enter a valid email address');
  if (!/^\+?[0-9\s().-]{7,20}$/.test(lead.whatsapp || '')) throw new Error('Enter a valid phone number');
  if (typeof lead.hotelName !== 'string' || !lead.hotelName.trim() || lead.hotelName.length > 160) throw new Error('Enter a valid hotel or pickup location');
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Vary', 'Origin');
  if (req.headers.origin && req.headers.origin !== allowedOrigin) return send(res, 403, { message: 'Origin not allowed' });
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  try {
    if (req.method === 'GET' && url.pathname === '/api/health') return send(res, 200, { ok: true });
    if (req.method === 'POST' && url.pathname === '/api/admin/login') {
      const data = await body(req); const supplied = Buffer.from(String(data.password || '')); const expected = Buffer.from(adminPassword);
      if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return send(res, 401, { message: 'Invalid credentials' });
      return send(res, 200, { token: makeToken() });
    }
    if (url.pathname.startsWith('/api/admin/') && !isAdmin(req)) return send(res, 401, { message: 'Admin authentication required' });
    if (req.method === 'POST' && url.pathname === '/api/bookings') {
      const data = await body(req); validateLead(data.leadTraveler);
      if (!validDate(data.date) || typeof data.timeSlot !== 'string' || !data.timeSlot || data.timeSlot.length > 80) throw new Error('Select a valid date and time');
      if (data.paymentMethod !== 'cash_arrival') throw new Error('Online card payments are not available yet');
      const totalPrice = calculateBookingPrice(data);
      const items = await readBookings(); const ref = `SHM-${randomBytes(5).toString('hex').toUpperCase()}`;
      const booking = { ...data, totalPrice, bookingReference: ref, bookingRef: ref, id: randomBytes(16).toString('hex'), status: 'Pending confirmation', paymentStatus: 'Pay on Arrival', createdAt: new Date().toISOString() };
      items.push(booking); await saveBookings(items);
      const token = process.env.TELEGRAM_BOT_TOKEN; const chat = process.env.TELEGRAM_CHAT_ID;
      if (token && chat) fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chat, text: `New booking ${ref}\n${booking.itemTitle}\n${booking.date} ${booking.timeSlot}\n${booking.leadTraveler.fullName}\n$${totalPrice}` }) }).catch(() => {});
      return send(res, 201, { success: true, data: booking, reference: ref });
    }
    if (req.method === 'GET' && url.pathname.startsWith('/api/bookings/')) {
      const ref = decodeURIComponent(url.pathname.slice('/api/bookings/'.length)); const found = (await readBookings()).find(item => item.bookingReference === ref);
      return found ? send(res, 200, { success: true, data: found }) : send(res, 404, { success: false, message: 'Booking not found' });
    }
    if (req.method === 'GET' && url.pathname === '/api/admin/bookings') {
      const all = await readBookings(); const cutoff = Date.now() - retentionDays * 86400000;
      const retained = all.filter(item => Date.parse(item.createdAt) >= cutoff);
      if (retained.length !== all.length) await saveBookings(retained);
      return send(res, 200, { data: retained });
    }
    if (req.method === 'DELETE' && url.pathname === '/api/admin/bookings') { await saveBookings([]); return send(res, 200, { success: true }); }
    return send(res, 404, { message: 'Not found' });
  } catch (error) { return send(res, 400, { success: false, message: error.message || 'Invalid request' }); }
});
server.listen(port, () => console.log(`Booking API listening on http://localhost:${port}`));
