import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, ShieldCheck, Flame, Award, Anchor, Compass, CheckCircle2 } from 'lucide-react';

export const MarqueeTicker = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  // Customer Attracting Features & Offers (Clean Luxury Styling)
  const mainItems = isAr
    ? [
        { text: "خصم 20% لفترة محدودة عند الحجز أونلاين", icon: Flame, badgeStyle: "bg-amber-50 text-[#EA580C] border-amber-200/90 font-bold" },
        { text: "أعلى تقييم في شرم الشيخ 4.9/5★", icon: Star, badgeStyle: "bg-sky-50 text-[#0284C7] border-sky-200/90 font-bold" },
        { text: "انتقالات مجانية مكيفة من وإلى الفندق", icon: ShieldCheck, badgeStyle: "bg-slate-100/80 text-slate-800 border-slate-200 font-medium" },
        { text: "تأكيد فوري وتعديل مجاني للرحلات", icon: CheckCircle2, badgeStyle: "bg-emerald-50 text-[#059669] border-emerald-200/90 font-bold" },
        { text: "رحلات يخوت VIP وسفاري بدوي ساحر", icon: Anchor, badgeStyle: "bg-slate-100/80 text-slate-800 border-slate-200 font-medium" },
        { text: "أسطول بيتش باجي وبوجي 250cc حديث", icon: Compass, badgeStyle: "bg-slate-100/80 text-slate-800 border-slate-200 font-medium" },
        { text: "مرشدين وغطاسين معتمدين دولياً PADI", icon: Award, badgeStyle: "bg-sky-50 text-[#0284C7] border-sky-200/90 font-bold" },
      ]
    : [
        { text: "LIMITED TIME 20% DISCOUNT ONLINE", icon: Flame, badgeStyle: "bg-amber-50 text-[#EA580C] border-amber-200/90 font-bold" },
        { text: "#1 TOP RATED OPERATOR 4.9/5★", icon: Star, badgeStyle: "bg-sky-50 text-[#0284C7] border-sky-200/90 font-bold" },
        { text: "FREE VIP HOTEL PICKUP & RETURN", icon: ShieldCheck, badgeStyle: "bg-slate-100/80 text-slate-800 border-slate-200 font-medium" },
        { text: "INSTANT CONFIRMATION & FREE CANCEL", icon: CheckCircle2, badgeStyle: "bg-emerald-50 text-[#059669] border-emerald-200/90 font-bold" },
        { text: "VIP YACHT CRUISES & BEDOUIN NIGHTS", icon: Anchor, badgeStyle: "bg-slate-100/80 text-slate-800 border-slate-200 font-medium" },
        { text: "LATEST 250cc QUAD & POLARIS FLEET", icon: Compass, badgeStyle: "bg-slate-100/80 text-slate-800 border-slate-200 font-medium" },
        { text: "CERTIFIED PADI INSTRUCTORS & GUIDES", icon: Award, badgeStyle: "bg-sky-50 text-[#0284C7] border-sky-200/90 font-bold" },
      ];

  // Trusted International Partner Companies & Sponsors
  const partnerItems = [
    "TRIPADVISOR EXCELLENCE 2026",
    "PADI DIVING CERTIFIED",
    "POLARIS RACING BUGGIES",
    "RED SEA MARINE PROTECTED",
    "GETYOURGUIDE VERIFIED",
    "SHARM AIRPORT VIP FLEET",
    "BOOKING.COM GOLD PARTNER",
    "EGYPT TOURISM AUTHORITY"
  ];

  const mainRepeated = [...mainItems, ...mainItems, ...mainItems, ...mainItems];
  const partnerRepeated = [...partnerItems, ...partnerItems, ...partnerItems, ...partnerItems];

  return (
    <div className={`select-none ${className}`}>
      
      {/* 1. TOP RIBBON: CLEAN LUXURY OFFERS & SERVICES (Forward Motion) */}
      <div className="overflow-hidden whitespace-nowrap py-3 bg-white/95 backdrop-blur-md border-y border-slate-200/80 shadow-sm relative">
        <div className="inline-flex animate-marquee gap-8 items-center cursor-pointer">
          {mainRepeated.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4 shrink-0">
                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider border shadow-xs transition duration-300 ${item.badgeStyle}`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.text}</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. BOTTOM RIBBON: REVERSE PARTNER COMPANIES & SPONSORS (Subtle Clean Bar) */}
      <div className="overflow-hidden whitespace-nowrap py-2 bg-slate-50/90 border-b border-slate-200/70 relative">
        <div className="inline-flex animate-marquee-reverse gap-8 items-center cursor-pointer">
          {partnerRepeated.map((text, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 shadow-xs">
                🤝 {text}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MarqueeTicker;
