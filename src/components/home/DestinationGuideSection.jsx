import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../common/SectionTitle';

export const DestinationGuideSection = () => {
  const { t } = useTranslation();

  const destinations = [
    { 
      name: t('destinations.d1Name'), 
      desc: t('destinations.d1Desc'), 
      image: "/images/destinations/naama-bay.jpg",
      imageWebp: "/images/destinations/naama-bay.webp"
    },
    { 
      name: t('destinations.d2Name'), 
      desc: t('destinations.d2Desc'), 
      image: "/images/destinations/ras-mohammed.jpg",
      imageWebp: "/images/destinations/ras-mohammed.webp"
    },
    { 
      name: t('destinations.d3Name'), 
      desc: t('destinations.d3Desc'), 
      image: "/images/destinations/south-sinai-desert.jpg",
      imageWebp: "/images/destinations/south-sinai-desert.webp"
    },
    { 
      name: t('destinations.d4Name'), 
      desc: t('destinations.d4Desc'), 
      image: "/images/destinations/tiran-island.jpg",
      imageWebp: "/images/destinations/tiran-island.webp"
    },
    { 
      name: t('destinations.d5Name'), 
      desc: t('destinations.d5Desc'), 
      image: "/images/destinations/nabq-bay.jpg",
      imageWebp: "/images/destinations/nabq-bay.webp"
    },
    { 
      name: t('destinations.d6Name'), 
      desc: t('destinations.d6Desc'), 
      image: "/images/destinations/hadaba-ras-um-sid.jpg",
      imageWebp: "/images/destinations/hadaba-ras-um-sid.webp"
    }
  ];

  return (
    <div className="w-full min-h-[calc(100svh-var(--header-h))] flex flex-col justify-center py-12 md:py-16 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 text-slate-800 relative">
      {/* Alternating Glow: Sky Blue Top-Left */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/12 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <SectionTitle
          badge={t('destinations.badge')}
          title={t('destinations.title')}
          subtitle={t('destinations.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-sky-100/80 hover:border-[#0284C7] group transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <picture className="w-full h-full">
                  <source srcSet={item.imageWebp} type="image/webp" />
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-3.5 left-4 rtl:left-auto rtl:right-4 text-white font-black text-lg font-heading drop-shadow-sm">
                  <span>{item.name}</span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DestinationGuideSection;
