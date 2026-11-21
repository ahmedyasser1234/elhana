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
      highlight: "from-sky-500/10 via-sky-500/5 to-transparent",
      containerBg: "bg-sky-50/80 border-sky-100 group-hover:border-sky-300 group-hover:bg-white",
      shadow: "shadow-sky-500/5 group-hover:shadow-sky-500/20",
      renderIcon: () => (
        <svg viewBox="0 0 48 48" className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vipCarGrad" x1="10" y1="14" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="1" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="vipGlassGrad" x1="16" y1="17" x2="32" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E0F2FE" />
              <stop offset="1" stopColor="#7DD3FC" />
            </linearGradient>
          </defs>
          {/* Subtle Road Reflection Line */}
          <path d="M8 40H40" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.25" />
          <path d="M14 43H34" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.15" />
          
          {/* Sleek Modern VIP Executive Car Body */}
          <path
            d="M10 27.5L14 17C14.8 14.8 16.9 13.5 19.2 13.5H28.8C31.1 13.5 33.2 14.8 34 17L38 27.5C40.2 28.2 41.5 30.2 41.5 32.5V35C41.5 36.4 40.4 37.5 39 37.5H36.5C35.1 37.5 34 36.4 34 35V33.5H14V35C14 36.4 12.9 37.5 11.5 37.5H9C7.6 37.5 6.5 36.4 6.5 35V32.5C6.5 30.2 7.8 28.2 10 27.5Z"
            fill="url(#vipCarGrad)"
          />
          {/* Tinted Aerodynamic Windshield */}
          <path
            d="M15.5 25L17.5 17.5C17.9 16.2 19.1 15.3 20.4 15.3H27.6C28.9 15.3 30.1 16.2 30.5 17.5L32.5 25H15.5Z"
            fill="url(#vipGlassGrad)"
          />
          {/* Crystal LED Headlights */}
          <circle cx="11.5" cy="30" r="2.2" fill="#38BDF8" />
          <circle cx="36.5" cy="30" r="2.2" fill="#38BDF8" />
          <circle cx="11.5" cy="30" r="1" fill="#FFFFFF" />
          <circle cx="36.5" cy="30" r="1" fill="#FFFFFF" />
          {/* Luxury Metallic Grill */}
          <rect x="21" y="28.5" width="6" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" />
          <line x1="24" y1="28.5" x2="24" y2="31.5" stroke="#0369A1" strokeWidth="1" />
          {/* Gold VIP Star Crest */}
          <path d="M24 8.5L25.2 11L27.8 11.4L25.9 13.2L26.3 15.8L24 14.6L21.7 15.8L22.1 13.2L20.2 11.4L22.8 11L24 8.5Z" fill="#F59E0B" />
        </svg>
      )
    },
    {
      id: 'team',
      title: t('whyUs.f2Title'),
      desc: t('whyUs.f2Desc'),
      highlight: "from-amber-500/10 via-amber-500/5 to-transparent",
      containerBg: "bg-amber-50/80 border-amber-100 group-hover:border-amber-300 group-hover:bg-white",
      shadow: "shadow-amber-500/5 group-hover:shadow-amber-500/20",
      renderIcon: () => (
        <svg viewBox="0 0 48 48" className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="teamGoldGrad" x1="10" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="teamShieldInner" x1="14" y1="10" x2="34" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFBEB" />
              <stop offset="1" stopColor="#FEF3C7" />
            </linearGradient>
          </defs>
          {/* Radiant Starburst Ring */}
          <circle cx="24" cy="24" r="21" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          
          {/* Master Certified Shield */}
          <path
            d="M24 7L38 12.5V23.5C38 32 32 39.5 24 42C16 39.5 10 32 10 23.5V12.5L24 7Z"
            fill="url(#teamGoldGrad)"
          />
          {/* Inner Luxury Inset */}
          <path
            d="M24 10.5L35 15V23.5C35 30.2 30.3 36.3 24 38.5C17.7 36.3 13 30.2 13 23.5V15L24 10.5Z"
            fill="url(#teamShieldInner)"
          />
          {/* Golden Award Star */}
          <path
            d="M24 16L26.3 20.8L31.5 21.5L27.8 25.1L28.6 30.3L24 27.8L19.4 30.3L20.2 25.1L16.5 21.5L21.7 20.8L24 16Z"
            fill="#D97706"
          />
          <circle cx="24" cy="33.5" r="2" fill="#F59E0B" />
        </svg>
      )
    },
    {
      id: 'luxury',
      title: t('whyUs.f3Title'),
      desc: t('whyUs.f3Desc'),
      highlight: "from-cyan-500/10 via-blue-500/5 to-transparent",
      containerBg: "bg-sky-50/80 border-sky-100 group-hover:border-sky-300 group-hover:bg-white",
      shadow: "shadow-blue-500/5 group-hover:shadow-blue-500/20",
      renderIcon: () => (
        <svg viewBox="0 0 48 48" className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="luxuryCrownGrad" x1="10" y1="12" x2="38" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="0.6" stopColor="#0369A1" />
              <stop offset="1" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="gemGold" x1="8" y1="8" x2="40" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Sparkle Stars */}
          <path d="M10 11L11 8.5L13.5 7.5L11 6.5L10 4L9 6.5L6.5 7.5L9 8.5L10 11Z" fill="#F59E0B" />
          <path d="M38 12L39 10L41 9L39 8L38 6L37 8L35 9L37 10L38 12Z" fill="#38BDF8" />

          {/* Regal Crown Body */}
          <path
            d="M11 31L8 16L16 22L24 13L32 22L40 16L37 31H11Z"
            fill="url(#luxuryCrownGrad)"
          />
          {/* Base Band with Royal Inlay */}
          <rect x="10" y="30" width="28" height="4" rx="2" fill="#0284C7" />
          <rect x="14" y="31.2" width="20" height="1.6" rx="0.8" fill="#FFFFFF" fillOpacity="0.8" />
          
          {/* Sparkling Crown Jewels */}
          <circle cx="8" cy="16" r="2.2" fill="url(#gemGold)" />
          <circle cx="16" cy="22" r="1.8" fill="#FFFFFF" />
          <circle cx="24" cy="13" r="2.8" fill="url(#gemGold)" />
          <circle cx="32" cy="22" r="1.8" fill="#FFFFFF" />
          <circle cx="40" cy="16" r="2.2" fill="url(#gemGold)" />
          
          {/* Ocean Wave / Yacht Crest Base */}
          <path
            d="M9 39C12 37.5 15 37.5 18 39C21 40.5 24 40.5 27 39C30 37.5 33 37.5 36 39C37.5 39.8 39 39.8 40.5 39"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
        </svg>
      )
    },
    {
      id: 'flex',
      title: t('whyUs.f4Title'),
      desc: t('whyUs.f4Desc'),
      highlight: "from-emerald-500/10 via-teal-500/5 to-transparent",
      containerBg: "bg-emerald-50/80 border-emerald-100 group-hover:border-emerald-300 group-hover:bg-white",
      shadow: "shadow-emerald-500/5 group-hover:shadow-emerald-500/20",
      renderIcon: () => (
        <svg viewBox="0 0 48 48" className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="flexCalGrad" x1="10" y1="10" x2="38" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="flexHeader" x1="9" y1="12" x2="39" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
          {/* Calendar Body */}
          <rect x="9" y="12" width="30" height="28" rx="5" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="2" />
          {/* Top Header Bar */}
          <path d="M9 17C9 14.2 11.2 12 14 12H34C36.8 12 39 14.2 39 17V20H9V17Z" fill="url(#flexHeader)" />
          
          {/* Metallic Binder Rings */}
          <rect x="15" y="8.5" width="3" height="6.5" rx="1.5" fill="#047857" />
          <rect x="30" y="8.5" width="3" height="6.5" rx="1.5" fill="#047857" />
          
          {/* Big Verified Emerald Check Badge in Center */}
          <circle cx="24" cy="29.5" r="7.5" fill="url(#flexCalGrad)" />
          <path d="M21 29.5L23.2 31.7L27.5 27" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Circular Guarantee Arc */}
          <path d="M33 27C34.5 29 34.5 32 33 34" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        </svg>
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
                      
                      {/* Refined Luxury Icon Squircle */}
                      <div className={`w-14 h-14 rounded-2xl ${feat.containerBg} border flex items-center justify-center shadow-xs ${feat.shadow} transition-all duration-300 group-hover:scale-105 shrink-0`}>
                        {feat.renderIcon()}
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
