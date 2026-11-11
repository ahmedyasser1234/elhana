/**
 * Telegram Notification Service for El Hana Group Bookings
 * Dispatches notifications exclusively through secure serverless API routes (/api/telegram).
 * Never leaks bot tokens or secrets to client bundles.
 */

import apiClient from './api/client';

/**
 * Send booking notification to Telegram via server API
 */
export async function sendTelegramMessage(text, options = {}) {
  try {
    const payload = {
      text,
      parse_mode: options.parseMode || 'HTML',
      isTest: Boolean(options.isTest),
      testToken: options.testToken,
      testChatId: options.testChatId
    };

    const res = await apiClient.post('/telegram', payload);
    const isSuccess = res.data && !res.data.error && res.data.ok !== false;
    return {
      success: isSuccess,
      data: res.data,
      message: res.data?.description || res.data?.message || (res.data?.error ? String(res.data.error) : '')
    };
  } catch (err) {
    console.warn('Telegram notification request error:', err.message);
    const serverMsg = err.response?.data?.description || err.response?.data?.error || err.response?.data?.message || err.message;
    return {
      success: false,
      message: serverMsg
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
  const message = formatBookingMessage(booking);
  return sendTelegramMessage(message);
}

/**
 * Sends a test notification to verify credentials via server
 */
export async function testTelegramConnection(token, chatId) {
  const testText = `✅ <b>اختبار ربط بوت تليجرام - مجموعة الهنا</b>
━━━━━━━━━━━━━━━━━━━━━
تم اختبار الاتصال بنجاح عبر السيرفر الآمن!
سوف تصلك الآن جميع إشعارات الحجوزات الجديدة مباشرة على هذه المحادثة فور إتمام أي عميل للحجز من الموقع.
🕒 ${new Date().toLocaleTimeString('ar-EG')}`;

  return sendTelegramMessage(testText, {
    isTest: true,
    testToken: token,
    testChatId: chatId
  });
}
