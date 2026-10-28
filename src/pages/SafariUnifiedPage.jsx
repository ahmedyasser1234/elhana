import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BookingWidget } from '../components/booking/BookingWidget';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { EXPERIENCES, getLocalizedExperience } from '../data/experiences';
import { useCurrency } from '../context/CurrencyContext';
import {
  Clock, MapPin, ShieldCheck, Sparkles, Check, X, Info,
  Maximize2, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Sun, Zap, Tent, Car, Compass,
  Sunrise, Sunset, Moon, Camera, Video
} from 'lucide-react';
import { TripSlotMediaModal } from '../components/safari/TripSlotMediaModal';
import { useMediaManifest, getFolderImages } from '../utils/mediaScanner';

// 3D Autoplay Photo Gallery Component with responsive mobile thumbnails
const GalleryShowcase = ({ galleryTitle, images, isAr, onOpenLightbox }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Slower Autoplay slideshow every 8 seconds (allows time for videos/detailed photos)
  useEffect(() => {
    if (isHovered || !images || images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered, images]);

  // Reset index if images change
  useEffect(() => {
    setActiveIdx(0);
  }, [galleryTitle]);

  if (!images || images.length === 0) return null;

  const N = images.length;
  // Infinite continuous loop: repeat array so there is never blank space when reaching the end
  const loopedImages = N <= 3 ? [...images, ...images, ...images, ...images] : [...images, ...images, ...images];

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

      {/* Gallery Grid with 3D Spheres Reel & Spherical Rotation Motion */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Large 3D Featured Image with Smooth Slower 3D Rotation Transition */}
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
                  e.target.src = images[0] || '/images/real/atv-quad-hero.png';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </motion.div>
          </AnimatePresence>

          {/* Ambient Lighting & Glass Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

          {/* Prev / Next Click Arrows Over Main Image (Great for mobile & desktop) */}
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

          {/* Autoplay Progress Pill Indicators / Counter */}
          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-10 flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {images.length <= 8 ? (
              images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`transition-all duration-500 rounded-full cursor-pointer ${
                    activeIdx === i ? 'w-5 h-2 bg-[#F97316]' : 'w-2 h-2 bg-white/40 hover:bg-white'
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
            <Maximize2 className="w-4 h-4 text-[#F97316]" />
            <span>{isAr ? 'عرض المكبر' : 'Enlarge Photo'}</span>
          </button>
        </div>

        {/* ── Desktop 3D Vertical Reel Strip (visible ONLY on md: and up) ── */}
        <div className="hidden md:flex relative flex-col items-center justify-start h-[460px] overflow-hidden px-2 [perspective:1000px] w-full">
          {images.length > 1 && (
            <button
              type="button"
              onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute top-2 z-30 p-2 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition hover:scale-110 shadow-xl cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronUp className="w-4 h-4 text-[#F97316]" />
            </button>
          )}

          <motion.div
            animate={{
              y: N > 1 ? -((activeIdx + N) * 120) + 170 : 0
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center w-full"
            style={{ position: 'relative' }}
          >
            {loopedImages.map((img, loopIdx) => {
              const realIdx = loopIdx % N;
              const isActive = activeIdx === realIdx;
              return (
                <div
                  key={loopIdx}
                  className="h-[120px] w-full flex items-center justify-center shrink-0 relative"
                >
                  <motion.button
                    type="button"
                    onClick={() => setActiveIdx(realIdx)}
                    whileHover={{ scale: isActive ? 1.12 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative rounded-full overflow-visible transition-all duration-300 group/thumb flex items-center justify-center cursor-pointer ${
                      isActive
                        ? 'w-24 h-24 sm:w-26 sm:h-26 ring-4 ring-[#0284C7] ring-offset-2 ring-offset-white shadow-[0_0_24px_rgba(2,132,199,0.5)] z-20'
                        : 'w-20 h-20 sm:w-22 sm:h-22 ring-2 ring-slate-200/90 opacity-60 hover:opacity-100 hover:ring-[#0284C7]/60 hover:shadow-md z-10'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.9, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#0284C7] via-[#38BDF8] to-[#F97316] blur-[5px] pointer-events-none"
                      />
                    )}

                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <img
                        src={img}
                        alt={`Thumbnail ${realIdx + 1}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = images[0] || '/images/real/atv-quad.jpg';
                        }}
                        className="w-full h-full object-cover rounded-full group-hover/thumb:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-black/50 pointer-events-none" />
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-[#0284C7] bg-[#0284C7]/15 pointer-events-none" />
                      )}
                    </div>

                    {/* Active Floating Badge */}
                    {isActive && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-30 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white text-[9px] font-black shadow-md flex items-center gap-1 border border-white/40 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>{isAr ? 'النشطة' : 'Active'}</span>
                      </span>
                    )}
                  </motion.button>
                </div>
              );
            })}
          </motion.div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={() => setActiveIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute bottom-2 z-30 p-2 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition hover:scale-110 shadow-xl cursor-pointer"
              aria-label="Next image"
            >
              <ChevronDown className="w-4 h-4 text-[#F97316]" />
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile Horizontal Thumbnail Strip (visible ONLY on mobile < md) ── */}
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
                    ? 'border-[#0284C7] ring-2 ring-[#0284C7]/50 scale-105 shadow-md z-10'
                    : 'border-slate-200 opacity-60 hover:opacity-100 scale-95'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = images[0] || '/images/real/atv-quad.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-[#0284C7]/15 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};


