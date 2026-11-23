import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Star,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { EXPERIENCES, getLocalizedExperience } from '../data/experiences';
import { useCurrency } from '../context/CurrencyContext';
import StackSection from './StackSection';

const pad = (n) => String(n).padStart(2, '0');
const toWebp = (url) => (url ? url.replace(/\.(jpg|jpeg|png)$/i, '.webp') : url);

// Strictly ordered 24 trips (8 slides of 3 cards on desktop):
// 1. Safari First -> 2. Sea & Marine -> 3. Transfers -> 4. Outside Sharm -> 5. Private VIP
const ORDERED_TRIP_DEFINITIONS = [
  // ═══════════════════════════════════════════════════════════════
  // 1. رحلات السفاري والصحراء أولاً (Desert Safari Group) - SLIDE 1
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'atv-quad-bike-safari',
    group: 'safari',
    groupBadgeAr: 'سفاري البيتش باجي في الصحراء',
    groupBadgeEn: 'Sinai Desert Quad Safari',
    focus: 'center 45%',
    image: '/images/real/user-atv-safari.webp'
  },
  {
    slug: 'dune-buggy-adventure',
    group: 'safari',
    groupBadgeAr: 'سفاري الكار باجي في الجبال',
    groupBadgeEn: 'Polaris Dune Buggy Safari',
    focus: 'center 50%',
    image: '/images/real/polaris-buggy-white.webp'
  },
  {
    slug: 'luxury-polaris-canam-buggy-safari',
    group: 'safari',
    groupBadgeAr: 'سفاري بولاريس وكان-آم توربو VIP',
    groupBadgeEn: 'Can-Am & Polaris Turbo VIP',
    focus: 'center 50%',
    image: '/images/real/family-buggy-ride.jpg'
  },

  // ═══════════════════════════════════════════════════════════════
  // السهرات البدوية وقوافل الجمال (Bedouin & Caravans) - SLIDE 2
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'super-desert-combo-safari',
    group: 'safari',
    groupBadgeAr: 'سوبر سفاري كومبو شامل',
    groupBadgeEn: 'Super Safari Combo All-In-One',
    focus: 'center 45%',
    image: '/images/real/polaris-buggy-family.webp'
  },
  {
    slug: 'authentic-bedouin-experience-dinner',
    group: 'safari',
    groupBadgeAr: 'سهرة وعشاء بدوي ورصد النجوم',
    groupBadgeEn: 'Bedouin Dinner & Stargazing',
    focus: 'center 45%',
    image: '/images/safari/bedouin/vip/IMG-20260722-WA0354.jpg'
  },
  {
    slug: 'camel-riding',
    group: 'safari',
    groupBadgeAr: 'قوافل الجمال البدوية بالغروب',
    groupBadgeEn: 'Sunset Camel Caravan Ride',
    focus: 'center 45%',
    image: '/images/real/camel-riding-hero.jpg'
  },

  // ═══════════════════════════════════════════════════════════════
  // الخيل العربي والتجارب الرومانسية (Horses & Romantic) - SLIDE 3
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'horse-riding',
    group: 'safari',
    groupBadgeAr: 'ركوب الخيل العربي الأصيل',
    groupBadgeEn: 'Arabian Horseback Riding',
    focus: 'center 45%',
    image: '/images/real/horse-riding-hero.jpg'
  },
  {
    slug: 'romantic-bedouin-candlelight-dinner',
    group: 'safari',
    groupBadgeAr: 'عشاء رومانسي بالخيمة البدوية',
    groupBadgeEn: 'Romantic Bedouin Dinner',
    focus: 'center 45%',
    image: '/images/romantic/romantic-bedouin-candlelight-dinner.jpg'
  },
  {
    slug: 'marry-me-proposal-desert',
    group: 'safari',
    groupBadgeAr: 'باقة طلب الزواج VIP في الصحراء',
    groupBadgeEn: 'Desert VIP Proposal Package',
    focus: 'center 45%',
    image: '/images/romantic/marry-me-proposal-desert.jpg'
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. الرحلات والأنشطة البحرية (Sea & Marine Group) - SLIDE 4
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'vip-yacht-ras-mohammed-white-island',
    group: 'sea',
    groupBadgeAr: 'يخوت ملكية VIP لرأس محمد',
    groupBadgeEn: 'VIP Luxury Yacht & White Island',
    focus: 'center 45%',
    image: '/images/sea/ras-mohammed-luxury-yacht.webp'
  },
  {
    slug: 'introductory-scuba-diving-red-sea',
    group: 'sea',
    groupBadgeAr: 'غوص استكشافي بالأسطوانة PADI',
    groupBadgeEn: 'Red Sea Scuba Diving & Reefs',
    focus: 'center 35%',
    image: '/images/sea/scuba-diving-intro.jpg'
  },
  {
    slug: 'tiran-island-snorkeling-boat-trip',
    group: 'sea',
    groupBadgeAr: 'رحلة يخت جزيرة تيران والسنوركلينج',
    groupBadgeEn: 'Tiran Island Snorkeling Cruise',
    focus: 'center 40%',
    image: '/images/sea/snorkeling-ras-mohammed-reef.jpg'
  },

  // ═══════════════════════════════════════════════════════════════
  // الألعاب المائية وعروض الدلافين (Water Sports & Dolphin) - SLIDE 5
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'red-sea-parasailing-adventure',
    group: 'sea',
    groupBadgeAr: 'باراشوت الألعاب المائية بشرم',
    groupBadgeEn: 'Red Sea Parasailing Flight',
    focus: 'center 40%',
    image: '/images/sea/parasailing-sharm-flight.jpg'
  },
  {
    slug: 'banana-boat-tube-water-fun',
    group: 'sea',
    groupBadgeAr: 'ألعاب البانانا بوت والتيوب المائية',
    groupBadgeEn: 'Banana Boat & Water Tube Ride',
    focus: 'center 45%',
    image: '/images/sea/banana-boat-water-ride.jpg'
  },
  {
    slug: 'dolphin-swim-show-experience',
    group: 'sea',
    groupBadgeAr: 'عرض ودولفين شو والسباحة معها',
    groupBadgeEn: 'Dolphin Show & Swim Experience',
    focus: 'center 40%',
    image: '/images/sea/dolphin-show-sharm.jpg'
  },

  // ═══════════════════════════════════════════════════════════════
  // عروض اليخوت الخاصة وانتقالات المطار (VIP Charters & Transfers) - SLIDE 6
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'marry-me-proposal-yacht',
    group: 'sea',
    groupBadgeAr: 'باقة طلب الزواج VIP على اليخت',
    groupBadgeEn: 'VIP Yacht Proposal Package',
    focus: 'center 45%',
    image: '/images/romantic/marry-me-proposal-yacht.jpg'
  },
  {
    slug: 'ras-mohammed-land-bus-tour',
    group: 'sea',
    groupBadgeAr: 'جولة محمية رأس محمد البرية بالباص',
    groupBadgeEn: 'Ras Mohammed Overland Bus Tour',
    focus: 'center 45%',
    image: '/images/excursions/ras-mohammed/ras-mohammed-gate-of-allah.jpg'
  },
  {
    slug: 'vip-airport-transfers-sinai',
    group: 'transfers',
    isCustomTransfer: true,
    groupBadgeAr: 'انتقالات خاصة 24/7 داخل جنوب سيناء',
    groupBadgeEn: '24/7 South Sinai VIP Transfers',
    focus: 'center 45%',
    image: '/images/transfers/vip-transfers-sharm.jpg',
    titleAr: 'انتقالات خاصة VIP بين مطار وفنادق شرم الشيخ وجنوب سيناء',
    titleEn: 'VIP Private Airport & South Sinai Hotel Transfers 24/7',
    subtitleAr: 'توصيل مريح ومكيف بأسعار ثابتة ومحددة مسبقاً من مطار شرم الشيخ الدولي لجميع الفنادق والمنتجعات، ورحلات سياحية خاصة لدهب وسانت كاترين بأسطول ليموزين سيدان، ميني فان 6 ركاب، وتويوتا هاي إيس 15 راكب.',
    subtitleEn: 'Pre-fixed price private airport and intercity transfers across Sharm El Sheikh, Dahab, and Saint Catherine with licensed luxury sedans, 6-pax minivans, and 15-pax HiAce microbuses.',
    startingPrice: 15,
    rating: 4.95,
    href: '/transfers'
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. الرحلات إلى خارج شرم الشيخ (Excursions Outside Sharm) - SLIDE 7
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'dahab-blue-hole-canyon-trip',
    group: 'outside-sharm',
    groupBadgeAr: 'جولة دهب وبلو هول والوادي الملون',
    groupBadgeEn: 'Dahab & Blue Hole Canyon Tour',
    focus: 'center 55%',
    image: '/images/excursions/dahab/dahab-blue-hole-lagoon.jpg'
  },
  {
    slug: 'st-catherine-mount-sinai-trip',
    group: 'outside-sharm',
    groupBadgeAr: 'شروق جبل موسى ودير سانت كاترين',
    groupBadgeEn: 'Mount Sinai Sunrise & Monastery',
    focus: 'center 50%',
    image: '/images/excursions/catherine/mount-sinai-sea-of-clouds.jpg'
  },
  {
    slug: 'nuweiba-wishwashi-canyon-safari',
    group: 'outside-sharm',
    groupBadgeAr: 'مغامرة وادي الوشواشي في نويبع',
    groupBadgeEn: 'Nuweiba Wishwashi Canyon Safari',
    focus: 'center 50%',
    image: '/images/excursions/nuweiba/nuweiba-wishwashi-emerald.jpg'
  },

  // ═══════════════════════════════════════════════════════════════
  // طابا والجولات المخصصة وتأجير اليخوت (Taba & Custom VIP) - SLIDE 8
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'taba-fjord-bay-castle-tour',
    group: 'outside-sharm',
    groupBadgeAr: 'فيورد طابا وقلعة صلاح الدين',
    groupBadgeEn: 'Taba Fjord Bay & Castle',
    focus: 'center 50%',
    image: '/images/excursions/taba/taba-fjord-bay-crystal.jpg'
  },
  {
    slug: 'vip-private-yacht-charter',
    group: 'sea',
    isCustomExperience: true,
    groupBadgeAr: 'تأجير يخوت خاصة VIP',
    groupBadgeEn: 'Private VIP Yacht Charter',
    focus: 'center 45%',
    image: '/images/sea/ras-mohammed-luxury-yacht.webp',
    titleAr: 'تأجير يخت سياحي ملكي خاص VIP لرأس محمد والجزيرة البيضاء',
    titleEn: 'Private VIP Luxury Yacht Charter to Ras Mohammed & White Island',
    subtitleAr: 'يخت سياحي ملكي خاص بالكامل لك ولعائلتك لرحلات بحرية استثنائية مع طاقم محترف، ومعدات سنوركلينج وبوفيه سي فود مفتوح طوال اليوم.',
    subtitleEn: 'Exclusive private yacht charter for you and your family with professional crew, snorkeling gear, and open seafood buffet throughout the day.',
    startingPrice: 220,
    rating: 5.0,
    href: '/experiences?category=sea'
  },
  {
    slug: 'custom-vip-adventure',
    group: 'outside-sharm',
    isCustomExperience: true,
    groupBadgeAr: 'برامج سياحية VIP مخصصة',
    groupBadgeEn: 'Tailor-Made VIP Itineraries',
    focus: 'center 45%',
    image: '/images/real/polaris-buggy-family.webp',
    titleAr: 'برامج سياحية وجولات VIP مخصصة في شرم الشيخ وجنوب سيناء',
    titleEn: 'Custom Tailor-Made VIP Sinai Tours & Holiday Itineraries',
    subtitleAr: 'صمم جدول إجازتك ورحلاتك في شرم الشيخ وسيناء باختيارك الخاص مع مرشدين وخدمة كونسيرج متميزة وسيارات خاصة على مدار الساعة.',
    subtitleEn: 'Customize your private holiday itinerary across Sharm and South Sinai with dedicated concierge service and private chauffeur 24/7.',
    startingPrice: 35,
    rating: 5.0,
    href: '/experiences'
  }
];

