import React, { useState, useRef } from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { SectionTitle } from '../common/SectionTitle';

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/elhana_safari';
const INSTAGRAM_HANDLE = '@elhana_safari';

// Curated Instagram Reels and Real Experience Posts from Sharm El Sheikh
const INSTAGRAM_MEDIA = [
  // ═══════════════════════════════════════════════════════════════
  // 1. REELS (مقاطع الفيديو والريلز)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'reel-1',
    type: 'reel',
    videoUrl: '/images/safari/atv/single/sunset/sunset_atv_video_1.mp4',
    posterUrl: '/images/real/atv-real-showcase-5.webp',
    titleAr: 'سفاري البيتش باجي في صحراء سيناء وقت الغروب 🌅🏁',
    titleEn: 'Sunset ATV Quad Safari across Sinai desert dunes 🌅🏁',
    views: '38.4K',
    likes: '2.8K',
    comments: '142',
    duration: '0:18',
    tag: '#ElHanaReels'
  },
  {
    id: 'reel-2',
    type: 'reel',
    videoUrl: '/images/safari/atv/single/morning/morning_atv_video_1.mp4',
    posterUrl: '/images/real/user-atv-safari.webp',
    titleAr: 'مغامرات صباحية مع ضيوف الهنا في وادي الصدى ☀️🏜️',
    titleEn: 'Morning desert thrills with El Hana guests in Echo Valley ☀️🏜️',
    views: '29.1K',
    likes: '1.9K',
    comments: '98',
    duration: '0:15',
    tag: '#SharmSafari'
  },
  {
    id: 'reel-3',
    type: 'reel',
    videoUrl: '/images/safari/atv/single/dinner/dinner_atv_video_1.mp4',
    posterUrl: '/images/real/polaris-buggy-family.webp',
    titleAr: 'إثارة وسرعة الكار باجي في الكثبان الرملية الذهبية 🏎️💨',
    titleEn: 'High-speed Polaris Dune Buggy thrilling sand drift 🏎️💨',
    views: '44.6K',
    likes: '3.7K',
    comments: '215',
    duration: '0:22',
    tag: '#PolarisDrift'
  },
  {
    id: 'reel-4',
    type: 'reel',
    videoUrl: '/images/safari/bedouin/dinner/dinner_bedouin_video_1.mp4',
    posterUrl: '/images/safari/bedouin/vip/IMG-20260722-WA0352.webp',
    titleAr: 'أجواء السهرة والعشاء البدوي وحفلة رصد النجوم في الخيمة الملكية ✨⛺',
    titleEn: 'Bedouin BBQ dinner, folklore fire show & stargazing night ✨⛺',
    views: '22.3K',
    likes: '1.6K',
    comments: '86',
    duration: '0:20',
    tag: '#BedouinNight'
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. PHOTOS (الصور والفوتوسيشن)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'photo-1',
    type: 'photo',
    url: '/images/real/family-buggy-ride.jpg',
    titleAr: 'لحظات لا تُنسى لعائلات الهنا في قلب صحراء شرم الشيخ ❤️📸',
    titleEn: 'Unforgettable moments with El Hana families in Sharm desert ❤️📸',
    likes: '2.1K',
    comments: '74',
    tag: '#FamilyMoments'
  },
  {
    id: 'photo-2',
    type: 'photo',
    url: '/images/real/camel-riding-hero.jpg',
    titleAr: 'قوافل الجمال البدوية بالزي السيناوي الأصيل وقت الغروب 🐪🌄',
    titleEn: 'Bedouin camel caravan ride during golden sunset hour 🐪🌄',
    likes: '2.6K',
    comments: '92',
    tag: '#CamelSafari'
  },
  {
    id: 'photo-3',
    type: 'photo',
    url: '/images/sea/ras-mohammed-luxury-yacht.webp',
    titleAr: 'إبحار ملكي VIP في مياه رأس محمد والجزيرة البيضاء الفيروزية 🛥️🌊',
    titleEn: 'Royal VIP yacht cruise across Ras Mohammed & White Island 🛥️🌊',
    likes: '4.2K',
    comments: '163',
    tag: '#VIPYacht'
  },
  {
    id: 'photo-4',
    type: 'photo',
    url: '/images/real/horse-riding-hero.jpg',
    titleAr: 'ركوب الخيل العربي الأصيل على رمال سيناء مع مشهد الجبال الخلابة 🐎🏜️',
    titleEn: 'Arabian horseback riding along dramatic Sinai desert trails 🐎🏜️',
    likes: '1.7K',
    comments: '53',
    tag: '#ArabianHorse'
  }
];

