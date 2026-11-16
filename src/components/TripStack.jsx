import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Star,
  Clock,
  ArrowLeft,
  ArrowRight,
  Compass
} from 'lucide-react';
import { EXPERIENCES, getLocalizedExperience } from '../data/experiences';
import { useCurrency } from '../context/CurrencyContext';
import StackSection from './StackSection';

const pad = (n) => String(n).padStart(2, '0');
const toWebp = (url) => (url ? url.replace(/\.(jpg|jpeg|png)$/i, '.webp') : url);

// Complete ordered list of ALL tours and adventures offered by El Hana Group
const ALL_OFFERED_SLUGS = [
  { slug: 'atv-quad-bike-safari', focus: 'center 45%', image: '/images/real/user-atv-safari.webp' },
  { slug: 'vip-yacht-ras-mohammed-white-island', focus: 'center 45%', image: '/images/sea/ras-mohammed-luxury-yacht.webp' },
  { slug: 'dune-buggy-adventure', focus: 'center 50%', image: '/images/real/polaris-buggy-white.webp' },
  { slug: 'authentic-bedouin-experience-dinner', focus: 'center 45%', image: '/images/real/camel-caravan.jpg' },
  { slug: 'introductory-scuba-diving-red-sea', focus: 'center 35%', image: '/images/sea/scuba-diving-intro.jpg' },
  { slug: 'dahab-blue-hole-canyon-trip', focus: 'center 55%', image: '/images/excursions/dahab/dahab-blue-hole-lagoon.jpg' },
  { slug: 'st-catherine-mount-sinai-trip', focus: 'center 50%', image: '/images/excursions/catherine/mount-sinai-sea-of-clouds.jpg' },
  { slug: 'tiran-island-snorkeling-boat-trip', focus: 'center 40%', image: '/images/sea/snorkeling-ras-mohammed-reef.jpg' },
  { slug: 'camel-riding', focus: 'center 45%', image: '/images/real/camel-riding-hero.jpg' },
  { slug: 'horse-riding', focus: 'center 45%', image: '/images/real/horse-riding-hero.jpg' },
  { slug: 'red-sea-parasailing-adventure', focus: 'center 40%', image: '/images/sea/parasailing-sharm-flight.jpg' },
  { slug: 'banana-boat-tube-water-fun', focus: 'center 45%', image: '/images/sea/banana-boat-water-ride.jpg' },
  { slug: 'dolphin-swim-show-experience', focus: 'center 40%', image: '/images/sea/dolphin-show-sharm.jpg' },
  { slug: 'nuweiba-wishwashi-canyon-safari', focus: 'center 50%', image: '/images/excursions/nuweiba/nuweiba-wishwashi-emerald.jpg' },
  { slug: 'taba-fjord-bay-castle-tour', focus: 'center 50%', image: '/images/excursions/taba/taba-fjord-bay-crystal.jpg' },
  { slug: 'luxury-polaris-canam-buggy-safari', focus: 'center 50%', image: '/images/real/family-buggy-ride.jpg' },
  { slug: 'super-desert-combo-safari', focus: 'center 45%', image: '/images/real/polaris-buggy-family.webp' },
  { slug: 'ras-mohammed-land-bus-tour', focus: 'center 45%', image: '/images/real/IMG-20260722-WA0087.jpg' },
  { slug: 'romantic-bedouin-candlelight-dinner', focus: 'center 45%', image: '/images/romantic/romantic-bedouin-candlelight-dinner.jpg' },
  { slug: 'marry-me-proposal-yacht', focus: 'center 45%', image: '/images/romantic/marry-me-proposal-yacht.jpg' },
  { slug: 'marry-me-proposal-desert', focus: 'center 45%', image: '/images/romantic/marry-me-proposal-desert.jpg' }
];

export default function TripStack({ startIndex = 1, trips: customTrips }) {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();
  const isAr = i18n.language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // Resolve all offered trips with active locale and authentic photography
  const trips = useMemo(() => {
    if (customTrips && customTrips.length > 0) return customTrips;

    return ALL_OFFERED_SLUGS.map((item) => {
      const found = EXPERIENCES.find((e) => e.slug === item.slug) || EXPERIENCES[0];
      const localized = getLocalizedExperience(found, i18n.language);
      
      const tripImage = item.image || (found.images && found.images.length > 0 ? found.images[0] : '/images/real/user-atv-safari.webp');

      return {
        id: found.id,
        slug: found.slug,
        title: localized.title,
        subtitle: localized.shortDescription,
        categoryBadge: localized.categoryLabel || (isAr ? 'رحلة مميزة' : 'Featured Tour'),
        image: tripImage,
        href: `/experience/${found.slug}`,
        focus: item.focus || 'center',
        rating: localized.rating || 4.9,
        reviewsCount: localized.reviewsCount || 150,
        duration: localized.duration || '3 Hours',
        startingPrice: localized.startingPrice || 25
      };
    });
  }, [customTrips, i18n.language, isAr]);

  const total = trips.length;

  return (
    <>
      {trips.map((trip, i) => {
        const side = i % 2 === 1 ? 'md:end-14' : 'md:start-14';
        const globalIndex = startIndex + i;

        return (
          <StackSection
            key={trip.id}
            as="article"
            index={globalIndex}
            id={`trip-${trip.slug}`}
            bg="bg-neutral-900"
            className="h-[calc(100svh-var(--header-h))] relative"
          >
            {/* Full-Bleed Background Image */}
            <picture className="absolute inset-0 h-full w-full">
              <source srcSet={toWebp(trip.image)} type="image/webp" />
              <img
                src={trip.image}
                alt={trip.title}
                width="1600"
                height="900"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ objectPosition: trip.focus || 'center' }}
              />
            </picture>

            {/* Ambient Dark Gradient for Mobile Readability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent md:bg-black/20" />

            {/* Floating Glassmorphic Trip Details Card (The classic alternating stack card) */}
            <div
              className={`absolute inset-x-4 bottom-6 bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-2xl rounded-3xl md:inset-x-auto md:bottom-14 md:w-[420px] md:p-7 border border-white/60 space-y-3.5 transition-all duration-300 ${side}`}
            >
              {/* Category & Slide Counter */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-50 text-[#0284C7] border border-sky-200">
                  {trip.categoryBadge}
                </span>
                <p dir="ltr" className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {pad(i + 1)} / {pad(total)}
                </p>
              </div>

              {/* Title & Short Description */}
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl md:text-2xl font-black font-heading leading-tight text-slate-900 line-clamp-2">
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
                  className="inline-flex items-center justify-center gap-2 flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0284C7]/20 hover:shadow-lg transition-all group/btn"
                >
                  <span>{t('trips.view', 'عرض تفاصيل الرحلة')}</span>
                  <ArrowIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
                </Link>

                <Link
                  to="/experiences"
                  className="text-xs font-bold text-slate-600 hover:text-[#0284C7] px-2 py-2 transition-colors whitespace-nowrap"
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
