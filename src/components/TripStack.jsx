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
        // Desktop floating card alternates left & right for engaging motion
        const side = i % 2 === 1 ? 'md:end-14' : 'md:start-14';
        const globalIndex = startIndex + i;

        // Group accent badge styling
        const isSafari = trip.group === 'safari';
        const isSea = trip.group === 'sea';
        const isTransfer = trip.group === 'transfers';
        const isOutsideSharm = trip.group === 'outside-sharm';

        const badgeStyle = isSafari
          ? 'bg-amber-50 text-amber-700 border-amber-200'
          : isSea
          ? 'bg-sky-50 text-[#0284C7] border-sky-200'
          : isTransfer
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-purple-50 text-purple-700 border-purple-200';

        const GroupIcon = isSafari ? Flame : isSea ? Waves : isTransfer ? Car : MapPin;

        return (
          <StackSection
            key={trip.id}
            as="article"
            index={globalIndex}
            id={`trip-${trip.slug}`}
            bg="bg-neutral-900"
            className="h-[calc(100svh-var(--header-h))] relative"
          >
            {/* Full-Bleed High-Res Photographic Background */}
            <picture className="absolute inset-0 h-full w-full">
              <source srcSet={toWebp(trip.image)} type="image/webp" />
              <img
                src={trip.image}
                alt={trip.title}
                width="1600"
                height="900"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const fallback = '/images/real/user-atv-safari.webp';
                  if (e.currentTarget.src !== fallback && !e.currentTarget.src.endsWith(fallback)) {
                    e.currentTarget.src = fallback;
                  }
                }}
                className="h-full w-full object-cover"
                style={{ objectPosition: trip.focus || 'center' }}
              />
            </picture>

            {/* Dark Ambient Gradient for High Contrast */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent md:bg-black/20" />

            {/* Floating Glassmorphic Trip Details Card */}
            <div
              className={`absolute inset-x-4 bottom-6 bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-2xl rounded-3xl md:inset-x-auto md:bottom-14 md:w-[430px] md:p-7 border border-white/60 space-y-3.5 transition-all duration-300 ${side}`}
            >
              {/* Category & Counter */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 shadow-xs ${badgeStyle}`}>
                  <GroupIcon className="w-3.5 h-3.5" />
                  <span>{trip.categoryBadge}</span>
                </span>
                <p dir="ltr" className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {pad(i + 1)} / {pad(total)}
                </p>
              </div>

              {/* Title & Short Description */}
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-black font-heading leading-tight text-slate-900 line-clamp-2">
                  {trip.title}
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {trip.subtitle}
                </p>
              </div>

              {/* Meta Row: Rating, Duration & Price */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{trip.rating}</span>
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
          </StackSection>
        );
      })}
    </>
  );
}