export const InstagramGallery = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [filter, setFilter] = useState('all'); // 'all' | 'reels' | 'photos'
  const [activeReel, setActiveReel] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const modalVideoRef = useRef(null);

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
    <div className="w-full min-h-[calc(100svh-var(--header-h))] flex flex-col justify-center py-12 md:py-16 bg-gradient-to-bl from-orange-50/70 via-amber-50/40 to-sky-50/50 text-slate-900 relative overflow-hidden">
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
            {isAr ? 'عِش المغامرة لايف عبر ريلز وصور إنستغرام' : 'Live Social Grid & Real Instagram Reels'}
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed font-medium">
            {isAr
              ? 'مقاطع فيديو وريلز حقيقية وتجارب ضيوفنا في صحراء وبحر شرم الشيخ مباشرة من حسابنا'
              : 'Real guest moments, video reels and action captures in Sharm El Sheikh straight from our feed.'}
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isAr ? 'جميع المنشورات (8)' : 'All Posts (8)'}
            </button>
            <button
              onClick={() => setFilter('reels')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'reels'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-pink-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{isAr ? 'ريلز وفيديو (4)' : 'Reels & Videos (4)'}</span>
            </button>
            <button
              onClick={() => setFilter('photos')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'photos'
                  ? 'bg-[#0284C7] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{isAr ? 'صور وتجارب (4)' : 'Photos (4)'}</span>
            </button>
          </div>
        </div>

        {/* Media Grid: 4 Columns on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {filteredMedia.map((item, idx) => {
            const isReel = item.type === 'reel';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => {
                  if (isReel) {
                    openReelModal(item);
                  } else {
                    window.open(INSTAGRAM_PROFILE_URL, '_blank', 'noreferrer');
                  }
                }}
                className="group relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Media Image / Poster */}
                <img
                  src={isReel ? item.posterUrl : item.url}
                  alt={isAr ? item.titleAr : item.titleEn}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

                {/* Top Corner Badge: Reel vs Photo */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                  {isReel ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md">
                      <Film className="w-3 h-3" />
                      <span>REEL</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs">
                      <Camera className="w-3 h-3 text-[#0284C7]" />
                      <span>PHOTO</span>
                    </span>
                  )}

                  {/* Views or Likes Counter */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-black/60 backdrop-blur-xs text-white border border-white/20">
                    {isReel ? (
                      <>
                        <Eye className="w-3 h-3 text-sky-400" />
                        <span>{item.views}</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                        <span>{item.likes}</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Center Play Button for Reels */}
                {isReel && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-xs text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-gradient-to-tr group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-300">
                      <Play className="w-5 h-5 fill-current ms-0.5" />
                    </div>
                  </div>
                )}

                {/* Bottom Content: Caption & Tag */}
                <div className="absolute bottom-3 inset-x-3 z-10 text-white space-y-1">
                  <p className="text-xs font-bold leading-snug line-clamp-2 drop-shadow-md">
                    {isAr ? item.titleAr : item.titleEn}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 pt-0.5">
                    <span className="font-semibold text-amber-300">{item.tag}</span>
                    <span className="text-[10px] text-slate-400">{INSTAGRAM_HANDLE}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Big Instagram Follow Banner */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-700 hover:via-pink-700 hover:to-amber-700 px-8 py-3.5 rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/35 transition-all hover:scale-105 cursor-pointer"
          >
            {/* Instagram White Camera SVG */}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>{isAr ? 'متابعة الحساب ومشاهدة كل الريلز' : 'Follow & Watch All Reels'}</span>
            <span>↗</span>
          </a>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-5 py-3 rounded-full border border-slate-200 shadow-2xs hover:border-slate-300 transition"
          >
            <span>{isAr ? 'منشن حسابك في مغامراتك لتظهر هنا' : 'Tag @elhana_safari in your stories'}</span>
          </a>
        </div>

      </div>

      {/* Interactive Instagram Reel Video Modal */}
      <AnimatePresence>
        {activeReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={closeReelModal} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-sm sm:max-w-md bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Bar */}
              <div className="p-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between z-20">
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
                      <CheckCircle2 className="w-3 h-3 text-sky-400 fill-sky-400 text-slate-900" />
                    </div>
                    <span className="text-[10px] text-slate-400">Instagram Reel</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-slate-800 text-slate-200 hover:text-white flex items-center justify-center transition"
                    title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={closeReelModal}
                    className="w-8 h-8 rounded-full bg-slate-800 text-slate-200 hover:text-white flex items-center justify-center transition"
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
                    href={INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs hover:scale-105 transition shadow-sm"
                  >
                    <span>{isAr ? 'مشاهدة على إنستغرام' : 'Open in Instagram'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstagramGallery;
