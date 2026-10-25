import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Image as ImageIcon, Video as VideoIcon, Clock, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMediaManifest, getMediaForCategory } from '../../utils/mediaScanner';

export const TripSlotMediaModal = ({
  isOpen,
  onClose,
  category = 'atv', // 'atv' | 'buggy' | 'camel' | 'horse' | 'bedouin'
  subCategory = 'all', // 'single' | 'double' | '2seater' | '4seater' | 'polaris1000' etc.
  initialSlot = 'sunset', // 'sunrise' | 'morning' | 'sunset' | 'dinner'
  onSelectSlotAndBook, // callback when user clicks "Book this slot now"
}) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const [mounted, setMounted] = useState(false);
  const [activeSlot, setActiveSlot] = useState(initialSlot || 'sunset');
  const [mediaFilter, setMediaFilter] = useState('all'); // 'all' | 'image' | 'video'
  const [activeMediaItem, setActiveMediaItem] = useState(null); // for fullscreen lightbox/video player

  // Ensure manifest is loaded before rendering media
  useMediaManifest();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (initialSlot) {
      setActiveSlot(initialSlot);
    }
  }, [initialSlot]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setActiveMediaItem(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Retrieve scanned media for this category, sub-category, and active slot
  const { images, videos, all } = getMediaForCategory(category, subCategory, activeSlot);

  const displayedItems = mediaFilter === 'image'
    ? images
    : mediaFilter === 'video'
    ? videos
    : all;

  // Time slot metadata
  const slotsConfig = [
    {
      id: 'sunrise',
      icon: Sunrise,
      time: '04:30 AM',
      titleAr: 'رحلة الشروق (الفجر)',
      titleEn: 'Sunrise Safari (Dawn)',
      color: 'from-amber-500 to-orange-500',
      badgeAr: 'سحر بزوغ الشمس الذهبية بين جبال سيناء',
      badgeEn: 'Golden dawn atmosphere across Sinai mountains'
    },
    {
      id: 'morning',
      icon: Sun,
      time: '09:00 AM',
      titleAr: 'رحلة الصباح (الساعة 9)',
      titleEn: 'Morning Safari (09:00 AM)',
      color: 'from-sky-500 to-blue-600',
      badgeAr: 'أجواء الانطلاق الصحراوي والسرعة في ضوء النهار',
      badgeEn: 'High daylight visibility & desert thrill'
    },
    {
      id: 'sunset',
      icon: Sunset,
      time: '04:00 PM',
      titleAr: 'رحلة الغروب (الأكثر طلباً)',
      titleEn: 'Sunset Safari (Most Popular)',
      color: 'from-orange-500 via-rose-500 to-purple-600',
      badgeAr: 'اللحظة الذهبية الأجمل لالتقاط الصور التذكارية',
      badgeEn: 'Prime golden hour for photography & breathtaking views'
    },
    {
      id: 'dinner',
      icon: Moon,
      time: '05:30 / 06:30 PM',
      titleAr: 'سهرة العشاء البدوي والحفلة',
      titleEn: 'Bedouin Dinner & Night Show',
      color: 'from-purple-600 to-indigo-800',
      badgeAr: 'نار المخيم، بوفيه المشاوي، ورصد النجوم بالتلسكوب',
      badgeEn: 'Campfire BBQ, folklore show & telescope stargazing'
    }
  ];

  const currentSlotConfig = slotsConfig.find(s => s.id === activeSlot) || slotsConfig[2];

  const getCategoryTitle = () => {
    if (category === 'atv') {
      if (subCategory === 'single') return isAr ? 'بيتش باجي سنجل (فردي)' : 'Single ATV Quad';
      if (subCategory === 'double') return isAr ? 'بيتش باجي دبل (مزدوج)' : 'Double ATV Quad';
      return isAr ? 'رحلات البيتش باجي' : 'ATV Quad Safari';
    }
    if (category === 'buggy') {
      if (subCategory === '2seater') return isAr ? 'كار باجي ثنائي (2 مقعد)' : '2-Seater Buggy';
      if (subCategory === '4seater') return isAr ? 'كار باجي عائلي (4 مقاعد)' : '4-Seater Family Buggy';
      if (subCategory === 'polaris1000') return isAr ? 'بولاريس 1000 تيربو' : 'Polaris 1000 Turbo';
      return isAr ? 'رحلات الكار باجي والبولاريس' : 'Car Buggy & Polaris Safari';
    }
    if (category === 'camel') return isAr ? 'رحلات ركوب الجمال' : 'Camel Riding Safari';
    if (category === 'horse') return isAr ? 'رحلات ركوب الخيل' : 'Horse Riding Experience';
    if (category === 'bedouin') return isAr ? 'السهرة والعشاء البدوي' : 'Bedouin Dinner Experience';
    return isAr ? 'سفاري سيناء' : 'Sinai Safari';
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999999] flex items-center justify-center p-0 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[92vh] bg-white sm:rounded-3xl shadow-2xl border-0 sm:border sm:border-slate-200 flex flex-col overflow-hidden"
      >
        {/* 1. Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-3.5 sm:px-6 flex items-center justify-between border-b border-slate-700/60 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br ${currentSlotConfig.color} flex items-center justify-center text-white shadow-md shrink-0`}>
              <currentSlotConfig.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-xs sm:text-base font-black truncate font-heading">
                  {getCategoryTitle()}
                </span>
                <span className="text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-white/15 text-orange-300 border border-white/10">
                  {isAr ? currentSlotConfig.titleAr : currentSlotConfig.titleEn}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">
                {isAr ? currentSlotConfig.badgeAr : currentSlotConfig.badgeEn}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-rose-500/80 text-white transition active:scale-95 shrink-0 ml-1 rtl:mr-1 rtl:ml-0 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* 2. Interactive Time Slot Selector Pills */}
        <div className="bg-slate-50 border-b border-slate-200 p-2 sm:p-3 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            {slotsConfig.map((slot) => {
              const Icon = slot.icon;
              const isActive = activeSlot === slot.id;
              return (
                <button
                  key={slot.id}
                  onClick={() => setActiveSlot(slot.id)}
                  className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center gap-1.5 sm:gap-2 border cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white border-transparent shadow-md scale-[1.01]'
                      : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-amber-500'}`} />
                  <span>{isAr ? slot.titleAr : slot.titleEn}</span>
                  <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {slot.time}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Filter Bar (All / Photos / Videos) + Quick Count */}
        <div className="px-3 sm:px-6 py-2 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 sm:gap-1.5 text-xs font-bold">
            <button
              onClick={() => setMediaFilter('all')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs transition cursor-pointer ${
                mediaFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isAr ? `الكل (${all.length})` : `All (${all.length})`}
            </button>
            <button
              onClick={() => setMediaFilter('image')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs transition flex items-center gap-1 cursor-pointer ${
                mediaFilter === 'image'
                  ? 'bg-[#0284C7] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{isAr ? `الصور (${images.length})` : `Photos (${images.length})`}</span>
            </button>
            <button
              onClick={() => setMediaFilter('video')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs transition flex items-center gap-1 cursor-pointer ${
                mediaFilter === 'video'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              <span>{isAr ? `فيديوهات (${videos.length})` : `Videos (${videos.length})`}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isAr ? 'تم التقاطها من جولات حقيقية' : 'Verified Real Tour Footage'}</span>
          </div>
        </div>

        {/* 4. Media Grid Container */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 overscroll-contain">
          {displayedItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-700 text-sm">
                {isAr ? 'جاري تجهيز وسائط إضافية لهذا التوقيت' : 'More media coming soon for this slot'}
              </h4>
              <p className="text-xs text-slate-500">
                {isAr ? 'يمكنك التبديل بين أوقات الرحلات بالأعلى لاستعراض المزيد من الصور والفيديوهات الحقيقية.' : 'Switch time slots above to explore more live photos and footage.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
              {displayedItems.map((item, idx) => {
                const isVideo = item.type === 'video';
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => setActiveMediaItem(item)}
                    className="group relative aspect-4/3 sm:aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    {isVideo ? (
                      <>
                        <video
                          src={item.url}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition flex items-center justify-center">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-rose-600 text-white text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                          <VideoIcon className="w-3 h-3" />
                          <span>{isAr ? 'فيديو' : 'Video'}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={item.url}
                          alt={item.title?.[isAr ? 'ar' : 'en'] || 'Tour photo'}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-2 sm:p-3">
                          <p className="text-[10px] sm:text-[11px] font-bold text-white line-clamp-1">
                            {item.title?.[isAr ? 'ar' : 'en']}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. Footer CTA Bar */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-slate-700 w-full sm:w-auto justify-center sm:justify-start">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F97316] shrink-0" />
            <span className="truncate">
              {isAr
                ? `الموعد المختار: ${currentSlotConfig.titleAr} (${currentSlotConfig.time})`
                : `Selected Slot: ${currentSlotConfig.titleEn} (${currentSlotConfig.time})`}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                if (onSelectSlotAndBook) {
                  onSelectSlotAndBook(activeSlot, currentSlotConfig.time);
                }
              }}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-sky-600/25 hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? `احجز موعد ${currentSlotConfig.titleAr} الآن` : `Book ${currentSlotConfig.titleEn} Now`}</span>
            </button>
          </div>
        </div>

        {/* 6. Nested Lightbox / Video Player Modal */}
        <AnimatePresence>
          {activeMediaItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMediaItem(null)}
              className="absolute inset-0 z-50 bg-black/95 flex flex-col justify-between p-3 sm:p-4"
            >
              <div className="flex items-center justify-between text-white pb-2 shrink-0">
                <span className="text-xs sm:text-sm font-bold truncate">
                  {activeMediaItem.title?.[isAr ? 'ar' : 'en'] || (isAr ? 'عرض الوسائط' : 'Media Preview')}
                </span>
                <button
                  onClick={() => setActiveMediaItem(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {activeMediaItem.type === 'video' ? (
                  <video
                    src={activeMediaItem.url}
                    controls
                    autoPlay
                    playsInline
                    className="max-w-full max-h-[75vh] rounded-2xl shadow-2xl bg-black"
                  />
                ) : (
                  <img
                    src={activeMediaItem.url}
                    alt="Tour full"
                    className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
                  />
                )}
              </div>

              <div className="text-center text-[11px] sm:text-xs text-slate-400 pt-2 shrink-0">
                {isAr ? 'انقر على أي مكان للإغلاق أو زر X' : 'Click anywhere outside or X to close'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>,
    document.body
  );
};

export default TripSlotMediaModal;
