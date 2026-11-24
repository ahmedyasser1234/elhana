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
      accentBg: "bg-sky-50 text-[#0284C7] border border-sky-100",
    },
    {
      id: 2,
      icon: Anchor,
      tag: isAr ? "اليخوت الفاخرة" : "VIP YACHTS",
      title: isAr ? "إبحار ملوكي VIP" : "Royal Sailing VIP",
      link: "/sea-trips",
      accentBg: "bg-amber-50 text-amber-600 border border-amber-100",
    },
    {
      id: 3,
      icon: Waves,
      tag: isAr ? "الغوص والسنوركلينج" : "DIVING & REEFS",
      title: isAr ? "عالم المرجان والأعماق" : "Underwater Reefs",
      link: "/diving",
      accentBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
    {
      id: 4,
      icon: Car,
      tag: isAr ? "الانتقالات الخاصة" : "VIP TRANSFERS",
      title: isAr ? "توصيل 24/7 للمطار والفندق" : "24/7 Airport Shuttles",
      link: "/transfers",
      accentBg: "bg-orange-50 text-orange-600 border border-orange-100",
    },
  ];

  return (
    <div className="relative min-h-[calc(100svh-var(--header-h))] flex flex-col justify-between pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-12 md:pb-14 px-4 sm:px-6 lg:px-8 overflow-x-clip select-none bg-gradient-to-b from-sky-50/50 via-white to-amber-50/20 w-full">
      {/* 1. REAL PHOTO BACKGROUND - LUMINOUS LIGHT LUXURY ATMOSPHERE */}
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
            className="w-full h-full object-cover object-center scale-100 opacity-90"
          />
        </picture>
        
        {/* Soft Light Luminous Overlays guaranteeing maximum clarity, contrast & logo prominence */}
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/20 rtl:from-white/20 rtl:via-white/80 rtl:to-white/95"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-transparent to-white/80"></div>
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center gap-6 sm:gap-8 lg:gap-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* TEXT CONTENT COLUMN */}
          <div className="lg:col-span-7 space-y-5 text-left rtl:text-right">
            
            {/* Eyebrow Text */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 text-[#0284C7] font-black text-xs sm:text-sm tracking-wider uppercase border border-sky-200/80 shadow-xs">
              <span>{isAr ? "شركة الهنا للسياحة والسفاري VIP" : "EL HANA GROUP TOURISM VIP"}</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black text-slate-900 font-heading leading-tight tracking-tight">
                {isAr ? (
                  <span>
                    حيث تترك المغامرة{' '}
                    <span className="text-[#0284C7]">
                      أثراً لا يُنسى.
                    </span>
                  </span>
                ) : (
                  <span>
                    Where Power Leaves a{' '}
                    <span className="text-[#0284C7]">
                      Mark.
                    </span>
                  </span>
                )}
              </h1>
            </div>

            {/* Subtitle Paragraph */}
            <p
              className="text-sm sm:text-base text-slate-700 max-w-xl font-medium leading-relaxed"
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
                <button className="px-7 py-3 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-black text-xs sm:text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition duration-300 flex items-center gap-2.5 group cursor-pointer">
                  <span>{isAr ? "استكشف تجاربنا" : "Explore Our Work"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-300 rtl:rotate-180" />
                </button>
              </Link>

              <button
                onClick={() => setShowVideoModal(true)}
                className="flex items-center gap-2.5 group cursor-pointer py-2.5 px-5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-slate-200/90 hover:border-sky-400 shadow-md transition duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-xs">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0284C7] transition duration-300">
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
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[16/10] lg:h-[280px] xl:h-[310px] rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-3 border-white/90 bg-slate-100 group z-20 block cursor-pointer"
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
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none"></div>

              {/* Top Badges Row */}
              <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
                {/* Rating Badge */}
                <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-[10px] sm:text-[11px] font-bold text-slate-900 shadow-md flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9</span>
                  <span className="text-[10px] text-slate-500">(1,280+)</span>
                </div>

                {/* Active Category Badge */}
                <div className="px-3 py-1 rounded-full bg-[#0284C7] text-[10px] sm:text-[11px] font-black text-white shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
                  <span>{isAr ? currentOffer.badgeAr : currentOffer.badgeEn}</span>
                </div>
              </div>

              {/* Bottom Info Pill (Shows what El Hana Offers) */}
              <div className="absolute bottom-3 inset-x-3.5 flex items-center justify-between gap-2 z-10 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200/80 shadow-lg">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-[#0284C7] font-black block uppercase tracking-wider">
                    {isAr ? "خدمات ورحلات الهنا" : "El Hana Services"}
                  </span>
                  <div className="text-xs sm:text-sm font-black text-slate-900 truncate">
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
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeSlideIdx === idx ? 'w-4 bg-[#0284C7]' : 'w-1.5 bg-slate-300'}`}
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
                    className="p-3 sm:p-3.5 rounded-2xl bg-white/90 hover:bg-white backdrop-blur-xl border border-slate-200/90 hover:border-sky-400 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 flex items-center gap-2.5 sm:gap-3 transition-all duration-300 group cursor-pointer hover:scale-[1.02] active:scale-98"
                  >
                    <div className={`p-2 sm:p-2.5 rounded-xl ${card.accentBg} shrink-0 group-hover:scale-110 transition duration-300`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] font-black tracking-wider uppercase text-[#0284C7] block truncate">
                        {card.tag}
                      </span>
                      <div className="text-[11px] sm:text-xs lg:text-[13px] font-black text-slate-900 group-hover:text-[#0284C7] transition truncate leading-snug">
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
