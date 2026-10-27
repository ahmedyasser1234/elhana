import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BookingWidget } from '../components/booking/BookingWidget';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { EXPERIENCES, getLocalizedExperience } from '../data/experiences';
import { useCurrency } from '../context/CurrencyContext';
import {
  Clock, MapPin, ShieldCheck, Sparkles, Check, X, Info,
  Maximize2, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Sun, Moon,
  Sunrise, Sunset, Camera, Compass, Mountain, Castle, Palmtree, Waves
} from 'lucide-react';
import { TripSlotMediaModal } from '../components/safari/TripSlotMediaModal';
import { useMediaManifest, getFolderImages } from '../utils/mediaScanner';

// 3D Autoplay Photo Gallery Component with responsive mobile thumbnails
const GalleryShowcase = ({ galleryTitle, images, isAr, onOpenLightbox }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Slower Autoplay slideshow every 8 seconds
  useEffect(() => {
    if (isHovered || !images || images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered, images]);

  // Reset index if destination/tab changes
  useEffect(() => {
    setActiveIdx(0);
  }, [galleryTitle]);

  if (!images || images.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900">
          {galleryTitle}
        </h3>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {activeIdx + 1} / {images.length}
        </span>
      </div>

      {/* Gallery Grid with 3D Spheres Reel & Rotation Motion */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Large 3D Featured Image */}
        <div className="md:col-span-3 relative rounded-2xl overflow-hidden shadow-2xl bg-slate-950 group h-[260px] sm:h-[340px] md:h-[460px] flex border border-slate-800 [perspective:1200px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, rotateY: 75, scale: 0.8, filter: 'blur(8px)' }}
              animate={{ opacity: 1, rotateY: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, rotateY: -75, scale: 0.8, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={images[activeIdx] || images[0]}
                alt={galleryTitle}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = images[0] || '/images/excursions/dahab/dahab-blue-hole.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </motion.div>
          </AnimatePresence>

          {/* Ambient Lighting Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

          {/* Prev / Next Click Arrows Over Main Image */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                }}
                className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </>
          )}

          {/* Slide Indicator Dots / Counter */}
          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-10 flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {images.length <= 8 ? (
              images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`transition-all duration-500 rounded-full cursor-pointer ${
                    activeIdx === i ? 'w-5 h-2 bg-emerald-500' : 'w-2 h-2 bg-white/40 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))
            ) : (
              <span className="text-[11px] font-bold text-white">
                {activeIdx + 1} / {images.length}
              </span>
            )}
          </div>

          {/* Lightbox Button Overlay */}
          <button
            type="button"
            onClick={() => onOpenLightbox(activeIdx)}
            className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 bg-slate-950/85 hover:bg-slate-950 text-white backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 z-20 cursor-pointer"
          >
            <Maximize2 className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'عرض المكبر' : 'Enlarge Photo'}</span>
          </button>
        </div>

        {/* Desktop 3D Vertical Reel Strip (visible ONLY on md: and up) */}
        <div className="hidden md:flex relative flex-col items-center justify-center h-[460px] overflow-hidden px-2 py-4 [perspective:1000px] w-full">
          {images.length > 3 && (
            <button
              type="button"
              onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute top-1 z-20 p-2 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition hover:scale-110 shadow-lg cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronUp className="w-4 h-4 text-emerald-400" />
            </button>
          )}

          <motion.div
            animate={{
              y: images.length > 3 ? -(activeIdx * 125) + 125 : 0
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center gap-6 py-6"
          >
            {images.map((img, idx) => {
              const isActive = activeIdx === idx;
              return (
                <motion.button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  whileHover={{ rotateY: 30, rotateX: -15, scale: 1.15, z: 20 }}
                  whileTap={{ scale: 0.9, rotateY: 180 }}
                  animate={{
                    y: isActive ? [0, -6, 0] : 0,
                    rotateY: isActive ? [0, 15, -15, 0] : 0,
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    rotateY: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                    type: 'spring',
                    stiffness: 250,
                    damping: 20
                  }}
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden transition-all duration-500 group/thumb shrink-0 shadow-2xl cursor-pointer ${
                    isActive
                      ? 'ring-4 ring-emerald-500 ring-offset-2 ring-offset-white scale-110 shadow-[0_12px_32px_-2px_rgba(16,185,129,0.65)] z-10'
                      : 'ring-2 ring-slate-200/90 opacity-60 hover:opacity-100 scale-95'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {isActive && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-[#F97316] opacity-75 blur-[5px] pointer-events-none"
                    />
                  )}

                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = images[0] || '/images/excursions/dahab/dahab-blue-hole.jpg';
                    }}
                    className="w-full h-full object-cover rounded-full group-hover/thumb:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-black/75 pointer-events-none shadow-[inset_0_-8px_16px_rgba(0,0,0,0.7),inset_0_4px_8px_rgba(255,255,255,0.4)]" />

                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500 bg-emerald-500/15 pointer-events-none" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {images.length > 3 && (
            <button
              type="button"
              onClick={() => setActiveIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute bottom-1 z-20 p-2 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition hover:scale-110 shadow-lg cursor-pointer"
              aria-label="Next image"
            >
              <ChevronDown className="w-4 h-4 text-emerald-400" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Horizontal Thumbnail Strip (visible ONLY on mobile < md) */}
      {images.length > 1 && (
        <div className="flex md:hidden items-center gap-2.5 overflow-x-auto py-2 px-1 no-scrollbar w-full scroll-smooth">
          {images.map((img, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden transition-all duration-300 border-2 cursor-pointer ${
                  isActive
                    ? 'border-emerald-500 ring-2 ring-emerald-500/50 scale-105 shadow-md z-10'
                    : 'border-slate-200 opacity-60 hover:opacity-100 scale-95'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = images[0] || '/images/excursions/dahab/dahab-blue-hole.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-emerald-500/15 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ExcursionsPage = ({ defaultTab = 'dahab' }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { formatPrice } = useCurrency();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Destination Tab: dahab | catherine | taba | nuweiba
  const initialTab = searchParams.get('tab') || defaultTab;
  const [activeTab, setActiveTab] = useState(initialTab);

  // Active Sub-Tab per destination
  const initialSubTab = searchParams.get('option') || (initialTab === 'catherine' ? 'sunrise_hike' : 'standard');
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);

  // Lightbox Modal state
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Time slot modal
  const [slotMediaModalOpen, setSlotMediaModalOpen] = useState(false);
  const [selectedMediaSlot, setSelectedMediaSlot] = useState('morning');

  // Load media manifest (auto-discovers uploaded photos and videos in folders)
  const { images: manifestImages, loading: mediaLoading } = useMediaManifest();

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['dahab', 'catherine', 'taba', 'nuweiba'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Main Category Tab Config
  const tabConfig = {
    dahab: {
      heroTitle: isAr ? 'رحلة دهب الصباحية من شرم الشيخ' : 'Dahab Morning Day Tour from Sharm El Sheikh',
      heroSubtitle: isAr
        ? 'تقام يومياً من الساعة 08:00 صباحاً إلى 05:00 مساءً: استمتع بالسنوركلينج لمدة ساعة كاملة بالثري بولز أو الكانيون، ركوب الجمال على شاطئ البحر لمدة 15 دقيقة، تناول الغداء بمطعم على البحر، جولة تسوق بممشى دهب، وزيارة معمل الزيوت الطبيعية النادرة.'
        : 'Daily morning excursion (08:00 AM - 05:00 PM): 1-hour snorkeling at Three Pools / Canyon, 15-min coastal camel ride, seaside restaurant lunch, Dahab promenade shopping, and a visit to the natural oils laboratory.',
      heroImage: '/images/excursions/dahab/dahab-blue-hole-lagoon.jpg',
      experienceSlug: 'dahab-blue-hole-canyon-trip',
      duration: isAr ? '9 ساعات (08:00 ص - 05:00 م)' : '9 Hours (08:00 AM - 05:00 PM)',
      availableTimes: [isAr ? '08:00 صباحاً (الاستقبال من الفندق)' : '08:00 AM (Hotel Pickup)']
    },
    catherine: {
      heroTitle: isAr ? 'رحلة صعود جبل موسى ودير سانت كاترين' : 'Mount Sinai Sunrise Hike & St. Catherine',
      heroSubtitle: isAr
        ? 'رحلة روحانية تاريخية استثنائية: صعود قمة جبل موسى ليلاً لمشاهدة بحر السحاب المهيب وشروق الشمس الذهبي بين سلاسل جبال سيناء، ثم استكشاف دير سانت كاترين وشجرة العليقة الملتهبة.'
        : 'A sacred & historical pilgrimage: nocturnal ascent of Mount Sinai for a heavenly sunrise over a vast sea of clouds, followed by exploring UNESCO-listed St. Catherine Monastery & the Burning Bush.',
      heroImage: '/images/excursions/catherine/mount-sinai-sea-of-clouds.jpg',
      experienceSlug: 'st-catherine-mount-sinai-trip',
      duration: isAr ? '14 ساعة (ليلة كاملة)' : '14 Hours (Overnight)',
      availableTimes: [isAr ? '10:30 مساءً (التحرك الليلي وصعود الجبل)' : '10:30 PM (Night Pickup & Ascent)']
    },
    taba: {
      heroTitle: isAr ? 'رحلات طابا وخليج فيورد وقلعة صلاح الدين' : 'Taba Day Tour: Fjord Bay & Pharaoh Island',
      heroSubtitle: isAr
        ? 'استكشف لؤلؤة خليج العقبة الشمالية: إطلالة خليج فيورد ذو المياه الفيروزية الصافية، رؤية قلعة صلاح الدين بجزيرة فرعون، وبانوراما ملتقى حدود 4 دول.'
        : 'Explore the northern jewel of Aqaba Gulf: crystal turquoise waters of Fjord Bay, historic Salah El-Din Fortress on Pharaoh Island & 4-nation panoramic vista.',
      heroImage: '/images/excursions/taba/taba-fjord-bay-crystal.jpg',
      experienceSlug: 'taba-fjord-bay-castle-tour',
      duration: isAr ? '10 ساعات' : '10 Hours',
      availableTimes: [isAr ? '07:00 صباحاً (الاستقبال من الفندق)' : '07:00 AM (Hotel Pickup)']
    },
    nuweiba: {
      heroTitle: isAr ? 'رحلات نويبع وسفاري وادي الوشواشي ورأس الشيطان' : 'Nuweiba Safari: Wishwashi Canyon & Ras Shitan',
      heroSubtitle: isAr
        ? 'مغامرة جيب 4x4 في قلب سلاسل جبال نويبع، السير في الممرات الصخرية للوصول إلى بحيرة وادي الوشواشي العذبة، والاسترخاء في مخيم رأس الشيطان البوهيمي.'
        : 'Thrilling 4x4 Jeep safari into rugged Sinai canyons, trekking through narrow cliffs to the emerald freshwater Wishwashi Pool, and unwinding at Ras Shitan beach camp.',
      heroImage: '/images/excursions/nuweiba/nuweiba-wishwashi-emerald.jpg',
      experienceSlug: 'nuweiba-wishwashi-canyon-safari',
      duration: isAr ? '9 ساعات' : '9 Hours',
      availableTimes: [isAr ? '08:00 صباحاً (الاستقبال من الفندق)' : '08:00 AM (Hotel Pickup)']
    }
  };

  // Sub-Tab Options per Destination
  const subTabDetails = {
    dahab: {
      standard: {
        title: isAr ? 'رحلة دهب الصباحية المتكاملة (سنوركل + جمال + غداء + ممشى + معمل الزيوت)' : 'Full Dahab Morning Excursion (Snorkel + Camel + Lunch + Bazaar + Oil Lab)',
        badge: isAr ? 'البرنامج الأساسي الشامل' : 'Full Tour',
        startingPrice: 30,
        galleryTitle: isAr ? 'معرض صور رحلة دهب الصباحية ومحطاتها' : 'Dahab Morning Tour Photo Gallery',
        images: [
          '/images/excursions/dahab/dahab-blue-hole-lagoon.jpg',
          '/images/excursions/dahab/dahab-promenade-bazaar.jpg',
          '/images/excursions/dahab/dahab-blue-hole.jpg',
          '/images/excursions/dahab/dahab-seaside-lunch.jpg',
          '/images/excursions/dahab/dahab-canyon-camels.jpg',
          '/images/excursions/dahab/dahab-quads.jpg'
        ]
      },
      quad_combo: {
        title: isAr ? 'كومبو دهب الصباحية + ركوب البيتش باجي في الكانيون' : 'Dahab Morning Combo + ATV Quad in Canyon',
        badge: isAr ? 'دهب + بيتش باجي' : 'Dahab + Quad Combo',
        startingPrice: 45,
        galleryTitle: isAr ? 'معرض صور كومبو دهب والبيتش باجي' : 'Dahab & ATV Quads Combo Gallery',
        images: [
          '/images/excursions/dahab/dahab-quads.jpg',
          '/images/excursions/dahab/dahab-blue-hole-lagoon.jpg',
          '/images/excursions/dahab/dahab-promenade-bazaar.jpg',
          '/images/excursions/dahab/dahab-seaside-lunch.jpg',
          '/images/excursions/dahab/dahab-canyon-camels.jpg'
        ]
      },
      vip_private: {
        title: isAr ? 'رحلة دهب الصباحية VIP خاصة بسيارة ليموزين خاصة' : 'VIP Private Dahab Morning Tour (Private Car)',
        badge: isAr ? 'دهب VIP خاصة' : 'VIP Private Dahab',
        startingPrice: 80,
        galleryTitle: isAr ? 'معرض صور رحلات دهب الخاصة VIP' : 'VIP Private Dahab Photo Gallery',
        images: [
          '/images/excursions/dahab/dahab-blue-hole-lagoon.jpg',
          '/images/excursions/dahab/dahab-promenade-bazaar.jpg',
          '/images/excursions/dahab/dahab-seaside-lunch.jpg',
          '/images/excursions/dahab/dahab-canyon-camels.jpg',
          '/images/excursions/dahab/dahab-blue-hole.jpg'
        ]
      }
    },
    catherine: {
      sunrise_hike: {
        title: isAr ? 'صعود جبل موسى فجراً + زيارة دير كاترين' : 'Mount Sinai Sunrise Hike + St. Catherine',
        badge: isAr ? 'صعود جبل موسى' : 'Mt. Sinai Hike',
        startingPrice: 40,
        galleryTitle: isAr ? 'معرض صور بحر السحاب وشروق جبل موسى' : 'Mount Sinai Sea of Clouds & Sunrise Gallery',
        images: [
          '/images/excursions/catherine/mount-sinai-sea-of-clouds.jpg',
          '/images/excursions/catherine/mount-sinai-golden-sunrise.jpg',
          '/images/excursions/catherine/mount-sinai-sea-of-clouds-1.JPG',
          '/images/excursions/catherine/mount-sinai-sea-of-clouds-2.jpg',
          '/images/excursions/catherine/mount-sinai-sunrise.jpg',
          '/images/excursions/catherine/st-catherine-monastery.jpg'
        ]
      },
      day_monastery: {
        title: isAr ? 'جولة دير سانت كاترين النهارية والمتحف' : 'Daytime St. Catherine Monastery & Museum Tour',
        badge: isAr ? 'جولة الدير النهارية' : 'Day Monastery Tour',
        startingPrice: 35,
        galleryTitle: isAr ? 'معرض صور دير سانت كاترين الأثري' : 'St. Catherine Monastery Gallery',
        images: [
          '/images/excursions/catherine/st-catherine-monastery.jpg',
          '/images/excursions/catherine/mount-sinai-sea-of-clouds.jpg',
          '/images/excursions/catherine/mount-sinai-golden-sunrise.jpg'
        ]
      },
      vip_private: {
        title: isAr ? 'رحلة كاترين VIP خاصة مع مرشد خاص' : 'VIP Private St. Catherine & Mount Sinai Tour',
        badge: isAr ? 'كاترين VIP خاصة' : 'VIP Private Catherine',
        startingPrice: 90,
        galleryTitle: isAr ? 'معرض صور سانت كاترين VIP' : 'VIP St. Catherine Gallery',
        images: [
          '/images/excursions/catherine/mount-sinai-sea-of-clouds.jpg',
          '/images/excursions/catherine/mount-sinai-golden-sunrise.jpg',
          '/images/excursions/catherine/st-catherine-monastery.jpg'
        ]
      }
    },
    taba: {
      fjord_castle: {
        title: isAr ? 'جولة خليج فيورد + قلعة صلاح الدين + الغداء' : 'Taba Fjord Bay, Salah El-Din Castle & Lunch',
        badge: isAr ? 'طابا وفيورد كلاسيك' : 'Taba & Fjord Classic',
        startingPrice: 45,
        galleryTitle: isAr ? 'معرض صور طابا وخليج فيورد وقصر صلاح الدين' : 'Taba Fjord Bay & Castle Photo Gallery',
        images: [
          '/images/excursions/taba/taba-fjord-bay-crystal.jpg',
          '/images/excursions/taba/taba-fjord-bay.jpg',
          '/images/excursions/taba/taba-pharaoh-island.jpg'
        ]
      },
      vip_private: {
        title: isAr ? 'رحلة طابا VIP خاصة بسيارة ليموزين' : 'VIP Private Taba & Fjord Bay Tour',
        badge: isAr ? 'طابا VIP خاصة' : 'VIP Private Taba',
        startingPrice: 85,
        galleryTitle: isAr ? 'معرض صور رحلات طابا VIP الخاصة' : 'VIP Private Taba Photo Gallery',
        images: [
          '/images/excursions/taba/taba-fjord-bay-crystal.jpg',
          '/images/excursions/taba/taba-fjord-bay.jpg',
          '/images/excursions/taba/taba-pharaoh-island.jpg'
        ]
      }
    },
    nuweiba: {
      wishwashi: {
        title: isAr ? 'سفاري جيب 4x4 لوادي الوشواشي والبحيرة' : '4x4 Jeep Safari to Wishwashi Canyon & Pool',
        badge: isAr ? 'سفاري الوشواشي' : 'Wishwashi Safari',
        startingPrice: 35,
        galleryTitle: isAr ? 'معرض صور وادي الوشواشي وسفاري نويبع' : 'Wishwashi Canyon Safari Gallery',
        images: [
          '/images/excursions/nuweiba/nuweiba-wishwashi-emerald.jpg',
          '/images/excursions/nuweiba/nuweiba-wishwashi-canyon.jpg',
          '/images/excursions/nuweiba/nuweiba-ras-shitan-bamboo.jpg',
          '/images/excursions/nuweiba/nuweiba-ras-shitan-camp.png'
        ]
      },
      rasshitan_combo: {
        title: isAr ? 'كومبو وادي الوشواشي + مخيم رأس الشيطان الشاطئي' : 'Wishwashi Canyon + Ras Shitan Beach Camp',
        badge: isAr ? 'الوشواشي + رأس الشيطان' : 'Wishwashi & Ras Shitan',
        startingPrice: 45,
        galleryTitle: isAr ? 'معرض صور رأس الشيطان ووادي الوشواشي' : 'Ras Shitan & Wishwashi Photo Gallery',
        images: [
          '/images/excursions/nuweiba/nuweiba-ras-shitan-bamboo.jpg',
          '/images/excursions/nuweiba/nuweiba-wishwashi-emerald.jpg',
          '/images/excursions/nuweiba/nuweiba-wishwashi-canyon.jpg',
          '/images/excursions/nuweiba/nuweiba-ras-shitan-camp.png'
        ]
      },
      vip_private: {
        title: isAr ? 'رحلة نويبع ورأس الشيطان VIP خاصة' : 'VIP Private Nuweiba & Ras Shitan Safari',
        badge: isAr ? 'نويبع VIP خاصة' : 'VIP Private Nuweiba',
        startingPrice: 80,
        galleryTitle: isAr ? 'معرض صور رحلات نويبع VIP' : 'VIP Private Nuweiba Photo Gallery',
        images: [
          '/images/excursions/nuweiba/nuweiba-wishwashi-emerald.jpg',
          '/images/excursions/nuweiba/nuweiba-ras-shitan-bamboo.jpg',
          '/images/excursions/nuweiba/nuweiba-wishwashi-canyon.jpg'
        ]
      }
    }
  };

  const currentTabBase = tabConfig[activeTab] || tabConfig.dahab;
  const currentSubDetails = subTabDetails[activeTab]?.[activeSubTab] || subTabDetails.dahab.standard;

  // Dynamically load images from media-manifest based on folder path
  const folderImages = !mediaLoading ? getFolderImages(activeTab, activeSubTab) : [];
  const manifestExcursionImages = (manifestImages || [])
    .filter(img => img.url.toLowerCase().includes(`/excursions/${activeTab}`) || img.url.toLowerCase().includes(`/${activeTab}`))
    .map(i => i.url);

  const candidateImages = folderImages.length > 0
    ? folderImages
    : manifestExcursionImages.length > 0
    ? manifestExcursionImages
    : currentSubDetails.images;

  const resolvedImages = candidateImages.length > 0 ? candidateImages : currentSubDetails.images;

  const currentTabInfo = {
    ...currentTabBase,
    heroTitle: currentSubDetails.title || currentTabBase.heroTitle,
    badge: currentSubDetails.badge,
    startingPrice: currentSubDetails.startingPrice,
    galleryTitle: currentSubDetails.galleryTitle,
    heroImage: resolvedImages[0] || currentTabBase.heroImage,
    images: resolvedImages
  };

  // Keyboard navigation & body scroll lock for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setActiveGalleryIdx((prev) => (prev > 0 ? prev - 1 : currentTabInfo.images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveGalleryIdx((prev) => (prev < currentTabInfo.images.length - 1 ? prev + 1 : 0));
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, currentTabInfo.images]);

  const rawExperience = EXPERIENCES.find(e => e.slug === currentTabInfo.experienceSlug) || EXPERIENCES[0];
  const experience = getLocalizedExperience(rawExperience, i18n.language);

  // Switch Main Destination Tab
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setActiveGalleryIdx(0);
    const defaultSub = newTab === 'catherine' ? 'sunrise_hike' : (newTab === 'taba' ? 'fjord_castle' : (newTab === 'nuweiba' ? 'wishwashi' : 'standard'));
    setActiveSubTab(defaultSub);
    setSearchParams({ tab: newTab, option: defaultSub });
  };

  // Switch Sub-Option
  const handleSubTabChange = (subKey) => {
    setActiveSubTab(subKey);
    setActiveGalleryIdx(0);
    setSearchParams({ tab: activeTab, option: subKey });
  };

  // Itineraries for Sinai Excursions
  const itineraryStepsDahab = [
    {
      step: 1,
      title: isAr ? '08:00 ص – الاستقبال بباص هاي كلاس مكيف' : '08:00 AM – Hotel Pickup in High-Class AC Bus',
      desc: isAr ? 'ركوب الباص السياحي المكيف من أمام فندقك بشرم الشيخ والتوجه شمالاً بطريق خليج العقبة إلى دهب.' : 'Comfortable morning pickup from your Sharm hotel reception in a high-class air-conditioned tourist bus.'
    },
    {
      step: 2,
      title: isAr ? '09:30 ص – سنوركلينج ساعة كاملة بالثري بولز أو الكانيون' : '09:30 AM – 1-Hour Snorkeling at Three Pools / Canyon',
      desc: isAr ? 'السباحة والسنوركلينج لمدة ساعة كاملة حول الأسماك متعددة الألوان والشعاب المرجانية الساحرة وسط المياه الفيروزية.' : 'One full hour of guided snorkeling around multicolored exotic fish and pristine coral reefs.'
    },
    {
      step: 3,
      title: isAr ? '11:00 ص – ركوب الجمال على شاطئ البحر الأحمر' : '11:00 AM – Coastal Camel Ride (15 Minutes)',
      desc: isAr ? 'الاستمتاع بركوب الجمال على شاطئ البحر لمدة 15 دقيقة والتقاط أروع الصور التذكارية وسط الطبيعة البدوية.' : 'Enjoy a 15-minute scenic camel ride directly along the Red Sea coastline with memorable photos.'
    },
    {
      step: 4,
      title: isAr ? '12:00 م – مغامرة البيتش باجي في وادي الكانيون (اختياري)' : '12:00 PM – Canyon Quad Safari Adventure (Optional)',
      desc: isAr ? 'وقت مخصص لعشاق الإثارة لقيادة البيتش باجي وسط التكوينات الصخرية والدروب الصحراوية لوادي الكانيون.' : 'Exciting optional ATV quad ride through the rugged sandstone canyon trails and desert valleys.'
    },
    {
      step: 5,
      title: isAr ? '01:00 م – تناول وجبة الغداء بمطعم على شاطئ البحر' : '01:00 PM – Seaside Lunch Overlooking the Waves',
      desc: isAr ? 'تناول وجبة غداء ساخنة وشهية مع تشكيلة من أشهى المأكولات الطازجة وسط إطلالة مباشرة على مياه البحر.' : 'Enjoy a delicious lunch featuring grilled specialties and fresh salads with direct panoramic sea views.'
    },
    {
      step: 6,
      title: isAr ? '02:30 م – جولة تسوق وشوبينج بممشى دهب' : '02:30 PM – Shopping Tour at Dahab Promenade',
      desc: isAr ? 'جولة حرة للمتسوقين بممشى دهب البوهيمي لشراء المشغولات البدوية اليدوية، الفضيات، والهدايا التذكارية.' : 'Free shopping time along Dahab’s lively promenade for souvenirs, silver jewelry & Bedouin handicrafts.'
    },
    {
      step: 7,
      title: isAr ? '03:30 م – زيارة معمل الزيوت الطبيعية النادرة' : '03:30 PM – Natural Oils & Herbs Laboratory Visit',
      desc: isAr ? 'زيارة معمل الزيوت الطبيعية بدهب، مشاهدة استخلاص الزيوت العطرية والطبية النادرة، وأخذ صور تذكارية.' : 'Visit Dahab’s authentic natural oils center; discover rare Sinai herbal extracts and medicinal oils.'
    },
    {
      step: 8,
      title: isAr ? '05:00 م – ختام الرحلة والعودة إلى فندقك بشرم الشيخ' : '05:00 PM – Return Drop-off at Your Hotel',
      desc: isAr ? 'العودة بالباص السياحي المكيف والتوصيل المريح إلى باب فندقك في شرم الشيخ بعد يوم حافل بالمتعة.' : 'Comfortable AC transfer back to your Sharm El Sheikh hotel lobby after an unforgettable full day.'
    }
  ];

  const itineraryStepsCatherine = [
    {
      step: 1,
      title: isAr ? 'الاستقبال ليلاً من فندقك بشرم الشيخ' : 'Late Night Hotel Pickup in Sharm',
      desc: isAr ? 'التحرك حوالي الساعة 10:30 مساءً بسيارة سياحية مكيّفة ومريحة والتوجه مباشرةً إلى مدينة سانت كاترين (ساعتان ونصف).' : 'Depart around 10:30 PM in a modern AC minibus heading into South Sinai’s granite heartlands.'
    },
    {
      step: 2,
      title: isAr ? 'قاعدة جبل موسى ومقابلة الدليل البدوي' : 'Base Camp Briefing with Bedouin Guide',
      desc: isAr ? 'الوصول إلى سفح جبل موسى، مقابلة الدليل البدوي المرخص، وبدء الصعود الليلي عبر مسار الجمال الهادئ تحت سماء مرصعة بالنجوم.' : 'Meet your certified Bedouin mountain guide and start the night trek via the Camel Path under starry skies.'
    },
    {
      step: 3,
      title: isAr ? 'استراحات الكافتيريات البدوية وصعود 750 درجات' : 'Bedouin Cafeterias & 750 Steps of Repentance',
      desc: isAr ? 'التوقف للاستراحة وتناول الشاي والمشروبات الدافئة في الاستراحات البدوية، ثم صعود الـ 750 درجة الحجرية إلى القمة.' : 'Rest at Bedouin trail shelters with hot herbal tea before climbing the final stone steps to the summit.'
    },
    {
      step: 4,
      title: isAr ? 'شروق الشمس الأسطوري على قمة جبل موسى' : 'Legendary Sunrise from Moses Summit',
      desc: isAr ? 'الوصول لقمة الجبل (2,285 متراً) ومشاهدة أروع منظر شروق شمس على وجه الأرض تضيء قمم الجبال المحيطة بنور ذهبي مهيب.' : 'Reach the 2,285m summit where Moses received the Ten Commandments, witnessing a celestial sunrise.'
    },
    {
      step: 5,
      title: isAr ? 'النزول الهادئ وتناول وجبة الإفطار' : 'Morning Mountain Descent & Breakfast',
      desc: isAr ? 'النزول في الصباح الباكر مع إطلالات ساحرة على الوديان، ثم الاستراحة وتناول وجبة الإفطار اللذيذة.' : 'Scenic daylight descent down the mountain, followed by a warm breakfast break.'
    },
    {
      step: 6,
      title: isAr ? 'جولة دير سانت كاترين وشجرة العليقة الملتهبة' : 'Guided St. Catherine Monastery & Burning Bush',
      desc: isAr ? 'زيارة أقدم دير مسيحي مأهول في العالم (اليونسكو): كنيسة التجلي، شجرة العليقة الملتهبة، بئر موسى، ومتحف المخطوطات النادرة.' : 'Explore the UNESCO world heritage monastery: Transfiguration Basilica, the Burning Bush & ancient icons.'
    },
    {
      step: 7,
      title: isAr ? 'العودة بالسلامة إلى فندقك بشرم الشيخ' : 'Return Drop-off at Sharm El Sheikh Hotel',
      desc: isAr ? 'التوصيل المريح بسيارة مكيفة إلى استقبال فندقك بشرم الشيخ حوالي الساعة 01:00 ظهراً لأخذ قسط من الراحة.' : 'Comfortable AC transfer back to your Sharm hotel lobby around 1:00 PM for well-deserved relaxation.'
    }
  ];

  const itineraryStepsTaba = [
    {
      step: 1,
      title: isAr ? 'الاستقبال الصباحي والانطلاق شمالاً' : 'Morning Hotel Pickup & Coastal Drive',
      desc: isAr ? 'التحرك بسيارة سياحية حديثة ومكيفة على أروع طريق ساحلي يربط شرم الشيخ بنويبع وطابا بمحاذاة خليج العقبة.' : 'Depart your resort lobby in a comfortable AC vehicle, cruising the scenic northern coastal highway.'
    },
    {
      step: 2,
      title: isAr ? 'الوصول إلى خليج فيورد (Fjord Bay)' : 'Arrival at Iconic Fjord Bay',
      desc: isAr ? 'التوقف في خليج فيورد الأسطوري ذو المياه الفيروزية الشفافة المحاط بسلاسل الجبال الشاهقة لالتقاط صور بانورامية ساحرة.' : 'Stop at breathtaking Fjord Bay, an azure cove surrounded by rugged granite cliffs.'
    },
    {
      step: 3,
      title: isAr ? 'السباحة والاسترخاء في مياه فيورد الطبيعية' : 'Swimming & Crystal Water Relaxation',
      desc: isAr ? 'فرصة للنزول في مياه الخليج الهادئة الصافية والسباحة والاستمتاع بطبيعة سيناء الخلابة بعيداً عن صخب المدن.' : 'Enjoy a refreshing swim in crystal waters and relax along the natural cove shoreline.'
    },
    {
      step: 4,
      title: isAr ? 'رؤية قلعة صلاح الدين وجزيرة فرعون' : 'Pharaoh’s Island & Salah El-Din Castle',
      desc: isAr ? 'مشاهدة قلعة صلاح الدين الأيوبي التاريخية المشيدة في القرن الثاني عشر فوق جزيرة فرعون وسط مياه خليج العقبة.' : 'View the 12th-century Crusader-era fortress built by Sultan Salah El-Din on Pharaoh’s Island.'
    },
    {
      step: 5,
      title: isAr ? 'بانوراما ملتقى حدود 4 دول' : 'Four-Borders Panoramic Viewpoint',
      desc: isAr ? 'الوقوف عند النقطة الجغرافية الفريدة حيث يمكنك رؤية سواحل 4 دول معاً: مصر، السعودية، الأردن، وإيلات.' : 'Stand at the famous viewpoint gazing across Egypt, Saudi Arabia, Jordan, and the Gulf of Aqaba.'
    },
    {
      step: 6,
      title: isAr ? 'وجبة غداء شهية في مطعم شاطئي راقٍ' : 'Fresh Lunch at Seaside Restaurant',
      desc: isAr ? 'تناول وجبة غداء لذيذة من المأكولات الطازجة والسلطات والمشروبات المنعشة في مطعم سياحي يطل مباشرة على مياه البحر.' : 'Enjoy a tasty hot lunch with sea views at an accredited coastal restaurant.'
    },
    {
      step: 7,
      title: isAr ? 'العودة والتوصيل المريح إلى فندقك بشرم الشيخ' : 'Return Transfer to Your Resort',
      desc: isAr ? 'رحلة عودة مريحة وممتعة بالسيارة السياحية المكيفة والتوصيل المباشر إلى باب غرفتك في الفندق.' : 'Smooth air-conditioned drive back to Sharm El Sheikh with hotel lobby drop-off.'
    }
  ];

  const itineraryStepsNuweiba = [
    {
      step: 1,
      title: isAr ? 'الاستقبال بسيارة جيب 4x4 والانطلاق لنويبع' : '4x4 Jeep Pickup & Nuweiba Expedition',
      desc: isAr ? 'الاستقبال من فندقك بشرم الشيخ بسيارة دفع رباعي 4x4 مجهزة والانطلاق عبر سلاسل الجبال الوعرة باتجاه نويبع.' : 'Morning pickup in a capable 4x4 Jeep, heading off-road into Sinai’s wild mountain valleys.'
    },
    {
      step: 2,
      title: isAr ? 'مغامرة السفاري بين الوديان الملونة' : 'Rugged Desert Canyon Off-Roading',
      desc: isAr ? 'القيادة بين ممرات الجبال الشاهقة والرمال الذهبية والتعرف على الطبيعة الجيولوجية البديعة لجنوب سيناء.' : 'Exciting off-road ride navigating rocky terrain and colorful sandstone formations.'
    },
    {
      step: 3,
      title: isAr ? 'المشي في ممر وادي الوشواشي الصخري' : 'Hike Through Narrow Canyon Crevices',
      desc: isAr ? 'النزول وبدء مسار المشي الممتع برفقة الدليل البدوي بين الشقوق الجرانيتية الضيقة المتدفقة بمياه الأمطار الطبيعية.' : 'Guided hike through dramatic narrow granite passages carved by flash floods over millennia.'
    },
    {
      step: 4,
      title: isAr ? 'السباحة في بحيرة الوشواشي العذبة الزمردية' : 'Swim in Natural Emerald Wishwashi Pool',
      desc: isAr ? 'الوصول إلى واحة وبحيرة الوشواشي الخفية وسط الصخور والسباحة في مياهها العذبة الباردة المنعشة.' : 'Reach the hidden mountain lagoon filled with fresh rainwater; jump in and cool off.'
    },
    {
      step: 5,
      title: isAr ? 'التوجه إلى مخيم رأس الشيطان البوهيمي' : 'Transfer to Bohemian Ras Shitan Camp',
      desc: isAr ? 'التحرك إلى شاطئ رأس الشيطان الشهير والاسترخاء في كبائن البامبو البدوية المطلة مباشرةً على البحر الأحمر.' : 'Arrive at the legendary laid-back bamboo beach camp of Ras Shitan.'
    },
    {
      step: 6,
      title: isAr ? 'غداء بدوي مشوي وشاي الأعشاب على الشاطئ' : 'Bedouin BBQ Lunch & Beachside Habak Tea',
      desc: isAr ? 'تناول وجبة غداء بدوي مشوي على الفحم وسط الأجواء الهادئة، ثم احتساء شاي الحبق البدوي الطازج.' : 'Fresh charcoal-grilled Bedouin meal followed by authentic mint/habak tea right by the waves.'
    },
    {
      step: 7,
      title: isAr ? 'العودة بالدفع الرباعي إلى فندقك بشرم الشيخ' : 'Return Transfer to Sharm El Sheikh',
      desc: isAr ? 'رحلة العودة المريحة بسيارة الجيب والتوصيل المباشر إلى فندقك بعد يوم حافل بالمغامرة والاستجمام.' : 'Return drive back to Sharm El Sheikh with hotel lobby drop-off.'
    }
  ];

  const itinerarySteps =
    activeTab === 'catherine' ? itineraryStepsCatherine :
    activeTab === 'taba' ? itineraryStepsTaba :
    activeTab === 'nuweiba' ? itineraryStepsNuweiba :
    itineraryStepsDahab;

  // Active experience for BookingWidget
  const activeExperience = {
    ...experience,
    title: currentTabInfo.heroTitle,
    startingPrice: currentTabInfo.startingPrice,
    availableTimes: currentTabInfo.availableTimes,
    category: 'excursions',
    destination: activeTab,
    activeTab,
    activeSubTab,
    onSubTabChange: handleSubTabChange
  };

  const openSlotMedia = (slotId) => {
    setSelectedMediaSlot(slotId);
    setSlotMediaModalOpen(true);
  };

  // Custom FAQs for Sinai Excursions
  const excursionFaqs = [
    {
      id: "excursion-faq-1",
      question: isAr ? "هل يلزم إحضار جواز السفر الأصلي في رحلات دهب وسانت كاترين وطابا ونويبع؟" : "Is an original passport required for Dahab, Catherine, Taba & Nuweiba tours?",
      answer: isAr
        ? "نعم، ضروري جداً! يجب إحضار جواز السفر الأصلي (أو بطاقة الرقم القومي للمصريين) لكل فرد من أفراد الرحلة لعبور نقاط التفتيش الأمنية بين مدن محافظة جنوب سيناء."
        : "Yes, absolutely mandatory! All travelers must carry their original passport (or National ID for Egyptian citizens) to pass tourism security checkpoints between South Sinai cities."
    },
    {
      id: "excursion-faq-2",
      question: isAr ? "ماذا يجب أن أرتدي لرحلة صعود جبل موسى في سانت كاترين؟" : "What should I wear for the Mount Sinai sunrise hike?",
      answer: isAr
        ? "ننصح بارتداء حذاء رياضي مريح أو حذاء مشي جبلي، ملابس متعددة الطبقات، وجاكيت دافئ وقبعة شتوية وقفازات، لأن درجات الحرارة فوق قمة جبل موسى فجراً تكون منخفضة جداً (قد تصل إلى الصفر أو أقل شتاءً)."
        : "Wear sturdy hiking or running shoes, layered clothing, a warm windbreaker jacket, beanie, and gloves. Temperatures at the 2,285m summit before dawn can drop near freezing even in autumn and spring."
    },
    {
      id: "excursion-faq-3",
      question: isAr ? "هل رحلة دهب والبلو هول مناسبة للأطفال والعائلات؟" : "Is the Dahab & Blue Hole tour suitable for children and families?",
      answer: isAr
        ? "نعم بالتأكيد! الرحلة آمنة وممتعة لجميع الأعمار. نوفر سترات نجاة لجميع الأحجام، والسباحة والسنوركلينج برفقة مرشد بحري محترف، بالإضافة لركوب الجمال الممتع وجولة التسوق في دهب."
        : "Yes, perfectly suitable! We provide life jackets for all ages, certified snorkeling guides, peaceful seaside camel walks, and fun bazaar shopping in Dahab."
    },
    {
      id: "excursion-faq-4",
      question: isAr ? "هل تتوفر معدات السنوركلينج للإيجار في دهب؟" : "Is snorkeling equipment available for rent in Dahab?",
      answer: isAr
        ? "نعم، يمكنك استئجار قناع السنوركلينج والزعانف وسترة النجاة من مركز الغوص الشاطئي مقابل مبلغ رمزي بسيط جداً (حوالي 2-3 دولارات للقطعة)، أو إحضار معداتك الخاصة مجاناً."
        : "Yes, masks, snorkels, fins, and life jackets can be rented on-site at the dive center for a nominal fee ($2-$3 per piece), or you may bring your personal gear free of charge."
    },
    {
      id: "excursion-faq-5",
      question: isAr ? "ما هي سياسة الإلغاء وتعديل موعد الرحلة؟" : "What is the cancellation and rescheduling policy?",
      answer: isAr
        ? "إلغاء وتعديل المواعيد مجاني 100% حتى 24 ساعة قبل موعد الانطلاق المحدد بدون أي رسوم، مع إمكانية استرداد كامل المبلغ أو اختيار موعد بديل بسهولة عبر الواتساب."
        : "Free cancellation and free rescheduling up to 24 hours prior to departure. You can claim a 100% refund or change your travel date instantly via WhatsApp."
    }
  ];

  // Destination Highlights & Activities per Destination (Dahab, Catherine, Taba, Nuweiba)
  const destinationActivities = {
    dahab: [
      {
        id: 'snorkeling_canyon',
        titleAr: 'السنوركلينج بالثري بولز أو الكانيون (ساعة كاملة)',
        titleEn: '1-Hour Snorkeling at Three Pools / Canyon',
        badgeAr: 'ساعة سنوركل كاملة 🤿',
        badgeEn: '1-Hour Snorkel 🤿',
        descAr: 'السباحة والسنوركلينج وسط أروع الشعاب المرجانية والأسماك متعددة الأشكال والألوان الفريدة بمياه دهب الفيروزية',
        descEn: 'One full hour of snorkeling among vibrant coral reefs and colorful exotic fish in turquoise waters',
        color: 'from-emerald-600 to-teal-700',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        icon: Waves,
        imagePattern: 'blue-hole'
      },
      {
        id: 'camels',
        titleAr: 'ركوب الجمال على شاطئ البحر (15 دقيقة)',
        titleEn: 'Coastal Camel Ride (15 Minutes)',
        badgeAr: 'أجواء بدوية أصيلة 🐪',
        badgeEn: '15-Min Camel Ride 🐪',
        descAr: 'الاستمتاع بركوب الجمال على رمال شاطئ البحر الأحمر لمدة 15 دقيقة والتقاط أجمل الصور التذكارية',
        descEn: 'Ride friendly Bedouin camels right along the Red Sea beach with memorable scenic photo stops',
        color: 'from-amber-500 to-orange-500',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Mountain,
        imagePattern: 'canyon'
      },
      {
        id: 'lunch',
        titleAr: 'تناول الغداء بمطعم على شاطئ البحر',
        titleEn: 'Beachside Restaurant Lunch',
        badgeAr: 'أشهى المأكولات على البحر 🍽️',
        badgeEn: 'Seaside Dining 🍽️',
        descAr: 'تناول وجبة غداء شهية مع أفضل أنواع المأكولات الطازجة في مطعم شاطئي وسط الطبيعة الخلابة لخليج العقبة',
        descEn: 'Delicious hot lunch served at an authentic seaside restaurant directly facing the crystal waves',
        color: 'from-purple-600 to-indigo-800',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: Sparkles,
        imagePattern: 'lunch'
      },
      {
        id: 'promenade_oil',
        titleAr: 'جولة تسوق بممشى دهب ومعمل الزيوت الطبيعية',
        titleEn: 'Dahab Promenade Shopping & Natural Oils Lab',
        badgeAr: 'تسوق وشوبينج وزيوت نادرة 🛍️',
        badgeEn: 'Shopping & Rare Oils Lab 🛍️',
        descAr: 'جولة تسوق حرة بممشى دهب السياحي لشراء الفضيات والتذكارات، وزيارة معمل الزيوت لمشاهدة استخلاص الزيوت الطبيعية النادرة',
        descEn: 'Free shopping walk along Dahab promenade plus an exclusive visit to the natural oils laboratory',
        color: 'from-blue-600 to-cyan-700',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Palmtree,
        imagePattern: 'promenade'
      }
    ],
    catherine: [
      {
        id: 'mountain_climb',
        titleAr: 'صعود قمة جبل موسى ليلاً (2,285م)',
        titleEn: 'Mount Sinai Night Climb (2,285m)',
        badgeAr: 'مسار جبلي مقدس ⛰️',
        badgeEn: 'Sacred Mountain Trek ⛰️',
        descAr: 'الصعود ليلاً برفقة الدليل البدوي المعتمد عبر مسار الجمال والـ 750 درجات صخرية تحت سماء مرصعة بالنجوم',
        descEn: 'Guided night trek up Mount Sinai via the Camel Path and the 750 stone steps under brilliant starry skies',
        color: 'from-indigo-600 to-slate-900',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        icon: Mountain,
        imagePattern: 'mount-sinai'
      },
      {
        id: 'sea_of_clouds',
        titleAr: 'بحر السحاب وشروق الفجر الأسطوري',
        titleEn: 'Sea of Clouds & Holy Sunrise',
        badgeAr: 'المشهد الأكثر إبهاراً ⭐',
        badgeEn: 'Breathtaking Cloud Inversion ⭐',
        descAr: 'الوصول للقمة فجراً ورؤية بحر السحاب الأبيض الكثيف يغطي الوديان وأشعة الشروق الذهبية تضيء قمم سيناء',
        descEn: 'Stand above an ocean of rolling white clouds at dawn as golden sunrise rays illuminate South Sinai peaks',
        color: 'from-amber-500 to-orange-500',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Sunrise,
        imagePattern: 'clouds'
      },
      {
        id: 'monastery',
        titleAr: 'دير سانت كاترين وشجرة العليقة الملتهبة',
        titleEn: 'St. Catherine UNESCO Monastery',
        badgeAr: 'تراث عالمي اليونسكو ⛪',
        badgeEn: 'UNESCO World Heritage ⛪',
        descAr: 'جولة إرشادية داخل أقدم دير مسيحي مأهول بالعالم: كنيسة التجلي، شجرة العليقة الملتهبة، بئر موسى، والمخطوطات',
        descEn: 'Guided exploration of the 6th-century fortress monastery: Burning Bush, Moses Well, and sacred Byzantine basilica',
        color: 'from-emerald-600 to-teal-700',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        icon: Castle,
        imagePattern: 'monastery'
      },
      {
        id: 'breakfast_shelters',
        titleAr: 'استراحات الجبل والإفطار البدوي',
        titleEn: 'Mountain Shelters & Bedouin Breakfast',
        badgeAr: 'ضيافة واستراحة دافئة ☕',
        badgeEn: 'Warm Bedouin Hospitality ☕',
        descAr: 'استراحات الكافتيريات البدوية على مسار الجبل لاحتساء المشروبات الدافئة ووجبة إفطار صباحية بعد النزول',
        descEn: 'Rest stops at traditional trail cafeterias for warm herbal drinks, followed by a hearty morning breakfast',
        color: 'from-purple-600 to-indigo-800',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: Sparkles,
        imagePattern: 'breakfast'
      }
    ],
    taba: [
      {
        id: 'fjord_bay',
        titleAr: 'خليج فيورد الفيروزي الكريستالي',
        titleEn: 'Crystal Turquoise Fjord Bay',
        badgeAr: 'طبيعة عذراء ساحرة 🌊',
        badgeEn: 'Pristine Azure Lagoon 🌊',
        descAr: 'التوقف في أروع خور بحري طبيعي بسيناء، الاستمتاع بالسباحة في المياه الهادئة الصافية والتقاط صور بانورامية بين الجبال',
        descEn: 'Stop at South Sinai’s natural fjord; swim in tranquil crystal waters and capture dramatic cliffside views',
        color: 'from-teal-600 to-emerald-600',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
        icon: Waves,
        imagePattern: 'fjord'
      },
      {
        id: 'pharaoh_castle',
        titleAr: 'قلعة صلاح الدين وجزيرة فرعون',
        titleEn: 'Salah El-Din Castle & Pharaoh Island',
        badgeAr: 'حصن أيوبي تاريخي 🏰',
        badgeEn: 'Crusader Era Citadel 🏰',
        descAr: 'إطلالة حصرية على قلعة صلاح الدين الأيوبي المشيدة وسط مياه خليج العقبة منذ القرن الثاني عشر الميلادي',
        descEn: 'Panoramic viewpoint overlooking the 12th-century fortress built by Sultan Salah El-Din in the Gulf of Aqaba',
        color: 'from-amber-600 to-yellow-600',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Castle,
        imagePattern: 'pharaoh'
      },
      {
        id: 'borders_panorama',
        titleAr: 'بانوراما ملتقى حدود 4 دول',
        titleEn: 'Four-Nations Panoramic Viewpoint',
        badgeAr: 'نقطة جغرافية نادرة 🗺️',
        badgeEn: 'Rare Geographic Vista 🗺️',
        descAr: 'الوقوف عند النقطة الفريدة التي يمكنك منها رؤية سواحل 4 دول معاً: مصر، السعودية، الأردن، وإيلات',
        descEn: 'Stand at the famous viewpoint observing the coastlines of Egypt, Saudi Arabia, and Jordan all in one view',
        color: 'from-blue-600 to-cyan-700',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Compass,
        imagePattern: 'castle'
      },
      {
        id: 'taba_lunch',
        titleAr: 'الغداء البحري وكورنيش طابا',
        titleEn: 'Seaside Dining & Taba Coast',
        badgeAr: 'مأكولات بحرية طازجة 🍽️',
        badgeEn: 'Fresh Seafood Lunch 🍽️',
        descAr: 'تناول وجبة غداء شهية في مطعم سياحي راقٍ يطل على مياه الخليج مع جولة خفيفة على كورنيش طابا',
        descEn: 'Freshly prepared seafood or mixed grill lunch at an accredited restaurant overlooking the Red Sea coast',
        color: 'from-rose-600 to-orange-600',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
        icon: Sparkles,
        imagePattern: 'lunch'
      }
    ],
    nuweiba: [
      {
        id: 'wishwashi_pool',
        titleAr: 'بحيرة وادي الوشواشي العذبة الزمردية',
        titleEn: 'Wishwashi Hidden Emerald Pool',
        badgeAr: 'واحة مائية نادرة 💧',
        badgeEn: 'Hidden Freshwater Oasis 💧',
        descAr: 'المشي في ممر الشقوق الصخرية والوصول إلى بحيرة مياه الأمطار العذبة الخفية بين صخور الجرانيت الشاهقة والسباحة فيها',
        descEn: 'Hike through narrow slot canyon rocks to discover and swim in the emerald freshwater canyon pool',
        color: 'from-emerald-600 to-teal-700',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        icon: Waves,
        imagePattern: 'wishwashi'
      },
      {
        id: 'jeep_safari',
        titleAr: 'سفاري جيب 4x4 بين الوديان الملونة',
        titleEn: '4x4 Off-Road Jeep Canyon Safari',
        badgeAr: 'مغامرة أوف رود حماسية 🚙',
        badgeEn: 'Exciting Off-Road Desert 🚙',
        descAr: 'الانطلاق بسيارات الدفع الرباعي وسط مسارات الصحراء الوعرة والتكوينات الجيولوجية الملونة لجنوب سيناء',
        descEn: 'Thrilling off-road 4x4 ride navigating desert tracks, rugged rocky trails, and colorful sandstone cliffs',
        color: 'from-amber-500 to-orange-600',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Compass,
        imagePattern: 'canyon'
      },
      {
        id: 'ras_shitan',
        titleAr: 'مخيم رأس الشيطان الشاطئي البوهيمي',
        titleEn: 'Ras Shitan Bohemian Beach Camp',
        badgeAr: 'استرخاء وأكواخ بامبو 🌴',
        badgeEn: 'Laid-back Bamboo Huts 🌴',
        descAr: 'الاسترخاء في مخيمات البامبو البدوية المطلة مباشرةً على البحر والاستمتاع بالهدوء والأجواء البوهيمية الأصيلة',
        descEn: 'Unwind at traditional bamboo beach arishas right on the pebble shore with serene vibes and mountain views',
        color: 'from-cyan-600 to-blue-700',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        icon: Palmtree,
        imagePattern: 'ras-shitan'
      },
      {
        id: 'bedouin_bbq',
        titleAr: 'الغداء البدوي المشوي وشاي الحبق',
        titleEn: 'Bedouin BBQ Lunch & Beach Tea',
        badgeAr: 'مشويات على الفحم 🍖',
        badgeEn: 'Charcoal-Grilled BBQ 🍖',
        descAr: 'تناول وجبة غداء بدوي مشوي على الفحم وسط المخيم مع شاي الأعشاب الطبيعية وصوت أمواج البحر',
        descEn: 'Authentic charcoal-grilled chicken and kofta meal served with Bedouin salad, fresh bread and habak tea',
        color: 'from-purple-600 to-indigo-800',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: Sparkles,
        imagePattern: 'lunch'
      }
    ]
  };

  const currentActivities = destinationActivities[activeTab] || destinationActivities.dahab;

  const handleOpenActivityMedia = (activity) => {
    if (activity.imagePattern && currentTabInfo.images && currentTabInfo.images.length > 0) {
      const idx = currentTabInfo.images.findIndex(img => 
        img.toLowerCase().includes(activity.imagePattern.toLowerCase())
      );
      if (idx !== -1) {
        setActiveGalleryIdx(idx);
        setIsLightboxOpen(true);
        return;
      }
    }
    openSlotMedia(activity.id);
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF9F6] text-slate-900 min-h-screen overflow-x-hidden max-w-full">
      <SEOHead
        title={`${currentTabInfo.heroTitle} | ${isAr ? 'مجموعة الهنا' : 'El Hana Group'}`}
        description={currentTabBase.heroSubtitle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* 1. Big Luxury Hero Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-10 md:p-12 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between border border-emerald-400/30 shadow-xl">
          <img
            src={currentTabInfo.heroImage}
            alt={currentTabInfo.heroTitle}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/excursions/dahab/dahab-blue-hole.jpg';
            }}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/45 to-transparent rtl:bg-gradient-to-l"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20"></div>

          {/* Top Overlapping Breadcrumbs */}
          <div className="relative z-10">
            <Breadcrumbs
              items={[
                { label: isAr ? 'رحلات سيناء الخارجية' : 'Sinai Excursions', link: '/excursions' },
                { label: currentTabInfo.heroTitle }
              ]}
              variant="hero"
            />
          </div>

          <div className="relative z-10 max-w-3xl space-y-3 pt-6 text-start rtl:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 font-extrabold text-xs uppercase tracking-wider backdrop-blur-md shadow-md">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? "معالم جنوب سيناء الطبيعية والتاريخية" : "Sinai Natural & Historic Landmarks"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight drop-shadow-md">
              {currentTabInfo.heroTitle}
            </h1>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium max-w-2xl drop-shadow-sm">
              {currentTabBase.heroSubtitle}
            </p>
          </div>
        </div>

        {/* 2. Unified Category & Sub-Category Selector Card */}
        <div className="bg-white rounded-3xl p-3.5 sm:p-5 border border-slate-200/80 shadow-md space-y-4">
          
          {/* Main Category Tabs Grid (Balanced on Mobile & Desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            
            {/* 1. Dahab */}
            <button
              onClick={() => handleTabChange('dahab')}
              className={`py-3 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center gap-2 text-center cursor-pointer ${
                activeTab === 'dahab'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-black scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <Waves className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'دهب والبلو هول' : 'Dahab & Blue Hole'}</span>
            </button>

            {/* 2. St. Catherine */}
            <button
              onClick={() => handleTabChange('catherine')}
              className={`py-3 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center gap-2 text-center cursor-pointer ${
                activeTab === 'catherine'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-black scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <Mountain className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'سانت كاترين وجبل موسى' : 'St. Catherine & Sinai'}</span>
            </button>

            {/* 3. Taba */}
            <button
              onClick={() => handleTabChange('taba')}
              className={`py-3 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center gap-2 text-center cursor-pointer ${
                activeTab === 'taba'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-black scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <Castle className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'طابا وخليج فيورد' : 'Taba & Fjord Bay'}</span>
            </button>

            {/* 4. Nuweiba */}
            <button
              onClick={() => handleTabChange('nuweiba')}
              className={`py-3 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center gap-2 text-center cursor-pointer ${
                activeTab === 'nuweiba'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-black scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <Palmtree className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'نويبع ووادي الوشواشي' : 'Nuweiba & Canyon'}</span>
            </button>
          </div>

          {/* Sub-Category Options Bar */}
          <div className="pt-3 border-t border-slate-100">
            <div className="bg-gradient-to-r from-emerald-50/60 via-slate-50 to-teal-50/40 p-2 sm:p-2.5 rounded-2xl border border-emerald-100/80 shadow-inner flex items-center justify-center flex-wrap gap-2 sm:gap-2.5">
              
              {/* Dahab sub-tabs */}
              {activeTab === 'dahab' && (
                <>
                  <button
                    onClick={() => handleSubTabChange('standard')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'standard'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'دهب وبلو هول كلاسيك – $30' : 'Standard Snorkel & Lunch – $30'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('quad_combo')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'quad_combo'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'كومبو بلو هول + بيتش باجي – $45' : 'Combo Blue Hole + ATV – $45'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('vip_private')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'vip_private'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'رحلة دهب VIP خاصة – $80' : 'VIP Private Dahab – $80'}</span>
                  </button>
                </>
              )}

              {/* Catherine sub-tabs */}
              {activeTab === 'catherine' && (
                <>
                  <button
                    onClick={() => handleSubTabChange('sunrise_hike')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'sunrise_hike'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'صعود جبل موسى فجراً + الدير – $40' : 'Mt. Sinai Night Climb & Sunrise – $40'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('day_monastery')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'day_monastery'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'جولة الدير النهارية فقط – $35' : 'Daytime Monastery Tour – $35'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('vip_private')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'vip_private'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'رحلة كاترين VIP خاصة – $90' : 'VIP Private Catherine – $90'}</span>
                  </button>
                </>
              )}

              {/* Taba sub-tabs */}
              {activeTab === 'taba' && (
                <>
                  <button
                    onClick={() => handleSubTabChange('fjord_castle')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'fjord_castle'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'خليج فيورد + قلعة صلاح الدين + الغداء – $45' : 'Fjord Bay, Castle & Lunch – $45'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('vip_private')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'vip_private'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'رحلة طابا VIP خاصة بليموزين – $85' : 'VIP Private Taba & Fjord – $85'}</span>
                  </button>
                </>
              )}

              {/* Nuweiba sub-tabs */}
              {activeTab === 'nuweiba' && (
                <>
                  <button
                    onClick={() => handleSubTabChange('wishwashi')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'wishwashi'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'سفاري وادي الوشواشي جيب 4x4 – $35' : 'Wishwashi 4x4 Jeep Safari – $35'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('rasshitan_combo')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'rasshitan_combo'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'كومبو الوشواشي + رأس الشيطان – $45' : 'Wishwashi + Ras Shitan Camp – $45'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('vip_private')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'vip_private'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'رحلة نويبع VIP خاصة – $80' : 'VIP Private Nuweiba – $80'}</span>
                  </button>
                </>
              )}

            </div>
          </div>

        </div>

        {/* 3. Price & Quick Stats Bar (USD / EUR / GBP / EGP) */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <div className="text-start rtl:text-right">
              <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">{isAr ? 'يبدأ من' : 'Starting From'}</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-slate-900 font-heading">${currentTabInfo.startingPrice}</span>
                <span className="text-slate-500 text-xs font-medium">{isAr ? '/ فرد واحد' : '/ per person'}</span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>

            {/* Live Exchange Rates */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {isAr ? 'ما يعادله بالعملات الأخرى' : 'Equivalent in other currencies'}
              </span>
              <div className="flex items-center flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-extrabold border border-slate-200/80">
                  €{Math.round(currentTabInfo.startingPrice * 0.893)} EUR
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-extrabold border border-slate-200/80">
                  £{Math.round(currentTabInfo.startingPrice * 0.757)} GBP
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-black border border-emerald-200 shadow-2xs">
                  {Math.round(currentTabInfo.startingPrice * 52.39)} {isAr ? 'ج.م' : 'EGP'}
                </span>
              </div>
            </div>
          </div>

          {/* Features Highlights */}
          <div className="flex items-center flex-wrap gap-3 sm:gap-6 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <div className="text-start rtl:text-right">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'المدة الزمنية' : 'Duration'}</span>
                <span className="font-bold text-slate-900">{currentTabBase.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F97316]" />
              <div className="text-start rtl:text-right">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'مكان التجمع' : 'Pickup'}</span>
                <span className="font-bold text-slate-900">{isAr ? 'استقبال الفندق' : 'Hotel Lobby'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div className="text-start rtl:text-right">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'سياسة الإلغاء' : 'Cancellation'}</span>
                <span className="font-bold text-slate-900">{isAr ? 'مجاني حتى 24س' : 'Free 24h'}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <div className="text-start rtl:text-right">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'تأكيد الحجز' : 'Confirmation'}</span>
                <span className="font-bold text-slate-900">{isAr ? 'تأكيد فوري بالواتساب' : 'Instant WhatsApp'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Destination Activities & Highlights Showcase */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                  {isAr 
                    ? (activeTab === 'dahab' 
                        ? 'أبرز فعاليات ومحطات رحلة دهب (البلو هول، الممشى السياحي، والكانيون)' 
                        : (activeTab === 'catherine'
                            ? 'أبرز فعاليات ومحطات رحلة سانت كاترين (جبل موسى، بحر السحاب، والدير)'
                            : (activeTab === 'taba'
                                ? 'أبرز فعاليات ومحطات رحلة طابا (خليج فيورد، قلعة صلاح الدين، وبانوراما الحدود)'
                                : 'أبرز فعاليات ومحطات رحلة نويبع (بحيرة وادي الوشواشي، سفاري الجيب، ورأس الشيطان)')))
                    : `${currentTabInfo.heroTitle} – Key Highlights & Sightseeing Stops`}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'اضغط على أي فعالية أو محطة لاستعراض صور وفيديوهات حقيقية وحصرية من جولاتنا السابقة'
                  : 'Click on any activity to view verified real tour photos & live video footage'}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0 self-start sm:self-center">
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isAr ? 'صور وفيديوهات حقيقية 100%' : '100% Real Tour Footage'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 pt-1">
            {currentActivities.map((activity, idx) => {
              const IconComp = activity.icon;
              return (
                <div 
                  key={activity.id || idx}
                  className="bg-gradient-to-b from-slate-50/70 to-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-400 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activity.color} text-white flex items-center justify-center shadow-xs`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${activity.badgeColor}`}>
                        {isAr ? activity.badgeAr : activity.badgeEn}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 font-heading group-hover:text-emerald-700 transition leading-snug">
                        {isAr ? activity.titleAr : activity.titleEn}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {isAr ? activity.descAr : activity.descEn}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenActivityMedia(activity)}
                    className="mt-3.5 w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-600 hover:text-white border border-slate-300 hover:border-emerald-600 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer group-hover:border-emerald-600"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                    <span>
                      {isAr 
                        ? `📸 صور وفيديوهات ${activity.titleAr.split(' ')[0]} ${activity.titleAr.split(' ')[1] || ''}`
                        : '📸 View Real Photos & Video'}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Two Columns Layout: Content Main (col-span-2) vs Booking Widget Sticky (col-span-1) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
          
          {/* Main Details (Left / Right Column depending on direction) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Included vs Excluded Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Included */}
              <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-3">
                <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-500" />
                  {isAr ? 'الخدمات المشمولة في الرحلة' : "What's Included"}
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600 font-normal">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                    <span>{isAr ? 'الانتقالات ذهاب وعودة من أي فندق داخل شرم الشيخ بباص سياحي مكيف هاي كلاس' : 'Round-trip hotel transfers from Sharm El Sheikh in AC bus'}</span>
                  </li>
                  {activeTab === 'dahab' ? (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>{isAr ? 'سنوركلينج لمدة ساعة كاملة بالثري بولز أو الكانيون' : '1-hour guided snorkeling at Three Pools or Canyon'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>{isAr ? 'ركوب الجمال على شاطئ البحر لمدة 15 دقيقة' : '15-minute coastal camel ride on the beach'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>{isAr ? 'تناول وجبة الغداء بمطعم على شاطئ البحر' : 'Fresh hot lunch at a seaside restaurant'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>{isAr ? 'جولة شوبينج وتسوق حرة بممشى دهب السياحي' : 'Free shopping time along Dahab promenade'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>{isAr ? 'زيارة معمل الزيوت الطبيعية ومشاهدة استخلاص الزيوت النادرة' : 'Visit to Dahab natural oils & herbs laboratory'}</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>{isAr ? 'رسوم الدخول وتصاريح المحميات والمزارات السياحية' : 'National park entry permits & admission fees'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>{isAr ? 'مرشد سياحي / بدوي معتمد ومرافق طوال الرحلة' : 'Licensed tour / Bedouin guide throughout journey'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span>{isAr ? 'وجبة غداء طازجة في مطعم شاطئي أو بدوي أصيل' : 'Fresh hot lunch at seaside or authentic Bedouin camp'}</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Excluded */}
              <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-3">
                <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-500 text-xs font-black flex items-center justify-center">✕</span>
                  {isAr ? 'غير مشمول في التكلفة (إضافات اختيارية)' : "What's Excluded (Optional Extras)"}
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600 font-normal">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0"></span>
                    <span>{isAr ? 'أدوات السنوركل (الماسك - اللايف جاكيت - الزعانف)' : 'Snorkel equipment (mask, life jacket, fins)'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0"></span>
                    <span>{isAr ? 'المشروبات والطلبات الإضافية خارج قائمة الغداء' : 'Extra drinks & personal orders'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0"></span>
                    <span>{isAr ? 'التصوير الفوتوغرافي الشخصي وألبوم الصور' : 'Professional photo CD & personal souvenirs'}</span>
                  </li>
                  {activeTab === 'dahab' && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0"></span>
                      <span>{isAr ? 'ركوب البيتش باجي في الكانيون (إضافة اختيارية فردي أو زوجي)' : 'Optional ATV quad ride in Canyon (single or double)'}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Safety, Checklist & Guidelines Navy Box */}
            <div className="bg-[#0B1527] text-white rounded-3xl p-6 md:p-8 space-y-4 shadow-xl border border-emerald-500/20">
              <div className="flex items-center gap-2.5 font-bold text-emerald-400 text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>{isAr ? 'أشياء تحتاجها وإرشادات مهمة للرحلة' : 'Things to Bring & Important Trip Guidelines'}</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 font-normal">
                <li className="flex items-baseline gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>{isAr ? 'إحضار جواز السفر الأصلي أو بطاقة الرقم القومي (ضروري للأكمنة)' : 'Original passport or National ID card (mandatory for checkpoints)'}</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>{isAr ? 'كريم واقي من أشعة الشمس (Sunblock) ونظارة شمسية' : 'Sunblock lotion and sunglasses'}</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>{isAr ? 'مايوه البحر ومنشفة شخصية (Swimsuit & Towel)' : 'Swimsuit and personal beach towel'}</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>{isAr ? 'حذاء البحر المائي لحماية القدمين (Water Shoes)' : 'Water shoes for coral and rocky beach entry'}</span>
                </li>
              </ul>
            </div>

            {/* 3D Autoplay Photo Gallery Showcase */}
            <GalleryShowcase
              galleryTitle={currentTabInfo.galleryTitle}
              images={currentTabInfo.images}
              isAr={isAr}
              onOpenLightbox={(idx) => {
                setActiveGalleryIdx(idx);
                setIsLightboxOpen(true);
              }}
            />

            {/* Itinerary Timeline Cards */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  {isAr ? 'برنامج وخط سير الرحلة خطوة بخطوة' : 'Step-by-Step Tour Itinerary'}
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  {isAr ? 'خطوات مفصلة' : 'Detailed Timeline'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {itinerarySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8FAFC] p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-emerald-400/40 hover:bg-white hover:shadow-md transition-all duration-300 flex items-start gap-3.5 text-start rtl:text-right"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-xs font-black flex items-center justify-center shadow-sm">
                      {step.step}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h4 className="text-sm font-extrabold text-slate-900 font-heading leading-snug">{step.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Booking Widget Sidebar */}
          <div id="booking-widget-container" className="lg:col-span-1 scroll-mt-28">
            <BookingWidget experience={activeExperience} />
          </div>

        </div>

        {/* FAQs Section */}
        <div className="pt-8 space-y-6 border-t border-slate-200">
          <FAQAccordion items={excursionFaqs} showSearch={false} />
        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 overflow-hidden select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Header Bar */}
          <div
            className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <h3 className="text-sm sm:text-base font-bold text-white font-heading truncate max-w-[200px] sm:max-w-md">
                {currentTabInfo.galleryTitle}
              </h3>
              <span className="text-[11px] font-semibold text-slate-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                {activeGalleryIdx + 1} / {currentTabInfo.images.length}
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer border border-white/10 hover:scale-105 active:scale-95"
            >
              <X className="w-4 h-4" />
              <span>{isAr ? 'إغلاق' : 'Close'}</span>
            </button>
          </div>

          {/* Main Photo Stage */}
          <div
            className="flex-1 flex items-center justify-center relative min-h-0 w-full px-2 sm:px-12 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {currentTabInfo.images.length > 1 && (
              <button
                onClick={() =>
                  setActiveGalleryIdx((prev) =>
                    prev > 0 ? prev - 1 : currentTabInfo.images.length - 1
                  )
                }
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-slate-900/80 hover:bg-white hover:text-slate-900 text-white transition-all backdrop-blur-md shadow-2xl border border-white/15 z-20 cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Displayed Image */}
            <div className="relative max-h-full max-w-full flex items-center justify-center">
              <img
                src={currentTabInfo.images[activeGalleryIdx] || currentTabInfo.images[0]}
                alt="Enlarged gallery view"
                className="max-h-[66vh] sm:max-h-[72vh] max-w-full object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10"
              />
            </div>

            {/* Next Button */}
            {currentTabInfo.images.length > 1 && (
              <button
                onClick={() =>
                  setActiveGalleryIdx((prev) =>
                    prev < currentTabInfo.images.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-slate-900/80 hover:bg-white hover:text-slate-900 text-white transition-all backdrop-blur-md shadow-2xl border border-white/15 z-20 cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {currentTabInfo.images.length > 1 && (
            <div
              className="pt-2 border-t border-white/10 shrink-0 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-3xl mx-auto custom-scrollbar">
                {currentTabInfo.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIdx(idx)}
                    className={`w-12 h-12 sm:w-16 sm:h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeGalleryIdx === idx
                        ? 'border-[#0284C7] scale-105 shadow-lg opacity-100 ring-2 ring-[#0284C7]/50'
                        : 'border-transparent opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Time Slot Media Modal */}
      <TripSlotMediaModal
        isOpen={slotMediaModalOpen}
        onClose={() => setSlotMediaModalOpen(false)}
        category={activeTab}
        subCategory={activeSubTab}
        initialSlot={selectedMediaSlot}
        onSelectSlotAndBook={(slotId, slotTime) => {
          const el = document.getElementById('booking-widget-container');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

    </div>
  );
};

export default ExcursionsPage;
