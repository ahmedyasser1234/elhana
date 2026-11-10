import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EXPERIENCES, getLocalizedExperience } from '../data/experiences';

const pad = (n) => String(n).padStart(2, '0');

const CURATED_CONFIG = [
  { slug: 'atv-quad-bike-safari', focus: 'center 40%', href: '/experience/atv-quad-bike-safari' },
  { slug: 'vip-yacht-ras-mohammed-white-island', focus: 'center 45%', href: '/experience/vip-yacht-ras-mohammed-white-island' },
  { slug: 'dune-buggy-adventure', focus: 'center 50%', href: '/experience/dune-buggy-adventure' },
  { slug: 'introductory-scuba-diving-red-sea', focus: 'center 35%', href: '/experience/introductory-scuba-diving-red-sea' },
  { slug: 'dahab-blue-hole-canyon-trip', focus: 'center 55%', href: '/experience/dahab-blue-hole-canyon-trip' }
];

export default function TripStack({ trips: customTrips }) {
  const { t, i18n } = useTranslation();

  // If trips not passed as props, resolve the 5 curated featured trips with current locale
  const trips = React.useMemo(() => {
    if (customTrips && customTrips.length > 0) return customTrips;

    return CURATED_CONFIG.map((item) => {
      const found = EXPERIENCES.find((e) => e.slug === item.slug) || EXPERIENCES[0];
      const localized = getLocalizedExperience(found, i18n.language);
      return {
        id: found.id,
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
    <section className="relative" aria-label={t('trips.stackLabel', 'Our trips')}>
      {trips.map((trip, i) => {
        const side = i % 2 === 1 ? 'md:end-14' : 'md:start-14';
        return (
          <article
            key={trip.id}
            className="sticky top-[var(--header-h)] h-[calc(100svh-var(--header-h))] min-h-[480px] w-full overflow-hidden bg-neutral-200"
            style={{ zIndex: i + 1 }}
          >
            <img
              src={trip.image}
              alt={trip.title}
              width="1600"
              height="900"
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: trip.focus || 'center' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
            <div className={`absolute inset-x-4 bottom-6 bg-white/95 p-5 shadow-lg md:inset-x-auto md:bottom-14 md:w-[380px] md:p-8 ${side}`}>
              <p dir="ltr" className="mb-3 text-end text-xs tracking-[0.25em] text-neutral-500">
                {pad(i + 1)} / {pad(total)}
              </p>
              <h2 className="text-2xl font-semibold leading-tight text-neutral-900 md:text-4xl">{trip.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">{trip.subtitle}</p>
              <Link
                to={trip.href}
                className="mt-5 inline-flex min-h-11 items-center justify-center border border-neutral-900 px-6 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                {t('trips.view', 'عرض الرحلة')}
              </Link>
            </div>
          </article>
        );
      })}

      {/* Section transition footer with z-[100] so it slides OVER the last panel */}
      <div className="relative z-[100] bg-white py-12 px-4 text-center border-b border-neutral-200">
        <Link
          to="/experiences"
          className="inline-flex min-h-11 items-center justify-center border border-neutral-900 px-8 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
        >
          {t('trips.viewAll', 'عرض جميع الرحلات')}
        </Link>
      </div>
    </section>
  );
}
