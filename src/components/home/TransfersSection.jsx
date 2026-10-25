import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';

export const TransfersSection = () => {
  const { t } = useTranslation();

  const features = [
    { title: t('transfersSection.f1Title'), desc: t('transfersSection.f1Desc'), icon: "🛬" },
    { title: t('transfersSection.f2Title'), desc: t('transfersSection.f2Desc'), icon: "🚐" },
    { title: t('transfersSection.f3Title'), desc: t('transfersSection.f3Desc'), icon: "🏷️" },
    { title: t('transfersSection.f4Title'), desc: t('transfersSection.f4Desc'), icon: "🕒" }
  ];

  return (
    <section className="py-24 bg-gradient-to-bl from-orange-50 via-white to-sky-50/60 text-slate-800 border-b border-orange-100/70 relative overflow-hidden">
      {/* Alternating Glow: Sunset Orange Top-Right */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/12 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/90 border border-orange-200 text-[#F97316] text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>{t('transfersSection.badge')}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
            {t('transfersSection.titleMain')} <span className="text-[#F97316]">{t('transfersSection.titleGold')}</span>
          </h2>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
            {t('transfersSection.subtitle')}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-orange-100 shadow-md hover:border-[#F97316] hover:shadow-xl transition duration-300 space-y-3"
            >
              <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-xl shadow-xs">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">{feat.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link to="/transfers">
            <Button variant="primary" size="lg">
              {t('transfersSection.bookTransferBtn')}
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TransfersSection;
