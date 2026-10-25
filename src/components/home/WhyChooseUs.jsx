import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Bus, ShieldCheck, Crown, CalendarCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import { TiltCard } from '../common/TiltCard';
import { TextMaskReveal } from '../common/TextMaskReveal';

export const WhyChooseUs = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const features = [
    {
      icon: Bus,
      title: t('whyUs.f1Title'),
      desc: t('whyUs.f1Desc'),
      highlight: "from-[#0284C7]/15 to-transparent",
      iconBg: "bg-sky-50 border-sky-200 text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white shadow-sky-500/10"
    },
    {
      icon: ShieldCheck,
      title: t('whyUs.f2Title'),
      desc: t('whyUs.f2Desc'),
      highlight: "from-[#F97316]/15 to-transparent",
      iconBg: "bg-orange-50 border-orange-200 text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white shadow-orange-500/10"
    },
    {
      icon: Crown,
      title: t('whyUs.f3Title'),
      desc: t('whyUs.f3Desc'),
      highlight: "from-[#0284C7]/15 to-transparent",
      iconBg: "bg-sky-50 border-sky-200 text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white shadow-sky-500/10"
    },
    {
      icon: CalendarCheck,
      title: t('whyUs.f4Title'),
      desc: t('whyUs.f4Desc'),
      highlight: "from-[#F97316]/15 to-transparent",
      iconBg: "bg-orange-50 border-orange-200 text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white shadow-orange-500/10"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-sky-50/50 text-slate-800 border-b border-sky-100/70 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <TextMaskReveal>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/90 border border-sky-200 text-[#0284C7] text-xs font-extrabold uppercase tracking-wider shadow-sm">
              <span>{t('whyUs.badge')}</span>
            </div>
          </TextMaskReveal>

          <TextMaskReveal delay={0.15}>
            <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight text-slate-900 leading-tight">
              {t('whyUs.titleMain')} <span className="text-[#0284C7]">{t('whyUs.titleGold')}</span>
            </h2>
          </TextMaskReveal>

          <TextMaskReveal delay={0.3}>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              {t('whyUs.subtitle')}
            </p>
          </TextMaskReveal>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard maxRotate={6} className="h-full">
                  <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-7 border border-slate-200/80 shadow-lg shadow-slate-100/80 hover:border-[#0284C7]/50 hover:shadow-2xl hover:shadow-[#0284C7]/10 transition-all duration-300 space-y-6 flex flex-col justify-between group h-full relative overflow-hidden">
                    
                    {/* Top Right Decorative Glow */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feat.highlight} rounded-bl-full pointer-events-none transition duration-500 group-hover:scale-125`}></div>

                    <div className="space-y-4 relative z-10">
                      {/* Modern Crisp Lucide Icon Badge */}
                      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 ${feat.iconBg}`}>
                        <Icon className="w-7 h-7 stroke-[2]" />
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900 font-heading leading-snug group-hover:text-[#0284C7] transition-colors duration-300">
                        {feat.title}
                      </h3>
                      
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {feat.desc}
                      </p>
                    </div>

                    <div className="pt-2 text-xs font-extrabold text-[#0284C7] flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                      <span>{t('common.learnMore')}</span>
                      <ArrowIcon className="w-4 h-4 stroke-[2.5]" />
                    </div>

                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
