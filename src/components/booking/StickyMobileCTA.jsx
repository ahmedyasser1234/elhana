import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../common/WhatsAppButton';
import { useBooking } from '../../context/BookingContext';
import { useCurrency } from '../../context/CurrencyContext';

export const StickyMobileCTA = ({ experience }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { updateBooking } = useBooking();
  const { formatPrice } = useCurrency();

  if (!experience) return null;

  const handleBookClick = () => {
    updateBooking({ experience });
    navigate('/checkout');
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-t border-[#0284C7]/30 p-3 shadow-2xl flex items-center justify-between gap-3">
      <div>
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">{t('common.startingFrom')}</span>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-white font-heading">{formatPrice(experience.startingPrice)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={getWhatsAppLink(isAr ? `مرحباً، أود استفسار عن حجز: ${experience.title}` : `Hello! I want to book: ${experience.title}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-[#25D366] text-white rounded-xl font-bold shadow-lg"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        </a>

        <button
          onClick={handleBookClick}
          className="px-5 py-3 bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#0284C7]/30 flex items-center gap-1.5 active:scale-95 transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t('common.bookNow')}</span>
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
