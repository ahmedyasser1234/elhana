import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const TMP_FILE = path.join(os.tmpdir(), 'elhana_store_v1.json');

// In-memory cache for fast access across lambdas
let memoryStore = {
  bookings: [],
  settings: {
    enableTelegram: true,
    telegramToken: '',
    telegramChatId: '',
    enableEmail: true,
    adminEmail: 'info@elhanagroup.com',
    enableWhatsAppApi: false,
    whatsappAdminPhone: '+201037118060'
  }
};

let storeLoaded = false;

async function loadStore() {
  if (storeLoaded) return memoryStore;
  try {
    if (existsSync(TMP_FILE)) {
      const raw = await readFile(TMP_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        memoryStore = {
          bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [],
          settings: { ...memoryStore.settings, ...(parsed.settings || {}) }
        };
      }
    }
  } catch (err) {
    console.warn('Store load warning:', err.message);
  }
  storeLoaded = true;
  return memoryStore;
}

async function persistStore() {
  try {
    await writeFile(TMP_FILE, JSON.stringify(memoryStore, null, 2), 'utf8');
  } catch (err) {
    console.warn('Store persist warning:', err.message);
  }
}

/**
 * Save a new booking
 */
export async function saveBooking(booking) {
  await loadStore();
  const ref = booking.bookingRef || booking.bookingReference || booking.id;
  // Prevent duplicate by reference or id
  const existingIdx = memoryStore.bookings.findIndex(
    b => (b.bookingRef && b.bookingRef === ref) || (b.bookingReference && b.bookingReference === ref) || b.id === booking.id
  );
  if (existingIdx >= 0) {
    memoryStore.bookings[existingIdx] = { ...memoryStore.bookings[existingIdx], ...booking };
  } else {
    memoryStore.bookings.unshift(booking);
  }
  // Keep last 300 bookings
  if (memoryStore.bookings.length > 300) {
    memoryStore.bookings = memoryStore.bookings.slice(0, 300);
  }
  await persistStore();
  return booking;
}

/**
 * Get all stored bookings
 */
export async function getBookings() {
  await loadStore();
  return memoryStore.bookings;
}

/**
 * Delete a booking by id or reference
 */
export async function deleteBooking(idOrRef) {
  await loadStore();
  const initialLen = memoryStore.bookings.length;
  memoryStore.bookings = memoryStore.bookings.filter(
    b => b.id !== idOrRef && b.bookingRef !== idOrRef && b.bookingReference !== idOrRef
  );
  await persistStore();
  return memoryStore.bookings.length < initialLen;
}

/**
 * Clear all bookings
 */
export async function clearBookings() {
  await loadStore();
  memoryStore.bookings = [];
  await persistStore();
  return true;
}

/**
 * Update booking status (e.g. 'confirmed', 'completed', 'cancelled')
 */
export async function updateBookingStatus(idOrRef, status) {
  await loadStore();
  const item = memoryStore.bookings.find(
    b => b.id === idOrRef || b.bookingRef === idOrRef || b.bookingReference === idOrRef
  );
  if (item) {
    item.status = status;
    item.updatedAt = new Date().toISOString();
    await persistStore();
    return item;
  }
  return null;
}

/**
 * Save notification and admin settings
 */
export async function saveSettings(newSettings = {}) {
  await loadStore();
  memoryStore.settings = {
    ...memoryStore.settings,
    ...newSettings
  };
  await persistStore();
  return memoryStore.settings;
}

/**
 * Get current settings
 */
export async function getSettings() {
  await loadStore();
  return memoryStore.settings;
}

/**
 * Resolve Telegram credentials:
 * 1. Checks environment variables (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
 * 2. Falls back to settings configured in admin dashboard
 */
export async function getTelegramCredentials() {
  await loadStore();
  const token = (process.env.TELEGRAM_BOT_TOKEN || memoryStore.settings.telegramToken || '').trim();
  const chatId = (process.env.TELEGRAM_CHAT_ID || memoryStore.settings.telegramChatId || '').trim();
  const enabled = memoryStore.settings.enableTelegram !== false;
  return { token, chatId, enabled };
}
