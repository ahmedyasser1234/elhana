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
      positionClass: "-top-5 ltr:-right-3 ltr:sm:-right-6 rtl:-left-3 rtl:sm:-left-6",
      accentBg: "bg-sky-500/20 text-sky-300",
    },
    {
      id: 2,
      icon: Anchor,
      tag: isAr ? "اليخوت الفاخرة" : "VIP YACHTS",
      title: isAr ? "إبحار ملوكي VIP" : "Royal Sailing VIP",
      positionClass: "top-20 ltr:-left-4 ltr:sm:-left-8 rtl:-right-4 rtl:sm:-right-8",
      accentBg: "bg-amber-500/20 text-amber-300",
    },
    {
      id: 3,
      icon: Waves,
      tag: isAr ? "الغوص والسنوركلينج" : "DIVING & REEFS",
      title: isAr ? "عالم المرجان والأعماق" : "Underwater Reefs",
      positionClass: "bottom-24 ltr:-right-3 ltr:sm:-right-6 rtl:-left-3 rtl:sm:-left-6",
      accentBg: "bg-emerald-500/20 text-emerald-300",
    },
    {
      id: 4,
      icon: Car,
      tag: isAr ? "الانتقالات الخاصة" : "VIP TRANSFERS",
      title: isAr ? "توصيل 24/7 للمطار والفندق" : "24/7 Airport Shuttles",
      positionClass: "-bottom-6 ltr:left-4 ltr:sm:left-6 rtl:right-4 rtl:sm:right-6",
      accentBg: "bg-orange-500/20 text-orange-300",
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden select-none bg-slate-900">
      {/* 1. REAL PHOTO BACKGROUND - SOFT DARK SLATE SHADOW FOR ULTRA READABILITY */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/real/polaris-buggy-family.jpg"
          alt="El Hana Group Buggy Safari Background"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/real/atv-quad-hero.png';
          }}
          className="w-full h-full object-cover object-center filter brightness-100 contrast-105 saturate-105 scale-100"
        />
        
        {/* Soft Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/40 to-slate-950/15 rtl:bg-gradient-to-l"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-transparent to-slate-950/65"></div>
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center gap-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
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
                <button className="px-7 py-3 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-medium text-xs sm:text-sm border border-sky-400/40 shadow-lg shadow-[#0284C7]/40 hover:shadow-sky-500/50 transition duration-300 flex items-center gap-2.5 group cursor-pointer">
                  <span>{isAr ? "استكشف تجاربنا" : "Explore Our Work"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-300 rtl:rotate-180" />
                </button>
              </Link>

              <button
                onClick={() => setShowVideoModal(false)}
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

          {/* IMAGE SHOWCASE COLUMN */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[440px] flex items-center justify-center">
            
            {/* Real Image Frame */}
            <div className="relative w-[88%] h-[88%] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] border-4 border-white/20 bg-slate-900 group cursor-pointer z-20">
              <img
                src="/images/real/polaris-buggy-white.jpg"
                alt="El Hana Group Buggy Safari Sharm El Sheikh"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/real/atv-quad.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              
              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              {/* Real Photo Floating Badge Overlay */}
              <div className="absolute bottom-4 right-4 left-4 bg-slate-900/85 backdrop-blur-md p-3 px-4 rounded-2xl border border-white/20 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-semibold text-white">
                    {isAr ? "صحراء شرم الشيخ • سيناء" : "Sharm El Sheikh Desert • Sinai"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9</span>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            {cardsData.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className={`absolute z-30 ${card.positionClass}`}
                >
                  <div className="group cursor-pointer">
                    <div className="p-3 px-4 rounded-2xl bg-slate-900/85 backdrop-blur-2xl border border-slate-700/60 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-sky-400/60 hover:shadow-[0_20px_40px_rgba(2,132,199,0.3)] flex items-center gap-3 min-w-[210px] max-w-[250px] group-hover:scale-105 transition duration-300">
                      <div className={`p-2.5 rounded-xl ${card.accentBg} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold tracking-wider uppercase block text-sky-400">
                          {card.tag}
                        </span>
                        <h4 className="text-xs font-semibold text-white font-heading leading-snug whitespace-normal">
                          {card.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

        </div>

        {/* BOTTOM SEARCH WIDGET CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full pt-2"
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
    </section>
  );
};

export default HeroSection;
