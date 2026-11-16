import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Compass, Anchor, Waves, Car, ArrowRight, Play, Star, MapPin } from 'lucide-react';
import { FloatingSearchWidget } from './FloatingSearchWidget';

export const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  // Showcase experiences indicating what else El Hana Group offers beyond Desert Safari
  const showcaseOffers = [
    {
      id: 'yacht',
      image: '/images/sea/ras-mohammed-luxury-yacht.webp',
      alt: 'Luxury VIP Yacht Cruise Ras Mohammed Sharm El Sheikh',
      badgeAr: 'اليخوت الفاخرة VIP',
      badgeEn: 'VIP Luxury Yacht',
      titleAr: 'إبحار ملوكي، رأس محمد، والجزيرة البيضاء',
      titleEn: 'Royal Sailing, Ras Mohammed & White Island',
      link: '/sea-trips'
    },
    {
      id: 'diving',
      image: '/images/sea/snorkeling-ras-mohammed-reef.webp',
      alt: 'Red Sea Snorkeling and Diving Sharm El Sheikh',
      badgeAr: 'الغوص والسنوركلينج',
      badgeEn: 'Diving & Reefs',
      titleAr: 'عالم المرجان الساحر وأعماق البحر الأحمر',
      titleEn: 'Vibrant Coral Reefs & Marine Life',
      link: '/diving'
    },
    {
      id: 'excursions',
      image: '/images/excursions/dahab/dahab-blue-hole-lagoon.webp',
      alt: 'Dahab Blue Hole & Sinai Excursions',
      badgeAr: 'رحلات سيناء ودهب',
      badgeEn: 'Sinai & Dahab Tours',
      titleAr: 'بلو هول دهب، جبل موسى، وسانت كاترين',
      titleEn: 'Dahab Blue Hole & St. Catherine',
      link: '/excursions'
    },
    {
      id: 'transfers',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
      alt: 'Sharm El Sheikh VIP Private Transfers 24/7',
      badgeAr: 'توصيل المطار 24/7',
      badgeEn: '24/7 Airport Transfers',
      titleAr: 'ليموزين، ميني فان، وتويوتا هاي إيس خاصة',
      titleEn: 'Private Limousines, Minivans & HiAce',
      link: '/transfers'
    }
  ];

  // Auto rotate showcase slides every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % showcaseOffers.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [showcaseOffers.length]);

  const currentOffer = showcaseOffers[activeSlideIdx];

  // Category Cards Configuration
  const cardsData = [
    {
      id: 1,
      icon: Compass,
      tag: isAr ? "سفاري الصحراء" : "DESERT SAFARI",
      title: isAr ? "إثارة وتشويق بلا حدود" : "Pure Adrenaline",
      link: "/safari",
      accentBg: "bg-sky-500/20 text-sky-300",
    },
    {
      id: 2,
      icon: Anchor,
      tag: isAr ? "اليخوت الفاخرة" : "VIP YACHTS",
      title: isAr ? "إبحار ملوكي VIP" : "Royal Sailing VIP",
      link: "/sea-trips",
      accentBg: "bg-amber-500/20 text-amber-300",
    },
    {
      id: 3,
      icon: Waves,
      tag: isAr ? "الغوص والسنوركلينج" : "DIVING & REEFS",
      title: isAr ? "عالم المرجان والأعماق" : "Underwater Reefs",
      link: "/diving",
      accentBg: "bg-emerald-500/20 text-emerald-300",
    },
    {
      id: 4,
      icon: Car,
      tag: isAr ? "الانتقالات الخاصة" : "VIP TRANSFERS",
      title: isAr ? "توصيل 24/7 للمطار والفندق" : "24/7 Airport Shuttles",
      link: "/transfers",
      accentBg: "bg-orange-500/20 text-orange-300",
    },
  ];

  return (
    <div className="relative min-h-[calc(100svh-var(--header-h))] flex flex-col justify-between pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-12 md:pb-14 px-4 sm:px-6 lg:px-8 overflow-x-clip select-none bg-slate-900 w-full">
      {/* 1. REAL PHOTO BACKGROUND - SOFT DARK SLATE SHADOW FOR ULTRA READABILITY */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/real/polaris-buggy-family-mobile.webp" type="image/webp" />
          <source srcSet="/images/real/polaris-buggy-family.webp" type="image/webp" />
          <img
            src="/images/real/polaris-buggy-family.webp"
            alt="El Hana Group Buggy Safari Background"
            width="1200"
            height="675"
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/real/atv-quad-hero.png';
            }}
            className="w-full h-full object-cover object-center scale-100"
          />
        </picture>
        
        {/* Soft Dark Vignette for maximum text readability */}
        <div className="absolute inset-0 bg-slate-950/65 lg:bg-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/40 rtl:bg-gradient-to-l"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/80"></div>
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center gap-6 sm:gap-8 lg:gap-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* TEXT CONTENT COLUMN */}
          <div className="lg:col-span-7 space-y-5 text-left rtl:text-right">
            
            {/* Eyebrow Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-sky-400/40 text-sky-300 font-semibold text-xs tracking-wider shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              <span>{isAr ? "شركة الهنا للسياحة والسفاري VIP" : "EL HANA GROUP TOURISM VIP"}</span>
            </div>

            {/* Single Line Headline */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-white font-heading leading-snug tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {isAr ? (
                  <span>
                    حيث تترك المغامرة{' '}
                    <span className="relative inline-block text-sky-400 font-black">
                      أثراً لا يُنسى.
                      <span className="absolute bottom-0.5 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sky-400 to-amber-400 rounded-full"></span>
                    </span>
                  </span>
                ) : (
                  <span>
                    Where Power Leaves a{' '}
                    <span className="relative inline-block text-sky-400 font-black">
                      Mark.
                      <span className="absolute bottom-0.5 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sky-400 to-amber-400 rounded-full"></span>
                    </span>
                  </span>
                )}
              </h1>
            </div>

            {/* Subtitle Paragraph */}
            <p
              className="text-sm sm:text-base text-slate-100 max-w-xl font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]"
            >
              {isAr
                ? "نصنع تجارب سياحية فاخرة تجمع بين إثارة صحراء سيناء، يخوت البحر الأحمر VIP، والانتقالات المباشرة من الفندق في شرم الشيخ."
                : "We partner with ambitious travelers to create Sinai adventures that resonate, engage, and deliver real impact."}
            </p>

            {/* Action Buttons */}
            <div
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <Link to="/experiences">
                <button className="px-7 py-3 rounded-full bg-[#0369A1] hover:bg-[#075985] text-white font-bold text-xs sm:text-sm border border-sky-400/40 shadow-lg shadow-[#0369A1]/40 hover:shadow-sky-500/50 transition duration-300 flex items-center gap-2.5 group cursor-pointer">
                  <span>{isAr ? "استكشف تجاربنا" : "Explore Our Work"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-300 rtl:rotate-180" />
                </button>
              </Link>

              <button
                onClick={() => setShowVideoModal(true)}
                className="flex items-center gap-2.5 group cursor-pointer py-2 px-4 rounded-full bg-slate-900/70 backdrop-blur-md border border-slate-700 hover:border-sky-400 shadow-md transition duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-sm">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-sky-300 transition duration-300">
                  {isAr ? "شاهد الفيديو" : "Watch Video"}
                </span>
              </button>
            </div>

          </div>

          {/* IMAGE SHOWCASE COLUMN - 100% RESPONSIVE (Zero Overlap on Mobile) */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center">
            
            {/* 1. Real Image Frame Showing Website Offerings (Yacht, Marine, Dahab, Transfers) */}
            <Link
              to={currentOffer.link}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[16/10] lg:h-[280px] xl:h-[310px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 sm:border-3 border-white/20 bg-slate-950 group z-20 block cursor-pointer"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentOffer.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentOffer.image}
                    alt={currentOffer.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"></div>

              {/* Top Badges Row */}
              <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
                {/* Rating Badge */}
                <div className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-bold text-white shadow-md flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9</span>
                  <span className="text-[10px] text-slate-300">(1,280+)</span>
                </div>

                {/* Active Category Badge */}
                <div className="px-3 py-1 rounded-full bg-[#0284C7]/90 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-black text-white shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>{isAr ? currentOffer.badgeAr : currentOffer.badgeEn}</span>
                </div>
              </div>

              {/* Bottom Info Pill (Shows what El Hana Offers) */}
              <div className="absolute bottom-3 inset-x-3.5 flex items-center justify-between gap-2 z-10 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-2xl border border-white/15">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-[#38BDF8] font-bold block uppercase tracking-wider">
                    {isAr ? "خدمات ورحلات الهنا" : "El Hana Services"}
                  </span>
                  <div className="text-xs sm:text-sm font-black text-white truncate">
                    {isAr ? currentOffer.titleAr : currentOffer.titleEn}
                  </div>
                </div>

                {/* Slide dots */}
                <div className="flex items-center gap-1 shrink-0">
                  {showcaseOffers.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveSlideIdx(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeSlideIdx === idx ? 'w-4 bg-[#38BDF8]' : 'w-1.5 bg-white/40'}`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Link>

            {/* 2. Interactive Category Grid (2x2) - 100% Zero Overlap on Desktop & Mobile */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-3.5 sm:mt-4 w-full max-w-sm sm:max-w-md lg:max-w-none">
              {cardsData.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.id}
                    to={card.link}
                    className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/85 hover:bg-slate-800/95 backdrop-blur-xl border border-slate-800 hover:border-sky-400/80 shadow-lg hover:shadow-sky-500/20 flex items-center gap-2.5 sm:gap-3 transition-all duration-300 group cursor-pointer hover:scale-[1.02] active:scale-98"
                  >
                    <div className={`p-2 sm:p-2.5 rounded-xl ${card.accentBg} shrink-0 group-hover:scale-110 transition duration-300`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-sky-400 block truncate">
                        {card.tag}
                      </span>
                      <div className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-white group-hover:text-sky-300 transition truncate leading-snug">
                        {card.title}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>

        </div>

        {/* BOTTOM SEARCH WIDGET CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full pt-3 pb-1 relative z-50"
        >
          <FloatingSearchWidget />
        </motion.div>

      </div>

      {/* Video Modal Teaser */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-3xl overflow-hidden max-w-3xl w-full border border-sky-500/30 shadow-2xl relative p-6 space-y-4 text-center text-white"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <h3 className="font-semibold text-white text-base font-heading">
                  {isAr ? "شرم الشيخ • تجارب El Hana Group" : "Sharm El Sheikh • El Hana Group Experience"}
                </h3>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-slate-400 hover:text-white font-bold text-xl px-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center relative">
                <img
                  src="/images/real/polaris-buggy-family.jpg"
                  alt="Video teaser"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-lg font-bold shadow-2xl animate-bounce">
                    ▶
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {isAr
                  ? "استمتع بأقوى مغامرات السفاري واليخوت مع El Hana Group."
                  : "Enjoy the ultimate safari & yacht adventures with El Hana Group."}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
