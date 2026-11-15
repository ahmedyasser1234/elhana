import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Rating } from '../components/common/Rating';
import { TransferCalculator } from '../components/transfers/TransferCalculator';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { GoogleMapLocation } from '../components/common/GoogleMapLocation';
import { useCurrency } from '../context/CurrencyContext';
import { getTourReviews } from '../data/reviews';
import { VEHICLE_TYPES, TRANSFER_GALLERY } from '../data/transfers';
import { 
  Car, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Users, 
  Briefcase, 
  Star, 
  Quote, 
  MessageSquarePlus, 
  CheckCircle2, 
  PlaneTakeoff, 
  ArrowRight,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const TransfersPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { formatPrice } = useCurrency();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVehicleId, setSelectedVehicleId] = useState(VEHICLE_TYPES[0].id);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Sync active gallery image when vehicle is chosen
  const handleSelectVehicle = (vId) => {
    setSelectedVehicleId(vId);
    const galIdx = TRANSFER_GALLERY.findIndex(g => g.vehicleId === vId);
    if (galIdx !== -1) {
      setActiveImageIdx(galIdx);
    }
  };

  const handleGalleryClick = (idx) => {
    setActiveImageIdx(idx);
    const item = TRANSFER_GALLERY[idx];
    if (item && item.vehicleId) {
      setSelectedVehicleId(item.vehicleId);
    }
  };

  const currentGalleryItem = TRANSFER_GALLERY[activeImageIdx] || TRANSFER_GALLERY[0];
  const reviews = getTourReviews('transfers', isAr ? 'انتقالات خاصة من مطار شرم الشيخ' : 'Private Airport Transfers');

  const scrollToCalculator = (vId) => {
    if (vId) {
      handleSelectVehicle(vId);
    }
    const elem = document.getElementById('transfer-booking-widget');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": isAr ? "خدمة الانتقالات الخاصة وتاكسي المطار في شرم الشيخ" : "Private Airport & Hotel Transfers Sharm El Sheikh",
    "description": isAr 
      ? "توصيل خاص VIP بين مطار شرم الشيخ وجميع الفنادق بأسعار ثابتة تشمل سيارات ليموزين، ميني فان 7 راكب، وتويوتا هاي إيس 14-15 راكب."
      : "Private VIP airport and hotel shuttle service in Sharm El Sheikh with limousines, 7-seater minivans, and 14-15 seater HiAce buses.",
    "provider": {
      "@type": "TravelAgency",
      "name": "El Hana Group Safari & Marine",
      "url": "https://www.elhanasafari.com"
    },
    "areaServed": "Sharm El Sheikh, Dahab, South Sinai",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.98",
      "reviewCount": "384"
    },
    "offers": {
      "@type": "Offer",
      "price": "20",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="pt-28 pb-24 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? "انتقالات خاصة VIP بين المطار وفنادق شرم الشيخ 24/7 | ليموزين، ميني فان، هاي إيس" : "VIP Private Airport & Hotel Transfers Sharm El Sheikh 24/7 | El Hana"}
        description={isAr 
          ? "احجز انتقالات خاصة من مطار شرم الشيخ الدولي لجميع الفنادق بأسعار ثابتة ومحددة مسبقاً. أسطول يضم ليموزين VIP، ميني فان 7 راكب، وتويوتا هاي إيس 14-15 راكب مع تتبع الطيران واستقبال باليافطة."
          : "Book private VIP airport and hotel transfers in Sharm El Sheikh. Fleet includes luxury limousines, 7-seater family minivans, and 14-15 seater Toyota HiAce with live flight tracking."}
        structuredData={structuredData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">

        {/* ── 1. TITLE HEADER ─────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5" />
              <span>{isAr ? "خدمة توصيل خاصة 24/7" : "24/7 Private Transfers"}</span>
            </span>
            <Rating score={4.98} count={384} />
            <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#F97316]" /> 
              <span>{isAr ? "مطار شرم الشيخ الدولي وجميع الفنادق" : "Sharm El Sheikh Airport & All Resorts"}</span>
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
            {isAr 
              ? "انتقالات خاصة VIP بين المطار وفنادق شرم الشيخ 24/7" 
              : "Private VIP Airport & Hotel Transfers in Sharm El Sheikh"}
          </h1>

          {/* Fixed Vehicle Pricing Clarity Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-300/80 text-amber-950 font-black text-xs sm:text-sm shadow-xs mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span>
              {isAr 
                ? 'السعر للمركبة بالكامل (وليس للفرد الواحد) — شامل السائق الخاص، الوقود، وتتبع مواعيد الطيران.' 
                : 'Price is per entire vehicle (not per person) — includes private chauffeur, fuel, and live flight tracking.'}
            </span>
          </div>
        </div>

        {/* ── 2. IMAGE GALLERY SHOWCASE WITH 3D SPHERES ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Main Active Vehicle Viewport */}
          <div className="lg:col-span-2 aspect-[16/9] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] rounded-3xl overflow-hidden shadow-xl bg-slate-950 border border-sky-100/90 relative group p-4 sm:p-6 flex flex-col justify-between [perspective:1200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIdx}
                initial={{ opacity: 0, rotateY: 75, scale: 0.8, filter: 'blur(8px)' }}
                animate={{ opacity: 1, rotateY: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, rotateY: -75, scale: 0.8, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={currentGalleryItem.image}
                  alt={isAr ? currentGalleryItem.titleAr : currentGalleryItem.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/40 pointer-events-none"></div>

            {/* Top Breadcrumbs */}
            <div className="relative z-10 flex items-center justify-between">
              <Breadcrumbs 
                items={[
                  { label: isAr ? 'الرئيسية' : 'Home', link: '/' }, 
                  { label: isAr ? 'الانتقالات وتوصيل المطار' : 'Transfers' }
                ]} 
                variant="hero" 
              />
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'عرض الصور مكبرة' : 'View Fullscreen'}</span>
              </button>
            </div>

            {/* Bottom Floating Info Pill for Active Vehicle */}
            <div className="relative z-10 bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0284C7] text-white text-[10px] font-black uppercase tracking-wider">
                    {isAr ? currentGalleryItem.badgeAr : currentGalleryItem.badgeEn}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">
                    {isAr ? currentGalleryItem.subtitleAr : currentGalleryItem.subtitleEn}
                  </span>
                </div>
                <h3 className="text-lg font-black font-heading text-white">
                  {isAr ? currentGalleryItem.titleAr : currentGalleryItem.titleEn}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-end">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    {isAr ? 'تبدأ من' : 'Starts from'}
                  </span>
                  <span className="text-2xl font-black text-[#38BDF8] font-heading">
                    {formatPrice(currentGalleryItem.price)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToCalculator(currentGalleryItem.vehicleId)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white text-xs font-black shadow-md transition cursor-pointer active:scale-95"
                >
                  {isAr ? 'احجز هذه الفئة' : 'Book This Class'}
                </button>
              </div>
            </div>

          </div>

          {/* Thumbnails Stack: 3D Spheres with Motion (Limousine, Minivan 7 pax, HiAce 14-15 pax, VIP SUV) */}
          <div className="flex flex-row lg:flex-col items-center justify-center gap-4 sm:gap-5 py-2 lg:py-0 [perspective:1000px] overflow-x-auto lg:overflow-visible">
            {TRANSFER_GALLERY.map((item, idx) => {
              const isActive = activeImageIdx === idx;
              return (
                <div key={item.id} className="flex flex-col items-center gap-1.5 shrink-0">
                  <motion.button
                    type="button"
                    onClick={() => handleGalleryClick(idx)}
                    whileHover={{ rotateY: 25, rotateX: -15, scale: 1.15, z: 20 }}
                    whileTap={{ scale: 0.9, rotateY: 180 }}
                    animate={{
                      y: isActive ? [0, -5, 0] : 0,
                      rotateY: isActive ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                      rotateY: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                      type: 'spring',
                      stiffness: 300,
                      damping: 18
                    }}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden transition-all duration-300 group/thumb shrink-0 shadow-2xl cursor-pointer ${
                      isActive
                        ? 'ring-4 ring-[#0284C7] ring-offset-2 ring-offset-white scale-110 shadow-[0_12px_30px_-3px_rgba(2,132,199,0.6)] z-10'
                        : 'ring-2 ring-slate-200/90 opacity-75 hover:opacity-100'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                    title={isAr ? item.titleAr : item.titleEn}
                    aria-label={isAr ? item.titleAr : item.titleEn}
                  >
                    {isActive && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                        className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#0284C7] via-[#38BDF8] to-[#F97316] opacity-70 blur-[4px] pointer-events-none"
                      />
                    )}
                    <img
                      src={item.thumb}
                      alt={isAr ? item.titleAr : item.titleEn}
                      className="w-full h-full object-cover rounded-full group-hover/thumb:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-black/70 pointer-events-none shadow-[inset_0_-8px_16px_rgba(0,0,0,0.65),inset_0_4px_8px_rgba(255,255,255,0.4)]" />
                    {isActive && (
                      <div className="absolute inset-0 rounded-full border-2 border-[#0284C7] bg-[#0284C7]/15 pointer-events-none" />
                    )}
                  </motion.button>
                  <span className={`text-[10px] font-black text-center max-w-[90px] leading-tight truncate ${isActive ? 'text-[#0284C7]' : 'text-slate-500'}`}>
                    {isAr ? item.badgeAr : item.badgeEn}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Mobile Transfer Calculator Direct Placement (Above fold on small screens) */}
        <div className="block lg:hidden">
          <TransferCalculator 
            selectedVehicleId={selectedVehicleId} 
            onSelectVehicle={handleSelectVehicle}
          />
        </div>

        {/* ── 3. MAIN CONTENT: 2 COLUMNS (DETAILS LEFT vs STICKY CALCULATOR RIGHT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Quick Stats Bar */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-sky-100 shadow-md grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-[#0284C7] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'المدة التقديرية' : 'Duration'}</span>
                  <span className="font-bold text-slate-900">{isAr ? '15 - 30 دقيقة' : '15 - 30 Mins'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-[#F97316] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'مكان التجمع' : 'Pickup Point'}</span>
                  <span className="font-bold text-slate-900">{isAr ? 'صالة المطار / الفندق' : 'Airport / Hotel Lobby'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'سياسة الإلغاء' : 'Cancellation'}</span>
                  <span className="font-bold text-slate-900">{isAr ? 'مجاني حتى 24س' : 'Free up to 24h'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-[#0284C7] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'تأكيد الحجز' : 'Confirmation'}</span>
                  <span className="font-bold text-slate-900">{isAr ? 'فوري مع السائق' : 'Instant WhatsApp'}</span>
                </div>
              </div>
            </div>

            {/* Overview / Description */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-4">
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                {isAr ? 'نظرة عامة على خدمة الانتقالات' : 'Transfer Service Overview'}
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                {isAr 
                  ? 'توفر مجموعة الهنا أسطولاً متكاملاً من أحدث السيارات الخاصة والمكيفة لتوصيلك من وإلى مطار شرم الشيخ الدولي، خليج نعمة، خليج نبق، الهضبة، رأس نصراني، ودهب وسانت كاترين. نعتمد نظام الأسعار الثابتة الشاملة بدون عداد أو مفاجآت، مع تتبع حي لمواعيد هبوط الطيران وسائق خاص يستقبلك في صالة الوصول حاملاً لافتة باسمك.'
                  : 'El Hana Group provides a premium private fleet of sanitized, air-conditioned vehicles connecting Sharm El Sheikh International Airport with all resorts in Naama Bay, Nabq, Hadaba, Ras Nasrani, and Dahab. We offer all-inclusive fixed rates without meters or surprises, featuring live flight monitoring and a chauffeur waiting at arrivals with your nameplate.'}
              </p>

              <h3 className="text-lg font-bold font-heading text-slate-900 pt-4">
                {isAr ? 'أبرز مميزات خدمة التوصيل' : 'Key Service Highlights'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-800">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F97316] shrink-0" />
                  <span>{isAr ? 'تتبع مواعيد الطيران حياً والانتظار حتى في حال التأخير' : 'Live flight status tracking with free delayed wait'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F97316] shrink-0" />
                  <span>{isAr ? '60 دقيقة انتظار مجاني داخل صالة المطار' : '60 minutes complimentary airport waiting time'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F97316] shrink-0" />
                  <span>{isAr ? 'استقبال خاص في صالة الوصول مع لافتة باسمك' : 'Personal meet & greet sign with your name'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F97316] shrink-0" />
                  <span>{isAr ? 'أسعار ثابتة تشمل السائق والوقود وبوابات المطار' : 'Guaranteed fixed rates including driver, fuel & tolls'}</span>
                </div>
              </div>
            </div>

            {/* Included vs Excluded (قوائم مرئية ومنظمة بعلامات ✓ و ✕) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-200/80 shadow-md space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shrink-0">
                    ✓
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider block">
                      {isAr ? 'مشمول في حجز المشوار' : 'Inclusive'}
                    </span>
                    <h4 className="text-base font-black text-slate-900 font-heading">
                      {isAr ? 'يشمل السعر:' : "What's Included:"}
                    </h4>
                  </div>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 font-semibold">
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center text-[11px] font-black shrink-0">✓</span>
                    <span>{isAr ? 'سيارة خاصة مكيفة بالكامل ونظيفة ومعقمة' : 'Private sanitized air-conditioned vehicle'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center text-[11px] font-black shrink-0">✓</span>
                    <span>{isAr ? 'سائق خاص محترف ومرخص بزي رسمي' : 'Licensed professional chauffeur in formal attire'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center text-[11px] font-black shrink-0">✓</span>
                    <span>{isAr ? 'تتبع رقم وموعد الرحلة الجوية حياً' : 'Live flight tracking and flight delay insurance'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center text-[11px] font-black shrink-0">✓</span>
                    <span>{isAr ? '60 دقيقة انتظار مجاني في المطار لإنهاء الحقائب' : '60 min free waiting time for baggage claim'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center text-[11px] font-black shrink-0">✓</span>
                    <span>{isAr ? 'استقبال بيافطة اسمك بصالة الوصول' : 'Meet & greet with personal nameplate sign'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center text-[11px] font-black shrink-0">✓</span>
                    <span>{isAr ? 'رسوم بوابات المطار ومواقف السيارات والوقود' : 'Airport parking, toll gates, and fuel included'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center text-[11px] font-black shrink-0">✓</span>
                    <span>{isAr ? 'مساعدة كاملة في نقل وتحميل الحقائب' : 'Full luggage handling and loading assistance'}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-rose-200/80 shadow-md space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-rose-100">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-black text-sm shrink-0">
                    ✕
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-rose-500 tracking-wider block">
                      {isAr ? 'إضافات ومصاريف اختيارية' : 'Not Included'}
                    </span>
                    <h4 className="text-base font-black text-slate-900 font-heading">
                      {isAr ? 'لا يشمل / إضافات:' : "What's Excluded / Extras:"}
                    </h4>
                  </div>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 font-semibold">
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 border border-rose-300 flex items-center justify-center text-[11px] font-black shrink-0">✕</span>
                    <span>{isAr ? 'التوقفات الإضافية غير المحددة مسبقاً في خط السير' : 'Unscheduled extra stops along the route'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 border border-rose-300 flex items-center justify-center text-[11px] font-black shrink-0">✕</span>
                    <span>{isAr ? 'الإكراميات والتبس الاختياري للسائق' : 'Gratuities / optional driver tips'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 border border-rose-300 flex items-center justify-center text-[11px] font-black shrink-0">✕</span>
                    <span>{isAr ? 'تكاليف طلب مركبة إضافية في حال تجاوز سعة الحقائب' : 'Extra vehicle if luggage exceeds vehicle capacity'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 border border-rose-300 flex items-center justify-center text-[11px] font-black shrink-0">✕</span>
                    <span>{isAr ? 'تأخير التحرك لأكثر من 60 دقيقة بعد هبوط الطائرة' : 'Airport waiting time beyond 60 minutes'}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Participation & Safety (معايير الأمان وسعة الأمتعة) */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-sky-100">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center border border-sky-200 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#0284C7] tracking-wider block">
                    {isAr ? 'معايير الأمان وسعة الأمتعة' : 'Luggage & Safety Guidelines'}
                  </span>
                  <h3 className="text-xl font-black font-heading text-slate-900">
                    {isAr ? 'قواعد الركاب وسعة الحقائب لضمان الراحة' : 'Passenger & Luggage Capacity Rules'}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Luggage Guidelines */}
                <div className="bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-2.5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                    {isAr ? 'سعة الحقائب والأمتعة:' : 'Luggage Guidelines:'}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    <li className="flex items-baseline gap-2">
                      <span className="text-[#0284C7] font-black">•</span>
                      <span>
                        <strong className="text-slate-900">{isAr ? 'ليموزين VIP (1-3 ركاب):' : 'VIP Limousine (1-3 Pax):'}</strong>{' '}
                        {isAr ? 'تتسع لـ 3 حقائب سفر قياسية كبيرة + حقائب اليد.' : 'Accommodates 3 standard large suitcases + hand luggage.'}
                      </span>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <span className="text-[#0284C7] font-black">•</span>
                      <span>
                        <strong className="text-slate-900">{isAr ? 'ميني فان 7 راكب:' : '7-Seater Minivan:'}</strong>{' '}
                        {isAr ? 'تتسع لـ 7 ركاب و 7 حقائب سفر متوسطة/كبيرة.' : 'Accommodates 7 passengers and 7 suitcases.'}
                      </span>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <span className="text-[#0284C7] font-black">•</span>
                      <span>
                        <strong className="text-slate-900">{isAr ? 'تويوتا هاي إيس 14-15 راكب:' : 'Toyota HiAce 14-15 Pax:'}</strong>{' '}
                        {isAr ? 'مساحة خلفية ضخمة تتسع لـ 15 حقيبة سفر كبيرة للمجموعات السياحية.' : 'Generous cargo space accommodating up to 15 large suitcases for groups.'}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Meet & Greet Guidelines */}
                <div className="bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-2.5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    {isAr ? 'تعليمات الاستقبال بمطار شرم الشيخ:' : 'Arrival Meeting Procedures:'}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    <li className="flex items-baseline gap-2">
                      <span className="text-emerald-600 font-black">•</span>
                      <span>
                        <strong className="text-slate-900">{isAr ? 'مكان انتظار السائق:' : 'Chauffeur Location:'}</strong>{' '}
                        {isAr ? 'بمجرد خروجك من بوابة استلام الحقائب بصالة الوصول 1 أو 2، ستجد السائق حاملاً لافتة باسمك.' : 'Right outside the baggage claim exit at Terminal 1 or 2 with your name sign.'}
                      </span>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <span className="text-emerald-600 font-black">•</span>
                      <span>
                        <strong className="text-slate-900">{isAr ? 'التواصل عند الهبوط:' : 'Arrival WhatsApp:'}</strong>{' '}
                        {isAr ? 'نرسل لك رقم واسم السائق وصورة السيارة مسبقاً، وننصح بفتح الإنترنت بالمطار للتنسيق الفوري.' : 'Driver phone and car plate are sent prior; airport free WiFi enables instant coordination.'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What to Prepare & Have Ready (ماذا تجهز لمشوارك؟) */}
            <div className="bg-gradient-to-br from-amber-50/80 via-white to-sky-50/60 rounded-3xl p-6 md:p-8 border border-amber-200/90 shadow-md space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-amber-200/60">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg border border-amber-200 shrink-0">
                  🎒
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider block">
                    {isAr ? 'نصائح لرحلة سلسة' : 'Preparation Checklist'}
                  </span>
                  <h3 className="text-xl font-black font-heading text-slate-900">
                    {isAr ? 'ماذا تجهز لمشوار التوصيل؟' : 'What to Keep Ready for Your Ride?'}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 text-xs">
                {/* 1. Flight Number */}
                <div className="bg-white/95 p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5 flex flex-col justify-between">
                  <div className="text-xl">✈️</div>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs">{isAr ? 'رقم الرحلة الجوية' : 'Flight Number'}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal mt-0.5">
                      {isAr ? 'لتتبع الهبوط وتحديث موعد وصولك تلقائياً.' : 'To track landing status and adjust for any delays.'}
                    </p>
                  </div>
                </div>

                {/* 2. Hotel Name */}
                <div className="bg-white/95 p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5 flex flex-col justify-between">
                  <div className="text-xl">🏨</div>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs">{isAr ? 'اسم الفندق بدقة' : 'Resort / Hotel Name'}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal mt-0.5">
                      {isAr ? 'اسم المنتجع أو الفندق بالكامل لضمان التوصيل السريع.' : 'Exact resort name to take you straight to reception.'}
                    </p>
                  </div>
                </div>

                {/* 3. WhatsApp Active */}
                <div className="bg-white/95 p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5 flex flex-col justify-between">
                  <div className="text-xl">📱</div>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs">{isAr ? 'تفعيل الواتساب' : 'WhatsApp Ready'}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal mt-0.5">
                      {isAr ? 'رقم هاتف متصل بالواتساب لتلقي إشعار السائق والتأكيد.' : 'Active WhatsApp number for chauffeur live updates.'}
                    </p>
                  </div>
                </div>

                {/* 4. Passports & IDs */}
                <div className="bg-white/95 p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5 flex flex-col justify-between">
                  <div className="text-xl">🛂</div>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs">{isAr ? 'الجوازات والتذاكر' : 'Passport & IDs'}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal mt-0.5">
                      {isAr ? 'جواز السفر وتذكرة الطيران في متناول يدك عند الوصول.' : 'Keep documents handy for smooth airport exit.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Itinerary Steps */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100 pb-3">
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  {isAr ? 'خطوات التوصيل من الحجز حتى الوصول' : 'Step-by-Step Transfer Experience'}
                </h3>
                <span className="text-xs font-semibold text-[#0284C7] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full w-fit">
                  {isAr ? '4 خطوات سريعة' : '4 Easy Steps'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50/90 p-4 rounded-2xl border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between space-y-1.5 text-start rtl:text-right">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#0284C7] text-white text-sm font-black flex items-center justify-center shadow-md">
                      1
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 font-heading leading-snug">
                        {isAr ? 'حساب السعر وحجز المشوار أونلاين' : 'Online Booking & Instant Quote'}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">
                        {isAr ? 'حدد مسارك وفئة السيارة والتاريخ وادفع أونلاين أو كاش عند الوصول بدون رسوم خفية.' : 'Select route, vehicle class, and pay online or cash on arrival.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/90 p-4 rounded-2xl border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between space-y-1.5 text-start rtl:text-right">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#0284C7] text-white text-sm font-black flex items-center justify-center shadow-md">
                      2
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 font-heading leading-snug">
                        {isAr ? 'تأكيد فوري وتعيين السائق والسيارة' : 'Driver Assignment & Flight Tracking'}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">
                        {isAr ? 'نرسل لك إشعاراً فورياً برقم السائق ونوع السيارة ونتابع موعد هبوط طائرتك حياً.' : 'Chauffeur and car details sent via WhatsApp; flight tracked in real time.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/90 p-4 rounded-2xl border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between space-y-1.5 text-start rtl:text-right">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#0284C7] text-white text-sm font-black flex items-center justify-center shadow-md">
                      3
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 font-heading leading-snug">
                        {isAr ? 'الاستقبال بيافطة اسمك وحمل الحقائب' : 'Meet & Greet with Nameplate'}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">
                        {isAr ? 'السائق ينتظرك في صالة الوصول مع يافطة باسمك ويساعدك في نقل كل الحقائب.' : 'Your chauffeur welcomes you at arrivals, takes care of your luggage, and leads you to the car.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/90 p-4 rounded-2xl border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between space-y-1.5 text-start rtl:text-right">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#0284C7] text-white text-sm font-black flex items-center justify-center shadow-md">
                      4
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 font-heading leading-snug">
                        {isAr ? 'توصيل مريح ومكيف لباب فندقك' : 'Relaxing Door-to-Door Hotel Drop-off'}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">
                        {isAr ? 'انتقال مباشر وهادئ في سيارة مريحة ومكيفة حتى ريسبشن فندقك بدون أي توقفات.' : 'Smooth direct ride in chilled comfort straight to your resort reception.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 4. FLEET PHOTO GALLERY & VEHICLE CARDS ────────── */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase text-[#0284C7] tracking-wider block">
                    {isAr ? 'أسطول سيارات الهنا المتكامل' : 'El Hana Vehicle Fleet'}
                  </span>
                  <h3 className="text-xl font-bold font-heading text-slate-900">
                    {isAr ? 'معرض سيارات التوصيل (ليموزين، ميني فان 7 راكب، هاي إيس 14-15 راكب)' : 'Transfer Fleet Showcase (Limousine, 7-Seater Van, 14-15 Pax HiAce)'}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {isAr ? 'اختر الفئة للحساب والحجز' : 'Click to select & calculate'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {VEHICLE_TYPES.map((v) => {
                  const isSelected = selectedVehicleId === v.id;
                  return (
                    <div
                      key={v.id}
                      className={`rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                        isSelected 
                          ? 'border-[#0284C7] shadow-xl ring-2 ring-[#0284C7]/30 bg-sky-50/20' 
                          : 'border-slate-200 hover:border-sky-300 hover:shadow-lg bg-white'
                      }`}
                      onClick={() => handleSelectVehicle(v.id)}
                    >
                      {/* Vehicle Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                        <img
                          src={v.image}
                          alt={isAr ? v.nameAr : v.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        
                        {/* Selected Tag */}
                        {isSelected && (
                          <div className="absolute top-3 end-3 px-3 py-1 rounded-full bg-[#0284C7] text-white text-xs font-black shadow-md flex items-center gap-1">
                            ✓ {isAr ? 'الفئة المحددة حالياً' : 'Selected'}
                          </div>
                        )}

                        <div className="absolute bottom-3 start-3">
                          <span className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-black shadow-md border border-white/20">
                            {isAr ? v.nameAr : v.name}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2.5">
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            {isAr ? v.descriptionAr : v.description}
                          </p>

                          {/* Capacity Chips */}
                          <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 pt-1">
                            <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-xl">
                              <Users className="w-3.5 h-3.5 text-[#0284C7]" />
                              {isAr ? `حتى ${v.maxPassengers} ركاب` : `Up to ${v.maxPassengers} Pax`}
                            </span>
                            <span className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-xl border border-amber-200">
                              <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                              {isAr ? `سعة ${v.maxLuggage} حقائب` : `${v.maxLuggage} Bags`}
                            </span>
                          </div>

                          {/* Bullet features */}
                          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] font-semibold text-slate-600">
                            {(isAr ? v.featuresAr : v.featuresEn)?.map((feat, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                                <span className="truncate">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                              {isAr ? 'سعر المشوار يبدأ من' : 'Base Rate Starts'}
                            </span>
                            <span className="text-2xl font-black text-[#0284C7] font-heading">
                              {formatPrice(v.basePrice)}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToCalculator(v.id);
                            }}
                            className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-[#0284C7] text-[#0284C7] hover:text-white text-xs font-black transition cursor-pointer shadow-2xs active:scale-95"
                          >
                            {isAr ? 'احسب واحجز' : 'Calculate & Book'}
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verified Customer Reviews */}
            {reviews && reviews.length > 0 && (
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0284C7] uppercase tracking-wider mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{isAr ? 'تقييمات موثقة من مسافرينا' : 'Verified Traveler Reviews'}</span>
                    </div>
                    <h3 className="text-xl font-bold font-heading text-slate-900">
                      {isAr ? 'آراء العملاء في خدمة التوصيل والانتقالات' : 'Customer Reviews for Transfers'}
                    </h3>
                  </div>

                  <Link
                    to="/leave-review?tour=transfers"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-50 hover:bg-[#0284C7] text-[#0284C7] hover:text-white border border-sky-200 hover:border-transparent text-xs font-extrabold transition-all duration-300 shadow-xs active:scale-95 group w-fit cursor-pointer"
                  >
                    <MessageSquarePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{isAr ? 'أضف تقييمك لمشوارك' : 'Review Transfer'}</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((rev, idx) => {
                    const reviewComment = typeof rev.text === 'object' 
                      ? (rev.text[i18n.language] || rev.text['ar'] || rev.text['en']) 
                      : rev.text;

                    return (
                      <div
                        key={rev.id || idx}
                        className="bg-slate-50/90 hover:bg-white rounded-2xl p-5 border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-amber-400">
                              {[...Array(rev.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <Quote className="w-6 h-6 text-sky-200" />
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed font-medium italic line-clamp-4">
                            "{reviewComment}"
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200/70 flex items-center gap-3">
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            loading="lazy"
                            width="36"
                            height="36"
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-400/30 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-black text-slate-900 truncate flex items-center gap-1.5">
                              <span>{rev.name}</span>
                              <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                                ✓ {isAr ? 'حجز موثق' : 'Verified'}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-semibold truncate">
                              {rev.country} • {rev.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Right Desktop Sticky Booking Column (lg:col-span-1) */}
          <div className="hidden lg:block lg:col-span-1">
            <TransferCalculator 
              selectedVehicleId={selectedVehicleId} 
              onSelectVehicle={handleSelectVehicle}
              isSidebar={true}
            />
          </div>

        </div>

        {/* ── 5. INTERACTIVE MAP HUB ───────────────────────────── */}
        <div className="space-y-4 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl font-bold font-heading text-slate-900">
              {isAr ? "نغطي جميع مناطق وفنادق شرم الشيخ ودهب" : "Covering All Sharm & Dahab Hotel Zones"}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {isAr ? "انتقالات مباشرة من صالة المطار إلى خليج نعمة، خليج نبق، الهضبة، رأس نصراني، السوق القديم، ودهب." : "Door-to-door shuttle covering Naama Bay, Nabq, Hadaba, Sharks Bay, Old Market, and Dahab."}
            </p>
          </div>
          <GoogleMapLocation defaultLocationId="airport" />
        </div>

        {/* ── 6. FREQUENTLY ASKED QUESTIONS ────────────────────── */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase text-[#0284C7] tracking-wider block">
              {isAr ? "إجابات فورية" : "Got Questions?"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {isAr ? "الأسئلة الشائعة حول توصيل المطار والفنادق" : "Airport & Hotel Transfer FAQs"}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {isAr ? "كل ما تود معرفته عن المواعيد، الحقائب، وطرق الدفع." : "Everything you need to know about pickup times, luggage, and payment."}
            </p>
          </div>
          <FAQAccordion />
        </div>

      </div>

      {/* ── 7. LIGHTBOX MODAL FOR FULLSCREEN GALLERY ──────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-[#38BDF8] block">
                  {isAr ? currentGalleryItem.badgeAr : currentGalleryItem.badgeEn}
                </span>
                <h3 className="text-lg font-bold font-heading text-white">
                  {isAr ? currentGalleryItem.titleAr : currentGalleryItem.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image View */}
            <div className="relative aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
              <img
                src={currentGalleryItem.image}
                alt={isAr ? currentGalleryItem.titleAr : currentGalleryItem.titleEn}
                className="w-full h-full object-cover"
              />

              {/* Prev / Next buttons */}
              <button
                type="button"
                onClick={() => setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : TRANSFER_GALLERY.length - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition backdrop-blur-md shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveImageIdx((prev) => (prev < TRANSFER_GALLERY.length - 1 ? prev + 1 : 0))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition backdrop-blur-md shadow-lg cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Thumbnails Strip */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {TRANSFER_GALLERY.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveImageIdx(i);
                    setSelectedVehicleId(item.vehicleId);
                  }}
                  className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                    activeImageIdx === i ? 'border-[#38BDF8] scale-105 ring-2 ring-[#38BDF8]/40' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={item.thumb} alt={item.titleEn} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 8. STICKY MOBILE CTA BAR ─────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-sky-100 p-3.5 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
            {isAr ? "سعر التوصيل يبدأ من" : "Transfers from"}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-[#0284C7] font-heading">
              {formatPrice(20)}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">
              {isAr ? "للسيارة" : "per car"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollToCalculator()}
          className="flex-1 max-w-[200px] py-3 px-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white font-black text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{isAr ? "احسب واحجز الآن" : "Book Transfer"}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </button>
      </div>

    </div>
  );
};

export default TransfersPage;
