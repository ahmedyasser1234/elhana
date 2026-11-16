import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Anchor,
  Gauge,
  Waves,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Star,
  Clock,
  Sparkles
} from 'lucide-react';
import { EXPERIENCES, getLocalizedExperience } from '../data/experiences';

const pad = (n) => String(n).padStart(2, '0');
const toWebp = (url) => (url ? url.replace(/\.(jpg|jpeg|png)$/i, '.webp') : url);

const CURATED_CONFIG = [
  {
    slug: 'atv-quad-bike-safari',
    icon: Compass,
    categoryBadgeAr: 'سفاري البيتش باجي الصحراوي',
    categoryBadgeEn: 'Sinai Desert Quad Safari',
    accentGradient: 'from-[#F97316]/20 to-transparent',
    badgeStyle: 'bg-orange-50 border-orange-200 text-[#F97316]',
    iconBg: 'bg-orange-50 border-orange-200 text-[#F97316]',
    focus: 'center 45%',
    href: '/experience/atv-quad-bike-safari'
  },
  {
    slug: 'vip-yacht-ras-mohammed-white-island',
    icon: Anchor,
    categoryBadgeAr: 'يخوت ملكية VIP لرأس محمد',
    categoryBadgeEn: 'VIP Luxury Yacht & White Island',
    accentGradient: 'from-[#0284C7]/20 to-transparent',
    badgeStyle: 'bg-sky-50 border-sky-200 text-[#0284C7]',
    iconBg: 'bg-sky-50 border-sky-200 text-[#0284C7]',
    focus: 'center 45%',
    href: '/experience/vip-yacht-ras-mohammed-white-island'
  },
  {
    slug: 'dune-buggy-adventure',
    icon: Gauge,
    categoryBadgeAr: 'كار باجي بولاريس في الجبال',
    categoryBadgeEn: 'Polaris Dune Buggy Adventure',
    accentGradient: 'from-[#D97706]/20 to-transparent',
    badgeStyle: 'bg-amber-50 border-amber-200 text-[#D97706]',
    iconBg: 'bg-amber-50 border-amber-200 text-[#D97706]',
    focus: 'center 50%',
    href: '/experience/dune-buggy-adventure'
  },
  {
    slug: 'introductory-scuba-diving-red-sea',
    icon: Waves,
    categoryBadgeAr: 'غوص وسنوركلينج في أعماق البحر',
    categoryBadgeEn: 'Red Sea Scuba Diving & Reefs',
    accentGradient: 'from-[#059669]/20 to-transparent',
    badgeStyle: 'bg-emerald-50 border-emerald-200 text-[#059669]',
    iconBg: 'bg-emerald-50 border-emerald-200 text-[#059669]',
    focus: 'center 35%',
    href: '/experience/introductory-scuba-diving-red-sea'
  },
  {
    slug: 'dahab-blue-hole-canyon-trip',
    icon: MapPin,
    categoryBadgeAr: 'جولات دهب وبلو هول والوادي الملون',
    categoryBadgeEn: 'Dahab Blue Hole & Canyon Tour',
    accentGradient: 'from-[#0D9488]/20 to-transparent',
    badgeStyle: 'bg-teal-50 border-teal-200 text-[#0D9488]',
    iconBg: 'bg-teal-50 border-teal-200 text-[#0D9488]',
    focus: 'center 55%',
    href: '/experience/dahab-blue-hole-canyon-trip'
  }
];

