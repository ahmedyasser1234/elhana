import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Play,
  Film,
  Camera,
  Heart,
  MessageCircle,
  Volume2,
  VolumeX,
  X,
  ExternalLink,
  Eye,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SectionTitle } from '../common/SectionTitle';

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/elhana_safari';
const INSTAGRAM_HANDLE = '@elhana_safari';

// Curated Instagram Reels and Real Experience Posts from Sharm El Sheikh (@elhana_safari)
const INSTAGRAM_MEDIA = [
  // ═══════════════════════════════════════════════════════════════
  // 1. REELS (مقاطع الفيديو والريلز الحقيقية من حسابكم)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'reel-buggy-road',
    type: 'reel',
    videoUrl: '/images/safari/buggy/2seater/sunset/sunset_buggy_video_1.mp4',
    posterUrl: '/images/instagram/insta-reel-buggy.jpg',
    titleAr: 'سفاري الكار باجي على مسارات صحراء شرم الشيخ 🏎️💨',
    titleEn: 'Dune Buggy high-speed desert safari on Sinai trails 🏎️💨',
    views: '38.4K',
    likes: '2.8K',
    comments: '142',
    duration: '0:18',
    tag: '#ElHanaBuggy',
    link: INSTAGRAM_PROFILE_URL
  },
  {
    id: 'reel-atv-dust',
    type: 'reel',
    videoUrl: '/images/safari/atv/single/sunset/sunset_atv_video_1.mp4',
    posterUrl: '/images/instagram/insta-reel-atv-dust.jpg',
    titleAr: 'مطاردة ودريفت البيتش باجي في قلب وادي الجبال بسيناء 🏁🏜️',
    titleEn: 'Thrilling Quad Bike trail chase through Sinai mountain valley 🏁🏜️',
    views: '41.2K',
    likes: '3.1K',
    comments: '187',
    duration: '0:20',
    tag: '#SinaiQuad',
    link: INSTAGRAM_PROFILE_URL
  },
  {
    id: 'reel-bedouin-fire',
    type: 'reel',
    videoUrl: '/images/safari/bedouin/dinner/dinner_bedouin_video_1.mp4',
    posterUrl: '/images/safari/bedouin/vip/IMG-20260722-WA0352.webp',
    titleAr: 'أجواء السهرة والعشاء البدوي وحفلة النار ورصد النجوم ✨⛺🔥',
    titleEn: 'Traditional Bedouin dinner, folklore fire show & stargazing night ✨⛺🔥',
    views: '29.7K',
    likes: '2.2K',
    comments: '95',
    duration: '0:22',
    tag: '#BedouinNight',
    link: INSTAGRAM_PROFILE_URL
  },
  {
    id: 'reel-morning-drift',
    type: 'reel',
    videoUrl: '/images/safari/atv/single/morning/morning_atv_video_1.mp4',
    posterUrl: '/images/real/user-atv-safari.webp',
    titleAr: 'مغامرات البيتش باجي الصباحية في وادي الصدى ☀️🏜️',
    titleEn: 'Morning ATV Quad adventure catching the golden sunrise ☀️🏜️',
    views: '26.5K',
    likes: '1.9K',
    comments: '84',
    duration: '0:15',
    tag: '#MorningSafari',
    link: INSTAGRAM_PROFILE_URL
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. PHOTOS (الصور والفوتوسيشن الحقيقية من الحساب)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'photo-guests-atv',
    type: 'photo',
    url: '/images/instagram/insta-photo-guests-atv.jpg',
    titleAr: 'أبطال وضيوف الهنا في جولة البيتش باجي وسط صحراء سيناء 📸💚',
    titleEn: 'Guests and champions enjoying their quad safari with El Hana 📸💚',
    likes: '3.4K',
    comments: '112',
    tag: '#ElHanaGuests',
    link: INSTAGRAM_PROFILE_URL
  },
  {
    id: 'photo-family-polaris',
    type: 'photo',
    url: '/images/real/family-buggy-ride.jpg',
    titleAr: 'لحظات عائلية مميزة في جولة الكار باجي العائلي الفاخر ❤️🏎️',
    titleEn: 'Special family memories aboard our luxury 4-seater Dune Buggy ❤️🏎️',
    likes: '2.5K',
    comments: '88',
    tag: '#FamilySafari',
    link: INSTAGRAM_PROFILE_URL
  },
  {
    id: 'photo-camel-sunset',
    type: 'photo',
    url: '/images/real/camel-riding-hero.jpg',
    titleAr: 'قوافل الجمال البدوية بالزي السيناوي الأصيل وقت الغروب 🐪🌄',
    titleEn: 'Bedouin camel caravan ride during golden sunset hour 🐪🌄',
    likes: '2.9K',
    comments: '104',
    tag: '#CamelSafari',
    link: INSTAGRAM_PROFILE_URL
  },
  {
    id: 'photo-yacht-cruise',
    type: 'photo',
    url: '/images/sea/ras-mohammed-luxury-yacht.webp',
    titleAr: 'إبحار ملكي VIP في مياه رأس محمد والجزيرة البيضاء الفيروزية 🛥️🌊',
    titleEn: 'Royal VIP yacht cruise across Ras Mohammed & White Island 🛥️🌊',
    likes: '4.5K',
    comments: '178',
    tag: '#VIPYacht',
    link: INSTAGRAM_PROFILE_URL
  }
];

