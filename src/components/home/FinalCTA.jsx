import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Compass, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { getWhatsAppLink } from '../common/WhatsAppButton';

export const FinalCTA = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <section className="py-24 sm:py-28 bg-gradient-to-b from-slate-50 via-sky-50/40 to-white text-slate-900 border-t border-sky-100 relative overflow-hidden">
      {/* Ambient Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#0284C7]/8 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('finalCTA.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            {t('finalCTA.titleMain')}{' '}
            <span className="text-[#0284C7]">{t('finalCTA.titleGold')}</span>
          </h2>

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('finalCTA.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3"
        >
          <Link to="/experiences" className="w-full sm:w-auto">
            <Button variant="primary" size="xl" className="w-full sm:w-auto flex items-center justify-center gap-2.5">
              <Compass className="w-5 h-5 shrink-0" />
              <span>{t('finalCTA.browseBtn')}</span>
            </Button>
          </Link>

          <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            <Button variant="whatsapp" size="xl" className="w-full sm:w-auto flex items-center justify-center gap-2.5">
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366] shrink-0" />
              <span>{t('finalCTA.whatsappBtn')}</span>
            </Button>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTA;
