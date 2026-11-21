import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CarFront, 
  ShieldCheck, 
  Crown, 
  CalendarCheck2, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';
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
      highlight: "from-[#0284C7]/20 via-[#38BDF8]/10 to-transparent",
      badgeText: isAr ? "مجاني" : "FREE",
      badgeColor: "bg-sky-50 text-[#0284C7] border-sky-200",
      gradient: "from-sky-400 via-[#0284C7] to-[#0369A1]",
      shadow: "shadow-sky-500/30",
      ring: "ring-sky-100 group-hover:ring-sky-200",
      glow: "bg-sky-400/40",
      renderIcon: () => (
        <div className="relative flex items-center justify-center">
          <CarFront className="w-7 h-7 text-white stroke-[2.2] drop-shadow-sm" />
          <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
        </div>
      )
    },
    {
      id: 'team',
      title: t('whyUs.f2Title'),
      desc: t('whyUs.f2Desc'),
      highlight: "from-[#F97316]/20 via-[#FDBA74]/10 to-transparent",
      badgeText: "PADI ★",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      gradient: "from-amber-400 via-[#F97316] to-[#C2410C]",
      shadow: "shadow-orange-500/30",
      ring: "ring-orange-100 group-hover:ring-orange-200",
      glow: "bg-orange-400/40",
      renderIcon: () => (
        <div className="relative flex items-center justify-center">
          <ShieldCheck className="w-7 h-7 text-white stroke-[2.2] drop-shadow-sm" />
          <Award className="w-3.5 h-3.5 text-amber-200 absolute -bottom-1 -end-1 drop-shadow-xs" />
        </div>
      )
    },
    {
      id: 'luxury',
      title: t('whyUs.f3Title'),
      desc: t('whyUs.f3Desc'),
      highlight: "from-[#0284C7]/20 via-[#67E8F9]/10 to-transparent",
      badgeText: isAr ? "5 نجوم" : "5 STARS",
      badgeColor: "bg-sky-50 text-[#0284C7] border-sky-200",
      gradient: "from-cyan-400 via-[#0284C7] to-[#1E40AF]",
      shadow: "shadow-blue-500/30",
      ring: "ring-sky-100 group-hover:ring-sky-200",
      glow: "bg-cyan-400/40",
      renderIcon: () => (
        <div className="relative flex items-center justify-center">
          <Crown className="w-7 h-7 text-white stroke-[2.2] drop-shadow-sm" />
          <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -end-1 animate-pulse" />
        </div>
      )
    },
    {
      id: 'flex',
      title: t('whyUs.f4Title'),
      desc: t('whyUs.f4Desc'),
      highlight: "from-[#F59E0B]/20 via-[#FCD34D]/10 to-transparent",
      badgeText: isAr ? "24 ساعة" : "24h Free",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      gradient: "from-amber-400 via-[#F59E0B] to-[#D97706]",
      shadow: "shadow-amber-500/30",
      ring: "ring-amber-100 group-hover:ring-amber-200",
      glow: "bg-amber-400/40",
      renderIcon: () => (
        <div className="relative flex items-center justify-center">
          <CalendarCheck2 className="w-7 h-7 text-white stroke-[2.2] drop-shadow-sm" />
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 absolute -bottom-1 -end-1 drop-shadow-xs" />
        </div>
      )
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

        {/* Feature Cards Grid (Stacking cards on mobile under header, clean grid on desktop) */}
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
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.10)] hover:border-[#0284C7]/50 hover:shadow-2xl hover:shadow-[#0284C7]/12 transition-all duration-300 space-y-6 flex flex-col justify-between group h-full relative overflow-hidden min-h-[230px]">
                    
                    {/* Top Right Decorative Glow */}
                    <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${feat.highlight} rounded-bl-full pointer-events-none transition duration-500 group-hover:scale-125`}></div>

                    <div className="space-y-4 relative z-10">
                      
                      {/* Ultra-Modern 3D Gradient Icon Badge */}
                      <div className="relative w-15 h-15 shrink-0">
                        {/* Luminous Ambient Glow */}
                        <div className={`absolute inset-0 rounded-2xl ${feat.glow} blur-md opacity-45 group-hover:opacity-90 transition-opacity duration-300`} />
                        
                        {/* Main 3D Gradient Squircle */}
                        <div className={`w-15 h-15 rounded-2xl bg-gradient-to-br ${feat.gradient} p-3.5 flex items-center justify-center shadow-lg ${feat.shadow} ring-4 ${feat.ring} transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 relative z-10`}>
                          {feat.renderIcon()}
                        </div>

                        {/* Micro Pill Badge in Top Corner */}
                        <span className={`absolute -top-1.5 -end-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md border ${feat.badgeColor} shadow-xs z-20`}>
                          {feat.badgeText}
                        </span>
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