export const SafariUnifiedPage = ({ defaultTab = 'atv' }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { formatPrice } = useCurrency();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Main Tab: atv | buggy | bedouin
  const initialTab = searchParams.get('tab') || defaultTab;
  const [activeTab, setActiveTab] = useState(initialTab);

  // Active Sub-Tab per category (single/double for atv, 2seater/4seater/polaris1000 for buggy, standard/vip for bedouin)
  const initialSubTab = searchParams.get('option') || (initialTab === 'buggy' ? '2seater' : initialTab === 'bedouin' ? 'standard' : 'single');
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);

  // Gallery Active Image Index
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  // Lightbox Modal state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Track which dinner option user picks in BookingWidget (to show/hide bonus itinerary steps)
  const [selectedBedouinParty, setSelectedBedouinParty] = useState('none');

  // Load media manifest (auto-discovers all photos/videos from public folders)
  const { loading: mediaLoading } = useMediaManifest();


  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['atv', 'buggy', 'bedouin', 'camel', 'horse'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Main Category Tab Config
  const tabConfig = {
    atv: {
      heroTitle: isAr ? 'رحلات سفاري البيتش باجي في شرم الشيخ' : 'ATV Quad Desert Safari in Sharm El Sheikh',
      heroSubtitle: isAr
        ? 'انطلق في مغامرة صحراوية حماسية على متن البيتش باجي 250cc بين جبال وسلاسل صحراء سيناء مع الشاي البدوي وتجربة صدى الصوت.'
        : 'Embark on an exhilarating desert adventure riding 250cc ATV quad bikes among Sinai mountains with Bedouin tea and mountain echo experience.',
      heroImage: '/images/real/atv-quad-hero.png',
      experienceSlug: 'atv-quad-bike-safari'
    },
    buggy: {
      heroTitle: isAr ? 'رحلات سفاري الكار باجي في شرم الشيخ' : 'Car Buggy Desert Safaris in Sharm El Sheikh',
      heroSubtitle: isAr
        ? 'استمتع بقيادة سيارات الكار باجي الصحراوية المصممة خصيصاً للأزواج والعائلات مع هيكل أمان صلب وأحزمة أمان وتوصيل من الفندق.'
        : 'Enjoy driving desert dune buggies engineered specifically for couples and families with heavy-duty roll cage protection and hotel pickup.',
      heroImage: '/images/real/polaris-buggy-white.jpg',
      experienceSlug: 'dune-buggy-adventure'
    },
    bedouin: {
      heroTitle: isAr ? 'سهرة وعشاء بدوي وحفلة في شرم الشيخ' : 'Bedouin Dinner BBQ & Show in Sharm El Sheikh',
      heroSubtitle: isAr
        ? 'استمتع بعشاء المشويات البدوية الفاخرة تحت النجوم مع عروض التنورة، الرقص الشرقي، الشاي البدوي بالأعشاب، ورصد النجوم بالتليسكوب.'
        : 'Enjoy a starlit Bedouin BBQ dinner with authentic Tanoura, belly dance shows, herbal tea, and telescope stargazing.',
      heroImage: '/images/real/bedouin-hero.jpg',
      experienceSlug: 'authentic-bedouin-experience-dinner'
    },
    camel: {
      heroTitle: isAr ? 'رحلات ركوب الجمال في صحراء سيناء' : 'Camel Riding in Sinai Desert – Sharm El Sheikh',
      heroSubtitle: isAr
        ? 'اصعد ظهر الجمال البدوي واستمتع برحلة هادئة بين رمال سيناء الذهبية، مع مرشد بدوي ومقاعد مريحة وصور تذكارية.'
        : 'Ride a friendly Bedouin camel through golden Sinai sands with a local guide, comfortable saddles & memorable photos.',
      heroImage: '/images/real/camel-riding-hero.jpg',
      experienceSlug: 'camel-riding-standalone'
    },
    horse: {
      heroTitle: isAr ? 'رحلات ركوب الخيل العربي في شرم الشيخ' : 'Arabian Horse Riding Tours – Sharm El Sheikh',
      heroSubtitle: isAr
        ? 'اركب الخيل العربي الأصيل في مسارات صحراوية بديعة بإشراف فرسان محترفين، مع خوذات الأمان وتوصيل مريح من الفندق.'
        : 'Ride purebred Arabian horses through scenic desert trails with professional instructors, safety helmets & hotel pickup.',
      heroImage: '/images/real/horse-riding-hero.jpg',
      experienceSlug: 'horse-riding-standalone'
    }
  };

  // Sub-Tab Options with Independent Image Folders & Asset Collections
  const subTabDetails = {
    atv: {
      single: {
        title: isAr ? 'رحلة بيتش باجي سنجل (فردي)' : 'Single ATV Quad (1 Rider)',
        badge: isAr ? 'بيتش باجي سنجل' : 'Single ATV Quad',
        startingPrice: 15,
        galleryTitle: isAr ? 'معرض صور البيتش باجي السنجل (الفردي)' : 'Single ATV Quad Photo Gallery',
        images: [
          '/images/real/atv-quad-hero.png',
          '/images/real/atv-quad.jpg',
          '/images/real/IMG-20260731-WA0021.jpg',
          '/images/real/IMG-20260728-WA0105.jpg'
        ]
      },
      double: {
        title: isAr ? 'رحلة بيتش باجي دبل (مزدوج لراكبين)' : 'Double ATV Quad (2 Riders)',
        badge: isAr ? 'بيتش باجي دبل' : 'Double ATV Quad',
        startingPrice: 20,
        galleryTitle: isAr ? 'معرض صور البيتش باجي الدبل (المزدوج)' : 'Double ATV Quad Photo Gallery',
        images: [
          '/images/real/atv-quad.jpg',
          '/images/real/atv-quad-hero.png',
          '/images/real/IMG-20260722-WA0376.jpg',
          '/images/real/IMG-20260731-WA0004.jpg'
        ]
      }
    },
    buggy: {
      '2seater': {
        title: isAr ? 'كار باجي ثنائي (2 مقعد)' : '2-Seater Dune Buggy',
        badge: isAr ? 'كار باجي ثنائي' : '2-Seater Buggy',
        startingPrice: 28,
        galleryTitle: isAr ? 'معرض صور الكار باجي الثنائي (مقعدين)' : '2-Seater Dune Buggy Photo Gallery',
        images: [
          '/images/real/polaris-buggy-white.jpg',
          '/images/real/family-buggy-ride.jpg',
          '/images/real/polaris-buggy-family.jpg',
          '/images/real/IMG-20260722-WA0368.jpg'
        ]
      },
      '4seater': {
        title: isAr ? 'كار باجي عائلي (4 مقاعد)' : '4-Seater Family Dune Buggy',
        badge: isAr ? 'كار باجي عائلي' : '4-Seater Buggy',
        startingPrice: 35,
        galleryTitle: isAr ? 'معرض صور الكار باجي العائلي (4 مقاعد)' : '4-Seater Family Buggy Photo Gallery',
        images: [
          '/images/real/polaris-buggy-family.jpg',
          '/images/real/family-buggy-ride.jpg',
          '/images/real/polaris-buggy-white.jpg',
          '/images/real/IMG-20260722-WA0360.jpg'
        ]
      },
      polaris1000: {
        title: isAr ? 'كار باجي بولاريس 1000 Turbo (Polaris RZR)' : 'Polaris RZR 1000 Turbo Buggy',
        badge: isAr ? 'بولاريس 1000 Turbo' : 'Polaris RZR 1000',
        startingPrice: 60,
        galleryTitle: isAr ? 'معرض صور كار باجي البولاريس 1000 VIP' : 'Polaris 1000 Turbo Photo Gallery',
        images: [
          '/images/real/polaris-buggy-white.jpg',
          '/images/real/polaris-buggy-family.jpg',
          '/images/real/family-buggy-ride.jpg',
          '/images/real/IMG-20260722-WA0344.jpg'
        ]
      }
    },
    bedouin: {
      standard: {
        title: isAr ? 'العشاء وسهرة الخيمة البدوية الكلاسيك' : 'Classic Bedouin Dinner & Show',
        badge: isAr ? 'عشاء بدوي كلاسيك' : 'Classic Bedouin Dinner',
        startingPrice: 20,
        galleryTitle: isAr ? 'معرض صور العشاء والسهرة البدوية الكلاسيك' : 'Classic Bedouin Dinner Photo Gallery',
        images: [
          '/images/real/camel-caravan.jpg',
          '/images/real/IMG-20260722-WA0380.jpg',
          '/images/real/IMG-20260722-WA0370.jpg',
          '/images/real/IMG-20260728-WA0106.jpg'
        ]
      },
      vip: {
        title: isAr ? 'عشاء بدوي VIP + رصد النجوم بالتليسكوب' : 'VIP Bedouin Dinner & Telescope Stargazing',
        badge: isAr ? 'عشاء VIP ورصد النجوم' : 'VIP Dinner & Stargazing',
        startingPrice: 30,
        galleryTitle: isAr ? 'معرض صور عشاء VIP ورصد النجوم بالتليسكوب' : 'VIP Bedouin Dinner & Stargazing Gallery',
        images: [
          '/images/safari/bedouin/vip/IMG-20260722-WA0354.jpg',
          '/images/safari/bedouin/vip/IMG-20260722-WA0352.jpg',
          '/images/safari/bedouin/vip/IMG-20260722-WA0350.jpg',
          '/images/real/IMG-20260731-WA0005.jpg'
        ]
      },
      romantic: {
        title: isAr ? 'عشاء الخيمة البدوية الرومانسي الخاص VIP بالشموع' : 'Private VIP Romantic Bedouin Candlelight Dinner',
        badge: isAr ? 'عشاء رومانسي بالشموع' : 'Romantic Dinner',
        startingPrice: 65,
        galleryTitle: isAr ? 'معرض صور عشاء الخيمة البدوية الرومانسي الخاص' : 'Romantic Bedouin Dinner Gallery',
        images: [
          '/images/romantic/romantic-bedouin-candlelight-dinner.jpg',
          '/images/safari/bedouin/vip/IMG-20260722-WA0354.jpg',
          '/images/safari/bedouin/vip/IMG-20260722-WA0352.jpg',
          '/images/safari/bedouin/vip/IMG-20260722-WA0350.jpg'
        ]
      },
      proposal: {
        title: isAr ? 'باقة طلب الزواج VIP البدوية في جبال سيناء (Marry Me)' : 'Sinai Desert VIP Marry Me Proposal Package',
        badge: isAr ? 'طلب زواج Marry Me' : 'Marry Me Proposal',
        startingPrice: 180,
        galleryTitle: isAr ? 'معرض صور باقة طلب الزواج VIP في الصحراء' : 'Desert VIP Marry Me Proposal Gallery',
        images: [
          '/images/romantic/marry-me-proposal-desert.jpg',
          '/images/romantic/romantic-bedouin-candlelight-dinner.jpg',
          '/images/safari/bedouin/vip/IMG-20260722-WA0354.jpg'
        ]
      }
    },
    camel: {
      standard: {
        title: isAr ? 'جولة ركوب الجمال البدوية – 30 دقيقة' : 'Bedouin Camel Ride – 30 Minutes',
        badge: isAr ? 'ركوب جمال بدوي' : 'Camel Ride',
        startingPrice: 10,
        galleryTitle: isAr ? 'معرض صور جولات ركوب الجمال البدوية' : 'Camel Riding Tour Photo Gallery',
        images: [
          '/images/real/camel-riding-hero.jpg',
          '/images/real/camel-caravan.jpg',
          '/images/real/bedouin-hero.jpg',
          '/images/real/safari-sunset-tea.jpg'
        ]
      },
      extended: {
        title: isAr ? 'جولة ركوب الجمال الممتدة – ساعة كاملة' : 'Extended Camel Ride – 1 Full Hour',
        badge: isAr ? 'ركوب جمال ساعة' : 'Camel Ride 1hr',
        startingPrice: 15,
        galleryTitle: isAr ? 'معرض صور جولة الجمال الممتدة' : 'Extended Camel Ride Gallery',
        images: [
          '/images/real/camel-caravan.jpg',
          '/images/real/camel-riding-hero.jpg',
          '/images/real/bedouin-hero.jpg',
          '/images/real/safari-sunset-tea.jpg'
        ]
      }
    },
    horse: {
      standard: {
        title: isAr ? 'جولة ركوب الخيل العربي الأصيل – 30 دقيقة' : 'Arabian Horse Ride – 30 Minutes',
        badge: isAr ? 'ركوب خيل عربي' : 'Horse Ride',
        startingPrice: 15,
        galleryTitle: isAr ? 'معرض صور ركوب الخيول العربية الأصيلة' : 'Arabian Horse Riding Photo Gallery',
        images: [
          '/images/real/horse-riding-hero.jpg',
          '/images/real/family-buggy-ride.jpg',
          '/images/real/camel-caravan.jpg',
          '/images/real/atv-quad-hero.png'
        ]
      },
      extended: {
        title: isAr ? 'جولة ركوب الخيل الممتدة – ساعة كاملة' : 'Extended Horse Ride – 1 Full Hour',
        badge: isAr ? 'ركوب خيل ساعة' : 'Horse Ride 1hr',
        startingPrice: 25,
        galleryTitle: isAr ? 'معرض صور جولة الخيل الممتدة' : 'Extended Horse Ride Gallery',
        images: [
          '/images/real/horse-riding-hero.jpg',
          '/images/real/camel-caravan.jpg',
          '/images/real/family-buggy-ride.jpg',
          '/images/real/atv-quad-hero.png'
        ]
      }
    }
  };

  const currentTabBase = tabConfig[activeTab] || tabConfig.atv;
  const currentSubDetails = subTabDetails[activeTab]?.[activeSubTab] || subTabDetails.atv.single;

  // Dynamically load images from manifest (re-evaluated once manifest finishes loading)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const folderImages = !mediaLoading ? getFolderImages(activeTab, activeSubTab) : [];
  const resolvedImages = folderImages.length > 0 ? folderImages : currentSubDetails.images;


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

  // Switch Main Category Tab Handler
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setActiveGalleryIdx(0);
    let defaultSub = 'single';
    if (newTab === 'buggy') defaultSub = '2seater';
    if (newTab === 'bedouin') defaultSub = 'standard';
    if (newTab === 'camel') defaultSub = 'standard';
    if (newTab === 'horse') defaultSub = 'standard';
    setActiveSubTab(defaultSub);
    setSearchParams({ tab: newTab, option: defaultSub });
  };

  // Switch Sub-Tab Handler
  const handleSubTabChange = (subKey) => {
    setActiveSubTab(subKey);
    setActiveGalleryIdx(0);
    setSearchParams({ tab: activeTab, option: subKey });
  };

  const itineraryStepsAtv = [
    {
      step: 1,
      title: isAr ? 'الاستقبال من الفندق والانطلاق' : 'Hotel Pickup & Departure',
      desc: isAr ? 'سيارة مكيفة من استقبال الفندق مباشرةً إلى مركز السفاري في قلب صحراء سيناء' : 'Air-conditioned transfer from your resort lobby directly to the desert safari center.'
    },
    {
      step: 2,
      title: isAr ? 'الوصول والتجهيز ولف الشال البدوي' : 'Arrival, Gearing Up & Keffiyeh Wrap',
      desc: isAr ? 'الوصول إلى المركز — استلام الخوذة ومعدات الأمان، لف الشال البدوي (الكوفية)، والاستماع لتعليمات القيادة الكاملة' : 'Arrive at center — receive helmet & safety gear, wrap the Bedouin keffiyeh, full riding briefing from guide.'
    },
    {
      step: 3,
      title: isAr ? 'القيادة بالبيتش باجي في الوادي بين الجبال' : 'ATV Quad Ride Through Desert Valley',
      desc: isAr ? 'انطلاق مثير بالبيتش باجي عبر وادي سيناء بين السلاسل الجبلية لمدة 45-60 دقيقة من الإثارة والمغامرة' : '45-60 minutes of thrilling ATV riding through Sinai valley between mountain ranges.'
    },
    {
      step: 4,
      title: isAr ? 'وقفة جبل صدى الصوت الشهير' : 'Echo Canyon Mountain Stop',
      desc: isAr ? 'وقفة خاصة عند جبل صدى الصوت لتجربة ظاهرة الصدى الطبيعية وأخذ أجمل الصور التذكارية' : 'Stop at the famous Echo Mountain to experience the natural sound echo and capture the best photos.'
    },
    {
      step: 5,
      title: isAr ? 'الاستراحة والشاي في الخيمة البدوية' : 'Bedouin Tent Rest & Tea Break',
      desc: isAr ? 'استراحة مريحة في خيمة بدوية أصيلة والاستمتاع بشاي الحبق البدوي الطازج وسط هدوء الصحراء' : 'Rest in an authentic Bedouin tent, enjoy fresh habak herbal tea in the tranquil desert setting.'
    },
    {
      step: 6,
      title: isAr ? 'العودة والتوصيل إلى الفندق' : 'Return to Hotel',
      desc: isAr ? 'العودة بالبيتش باجي إلى مركز السفاري وتسليم المعدات، ثم التوصيل المريح إلى فندقك' : 'Return by ATV to safari center, hand in equipment, then comfortable transfer back to your hotel.'
    }
  ];

  const itineraryStepsBuggy = [
    {
      step: 1,
      title: isAr ? 'الاستقبال من الفندق والانطلاق' : 'Hotel Pickup & Departure',
      desc: isAr ? 'سيارة مكيفة من استقبال الفندق مباشرةً إلى مركز الكار باجي في صحراء سيناء' : 'Air-conditioned transfer from your resort lobby directly to the buggy safari center.'
    },
    {
      step: 2,
      title: isAr ? 'اختيار الكار باجي والتجهيز' : 'Buggy Selection & Safety Briefing',
      desc: isAr ? 'استلام الخوذة والشال البدوي واختيار الكار باجي المناسب (ثنائي أو رباعي أو بولاريس 1000)، ثم شرح تعليمات القيادة الآمنة' : 'Receive helmet & keffiyeh, choose your buggy type (2-seater, 4-seater, or Polaris 1000), full safety briefing.'
    },
    {
      step: 3,
      title: isAr ? 'القيادة بالكار باجي في الوادي والرمال' : 'Buggy Ride Through Valley & Dunes',
      desc: isAr ? 'انطلاق قافلة الكار باجي عبر وادي الجبال والكثبان الرملية لمدة 45-60 دقيقة من الإثارة والمرح' : '45-60 minutes of exhilarating buggy convoy through desert valleys, rocky trails, and golden sand dunes.'
    },
    {
      step: 4,
      title: isAr ? 'جبل صدى الصوت وأجمل الصور' : 'Echo Canyon & Photo Stop',
      desc: isAr ? 'وقفة فوتوغرافية حصرية عند جبل صدى الصوت لالتقاط أروع الصور التذكارية وتجربة الصدى الطبيعي' : 'Exclusive photo stop at the Echo Mountain — capture stunning memories and experience the natural sound echo.'
    },
    {
      step: 5,
      title: isAr ? 'الاستراحة بالخيمة البدوية والشاي' : 'Bedouin Tent & Tea Break',
      desc: isAr ? 'استراحة وسط الصحراء في خيمة بدوية أصيلة مع تقديم شاي الحبق البدوي الطازج والاسترخاء التام' : 'Desert rest stop inside an authentic Bedouin tent with fresh habak herbal tea and total relaxation.'
    },
    {
      step: 6,
      title: isAr ? 'العودة وتسليم المعدات والتوصيل' : 'Return, Handover & Hotel Drop-off',
      desc: isAr ? 'العودة بالكار باجي إلى المركز وتسليم المعدات، ثم التوصيل المريح إلى فندقك في شرم الشيخ' : 'Return by buggy to base, hand in equipment, then comfortable air-conditioned transfer back to your hotel.'
    }
  ];

  const itineraryStepsBedouin = [
    {
      step: 1,
      title: isAr ? 'الاستقبال الفندقي والتوجه للصحراء' : 'Hotel Pickup & Desert Transfer',
      desc: isAr ? 'الاستقبال بسيارة مكيفة من استقبال فندقك والتوجه مباشرةً إلى الخيمة البدوية في الصحراء' : 'Comfortable AC pickup from your hotel lobby and direct transfer to the Bedouin desert camp.'
    },
    {
      step: 2,
      title: isAr ? 'الترحيب البدوي وشاي الحبق الطازج' : 'Bedouin Welcome & Fresh Herbal Tea',
      desc: isAr ? 'استقبال حار على الطريقة البدوية مع تقديم الشاي بالأعشاب الطبيعية والقهوة العربية في خيام المضيافة' : 'Warm Bedouin-style welcome with fresh habak herbal tea and Arabic coffee served in the hospitality tents.'
    },
    {
      step: 3,
      title: isAr ? 'مشاهدة خبز العيش البدوي الطازج' : 'Bedouin Bread Baking Demonstration',
      desc: isAr ? 'مشاهدة تحضير وخبز العيش البدوي الطازج على الجمر المتقد بطريقة الأجداد في حفلة حقيقية' : 'Watch the traditional preparation and baking of fresh Bedouin flatbread over hot embers — a real cultural experience.'
    },
    {
      step: 4,
      title: isAr ? 'بوفيه عشاء المشويات البدوي الفاخر' : 'Lavish Bedouin BBQ Dinner Buffet',
      desc: isAr ? 'عشاء بوفيه مفتوح يشمل المشويات (فراخ وكفتة) والأرز والسلطات والخبز الطازج والفاكهة والمشروبات الطازجة' : 'Open dinner buffet with BBQ chicken, kofta, rice, fresh salads, Bedouin bread, fruits, and fresh soft drinks.'
    },
    {
      step: 5,
      title: isAr ? 'عروض التنورة والرقص الشرقي وعرض النار' : 'Tanoura, Belly Dance & Fire Show',
      desc: isAr ? 'متعة الفرجة على عروض التنورة المصرية، الموسيقى الشعبية الأصيلة، الرقص الشرقي، وعروض النار المبهرة' : 'Enjoy spectacular Egyptian Tanoura spinning, live folk music, belly dancing, and dazzling fire shows.'
    },
    {
      step: 6,
      title: isAr ? 'رصد النجوم بالتليسكوب مع خبير الفلك' : 'Telescope Stargazing with Astronomer',
      desc: isAr ? 'مشاهدة الكواكب والنجوم والمجرات بالتليسكوب المكبر بإشراف خبير فلكي متخصص تحت سماء الصحراء الصافية' : 'Observe planets, stars, and galaxies through powerful telescopes guided by a specialist astronomer under Sinai\'s clear skies.'
    },
    {
      step: 7,
      title: isAr ? 'العودة إلى الفندق' : 'Return Transfer to Hotel',
      desc: isAr ? 'توصيل مريح بسيارة مكيفة إلى فندقك في شرم الشيخ بعد سهرة لا تُنسى مليئة بالمرح والثقافة' : 'Comfortable AC transfer back to your Sharm El Sheikh hotel after an unforgettable evening of culture and entertainment.'
    }
  ];

  const itineraryStepsHorseCamel = [
    {
      step: 1,
      title: isAr ? 'الاستقبال من الفندق والانطلاق' : 'Hotel Pickup & Departure',
      desc: isAr ? 'الانتقال بسيارة سياحية مكيّفة من فندقك مباشرةً إلى مربط وواحة الخيل والجمال في صحراء سيناء' : 'Air-conditioned transfer from your resort lobby directly to the equestrian desert base in Sinai.'
    },
    {
      step: 2,
      title: isAr ? 'الوصول وارتداء خوذ الأمان والتعرف على المدرب' : 'Arrival, Safety Gear & Trainer Briefing',
      desc: isAr ? 'الترحيب بالضيوف واستلام خوذات الأمان ومقابلة مدربي الفروسية والجمالة لشرح قواعد الركوب السهلة والآمنة' : 'Receive safety helmets, meet professional instructors and handlers for an easy, friendly riding briefing.'
    },
    {
      step: 3,
      title: isAr ? 'الانطلاق في جولة الركوب بين الجبال والوديان' : 'Riding Tour Across Sinai Valleys',
      desc: isAr ? 'الاستمتاع بتجربة ركوب الخيل أو الجمال الهادئة في مسارات صحراوية طبيعية وساحرة تناسب جميع الأعمار والمستويات' : 'Enjoy peaceful riding on purebred Arabian horses or friendly camels through majestic desert landscapes.'
    },
    {
      step: 4,
      title: isAr ? 'وقفة تصوير فوتوغرافي تذكاري' : 'Scenic Photo Stop',
      desc: isAr ? 'وقفة مخصصة بين الجبال لالتقاط أروع الصور التذكارية على ظهر الخيل والجمال وسط المناظر الصحراوية الخلابة' : 'Dedicated stop among mountain dunes for memorable photos with horses and camels.'
    },
    {
      step: 5,
      title: isAr ? 'استراحة في الخيمة البدوية وتناول الشاي بالحبق' : 'Bedouin Tent Rest & Herbal Tea',
      desc: isAr ? 'جلسة عربية مريحة داخل الخيمة البدوية لتناول الشاي بالحبق الطازج والتعرف على كرم الضيافة البدوية' : 'Relax inside an authentic Bedouin tent with fresh herbal tea and warm hospitality.'
    },
    {
      step: 6,
      title: isAr ? 'العودة والتوصيل المريح إلى الفندق' : 'Hotel Drop-off',
      desc: isAr ? 'التوصيل المريح بسيارة مكيفة إلى استقبال فندقك في شرم الشيخ بعد مغامرة فروسية صحراوية رائعة' : 'Comfortable AC ride back to your hotel lobby after a peaceful and memorable desert experience.'
    }
  ];

  const baseSteps =
    activeTab === 'atv' ? itineraryStepsAtv :
    activeTab === 'buggy' ? itineraryStepsBuggy :
    (activeTab === 'camel' || activeTab === 'horse') ? itineraryStepsHorseCamel :
    itineraryStepsBedouin;

  // Track if dinner is included in ATV/Buggy
  const showsDinner = activeTab !== 'bedouin' && activeTab !== 'camel' && activeTab !== 'horse' &&
    (selectedBedouinParty === 'standard_dinner' || selectedBedouinParty === 'vip_dinner' || selectedBedouinParty === 'with_safari');

  // When ATV or Buggy has dinner option selected, replace the early hotel drop-off with the full dinner & show itinerary
  const safariDinnerCombinedSteps = [
    ...baseSteps.slice(0, -1), // Steps 1 to 5 (Pickup, Center, Driving, Canyon, Bedouin Tea)
    {
      step: baseSteps.length,
      title: isAr ? 'بوفيه عشاء المشويات البدوي المفتوح' : 'Open Bedouin BBQ Dinner Buffet',
      desc: isAr ? 'التوجه إلى خيمة الحفلات الكبرى وتناول بوفيه عشاء المشويات الساخن (فراخ، كفتة، أرز، سلطات، خبز بدوي طازج، ومشروبات)' : 'Proceed to the grand event camp for a hot open BBQ buffet with grilled meats, rice, salads, fresh Bedouin bread, and soft drinks.'
    },
    {
      step: baseSteps.length + 1,
      title: isAr ? 'عروض التنورة والرقص الشرقي وعرض النار' : 'Tanoura, Belly Dance & Dazzling Fire Show',
      desc: isAr ? 'مشاهدة سهرة فنية استعراضية متكاملة تشمل رقصة التنورة التراثية الصوفية، الرقص الشرقي الأصيل، وأخطر عروض النار الحية' : 'Enjoy a full cultural evening featuring hypnotic Tanoura spinning, authentic belly dancing, and thrilling fire breathers.'
    },
    ...(selectedBedouinParty === 'vip_dinner' ? [{
      step: baseSteps.length + 2,
      title: isAr ? 'رصد النجوم بالتليسكوب الرقمي VIP' : 'VIP Digital Telescope Stargazing',
      desc: isAr ? 'جلسة فلكية هادئة تحت النجوم مع خبير الفلك لمشاهدة تفاصيل القمر والمجرات البعيدة بأحدث التليسكوبات' : 'Peaceful stargazing session guided by an astronomer observing the moon and deep galaxies through high-powered telescopes.'
    }] : []),
    {
      step: baseSteps.length + (selectedBedouinParty === 'vip_dinner' ? 3 : 2),
      title: isAr ? 'العودة والتوصيل الفندقي المريح' : 'Late Evening Return Hotel Drop-off',
      desc: isAr ? 'التوصيل بسيارة مكيّفة حديثة إلى باب فندقك في شرم الشيخ بعد انتهاء سهرة العشاء والحفلة الممتعة' : 'Comfortable AC transfer back to your hotel lobby after an exhilarating safari and Bedouin dinner night.'
    }
  ];

  const itinerarySteps = showsDinner ? safariDinnerCombinedSteps : baseSteps;

  // Construct dynamic active experience object with updated startingPrice & sub-tab info for BookingWidget
  const activeExperience = {
    ...experience,
    startingPrice: currentTabInfo.startingPrice,
    activeTab,
    activeSubTab,
    onBedouinPartyChange: setSelectedBedouinParty,
    onSubTabChange: handleSubTabChange
  };

  const [slotMediaModalOpen, setSlotMediaModalOpen] = useState(false);
  const [selectedMediaSlot, setSelectedMediaSlot] = useState('sunset');

  const openSlotMedia = (slotId) => {
    setSelectedMediaSlot(slotId);
    setSlotMediaModalOpen(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF9F6] text-slate-900 min-h-screen overflow-x-hidden max-w-full">
      <SEOHead
        title={`${currentTabInfo.heroTitle} | ${isAr ? 'مجموعة الهنا' : 'El Hana Group'}`}
        description={currentTabBase.heroSubtitle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* 1. Big Hero Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-10 md:p-12 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between border border-amber-400/20 shadow-xl">
          <img
            src={currentTabInfo.heroImage}
            alt={currentTabInfo.heroTitle}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/real/atv-quad-hero.png';
            }}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent rtl:bg-gradient-to-l"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20"></div>

          {/* Top Overlapping Breadcrumbs */}
          <div className="relative z-10">
            <Breadcrumbs
              items={[
                { label: isAr ? 'رحلات سفاري الصحراء' : 'Desert Safaris', link: '/safari' },
                { label: currentTabInfo.heroTitle }
              ]}
              variant="hero"
            />
          </div>

          <div className="relative z-10 max-w-3xl space-y-3 pt-6 text-start rtl:text-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight drop-shadow-md">
              {currentTabInfo.heroTitle}
            </h1>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium max-w-2xl drop-shadow-sm">
              {currentTabBase.heroSubtitle}
            </p>
          </div>
        </div>

        {/* 2. Unified Safari Category & Sub-Category Selector Card */}
        <div className="bg-white rounded-3xl p-3.5 sm:p-5 border border-slate-200/80 shadow-md space-y-4">
          
          {/* Main Category Tabs Grid (Balanced on Mobile: 3 in row 1, 2 in row 2; 5 on Desktop) */}
          <div className="grid grid-cols-6 gap-2 sm:gap-2.5 lg:grid-cols-5">
            <button
              onClick={() => handleTabChange('atv')}
              className={`col-span-2 lg:col-span-1 py-3 px-2 sm:px-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                activeTab === 'atv'
                  ? 'bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#D97706] text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-400/80 font-black scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-[#EA580C] hover:bg-orange-50/60 border border-slate-200 hover:border-orange-300 shadow-xs'
              }`}
            >
              <span>{isAr ? 'بيتش باجي' : 'ATV Quads'}</span>
            </button>

            <button
              onClick={() => handleTabChange('buggy')}
              className={`col-span-2 lg:col-span-1 py-3 px-2 sm:px-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                activeTab === 'buggy'
                  ? 'bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#D97706] text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-400/80 font-black scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-[#EA580C] hover:bg-orange-50/60 border border-slate-200 hover:border-orange-300 shadow-xs'
              }`}
            >
              <span>{isAr ? 'كار باجي' : 'Car Buggy'}</span>
            </button>

            <button
              onClick={() => handleTabChange('bedouin')}
              className={`col-span-2 lg:col-span-1 py-3 px-2 sm:px-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                activeTab === 'bedouin'
                  ? 'bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#D97706] text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-400/80 font-black scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-[#EA580C] hover:bg-orange-50/60 border border-slate-200 hover:border-orange-300 shadow-xs'
              }`}
            >
              <span>{isAr ? 'عشاء بدوي' : 'Bedouin Dinner'}</span>
            </button>

            <button
              onClick={() => handleTabChange('camel')}
              className={`col-span-3 lg:col-span-1 py-3.5 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                activeTab === 'camel'
                  ? 'bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#D97706] text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-400/80 font-black scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-[#EA580C] hover:bg-orange-50/60 border border-slate-200 hover:border-orange-300 shadow-xs'
              }`}
            >
              <span>{isAr ? 'ركوب الجمال' : 'Camel Riding'}</span>
            </button>

            <button
              onClick={() => handleTabChange('horse')}
              className={`col-span-3 lg:col-span-1 py-3.5 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                activeTab === 'horse'
                  ? 'bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#D97706] text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-400/80 font-black scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-[#EA580C] hover:bg-orange-50/60 border border-slate-200 hover:border-orange-300 shadow-xs'
              }`}
            >
              <span>{isAr ? 'ركوب الخيل' : 'Horse Riding'}</span>
            </button>
          </div>

          {/* Sub-Category Options Bar */}
          <div className="pt-3 border-t border-slate-100">
            <div className="bg-gradient-to-r from-sky-50/60 via-slate-50 to-orange-50/40 p-2 sm:p-2.5 rounded-2xl border border-sky-100/80 shadow-inner flex items-center justify-center flex-wrap gap-2 sm:gap-2.5">
              {activeTab === 'atv' && (
                <>
                  <button
                    onClick={() => handleSubTabChange('single')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'single'
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'سنجل (فردي) - $15' : 'Single (1 Rider) - $15'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('double')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'double'
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'دبل (مزدوج لراكبين) - $20' : 'Double (2 Riders) - $20'}</span>
                  </button>
                </>
              )}

              {activeTab === 'buggy' && (
                <>
                  <button
                    onClick={() => handleSubTabChange('2seater')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === '2seater'
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'ثنائي (2 مقعد) - $28' : '2-Seater - $28'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('4seater')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === '4seater'
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'عائلي (4 مقاعد) - $35' : '4-Seater Family - $35'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('polaris1000')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'polaris1000'
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'بولاريس 1000 تيربو - $60' : 'Polaris 1000 Turbo - $60'}</span>
                  </button>
                </>
              )}

              {activeTab === 'bedouin' && (
                <>
                  <button
                    onClick={() => handleSubTabChange('standard')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'standard'
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'عشاء بدوي عادي - $20' : 'Standard BBQ Dinner - $20'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('vip')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'vip'
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'عشاء VIP + رصد النجوم - $30' : 'VIP Dinner & Stargazing - $30'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('romantic')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'romantic'
                        ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'عشاء رومانسي بالشموع - $65' : 'Romantic Candlelight - $65'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('proposal')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'proposal'
                        ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'طلب زواج Marry Me - $180' : 'Marry Me Proposal - $180'}</span>
                  </button>
                </>
              )}

              {activeTab === 'camel' && (
                <>
                  <button
                    onClick={() => handleSubTabChange('standard')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'standard'
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'ركوب جمال 30 دقيقة – $10' : 'Camel Ride 30 Min – $10'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('extended')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'extended'
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'ركوب جمال ساعة كاملة – $15' : 'Camel Ride 1 Hour – $15'}</span>
                  </button>
                </>
              )}

              {activeTab === 'horse' && (
                <>
                  <button
                    onClick={() => handleSubTabChange('standard')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'standard'
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'ركوب خيل 30 دقيقة – $15' : 'Horse Ride 30 Min – $15'}</span>
                  </button>
                  <button
                    onClick={() => handleSubTabChange('extended')}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[130px] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      activeSubTab === 'extended'
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{isAr ? 'ركوب خيل ساعة كاملة – $25' : 'Horse Ride 1 Hour – $25'}</span>
                  </button>
                </>
              )}
            </div>
          </div>

        </div>

        {/* 3. Price & Quick Stats Bar */}
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

            {/* Live Exchange Rates (EUR / GBP / EGP) */}
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
              <Clock className="w-4 h-4 text-[#0284C7]" />
              <div className="text-start rtl:text-right">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'المدة الزمنية' : 'Duration'}</span>
                <span className="font-bold text-slate-900">{isAr ? 'ساعتان بالانتقالات' : '2 Hours with Transfers'}</span>
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

        {/* 4. Two Columns Layout: Content Right vs Booking Widget Left */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
          
          {/* Main Details (Right Column) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Included vs Excluded Cards (Matching Screenshot 2) */}
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
                    <span>{isAr ? 'انتقالات الفندق ذهاباً وإياداً بسيارات مكيفة' : 'Round-trip hotel pickup in AC vehicles'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                    <span>{isAr ? 'إيجار البيتش باجي/الباجي والخوذة ومعدات الأمان' : 'Quad/Buggy rental with helmet & safety gear'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                    <span>{isAr ? 'مرشد صحراوي معتمد' : 'Licensed desert guide'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                    <span>{isAr ? 'الشاي البدوي في الخيمة' : 'Bedouin tea at camp'}</span>
                  </li>
                </ul>
              </div>

              {/* Excluded */}
              <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-3">
                <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-500 text-xs font-black flex items-center justify-center">✕</span>
                  {isAr ? 'غير مشمول في التكلفة' : "What's Excluded"}
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600 font-normal">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0"></span>
                    <span>{isAr ? 'الشال البدوي (الكوفية) والنظارات (مقابل رسم رمزي)' : 'Bedouin scarf & goggles (small optional fee)'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0"></span>
                    <span>{isAr ? 'التصوير الشخصي وألبوم الصور والفيديو' : 'Professional photo & video packages'}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Safety & Instructions Dark Navy Box (Matching Screenshot 2) */}
            <div className="bg-[#0B1527] text-white rounded-3xl p-6 md:p-8 space-y-4 shadow-xl border border-sky-500/20">
              <div className="flex items-center gap-2.5 font-bold text-sky-400 text-sm">
                <ShieldCheck className="w-5 h-5 text-[#F97316]" />
                <span>{isAr ? 'تعليمات وإرشادات مهمة للرحلة' : 'Important Trip Guidelines & Safety Rules'}</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 font-normal">
                <li className="flex items-baseline gap-2">
                  <span className="text-sky-400">•</span>
                  <span>{isAr ? 'الالتزام بجدول المواعيد المحدد للتجمع والاستقبال من الفندق' : 'Adhere to scheduled pickup time at resort lobby'}</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-sky-400">•</span>
                  <span>{isAr ? 'إحضار جواز السفر أو بطاقة الهوية الشخصية' : 'Bring passport or national photo ID card'}</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-sky-400">•</span>
                  <span>{isAr ? 'ارتداء ملابس مريحة ونظارة شمسية مناسبة لظروف الرحلة' : 'Wear comfortable clothing and sunglasses'}</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-sky-400">•</span>
                  <span>{isAr ? 'اتباع تعليمات السلامة الصادرة من المرشد وطاقم العمل' : 'Follow all safety instructions given by the guide'}</span>
                </li>
              </ul>
            </div>

            {/* Gallery Showcase — 3D Spherical Reel (same component as ATV) */}
            <GalleryShowcase
              galleryTitle={currentTabInfo.galleryTitle}
              images={currentTabInfo.images}
              isAr={isAr}
              onOpenLightbox={(idx) => {
                setActiveGalleryIdx(idx);
                setIsLightboxOpen(true);
              }}
            />

            {/* Itinerary Timeline Cards (Matching Screenshot 3) */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  {isAr ? 'برنامج وخط سير الرحلة' : 'Trip Itinerary'}
                </h3>
                <span className="text-xs font-bold text-[#0284C7] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                  {isAr ? 'خطوات مفصلة' : 'Detailed Timeline'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {itinerarySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8FAFC] p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-[#0284C7]/40 hover:bg-white hover:shadow-md transition-all duration-300 flex items-start gap-3.5 text-start rtl:text-right"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[#F97316] to-[#0284C7] text-white text-xs font-black flex items-center justify-center shadow-sm">
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

            {/* Daily Departure Slots & Live Media Showcase (Compact 4-Card Grid) */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse"></span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 font-heading">
                    {isAr ? 'مواعيد انطلاق الرحلات اليومية' : 'Daily Departure Slots'}
                  </h3>
                  <span className="text-[11px] text-slate-400 hidden md:inline">
                    {isAr ? '• اضغط على الموعد لمشاهدة الصور والفيديوهات' : '• Click to view real photos & videos'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200/80 shrink-0">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isAr ? 'معرض حقيقي 100%' : '100% Real Media'}</span>
                </div>
              </div>

              {/* 4 Compact Slot Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                
                {/* 1. Sunrise Slot (04:30 AM) */}
                <div className="bg-gradient-to-b from-amber-50/50 via-white to-white rounded-xl p-3 border border-amber-200/80 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-2xs shrink-0">
                          <Sunrise className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                          04:30 AM
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                        {isAr ? 'نسيم الفجر' : 'Dawn Breeze'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-heading group-hover:text-[#F97316] transition">
                        {isAr ? 'رحلة الشروق (الفجر)' : 'Sunrise Safari'}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {isAr ? 'شروق الشمس الذهبي الساحر بين قمم جبال سيناء' : 'Golden sunrise emerging behind rugged Sinai mountains'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-600 pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-amber-600" />
                        {isAr ? 'أجواء منعشة' : 'Cool climate'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-amber-600" />
                        {isAr ? 'شاي بدوي' : 'Bedouin tea'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openSlotMedia('sunrise')}
                    className="mt-2.5 w-full py-1.5 px-2 rounded-lg bg-white hover:bg-orange-500 hover:text-white border border-amber-300 text-amber-800 text-[11px] font-extrabold transition flex items-center justify-center gap-1 shadow-2xs cursor-pointer group-hover:border-orange-500"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-600 group-hover:text-white" />
                    <span>{isAr ? '📸 صور وفيديوهات الشروق' : '📸 Sunrise Gallery'}</span>
                  </button>
                </div>

                {/* 2. Morning Slot (09:00 AM) */}
                <div className="bg-gradient-to-b from-sky-50/50 via-white to-white rounded-xl p-3 border border-sky-200/80 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0284C7] to-blue-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                          <Sun className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 border border-sky-200">
                          09:00 AM
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200/60">
                        {isAr ? 'وضوح وسرعة' : 'Daylight Thrill'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-heading group-hover:text-[#0284C7] transition">
                        {isAr ? 'رحلة الصباح (الساعة 9)' : 'Morning Safari'}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {isAr ? 'وضوح رؤية نهاري وانطلاق سريع بالمسارات المفتوحة' : 'Bright daylight visibility and fast rides across tracks'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-600 pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-sky-600" />
                        {isAr ? 'مسارات واسعة' : 'Wide tracks'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-sky-600" />
                        {isAr ? 'صدى الصوت' : 'Echo mountain'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openSlotMedia('morning')}
                    className="mt-2.5 w-full py-1.5 px-2 rounded-lg bg-white hover:bg-[#0284C7] hover:text-white border border-sky-300 text-sky-800 text-[11px] font-extrabold transition flex items-center justify-center gap-1 shadow-2xs cursor-pointer group-hover:border-[#0284C7]"
                  >
                    <Camera className="w-3.5 h-3.5 text-sky-600 group-hover:text-white" />
                    <span>{isAr ? '📸 صور وفيديوهات الـ 9 ص' : '📸 9 AM Gallery'}</span>
                  </button>
                </div>

                {/* 3. Sunset Slot (04:00 PM) - Most Popular */}
                <div className="bg-gradient-to-b from-orange-50/70 via-white to-white rounded-xl p-3 border-2 border-orange-400/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between relative group">
                  <div className="absolute -top-2.5 right-3 rtl:left-3 rtl:right-auto bg-gradient-to-r from-[#F97316] to-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                    {isAr ? '⭐ الأكثر طلباً' : '⭐ POPULAR'}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#F97316] to-rose-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                          <Sunset className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-orange-100 text-orange-900 border border-orange-200">
                          04:00 PM
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-orange-800 bg-orange-100/70 px-2 py-0.5 rounded border border-orange-200">
                        {isAr ? 'الساعة الذهبية' : 'Golden Hour'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-heading group-hover:text-[#F97316] transition">
                        {isAr ? 'رحلة الغروب الذهبية' : 'Sunset Safari'}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {isAr ? 'الساعة الذهبية الأشهر عالمياً لالتقاط أروع الصور' : 'Prime golden hour for photography & desert sunset'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-600 pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#F97316]" />
                        {isAr ? 'فوتوسيشن ساحر' : 'Photo shoot'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#F97316]" />
                        {isAr ? 'غروب الجبال' : 'Sunset views'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openSlotMedia('sunset')}
                    className="mt-2.5 w-full py-1.5 px-2 rounded-lg bg-gradient-to-r from-[#F97316] to-amber-500 hover:from-[#EA580C] hover:to-amber-600 text-white text-[11px] font-black transition flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-white" />
                    <span>{isAr ? '📸 صور وفيديوهات الغروب' : '📸 Sunset Gallery'}</span>
                  </button>
                </div>

                {/* 4. Bedouin Dinner Slot (06:30 PM) */}
                <div className="bg-gradient-to-b from-purple-50/50 via-white to-white rounded-xl p-3 border border-purple-200/80 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-800 text-white flex items-center justify-center shadow-2xs shrink-0">
                          <Moon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200">
                          06:30 PM
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60">
                        {isAr ? 'سهرة وحفلة' : 'Dinner & Show'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-heading group-hover:text-purple-700 transition">
                        {isAr ? 'سهرة العشاء البدوي' : 'Bedouin Dinner & Show'}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {isAr ? 'بوفيه المشاوي الفاخر وحفلة الفلكلور ورصد النجوم' : 'Campfire BBQ buffet, folklore show and stargazing'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-600 pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-purple-600" />
                        {isAr ? 'بوفيه مشاوي' : 'BBQ buffet'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-purple-600" />
                        {isAr ? 'عروض فلكلور' : 'Live show'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openSlotMedia('dinner')}
                    className="mt-2.5 w-full py-1.5 px-2 rounded-lg bg-white hover:bg-purple-700 hover:text-white border border-purple-300 text-purple-800 text-[11px] font-extrabold transition flex items-center justify-center gap-1 shadow-2xs cursor-pointer group-hover:border-purple-700"
                  >
                    <Camera className="w-3.5 h-3.5 text-purple-600 group-hover:text-white" />
                    <span>{isAr ? '📸 صور وفيديوهات العشاء' : '📸 Dinner Gallery'}</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Booking Widget Sidebar (Left Column) */}
          <div id="booking-widget-container" className="lg:col-span-1 scroll-mt-28">
            <BookingWidget experience={activeExperience} />
          </div>

        </div>

        {/* FAQs Section */}
        <div className="pt-8 space-y-6 border-t border-slate-200">
          <FAQAccordion category="safari" showSearch={false} />
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

      {/* Time Slot Dedicated Media Modal */}
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

export default SafariUnifiedPage;
