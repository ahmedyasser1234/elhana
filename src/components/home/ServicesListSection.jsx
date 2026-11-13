import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TiltCard } from '../common/TiltCard';
import { MagneticButton } from '../common/MagneticButton';
import { TextMaskReveal } from '../common/TextMaskReveal';

export const ServicesListSection = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const services = [
    {
      num: "01",
      title: isAr ? "رحلات سفاري الصحراء والبيتش باجي." : "Desert Safari & Quad Buggy Adventures.",
      desc: isAr
        ? "مغامرات قيادة البيتش باجي وسيارات البوجي في قلب صحراء سيناء ووادي الماندال، وركوب الجمال وحفلات العشاء البدوي الفاخرة تحت النجوم."
        : "Thrilling quad bike and dune buggy adventures across Sinai desert valleys, sunset camel rides, and authentic Bedouin dinners under the stars.",
      link: "/safari"
    },
    {
      num: "02",
      title: isAr ? "الرحلات والأنشطة البحرية واليخوت." : "Red Sea Cruises & Marine Adventures.",
      desc: isAr
        ? "إبحار بيخوت VIP فاخرة إلى محمية رأس محمد والجزيرة البيضاء وجزيرة تيران، مع تجارب السنوركلينج والغوص الاحترافي والألعاب المائية."
        : "Exclusive VIP yacht cruises to Ras Mohammed, White Island, and Tiran Island featuring world-class snorkeling, scuba diving, and water sports.",
      link: "/sea-trips"
    },
    {
      num: "03",
      title: isAr ? "رحلات سانت كاترين وجبل موسى." : "Saint Catherine & Mount Sinai Tours.",
      desc: isAr
        ? "صعود قمة جبل موسى التاريخي لمشاهدة شروق الشمس الساحر فوق بحر الغيوم، مع جولة إرشادية داخل دير سانت كاترين وشجرة العليقة المقدسة."
        : "Climb the historic Mount Sinai summit to witness the magical sunrise over rolling clouds, followed by a guided tour of Saint Catherine Monastery.",
      link: "/excursions?tab=catherine"
    },
    {
      num: "04",
      title: isAr ? "رحلات دهب ومحمية البلو هول." : "Dahab Day Trips & Blue Hole Excursions.",
      desc: isAr
        ? "استكشاف سحر دهب والغوص والسنوركلينج في الثقب الأزرق العالمي (Blue Hole)، ومغامرات الكانيون مع ركوب الجمال وغداء بدوي شهي على البحر."
        : "Experience Dahab's bohemian charm with snorkeling in the world-famous Blue Hole, canyon off-road safari, beach camel trekking, and seaside lunch.",
      link: "/excursions?tab=dahab"
    },
    {
      num: "05",
      title: isAr ? "رحلات طابا وخليج فيورد باي." : "Taba & Fjord Bay Scenic Excursions.",
      desc: isAr
        ? "جولة بانورامية إلى خليج فيورد باي بمياهه الفيروزية الصافية المحاطة بسلاسل جبال سيناء، وزيارة قلعة صلاح الدين التاريخية على جزيرة فرعون."
        : "Discover the breathtaking turquoise waters of Fjord Bay nestled between rugged mountains, and visit the historic Salah El-Din Citadel on Pharaoh's Island.",
      link: "/excursions?tab=taba"
    },
    {
      num: "06",
      title: isAr ? "رحلات نويبع ومخيمات رأس شيطان." : "Nuweiba, Ras Shitan & Wishwashi Canyon.",
      desc: isAr
        ? "أجواء الاسترخاء والهدوء على شواطئ رأس شيطان البدوية الساحرة، ومغامرة المشي والسباحة في مسبح وادي الوشواشي الطبيعي العذب وسط الجبال."
        : "Relax in serene Bedouin eco-camps on Ras Shitan beach, and trek to the hidden freshwater emerald natural pool in Wadi El-Wishwashi Canyon.",
      link: "/excursions?tab=nuweiba"
    }
  ];

  return (
    <div className="w-full min-h-[calc(100svh-var(--header-h))] flex flex-col justify-center py-12 md:py-16 bg-gradient-to-bl from-orange-50 via-white to-sky-50/60 text-slate-800 relative">
      {/* Alternating Glow: Orange Top-Right, Sky Blue Bottom-Left */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/12 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/12 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <TextMaskReveal>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/90 border border-orange-200 text-[#C2410C] text-xs font-bold uppercase tracking-wider shadow-sm">
              <span>{isAr ? "وجهات وتجارب رحلاتنا" : "Our Tour Destinations & Experiences"}</span>
            </div>
          </TextMaskReveal>

          <TextMaskReveal delay={0.15}>
            <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight text-slate-900 leading-tight">
              {isAr ? "رحلات سيناء وشرم الشيخ بأعلى معايير " : "Sinai & Sharm El Sheikh Tours With "}
              <span className="text-[#C2410C]">{isAr ? "الاحترافية والأمان." : "Excellence & Safety."}</span>
            </h2>
          </TextMaskReveal>
        </div>

        {/* Services Grid (Stacking cards on mobile, clean grid on desktop) */}
        <div className="flex flex-col space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 pb-8 md:pb-0">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="sticky md:static w-full transition-transform"
              style={{
                top: `calc(var(--header-h) + ${14 + idx * 12}px)`,
                zIndex: idx + 10
              }}
            >
              <TiltCard maxRotate={8} className="h-full">
                <div className="bg-white rounded-3xl p-7 border border-orange-100 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.12)] hover:border-[#F97316] hover:shadow-2xl transition-all duration-300 space-y-6 flex flex-col justify-between group h-full">
                  <div className="space-y-4">
                    <span className="text-xs font-extrabold text-[#C2410C] bg-orange-100 px-3 py-1 rounded-xl tracking-wider inline-block">
                      {item.num}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-[#C2410C] transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-orange-50 flex items-center justify-between">
                    <Link to={item.link} aria-label={isAr ? `استكشف تجربة ${item.title}` : `Explore ${item.title}`}>
                      <MagneticButton className="text-xs font-extrabold text-[#C2410C] flex items-center gap-1.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-300">
                        <span>{isAr ? "استكشف التجربة" : "Explore Experience"}</span>
                        <span>→</span>
                      </MagneticButton>
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ServicesListSection;
