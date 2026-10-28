/**
 * Telegram Notification Service for El Hana Group Bookings
 * Sends instant notifications to Telegram via Vite dev middleware, Vercel serverless API, or direct fallback.
 */

export function getTelegramSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('admin_notification_settings') || '{}');
    return {
      enabled: saved.enableTelegram !== false,
      token: (saved.telegramToken || import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '').trim(),
      chatId: (saved.telegramChatId || import.meta.env.VITE_TELEGRAM_CHAT_ID || '').trim()
    };
  } catch {
    return {
      enabled: true,
      token: (import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '').trim(),
      chatId: (import.meta.env.VITE_TELEGRAM_CHAT_ID || '').trim()
    };
  }
}

/**
 * Send raw text message to Telegram
 */
export async function sendTelegramMessage(text, options = {}) {
  const config = getTelegramSettings();
  const token = (options.token || config.token || '').trim();
  const chatId = (options.chatId || config.chatId || '').trim();

  if (!token || !chatId) {
    return {
      success: false,
      message: 'Telegram Bot Token or Chat ID is missing.'
    };
  }

  // Payload
  const payload = {
    token,
    chat_id: chatId,
    text,
    parse_mode: options.parseMode || 'HTML'
  };

  // 1. Try local Vite dev server / Vercel API proxy
  try {
    const proxyRes = await fetch('/api/telegram/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      return { success: true, data };
    }
  } catch {
    // Proxy not available or failed, try direct fallback
  }

  // 2. Try Vercel /api/telegram endpoint
  try {
    const vercelRes = await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (vercelRes.ok) {
      const data = await vercelRes.json();
      return { success: true, data };
    }
  } catch {
    // Continue to direct fallback
  }

  // 3. Fallback: Direct call to api.telegram.org (e.g. if CORS allowed or Node environment)
  try {
    const directRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: options.parseMode || 'HTML'
      })
    });

    const data = await directRes.json();
    if (data && data.ok) {
      return { success: true, data };
    }
    return {
      success: false,
      message: data.description || 'Failed to send message via Telegram API'
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'Network error reaching Telegram API'
    };
  }
}

/**
 * Formats a new booking into a rich Telegram message
 */
export function formatBookingMessage(booking) {
  const ref = booking.bookingRef || booking.bookingReference || 'N/A';
  const title = booking.itemTitle || 'رحلة سفاري / بحرية';
  const date = booking.date || 'اليوم';
  const timeSlot = booking.timeSlot || 'موعد محدد';
  const lead = booking.leadTraveler || {};
  const fullName = lead.fullName || 'عميل';
  const phone = lead.whatsapp || lead.phone || 'غير مسجل';
  const hotel = lead.hotelName || 'غير محدد';
  const adults = booking.adults || 1;
  const children = booking.children || 0;
  const price = booking.totalPrice || 0;
  const payment = booking.paymentMethod === 'cash_arrival' ? 'كاش عند الوصول (Pay on Arrival)' : 'إلكتروني';

  return `🔔 <b>حجز جديد مؤكد - مجموعة الهنا</b> 🌴✨
━━━━━━━━━━━━━━━━━━━━━
🔖 <b>رقم الحجز:</b> <code>#${ref}</code>
🏝️ <b>الرحلة:</b> <b>${title}</b>
📅 <b>الموعد:</b> ${date} • (${timeSlot})

👤 <b>اسم العميل:</b> ${fullName}
📱 <b>رقم واتساب:</b> <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">${phone}</a>
🏨 <b>مكان الإقامة / الفندق:</b> ${hotel}
👥 <b>عدد الأفراد:</b> ${adults} كبار ${children > 0 ? `+ ${children} أطفال` : ''}

💵 <b>الإجمالي:</b> <b>$${price} USD</b>
💳 <b>طريقة الدفع:</b> ${payment}
━━━━━━━━━━━━━━━━━━━━━
🕒 ${new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' })}
🌐 <i>تم الحجز تلقائياً عبر موقع مجموعة الهنا الرسمي</i>`;
}

/**
 * Triggers Telegram notification for a newly placed booking
 */
export async function sendBookingTelegramNotification(booking) {
  const config = getTelegramSettings();
  if (!config.enabled || !config.token || !config.chatId) {
    return { success: false, reason: 'Telegram notifications disabled or unconfigured' };
  }

  const message = formatBookingMessage(booking);
  return sendTelegramMessage(message, {
    token: config.token,
    chatId: config.chatId
  });
}

/**
 * Sends a test notification to verify credentials
 */
export async function testTelegramConnection(token, chatId) {
  const testText = `✅ <b>اختبار ربط بوت تليجرام - مجموعة الهنا</b>
━━━━━━━━━━━━━━━━━━━━━
تم اختبار الاتصال بنجاح!
سوف تصلك الآن جميع إشعارات الحجوزات الجديدة مباشرة على هذه المحادثة فور إتمام أي عميل للحجز من الموقع.
🕒 ${new Date().toLocaleTimeString('ar-EG')}`;

  return sendTelegramMessage(testText, { token, chatId });
}
