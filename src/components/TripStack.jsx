import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Star,
  Clock,
  ArrowLeft,
  ArrowRight,
  Compass,
  Ship,
  Car,
  MapPin,
  Flame,
  Waves
} from 'lucide-react';
import { EXPERIENCES, getLocalizedExperience } from '../data/experiences';
import { useCurrency } from '../context/CurrencyContext';
import StackSection from './StackSection';

const pad = (n) => String(n).padStart(2, '0');
const toWebp = (url) => (url ? url.replace(/\.(jpg|jpeg|png)$/i, '.webp') : url);

// Strictly ordered: 1. Safari First -> 2. Sea & Marine -> 3. Transfers -> 4. Outside Sharm
const ORDERED_TRIP_DEFINITIONS = [
  // ═══════════════════════════════════════════════════════════════
  // 1. رحلات السفاري والصحراء أولاً (Desert Safari Group)
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'atv-quad-bike-safari',
    group: 'safari',
    groupBadgeAr: 'سفاري الصحراء والبيتش باجي',
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
  // 2. الرحلات والأنشطة البحرية (Sea & Marine Group)
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
    groupBadgeAr: 'رحلة يخت وسنوركلينج جزيرة تيران',
    groupBadgeEn: 'Tiran Island Snorkeling Cruise',
    focus: 'center 40%',
    image: '/images/sea/snorkeling-ras-mohammed-reef.jpg'
  },
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

  // ═══════════════════════════════════════════════════════════════
  // 3. الانتقالات الخاصة بالمطار وجنوب سيناء (Transfers Group)
  // ═══════════════════════════════════════════════════════════════
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
    reviewsCount: 420,
    durationAr: 'خدمة 24/7 مع تتبع الرحلات',
    durationEn: '24/7 Door-to-Door Service',
    href: '/transfers'
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. الرحلات إلى خارج شرم الشيخ (Excursions Outside Sharm)
  // ═══════════════════════════════════════════════════════════════
  {
    slug: 'dahab-blue-hole-canyon-trip',
    group: 'outside-sharm',
    groupBadgeAr: 'رحلات خارج شرم • جولة دهب وبلو هول',
    groupBadgeEn: 'Outside Sharm • Dahab & Blue Hole',
    focus: 'center 55%',
    image: '/images/excursions/dahab/dahab-blue-hole-lagoon.jpg'
  },
  {
    slug: 'st-catherine-mount-sinai-trip',
    group: 'outside-sharm',
    groupBadgeAr: 'رحلات خارج شرم • جبل موسى وسانت كاترين',
    groupBadgeEn: 'Outside Sharm • Mount Sinai & Monastery',
    focus: 'center 50%',
    image: '/images/excursions/catherine/mount-sinai-sea-of-clouds.jpg'
  },
  {
    slug: 'nuweiba-wishwashi-canyon-safari',
    group: 'outside-sharm',
    groupBadgeAr: 'رحلات خارج شرم • وادي الوشواشي نويبع',
    groupBadgeEn: 'Outside Sharm • Nuweiba Wishwashi Canyon',
    focus: 'center 50%',
    image: '/images/excursions/nuweiba/nuweiba-wishwashi-emerald.jpg'
  },
  {
    slug: 'taba-fjord-bay-castle-tour',
    group: 'outside-sharm',
    groupBadgeAr: 'رحلات خارج شرم • فيورد طابا وقلعة صلاح الدين',
    groupBadgeEn: 'Outside Sharm • Taba Fjord Bay & Castle',
    focus: 'center 50%',
    image: '/images/excursions/taba/taba-fjord-bay-crystal.jpg'
  }
];

