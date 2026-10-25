import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../common/SectionTitle';

export const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    { num: "01", title: t('howItWorks.s1Title'), desc: t('howItWorks.s1Desc'), icon: "🔍" },
    { num: "02", title: t('howItWorks.s2Title'), desc: t('howItWorks.s2Desc'), icon: "💬" },
    { num: "03", title: t('howItWorks.s3Title'), desc: t('howItWorks.s3Desc'), icon: "🏜️" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 text-slate-800 border-b border-sky-100/70 relative overflow-hidden">
      {/* Alternating Glow: Sky Blue Top-Left */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/12 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        <SectionTitle
          badge={t('howItWorks.badge')}
          title={t('howItWorks.title')}
          subtitle={t('howItWorks.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-sky-100 shadow-md hover:border-[#0284C7] hover:shadow-xl transition duration-300 space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-xs font-bold text-[#0284C7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-[#0284C7] transition">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
