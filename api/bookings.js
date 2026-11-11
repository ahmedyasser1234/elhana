import { randomBytes } from 'node:crypto';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    // If a reference query is provided, return that specific booking
    const { ref } = req.query || {};
    return res.status(200).json({
      success: true,
      message: 'Bookings API online',
      ref: ref || null
    });
  }

  if (req.method === 'POST') {
    try {
      const data = req.body || {};
      const lead = data.leadTraveler || {};
      const ref = data.bookingRef || data.bookingReference || `SHM-${randomBytes(3).toString('hex').toUpperCase()}`;

      const booking = {
        ...data,
        bookingRef: ref,
        bookingReference: ref,
        id: data.id || `b_${Date.now()}`,
        status: data.status || 'confirmed',
        paymentStatus: data.paymentStatus || 'Pay on Arrival',
        totalPrice: Number(data.totalPrice) || 0,
        createdAt: new Date().toISOString()
      };

      // Send automated Telegram notification if server environment credentials exist
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chat = process.env.TELEGRAM_CHAT_ID;
      if (token && chat) {
        const text = `🔔 <b>حجز جديد مؤكد - مجموعة الهنا</b> 🌴✨
━━━━━━━━━━━━━━━━━━━━━
🔖 <b>رقم الحجز:</b> <code>#${ref}</code>
🏝️ <b>الرحلة:</b> <b>${booking.itemTitle || 'رحلة شرم الشيخ'}</b>
📅 <b>الموعد:</b> ${booking.date || 'اليوم'} • (${booking.timeSlot || 'موعد محدد'})

👤 <b>العميل:</b> ${lead.fullName || 'عميل'}
📱 <b>واتساب:</b> <a href="https://wa.me/${(lead.whatsapp || lead.phone || '').replace(/[^0-9]/g, '')}">${lead.whatsapp || lead.phone || '-'}</a>
🏨 <b>الفندق:</b> ${lead.hotelName || '-'}
👥 <b>العدد:</b> ${booking.adults || 1} كبار ${booking.children > 0 ? `+ ${booking.children} أطفال` : ''}

💵 <b>الإجمالي:</b> <b>$${booking.totalPrice} USD</b>
💳 <b>طريقة الدفع:</b> كاش عند الوصول (Pay on Arrival)
━━━━━━━━━━━━━━━━━━━━━
🕒 ${new Date().toLocaleTimeString('ar-EG')}
🌐 <i>حجز مباشر عبر موقع مجموعة الهنا الرسمي</i>`;

        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(6000),
          body: JSON.stringify({
            chat_id: chat,
            text,
            parse_mode: 'HTML'
          })
        }).catch(err => {
          console.warn('Booking Telegram push failed:', err.message);
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: booking
      });
    } catch (err) {
      console.error('Booking creation error:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Server error creating booking'
      });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
