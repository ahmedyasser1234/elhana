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
      title: isAr ? "رحلات بيتش باجي وبوجي سفاري الصحراء." : "ATV Quad & Dune Buggy Desert Safaris.",
      desc: isAr
        ? "خوض تجربة القيادة الحرة في صحراء سيناء الساحرة بسيارات البوجي والبيتش باجي 250cc مع مرشدين محترفين."
        : "Experience thrilling dune driving across the Sinai Desert with 250cc quad bikes and Polaris dune buggies guided by local pros.",
      link: "/atv-tours"
    },
    {
      num: "02",
      title: isAr ? "إبحار ويخوت فاخرة إلى الجزيرة البيضاء." : "VIP Yacht Cruises & White Island Expeditions.",
      desc: isAr
        ? "رحلات يخوت VIP ممتازة إلى محمية رأس محمد والجزيرة البيضاء شاملة الغداء والمشروبات ومعدات السنوركلينج."
        : "Exclusive VIP yacht trips to Ras Mohammed and White Island including gourmet lunch, open buffet drinks, and snorkeling gear.",
      link: "/yacht-trips"
    },
    {
      num: "03",
      title: isAr ? "سهرات عشاء بدوي وعروض فلكلورية تحت النجوم." : "Bedouin Sunset Dinners & Stargazing Shows.",
      desc: isAr
        ? "استمتع بغروب الشمس الصحراوي والعشاء البدوي اللذيذ مع العروض الفلكلورية وركوب الجمال ورصد النجوم بالتليسكوب."
        : "Immerse in Bedouin hospitality with sunset camel rides, open-fire BBQ dinner, folklore shows, and telescope stargazing.",
      link: "/bedouin-experience"
    },
    {
      num: "04",
      title: isAr ? "رحلات غوص واستكشاف شعب جزيرة تيران." : "Scuba Diving & Tiran Island Coral Reefs.",
      desc: isAr
        ? "اكتشف الحياة البحرية في البحر الأحمر مع غطسات التعارف للمبتدئين والغوص الاحترافي مع مدربي PADI."
        : "Explore vibrant coral reefs with intro scuba dives for beginners and certified guided dives with certified PADI instructors.",
      link: "/diving"
    },
    {
      num: "05",
      title: isAr ? "مغامرات باراسيلينج وألعاب مائية حماسية." : "Parasailing & High-Speed Water Sports.",
      desc: isAr
        ? "حلق فوق خليج نعمة بالطيران الشراعي واستمتع بركوب البنانة والقارب السريع مع أقصى معايير الأمان."
        : "Fly high over Naama Bay with parasailing and speed through the waves on banana boats and speedboats with total safety.",
      link: "/parasailing"
    },
    {
      num: "06",
      title: isAr ? "انتقالات فندقية ومطار شرم الشيخ VIP." : "VIP Airport & Hotel Private Transfers.",
      desc: isAr
        ? "خدمات استقبال وانتقالات بسيارات حديثة ومكيفة بأسعار ثابتة بدون رسوم خفية بين المطار وجميع فنادق شرم الشيخ."
        : "Fixed-price private transfers in modern air-conditioned vehicles connecting Sharm El Sheikh Airport with all resort hotels.",
      link: "/transfers"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-bl from-orange-50 via-white to-sky-50/60 text-slate-800 border-b border-orange-100/70 relative overflow-hidden">
      {/* Alternating Glow: Orange Top-Right, Sky Blue Bottom-Left */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/12 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/12 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <TextMaskReveal>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/90 border border-orange-200 text-[#F97316] text-xs font-bold uppercase tracking-wider shadow-sm">
              <span>{isAr ? "خدماتنا وتجاربنا الاستثنائية" : "Our Premium Services & Experiences"}</span>
            </div>
          </TextMaskReveal>

          <TextMaskReveal delay={0.15}>
            <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight text-slate-900 leading-tight">
              {isAr ? "نصنع تجارب سياحية بأعلى معايير " : "We Build Experiences With "}
              <span className="text-[#F97316]">{isAr ? "الاحترافية والرفاهية." : "Excellence & Precision."}</span>
            </h2>
          </TextMaskReveal>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard maxRotate={8} className="h-full">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-md hover:border-[#F97316] hover:shadow-2xl transition-all duration-300 space-y-6 flex flex-col justify-between group h-full">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-xl tracking-wider inline-block">
                      {item.num}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-[#F97316] transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-orange-50 flex items-center justify-between">
                    <Link to={item.link}>
                      <MagneticButton className="text-xs font-bold text-[#F97316] flex items-center gap-1.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-300">
                        <span>{isAr ? "استكشف التجربة" : "Explore Experience"}</span>
                        <span>→</span>
                      </MagneticButton>
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesListSection;