export default function TripStack({ startIndex = 1, trips: customTrips }) {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();
  const isAr = i18n.language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // Resolve ordered trips with authentic high-res images and localized details
  const trips = useMemo(() => {
    if (customTrips && customTrips.length > 0) return customTrips;

    return ORDERED_TRIP_DEFINITIONS.map((item) => {
      // Custom Transfer Card
      if (item.isCustomTransfer) {
        return {
          id: 'exp-transfers-sinai',
          slug: item.slug,
          title: isAr ? item.titleAr : item.titleEn,
          subtitle: isAr ? item.subtitleAr : item.subtitleEn,
          categoryBadge: isAr ? item.groupBadgeAr : item.groupBadgeEn,
          group: item.group,
          image: item.image,
          href: item.href,
          focus: item.focus || 'center',
          rating: item.rating,
          duration: isAr ? item.durationAr : item.durationEn,
          startingPrice: item.startingPrice
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
        id: found.id,
        slug: found.slug,
        title: localized.title,
        subtitle: localized.shortDescription,
        categoryBadge: badgeLabel,
        group: item.group,
        image: tripImage,
        href: `/experience/${found.slug}`,
        focus: item.focus || 'center',
        rating: localized.rating || 4.9,
        duration: localized.duration || (isAr ? '3 ساعات' : '3 Hours'),
        startingPrice: localized.startingPrice || 25
      };
    });
  }, [customTrips, i18n.language, isAr]);

  const total = trips.length;

  return (
    <>
      {trips.map((trip, i) => {
        // Desktop 2-Cards-Per-Section System:
        // Even item (1st in pair): full-width base with photo & card on start (right) half.
        // Odd item (2nd in pair): slides up on desktop on end (left) half beside the 1st!
        const isSecondInPair = i % 2 === 1;
        const isFirstInPair = !isSecondInPair;
        const nextTrip = trips[i + 1];
        const globalIndex = startIndex + i;

        // Group accent badge styling
        const isSafari = trip.group === 'safari';
        const isSea = trip.group === 'sea';
        const isTransfer = trip.group === 'transfers';
        const isOutsideSharm = trip.group === 'outside-sharm';

        const badgeColor = isSafari
          ? 'text-amber-600'
          : isSea
          ? 'text-[#0284C7]'
          : isTransfer
          ? 'text-emerald-600'
          : 'text-purple-600';

        const GroupIcon = isSafari ? Flame : isSea ? Waves : isTransfer ? Car : MapPin;

        const sectionClasses = isSecondInPair
          ? 'h-[calc(100svh-var(--header-h))] relative md:w-1/2 md:ms-[50%] md:border-s md:border-white/10 md:shadow-[-12px_0_30px_-14px_rgba(0,0,0,0.35)]'
          : 'h-[calc(100svh-var(--header-h))] relative w-full';

        return (
          <StackSection
            key={trip.id}
            as="article"
            index={globalIndex}
            id={`trip-${trip.slug}`}
            bg="bg-neutral-900"
            className={sectionClasses}
          >
            {/* Sleek Branded Luxury Background with Logo Watermark */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060D1A] via-[#0A1628] to-[#060D1A] pointer-events-none overflow-hidden">
              {/* Ambient Radial Lighting Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,132,199,0.14)_0%,transparent_70%)]" />

              {/* Subtle El Hana Logo Watermark in Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/logo-transparent.webp"
                  alt=""
                  aria-hidden="true"
                  className="w-80 h-80 sm:w-[480px] sm:h-[480px] object-contain opacity-[0.07] brightness-125 select-none pointer-events-none filter drop-shadow-[0_0_80px_rgba(2,132,199,0.3)]"
                />
              </div>
            </div>

            {/* Dark Ambient Gradient for High Contrast */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Active Column Container: on Desktop 1st card occupies start (right) half, 2nd card occupies full half */}
            <div className={`relative h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10 ${isFirstInPair ? 'md:w-1/2 md:start-0' : ''}`}>
              {/* Unified Luxury Experience Card */}
              <div className="w-full max-w-[440px] lg:max-w-[480px] bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/40 flex flex-col transition-all duration-300 hover:shadow-cyan-500/15">
                {/* High-Resolution Photo Bay */}
                <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-slate-900 group">
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
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: trip.focus || 'center 40%' }}
                    />
                  </picture>

                  {/* Gradient on image bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Badges: Category & Counter */}
                  <div className="absolute top-3.5 inset-x-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5 shadow-md">
                      <GroupIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>{trip.categoryBadge}</span>
                    </span>
                    <span dir="ltr" className="text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 shadow-md">
                      {pad(i + 1)} / {pad(total)}
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-3.5">
                  {/* Title & Short Description */}
                  <div className="space-y-1.5">
                    <h2 className="text-xl sm:text-2xl font-black font-heading leading-tight text-slate-900 line-clamp-1 hover:text-[#0284C7] transition-colors">
                      <Link to={trip.href}>{trip.title}</Link>
                    </h2>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2">
                      {trip.subtitle}
                    </p>
                  </div>

                  {/* Meta Row: Rating, Duration & Price */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                        <span className="text-sm font-black">{trip.rating}</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{trip.duration}</span>
                      </span>
                    </div>

                    <div className="text-end">
                      <span className="text-[10px] text-slate-400 block leading-none mb-0.5">
                        {isAr ? 'السعر يبدأ من' : 'From'}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-[#0284C7] leading-none">
                        {formatPrice(trip.startingPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-1 flex items-center justify-between gap-3">
                    <Link
                      to={trip.href}
                      aria-label={`${t('trips.view', 'عرض الرحلة')}: ${trip.title}`}
                      className="inline-flex items-center justify-center gap-2 flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0284C7]/20 hover:shadow-lg transition-all group/btn cursor-pointer"
                    >
                      <span>{isTransfer ? (isAr ? 'حجز وتفاصيل الانتقالات' : 'Book Transfers') : t('trips.view', 'عرض تفاصيل الرحلة')}</span>
                      <ArrowIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
                    </Link>

                    <Link
                      to="/experiences"
                      className="text-xs font-bold text-slate-600 hover:text-[#0284C7] px-2 py-2 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {isAr ? 'جميع الرحلات ←' : 'All Tours →'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Teaser on 2nd Half: Informs user that the next trip will slide in beside this one */}
            {isFirstInPair && nextTrip && (
              <div className="hidden md:flex absolute end-0 top-0 bottom-0 w-1/2 items-center justify-center p-8 pointer-events-none z-10">
                <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-white shadow-2xl max-w-[360px] text-center pointer-events-auto">
                  <span className="text-xs uppercase tracking-wider text-[#00f5ff] font-bold">
                    {isAr ? 'الرحلة التالية' : 'Next Adventure'}
                  </span>
                  <span className="text-base font-black text-white line-clamp-2">
                    {nextTrip.title}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 mt-1">
                    <span>{isAr ? 'مرّر لأسفل لعرض الرحلة' : 'Scroll down to reveal'}</span>
                    <span className="animate-bounce text-[#00f5ff]">↓</span>
                  </span>
                </div>
              </div>
            )}
          </StackSection>
        );
      })}
    </>
  );
}
