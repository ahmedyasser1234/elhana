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

  // Live Instagram Feed Widget (Elfsight Auto-Syncing with @elhana_safari)
  // Automatically live-syncs new posts, reels and videos directly from Instagram
  const elfsightWidgetId = typeof window !== 'undefined'
    ? (window.ELFSIGHT_INSTAGRAM_ID || import.meta.env?.VITE_INSTAGRAM_ELFSIGHT_ID || '6316a352-250a-4ae1-8932-657a03e89816')
    : '6316a352-250a-4ae1-8932-657a03e89816';

  useEffect(() => {
    if (elfsightWidgetId) {
      if (!document.getElementById('elfsight-platform-script')) {
        const script = document.createElement('script');
        script.id = 'elfsight-platform-script';
        script.src = 'https://elfsightcdn.com/platform.js';
        script.async = true;
        document.body.appendChild(script);
      } else if (window.ElfsightPlatform && typeof window.ElfsightPlatform.init === 'function') {
        window.ElfsightPlatform.init();
      }
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
    <section className="w-full py-10 md:py-14 bg-gradient-to-bl from-orange-50/50 via-amber-50/30 to-sky-50/40 text-slate-900 relative overflow-hidden">
      {/* Ambient Radial Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F97316]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0284C7]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10 w-full">
        
        {/* Clean, Minimal Section Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900">
            {isAr ? 'تابع مغامراتنا الحية على إنستغرام' : 'Follow Our Sinai Adventures on Instagram'}
          </h2>
        </div>

        {/* ── AUTO-SYNC ELFSIGHT WIDGET (1 ROW - 4 POSTS) ── */}
        {elfsightWidgetId ? (
          <div className="w-full overflow-hidden">
            <div className={`elfsight-app-${elfsightWidgetId}`} data-elfsight-app-lazy />
          </div>
        ) : (
          /* ── NATIVE RESPONSIVE INSTAGRAM GRID (EXACTLY 1 ROW OF 4 POSTS) ── */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {filteredMedia.slice(0, 4).map((item, index) => {
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
