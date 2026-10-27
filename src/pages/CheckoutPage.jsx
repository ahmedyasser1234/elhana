import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import { bookingsApi } from '../services/api/bookingsApi';
import { Button } from '../components/common/Button';
import { ShieldCheck, Calendar, Users, DollarSign, Sparkles, Check, Clock, Compass } from 'lucide-react';
import { getLocalizedExperience } from '../data/experiences';
import { useCurrency } from '../context/CurrencyContext';
import { SHARM_HOTELS } from '../data/sharmHotels';

export const CheckoutPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { formatPrice } = useCurrency();

  const navigate = useNavigate();
  const location = useLocation();
  const { bookingDraft, calculateTotal } = useBooking();
  const { showToast } = useToast();

  const isTransfer = location.state?.isTransferBooking;
  const transferData = location.state;

  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash_arrival');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: bookingDraft.leadTraveler?.fullName || '',
      email: bookingDraft.leadTraveler?.email || '',
      whatsapp: bookingDraft.leadTraveler?.whatsapp || '',
      hotelName: isTransfer ? transferData?.pickup : (bookingDraft.hotelName || ''),
      roomNumber: bookingDraft.roomNumber || '',
      specialRequests: bookingDraft.specialRequests || ''
    }
  });

  const rawExperience = bookingDraft.experience;
  const experience = rawExperience ? getLocalizedExperience(rawExperience, i18n.language) : null;
  const totalPrice = isTransfer ? transferData?.price : calculateTotal(rawExperience);

  const onSubmitBooking = async (formData) => {
    setSubmitting(true);
    try {
      const selectedExtrasDetails = [];
      if (!isTransfer) {
        const totalPeople = (bookingDraft.adults || 0) + (bookingDraft.children || 0);
        const transferCost = totalPeople < 6 ? 18 : 24;
        const isBedouinStandaloneExp = (experience?.slug === 'authentic-bedouin-experience-dinner');

        if (isBedouinStandaloneExp || bookingDraft.bedouinPartyOption === 'dinner_only') {
          const subOpt = bookingDraft.bedouinPartySubOption || 'dinner_standard';
          if (subOpt === 'dinner_vip_stargazing') selectedExtrasDetails.push('👑🔭 عشاء VIP فاخر + تلسكوب ورؤية النجوم ($35 للفرد)');
          else if (subOpt === 'dinner_stargazing') selectedExtrasDetails.push('🔭 عشاء بدوي عادي + تلسكوب ورؤية النجوم ($25 للفرد)');
          else if (subOpt === 'dinner_vip') selectedExtrasDetails.push('👑 عشاء VIP فاخر شامل التران سفير ($30 للفرد)');
          else selectedExtrasDetails.push('🏕️ عشاء بدوي عادي شامل التران سفير ($20 للفرد)');
        } else {
          if (bookingDraft.bedouinPartyOption === 'vip_dinner') selectedExtrasDetails.push('👑 عشاء VIP فاخر مع السفاري ($18 للفرد)');
          if (bookingDraft.bedouinPartyOption === 'standard_dinner' || bookingDraft.bedouinPartyOption === 'with_safari') selectedExtrasDetails.push('🏕️ عشاء بدوي عادي مع السفاري ($10 للفرد)');
        }

        if (bookingDraft.privateTransfer) selectedExtrasDetails.push(`سيارة توصيل خاصة VIP ($${transferCost})`);
        if (bookingDraft.photoVideoPackage) selectedExtrasDetails.push('ألبوم صور وفيديو تصوير احترافي ($15)');
        if (bookingDraft.bedouinScarf) selectedExtrasDetails.push('شال بدوي صحراوي ($4)');
        if (bookingDraft.desertGoggles) selectedExtrasDetails.push('نظارة صحراوية ($6)');
        if (bookingDraft.privateSafari) selectedExtrasDetails.push('جولة سفاري خاصة بالكامل Private Tour ($15)');
        if (bookingDraft.camelRide30min) selectedExtrasDetails.push('🐪 جولة جمال صحراوية 30 دقيقة ($10)');
        if (bookingDraft.horseRide1hr) selectedExtrasDetails.push('🐎 جولة خيل عربي ساعة كاملة ($20)');
        if (bookingDraft.telescopeStargazing) selectedExtrasDetails.push('🔭 تلسكوب ورؤية النجوم ($5)');
      }

      const bookingPayload = {
        itemTitle: isTransfer ? `Private Transfer: ${transferData.pickup} → ${transferData.dropoff}` : (experience?.title || 'Sharm Experience'),
        itemType: isTransfer ? 'transfer' : 'experience',
        experienceSlug: isTransfer ? undefined : rawExperience?.slug,
        vehicleId: isTransfer ? transferData.vehicleId : undefined,
        routeNames: isTransfer ? transferData.routeNames : undefined,
        date: isTransfer ? transferData.date : bookingDraft.date,
        timeSlot: isTransfer ? transferData.time : bookingDraft.timeSlot,
        adults: isTransfer ? transferData.passengers : bookingDraft.adults,
        children: isTransfer ? 0 : bookingDraft.children,
        leadTraveler: {
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          hotelName: formData.hotelName,
          roomNumber: formData.roomNumber
        },
        options: isTransfer ? {} : {
          singleQuads: bookingDraft.singleQuads || 0,
          doubleQuads: bookingDraft.doubleQuads || 0,
          buggy2Seater: bookingDraft.buggy2Seater || 0,
          buggy4Seater: bookingDraft.buggy4Seater || 0,
        },
        bedouinPartyOption: bookingDraft.bedouinPartyOption,
        bedouinPartySubOption: bookingDraft.bedouinPartySubOption,
        extras: isTransfer ? [] : [
          bookingDraft.privateTransfer && 'privateTransfer',
          bookingDraft.photoVideoPackage && 'photoVideoPackage',
          bookingDraft.bedouinScarf && 'bedouinScarf',
          bookingDraft.desertGoggles && 'desertGoggles',
          bookingDraft.privateSafari && 'privateSafari',
          bookingDraft.camelRide30min && 'camelRide30min',
          bookingDraft.horseRide1hr && 'horseRide1hr',
          bookingDraft.telescopeStargazing && 'telescopeStargazing'
        ].filter(Boolean),
        selectedExtrasDetails,
        specialRequests: formData.specialRequests,
        totalPrice,
        paymentMethod
      };

      const result = await bookingsApi.createBooking(bookingPayload);
      if (result.success) {
        showToast(isAr ? 'تم تأكيد حجزك بنجاح! جاري التوجيه لإيصال الحجز...' : 'Booking successfully placed! Redirecting to confirmation...', 'success');
        navigate(`/booking-confirmation?ref=${encodeURIComponent(result.data.bookingReference || result.data.bookingRef)}`, { state: { booking: result.data } });
      }
    } catch (err) {
      showToast(isAr ? 'تعذر إكمال الحجز، يرجى التواصل عبر الواتساب.' : 'Booking failed. Please contact us via WhatsApp.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? "إتمام الحجز وتأكيد الرحلة | مجموعة الهنا" : "Checkout & Reserve | El Hana Group Sharm"}
        description={isAr ? "أكمل حجز رحلة السفاري أو اليخت بشرم الشيخ مع إمكانية الدفع عند الوصول دون عربون." : "Complete your Sharm El Sheikh desert safari or Red Sea tour reservation with pay on arrival option."}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        <Breadcrumbs items={[{ label: isAr ? "إتمام الحجز والتأكيد" : "Checkout & Reserve" }]} />

        {/* Page Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7] font-bold text-xs uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-4 h-4" /> {isAr ? "حجز فوري ومضمون 100%" : "Instant & Secure Reservation"}
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-heading text-slate-900 leading-tight">
            {isAr ? "أكمل تفاصيل تأكيد حجزك" : "Complete Your Reservation"}
          </h1>
          <p className="text-xs md:text-sm text-slate-600 font-normal">
            {isAr ? "لا يلزم مقدم دفع لخيار الدفع عند الوصول. تأكيد فوري عبر الواتساب والرسائل." : "No deposit needed for Cash on Arrival. Instant SMS & WhatsApp confirmation."}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            
            <form onSubmit={handleSubmit(onSubmitBooking)} className="space-y-6">
              
              {/* Lead Traveler Info */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-4">
                <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#0284C7] text-white text-xs font-bold flex items-center justify-center">1</span>
                  {t('checkout.leadTraveler')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('checkout.fullName')} *</label>
                    <input
                      type="text"
                      {...register('fullName', { required: true, minLength: 2, maxLength: 120 })}
                      placeholder={isAr ? "أحمد محمود" : "Alexander Petrov"}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-[#0284C7]"
                    />
                    {errors.fullName && <p className="text-[10px] text-red-500">{isAr ? 'الاسم مطلوب' : 'Full name is required'}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('checkout.email')} *</label>
                    <input
                      type="email"
                      {...register('email', { required: true, maxLength: 254, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                      placeholder="alexander@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-[#0284C7]"
                    />
                    {errors.email && <p className="text-[10px] text-red-500">{isAr ? 'البريد مطلوب' : 'Email is required'}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('checkout.whatsapp')} *</label>
                    <input
                      type="tel"
                      {...register('whatsapp', { required: true, pattern: /^\+?[0-9\s().-]{7,20}$/ })}
                      placeholder="+20 100 123 4567"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-[#0284C7]"
                    />
                    {errors.whatsapp && <p className="text-[10px] text-red-500">{isAr ? 'رقم الواتساب مطلوب' : 'WhatsApp number is required'}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('checkout.hotelName')} *</label>
                    <input
                      type="text"
                      list="sharm-hotels-datalist"
                      {...register('hotelName', { required: true })}
                      placeholder={isAr ? "مثال: فندق ريكسوس، الباتروس، سلطان جاردنز..." : "e.g. Rixos Seagate, Sultan Gardens..."}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-[#0284C7]"
                    />
                    <datalist id="sharm-hotels-datalist">
                      {SHARM_HOTELS.map((h) => (
                        <option key={h.id} value={isAr ? h.nameAr : h.name} />
                      ))}
                    </datalist>
                    {errors.hotelName && <p className="text-[10px] text-red-500">{isAr ? 'اسم الفندق مطلوب للتوصيل' : 'Hotel name is required for pickup'}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('checkout.roomNumber')}</label>
                    <input
                      type="text"
                      {...register('roomNumber')}
                      placeholder={isAr ? "مثال: غرفة 402" : "e.g. Room 402"}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-[#0284C7]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('checkout.specialRequests')}</label>
                    <input
                      type="text"
                      {...register('specialRequests')}
                      placeholder={isAr ? "عشاء نباتي، كرسي أطفال..." : "e.g. Vegetarian dinner, child seat..."}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-[#0284C7]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Choice */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-4">
                <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#0284C7] text-white text-xs font-bold flex items-center justify-center">2</span>
                  {t('checkout.paymentMethod')}
                </h3>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod('cash_arrival')}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === 'cash_arrival'
                        ? 'bg-slate-900 text-white border-[#0284C7] shadow-lg'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cash_arrival'}
                        onChange={() => setPaymentMethod('cash_arrival')}
                        className="accent-[#0284C7]"
                      />
                      <div>
                        <div className="font-bold text-sm">{t('checkout.payCash')}</div>
                        <div className="text-[11px] opacity-80 font-normal">{isAr ? "الدفع للمندوب بالدولار أو اليورو أو الجنيه عند التوصيل." : "Pay driver in USD, EUR, GBP, or EGP upon hotel pickup."}</div>
                      </div>
                    </div>
                    <DollarSign className="w-5 h-5 text-[#38BDF8]" />
                  </label>
                  <p className="text-xs text-slate-500">{isAr ? "الدفع الإلكتروني بالبطاقات متاح عند الطلب، اختر الدفع كاش عند الوصول لسهولة وسرعة التأكيد." : "Online card payments are temporarily unavailable. Choose cash on arrival."}</p>
                </div>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                className="w-full py-4 text-base shadow-xl"
                icon={Sparkles}
              >
                {submitting ? (isAr ? 'جاري تأكيد الحجز...' : 'Confirming Reservation...') : `${t('checkout.confirmBooking')} (${formatPrice(totalPrice)})`}
              </Button>

            </form>

          </div>

          {/* Right Summary Card */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-sky-400/30 shadow-2xl space-y-4 sticky top-24">
              <h3 className="text-lg font-bold font-heading text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#38BDF8]" /> {t('checkout.orderSummary')}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">{isAr ? "الخدمة / المغامرة" : "Activity / Service"}</span>
                  <span className="font-extrabold text-white text-sm">
                    {isTransfer
                      ? `Transfer: ${transferData?.pickup} → ${transferData?.dropoff}`
                      : (experience?.title || (bookingDraft.camelDuration ? (isAr ? 'جولة ركوب الجمال في الصحراء' : 'Desert Camel Riding') : (bookingDraft.horseDuration ? (isAr ? 'جولة ركوب الخيل العربي في سيناء' : 'Sinai Horse Riding') : 'ATV Quad Safari')))}
                  </span>
                  {bookingDraft.camelDuration && (
                    <span className="text-[11px] text-amber-300 font-bold block mt-0.5">
                      {isAr ? `🐪 المدة: ${bookingDraft.camelDuration === '30min' ? '30 دقيقة ($10/شخص)' : 'ساعة كاملة ($20/شخص)'}` : `🐪 Duration: ${bookingDraft.camelDuration === '30min' ? '30 Mins ($10/person)' : '1 Hour ($20/person)'}`}
                    </span>
                  )}
                  {bookingDraft.horseDuration && (
                    <span className="text-[11px] text-[#38BDF8] font-bold block mt-0.5">
                      {isAr ? `🐎 المدة: ${bookingDraft.horseDuration === '30min' ? '30 دقيقة ($15/شخص)' : 'ساعة كاملة ($25/شخص)'}` : `🐎 Duration: ${bookingDraft.horseDuration === '30min' ? '30 Mins ($15/person)' : '1 Hour ($25/person)'}`}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center py-2 border-y border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" /> {isAr ? "تاريخ الرحلة" : "Selected Date"}
                  </span>
                  <span className="font-bold text-white">
                    {isTransfer ? transferData?.date : bookingDraft.date}
                  </span>
                </div>

                {!isTransfer && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#38BDF8]" /> {isAr ? "موعد الاستقبال" : "Pickup Time"}
                    </span>
                    <span className="font-bold text-white">{bookingDraft.timeSlot || '08:30 AM'}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#38BDF8]" /> {isAr ? "المسافرون" : "Travelers"}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-bold text-white">
                      {isTransfer
                        ? `${transferData?.passengers} ${isAr ? "ركاب" : "Passengers"}`
                        : `${bookingDraft.adults || 1} ${isAr ? "بالغ" : "Adult(s)"}${bookingDraft.children > 0 ? ` ، ${bookingDraft.children} ${isAr ? "أطفال" : "Child(ren)"}` : ''}`}
                    </span>
                    {(!isTransfer && (bookingDraft.singleVehicles > 0 || bookingDraft.doubleVehicles > 0)) && (
                      <span className="text-[10px] text-slate-300 font-semibold bg-slate-800 px-2 py-0.5 rounded-full">
                        {bookingDraft.doubleVehicles > 0 && `${bookingDraft.doubleVehicles} ${isAr ? 'دبل' : 'Double Quad'}`}
                        {(bookingDraft.singleVehicles > 0 && bookingDraft.doubleVehicles > 0) && ' | '}
                        {bookingDraft.singleVehicles > 0 && `${bookingDraft.singleVehicles} ${isAr ? 'سنجل' : 'Single Quad'}`}
                      </span>
                    )}
                  </div>
                </div>

                {!isTransfer && (
                  <div className="flex flex-col py-2 border-b border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" /> {isAr ? 'الإضافات المختارة' : 'Selected Extras'}
                    </span>
                    <div className="font-bold text-white text-[11px] flex flex-col gap-1">
                      {bookingDraft.bedouinPartyOption === 'vip_dinner' && <span className="text-amber-400">+ {isAr ? '👑 عشاء VIP فاخر مع السفاري ($18)' : '👑 VIP Bedouin Dinner ($18)'}</span>}
                      {(bookingDraft.bedouinPartyOption === 'standard_dinner' || bookingDraft.bedouinPartyOption === 'with_safari') && <span className="text-orange-300">+ {isAr ? '🏕️ عشاء بدوي عادي مع السفاري ($10)' : '🏕️ Standard Bedouin Dinner ($10)'}</span>}
                      {bookingDraft.privateTransfer && <span>+ {isAr ? 'سيارة توصيل خاصة VIP' : 'Private VIP Transfer'}</span>}
                      {bookingDraft.photoVideoPackage && <span>+ {isAr ? 'ألبوم صور وفيديو تصوير احترافي' : 'GoPro HD Photos & Video'}</span>}
                      {bookingDraft.bedouinScarf && <span>+ {isAr ? 'شال بدوي صحراوي (إسكارف)' : 'Bedouin Desert Scarf'}</span>}
                      {bookingDraft.desertGoggles && <span>+ {isAr ? 'نظارة صحراوية لحماية العين من الرمال' : 'Desert Protection Goggles'}</span>}
                      {bookingDraft.privateSafari && <span>+ {isAr ? 'جولة سفاري خاصة بالكامل (Private Tour)' : 'Private Safari Tour Upgrade'}</span>}
                      {bookingDraft.camelRide30min && <span className="text-amber-300">+ {isAr ? '🐪 جولة جمال صحراوية (30 دقيقة)' : '🐪 30-Min Camel Ride'}</span>}
                      {bookingDraft.horseRide1hr && <span className="text-amber-300">+ {isAr ? '🐎 جولة خيل عربي (ساعة كاملة)' : '🐎 1-Hour Horse Ride'}</span>}
                      {bookingDraft.telescopeStargazing && <span className="text-sky-300">+ {isAr ? '🔭 تلسكوب ورؤية النجوم' : '🔭 Telescope Stargazing'}</span>}
                      {(!bookingDraft.privateTransfer && !bookingDraft.photoVideoPackage && !bookingDraft.bedouinScarf && !bookingDraft.desertGoggles && !bookingDraft.privateSafari && !bookingDraft.camelRide30min && !bookingDraft.horseRide1hr && !bookingDraft.telescopeStargazing && bookingDraft.bedouinPartyOption === 'none') && (
                        <span className="text-slate-500">{isAr ? 'لا يوجد إضافات' : 'None'}</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-3 flex justify-between items-baseline border-t border-slate-700">
                  <span className="text-xs uppercase font-extrabold text-[#38BDF8]">{isAr ? "إجمالي المبلغ" : "Total Amount"}</span>
                  <span className="text-3xl font-black text-white font-heading">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 space-y-1 font-normal">
                <div className="flex items-center gap-1.5 text-[#25D366]">
                  <Check className="w-4 h-4" /> {isAr ? "توصيل واستقبال مجاني من الفندق" : "Free Hotel Pickup & Dropoff"}
                </div>
                <div className="flex items-center gap-1.5 text-[#25D366]">
                  <Check className="w-4 h-4" /> {isAr ? "إلغاء مجاني ودفع عند الوصول" : "Free Cancellation & Pay on Arrival"}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
