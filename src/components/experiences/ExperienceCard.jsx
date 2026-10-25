import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';
import { Button } from '../common/Button';
import { useTranslation } from 'react-i18next';
import { getLocalizedExperience } from '../../data/experiences';
import { useCurrency } from '../../context/CurrencyContext';

// Safari categories go to their dedicated pages (with sub-tabs & booking widget)
const CATEGORY_PAGE_MAP = {
  atv: '/atv-tours',
  buggy: '/buggy-tours',
  bedouin: '/bedouin-experience',
  camel: '/camel-riding',
  horse: '/horse-riding',
  yacht: '/yacht-trips',
  dolphin: '/dolphin-experience',
  snorkeling: '/snorkeling',
  diving: '/diving',
  parasailing: '/parasailing',
  banana: '/banana-boat',
};

export const ExperienceCard = ({ experience }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { formatPrice } = useCurrency();

  if (!experience) return null;

  const locExp = getLocalizedExperience(experience, i18n.language);

  const {
    slug,
    title,
    category,
    categoryLabel,
    shortDescription,
    images,
    duration,
    rating,
    reviewsCount,
    startingPrice
  } = locExp;

  const mainImage = images && images.length > 0 ? images[0] : '/images/real/atv-quad-hero.png';

  const badgeBg = 'bg-[#0284C7] text-white shadow-md';

  // Smart Links: direct to dedicated tabs or sub-options
  let cardLink = CATEGORY_PAGE_MAP[category] || `/experience/${slug}`;
  if (slug === 'marry-me-proposal-yacht' || slug === 'marry-me-proposal-desert-sea') {
    cardLink = '/yacht-trips?tab=yacht&option=marry_me';
  } else if (slug === 'romantic-bedouin-candlelight-dinner') {
    cardLink = '/bedouin-experience?tab=bedouin&option=romantic';
  } else if (slug === 'marry-me-proposal-desert') {
    cardLink = '/bedouin-experience?tab=bedouin&option=proposal';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        y: { type: 'spring', stiffness: 300, damping: 22 }
      }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#0284C7]/15 transition-all duration-500 border border-[#E2E8F0] flex flex-col group relative"
    >
      {/* Ambient Hover Spotlight Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#0284C7]/0 via-[#0284C7]/5 to-[#F97316]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F1F5F9]">
        <img
          src={mainImage}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            if (['yacht', 'snorkeling', 'diving', 'parasailing', 'banana', 'sea', 'romantic', 'dolphin'].includes(category)) {
              e.target.src = '/images/sea/ras-mohammed-luxury-yacht.jpg';
            } else if (['dahab', 'excursions', 'catherine', 'taba', 'nuweiba'].includes(category)) {
              e.target.src = '/images/excursions/dahab/dahab-blue-hole-lagoon.jpg';
            } else {
              e.target.src = '/images/real/atv-quad.jpg';
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/75 via-transparent to-black/10 group-hover:from-[#0F172A]/85 transition-colors duration-500" />

        {/* Category badge */}
        <div className={`absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md ${badgeBg}`}>
          {categoryLabel}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 relative z-10">
        <div className="space-y-2.5">
          {/* Rating and Duration in Same Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <span className="text-[#0F172A] font-black text-xs">{rating}</span>
              <span className="text-slate-400 font-semibold text-[11px]">
                ({reviewsCount} {isAr ? 'تقييم' : 'reviews'})
              </span>
            </div>

            <div className="inline-flex items-center gap-1 text-slate-500 font-bold text-[11px] bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200/60 shrink-0">
              <Clock className="w-3 h-3 text-[#0284C7]" />
              <span>{duration}</span>
            </div>
          </div>

          <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-[#0284C7] transition duration-300 font-heading line-clamp-1">
            <Link to={cardLink}>{title}</Link>
          </h3>
          <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed font-normal">
            {shortDescription}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider block">
              {t('common.startingFrom')}
            </span>
            <span className="text-xl font-black text-[#0F172A]">{formatPrice(startingPrice)}</span>
          </div>

          <Link to={cardLink}>
            <Button variant="primary" size="sm">
              {t('common.bookNow')}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
