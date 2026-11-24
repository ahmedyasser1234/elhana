import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { useCurrency } from '../../context/CurrencyContext';

export const DesertAdventuresSection = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();

  const highlights = [
    t('desertSection.h1'),
    t('desertSection.h2'),
    t('desertSection.h3'),
    t('desertSection.h4'),
    t('desertSection.h5'),
    t('desertSection.h6'),
    t('desertSection.h7'),
    t('desertSection.h8')
  ];

  return (
    <div className="w-full min-h-[calc(100svh-var(--header-h))] flex flex-col justify-center py-12 md:py-16 bg-gradient-to-bl from-orange-100/70 via-amber-50/50 to-sky-50/60 text-slate-900 relative">
      {/* Alternating Glow: Sunset Orange Top-Right */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[550px] h-[550px] bg-[#F97316]/15 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm">
              <span>{t('desertSection.badge')}</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
              {t('desertSection.titleMain')} <span className="text-[#F97316]">{t('desertSection.titleGold')}</span>
            </h2>

            <p className="text-base md:text-lg text-slate-700 leading-relaxed font-medium">
              {t('desertSection.subtitle')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/safari">
                <Button variant="primary" size="lg">
                  {t('desertSection.exploreSafaris')}
                </Button>
              </Link>
              <Link to="/atv-tours">
                <Button variant="outlineDark" size="lg" className="border-2 border-[#0284C7] text-[#0284C7] bg-white hover:bg-[#0284C7] hover:text-white shadow-sm font-extrabold">
                  {t('desertSection.bookATV')}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[4/3] group">
              <img
                src="/images/real/user-atv-safari.webp"
                alt="Sinai Desert Safari ATV Quad Bikes"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/real/atv-real-showcase-1.webp';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default DesertAdventuresSection;
