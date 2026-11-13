import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Compass, Anchor, Waves, Car, ArrowRight, Play, Star, MapPin } from 'lucide-react';
import { FloatingSearchWidget } from './FloatingSearchWidget';

export const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Floating Cards Configuration
  const cardsData = [
    {
      id: 1,
      icon: Compass,
      tag: isAr ? "سفاري الصحراء" : "DESERT SAFARI",
      title: isAr ? "إثارة وتشويق بلا حدود" : "Pure Adrenaline",
      link: "/safari",
      positionClass: "-top-5 ltr:-right-4 ltr:xl:-right-8 rtl:-left-4 rtl:xl:-left-8",
      accentBg: "bg-sky-500/20 text-sky-300",
    },
    {
      id: 2,
      icon: Anchor,
      tag: isAr ? "اليخوت الفاخرة" : "VIP YACHTS",
      title: isAr ? "إبحار ملوكي VIP" : "Royal Sailing VIP",
      link: "/sea-trips",
      positionClass: "top-20 ltr:-left-4 ltr:xl:-left-8 rtl:-right-4 rtl:xl:-right-8",
      accentBg: "bg-amber-500/20 text-amber-300",
    },
    {
      id: 3,
      icon: Waves,
      tag: isAr ? "الغوص والسنوركلينج" : "DIVING & REEFS",
      title: isAr ? "عالم المرجان والأعماق" : "Underwater Reefs",
      link: "/diving",
      positionClass: "bottom-20 ltr:-right-4 ltr:xl:-right-8 rtl:-left-4 rtl:xl:-left-8",
      accentBg: "bg-emerald-500/20 text-emerald-300",
    },
    {
      id: 4,
      icon: Car,
      tag: isAr ? "الانتقالات الخاصة" : "VIP TRANSFERS",
      title: isAr ? "توصيل 24/7 للمطار والفندق" : "24/7 Airport Shuttles",
      link: "/transfers",
      positionClass: "-bottom-5 ltr:left-4 ltr:xl:left-8 rtl:right-4 rtl:xl:right-8",
      accentBg: "bg-orange-500/20 text-orange-300",
    },
  ];

  return (
    <div className="relative min-h-[calc(100svh-var(--header-h))] flex flex-col justify-between py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-x-clip select-none bg-slate-900 w-full">
      {/* 1. REAL PHOTO BACKGROUND - SOFT DARK SLATE SHADOW FOR ULTRA READABILITY */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/real/polaris-buggy-family-mobile.webp" type="image/webp" />
          <source srcSet="/images/real/polaris-buggy-family.webp" type="image/webp" />
          <img
            src="/images/real/polaris-buggy-family.jpg"
            alt="El Hana Group Buggy Safari Background"
            width="1400"
            height="800"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/real/atv-quad-hero.png';
            }}
            className="w-full h-full object-cover object-center filter brightness-100 contrast-105 saturate-105 scale-100"
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
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-sky-400/40 text-sky-300 font-semibold text-xs tracking-wider shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              <span>{isAr ? "شركة الهنا للسياحة والسفاري VIP" : "EL HANA GROUP TOURISM VIP"}</span>
            </motion.div>

            {/* Single Line Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
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
            </motion.div>

            {/* Subtitle Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-100 max-w-xl font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]"
            >
              {isAr
                ? "نصنع تجارب سياحية فاخرة تجمع بين إثارة صحراء سيناء، يخوت البحر الأحمر VIP، والانتقالات المباشرة من الفندق في شرم الشيخ."
                : "We partner with ambitious travelers to create Sinai adventures that resonate, engage, and deliver real impact."}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
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
            </motion.div>

          </div>

          {/* IMAGE SHOWCASE COLUMN - 100% RESPONSIVE (Zero Overlap on Mobile) */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center">
            
            {/* 1. Real Image Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3] lg:h-[400px] xl:h-[440px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 sm:border-4 border-white/20 bg-slate-950 group z-20">
              <picture>
                <source srcSet="/images/real/polaris-buggy-white.webp" type="image/webp" />
                <img
                  src="/images/real/polaris-buggy-white.jpg"
                  alt="El Hana Group Buggy Safari Sharm El Sheikh"
                  width="600"
                  height="450"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/real/atv-quad.jpg';
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
                />
              </picture>
              
              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>

              {/* Top VIP Pill Badge */}
              <div className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-bold text-sky-300 shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{isAr ? "مغامرات شرم الحصرية" : "Exclusive Experiences"}</span>
              </div>

              {/* Real Photo Floating Bottom Badge Overlay */}
              <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 bg-slate-900/90 backdrop-blur-md p-2.5 sm:p-3 px-3.5 sm:px-4 rounded-2xl border border-white/20 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-xs font-semibold text-white truncate">
                    {isAr ? "صحراء شرم الشيخ • سيناء" : "Sharm El Sheikh Desert • Sinai"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9</span>
                  <span className="text-[10px] text-slate-400 hidden sm:inline">(1,280+)</span>
                </div>
              </div>
            </div>

            {/* Floating Cards (Desktop Only: lg and above, where space allows elegant hovering around image) */}
            <div className="hidden lg:block max-lg:!hidden">
              {cardsData.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.id}
                    to={card.link}
                    className={`absolute z-30 ${card.positionClass} group cursor-pointer block`}
                  >
                    <div className="p-3 px-4 rounded-2xl bg-slate-900/90 backdrop-blur-2xl border border-slate-700/70 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-sky-400/80 hover:shadow-[0_20px_40px_rgba(2,132,199,0.35)] flex items-center gap-3 min-w-[200px] max-w-[240px] group-hover:scale-105 transition duration-300">
                      <div className={`p-2.5 rounded-xl ${card.accentBg} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-bold tracking-wider uppercase block text-sky-400">
                          {card.tag}
                        </span>
                        <div className="text-xs font-bold text-white font-heading leading-snug truncate">
                          {card.title}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile / Tablet Interactive Category Grid (2x2) - Neat, readable, zero overlap, zero collision */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-3.5 w-full max-w-sm sm:max-w-md mx-auto lg:hidden">
              {cardsData.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.id}
                    to={card.link}
                    className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/80 hover:border-sky-500/60 shadow-lg flex items-center gap-2.5 active:scale-98 transition group"
                  >
                    <div className={`p-2 rounded-xl ${card.accentBg} shrink-0`}>
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] font-bold text-sky-400 block truncate">
                        {card.tag}
                      </span>
                      <div className="text-[11px] sm:text-xs font-bold text-white group-hover:text-sky-300 transition truncate leading-tight">
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
          className="w-full pt-2 relative z-30"
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
