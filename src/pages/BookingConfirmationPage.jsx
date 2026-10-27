import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { CheckCircle2, Printer, PhoneCall, Home, Compass, ShieldCheck } from 'lucide-react';
import { getWhatsAppLink } from '../components/common/WhatsAppButton';
import { useCurrency } from '../context/CurrencyContext';
import { bookingsApi } from '../services/api/bookingsApi';

export const BookingConfirmationPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { formatPrice } = useCurrency();

  const location = useLocation();
  const [booking, setBooking] = useState(location.state?.booking || null);
  const [loading, setLoading] = useState(!location.state?.booking);
  const reference = new URLSearchParams(location.search).get('ref');

  useEffect(() => {
    if (booking || !reference) { setLoading(false); return; }
    bookingsApi.getByReference(reference)
      .then(result => setBooking(result.data || null))
      .catch(() => setBooking(null))
      .finally(() => setLoading(false));
  }, [reference]);

  if (loading) {
    return (
      <main className="min-h-[60vh] grid place-items-center p-8 text-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#0284C7] border-t-transparent rounded-full animate-spin"></div>
          <span>{isAr ? "جاري تحميل تفاصيل الحجز..." : "Loading booking details..."}</span>
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="min-h-[60vh] grid place-items-center p-8 text-center text-slate-900">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{isAr ? 'الحجز غير موجود أو تم حذفه' : 'Booking not found'}</h1>
          <p className="text-sm text-slate-600">{isAr ? 'افتح رابط التأكيد الذي وصلك أو تواصل معنا عبر الواتساب.' : 'Please open the confirmation link you received or contact WhatsApp support.'}</p>
          <Link to="/" className="inline-block px-5 py-2.5 rounded-xl bg-[#0284C7] text-white font-bold text-xs">
            {isAr ? 'العودة للرئيسية' : 'Return home'}
          </Link>
        </div>
      </main>
    );
  }

  const bookingRef = booking.bookingRef || booking.bookingReference || reference;

  const handlePrint = () => {
    window.print();
  };

  let vehiclesSummary = '';
  if (booking.vehicleConfig || booking.options) {
    const cfg = booking.vehicleConfig || booking.options || {};
    const parts = [];
    if (cfg.singleQuads > 0) parts.push(`${cfg.singleQuads} ${isAr ? 'مكنة سنجل' : 'Single Quad'}`);
    if (cfg.doubleQuads > 0) parts.push(`${cfg.doubleQuads} ${isAr ? 'مكنة دبل' : 'Double Quad'}`);
    if (cfg.buggy2Seater > 0) parts.push(`${cfg.buggy2Seater} ${isAr ? 'كار باجي ثنائي' : '2-Seater Buggy'}`);
    if (cfg.buggy4Seater > 0) parts.push(`${cfg.buggy4Seater} ${isAr ? 'كار باجي رباعي' : '4-Seater Buggy'}`);
    if (parts.length > 0) vehiclesSummary = parts.join(' + ');
  }

  const extrasSummaryText = booking.selectedExtrasDetails && booking.selectedExtrasDetails.length > 0
    ? booking.selectedExtrasDetails.join(' | ')
    : '';

  const whatsappMsg = isAr
    ? [
        `مرحباً، تم تأكيد حجز رحلة جديدة عبر الموقع 🌴✨`,
        `----------------------------------`,
        `📌 *رقم المرجع:* ${bookingRef}`,
        `🏖️ *الرحلة:* ${booking.itemTitle || ''}`,
        `📅 *التاريخ:* ${booking.date || ''}`,
        `⏰ *الموعد:* ${booking.timeSlot || ''}`,
        vehiclesSummary ? `🚜 *تفاصيل المركبات:* ${vehiclesSummary}` : null,
        extrasSummaryText ? `🎁 *الإضافات المختارة:* ${extrasSummaryText}` : null,
        booking.specialRequests ? `📝 *ملاحظات:* ${booking.specialRequests}` : null,
        `👤 *اسم العميل:* ${booking.leadTraveler?.fullName || ''}`,
        `🏨 *الفندق:* ${booking.leadTraveler?.hotelName || ''}${booking.leadTraveler?.roomNumber ? ` (غرفة: ${booking.leadTraveler.roomNumber})` : ''}`,
        booking.leadTraveler?.whatsapp ? `📱 *الواتساب:* ${booking.leadTraveler.whatsapp}` : null,
        `💳 *طريقة الدفع:* ${booking.paymentMethod === 'cash_arrival' ? 'كاش عند الوصول' : 'دفع إلكتروني'}`,
        `💰 *المبلغ الإجمالي:* ${formatPrice(booking.totalPrice)}`,
        `----------------------------------`,
        `يرجى تأكيد موعد الاستلام وتفاصيل التوصيل من الفندق.`
      ].filter(Boolean).join('\n')
    : [
        `Hello! I just confirmed a booking on the website 🌴✨`,
        `----------------------------------`,
        `📌 *Booking Ref:* ${bookingRef}`,
        `🏖️ *Tour:* ${booking.itemTitle || ''}`,
        `📅 *Date:* ${booking.date || ''}`,
        `⏰ *Time Slot:* ${booking.timeSlot || ''}`,
        vehiclesSummary ? `🚜 *Vehicles:* ${vehiclesSummary}` : null,
        extrasSummaryText ? `🎁 *Extras:* ${extrasSummaryText}` : null,
        booking.specialRequests ? `📝 *Notes:* ${booking.specialRequests}` : null,
        `👤 *Name:* ${booking.leadTraveler?.fullName || ''}`,
        `🏨 *Hotel:* ${booking.leadTraveler?.hotelName || ''}${booking.leadTraveler?.roomNumber ? ` (Room: ${booking.leadTraveler.roomNumber})` : ''}`,
        booking.leadTraveler?.whatsapp ? `📱 *WhatsApp:* ${booking.leadTraveler.whatsapp}` : null,
        `💳 *Payment Method:* ${booking.paymentMethod === 'cash_arrival' ? 'Cash on Arrival' : 'Online Paid'}`,
        `💰 *Total Price:* ${formatPrice(booking.totalPrice)}`,
        `----------------------------------`,
        `Please confirm hotel pickup details and lobby meeting time.`
      ].filter(Boolean).join('\n');

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? `تأكيد الحجز - ${bookingRef}` : `Booking Confirmed - ${bookingRef}`}
        description={isAr ? "تم تأكيد حجز رحلتك بشرم الشيخ. يمكنك مشاهدة كارت الحجز وموعد التوصيل." : "Your Sharm El Sheikh tour reservation is confirmed. See your voucher and pickup details."}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Success Header Box */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-sky-100 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 bg-[#25D366]/15 text-[#25D366] rounded-full flex items-center justify-center mx-auto animate-bounce-slow border border-[#25D366]/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest block">{isAr ? "حالة الحجز: مؤكد" : "Booking Status: CONFIRMED"}</span>
            <h1 className="text-3xl md:text-4xl font-black font-heading text-slate-900">
              {isAr ? "تمت عملية الحجز بنجاح!" : "Reservation Successful!"}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-normal">
              {isAr ? "سينتظرك السائق في لوبي الفندق في الموعد المحدد للرحلة." : "Your driver will meet you in your resort lobby at the designated time slot."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-center max-w-xs mx-auto border border-sky-400/30 shadow-lg">
            <div className="text-[10px] text-slate-400 uppercase font-sans">{isAr ? "رقم المرجع للحجز" : "Booking Reference"}</div>
            <div className="text-2xl font-black text-[#38BDF8] tracking-wider">{bookingRef}</div>
          </div>
        </div>

        {/* Voucher Details */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-6">
          <h3 className="text-xl font-bold font-heading text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#0284C7]" /> {isAr ? "تفاصيل إيصال الحجز" : "Tour Voucher Details"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{isAr ? "اسم الرحلة" : "Reserved Tour"}</span>
              <span className="text-slate-900 font-extrabold text-sm">{booking.itemTitle}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{t('checkout.fullName')}</span>
              <span className="text-slate-900 font-bold">{booking.leadTraveler?.fullName}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{isAr ? "التاريخ والوقت" : "Date & Time"}</span>
              <span className="text-slate-900 font-bold">{booking.date} at {booking.timeSlot}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{isAr ? "مكان التوصيل" : "Pickup Location"}</span>
              <span className="text-slate-900 font-bold">{booking.leadTraveler?.hotelName}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{t('checkout.paymentMethod')}</span>
              <span className="text-slate-900 font-bold uppercase">{booking.paymentMethod === 'cash_arrival' ? (isAr ? 'الدفع نقداً عند التوصيل' : 'Cash on Pickup') : (isAr ? 'دفع إلكتروني' : 'Online Paid')}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{t('booking.total')}</span>
              <span className="text-[#0284C7] font-black text-lg">{formatPrice(booking.totalPrice)}</span>
            </div>

            {vehiclesSummary && (
              <div className="md:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <span className="text-slate-500 uppercase text-[10px] font-bold block">{isAr ? "تفاصيل ترتيب المركبات" : "Vehicle Selection Breakdown"}</span>
                <div className="flex flex-wrap gap-3 text-xs font-bold text-slate-800">
                  {vehiclesSummary}
                </div>
              </div>
            )}

            {booking.selectedExtrasDetails && booking.selectedExtrasDetails.length > 0 && (
              <div className="md:col-span-2 p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl space-y-1.5">
                <span className="text-amber-900 uppercase text-[10px] font-bold block flex items-center gap-1">
                  🎁 {isAr ? "الإضافات الاختيارية المختارة" : "Selected Optional Extras"}
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-800">
                  {booking.selectedExtrasDetails.map((extra, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white border border-amber-300/70 rounded-xl text-amber-950 shadow-2xs">
                      ✓ {extra}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 text-xs text-slate-600 space-y-1 font-normal">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0284C7]" /> {isAr ? "ماذا يحدث الآن؟" : "What happens next?"}
            </div>
            <p>{isAr ? "سيتواصل معك مسئول الانتقالات عبر الواتساب قبل موعد التحرك لتأكيد موعد اللقاء في اللوبي." : "Our transport manager will contact you on WhatsApp before pickup to confirm your lobby meeting time."}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="outline" size="md" onClick={handlePrint} icon={Printer}>
            {isAr ? "طباعة الإيصال" : "Print Voucher"}
          </Button>

          <a href={getWhatsAppLink(whatsappMsg)} target="_blank" rel="noreferrer">
            <Button variant="whatsapp" size="md" icon={PhoneCall}>
              {isAr ? "إرسال الإيصال للواتساب" : "Send Voucher to WhatsApp"}
            </Button>
          </a>

          <Link to="/">
            <Button variant="primary" size="md" icon={Home}>
              {isAr ? "العودة للرئيسية" : "Return to Homepage"}
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BookingConfirmationPage;
