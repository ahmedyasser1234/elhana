import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { useCurrency } from '../../context/CurrencyContext';

export const SeaAdventuresSection = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();

  const highlights = [
    t('seaSection.h1'),
    t('seaSection.h2'),
    t('seaSection.h3'),
    t('seaSection.h4'),
    t('seaSection.h5'),
    t('seaSection.h6'),
    t('seaSection.h7'),
    t('seaSection.h8')
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-sky-100/70 via-cyan-50/50 to-orange-50/60 text-slate-900 border-b border-sky-200/60 relative overflow-hidden">
      {/* Alternating Glow: Sky Blue Top-Left */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[550px] h-[550px] bg-[#0284C7]/15 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -35, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[4/3] group">
              <img
                src="/images/sea/ras-mohammed-luxury-yacht.jpg"
                alt="VIP Yacht Cruise & White Island Sharm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/sea/white-island-sandbar.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 flex items-center justify-between shadow-xl">
                <div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">{t('seaSection.specialBadge')}</div>
                  <div className="text-[11px] text-slate-600 font-normal mt-0.5">{t('seaSection.specialDesc')}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">{t('common.startingFrom')}</span>
                  <span className="text-xl font-black text-[#0284C7]">{formatPrice(35)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#0284C7] text-white font-bold text-xs uppercase tracking-wider shadow-sm">
              <span>{t('seaSection.badge')}</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
              {t('seaSection.titleMain')} <span className="text-[#0284C7]">{t('seaSection.titleGold')}</span>
            </h2>

            <p className="text-base md:text-lg text-slate-700 leading-relaxed font-medium">
              {t('seaSection.subtitle')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/sea-trips">
                <Button variant="primary" size="lg">
                  {t('seaSection.exploreSeaTrips')}
                </Button>
              </Link>
              <Link to="/yacht-trips">
                <Button variant="outlineDark" size="lg" className="border-2 border-[#0284C7] text-[#0284C7] bg-white hover:bg-[#0284C7] hover:text-white shadow-sm font-extrabold">
                  {t('seaSection.bookYacht')}
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SeaAdventuresSection;