export const InstagramGallery = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [filter, setFilter] = useState('all'); // 'all' | 'reels' | 'photos'
  const [activeReel, setActiveReel] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = useRef(null);

  // Optional Live Instagram Feed Widget (Elfsight / Behold.so)
  // When configured, it automatically live-syncs new posts directly from Instagram
  const elfsightWidgetId = typeof window !== 'undefined' ? (window.ELFSIGHT_INSTAGRAM_ID || import.meta.env?.VITE_INSTAGRAM_ELFSIGHT_ID) : null;

  useEffect(() => {
    if (elfsightWidgetId && !document.getElementById('elfsight-platform-script')) {
      const script = document.createElement('script');
      script.id = 'elfsight-platform-script';
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [elfsightWidgetId]);

  // Lock body scroll and register Escape key when modal is open
  useEffect(() => {
    if (activeReel) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveReel(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeReel]);

  const filteredMedia = INSTAGRAM_MEDIA.filter((item) => {
    if (filter === 'reels') return item.type === 'reel';
    if (filter === 'photos') return item.type === 'photo';
    return true;
  });

  const openReelModal = (reel) => {
    setActiveReel(reel);
    setIsMuted(false);
  };

  const closeReelModal = () => {
    setActiveReel(null);
  };

  const toggleMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="w-full min-h-[calc(100svh-var(--header-h))] flex flex-col justify-center py-12 md:py-16 bg-gradient-to-bl from-orange-50/70 via-amber-50/40 to-sky-50/50 text-slate-900 relative overflow-hidden">
      {/* Ambient Radial Glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          {/* Instagram Badge */}
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-amber-600/10 border border-pink-500/30 text-pink-700 hover:text-pink-800 font-extrabold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-2xs"
          >
            {/* Instagram Camera Vector */}
            <svg className="w-4 h-4 fill-current text-pink-600" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>{isAr ? 'حساب إنستغرام الرسمي' : 'Official Instagram'} {INSTAGRAM_HANDLE}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-500 text-white" />
          </a>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-slate-900">
            {isAr ? 'ريلز ولحظات حية من مغامراتنا في شرم الشيخ' : 'Live Social Grid & Real Instagram Reels'}
          </h2>

          <p className="max-w-2xl text-slate-600 text-xs sm:text-sm font-medium">
            {isAr
              ? 'شاهد أحدث مقاطع الريلز والصور الحية من جولات البيتش باجي، الكار باجي، والسهرات البدوية مباشرة من حسابنا.'
              : 'Real guest moments, video reels and action captures in Sharm El Sheikh straight from our official feed.'}
          </p>

          {/* Interactive Filter Pills */}
          {!elfsightWidgetId && (
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-xs cursor-pointer ${
                  filter === 'all'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200'
                }`}
              >
                {isAr ? 'جميع المنشورات (8)' : 'All Posts (8)'}
              </button>

              <button
                onClick={() => setFilter('reels')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer ${
                  filter === 'reels'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>{isAr ? 'ريلز وفيديو (4)' : 'Reels & Videos (4)'}</span>
              </button>

              <button
                onClick={() => setFilter('photos')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer ${
                  filter === 'photos'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{isAr ? 'صور وتجارب (4)' : 'Photos (4)'}</span>
              </button>
            </div>
          )}
        </div>

        {/* ── AUTO-SYNC ELFSIGHT WIDGET (IF CONFIGURED) ── */}
        {elfsightWidgetId ? (
          <div className="w-full bg-white/70 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-lg min-h-[400px]">
            <div className={`elfsight-app-${elfsightWidgetId}`} data-elfsight-app-lazy />
          </div>
        ) : (
          /* ── NATIVE RESPONSIVE INSTAGRAM GRID ── */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {filteredMedia.map((item, index) => {
              const isReel = item.type === 'reel';
              const mediaSrc = isReel ? item.posterUrl : item.url;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/50 hover:border-pink-500/50 flex flex-col justify-between cursor-pointer"
                  onClick={() => {
                    if (isReel) {
                      openReelModal(item);
                    } else {
                      window.open(item.link || INSTAGRAM_PROFILE_URL, '_blank', 'noreferrer');
                    }
                  }}
                >
                  {/* Poster / Photo Image */}
                  <img
                    src={mediaSrc}
                    alt={isAr ? item.titleAr : item.titleEn}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Shading Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/90 transition-opacity" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                    {isReel ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-md text-[11px] font-black text-white shadow-xs">
                        <Film className="w-3 h-3" />
                        <span>REEL</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-bold text-white shadow-xs">
                        <Camera className="w-3 h-3" />
                        <span>POST</span>
                      </span>
                    )}

                    <div className="flex items-center gap-1.5">
                      {isReel && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-slate-200">
                          <Eye className="w-3 h-3 text-sky-400" />
                          <span>{item.views}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Center Play Button for Reels */}
                  {isReel && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-3 inset-x-3 z-10 text-white space-y-1">
                    <p className="text-[11px] sm:text-xs font-bold line-clamp-2 leading-snug drop-shadow-sm text-slate-100 group-hover:text-white">
                      {isAr ? item.titleAr : item.titleEn}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                          <span className="font-mono text-xs">{item.likes}</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 text-slate-300" />
                          <span className="font-mono text-xs">{item.comments}</span>
                        </span>
                      </div>

                      <span className="text-[10px] text-pink-300 font-bold group-hover:underline inline-flex items-center gap-0.5">
                        <span>{isReel ? (isAr ? 'تشغيل' : 'Watch') : (isAr ? 'عرض' : 'View')}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Action & Direct Instagram Link Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#F97316] via-pink-600 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-black text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>{isAr ? 'تابع حسابنا على إنستغرام @elhana_safari' : 'Follow @elhana_safari on Instagram'}</span>
          </a>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-5 py-3 rounded-full border border-slate-200 shadow-2xs hover:border-slate-300 transition"
          >
            <span>{isAr ? 'شاركنا تجاربك مع منشن @elhana_safari' : 'Tag @elhana_safari in your stories'}</span>
          </a>
        </div>

      </div>

      {/* ── INTERACTIVE INSTAGRAM REEL MODAL (PORTAL OUTSIDE NAVBAR) ── */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeReel && (
            <div
              className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-xl overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              {/* Backdrop Click to Close */}
              <div
                className="fixed inset-0 cursor-pointer"
                onClick={closeReelModal}
              />

              {/* Floating Prominent Close Button (Always accessible at screen corner) */}
              <button
                onClick={closeReelModal}
                className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[1000000] w-12 h-12 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center backdrop-blur-md transition shadow-2xl cursor-pointer"
                title={isAr ? 'إغلاق الفيديو (Esc)' : 'Close Video (Esc)'}
                aria-label="Close modal"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 20 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-sm sm:max-w-md bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col my-auto max-h-[92vh]"
              >
                {/* Modal Top Bar */}
                <div className="p-3.5 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between z-20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600">
                      <img
                        src="/logo.png"
                        alt="El Hana"
                        className="w-full h-full rounded-full bg-white object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 font-bold text-xs text-white">
                        <span>{INSTAGRAM_HANDLE}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400 text-slate-900" />
                      </div>
                      <span className="text-[10px] text-slate-400">Instagram Reel</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition cursor-pointer"
                      title={isMuted ? (isAr ? 'تشغيل الصوت' : 'Unmute') : (isAr ? 'كتم الصوت' : 'Mute')}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={closeReelModal}
                      className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition cursor-pointer"
                      title={isAr ? 'إغلاق' : 'Close'}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Video Player Bay */}
                <div className="relative aspect-[9/16] max-h-[58vh] bg-black flex items-center justify-center overflow-hidden">
                  <video
                    ref={modalVideoRef}
                    src={activeReel.videoUrl}
                    poster={activeReel.posterUrl}
                    autoPlay
                    loop
                    playsInline
                    muted={isMuted}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Modal Bottom Actions & Caption */}
                <div className="p-4 bg-slate-950 space-y-3 border-t border-slate-800">
                  <p className="text-xs text-slate-200 font-semibold leading-relaxed">
                    {isAr ? activeReel.titleAr : activeReel.titleEn}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                        <span className="font-mono text-white">{activeReel.likes}</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-slate-300" />
                        <span className="font-mono text-white">{activeReel.comments}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-slate-300">
                        <Eye className="w-4 h-4 text-sky-400" />
                        <span>{activeReel.views}</span>
                      </span>
                    </div>

                    <a
                      href={activeReel.link || INSTAGRAM_PROFILE_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs hover:scale-105 transition shadow-sm"
                    >
                      <span>{isAr ? 'مشاهدة على إنستغرام' : 'Open in Instagram'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default InstagramGallery;
