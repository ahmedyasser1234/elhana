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

const HORSE_IMAGES = [
  '/images/real/horse-riding-hero.jpg',
  '/images/real/camel-caravan.jpg',
  '/images/real/family-buggy-ride.jpg',
];

export const HorseRidingPage = () => {
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
  const [timeSlot, setTimeSlot] = useState(isAr ? '07:00 صباحاً' : '07:00 AM');
  const [hotel, setHotel] = useState('');
  const [privateTransfer, setPrivateTransfer] = useState(false);
  const [photoPackage, setPhotoPackage] = useState(false);

  const price30min = 15;
  const price1hr = 25;
  const unitPrice = duration === '30min' ? price30min : price1hr;
  const totalPeople = adults + children;
  const ridingTotal = unitPrice * totalPeople;
  const transferCost = totalPeople < 6 ? 18 : 24;
  const extrasTotal = (privateTransfer ? transferCost : 0) + (photoPackage ? 15 : 0);
  const grandTotal = ridingTotal + extrasTotal;

  const timeSlots = isAr
    ? ['07:00 صباحاً (الصباح الباكر)', '09:00 صباحاً', '04:30 مساءً (الغروب)', '05:30 مساءً (الغروب)']
    : ['07:00 AM (Early Morning)', '09:00 AM', '04:30 PM (Sunset)', '05:30 PM (Sunset)'];

  const highlights = isAr ? [
    'خيول عربية أصيلة مدربة ومطيعة',
    'مدرب خيل محترف طوال الرحلة',
    'مسارات صحراوية وساحلية خلابة',
    'مناسبة للمبتدئين والمحترفين',
    'خوذات أمان وتجهيزات مناسبة',
    'فرصة تصوير بمناظر طبيعية رائعة',
  ] : [
    'Purebred trained Arabian horses',
    'Professional riding instructor throughout',
    'Scenic desert and coastal trails',
    'Suitable for beginners and experienced riders',
    'Safety helmets and appropriate gear',
    'Stunning photography opportunities',
  ];

  const handleBook = () => {
    const horseExp = {
      id: 'horse-standalone',
      slug: 'horse-riding-standalone',
      title: isAr ? 'ركوب الخيل في سيناء' : 'Sinai Horse Riding',
      category: 'horse',
      startingPrice: unitPrice,
      currency: 'USD',
    };
    updateBooking({
      experience: horseExp,
      date,
      timeSlot,
      adults,
      children,
      hotelName: hotel,
      privateTransfer,
      photoVideoPackage: photoPackage,
      horseDuration: duration,
      totalPrice: grandTotal,
    });
    navigate('/checkout');
  };

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-sky-50/50 via-white to-indigo-50/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0284C7]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/8 rounded-full blur-[120px] pointer-events-none" />

      <SEOHead
        title={isAr ? 'ركوب الخيل في شرم الشيخ | مجموعة الهنا' : 'Horse Riding Sharm El Sheikh | El Hana Group'}
        description={isAr
          ? 'استمتع بركوب الخيول العربية الأصيلة في شرم الشيخ. اختر بين نصف ساعة بـ 15$ أو ساعة كاملة بـ 25$ مع مدرب خيل محترف.'
          : 'Enjoy purebred Arabian horse riding in Sharm El Sheikh. Choose 30 minutes for $15 or 1 full hour for $25 with a professional riding instructor.'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 min-h-[400px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-10 md:p-14 border border-sky-400/20 shadow-2xl">
          <img
            src={HORSE_IMAGES[activeImg]}
            alt={isAr ? 'ركوب الخيل في سيناء' : 'Sinai Horse Riding'}
            onError={(e) => { e.target.onerror = null; e.target.src = '/images/real/atv-quad-hero.png'; }}
            className="absolute inset-0 w-full h-full object-cover object-center brightness-70 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/55 to-transparent rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/10" />

          <div className="relative z-10">
            <Breadcrumbs items={[{ label: isAr ? 'رحلات السفاري' : 'Safari Tours', link: '/safari' }, { label: isAr ? 'ركوب الخيل' : 'Horse Riding' }]} variant="hero" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/25 border border-sky-400/50 text-sky-300 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'خيول عربية أصيلة مطيعة' : 'Purebred Arabian Horses'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading leading-tight">
              {isAr ? 'ركوب الخيل في سيناء' : 'Sinai Horse Riding'}
            </h1>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium">
              {isAr
                ? 'استمتع بمغامرة الفروسية على ظهر أجمل الخيول العربية الأصيلة عبر مسارات الصحراء والشاطئ — للمبتدئين والمحترفين.'
                : 'Experience the thrill of riding purebred Arabian horses across desert and coastal trails — for beginners and experienced riders alike.'}
            </p>

            {/* Price Pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-2.5">
                <Clock className="w-4 h-4 text-sky-300" />
                <div>
                  <div className="text-[10px] text-sky-200 font-bold uppercase">{isAr ? 'نصف ساعة' : '30 Minutes'}</div>
                  <div className="text-xl font-black text-white">{formatPrice(15)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-sky-500/25 backdrop-blur-md border border-sky-400/50 rounded-2xl px-4 py-2.5">
                <Clock className="w-4 h-4 text-sky-300" />
                <div>
                  <div className="text-[10px] text-sky-200 font-bold uppercase">{isAr ? 'ساعة كاملة' : '1 Full Hour'}</div>
                  <div className="text-xl font-black text-white">{formatPrice(25)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Nav */}
          <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 flex gap-2 z-10">
            {HORSE_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${activeImg === idx ? 'bg-sky-400 scale-125' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: <Clock className="w-5 h-5" />, label: isAr ? 'المدة' : 'Duration', value: isAr ? '30 د أو ساعة' : '30 Min or 1 Hr', color: 'text-sky-600 bg-sky-50 border-sky-100' },
            { icon: <MapPin className="w-5 h-5" />, label: isAr ? 'الموقع' : 'Location', value: isAr ? 'صحراء وشاطئ سيناء' : 'Desert & Coast', color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
            { icon: <Star className="w-5 h-5" />, label: isAr ? 'التقييم' : 'Rating', value: '4.90 ★', color: 'text-yellow-600 bg-yellow-50 border-yellow-100' },
            { icon: <Users className="w-5 h-5" />, label: isAr ? 'مناسب لـ' : 'Suitable', value: isAr ? 'مبتدئ ومحترف' : 'All Levels', color: 'text-orange-600 bg-orange-50 border-orange-100' },
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
                {isAr ? 'تفاصيل جولة ركوب الخيل' : 'Horse Riding Tour Details'}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? 'اصعد على ظهر خيل عربي أصيل مدرب واستمتع بمغامرة الفروسية الاحترافية في قلب الطبيعة الخلابة لشرم الشيخ. نقدم خيارين مرنين: نصف ساعة للراغبين في التذوق الرياضي السريع بسعر 15$ للشخص، أو ساعة كاملة للتجربة العميقة والتصوير الاحترافي عبر مسارات الصحراء والشاطئ بسعر 25$ للشخص.'
                  : 'Ride an authentic trained Arabian horse and enjoy a professional equestrian adventure in the breathtaking nature of Sharm El Sheikh. We offer two flexible options: 30 minutes for a quick taste at $15 per person, or a full hour for a deep experience and professional photography across desert and coastal trails at $25 per person.'}
              </p>

              {/* Duration Pricing Cards */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">{isAr ? 'باقات الأسعار' : 'Pricing Packages'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-indigo-50 p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700 bg-sky-100 px-2.5 py-1 rounded-full">{isAr ? 'نصف ساعة' : '30 Minutes'}</span>
                      <Clock className="w-5 h-5 text-sky-500" />
                    </div>
                    <div className="text-3xl font-black text-sky-900">{formatPrice(15)}</div>
                    <div className="text-xs text-sky-700 font-medium">{isAr ? 'للشخص الواحد — جولة خيل قصيرة' : 'Per person – Quick riding session'}</div>
                    <ul className="text-xs text-sky-800 space-y-1 pt-1">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-600" />{isAr ? 'خيل مع مدرب فروسية' : 'Horse with riding instructor'}</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-600" />{isAr ? 'مسار قصير آمن للمبتدئين' : 'Short safe trail for beginners'}</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-600" />{isAr ? 'خوذة أمان مشمولة' : 'Safety helmet included'}</li>
                    </ul>
                  </div>

                  <div className="relative rounded-2xl border-2 border-[#0284C7] bg-gradient-to-br from-sky-50 to-blue-50 p-5 space-y-2 shadow-md">
                    <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-[#0284C7] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">{isAr ? 'الأكثر طلباً' : 'Most Popular'}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">{isAr ? 'ساعة كاملة' : '1 Full Hour'}</span>
                      <Sparkles className="w-5 h-5 text-[#0284C7]" />
                    </div>
                    <div className="text-3xl font-black text-blue-900">{formatPrice(25)}</div>
                    <div className="text-xs text-blue-700 font-medium">{isAr ? 'للشخص الواحد — تجربة فروسية كاملة' : 'Per person – Full equestrian experience'}</div>
                    <ul className="text-xs text-blue-800 space-y-1 pt-1">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-600" />{isAr ? 'خيل مع مدرب فروسية' : 'Horse with riding instructor'}</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-600" />{isAr ? 'مسار صحراء + شاطئ خلاب' : 'Desert + scenic coastal trail'}</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-600" />{isAr ? 'خوذة ومعدات أمان كاملة' : 'Full safety helmet & gear'}</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-600" />{isAr ? 'شاي بدوي في نهاية الجولة' : 'Bedouin tea at end of tour'}</li>
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
                      <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
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
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />{isAr ? 'المشمول في الرحلة' : "What's Included"}
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {(isAr ? [
                    'الانتقال من وإلى الفندق مجاناً بسيارة مكيفة',
                    'خيل عربي مدرب مع مدرب فروسية محترف',
                    'خوذة أمان وتجهيزات ركوب كاملة',
                    'جميع الضرائب ورسوم الخدمة',
                    'الشاي البدوي في الخيمة (في جولة الساعة)'
                  ] : [
                    'Free air-conditioned hotel pickup & drop-off',
                    'Trained horse with professional riding instructor',
                    'Safety helmet & full riding gear',
                    'All taxes & service fees',
                    'Bedouin tea at tent (included in 1-hr tour)'
                  ]).map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-red-100 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-400" />{isAr ? 'غير مشمول' : "What's Excluded"}
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {(isAr ? [
                    'التصوير الاحترافي والفيديو (اختياري)',
                    'المشروبات والأطعمة الإضافية',
                    'الشاي البدوي في جولة نصف ساعة',
                    'حذاء الركوب (يُنصح بحذاء رياضي مغلق)'
                  ] : [
                    'Professional photo & video package (optional)',
                    'Extra food and drinks',
                    'Bedouin tea in 30-min tour',
                    'Riding boots (sneakers recommended)'
                  ]).map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safety */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-3 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 font-bold text-sky-300">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                {isAr ? 'تعليمات السلامة والأمان' : 'Safety Guidelines'}
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {(isAr ? [
                  'الخيول مطيعة ومدربة وتناسب المبتدئين تماماً',
                  'الخوذات إجبارية وتوفر مجاناً',
                  'يُنصح بارتداء بنطال طويل وحذاء رياضي مغلق',
                  'مدرب الفروسية يرافقك طوال الجولة',
                ] : [
                  'Horses are calm, trained & perfect for beginners',
                  'Helmets are mandatory & provided free',
                  'Long pants and closed shoes are recommended',
                  'Riding instructor accompanies you throughout',
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
                  <span className="text-3xl font-black text-slate-900">{formatPrice(15)}</span>
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
                    className={`p-3 rounded-xl border-2 text-center transition ${duration === '30min' ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                  >
                    <div className="text-xs font-black text-slate-900">{isAr ? 'نصف ساعة' : '30 Minutes'}</div>
                    <div className="text-lg font-black text-sky-600">{formatPrice(15)}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">{isAr ? 'للشخص' : 'per person'}</div>
                  </button>
                  <button
                    onClick={() => setDuration('1hr')}
                    className={`p-3 rounded-xl border-2 text-center transition relative ${duration === '1hr' ? 'border-[#0284C7] bg-sky-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                  >
                    {duration === '1hr' && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#0284C7] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full whitespace-nowrap">{isAr ? 'الأكثر طلباً' : 'Popular'}</div>
                    )}
                    <div className="text-xs font-black text-slate-900">{isAr ? 'ساعة كاملة' : '1 Full Hour'}</div>
                    <div className="text-lg font-black text-[#0284C7]">{formatPrice(25)}</div>
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Time Slots */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{isAr ? 'الموعد المتاح' : 'Available Time'}</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {timeSlots.map((ts, i) => (
                    <button
                      key={i}
                      onClick={() => setTimeSlot(ts)}
                      className={`px-2 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-between gap-1 ${timeSlot === ts ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                    >
                      <span className="truncate">{ts}</span>
                      {timeSlot === ts && <Check className="w-3 h-3 text-sky-400 shrink-0" />}
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
                    <button onClick={() => setAdults(adults + 1)} className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center hover:bg-[#0369A1] transition"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">{isAr ? 'الأطفال' : 'Children'}</label>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="flex-1 text-center text-sm font-extrabold text-slate-900">{children}</span>
                    <button onClick={() => setChildren(children + 1)} className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center hover:bg-[#0369A1] transition"><Plus className="w-3.5 h-3.5" /></button>
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Extras */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{isAr ? 'إضافات اختيارية' : 'Optional Extras'}</label>
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={privateTransfer} onChange={(e) => setPrivateTransfer(e.target.checked)} className="w-4 h-4 accent-sky-500 rounded" />
                    <span className="text-xs font-semibold text-slate-800">{isAr ? 'توصيل خاص VIP من الفندق' : 'Private VIP Hotel Transfer'}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">+{formatPrice(transferCost)}</span>
                </label>
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={photoPackage} onChange={(e) => setPhotoPackage(e.target.checked)} className="w-4 h-4 accent-sky-500 rounded" />
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
                  <span className="text-xs uppercase font-bold text-sky-400">{isAr ? 'الإجمالي' : 'Total'}</span>
                  <span className="text-2xl font-black text-white">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-2.5">
                <button
                  onClick={handleBook}
                  className="w-full py-3.5 bg-gradient-to-r from-[#0284C7] to-sky-500 hover:from-[#0369A1] hover:to-sky-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-sky-500/25 hover:scale-[1.02] transition-all"
                >
                  {isAr ? 'احجز الرحلة الآن' : 'Book Now'}
                </button>
                <a
                  href={getWhatsAppLink(`${isAr ? 'مرحباً، أريد حجز جولة ركوب خيل' : 'Hello! I want to book a horse riding tour'} - ${duration === '30min' ? '30 min' : '1 Hour'} - ${adults} adults, ${children} kids - ${date}`)}
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

export default HorseRidingPage;
