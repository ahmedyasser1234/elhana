import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../common/SectionTitle';

export const TestimonialsCarousel = () => {
  const { t } = useTranslation();

  const reviews = [
    {
      name: t('testimonials.r1Name'),
      country: t('testimonials.r1Country'),
      tour: t('testimonials.r1Tour'),
      comment: t('testimonials.r1Comment'),
      rating: 5
    },
    {
      name: t('testimonials.r2Name'),
      country: t('testimonials.r2Country'),
      tour: t('testimonials.r2Tour'),
      comment: t('testimonials.r2Comment'),
      rating: 5
    },
    {
      name: t('testimonials.r3Name'),
      country: t('testimonials.r3Country'),
      tour: t('testimonials.r3Tour'),
      comment: t('testimonials.r3Comment'),
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-bl from-orange-50 via-amber-50/40 to-sky-50/60 text-slate-800 border-b border-orange-100/70 relative overflow-hidden">
      {/* Alternating Glow: Sunset Orange Top-Right */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/12 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        <SectionTitle
          badge={t('testimonials.badge')}
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-md hover:border-[#F97316] hover:shadow-xl transition duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#F97316]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-orange-50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 font-heading">{rev.name}</div>
                  <div className="text-[10px] text-slate-500 font-medium">{rev.country}</div>
                </div>
                <span className="text-[10px] font-bold text-[#F97316] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                  {rev.tour}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsCarousel;
