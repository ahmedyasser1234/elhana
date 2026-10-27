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
  Maximize2, ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  Ship, Waves, Compass, Wind, Smile, Fish, UtensilsCrossed, LifeBuoy, Camera
} from 'lucide-react';
import { useMediaManifest, getFolderImages } from '../utils/mediaScanner';

// 3D Autoplay Photo Gallery Component (matching Safari & Excursions)
const GalleryShowcase = ({ galleryTitle, images, isAr, onOpenLightbox }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || !images || images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isHovered, images]);

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
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={images[activeIdx] || images[0]}
                alt={galleryTitle}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = images[0] || '/images/sea/ras-mohammed-luxury-yacht.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

          {/* Prev / Next Arrows */}
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

          {/* Fullscreen Trigger */}
          <button
            type="button"
            onClick={() => onOpenLightbox(activeIdx)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md border border-white/20 flex items-center gap-1.5 text-xs font-bold transition hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          >
            <Maximize2 className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">{isAr ? 'عرض ملء الشاشة' : 'Fullscreen'}</span>
          </button>
        </div>

        {/* Desktop Vertical Reel Thumbnails */}
        <div className="hidden md:flex flex-col items-center justify-center gap-3 relative py-2 [perspective:1000px]">
          {images.length > 3 && (
            <button
              type="button"
              onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute -top-3 z-20 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition hover:scale-110 shadow-lg cursor-pointer"
              aria-label="Previous thumbnail"
            >
              <ChevronUp className="w-4 h-4 text-sky-400" />
            </button>
          )}

          <motion.div className="flex flex-col gap-3 py-2">
            {images.slice(0, 4).map((img, idx) => {
              const isActive = activeIdx === idx;
              return (
                <motion.button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  whileHover={{ scale: 1.1, rotateZ: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-20 h-20 rounded-full cursor-pointer transition-all duration-300 p-1 group/thumb ${
                    isActive ? 'ring-4 ring-[#0284C7] shadow-xl' : 'opacity-70 hover:opacity-100 shadow-md'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = images[0] || '/images/sea/ras-mohammed-luxury-yacht.jpg';
                    }}
                    className="w-full h-full object-cover rounded-full group-hover/thumb:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-black/75 pointer-events-none shadow-[inset_0_-8px_16px_rgba(0,0,0,0.7),inset_0_4px_8px_rgba(255,255,255,0.4)]" />
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-sky-500 bg-sky-500/15 pointer-events-none" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {images.length > 3 && (
            <button
              type="button"
              onClick={() => setActiveIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute -bottom-3 z-20 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition hover:scale-110 shadow-lg cursor-pointer"
              aria-label="Next thumbnail"
            >
              <ChevronDown className="w-4 h-4 text-sky-400" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Horizontal Thumbnail Strip */}
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
                    ? 'border-sky-500 ring-2 ring-sky-500/50 scale-105 shadow-md z-10'
                    : 'border-slate-200 opacity-60 hover:opacity-100 scale-95'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = images[0] || '/images/sea/ras-mohammed-luxury-yacht.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-sky-500/15 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const SeaUnifiedPage = ({ defaultTab = 'yacht' }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { formatPrice } = useCurrency();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get('tab') || defaultTab;
  });

  const [activeSubTab, setActiveSubTab] = useState(() => {
    const cur = searchParams.get('tab') || defaultTab;
    return searchParams.get('option') || (cur === 'dolphin' ? 'show' : 'standard');
  });

  // Lightbox Modal state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  // Sync with searchParams and defaultTab
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['yacht', 'dolphin', 'snorkeling', 'diving', 'parasailing', 'banana'].includes(tabParam)) {
      setActiveTab(tabParam);
      const optionParam = searchParams.get('option');
      if (optionParam) {
        setActiveSubTab(optionParam);
      }
    } else if (defaultTab) {
      setActiveTab(defaultTab);
      setActiveSubTab(defaultTab === 'dolphin' ? 'show' : 'standard');
    }
  }, [searchParams, defaultTab]);

  // Main Category Tab Config
  const tabConfig = {
    yacht: {
      heroTitle: isAr ? 'رحلة بحرية إلى الجزيرة البيضاء ورأس محمد' : 'Ras Mohammed & White Island VIP Yacht Cruise',
      heroSubtitle: isAr
        ? 'الجنة في انتظارك: مياه كريستالية فيروزية، رمال بيضاء ناعمة (مالديف مصر)، سنوركلينج وغوص عند أروع الشعاب المرجانية، متعة القفز في الماء، وبوفيه غداء فاخر ومشروبات طوال اليوم على متن اليخت.'
        : 'Paradise awaits: crystal turquoise waters, soft white sand (Egyptian Maldives), snorkeling & diving at vibrant coral reefs, yacht diving jumps, and a gourmet open buffet lunch.',
      heroImage: '/images/sea/ras-mohammed-luxury-yacht.jpg',
      experienceSlug: 'vip-yacht-ras-mohammed-white-island',
      duration: isAr ? '7.5 ساعات (08:00 ص - 04:30 م)' : '7.5 Hours (08:00 AM - 04:30 PM)',
      availableTimes: [isAr ? '08:00 صباحاً (الاستقبال من الفندق)' : '08:00 AM (Hotel Pickup)']
    },
    dolphin: {
      heroTitle: isAr ? 'عروض الدلافين والسباحة مع الدلافين' : 'Dolphin Show & Swim with Dolphins in Sharm',
      heroSubtitle: isAr
        ? 'شاهد أروع الاستعراضات الأكروباتية للدلافين وكلاب البحر أو اقفز في الحمام المائي المجهّز للرقص والسباحة وتلقي القبلات من الدلافين الودودة في تجربة عائلية ساحرة.'
        : 'Watch spectacular acrobatic dolphin shows or dive into the heated pool to swim, hug, hold fins, and receive kisses from playful dolphins.',
      heroImage: '/images/sea/dolphin-show-sharm.jpg',
      experienceSlug: 'dolphin-swim-show-experience',
      duration: isAr ? '3 ساعات (02:30 م - 05:30 م)' : '3 Hours (02:30 PM - 05:30 PM)',
      availableTimes: [isAr ? '02:30 مساءً (الاستقبال من الفندق)' : '02:30 PM (Hotel Pickup)']
    },
    snorkeling: {
      heroTitle: isAr ? 'رحلات السنوركلينج البحرية إلى جزيرة تيران' : 'Tiran Island Snorkeling & Sea Cruise',
      heroSubtitle: isAr
        ? 'أبحر نحو جزيرة تيران الشهيرة بحدائق المرجان والسفن الغارقة وسط المياه الكريستالية الشفافة مع وقفات سنوركلينج برفقة مرشد وبوفيه غداء مفتوح.'
        : 'Cruise to the Straits of Tiran, renowned for vertical coral drop-offs, shipwrecks, and sea turtles with guided snorkeling and hot buffet lunch.',
      heroImage: '/images/sea/snorkeling-ras-mohammed-reef.jpg',
      experienceSlug: 'tiran-island-snorkeling-boat-trip',
      duration: isAr ? '7 ساعات (08:00 ص - 04:00 م)' : '7 Hours (08:00 AM - 04:00 PM)',
      availableTimes: [isAr ? '08:00 صباحاً (الاستقبال من الفندق)' : '08:00 AM (Hotel Pickup)']
    },
    diving: {
      heroTitle: isAr ? 'غوص السكوبا الاستكشافي في البحر الأحمر' : 'Introductory Scuba Diving Experience',
      heroSubtitle: isAr
        ? 'تنفس تحت الماء واشعر بانعدام الجاذبية في دفء مياه البحر الأحمر برفقة مدرب غوص PADI معتمد (1-on-1)، شاملة أسطوانات الأكسجين وبدلة الغطس وبوفيه الغداء.'
        : 'Take your first breath underwater! 1-on-1 certified PADI dive instructor guidance for a safe, unforgettable 20-minute dive up to 10 meters deep.',
      heroImage: '/images/sea/scuba-diving-intro.jpg',
      experienceSlug: 'introductory-scuba-diving-red-sea',
      duration: isAr ? '7 ساعات (08:00 ص - 04:00 م)' : '7 Hours (08:00 AM - 04:00 PM)',
      availableTimes: [isAr ? '08:00 صباحاً (الاستقبال من الفندق)' : '08:00 AM (Hotel Pickup)']
    },
    parasailing: {
      heroTitle: isAr ? 'طيران الباراشوت المائي في شرم الشيخ' : 'Red Sea Parasailing Adventure (Solo or Tandem)',
      heroSubtitle: isAr
        ? 'حلّق على ارتفاع 40 متراً فوق مياه البحر الأحمر واستمتع برؤية بانورامية ساحرة لخليج نعمة وجبال سيناء مع إقلاع وهبوط هيدروليكي آمن من ظهر القارب.'
        : 'Soar 40 meters above turquoise Red Sea waters for breathtaking panoramic views of Sharm coast with safe hydraulic takeoff & landing on boat.',
      heroImage: '/images/sea/parasailing-sharm-flight.jpg',
      experienceSlug: 'red-sea-parasailing-adventure',
      duration: isAr ? 'ساعة ونصف (طيران 12 دقيقة)' : '1.5 Hours total (12-min flight)',
      availableTimes: [isAr ? '10:00 صباحاً (فترات صباحية ومسائية)' : '10:00 AM (Daily Slots)']
    },
    banana: {
      heroTitle: isAr ? 'الألعاب المائية الترفيهية: ركوب البنانا والتيوب' : 'Banana Boat & Tube Water Fun Activity',
      heroSubtitle: isAr
        ? 'مغامرة مائية مفعمة بالحيوية والضحك لجميع أفراد العائلة والأصدقاء، ركوب قارب البنانا المطاطي أو التيوب السريع المسحوب بلانش سريع في عرض البحر.'
        : 'High-energy inflatable water ride towed behind a high-speed speedboat across the waves. Perfect group and family laughter for all ages.',
      heroImage: '/images/sea/banana-boat-water-ride.jpg',
      experienceSlug: 'banana-boat-tube-water-fun',
      duration: isAr ? 'ساعة (جولة مائية 15 دقيقة)' : '1 Hour total (15-min ride)',
      availableTimes: [isAr ? '10:30 صباحاً (فترات متعددة)' : '10:30 AM (Multiple Slots)']
    }
  };

  // Sub-Tab Options per Category
  const subTabDetails = {
    yacht: {
      standard: {
        title: isAr ? 'رحلة اليخت VIP المتكاملة (سنوركل + الجزيرة البيضاء + غداء + قفز في الماء)' : 'Full VIP Yacht Tour (Snorkel + White Island + Lunch + Jump)',
        badge: isAr ? 'البرنامج الأساسي الشامل' : 'Full Tour',
        startingPrice: 45,
        galleryTitle: isAr ? 'معرض صور رحلة اليخت والجزيرة البيضاء' : 'VIP Yacht & White Island Gallery',
        images: [
          '/images/sea/ras-mohammed-luxury-yacht.jpg',
          '/images/sea/white-island-sandbar.jpg',
          '/images/sea/snorkeling-ras-mohammed-reef.jpg',
          '/images/sea/yacht-sea-jump-fun.jpg',
          '/images/sea/yacht-buffet-lunch.jpg'
        ]
      },
      combo_dive: {
        title: isAr ? 'كومبو يخت VIP + غطسة سكوبا استكشافية مع مدرب' : 'VIP Yacht Cruise + Intro Scuba Dive Combo',
        badge: isAr ? 'يخت + غطس سكوبا' : 'Yacht + Scuba Dive',
        startingPrice: 65,
        galleryTitle: isAr ? 'معرض صور كومبو اليخت والغوص' : 'Yacht & Scuba Diving Gallery',
        images: [
          '/images/sea/scuba-diving-intro.jpg',
          '/images/sea/ras-mohammed-luxury-yacht.jpg',
          '/images/sea/white-island-sandbar.jpg',
          '/images/sea/snorkeling-ras-mohammed-reef.jpg'
        ]
      },
      vip_private: {
        title: isAr ? 'رحلة يخت VIP خاص لرجال الأعمال والعائلات' : 'VIP Private Luxury Yacht Charter',
        badge: isAr ? 'يخت خاص VIP' : 'Private Charter',
        startingPrice: 120,
        galleryTitle: isAr ? 'معرض صور رحلات اليخوت الخاصة VIP' : 'Private VIP Yacht Gallery',
        images: [
          '/images/sea/ras-mohammed-luxury-yacht.jpg',
          '/images/sea/white-island-sandbar.jpg',
          '/images/sea/yacht-buffet-lunch.jpg'
        ]
      },
      romantic_dinner: {
        title: isAr ? 'عشاء اليخت الرومانسي VIP وسهرة الغروب لشخصين' : 'Romantic Candlelight VIP Yacht Dinner & Sunset Cruise',
        badge: isAr ? 'عشاء رومانسي VIP' : 'Romantic Yacht Dinner',
        startingPrice: 95,
        galleryTitle: isAr ? 'معرض صور عشاء اليخت الرومانسي VIP' : 'Romantic VIP Yacht Dinner Gallery',
        images: [
          '/images/romantic/romantic-yacht-dinner.jpg',
          '/images/sea/ras-mohammed-luxury-yacht.jpg',
          '/images/sea/yacht-buffet-lunch.jpg'
        ]
      },
      marry_me: {
        title: isAr ? 'باقة طلب الزواج VIP على اليخت في عرض البحر (Marry Me)' : 'VIP Marry Me Proposal on Luxury Yacht',
        badge: isAr ? 'طلب زواج Marry Me' : 'Marry Me Proposal',
        startingPrice: 220,
        galleryTitle: isAr ? 'معرض صور باقة طلب الزواج VIP على اليخت' : 'VIP Yacht Marry Me Proposal Gallery',
        images: [
          '/images/romantic/marry-me-proposal-yacht.jpg',
          '/images/romantic/romantic-yacht-dinner.jpg',
          '/images/sea/ras-mohammed-luxury-yacht.jpg'
        ]
      }
    },
    dolphin: {
      show: {
        title: isAr ? 'حضور عرض الدلافين الاستعراضي وكلاب البحر (45 دقيقة)' : 'Dolphin & Seal Live Acrobatics Show (45 Min)',
        badge: isAr ? 'عرض الدلافين العائلي' : 'Dolphin Show',
        startingPrice: 25,
        galleryTitle: isAr ? 'معرض صور عروض الدلافين بشرم الشيخ' : 'Dolphin Show Photo Gallery',
        images: [
          '/images/sea/dolphin-show-sharm.jpg',
          '/images/sea/dolphin-swim-fun.jpg'
        ]
      },
      swim_15: {
        title: isAr ? 'السباحة واللعب مع الدلافين في الحمام المائي (15 دقيقة)' : 'Swim with Dolphins Session (15 Minutes)',
        badge: isAr ? 'سباحة 15 دقيقة' : '15-Min Swim',
        startingPrice: 70,
        galleryTitle: isAr ? 'معرض صور السباحة مع الدلافين' : 'Swim with Dolphins Gallery',
        images: [
          '/images/sea/dolphin-swim-fun.jpg',
          '/images/sea/dolphin-show-sharm.jpg'
        ]
      },
      swim_30: {
        title: isAr ? 'جلسة السباحة الكاملة والرقص والقبلات مع الدلافين (30 دقيقة)' : 'Complete Swim with Dolphins Experience (30 Minutes)',
        badge: isAr ? 'سباحة كاملة 30 دقيقة' : '30-Min Full Swim',
        startingPrice: 110,
        galleryTitle: isAr ? 'معرض صور تجربة الدلافين الكاملة' : 'Complete Dolphin Experience Gallery',
        images: [
          '/images/sea/dolphin-swim-fun.jpg',
          '/images/sea/dolphin-show-sharm.jpg'
        ]
      }
    },
    snorkeling: {
      standard: {
        title: isAr ? 'رحلة سنوركلينج مضايق تيران مع الغداء والمعدات' : 'Tiran Island Snorkeling Tour with Lunch Buffet',
        badge: isAr ? 'سنوركلينج تيران شامل' : 'Tiran Snorkel Tour',
        startingPrice: 35,
        galleryTitle: isAr ? 'معرض صور سنوركلينج جزيرة تيران' : 'Tiran Snorkeling Gallery',
        images: [
          '/images/sea/snorkeling-ras-mohammed-reef.jpg',
          '/images/sea/ras-mohammed-luxury-yacht.jpg',
          '/images/sea/yacht-buffet-lunch.jpg'
        ]
      },
      combo_dive: {
        title: isAr ? 'سنوركلينج جزيرة تيران + غطسة سكوبا استكشافية' : 'Tiran Island Snorkel + Intro Scuba Dive',
        badge: isAr ? 'سنوركل + غطس' : 'Snorkel + Scuba',
        startingPrice: 55,
        galleryTitle: isAr ? 'معرض صور تيران والغوص' : 'Tiran & Scuba Gallery',
        images: [
          '/images/sea/scuba-diving-intro.jpg',
          '/images/sea/snorkeling-ras-mohammed-reef.jpg',
          '/images/sea/ras-mohammed-luxury-yacht.jpg'
        ]
      }
    },
    diving: {
      single_dive: {
        title: isAr ? 'غطسة سكوبا استكشافية واحدة مع مدرب PADI (20 دقيقة)' : 'Single Intro Scuba Dive with 1-on-1 PADI Instructor',
        badge: isAr ? 'غطسة واحدة' : '1 Intro Dive',
        startingPrice: 55,
        galleryTitle: isAr ? 'معرض صور غوص السكوبا بالبحر الأحمر' : 'Scuba Diving Photo Gallery',
        images: [
          '/images/sea/scuba-diving-intro.jpg',
          '/images/sea/snorkeling-ras-mohammed-reef.jpg',
          '/images/sea/ras-mohammed-luxury-yacht.jpg'
        ]
      },
      double_dive: {
        title: isAr ? 'غطستان سكوبا استكشافيتان في موقعين مختلفين للشعاب' : '2 Intro Scuba Dives at Different Coral Reef Sites',
        badge: isAr ? 'غطستان سكوبا' : '2 Intro Dives',
        startingPrice: 80,
        galleryTitle: isAr ? 'معرض صور مغامرة الغوص المزدوج' : 'Double Scuba Dive Adventure',
        images: [
          '/images/sea/scuba-diving-intro.jpg',
          '/images/sea/snorkeling-ras-mohammed-reef.jpg',
          '/images/sea/ras-mohammed-luxury-yacht.jpg'
        ]
      }
    },
    parasailing: {
      single: {
        title: isAr ? 'طيران باراشوت فردي فوق مياه خليج نعمة (Solo Flight)' : 'Single Solo Parasailing Flight (Naama Bay)',
        badge: isAr ? 'باراشوت فردي' : 'Solo Flight',
        startingPrice: 30,
        galleryTitle: isAr ? 'معرض صور طيران الباراشوت المائي' : 'Parasailing Photo Gallery',
        images: [
          '/images/sea/parasailing-sharm-flight.jpg',
          '/images/sea/ras-mohammed-luxury-yacht.jpg'
        ]
      },
      double: {
        title: isAr ? 'طيران باراشوت زوجي لشخصين معاً (Tandem Flight)' : 'Tandem Double Parasailing Flight for Couples',
        badge: isAr ? 'باراشوت زوجي' : 'Tandem Flight',
        startingPrice: 50,
        galleryTitle: isAr ? 'معرض صور الباراشوت الزوجي' : 'Tandem Parasailing Gallery',
        images: [
          '/images/sea/parasailing-sharm-flight.jpg',
          '/images/sea/ras-mohammed-luxury-yacht.jpg'
        ]
      }
    },
    banana: {
      banana: {
        title: isAr ? 'ركوب قارب البنانا المائي العائلي (Banana Boat)' : 'Classic Inflatable Banana Boat Ride',
        badge: isAr ? 'قارب البنانا' : 'Banana Boat',
        startingPrice: 15,
        galleryTitle: isAr ? 'معرض صور قارب البنانا المائي' : 'Banana Boat Photo Gallery',
        images: [
          '/images/sea/banana-boat-water-ride.jpg',
          '/images/sea/yacht-sea-jump-fun.jpg'
        ]
      },
      tube: {
        title: isAr ? 'ركوب التيوب المائي السريع للأصدقاء (Sofa Tube / Matrix)' : 'High-Speed Inflatable Sofa Tube Ride',
        badge: isAr ? 'تيوب مائي سريع' : 'Sofa Tube',
        startingPrice: 20,
        galleryTitle: isAr ? 'معرض صور التيوب المائي السريع' : 'Water Tube Photo Gallery',
        images: [
          '/images/sea/banana-boat-water-ride.jpg',
          '/images/sea/yacht-sea-jump-fun.jpg'
        ]
      }
    }
  };

  const currentTabBase = tabConfig[activeTab] || tabConfig.yacht;
  const currentSubDetails = subTabDetails[activeTab]?.[activeSubTab] || subTabDetails.yacht.standard;

  const currentTabInfo = {
    ...currentTabBase,
    heroTitle: currentSubDetails.title || currentTabBase.heroTitle,
    badge: currentSubDetails.badge,
    startingPrice: currentSubDetails.startingPrice,
    galleryTitle: currentSubDetails.galleryTitle,
    heroImage: currentSubDetails.images[0] || currentTabBase.heroImage,
    images: currentSubDetails.images
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

  const rawExperience = EXPERIENCES.find(e => e.slug === currentTabInfo.experienceSlug) || EXPERIENCES[5];
  const experience = getLocalizedExperience(rawExperience, i18n.language);

  // Switch Main Category Tab
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setActiveGalleryIdx(0);
    const defaultSub = newTab === 'dolphin' ? 'show' : (newTab === 'diving' ? 'single_dive' : (newTab === 'parasailing' ? 'single' : (newTab === 'banana' ? 'banana' : 'standard')));
    setActiveSubTab(defaultSub);
    setSearchParams({ tab: newTab, option: defaultSub });
  };

  // Switch Sub-Option
  const handleSubTabChange = (subKey) => {
    setActiveSubTab(subKey);
    setActiveGalleryIdx(0);
    setSearchParams({ tab: activeTab, option: subKey });
  };

  // Activities & Features Grid per Tab
  const tabActivities = {
    yacht: [
      {
        icon: Sparkles,
        title: isAr ? 'الجزيرة البيضاء (مالديف مصر)' : 'White Island (Egyptian Maldives)',
        badge: isAr ? 'رمال ناعمة ومياه صافية' : 'Crystal Sandbar',
        desc: isAr ? 'النزول والمشي على رمال بيضاء ساحرة تظهر وسط مياه البحر الأحمر الشفافة، مع فرصة تصوير خيالية.' : 'Step onto powdery white sands surrounded by shallow turquoise sea with unforgettable photos.'
      },
      {
        icon: Fish,
        title: isAr ? 'سنوركلينج رأس محمد' : 'Ras Mohammed Snorkeling',
        badge: isAr ? 'محمية طبيعية عالمية' : 'World Marine Park',
        desc: isAr ? '2 إلى 3 وقفات سنوركلينج عند جدران الشعاب المرجانية الساحرة لمشاهدة السلاحف والأسماك متعددة الألوان.' : 'Guided snorkeling along vertical coral walls bustling with exotic tropical fish and marine life.'
      },
      {
        icon: Waves,
        title: isAr ? 'غوص السكوبا الاستكشافي' : 'Intro Scuba Diving (Optional)',
        badge: isAr ? 'مبتدئين ومحترفين' : 'All Levels',
        desc: isAr ? 'إمكانية إضافة غطسة سكوبا برفقة مدرب معتمد (1-on-1) بدون الحاجة لشهادات مسبقة.' : 'Optional 1-on-1 scuba dive guided by certified PADI instructor in warm crystal waters.'
      },
      {
        icon: LifeBuoy,
        title: isAr ? 'القفز والسباحة في البحر' : 'Yacht Water Jump & Swimming',
        badge: isAr ? 'مغامرة ومرح' : 'Action & Fun',
        desc: isAr ? 'القفز الآمن من منصة اليخت في المياه الفيروزية المفتوحة والسباحة بسترات النجاة تحت إشراف المنقذين.' : 'Thrilling jump off the yacht deck into the azure sea with lifejackets and lifeguard supervision.'
      },
      {
        icon: UtensilsCrossed,
        title: isAr ? 'بوفيه غداء فاخر ومشروبات' : 'Open Buffet Lunch & Drinks',
        badge: isAr ? 'طازج على اليخت' : 'Freshly Prepared',
        desc: isAr ? 'بوفيه مفتوح ساخن: مأكولات بحرية، دجاج مشوي، مكرونة، سلطات طازجة، ومشروبات طوال اليوم.' : 'Delicious hot lunch buffet prepared onboard: seafood, BBQ chicken, pasta, salads & unlimited drinks.'
      },
      {
        icon: Camera,
        title: isAr ? 'تصوير تذكاري ولحظات لا تُنسى' : 'Unforgettable Photo Memories',
        badge: isAr ? 'ذكريات العمر' : 'Photo Spots',
        desc: isAr ? 'استمتع بالتشميس على سطح اليخت (Sun Deck) والتقاط أروع الصور التذكارية وسط الطبيعة البحرية.' : 'Relax on the upper sun deck and capture magazine-quality vacation photos.'
      }
    ],
    dolphin: [
      {
        icon: Sparkles,
        title: isAr ? 'عروض الدلافين الأكروباتية (45 دقيقة)' : 'Acrobatic Dolphin Show (45 Min)',
        badge: isAr ? 'ألعاب واستعراضات' : 'Live Show',
        desc: isAr ? 'مشاهدة قفزات وحركات الدلافين البارعة والكرات الطائرة والسباق المائي برفقة المدربين العالميين.' : 'Watch high-flying jumps, acrobatics, and ball tricks performed by intelligent dolphins.'
      },
      {
        icon: Fish,
        title: isAr ? 'استعراضات كلاب البحر اللطيفة' : 'Playful Sea Lion Performances',
        badge: isAr ? 'ضحك ومرح' : 'Comedy & Tricks',
        desc: isAr ? 'فقرة استعراضية مضحكة لكلاب البحر الذكية والتقاط صور قريبة معها للأطفال والكبار.' : 'Hilarious sea lion show with interactive comedy tricks, clapping, and photo ops.'
      },
      {
        icon: Waves,
        title: isAr ? 'السباحة التفاعلية في الحمام المائي' : 'Swim in Heated Pool with Dolphins',
        badge: isAr ? 'تجربة استثنائية' : 'Interactive Swim',
        desc: isAr ? 'النزول في الحمام المائي المجهّز والسباحة بجوار الدلافين ومسك الزعانف والرقص معها في الماء.' : 'Enter the pool to swim, hold dorsal fins, and glide effortlessly beside friendly dolphins.'
      },
      {
        icon: LifeBuoy,
        title: isAr ? 'قبلات وأحضان الدلافين الودودة' : 'Dolphin Kisses & Gentle Hugs',
        badge: isAr ? 'أمان تام' : 'Family Safe',
        desc: isAr ? 'جلسة تفاعلية لطيفة للمس الدلافين وتلقي القبلات الودودة وسط إشراف كامل لمدربي الحديقة.' : 'Experience the gentle touch of dolphins, cuddle, and receive sweet kisses on the cheek.'
      },
      {
        icon: Camera,
        title: isAr ? 'جلسات تصوير تذكاري احترافي' : 'Professional Souvenir Photography',
        badge: isAr ? 'صور مؤطرة' : 'Souvenir Photos',
        desc: isAr ? 'فرصة لالتقاط صور فوتوغرافية احترافية وطباعتها في براويز تذكارية تخلد هذه اللحظات الرائعة.' : 'Capture high-resolution photos with dolphins to take home framed as lifelong keepsakes.'
      },
      {
        icon: ShieldCheck,
        title: isAr ? 'مناسب لجميع أفراد الأسرة والأطفال' : 'Perfect for Kids & All Ages',
        badge: isAr ? 'أمان ورقابة' : 'Certified Safety',
        desc: isAr ? 'سترات نجاة مخصصة للأطفال، مدربون متواجدون داخل الحمام، وبيئة آمنة ونظيفة ومكيّفة بالكامل.' : 'Dedicated lifejackets, certified pool lifeguards, and clean facilities safe for ages 3+.'
      }
    ],
    snorkeling: [
      {
        icon: Waves,
        title: isAr ? 'مضايق جزيرة تيران الشهيرة' : 'Straits of Tiran Marine Canyons',
        badge: isAr ? 'طبيعة عذراء' : 'Iconic Straits',
        desc: isAr ? 'الإبحار إلى أروع البقاع البحرية في خليج العقبة بمحاذاة جزيرة تيران ذات المياه الفيروزية.' : 'Sail along the dramatic coastal straits to pristine coral drop-offs in the Gulf of Aqaba.'
      },
      {
        icon: Fish,
        title: isAr ? 'شعاب جوردون وجاكسون المرجانية' : 'Gordon & Jackson Coral Reefs',
        badge: isAr ? 'شعاب عالمية' : 'World-Class Reefs',
        desc: isAr ? 'وقفات سنوركلينج بين جدران المرجان الهابطة لأعماق خيالية والمليئة بأنواع المرجان الصلب والناعم.' : 'Snorkel over sheer vertical coral walls teeming with clownfish, rays, and sea turtles.'
      },
      {
        icon: Compass,
        title: isAr ? 'مشاهدة سفينة لويلا الغارقة' : 'Historic Louilla Shipwreck',
        badge: isAr ? 'معلم أسطوري' : 'Famous Wreck',
        desc: isAr ? 'رؤية السفينة التجارية التاريخية الغارقة فوق الشعاب المرجانية والتقاط صور نادرة للموقع.' : 'View the landmark commercial shipwreck perched atop the reef since 1981.'
      },
      {
        icon: UtensilsCrossed,
        title: isAr ? 'بوفيه غداء ساخن على ظهر المركب' : 'Hot Lunch Buffet & Drinks',
        badge: isAr ? 'شامل الوجبة' : 'Lunch Included',
        desc: isAr ? 'وجبة غداء شهية تضم أطباق اللحوم أو الأسماك، السلطات، المكرونة، والمشروبات الساخنة والباردة.' : 'Fresh lunch cooked onboard with salads, pasta, chicken/fish, and unlimited soft drinks.'
      },
      {
        icon: LifeBuoy,
        title: isAr ? 'مرشد سنوركلينج ومعدات الأمان' : 'Professional Snorkeling Guides',
        badge: isAr ? 'إشراف كامل' : 'Safe Snorkeling',
        desc: isAr ? 'إرشاد احترافي في الماء للمبتدئين وغير السباحين مع توفير سترات النجاة وأطواق الطفو.' : 'Certified snorkeling instructors assist in the water ensuring complete safety for all levels.'
      },
      {
        icon: Camera,
        title: isAr ? 'تشميس واسترخاء على أسطح اليخت' : 'Sun Deck Lounging & Cruising',
        badge: isAr ? 'استرخاء تام' : 'Sun Loungers',
        desc: isAr ? 'كراسي تشميس مريحة وتراس واسع للاستمتاع بنسيم البحر الصافي وإطلالات جبال سيناء الساحرة.' : 'Spacious open sundecks with panoramic views across Saudi Arabia and Sinai mountain horizons.'
      }
    ],
    diving: [
      {
        icon: Compass,
        title: isAr ? 'مدرب غوص PADI شخصي (1-on-1)' : 'Personal 1-on-1 PADI Instructor',
        badge: isAr ? 'تدريب معتمد' : 'PADI Certified',
        desc: isAr ? 'مرشد ومدرب غوص خاص بك يمسك بيدك ويوجهك طوال فترة الغطسة تحت الماء لضمان راحتك وأمانك.' : 'Your dedicated certified divemaster stays with you underwater step-by-step for absolute comfort.'
      },
      {
        icon: Waves,
        title: isAr ? 'شعور انعدام الجاذبية والطفو' : 'Zero-Gravity Underwater Feeling',
        badge: isAr ? 'سحر الأعماق' : 'Weightless Thrill',
        desc: isAr ? 'عش تجربة الطفو الحر بين أسماك البحر الأحمر والاستمتاع بالتنفس الطبيعي من أسطوانة الهواء.' : 'Experience total weightlessness, drifting effortlessly through warm, crystal-clear blue waters.'
      },
      {
        icon: Fish,
        title: isAr ? 'حدائق المرجان والأسماك النادرة' : 'Pristine Coral Gardens & Reef Fish',
        badge: isAr ? 'محميات بكر' : 'Vibrant Wildlife',
        desc: isAr ? 'مشاهدة أسماك البهلوان (نيمو)، أسماك الفراشة، والشعاب المرجانية العذراء على عمق 7 إلى 10 أمتار.' : 'Encounter clownfish, butterflyfish, moray eels, and pristine hard corals at depths up to 10m.'
      },
      {
        icon: ShieldCheck,
        title: isAr ? 'كافة معدات الغطس والبدلة مجاناً' : 'Full Scuba Gear & Tank Included',
        badge: isAr ? 'معدات حديثة' : 'Pro Gear Included',
        desc: isAr ? 'نوفر أسطوانات الأكسجين، منظم التنفس، سترة الطفو BCD، بدلة الغطس، والزعانف المعقمة.' : 'Modern scuba tanks, regulators, BCD buoyancy vests, wetsuits, and masks all provided.'
      },
      {
        icon: UtensilsCrossed,
        title: isAr ? 'بوفيه غداء ومشروبات على اليخت' : 'Buffet Lunch & All-Day Beverages',
        badge: isAr ? 'طازج وشهي' : 'Lunch Buffet',
        desc: isAr ? 'وجبة غداء ساخنة ومتنوعة ومشروبات طوال اليوم بين وقفات الغطس للاستراحة واستعادة النشاط.' : 'Hot lunch buffet served onboard with soft drinks, tea, and coffee between dive sessions.'
      },
      {
        icon: Camera,
        title: isAr ? 'تصوير فوتوغرافي تحت الماء' : 'Underwater Photography Option',
        badge: isAr ? 'صور تذكارية' : 'Pro Dive Photos',
        desc: isAr ? 'إمكانية توثيق غطستك الأولى بصور وفيديوهات احترافية بكاميرات تحت مائية مخصصة للأعماق.' : 'Optional underwater photo and video packages to record your first scuba dive forever.'
      }
    ],
    parasailing: [
      {
        icon: Wind,
        title: isAr ? 'طيران على ارتفاع 40 متراً في السماء' : 'Fly 40 Meters High in the Sky',
        badge: isAr ? 'إثارة وتشويق' : '40m Altitude',
        desc: isAr ? 'استمتع بإحساس الطيران الحر فوق مياه البحر الأحمر الشفافة والاستمتاع بنسيم البحر العليل.' : 'Soar gracefully 40 meters above the turquoise sea with a gentle sea breeze and calm flight.'
      },
      {
        icon: Camera,
        title: isAr ? 'رؤية بانورامية لخليج نعمة وجبال سيناء' : 'Panoramic View of Sharm & Sinai',
        badge: isAr ? 'إطلالة خيالية' : '360° Panorama',
        desc: isAr ? 'شاهد شواطئ شرم الشيخ، الفنادق، وسلاسل جبال سيناء الشامخة من زاوية عين الصقر الاستثنائية.' : 'Take in awe-inspiring views of coral bays, golden beaches, and dramatic desert granite peaks.'
      },
      {
        icon: Sparkles,
        title: isAr ? 'طيران فردي أو زوجي (Solo & Tandem)' : 'Solo or Tandem (Couples Flight)',
        badge: isAr ? 'لشخص أو شخصين' : 'Tandem Option',
        desc: isAr ? 'حلّق بمفردك أو شارك التجربة مع شريكك أو صديقك على نفس الباراشوت بأحزمة أمان مزدوجة.' : 'Fly alone or share the parachute side-by-side with your partner or friend with dual harness.'
      },
      {
        icon: ShieldCheck,
        title: isAr ? 'إقلاع وهبوط هيدروليكي ناعم على القارب' : 'Smooth Hydraulic Boat Launch & Landing',
        badge: isAr ? 'أمان 100%' : 'No Water Landing',
        desc: isAr ? 'الإقلاع والهبوط يتمان مباشرة وسلاسة من منصة القارب الهيدروليكية دون الحاجة للبلل بالماء.' : 'Take off and land smoothly directly onto the boat platform with zero wet landing required.'
      },
      {
        icon: LifeBuoy,
        title: isAr ? 'سترات نجاة ومعدات أمان دولية' : 'International Safety Harness & Lifejackets',
        badge: isAr ? 'معايير أمان عالية' : 'Certified Rigging',
        desc: isAr ? 'أحزمة طيران مدعمة، سترات طفو معتمدة، وقبطان محترف ذو خبرة طويلة في ملاحة الباراشوت.' : 'Heavy-duty certified harnesses, lifejackets, and experienced licensed marine captains.'
      },
      {
        icon: Clock,
        title: isAr ? 'جولة بحرية سريعة باللانش' : 'Speedboat Coastal Cruise Included',
        badge: isAr ? 'رحلة سريعة' : 'Speedboat Fun',
        desc: isAr ? 'جولة سريعة وممتعة باللانش المائي في خليج نعمة قبل وبعد دورك في الطيران مع التوصيل الفندقي.' : 'Enjoy an exciting speedboat cruise around the bay before and after your flight.'
      }
    ],
    banana: [
      {
        icon: Smile,
        title: isAr ? 'قارب البنانا المائي السريع (Banana Boat)' : 'Inflatable Banana Boat Ride',
        badge: isAr ? 'ضحك ومرح جماعي' : 'Group Fun',
        desc: isAr ? 'ركوب القارب المطاطي الشهير على شكل موزة وسحبه بسرعة حماسية فوق الأمواج مع الالتفافات الممتعة.' : 'Ride the classic yellow inflatable banana boat bouncing across sea waves with fun turns.'
      },
      {
        icon: Waves,
        title: isAr ? 'تيوب التيوب السريع (Sofa Tube / Matrix)' : 'High-Speed Sofa Tube Thrill',
        badge: isAr ? 'سرعة وتشويق' : 'Matrix Tube',
        desc: isAr ? 'الجلوس على الكنبة المائية السريعة المندفعة فوق رذاذ المياه الفيروزية خلف لانش القوة الفائقة.' : 'Sit back on the inflatable sofa tube skimming across the waves with heart-pounding acceleration.'
      },
      {
        icon: Sparkles,
        title: isAr ? 'مثالي للعائلات ومجموعات الأصدقاء' : 'Ideal for Families & Groups of Friends',
        badge: isAr ? 'يتسع حتى 6 أفراد' : 'Up to 6 Riders',
        desc: isAr ? 'يتسع القارب لـ 4 إلى 6 أفراد معاً، مما يجعلها الذكرى الأكثر مرحاً وسعادة في رحلتك لشرم الشيخ.' : 'Fits 4 to 6 riders at once, making it the most fun and social group activity on the beach.'
      },
      {
        icon: ShieldCheck,
        title: isAr ? 'سترات نجاة ملائمة لجميع الأعمار' : 'Fitted Lifejackets for All Ages',
        badge: isAr ? 'أمان ورقابة' : 'Safety First',
        desc: isAr ? 'سترات نجاة مريحة لكل راكب، وتحكم كامل لقائد اللانش في مستوى السرعة بما يناسب راحة الركاب.' : 'Certified lifejackets provided for kids and adults, with captain tailoring speeds to riders.'
      },
      {
        icon: LifeBuoy,
        title: isAr ? 'سقوط آمن في المياه المنعشة' : 'Safe Refreshing Water Splashes',
        badge: isAr ? 'انتعاش تام' : 'Cool Splash',
        desc: isAr ? 'إمكانية طلب الانعطاف المائي الممتع في نهاية الجولة للنزول والسباحة المنعشة في مياه البحر الصافية.' : 'Optional fun splash turn at the end for an exhilarating cool-down dip in clear waters.'
      },
      {
        icon: Clock,
        title: isAr ? 'مواعيد مرنة وانتقال فندقي مريح' : 'Flexible Daily Slots & Hotel Pickup',
        badge: isAr ? 'فترات صباحية ومسائية' : 'Flexible Hours',
        desc: isAr ? 'فترات انطلاق متعددة على مدار اليوم مع توفير باص سياحي مكيف للتوصيل من وإلى فندقك.' : 'Multiple departures throughout the day with comfortable air-conditioned hotel transfers.'
      }
    ]
  };

  // Itinerary per Tab
  const tabItineraries = {
    yacht: [
      { step: 1, time: '08:00 ص', title: isAr ? 'الاستقبال من فندقك بشرم الشيخ' : 'Hotel Pickup in Sharm', desc: isAr ? 'التحرك بباص سياحي مكيف من الفندق إلى مارينا اليخوت الدولية.' : 'Pickup in AC bus heading to Sharm international marina.' },
      { step: 2, time: '09:00 ص', title: isAr ? 'الصعود على يخت VIP وبدء الإبحار' : 'Yacht Boarding & Departure', desc: isAr ? 'الترحيب بك على متن اليخت الفاخر والانطلاق نحو محمية رأس محمد.' : 'Safety briefing from captain and setting sail towards Ras Mohammed.' },
      { step: 3, time: '10:15 ص', title: isAr ? 'الوقفة الأولى للسنوركلينج' : 'First Snorkeling Stop', desc: isAr ? 'استكشاف الشعاب المرجانية الملونة وأندر الأسماك برفقة المرشد البحري.' : 'Guided snorkeling along vertical coral walls with rare marine life.' },
      { step: 4, time: '12:00 م', title: isAr ? 'النزول على الجزيرة البيضاء (مالديف مصر)' : 'White Island Sandbar Landing', desc: isAr ? 'الاستمتاع بالمشي والتصوير على الرمال البيضاء الناعمة وسط المياه الفيروزية.' : 'Disembark onto powdery white sands surrounded by crystal waters.' },
      { step: 5, time: '01:15 م', title: isAr ? 'بوفيه غداء مفتوح ساخن ومشروبات' : 'Gourmet Lunch Buffet on Deck', desc: isAr ? 'تناول وجبة غداء شهية: مأكولات بحرية، دجاج، سلطات، مكرونة ومشروبات.' : 'Fresh seafood, BBQ chicken, salads, pasta, and soft drinks on deck.' },
      { step: 6, time: '02:30 م', title: isAr ? 'الوقفة الثانية: قفز في الماء وغوص' : 'Water Jump & Second Reef Stop', desc: isAr ? 'القفز الحر من منصة اليخت في البحر، سباحة، وغطسات سكوبا للمشتركين.' : 'Exciting jumps off yacht swim platform, second reef snorkel & intro scuba.' },
      { step: 7, time: '04:00 م', title: isAr ? 'العودة للمارينا والتوصيل للفندق' : 'Return Transfer to Hotel', desc: isAr ? 'الوصول لمارينا شرم والتوصيل المريح لباب فندقك بعد يوم حافل بالمتعة.' : 'Docking at marina and comfortable transfer back to your hotel lobby.' }
    ],
    dolphin: [
      { step: 1, time: '02:30 م', title: isAr ? 'الاستقبال من فندقك بشرم الشيخ' : 'Hotel Pickup in Sharm', desc: isAr ? 'التحرك بسيارة سياحية مكيّفة من أمام فندقك إلى حديقة الدلافين (دولفينا).' : 'Comfortable pickup from your resort heading to Dolphinella Park.' },
      { step: 2, time: '03:00 م', title: isAr ? 'الوصول والدخول للمدرجات المكيفة' : 'Arrival & Priority Arena Seating', desc: isAr ? 'استلام التذاكر والدخول للمقاعد المخصصة أمام الحمام المائي الرئيسي.' : 'Enter the arena and take prime seats facing the main performance pool.' },
      { step: 3, time: '03:15 م', title: isAr ? 'بدء عرض الدلافين وكلاب البحر الاستعراضي' : 'Dolphin & Sea Lion Show Starts', desc: isAr ? 'مشاهدة 45 دقيقة من القفزات الأكروباتية والرقص الإيقاعي وألعاب الكرات.' : 'Enjoy 45 minutes of synchronized jumps, acrobatic flips, and tricks.' },
      { step: 4, time: '04:15 م', title: isAr ? 'جلسة السباحة والتفاعل مع الدلافين' : 'Swimming Session in Heated Pool', desc: isAr ? 'لحاملي تذاكر السباحة: ارتداء السترات والنزول للسباحة واللعب مع الدلافين.' : 'For swim ticket holders: jump into pool to swim, hug, and play.' },
      { step: 5, time: '05:00 م', title: isAr ? 'جلسة التصوير التذكاري والبراويز' : 'Souvenir Photos & Gift Shop', desc: isAr ? 'التقاط صور تذكارية خاصة وطباعتها وتصفح الهدايا التذكارية للحديقة.' : 'Pick up printed framed photos with dolphins as keepsakes.' },
      { step: 6, time: '05:30 م', title: isAr ? 'العودة والتوصيل المريح لفندقك' : 'Return Transfer to Hotel Lobby', desc: isAr ? 'التوصيل المريح بالسيارة المكيفة إلى استقبال فندقك بشرم الشيخ.' : 'Smooth air-conditioned drive back to your hotel resort lobby.' }
    ],
    snorkeling: [
      { step: 1, time: '08:00 ص', title: isAr ? 'الاستقبال الصباحي من الفندق' : 'Morning Hotel Pickup', desc: isAr ? 'الانطلاق بسيارة مكيفة إلى مارينا شرم الشيخ واستلام معدات السنوركل.' : 'AC transfer to the marine port and fitting snorkeling equipment.' },
      { step: 2, time: '09:00 ص', title: isAr ? 'الإبحار نحو مضايق جزيرة تيران' : 'Setting Sail to Straits of Tiran', desc: isAr ? 'التحرك باليخت في مياه خليج العقبة والاستمتاع بإطلالات الجبال.' : 'Cruise across open turquoise waters toward the Straits of Tiran.' },
      { step: 3, time: '10:30 ص', title: isAr ? 'الوقفة الأولى: شعاب جوردون وسفينة لويلا' : 'First Stop: Gordon Reef & Louilla Wreck', desc: isAr ? 'سنوركلينج بين جدران المرجان ورؤية هيكل السفينة الغارقة الأسطوري.' : 'Snorkel around vibrant reefs and view the historic shipwreck.' },
      { step: 4, time: '12:30 م', title: isAr ? 'تناول وجبة الغداء الساخنة على اليخت' : 'Fresh Hot Lunch Buffet', desc: isAr ? 'بوفيه غداء مفتوح يضم تشكيلة من أشهى المأكولات الطازجة والمشروبات.' : 'Delicious hot lunch buffet served on the shaded dining deck.' },
      { step: 5, time: '01:45 م', title: isAr ? 'الوقفة الثانية: حدائق شعاب جاكسون' : 'Second Stop: Jackson Reef Gardens', desc: isAr ? 'السباحة والسنوركلينج برفقة المرشد لمشاهدة السلاحف والأسماك الملونة.' : 'Second guided snorkel exploring rich coral gardens and sea turtles.' },
      { step: 6, time: '03:30 م', title: isAr ? 'العودة إلى مارينا شرم الشيخ والتوصيل' : 'Return to Marina & Hotel Drop-off', desc: isAr ? 'الوصول للمارينا والتوصيل المباشر إلى باب فندقك في شرم الشيخ.' : 'Cruise back to marina and return transfer to your hotel reception.' }
    ],
    diving: [
      { step: 1, time: '08:00 ص', title: isAr ? 'الاستقبال من الفندق والانطلاق للمركب' : 'Hotel Pickup to Dive Cruiser', desc: isAr ? 'التوصيل المريح من فندقك لمارينا الغوص ولقاء مدربي PADI المحترفين.' : 'Comfortable pickup to diving marina and meeting your instructor.' },
      { step: 2, time: '09:00 ص', title: isAr ? 'شرح تعليمات الغوص وقواعد الأمان' : 'Scuba Briefing & Equipment Check', desc: isAr ? 'جلسة نظرية سهلة ومبسطة لشرح طريقة التنفس وإشارات اليد تحت الماء.' : 'Simple briefing on breathing, equalizing ears, and hand signals.' },
      { step: 3, time: '10:30 ص', title: isAr ? 'الغطسة الاستكشافية الأولى (1-on-1)' : 'First Intro Dive with Instructor', desc: isAr ? 'النزول تحت الماء برفقة المدرب لمشاهدة أسماك وشعاب البحر الأحمر حتى 10م.' : '20 minutes gliding beside your instructor over vibrant coral walls.' },
      { step: 4, time: '12:30 م', title: isAr ? 'بوفيه غداء ساخن ومشروبات على اليخت' : 'Onboard Buffet Lunch & Rest', desc: isAr ? 'استراحة وتناول وجبة غداء طازجة ومشروبات ساخنة وباردة تحت أشعة الشمس.' : 'Freshly prepared hot lunch buffet and tea on deck while cruising.' },
      { step: 5, time: '01:45 م', title: isAr ? 'الغطسة الثانية أو سنوركلينج ممتع' : 'Second Dive or Guided Snorkeling', desc: isAr ? 'غطسة ثانية لحاملي التذكرة المزدوجة أو سنوركلينج حر حول الشعاب.' : 'Second dive at new reef site or relaxing snorkeling session.' },
      { step: 6, time: '04:00 م', title: isAr ? 'العودة للمارينا والتوصيل لفندقك' : 'Return Transfer to Hotel', desc: isAr ? 'الوصول للمارينا والتوصيل المريح لباب فندقك بشرم الشيخ.' : 'Dock at marina and air-conditioned transfer back to hotel lobby.' }
    ],
    parasailing: [
      { step: 1, time: 'صباحاً/مساءً', title: isAr ? 'الاستقبال والانتقال لمركز الألعاب المائية' : 'Hotel Pickup to Water Sports Center', desc: isAr ? 'التحرك بسيارة مكيفة من فندقك لشاطئ مركز الألعاب المائية بخليج نعمة.' : 'Transfer from your resort to the beach water sports center.' },
      { step: 2, time: '+20 دقيقة', title: isAr ? 'ارتداء أحزمة الأمان وصعود اللانش السريع' : 'Safety Harness Fitting & Boat Boarding', desc: isAr ? 'ارتداء سترة النجاة وحزام الأمان المعتمد وصعود قارب الباراشوت المجهز.' : 'Get fitted into certified flight harness and board speed launch.' },
      { step: 3, time: '+40 دقيقة', title: isAr ? 'الإقلاع السلس والتحليق 40 متراً بالسماء' : 'Hydraulic Winch Takeoff & Flight', desc: isAr ? 'إقلاع هيدروليكي آمن من ظهر القارب والتحليق لمدة 10-12 دقيقة فوق البحر.' : 'Smooth ascent 40m into the sky, soaring 10-12 mins with sea views.' },
      { step: 4, time: '+55 دقيقة', title: isAr ? 'الهبوط الهيدروليكي الناعم على القارب' : 'Smooth Landing on Boat Deck', desc: isAr ? 'سحب الباراشوت بهدوء والهبوط برفق تام على منصة القارب بدون ابتلال.' : 'Winch smoothly reels you back onto the boat platform safely.' },
      { step: 5, time: '+1.5 ساعة', title: isAr ? 'العودة والتوصيل المريح إلى فندقك' : 'Return Transfer to Hotel Lobby', desc: isAr ? 'العودة بالسيارة المكيفة والتوصيل المباشر إلى باب فندقك بشرم الشيخ.' : 'Comfortable AC transfer back to your Sharm resort reception.' }
    ],
    banana: [
      { step: 1, time: 'صباحاً/مساءً', title: isAr ? 'الاستقبال والتوصيل لشاطئ الألعاب المائية' : 'Hotel Pickup to Beach Center', desc: isAr ? 'التحرك بالسيارة المكيفة إلى مركز الألعاب والرياضات المائية الشاطئي.' : 'Pickup from your hotel lobby heading to the coastal beach club.' },
      { step: 2, time: '+15 دقيقة', title: isAr ? 'ارتداء سترات النجاة وشرح تعليمات السلامة' : 'Lifejacket Fitting & Safety Briefing', desc: isAr ? 'اختيار سترات النجاة المناسبة وشرح طريقة الإمساك بمقابض القارب المطاطي.' : 'Fitted with secure lifejackets and briefed on holding handles.' },
      { step: 3, time: '+30 دقيقة', title: isAr ? 'انطلاق قارب البنانا أو التيوب فوق الأمواج' : 'Thrilling Banana / Tube Ride on Waves', desc: isAr ? 'جولة مائية حماسية وممتعة لمدة 15 دقيقة مسحوباً بلانش سريع في عرض البحر.' : '15-minute adrenaline ride bouncing across the Red Sea waves.' },
      { step: 4, time: '+50 دقيقة', title: isAr ? 'العودة للشاطئ والاستراحة وتناول المشروبات' : 'Return to Beach & Refreshment', desc: isAr ? 'العودة للشاطئ وأخذ قسط من الراحة والتقاط الصور التذكارية.' : 'Return to beach deck for a refreshing break and memorable photos.' },
      { step: 5, time: '+1 ساعة', title: isAr ? 'العودة والتوصيل المريح إلى فندقك' : 'Return Transfer to Hotel', desc: isAr ? 'التوصيل المريح بالسيارة المكيفة إلى باب فندقك في شرم الشيخ.' : 'Comfortable air-conditioned drive back to your resort lobby.' }
    ]
  };

  const romanticYachtItinerary = [
    { step: 1, time: '05:00 م', title: isAr ? 'استقبال ليموزين VIP خاص من الفندق' : 'Private VIP Limousine Hotel Pickup', desc: isAr ? 'سيارة خاصة مكيفة من باب فندقك مباشرة إلى مارينا اليخوت الدولية.' : 'Private luxury limousine transfer directly to Sharm marina.' },
    { step: 2, time: '05:30 م', title: isAr ? 'استقبال بالسجادة الحمراء وباقة ورود طبيعية' : 'Red Carpet Welcome & Fresh Rose Bouquet', desc: isAr ? 'الصعود على متن اليخت الفاخر مع استقبال ملكي بالأزهار الطبيعية والموسيقى.' : 'Board the private VIP yacht with red carpet and fresh flowers welcome.' },
    { step: 3, time: '06:00 م', title: isAr ? 'الإبحار وقت الغروب وأضواء خليج نعمة' : 'Sunset Sailing & Naama Bay Skyline', desc: isAr ? 'إبحار هادئ مع مشهد غروب الشمس الآسر على مياه البحر الأحمر والتقاط الصور.' : 'Romantic sunset sailing along Sharm coastline with breathtaking golden hour views.' },
    { step: 4, time: '07:00 م', title: isAr ? 'عشاء سي فود فاخر بالشموع على سطح اليخت' : 'Candlelight Gourmet Seafood Dinner on Deck', desc: isAr ? 'طاولة خاصة لشخصين بالشموع والورود، عشاء جمبري واستاكوزا مشوية ومشروبات.' : 'Private candlelit table for two with grilled lobster, jumbo shrimp & wine glasses.' },
    { step: 5, time: '08:00 م', title: isAr ? 'عزف حي على الكمان وسهرة تحت النجوم' : 'Live Violin Performance Under The Stars', desc: isAr ? 'عزف موسيقي رومانسي هادئ على الكمان مع نسيم البحر وتقديم تورتة الاحتفال.' : 'Live acoustic violin serenade under the starlit sky with celebration cake.' },
    { step: 6, time: '09:00 م', title: isAr ? 'العودة بالليموزين إلى باب الفندق' : 'VIP Limousine Return to Hotel', desc: isAr ? 'الوصول للمارينا والتوصيل المريح بالسيارة الخاصة لباب فندقك.' : 'Comfortable private limousine transfer back to your hotel resort lobby.' }
  ];

  const marryMeYachtItinerary = [
    { step: 1, time: '04:30 م', title: isAr ? 'استقبال ليموزين VIP خاص وتجهيز المفاجأة' : 'Private VIP Limousine & Surprise Setup', desc: isAr ? 'توصيل سري خاص بالليموزين بينما يكتمل تجهيز الديكور المخصص على اليخت.' : 'Private limousine transfer while our team prepares the exclusive deck setup.' },
    { step: 2, time: '05:00 م', title: isAr ? 'الصعود لليخت وممر الورود والشموع' : 'Boarding & Rose Petal Lantern Aisle', desc: isAr ? 'ممر خاص من بتلات الورد الطبيعي والفوانيس المضيئة يقود إلى مقدمة اليخت.' : 'Walk down a romantic candlelit aisle strewn with fresh red rose petals.' },
    { step: 3, time: '05:30 م', title: isAr ? 'إضاءة حروف MARRY ME الضخمة ولحظة الطلب' : 'MARRY ME Marquee Reveal & The Proposal', desc: isAr ? 'تشغيل الحروف المضيئة العملاقة مع إطلاق الألعاب النارية والشرارات الباردة.' : 'Giant illuminated letters light up with cold sparkler fountains as you propose.' },
    { step: 4, time: '06:00 م', title: isAr ? 'جلسة تصوير احترافي وفيديو سينمائي بالدرون' : 'Professional HD Photoshoot & 4K Drone Video', desc: isAr ? 'توثيق اللحظة الساحرة بكاميرات سينمائية وطائرة درون جوية فوق البحر.' : 'Capture every angle with dedicated photographer and 4K aerial drone.' },
    { step: 5, time: '06:45 م', title: isAr ? 'تقطيع تورتة الاحتفال ونخب المناسبة' : 'Celebration Cake & Sparkling Toast', desc: isAr ? 'الاحتفال بنجاح المفاجأة وتناول التورتة الفاخرة والمشروبات المنعشة.' : 'Celebrate with delicious personalized cake and sparkling champagne toast.' },
    { step: 6, time: '08:00 م', title: isAr ? 'الإبحار الرومانسي والعودة بالليموزين' : 'Starlight Sailing & VIP Return', desc: isAr ? 'جولة بحرية هادئة تحت النجوم ثم العودة بالليموزين الخاص إلى فندقكم.' : 'Scenic starlit cruise back to port followed by luxury private limousine return.' }
  ];

  let itinerarySteps = tabItineraries[activeTab] || tabItineraries.yacht;
  if (activeTab === 'yacht') {
    if (activeSubTab === 'romantic_dinner') {
      itinerarySteps = romanticYachtItinerary;
    } else if (activeSubTab === 'marry_me') {
      itinerarySteps = marryMeYachtItinerary;
    }
  }

  const currentActivities = tabActivities[activeTab] || tabActivities.yacht;

  const currentAvailableTimes = activeTab === 'yacht' && activeSubTab === 'romantic_dinner'
    ? [isAr ? '05:30 مساءً (سهرة الغروب والعشاء)' : '05:30 PM (Sunset Cruise & Dinner)']
    : activeTab === 'yacht' && activeSubTab === 'marry_me'
    ? [isAr ? '05:00 مساءً (الغروب والشفق)' : '05:00 PM (Sunset & Twilight)']
    : currentTabInfo.availableTimes;

  // Active experience object for BookingWidget
  const activeExperience = {
    ...experience,
    title: currentTabInfo.heroTitle,
    startingPrice: currentTabInfo.startingPrice,
    availableTimes: currentAvailableTimes,
    category: 'sea',
    destination: activeTab,
    activeTab,
    activeSubTab,
    onSubTabChange: handleSubTabChange
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF9F6] text-slate-900 min-h-screen overflow-x-hidden max-w-full">
      <SEOHead
        title={`${currentTabInfo.heroTitle} | ${isAr ? 'مجموعة الهنا' : 'El Hana Group'}`}
        description={currentTabBase.heroSubtitle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* 1. Big Luxury Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-10 md:p-12 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between border border-sky-400/20 shadow-xl">
          <img
            src={currentTabInfo.heroImage}
            alt={currentTabInfo.heroTitle}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/sea/ras-mohammed-luxury-yacht.jpg';
            }}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent rtl:bg-gradient-to-l"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20"></div>

          {/* Top Overlapping Breadcrumbs */}
          <div className="relative z-10">
            <Breadcrumbs
              items={[
                { label: isAr ? 'الرحلات البحرية' : 'Sea Trips', link: '/sea-trips' },
                { label: currentTabInfo.heroTitle }
              ]}
              variant="hero"
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl space-y-3 pt-6 sm:pt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284C7]/30 border border-sky-400/50 text-[#38BDF8] text-xs font-black tracking-wide backdrop-blur-md">
              <Ship className="w-3.5 h-3.5 text-sky-400" />
              <span>{currentTabInfo.badge || (isAr ? 'رحلات البحر الأحمر الفيروزية' : 'Red Sea Marine Cruises')}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              {currentTabInfo.heroTitle}
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed font-medium line-clamp-3">
              {currentTabBase.heroSubtitle}
            </p>

            {/* Key Facts Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                {currentTabBase.duration}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {isAr ? 'شرم الشيخ والبحر الأحمر' : 'Sharm El Sheikh, Red Sea'}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {isAr ? 'تأمين بحري ومرشدين معتمدين' : 'Certified Marine Guides & Insurance'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Main Sea Category Tabs & Sub-Options Bar */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-sm space-y-3">
          
          {/* Main 6 Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { id: 'yacht', label: isAr ? 'يخت الجزيرة البيضاء' : 'White Island Yacht', icon: Ship },
              { id: 'dolphin', label: isAr ? 'عروض الدلافين' : 'Dolphin Experience', icon: Sparkles },
              { id: 'snorkeling', label: isAr ? 'سنوركلينج تيران' : 'Tiran Snorkeling', icon: Waves },
              { id: 'diving', label: isAr ? 'غوص السكوبا' : 'Scuba Diving', icon: Compass },
              { id: 'parasailing', label: isAr ? 'طيران الباراشوت' : 'Parasailing', icon: Wind },
              { id: 'banana', label: isAr ? 'الألعاب المائية والبنانا' : 'Banana & Tube', icon: Smile },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-3 px-2 sm:px-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center gap-1.5 text-center cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-lg shadow-sky-600/30 ring-2 ring-sky-400 font-black scale-[1.02]'
                      : 'bg-slate-50 text-slate-700 hover:text-[#0284C7] hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 shadow-2xs'
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Category Options Bar */}
          <div className="pt-3 border-t border-slate-100">
            <div className="bg-gradient-to-r from-sky-50/60 via-slate-50 to-cyan-50/40 p-2 sm:p-2.5 rounded-2xl border border-sky-100/80 shadow-inner flex items-center justify-center flex-wrap gap-2 sm:gap-2.5">
              {Object.keys(subTabDetails[activeTab] || {}).map((subKey) => {
                const opt = subTabDetails[activeTab][subKey];
                const isActive = activeSubTab === subKey;
                return (
                  <button
                    key={subKey}
                    onClick={() => handleSubTabChange(subKey)}
                    className={`flex-1 sm:flex-initial min-w-0 sm:min-w-[140px] px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-300 font-black scale-[1.01]'
                        : 'bg-white text-slate-700 hover:text-[#0284C7] hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-2xs'
                    }`}
                  >
                    <span>{opt.badge} — ${opt.startingPrice}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left Column (2 Cols): Details, Activities, Gallery, Itinerary, Inclusions */}
          <div className="lg:col-span-2 space-y-8">

            {/* Highlights Grid (6 Cards) */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900">
                    {isAr ? 'أبرز مميزات وفعاليات الرحلة' : 'Tour Highlights & Activities'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {isAr ? 'أنشطة حصرية ومغامرات مائية لا تُنسى في البحر الأحمر' : 'Exciting aquatic adventures & activities in Sharm'}
                  </p>
                </div>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                  {currentActivities.length} {isAr ? 'فعاليات' : 'Highlights'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentActivities.map((act, idx) => {
                  const IconComponent = act.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-sky-400/40 hover:bg-white hover:shadow-md transition-all duration-300 flex items-start gap-3.5 text-start rtl:text-right"
                    >
                      <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#0284C7] to-teal-600 text-white flex items-center justify-center shadow-xs">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-sm font-extrabold text-slate-900 font-heading leading-snug">{act.title}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 shrink-0">{act.badge}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">{act.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
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
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900">
                    {isAr ? 'برنامج وخط سير الرحلة خطوة بخطوة' : 'Step-by-Step Tour Itinerary'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {isAr ? 'جدول زمني منظم من الاستقبال الفندقي وحتى العودة' : 'Carefully organized schedule from hotel pickup to return'}
                  </p>
                </div>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                  {itinerarySteps.length} {isAr ? 'مراحل' : 'Steps'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {itinerarySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8FAFC] p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-sky-400/40 hover:bg-white hover:shadow-md transition-all duration-300 flex items-start gap-3.5 text-start rtl:text-right"
                  >
                    <div className="shrink-0 px-2.5 py-1 rounded-xl bg-gradient-to-br from-[#0284C7] to-teal-600 text-white text-[11px] font-black shadow-xs">
                      {step.time}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h4 className="text-sm font-extrabold text-slate-900 font-heading leading-snug">{step.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Included */}
              <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-3.5">
                <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-xs font-black flex items-center justify-center">✓</span>
                  {isAr ? 'تشمل الرحلة (مشمول في التكلفة)' : "What's Included in Your Cruise"}
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                  {experience.included && experience.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1.5"></span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded */}
              <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-3.5">
                <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-500 text-xs font-black flex items-center justify-center">✕</span>
                  {isAr ? 'غير مشمول (إضافات اختيارية)' : "What's Excluded (Optional Extras)"}
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                  {experience.excluded && experience.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0 mt-1.5"></span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What to Bring Checklist */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800 shadow-lg">
              <div className="flex items-center gap-2 font-bold text-[#38BDF8]">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <span className="text-base font-heading">
                  {isAr ? 'ماذا يجب أن تحضر معك في الرحلة البحرية؟' : 'What Should You Bring Along?'}
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 font-normal">
                <li className="flex items-baseline gap-2">
                  <span className="text-sky-400">•</span>
                  <span>{isAr ? 'أصل جواز السفر أو بطاقة الرقم القومي (ضروري للأكمنة والتصاريح البحرية)' : 'Original Passport or National ID (required for marina permit)'}</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-sky-400">•</span>
                  <span>{isAr ? 'ملابس السباحة (مايوه) ومنشفة شخصية (Beach Towel)' : 'Swimsuit and personal beach towel'}</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-sky-400">•</span>
                  <span>{isAr ? 'كريم واقي من الشمس (Sunblock) ونظارة شمسية' : 'Sunscreen lotion and sunglasses'}</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-sky-400">•</span>
                  <span>{isAr ? 'حذاء بحر مائي خفيف لحماية القدمين' : 'Light water shoes for beach and boat deck'}</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div id="booking-widget-container" className="lg:col-span-1 sticky top-24 scroll-mt-28">
            <BookingWidget experience={activeExperience} />
          </div>

        </div>

        {/* 4. FAQs Section */}
        <div className="pt-8 space-y-6 border-t border-slate-200">
          <FAQAccordion category="sea" showSearch={false} />
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
                {currentTabInfo.galleryTitle || currentTabInfo.heroTitle}
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

    </div>
  );
};

export default SeaUnifiedPage;
