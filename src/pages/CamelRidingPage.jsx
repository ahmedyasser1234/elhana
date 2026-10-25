import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { useBooking } from '../context/BookingContext';
import { useCurrency } from '../context/CurrencyContext';
import { getWhatsAppLink } from '../components/common/WhatsAppButton';
import {
  CheckCircle2, ShieldCheck, Clock, MapPin, Star, Sparkles,
  Plus, Minus, Check, Users, Calendar
} from 'lucide-react';

const CAMEL_IMAGES = [
  '/images/real/camel-riding-hero.jpg',
  '/images/real/camel-caravan.jpg',
  '/images/real/bedouin-hero.jpg',
];

export const CamelRidingPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const { formatPrice } = useCurrency();

  const [activeImg, setActiveImg] = useState(0);

  // Booking State
  const [duration, setDuration] = useState('1hr'); // '30min' | '1hr'
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState(isAr ? '08:00 صباحاً' : '08:00 AM');
  const [hotel, setHotel] = useState('');
  const [privateTransfer, setPrivateTransfer] = useState(false);
  const [photoPackage, setPhotoPackage] = useState(false);

  const price30min = 10;
  const price1hr = 20;
  const unitPrice = duration === '30min' ? price30min : price1hr;
  const totalPeople = adults + children;
  const ridingTotal = unitPrice * totalPeople;
  const transferCost = totalPeople < 6 ? 18 : 24;
  const extrasTotal = (privateTransfer ? transferCost : 0) + (photoPackage ? 15 : 0);
  const grandTotal = ridingTotal + extrasTotal;

  const timeSlots = isAr
    ? ['08:00 صباحاً', '10:00 صباحاً', '04:00 مساءً (الغروب)', '05:30 مساءً (الغروب)']
    : ['08:00 AM', '10:00 AM', '04:00 PM (Sunset)', '05:30 PM (Sunset)'];

  const highlights = isAr ? [
    'جمال مدربة وأليفة مع مربين بدو محترفين',
    'مناسبة لجميع الأعمار والمستويات',
    'مسارات صحراوية وادية خلابة',
    'خوذات أمان وتجهيزات مناسبة',
    'مرشد بدوي محترف طوال الرحلة',
    'فرصة للتصوير مع الجمال',
  ] : [
    'Well-trained friendly camels with expert Bedouin handlers',
    'Suitable for all ages and experience levels',
    'Scenic desert valley trails',
    'Safety gear and appropriate equipment',
    'Professional Bedouin guide throughout',
    'Great photo opportunities with camels',
  ];

  const handleBook = () => {
    const camelExp = {
      id: 'camel-standalone',
      slug: 'camel-riding-standalone',
      title: isAr ? 'ركوب الجمال في الصحراء' : 'Desert Camel Riding',
      category: 'camel',
      startingPrice: unitPrice,
      currency: 'USD',
    };
    updateBooking({
      experience: camelExp,
      date,
      timeSlot,
      adults,
      children,
      hotelName: hotel,
      privateTransfer,
      photoVideoPackage: photoPackage,
      camelDuration: duration,
      totalPrice: grandTotal,
    });
    navigate('/checkout');
  };

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F97316]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-400/8 rounded-full blur-[120px] pointer-events-none" />

      <SEOHead
        title={isAr ? 'ركوب الجمال في شرم الشيخ | مجموعة الهنا' : 'Camel Riding Sharm El Sheikh | El Hana Group'}
        description={isAr
          ? 'استمتع بجولة ركوب الجمال الصحراوية الأصيلة في شرم الشيخ. اختر بين نصف ساعة بـ 10$ أو ساعة كاملة بـ 20$ فقط مع مرشد بدوي محترف.'
          : 'Enjoy an authentic desert camel riding experience in Sharm El Sheikh. Choose 30 minutes for $10 or 1 full hour for $20 with a professional Bedouin guide.'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 min-h-[400px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-10 md:p-14 border border-amber-400/20 shadow-2xl">
          <img
            src={CAMEL_IMAGES[activeImg]}
            alt={isAr ? 'ركوب الجمال بالصحراء' : 'Desert Camel Riding'}
            onError={(e) => { e.target.onerror = null; e.target.src = '/images/real/camel-caravan.jpg'; }}
            className="absolute inset-0 w-full h-full object-cover object-center brightness-75 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/10" />

          <div className="relative z-10">
            <Breadcrumbs items={[{ label: isAr ? 'رحلات السفاري' : 'Safari Tours', link: '/safari' }, { label: isAr ? 'ركوب الجمال' : 'Camel Riding' }]} variant="hero" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-300 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'وسيلة النقل البدوية التاريخية' : 'Traditional Desert Transport'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading leading-tight">
              {isAr ? 'ركوب الجمال في الصحراء' : 'Desert Camel Riding'}
            </h1>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium">
              {isAr
                ? 'تجربة أصيلة لركوب الجمال في قلب صحراء سيناء مع مربين بدو محترفين — اختر المدة التي تناسبك.'
                : 'An authentic camel riding experience in the heart of Sinai desert with expert Bedouin handlers — choose your preferred duration.'}
            </p>

            {/* Price Pills in Hero */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-2.5">
                <Clock className="w-4 h-4 text-amber-300" />
                <div>
                  <div className="text-[10px] text-amber-200 font-bold uppercase">{isAr ? 'نصف ساعة' : '30 Minutes'}</div>
                  <div className="text-xl font-black text-white">{formatPrice(10)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-amber-500/25 backdrop-blur-md border border-amber-400/50 rounded-2xl px-4 py-2.5">
                <Clock className="w-4 h-4 text-amber-300" />
                <div>
                  <div className="text-[10px] text-amber-200 font-bold uppercase">{isAr ? 'ساعة كاملة' : '1 Full Hour'}</div>
                  <div className="text-xl font-black text-white">{formatPrice(20)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Nav */}
          <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 flex gap-2 z-10">
            {CAMEL_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${activeImg === idx ? 'bg-amber-400 scale-125' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: <Clock className="w-5 h-5" />, label: isAr ? 'المدة' : 'Duration', value: isAr ? '30 د أو ساعة' : '30 Min or 1 Hr', color: 'text-amber-600 bg-amber-50 border-amber-100' },
            { icon: <MapPin className="w-5 h-5" />, label: isAr ? 'الموقع' : 'Location', value: isAr ? 'صحراء سيناء' : 'Sinai Desert', color: 'text-orange-600 bg-orange-50 border-orange-100' },
            { icon: <Star className="w-5 h-5" />, label: isAr ? 'التقييم' : 'Rating', value: '4.85 ★', color: 'text-yellow-600 bg-yellow-50 border-yellow-100' },
            { icon: <Users className="w-5 h-5" />, label: isAr ? 'مناسب لـ' : 'Suitable', value: isAr ? 'جميع الأعمار' : 'All Ages', color: 'text-sky-600 bg-sky-50 border-sky-100' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${stat.color}`}>{stat.icon}</div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{stat.label}</div>
                <div className="text-sm font-extrabold text-slate-900">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content + Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Overview */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-5">
              <h2 className="text-2xl font-black font-heading text-slate-900">
                {isAr ? 'تفاصيل جولة ركوب الجمال' : 'Camel Riding Tour Details'}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? 'اصعد على ظهر جمل أصيل مدرب وانطلق في جولة صحراوية ساحرة بمرافقة مربين بدو متمرسين. نقدم لك خيارين مرنين: جولة نصف ساعة مثالية للتذوق السريع بسعر 10$ فقط، أو جولة ساعة كاملة لمن يرغب في التعمق في تجربة الصحراء والتصوير الاحترافي بسعر 20$.'
                  : 'Mount a well-trained authentic camel and embark on an enchanting desert tour with experienced Bedouin handlers. We offer two flexible options: a 30-minute quick taste tour for just $10, or a full 1-hour immersive experience for deep desert exploration and professional photography for $20.'}
              </p>

              {/* Duration Pricing Cards */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">{isAr ? 'باقات الأسعار' : 'Pricing Packages'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">{isAr ? 'نصف ساعة' : '30 Minutes'}</span>
                      <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="text-3xl font-black text-amber-900">{formatPrice(10)}</div>
                    <div className="text-xs text-amber-700 font-medium">{isAr ? 'للشخص الواحد — جولة قصيرة مميزة' : 'Per person – Quick scenic ride'}</div>
                    <ul className="text-xs text-amber-800 space-y-1 pt-1">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" />{isAr ? 'جمل مع مرشد بدوي' : 'Camel with Bedouin guide'}</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" />{isAr ? 'مسار صحراوي قصير' : 'Short desert trail'}</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" />{isAr ? 'فرصة تصوير' : 'Photo opportunity'}</li>
                    </ul>
                  </div>

                  <div className="relative rounded-2xl border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-amber-50 p-5 space-y-2 shadow-md">
                    <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">{isAr ? 'الأكثر طلباً' : 'Most Popular'}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full">{isAr ? 'ساعة كاملة' : '1 Full Hour'}</span>
                      <Sparkles className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="text-3xl font-black text-orange-900">{formatPrice(20)}</div>
                    <div className="text-xs text-orange-700 font-medium">{isAr ? 'للشخص الواحد — تجربة كاملة' : 'Per person – Full experience'}</div>
                    <ul className="text-xs text-orange-800 space-y-1 pt-1">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" />{isAr ? 'جمل مع مرشد بدوي' : 'Camel with Bedouin guide'}</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" />{isAr ? 'مسار وادي وجبال صحراء سيناء' : 'Desert valley & mountain trail'}</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" />{isAr ? 'شاي بدوي في نهاية الجولة' : 'Bedouin tea at end of tour'}</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" />{isAr ? 'تصوير احترافي' : 'Professional photos'}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">{isAr ? 'أبرز مميزات الجولة' : 'Tour Highlights'}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Included / Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {isAr ? 'المشمول في الرحلة' : "What's Included"}
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {(isAr ? [
                    'الانتقال من وإلى الفندق مجاناً بسيارة مكيفة',
                    'جمل مدرب أليف مع مربي بدوي محترف',
                    'مرشد صحراوي محترف طوال الجولة',
                    'جميع الضرائب ورسوم الخدمة',
                    'الشاي البدوي في الخيمة (في جولة الساعة)'
                  ] : [
                    'Free air-conditioned hotel pickup & drop-off',
                    'Gentle trained camel with Bedouin handler',
                    'Professional desert guide throughout',
                    'All taxes & service fees',
                    'Bedouin tea at tent (included in 1-hr tour)'
                  ]).map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-red-100 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-400" /> {isAr ? 'غير مشمول' : "What's Excluded"}
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {(isAr ? [
                    'التصوير الاحترافي والألبوم (اختياري)',
                    'المشروبات والأطعمة الإضافية',
                    'الشاي البدوي في جولة نصف ساعة'
                  ] : [
                    'Professional photo album (optional)',
                    'Extra food and drinks',
                    'Bedouin tea in 30-min tour'
                  ]).map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safety */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-3 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                {isAr ? 'تعليمات السلامة والأمان' : 'Safety Guidelines'}
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {(isAr ? [
                  'جميع الجمال أليفة ومدربة ومصحوبة بمربين بدو',
                  'الوزن الأقصى للراكب 110 كجم',
                  'غير موصى بها للحوامل أو مشاكل الظهر الحادة',
                  'ارتداء ملابس مريحة وحذاء مناسب',
                ] : [
                  'All camels are gentle, trained & with Bedouin handlers',
                  'Maximum rider weight: 110 kg',
                  'Not recommended for pregnant women or severe back issues',
                  'Wear comfortable clothes and appropriate footwear',
                ]).map((item, i) => <li key={i}>• {item}</li>)}
              </ul>
            </div>
          </div>

          {/* Right: Booking Widget */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5">

              {/* Header */}
              <div className="pb-4 border-b border-slate-100">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{isAr ? 'ابدأ من' : 'Starting From'}</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900">{formatPrice(10)}</span>
                  <span className="text-xs text-slate-500 font-semibold">/ {isAr ? 'شخص' : 'person'}</span>
                </div>
                <div className="inline-block mt-2 bg-sky-100 text-sky-700 border border-sky-200 px-3 py-0.5 rounded-full text-xs font-extrabold">{isAr ? 'أفضل سعر مضمّن' : 'Best Price Guaranteed'}</div>
              </div>

              {/* Duration Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">{isAr ? 'مدة الجولة' : 'Ride Duration'}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDuration('30min')}
                    className={`p-3 rounded-xl border-2 text-center transition ${duration === '30min' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                  >
                    <div className="text-xs font-black text-slate-900">{isAr ? 'نصف ساعة' : '30 Minutes'}</div>
                    <div className="text-lg font-black text-amber-600">{formatPrice(10)}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">{isAr ? 'للشخص' : 'per person'}</div>
                  </button>
                  <button
                    onClick={() => setDuration('1hr')}
                    className={`p-3 rounded-xl border-2 text-center transition relative ${duration === '1hr' ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                  >
                    {duration === '1hr' && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full whitespace-nowrap">{isAr ? 'الأكثر طلباً' : 'Popular'}</div>}
                    <div className="text-xs font-black text-slate-900">{isAr ? 'ساعة كاملة' : '1 Full Hour'}</div>
                    <div className="text-lg font-black text-orange-600">{formatPrice(20)}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">{isAr ? 'للشخص' : 'per person'}</div>
                  </button>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{isAr ? 'تاريخ الجولة' : 'Tour Date'}</label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Time Slots */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{isAr ? 'الموعد المتاح' : 'Available Time'}</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {timeSlots.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setTimeSlot(t)}
                      className={`px-2 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-between gap-1 ${timeSlot === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                    >
                      <span>{t}</span>
                      {timeSlot === t && <Check className="w-3 h-3 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">{isAr ? 'البالغون' : 'Adults'}</label>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="flex-1 text-center text-sm font-extrabold text-slate-900">{adults}</span>
                    <button onClick={() => setAdults(adults + 1)} className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">{isAr ? 'الأطفال' : 'Children'}</label>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="flex-1 text-center text-sm font-extrabold text-slate-900">{children}</span>
                    <button onClick={() => setChildren(children + 1)} className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>

              {/* Hotel */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{isAr ? 'اسم الفندق' : 'Hotel Name'}</label>
                <input
                  type="text"
                  placeholder={isAr ? 'مثال: ريكسوس، فور سيزونز...' : 'e.g. Rixos, Four Seasons...'}
                  value={hotel}
                  onChange={(e) => setHotel(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Extras */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{isAr ? 'إضافات اختيارية' : 'Optional Extras'}</label>
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={privateTransfer} onChange={(e) => setPrivateTransfer(e.target.checked)} className="w-4 h-4 accent-amber-500 rounded" />
                    <span className="text-xs font-semibold text-slate-800">{isAr ? 'توصيل خاص VIP من الفندق' : 'Private VIP Hotel Transfer'}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">+{formatPrice(transferCost)}</span>
                </label>
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={photoPackage} onChange={(e) => setPhotoPackage(e.target.checked)} className="w-4 h-4 accent-amber-500 rounded" />
                    <span className="text-xs font-semibold text-slate-800">{isAr ? 'ألبوم صور وفيديو احترافي' : 'HD Photos & Video Package'}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">+{formatPrice(15)}</span>
                </label>
              </div>

              {/* Total */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{isAr ? `جولة ${duration === '30min' ? 'نصف ساعة' : 'ساعة'} × ${totalPeople} شخص` : `${duration === '30min' ? '30-min' : '1-hr'} ride × ${totalPeople} persons`}</span>
                  <span>{formatPrice(ridingTotal)}</span>
                </div>
                {extrasTotal > 0 && (
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{isAr ? 'الإضافات المختارة' : 'Selected extras'}</span>
                    <span>+{formatPrice(extrasTotal)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-700 flex justify-between items-baseline">
                  <span className="text-xs uppercase font-bold text-amber-400">{isAr ? 'الإجمالي' : 'Total'}</span>
                  <span className="text-2xl font-black text-white">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-2.5">
                <button
                  onClick={handleBook}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/25 hover:scale-[1.02] transition-all"
                >
                  {isAr ? 'احجز الرحلة الآن' : 'Book Now'}
                </button>
                <a
                  href={getWhatsAppLink(`${isAr ? 'مرحباً، أريد حجز جولة ركوب جمال' : 'Hello! I want to book a camel riding tour'} - ${duration === '30min' ? '30 min' : '1 Hour'} - ${adults} adults, ${children} kids - ${date}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 font-bold text-xs rounded-xl hover:bg-[#25D366] hover:text-white transition"
                >
                  {isAr ? 'استفسر عبر واتساب' : 'Ask on WhatsApp'}
                </a>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-semibold">
                <span>{isAr ? 'إلغاء مجاني' : 'Free Cancellation'}</span>
                <span>•</span>
                <span>{isAr ? 'الدفع عند الوصول' : 'Pay on Arrival'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="pt-4 space-y-6">
          <FAQAccordion category="safari" showSearch={false} />
        </div>
      </div>
    </div>
  );
};

export default CamelRidingPage;
