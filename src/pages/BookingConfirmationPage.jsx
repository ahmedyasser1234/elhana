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
    bookingsApi.getByReference(reference).then(result => setBooking(result.data || null)).catch(() => setBooking(null)).finally(() => setLoading(false));
  }, [reference]);
  const bookingRef = booking.bookingRef || booking.bookingReference;

  if (loading) return <main className="min-h-[60vh] grid place-items-center p-8">Loading booking…</main>;
  if (!booking) return <main className="min-h-[60vh] grid place-items-center p-8 text-center"><div><h1 className="text-2xl font-bold">{isAr ? 'الحجز غير موجود' : 'Booking not found'}</h1><p className="mt-2">{isAr ? 'افتح رابط التأكيد الذي وصلك بعد الحجز.' : 'Open the confirmation link you received after booking.'}</p><Link to="/" className="mt-5 inline-block underline">{isAr ? 'العودة للرئيسية' : 'Return home'}</Link></div></main>;
  const handlePrint = () => {
    window.print();
  };

  let vehiclesSummary = '';
  if (booking.vehicleConfig) {
    const parts = [];
    if (booking.vehicleConfig.singleQuads > 0) parts.push(`${booking.vehicleConfig.singleQuads} ${isAr ? 'Ù…ÙƒÙ†Ø© Ø³Ù†Ø¬Ù„' : 'Single Quad'}`);
    if (booking.vehicleConfig.doubleQuads > 0) parts.push(`${booking.vehicleConfig.doubleQuads} ${isAr ? 'Ù…ÙƒÙ†Ø© Ø¯Ø¨Ù„' : 'Double Quad'}`);
    if (booking.vehicleConfig.buggy2Seater > 0) parts.push(`${booking.vehicleConfig.buggy2Seater} ${isAr ? 'ÙƒØ§Ø± Ø¨Ø§Ø¬ÙŠ Ø«Ù†Ø§Ø¦ÙŠ' : '2-Seater Buggy'}`);
    if (booking.vehicleConfig.buggy4Seater > 0) parts.push(`${booking.vehicleConfig.buggy4Seater} ${isAr ? 'ÙƒØ§Ø± Ø¨Ø§Ø¬ÙŠ Ø±Ø¨Ø§Ø¹ÙŠ' : '4-Seater Buggy'}`);
    if (parts.length > 0) vehiclesSummary = parts.join(' + ');
  }

  const extrasSummaryText = booking.selectedExtrasDetails && booking.selectedExtrasDetails.length > 0
    ? booking.selectedExtrasDetails.join(' | ')
    : '';

  const whatsappMsg = isAr
    ? [
        `Ù…Ø±Ø­Ø¨Ø§Ù‹ØŒ ØªÙ… ØªØ£ÙƒÙŠØ¯ Ø­Ø¬Ø² Ø±Ø­Ù„Ø© Ø¬Ø¯ÙŠØ¯Ø© Ø¹Ø¨Ø± Ø§Ù„Ù…ÙˆÙ‚Ø¹ ðŸŒ´âœ¨`,
        `----------------------------------`,
        `ðŸ“Œ *Ø±Ù‚Ù… Ø§Ù„Ù…Ø±Ø¬Ø¹:* ${bookingRef}`,
        `ðŸœï¸ *Ø§Ù„Ø±Ø­Ù„Ø©:* ${booking.itemTitle || ''}`,
        `ðŸ“… *Ø§Ù„ØªØ§Ø±ÙŠØ®:* ${booking.date || ''}`,
        `â° *Ø§Ù„Ù…ÙˆØ¹Ø¯:* ${booking.timeSlot || ''}`,
        vehiclesSummary ? `ðŸšœ *ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª:* ${vehiclesSummary}` : null,
        extrasSummaryText ? `ðŸŽ *Ø§Ù„Ø¥Ø¶Ø§ÙØ§Øª Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©:* ${extrasSummaryText}` : null,
        booking.specialRequests ? `ðŸ“ *Ù…Ù„Ø§Ø­Ø¸Ø§Øª:* ${booking.specialRequests}` : null,
        `ðŸ‘¤ *Ø§Ø³Ù… Ø§Ù„Ø¹Ù…ÙŠÙ„:* ${booking.leadTraveler?.fullName || ''}`,
        `ðŸ¨ *Ø§Ù„ÙÙ†Ø¯Ù‚:* ${booking.leadTraveler?.hotelName || ''}${booking.leadTraveler?.roomNumber ? ` (ØºØ±ÙØ©: ${booking.leadTraveler.roomNumber})` : ''}`,
        booking.leadTraveler?.whatsapp ? `ðŸ“± *Ø§Ù„ÙˆØ§ØªØ³Ø§Ø¨:* ${booking.leadTraveler.whatsapp}` : null,
        `ðŸ’³ *Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¯ÙØ¹:* ${booking.paymentMethod === 'cash_arrival' ? 'ÙƒØ§Ø´ Ø¹Ù†Ø¯ Ø§Ù„ÙˆØµÙˆÙ„' : 'Ø¯ÙØ¹ Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ'}`,
        `ðŸ’° *Ø§Ù„Ù…Ø¨Ù„Øº Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ:* ${formatPrice(booking.totalPrice)}`,
        `----------------------------------`,
        `ÙŠØ±Ø¬Ù‰ ØªØ£ÙƒÙŠØ¯ Ù…ÙˆØ¹Ø¯ Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù… ÙˆØªÙØ§ØµÙŠÙ„ Ø§Ù„ØªÙˆØµÙŠÙ„ Ù…Ù† Ø§Ù„ÙÙ†Ø¯Ù‚.`
      ].filter(Boolean).join('\n')
    : [
        `Hello! I just confirmed a booking on the website ðŸŒ´âœ¨`,
        `----------------------------------`,
        `ðŸ“Œ *Booking Ref:* ${bookingRef}`,
        `ðŸœï¸ *Tour:* ${booking.itemTitle || ''}`,
        `ðŸ“… *Date:* ${booking.date || ''}`,
        `â° *Time Slot:* ${booking.timeSlot || ''}`,
        vehiclesSummary ? `ðŸšœ *Vehicles:* ${vehiclesSummary}` : null,
        extrasSummaryText ? `ðŸŽ *Extras:* ${extrasSummaryText}` : null,
        booking.specialRequests ? `ðŸ“ *Notes:* ${booking.specialRequests}` : null,
        `ðŸ‘¤ *Name:* ${booking.leadTraveler?.fullName || ''}`,
        `ðŸ¨ *Hotel:* ${booking.leadTraveler?.hotelName || ''}${booking.leadTraveler?.roomNumber ? ` (Room: ${booking.leadTraveler.roomNumber})` : ''}`,
        booking.leadTraveler?.whatsapp ? `ðŸ“± *WhatsApp:* ${booking.leadTraveler.whatsapp}` : null,
        `ðŸ’³ *Payment Method:* ${booking.paymentMethod === 'cash_arrival' ? 'Cash on Arrival' : 'Online Paid'}`,
        `ðŸ’° *Total Price:* ${formatPrice(booking.totalPrice)}`,
        `----------------------------------`,
        `Please confirm hotel pickup details and lobby meeting time.`
      ].filter(Boolean).join('\n');

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? `ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø­Ø¬Ø² - ${booking.bookingRef}` : `Booking Confirmed - ${booking.bookingRef}`}
        description={isAr ? "ØªÙ… ØªØ£ÙƒÙŠØ¯ Ø­Ø¬Ø² Ø±Ø­Ù„ØªÙƒ Ø¨Ø´Ø±Ù… Ø§Ù„Ø´ÙŠØ®. ÙŠÙ…ÙƒÙ†Ùƒ Ù…Ø´Ø§Ù‡Ø¯Ø© ÙƒØ§Ø±Øª Ø§Ù„Ø­Ø¬Ø² ÙˆÙ…ÙˆØ¹Ø¯ Ø§Ù„ØªÙˆØµÙŠÙ„." : "Your Sharm El Sheikh tour reservation is confirmed. See your voucher and pickup details."}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Success Header Box */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-sky-100 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 bg-[#25D366]/15 text-[#25D366] rounded-full flex items-center justify-center mx-auto animate-bounce-slow border border-[#25D366]/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest block">{isAr ? "Ø­Ø§Ù„Ø© Ø§Ù„Ø­Ø¬Ø²: Ù…Ø¤ÙƒØ¯" : "Booking Status: CONFIRMED"}</span>
            <h1 className="text-3xl md:text-4xl font-black font-heading text-slate-900">
              {isAr ? "ØªÙ…Øª Ø¹Ù…Ù„ÙŠØ© Ø§Ù„Ø­Ø¬Ø² Ø¨Ù†Ø¬Ø§Ø­!" : "Reservation Successful!"}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-normal">
              {isAr ? "Ø³ÙŠÙ†ØªØ¸Ø±Ùƒ Ø§Ù„Ø³Ø§Ø¦Ù‚ ÙÙŠ Ù„ÙˆØ¨ÙŠ Ø§Ù„ÙÙ†Ø¯Ù‚ ÙÙŠ Ø§Ù„Ù…ÙˆØ¹Ø¯ Ø§Ù„Ù…Ø­Ø¯Ø¯ Ù„Ù„Ø±Ø­Ù„Ø©." : "Your driver will meet you in your resort lobby at the designated time slot."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-center max-w-xs mx-auto border border-sky-400/30 shadow-lg">
            <div className="text-[10px] text-slate-400 uppercase font-sans">{isAr ? "Ø±Ù‚Ù… Ø§Ù„Ù…Ø±Ø¬Ø¹ Ù„Ù„Ø­Ø¬Ø²" : "Booking Reference"}</div>
            <div className="text-2xl font-black text-[#38BDF8] tracking-wider">{booking.bookingRef}</div>
          </div>
        </div>

        {/* Voucher Details */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-6">
          <h3 className="text-xl font-bold font-heading text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#0284C7]" /> {isAr ? "ØªÙØ§ØµÙŠÙ„ Ø¥ÙŠØµØ§Ù„ Ø§Ù„Ø­Ø¬Ø²" : "Tour Voucher Details"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{isAr ? "Ø§Ø³Ù… Ø§Ù„Ø±Ø­Ù„Ø©" : "Reserved Tour"}</span>
              <span className="text-slate-900 font-extrabold text-sm">{booking.itemTitle}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{t('checkout.fullName')}</span>
              <span className="text-slate-900 font-bold">{booking.leadTraveler?.fullName}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{isAr ? "Ø§Ù„ØªØ§Ø±ÙŠØ® ÙˆØ§Ù„ÙˆÙ‚Øª" : "Date & Time"}</span>
              <span className="text-slate-900 font-bold">{booking.date} at {booking.timeSlot}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{isAr ? "Ù…ÙƒØ§Ù† Ø§Ù„ØªÙˆØµÙŠÙ„" : "Pickup Location"}</span>
              <span className="text-slate-900 font-bold">{booking.leadTraveler?.hotelName}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{t('checkout.paymentMethod')}</span>
              <span className="text-slate-900 font-bold uppercase">{booking.paymentMethod === 'cash_arrival' ? (isAr ? 'Ø§Ù„Ø¯ÙØ¹ Ù†Ù‚Ø¯Ø§Ù‹ Ø¹Ù†Ø¯ Ø§Ù„ØªÙˆØµÙŠÙ„' : 'Cash on Pickup') : (isAr ? 'Ø¯ÙØ¹ Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' : 'Online Paid')}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">{t('booking.total')}</span>
              <span className="text-[#0284C7] font-black text-lg">{formatPrice(booking.totalPrice)}</span>
            </div>

            {booking.vehicleConfig && (booking.vehicleConfig.singleQuads > 0 || booking.vehicleConfig.doubleQuads > 0 || booking.vehicleConfig.buggy2Seater > 0 || booking.vehicleConfig.buggy4Seater > 0) && (
              <div className="md:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <span className="text-slate-500 uppercase text-[10px] font-bold block">{isAr ? "ØªÙØ§ØµÙŠÙ„ ØªØ±ØªÙŠØ¨ Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª" : "Vehicle Selection Breakdown"}</span>
                <div className="flex flex-wrap gap-3 text-xs font-bold text-slate-800">
                  {booking.vehicleConfig.singleQuads > 0 && <span>{booking.vehicleConfig.singleQuads} {isAr ? 'Ù…ÙƒÙ†Ø© Ø³Ù†Ø¬Ù„' : 'Single Quad(s)'}</span>}
                  {booking.vehicleConfig.doubleQuads > 0 && <span>{booking.vehicleConfig.doubleQuads} {isAr ? 'Ù…ÙƒÙ†Ø© Ø¯Ø¨Ù„' : 'Double Quad(s)'}</span>}
                  {booking.vehicleConfig.buggy2Seater > 0 && <span>{booking.vehicleConfig.buggy2Seater} {isAr ? 'ÙƒØ§Ø± Ø¨Ø§Ø¬ÙŠ Ø«Ù†Ø§Ø¦ÙŠ' : '2-Seater Buggy'}</span>}
                  {booking.vehicleConfig.buggy4Seater > 0 && <span>{booking.vehicleConfig.buggy4Seater} {isAr ? 'ÙƒØ§Ø± Ø¨Ø§Ø¬ÙŠ Ø±Ø¨Ø§Ø¹ÙŠ' : '4-Seater Buggy'}</span>}
                </div>
              </div>
            )}

            {booking.selectedExtrasDetails && booking.selectedExtrasDetails.length > 0 && (
              <div className="md:col-span-2 p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl space-y-1.5">
                <span className="text-amber-900 uppercase text-[10px] font-bold block flex items-center gap-1">
                  ðŸŽ {isAr ? "Ø§Ù„Ø¥Ø¶Ø§ÙØ§Øª Ø§Ù„Ø§Ø®ØªÙŠØ§Ø±ÙŠØ© Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©" : "Selected Optional Extras"}
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-800">
                  {booking.selectedExtrasDetails.map((extra, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white border border-amber-300/70 rounded-xl text-amber-950 shadow-2xs">
                      âœ“ {extra}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 text-xs text-slate-600 space-y-1 font-normal">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0284C7]" /> {isAr ? "Ù…Ø§Ø°Ø§ ÙŠØ­Ø¯Ø« Ø§Ù„Ø¢Ù†ØŸ" : "What happens next?"}
            </div>
            <p>{isAr ? "Ø³ÙŠØªÙˆØ§ØµÙ„ Ù…Ø¹Ùƒ Ù…Ø³Ø¦ÙˆÙ„ Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„Ø§Øª Ø¹Ø¨Ø± Ø§Ù„ÙˆØ§ØªØ³Ø§Ø¨ Ù‚Ø¨Ù„ Ù…ÙˆØ¹Ø¯ Ø§Ù„ØªØ­Ø±Ùƒ Ø¨Ø³Ø§Ø¹Ø© Ù„ØªØ±ØªÙŠØ¨ Ø§Ù„ØªÙˆØµÙŠÙ„." : "Our transport manager will contact you on WhatsApp 1 hour before pickup to confirm your lobby meeting time."}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="outline" size="md" onClick={handlePrint} icon={Printer}>
            {isAr ? "Ø·Ø¨Ø§Ø¹Ø© Ø§Ù„Ø¥ÙŠØµØ§Ù„" : "Print Voucher"}
          </Button>

          <a href={getWhatsAppLink(whatsappMsg)} target="_blank" rel="noreferrer">
            <Button variant="whatsapp" size="md" icon={PhoneCall}>
              {isAr ? "Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø¥ÙŠØµØ§Ù„ Ù„Ù„ÙˆØ§ØªØ³Ø§Ø¨" : "Send Voucher to WhatsApp"}
            </Button>
          </a>

          <Link to="/">
            <Button variant="primary" size="md" icon={Home}>
              {isAr ? "Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ø±Ø¦ÙŠØ³ÙŠØ©" : "Return to Homepage"}
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BookingConfirmationPage;