export default function TripStack({ trips: customTrips }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  // Resolve trips with current locale and authentic user photos
  const trips = useMemo(() => {
    if (customTrips && customTrips.length > 0) return customTrips;

    return CURATED_CONFIG.map((item) => {
      const found = EXPERIENCES.find((e) => e.slug === item.slug) || EXPERIENCES[0];
      const localized = getLocalizedExperience(found, i18n.language);

      // Dedicated authentic image priority
      let mainImg = found.images && found.images.length > 0 ? found.images[0] : '/images/real/user-atv-safari.webp';
      if (item.slug === 'atv-quad-bike-safari') {
        mainImg = '/images/real/user-atv-safari.webp';
      }

      return {
        id: found.id,
        slug: found.slug,
        title: localized.title,
        subtitle: localized.shortDescription,
        image: mainImg,
        href: item.href || `/experience/${found.slug}`,
        focus: item.focus || 'center',
        icon: item.icon,
        categoryBadge: isAr ? item.categoryBadgeAr : item.categoryBadgeEn,
        accentGradient: item.accentGradient,
        badgeStyle: item.badgeStyle,
        iconBg: item.iconBg,
        rating: found.rating || 4.9,
        reviewsCount: found.reviewsCount || 340,
        startingPrice: found.startingPrice || 15,
        duration: found.duration || '3 Hours'
      };
    });
  }, [customTrips, i18n.language, isAr]);

  const total = trips.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto rotation every 6.5 seconds, pauses on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Mobile swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left
        if (isAr) prevSlide(); else nextSlide();
      } else {
        // Swiped right
        if (isAr) nextSlide(); else prevSlide();
      }
    }
    touchStartX.current = null;
  };

  const activeTrip = trips[activeIndex] || trips[0];
  const ActiveIcon = activeTrip.icon || Sparkles;

  return (
    <section
      aria-label={t('trips.stackLabel', 'Featured Experiences')}
      className="w-full relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* SECTION HEADER: Anchors the section with clear brand typography */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-[#0284C7] text-xs font-black uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>{isAr ? 'تجارب مختارة بعناية' : 'Curated Premier Adventures'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-slate-900 tracking-tight">
            {isAr ? 'أقوى رحلات شرم الشيخ' : 'Top Sharm El Sheikh Adventures'}{' '}
            <span className="text-[#0284C7]">{isAr ? 'الأكثر طلباً' : 'Signature Experiences'}</span>
          </h2>
        </div>

        {/* Quick Tab Indicators (Desktop Pill Selector) */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/70">
          {trips.map((trip, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={trip.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#0284C7] shadow-sm font-black ring-1 ring-sky-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {pad(idx + 1)} {trip.title.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN SHOWCASE CONTAINER: Full responsive banner with rounded corners and high depth */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[580px] sm:h-[620px] md:h-[660px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 select-none">
          
          {/* 1. BACKGROUND PHOTO WITH SMOOTH CROSSFADE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrip.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="absolute inset-0 h-full w-full"
            >
              <picture className="h-full w-full">
                <source srcSet={toWebp(activeTrip.image)} type="image/webp" />
                <img
                  src={activeTrip.image}
                  alt={activeTrip.title}
                  width="1600"
                  height="900"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: activeTrip.focus || 'center' }}
                />
              </picture>
              {/* Soft Cinematic Overlays: ensures text readability on cards and controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-slate-950/30" />
              <div className="absolute inset-0 bg-radial-[circle_at_bottom_start] from-black/40 via-transparent to-transparent hidden md:block" />
            </motion.div>
          </AnimatePresence>

          {/* 2. NAVIGATION ARROWS (Floating Glass Circles) */}
          <div className="absolute top-6 end-6 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label={isAr ? 'الرحلة السابقة' : 'Previous trip'}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/85 hover:bg-white text-slate-800 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isAr ? <ChevronRight className="w-5 h-5 text-slate-700" /> : <ChevronLeft className="w-5 h-5 text-slate-700" />}
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label={isAr ? 'الرحلة التالية' : 'Next trip'}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/85 hover:bg-white text-slate-800 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isAr ? <ChevronLeft className="w-5 h-5 text-slate-700" /> : <ChevronRight className="w-5 h-5 text-slate-700" />}
            </button>
          </div>

          {/* 3. REDESIGNED LUXURY CARD: Harmonized with WhyChooseUs below */}
          <div className="absolute inset-x-4 bottom-4 sm:bottom-6 md:inset-x-auto md:bottom-10 md:start-10 md:w-[460px] lg:w-[490px] z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrip.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="bg-white/95 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-white/90 shadow-[0_24px_55px_-12px_rgba(15,23,42,0.25)] space-y-4 relative overflow-hidden group"
              >
                {/* Top Corner Decorative Accent Glow (matches WhyChooseUs) */}
                <div
                  className={`absolute top-0 end-0 w-36 h-36 bg-gradient-to-bl ${activeTrip.accentGradient} rounded-bl-full pointer-events-none transition duration-500 group-hover:scale-125`}
                />

                {/* Top Row: Category Badge + Slide Counter */}
                <div className="flex items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs ${activeTrip.iconBg}`}>
                      <ActiveIcon className="w-4 h-4" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-black border shadow-xs ${activeTrip.badgeStyle}`}>
                      {activeTrip.categoryBadge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      dir="ltr"
                      className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-xs font-bold border border-slate-200/80"
                    >
                      {pad(activeIndex + 1)} / {pad(total)}
                    </span>
                  </div>
                </div>

                {/* Trip Title & Subtitle */}
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-heading text-slate-900 leading-tight">
                    {activeTrip.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {activeTrip.subtitle}
                  </p>
                </div>

                {/* Meta Row: Duration + Rating + Price */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4 text-xs relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/70">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{activeTrip.rating}</span>
                      <span className="text-slate-400 font-normal">({activeTrip.reviewsCount})</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeTrip.duration}</span>
                    </span>
                  </div>

                  <div className="text-end">
                    <span className="text-[11px] text-slate-400 block font-normal leading-none mb-0.5">
                      {isAr ? 'السعر يبدأ من' : 'From'}
                    </span>
                    <span className="text-xl font-black text-[#0284C7] leading-none">
                      ${activeTrip.startingPrice}
                    </span>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="pt-1 flex items-center justify-between gap-3 relative z-10">
                  <Link
                    to={activeTrip.href}
                    aria-label={`${t('trips.view', 'عرض الرحلة')}: ${activeTrip.title}`}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#0284C7]/20 hover:shadow-lg transition-all group/btn"
                  >
                    <span>{t('trips.view', 'عرض تفاصيل الرحلة والحجز')}</span>
                    <ArrowIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
                  </Link>

                  <Link
                    to="/experiences"
                    className="text-xs sm:text-sm font-bold text-[#0284C7] hover:text-[#0369A1] hover:underline flex items-center gap-1 transition-colors"
                  >
                    <span>{t('trips.viewAll', 'عرض الكل')}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 4. BOTTOM DOT PROGRESS INDICATORS */}
          <div className="absolute bottom-4 end-6 z-20 hidden md:flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/20">
            {trips.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 h-2 bg-[#0284C7] shadow-sm'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
