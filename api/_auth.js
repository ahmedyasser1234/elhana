import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'elhana-super-secret-session-key-production-change-in-env';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'elhana2026';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ahmedyasser697@gmail.com';

function sign(payloadStr) {
  return createHmac('sha256', SESSION_SECRET).update(payloadStr).digest('base64url');
}

export function makeSessionToken(user = {}) {
  const payload = {
    email: user.email || ADMIN_EMAIL,
    role: user.role || 'superadmin',
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(payloadStr);
  return `${payloadStr}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.replace(/^Bearer\s+/i, '').split('.');
  if (parts.length !== 2) return null;

  const [payloadStr, signature] = parts;
  const expectedSig = Buffer.from(sign(payloadStr));
  const givenSig = Buffer.from(signature);

  if (expectedSig.length !== givenSig.length || !timingSafeEqual(expectedSig, givenSig)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Date.now()) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

export function isAuthenticatedAdmin(req) {
  const authHeader = req.headers?.authorization || req.headers?.Authorization || '';
  return verifySessionToken(authHeader);
}

export function verifyAdminPassword(password) {
  if (!password || typeof password !== 'string') return false;
  const expected = Buffer.from(ADMIN_PASSWORD);
  const given = Buffer.from(password);
  if (expected.length !== given.length) return false;
  return timingSafeEqual(expected, given);
}

export function getAdminUser() {
  return {
    email: ADMIN_EMAIL,
    role: 'superadmin',
    name: 'El Hana Admin'
  };
}
