import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../common/SectionTitle';

export const InstagramGallery = () => {
  const { t } = useTranslation();

  const images = [
    { url: "/images/real/atv-quad.jpg", tag: "#ElHanaQuad" },
    { url: "/images/real/polaris-buggy-family.jpg", tag: "#PolarisBuggy" },
    { url: "/images/real/camel-caravan.jpg", tag: "#BedouinCamel" },
    { url: "/images/real/family-buggy-ride.jpg", tag: "#FamilyFun" },
    { url: "/images/real/polaris-buggy-white.jpg", tag: "#SinaiBuggy" },
    { url: "/images/real/yacht-vip.jpg", tag: "#RedSeaDiving" }
  ];

  return (
    <section className="py-24 bg-gradient-to-bl from-orange-50 via-amber-50/40 to-sky-50/60 text-slate-900 border-b border-orange-100/70 relative overflow-hidden">
      {/* Alternating Glow: Sunset Orange Top-Right */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/12 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center relative z-10">
        
        <SectionTitle
          badge={t('instagram.badge')}
          title={t('instagram.title')}
          subtitle={t('instagram.subtitle')}
          dark={false}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative aspect-square rounded-2xl overflow-hidden group border border-orange-100/90 shadow-md bg-white"
            >
              <img
                src={img.url}
                alt="El Hana Group Real Tour"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white backdrop-blur-xs">
                <span className="text-xs font-black text-white bg-[#F97316] px-3 py-1 rounded-full shadow-sm">{img.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#F97316] hover:bg-[#EA580C] px-7 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300"
        >
          <span>{t('instagram.followBtn')}</span>
          <span>→</span>
        </a>

      </div>
    </section>
  );
};

export default InstagramGallery;