const GROUP_SLIDE_TITLES = [
  { ar: 'سفاري الصحراء والبيتش باجي والكار باجي', en: 'Desert Quad & Dune Buggy Safaris' },
  { ar: 'السهرات والعشاء البدوي وقوافل الجمال', en: 'Bedouin Dinners & Sunset Camel Caravans' },
  { ar: 'ركوب الخيل العربي والجولات الرومانسية VIP', en: 'Arabian Horseback & Romantic VIP Tours' },
  { ar: 'رحلات اليخوت الملكية ورأس محمد والغوص', en: 'VIP Yacht Cruises, Ras Mohammed & Diving' },
  { ar: 'الألعاب المائية والباراشوت وعروض الدلافين', en: 'Water Sports, Parasailing & Dolphin Shows' },
  { ar: 'عروض اليخوت الخاصة وانتقالات المطار VIP', en: 'Private Charters & VIP Airport Transfers' },
  { ar: 'رحلات جنوب سيناء خارج شرم الشيخ', en: 'South Sinai Excursions Outside Sharm' },
  { ar: 'طابا والجولات المخصصة وتأجير اليخوت الخاصة', en: 'Taba, Custom Tours & Private Charters' }
];

export default function TripStack({ startIndex = 2, trips: customTrips }) {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();
  const isAr = i18n.language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // Resolve ordered trips with authentic high-res images and localized details
  const trips = useMemo(() => {
    if (customTrips && customTrips.length > 0) return customTrips;

    return ORDERED_TRIP_DEFINITIONS.map((item, idx) => {
      // Custom Transfer or Custom Experience Card
      if (item.isCustomTransfer || item.isCustomExperience) {
        return {
          id: `custom-exp-${item.slug}`,
          index: idx,
          slug: item.slug,
          title: isAr ? item.titleAr : item.titleEn,
          subtitle: isAr ? item.subtitleAr : item.subtitleEn,
          categoryBadge: isAr ? item.groupBadgeAr : item.groupBadgeEn,
          group: item.group,
          image: item.image,
          href: item.href,
          focus: item.focus || 'center',
          rating: item.rating || 5.0,
          startingPrice: item.startingPrice,
          isTransfer: !!item.isCustomTransfer
        };
      }

      // Catalog Experience Card
      const found = EXPERIENCES.find((e) => e.slug === item.slug) || EXPERIENCES[0];
      const localized = getLocalizedExperience(found, i18n.language);
      
      const tripImage = item.image || (found.images && found.images.length > 0 ? found.images[0] : '/images/real/user-atv-safari.webp');

      const badgeLabel = isAr
        ? (item.groupBadgeAr || localized.categoryLabel || 'رحلة مميزة')
        : (item.groupBadgeEn || localized.categoryLabel || 'Featured Tour');

      return {
        id: found.id || `trip-${item.slug}`,
        index: idx,
        slug: found.slug,
        title: localized.title,
        subtitle: localized.shortDescription,
        categoryBadge: badgeLabel,
        group: item.group,
        image: tripImage,
        href: `/experience/${found.slug}`,
        focus: item.focus || 'center',
        rating: localized.rating || 4.9,
        startingPrice: localized.startingPrice || 25,
        isTransfer: false
      };
    });
  }, [customTrips, i18n.language, isAr]);

  const total = trips.length;

  // Chunk trips into groups of 3 cards for desktop 3-card layout
  const tripGroups = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < trips.length; i += 3) {
      const slice = trips.slice(i, i + 3);
      const groupIdx = Math.floor(i / 3);
      const titleObj = GROUP_SLIDE_TITLES[groupIdx] || {
        ar: slice[0]?.categoryBadge || 'رحلات وتجارب مميزة',
        en: slice[0]?.categoryBadge || 'Featured Experiences'
      };

      chunks.push({
        groupIdx,
        title: isAr ? titleObj.ar : titleObj.en,
        trips: slice
      });
    }
    return chunks;
  }, [trips, isAr]);

  const getBadgeColor = (group) => {
    switch (group) {
      case 'safari':
        return 'text-amber-600';
      case 'sea':
        return 'text-[#0284C7]';
      case 'transfers':
        return 'text-emerald-600';
      default:
        return 'text-purple-600';
    }
  };

  return (
    <>
      {tripGroups.map((group, groupIdx) => {
        const globalIndex = startIndex + groupIdx;

        return (
          <StackSection
            key={`slide-${groupIdx}`}
            as="article"
            index={globalIndex}
            id={`trip-slide-${groupIdx}`}
            bg="bg-white"
            className="min-h-[calc(100svh-var(--header-h))] relative w-full flex items-center justify-center py-6 sm:py-8 lg:py-10"
          >
            {/* Subtle Ambient Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,132,199,0.035)_0%,transparent_70%)] pointer-events-none" />

            {/* Subtle El Hana Logo Watermark in Center of Screen */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <img
                src="/logo-transparent.webp"
                alt=""
                aria-hidden="true"
                className="w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] object-contain opacity-[0.035] grayscale brightness-90 select-none pointer-events-none"
              />
            </div>

            {/* Main 3-Card Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              {/* Slide Group Header */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-5 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] ring-4 ring-[#0284C7]/20" />
                  <h3 className="text-sm sm:text-base lg:text-lg font-black font-heading text-slate-800">
                    {group.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span dir="ltr" className="text-xs font-mono font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
                    {pad(groupIdx + 1)} / {pad(tripGroups.length)}
                  </span>
                  {groupIdx < tripGroups.length - 1 && (
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                      <span>{isAr ? 'مرر لأسفل لمزيد من الرحلات' : 'Scroll down for more'}</span>
                      <span className="text-[#0284C7] animate-bounce">↓</span>
                    </span>
                  )}
                </div>
              </div>

              {/* 3-Cards Desktop Grid / 1-Col Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch">
                {group.trips.map((trip) => {
                  const badgeColor = getBadgeColor(trip.group);

                  return (
                    <div
                      key={trip.id}
                      className="w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg shadow-slate-900/5 border border-slate-200/90 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-slate-300 group/card"
                    >
                      {/* High-Resolution Photo Bay */}
                      <div className="relative h-40 sm:h-44 md:h-38 lg:h-44 xl:h-48 w-full overflow-hidden bg-slate-100 group shrink-0">
                        <picture className="w-full h-full">
                          <source srcSet={toWebp(trip.image)} type="image/webp" />
                          <img
                            src={trip.image}
                            alt={trip.title}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              const fallback = '/images/real/user-atv-safari.webp';
                              if (e.currentTarget.src !== fallback && !e.currentTarget.src.endsWith(fallback)) {
                                e.currentTarget.src = fallback;
                              }
                            }}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                            style={{ objectPosition: trip.focus || 'center 40%' }}
                          />
                        </picture>

                        {/* Subtle bottom gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

                        {/* Top Floating Badges */}
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xs">
                            <span className={badgeColor}>{trip.categoryBadge}</span>
                          </span>
                          <span dir="ltr" className="text-xs font-mono font-bold text-slate-700 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full border border-slate-200/80 shadow-xs">
                            {pad(trip.index + 1)} / {pad(total)}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-3.5 sm:p-4 lg:p-4.5 flex flex-col justify-between flex-1 gap-2.5">
                        {/* Title & Short Description */}
                        <div className="space-y-1">
                          <h4 className="text-sm sm:text-base lg:text-lg font-black font-heading leading-snug text-slate-900 line-clamp-1 hover:text-[#0284C7] transition-colors">
                            <Link to={trip.href}>{trip.title}</Link>
                          </h4>
                          <p className="text-xs sm:text-xs lg:text-[13px] leading-relaxed text-slate-600 line-clamp-2">
                            {trip.subtitle}
                          </p>
                        </div>

                        {/* Rating and Price Row */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                          <div className="flex items-center gap-1.5 font-bold text-amber-500">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                            <span className="text-sm font-black text-slate-900">{trip.rating}</span>
                          </div>

                          <div className="text-end">
                            <span className="text-[10px] text-slate-400 block leading-none mb-0.5 font-semibold">
                              {isAr ? 'السعر يبدأ من' : 'From'}
                            </span>
                            <span className="text-base sm:text-lg lg:text-xl font-black text-[#0284C7] leading-none">
                              {formatPrice(trip.startingPrice)}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-0.5 flex items-center gap-2">
                          <Link
                            to={trip.href}
                            aria-label={`${t('trips.view', 'عرض الرحلة')}: ${trip.title}`}
                            className="inline-flex items-center justify-center gap-1.5 flex-1 py-2 sm:py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white text-xs font-extrabold shadow-sm hover:shadow-md transition-all group/btn cursor-pointer whitespace-nowrap"
                          >
                            <span>{trip.isTransfer ? (isAr ? 'حجز الانتقالات' : 'Book Transfers') : t('trips.view', 'عرض التفاصيل')}</span>
                            <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
                          </Link>

                          <Link
                            to="/experiences"
                            className="inline-flex items-center justify-center py-2 sm:py-2.5 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-xs font-bold text-slate-700 hover:text-[#0284C7] transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                          >
                            {isAr ? 'كل الرحلات' : 'All Tours'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </StackSection>
        );
      })}
    </>
  );
}
