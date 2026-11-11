import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EXPERIENCES, getLocalizedExperience } from '../data/experiences';
import StackSection from './StackSection';

const pad = (n) => String(n).padStart(2, '0');
const toWebp = (url) => (url ? url.replace(/\.(jpg|jpeg|png)$/i, '.webp') : url);

const CURATED_CONFIG = [
  { slug: 'atv-quad-bike-safari', focus: 'center 40%', href: '/experience/atv-quad-bike-safari' },
  { slug: 'vip-yacht-ras-mohammed-white-island', focus: 'center 45%', href: '/experience/vip-yacht-ras-mohammed-white-island' },
  { slug: 'dune-buggy-adventure', focus: 'center 50%', href: '/experience/dune-buggy-adventure' },
  { slug: 'introductory-scuba-diving-red-sea', focus: 'center 35%', href: '/experience/introductory-scuba-diving-red-sea' },
  { slug: 'dahab-blue-hole-canyon-trip', focus: 'center 55%', href: '/experience/dahab-blue-hole-canyon-trip' }
];

export default function TripStack({ startIndex = 1, trips: customTrips }) {
  const { t, i18n } = useTranslation();

  // If trips not passed as props, resolve the 5 curated featured trips with current locale
  const trips = React.useMemo(() => {
    if (customTrips && customTrips.length > 0) return customTrips;

    return CURATED_CONFIG.map((item) => {
      const found = EXPERIENCES.find((e) => e.slug === item.slug) || EXPERIENCES[0];
      const localized = getLocalizedExperience(found, i18n.language);
      return {
        id: found.id,
        slug: found.slug,
        title: localized.title,
        subtitle: localized.shortDescription,
        image: found.images && found.images.length > 0 ? found.images[0] : '/images/real/atv-quad.jpg',
        href: item.href || `/experience/${found.slug}`,
        focus: item.focus || 'center'
      };
    });
  }, [customTrips, i18n.language]);

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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:hidden" />
            <div className={`absolute inset-x-4 bottom-6 bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-2xl rounded-2xl md:inset-x-auto md:bottom-14 md:w-[380px] md:p-8 ${side}`}>
              <p dir="ltr" className="mb-2 text-end text-xs tracking-[0.25em] text-neutral-500 font-mono">
                {pad(i + 1)} / {pad(total)}
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-neutral-900 font-heading">
                {trip.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-600 line-clamp-3 md:line-clamp-none">
                {trip.subtitle}
              </p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <Link
                  to={trip.href}
                  className="inline-flex min-h-10 sm:min-h-11 items-center justify-center border border-neutral-900 px-5 sm:px-6 text-xs sm:text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white rounded-xl"
                >
                  {t('trips.view', 'عرض الرحلة')}
                </Link>
                {i === total - 1 && (
                  <Link
                    to="/experiences"
                    className="text-xs font-bold text-[#0284C7] hover:underline"
                  >
                    {t('trips.viewAll', 'عرض جميع الرحلات')} →
                  </Link>
                )}
              </div>
            </div>
          </StackSection>
        );
      })}
    </>
  );
}
