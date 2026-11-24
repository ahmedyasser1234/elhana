import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TiltCard } from '../common/TiltCard';
import { TextMaskReveal } from '../common/TextMaskReveal';

export const WhyChooseUs = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const features = [
    {
      id: 'transfers',
      title: t('whyUs.f1Title'),
      desc: t('whyUs.f1Desc'),
      image: '/images/icons/why-transfers.svg',
      highlight: "from-sky-500/10 via-sky-500/5 to-transparent",
      containerBg: "bg-gradient-to-br from-sky-50 to-sky-100/70 border-sky-200/80 group-hover:border-sky-400 group-hover:from-sky-100/80 group-hover:to-sky-200/60",
      shadow: "shadow-sky-500/10 group-hover:shadow-sky-500/25",
    },
    {
      id: 'team',
      title: t('whyUs.f2Title'),
      desc: t('whyUs.f2Desc'),
      image: '/images/icons/why-team.svg',
      highlight: "from-amber-500/10 via-amber-500/5 to-transparent",
      containerBg: "bg-gradient-to-br from-amber-50 to-amber-100/70 border-amber-200/80 group-hover:border-amber-400 group-hover:from-amber-100/80 group-hover:to-amber-200/60",
      shadow: "shadow-amber-500/10 group-hover:shadow-amber-500/25",
    },
    {
      id: 'luxury',
      title: t('whyUs.f3Title'),
      desc: t('whyUs.f3Desc'),
      image: '/images/icons/why-luxury.svg',
      highlight: "from-cyan-500/10 via-blue-500/5 to-transparent",
      containerBg: "bg-gradient-to-br from-cyan-50 to-sky-100/70 border-cyan-200/80 group-hover:border-cyan-400 group-hover:from-cyan-100/80 group-hover:to-sky-200/60",
      shadow: "shadow-blue-500/10 group-hover:shadow-blue-500/25",
    },
    {
      id: 'flex',
      title: t('whyUs.f4Title'),
      desc: t('whyUs.f4Desc'),
      image: '/images/icons/why-flex.svg',
      highlight: "from-emerald-500/10 via-teal-500/5 to-transparent",
      containerBg: "bg-gradient-to-br from-emerald-50 to-emerald-100/70 border-emerald-200/80 group-hover:border-emerald-400 group-hover:from-emerald-100/80 group-hover:to-emerald-200/60",
      shadow: "shadow-emerald-500/10 group-hover:shadow-emerald-500/25",
    }
  ];

  return (
    <div className="w-full min-h-[calc(100svh-var(--header-h))] flex flex-col justify-center py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-sky-50/50 text-slate-800 relative">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <TextMaskReveal>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/90 border border-sky-200 text-[#0369A1] text-xs font-extrabold uppercase tracking-wider shadow-sm">
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
        <div className="flex flex-col space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 pb-8 md:pb-0">
          {features.map((feat, idx) => {
            return (
              <div
                key={idx}
                className="sticky md:static w-full transition-transform"
                style={{
                  top: `calc(var(--header-h) + ${16 + idx * 14}px)`,
                  zIndex: idx + 10
                }}
              >
                <TiltCard maxRotate={6} className="h-full">
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.08)] hover:border-[#0284C7]/40 hover:shadow-2xl hover:shadow-[#0284C7]/10 transition-all duration-300 space-y-6 flex flex-col justify-between group h-full relative overflow-hidden min-h-[220px]">
                    
                    {/* Top Right Decorative Glow */}
                    <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${feat.highlight} rounded-bl-full pointer-events-none transition duration-500 group-hover:scale-125`}></div>

                    <div className="space-y-4 relative z-10">
                      
                      {/* Refined Luxury Icon-Image Container */}
                      <div className={`w-16 h-16 rounded-2xl ${feat.containerBg} border p-2 flex items-center justify-center shadow-md ${feat.shadow} transition-all duration-300 group-hover:scale-110 shrink-0`}>
                        <img
                          src={feat.image}
                          alt={feat.title}
                          className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-all duration-300"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900 font-heading leading-snug group-hover:text-[#0284C7] transition-colors duration-300">
                        {feat.title}
                      </h3>
                      
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {feat.desc}
                      </p>
                    </div>

                    <div className="pt-2 text-xs font-extrabold text-[#0369A1] flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                      <span>{t('common.learnMore')}</span>
                      <ArrowIcon className="w-4 h-4 stroke-[2.5]" />
                    </div>

                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;
