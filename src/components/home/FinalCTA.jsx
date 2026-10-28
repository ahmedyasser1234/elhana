import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Compass, Sparkles, ShieldCheck, Zap, Headphones, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { getWhatsAppLink } from '../common/WhatsAppButton';

export const FinalCTA = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const waMessage = isAr 
    ? "مرحباً مجموعة الهنا! أود الاستفسار وحجز إحدى رحلاتكم في شرم الشيخ وجنوب سيناء 🌴✨"
    : "Hello El Hana Group! I would like to inquire about booking a tour in Sharm El Sheikh & South Sinai 🌴✨";

  const trustPills = [
    {
      icon: Zap,
      text: isAr ? "تأكيد فوري للحجز" : "Instant Confirmation"
    },
    {
      icon: ShieldCheck,
      text: isAr ? "أفضل سعر رسمي مضمون" : "Best Price Guaranteed"
    },
    {
      icon: Headphones,
      text: isAr ? "دعم واستقبال VIP 24/7" : "24/7 VIP Concierge"
    },
    {
      icon: Star,
      text: isAr ? "مرشدون محترفون ومعدات حديثة" : "Top Guides & Fleet"
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Hero Card Container - Compact & Visible Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-white/20 text-white"
        >
          {/* Background Real Travel Photo - Clear and Vivid */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/sea/ras-mohammed-luxury-yacht.jpg')`
            }}
          />

          {/* Balanced Transparent Gradient - Keeps photo bright and text legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-900/55" />

          {/* Content Wrapper - Reduced Height & Spacing */}
          <div className="relative z-10 px-5 py-8 sm:px-10 sm:py-10 max-w-3xl mx-auto text-center space-y-5">
            
            {/* Top Badge - Compact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-sky-200 text-[11px] sm:text-xs font-bold shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {isAr ? "رحلتك القادمة في جنوب سيناء تبدأ هنا" : "Your Next South Sinai Adventure Starts Here"}
              </span>
            </motion.div>

            {/* Main Title - Proportional Font Size */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="space-y-2.5"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight leading-snug text-white drop-shadow-md">
                {isAr ? "مغامرتك في شرم الشيخ وجنوب سيناء " : "Your Adventure in Sharm & South Sinai "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-300">
                  {isAr ? "بانتظارك الآن" : "Awaits You Now"}
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-100 max-w-xl mx-auto leading-relaxed font-medium drop-shadow-sm">
                {isAr 
                  ? "سفاري الصحراء والبيتش باجي، رحلات اليخوت الفاخرة، ومغامرات دهب، سانت كاترين، طابا، ونويبع بأفضل الأسعار المباشرة مع تأكيد فوري."
                  : "Desert quad safaris, luxury yacht cruises, and scenic day trips to Dahab, Mount Sinai, Taba, and Nuweiba with official direct rates."}
              </p>
            </motion.div>

            {/* Trust Pills - Sleek & Compact */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto"
            >
              {trustPills.map((pill, idx) => {
                const Icon = pill.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-slate-900/60 border border-white/15 backdrop-blur-md text-[11px] font-semibold text-slate-100"
                  >
                    <Icon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">{pill.text}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA Buttons - Compact & Elegant */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1"
            >
              {/* WhatsApp Button */}
              <a
                href={getWhatsAppLink(waMessage)}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.518 0-10 4.482-10 10 0 1.761.458 3.475 1.327 4.985l-1.408 5.15 5.277-1.385c1.457.794 3.109 1.25 4.804 1.25 5.518 0 10-4.482 10-10 0-5.518-4.482-10-10-10zm0 18.2c-1.571 0-3.111-.422-4.457-1.22l-.32-.191-3.308.868.883-3.226-.208-.332c-.878-1.398-1.341-3.023-1.341-4.699 0-4.52 3.678-8.2 8.2-8.2 4.523 0 8.2 3.68 8.2 8.2 0 4.522-3.677 8.2-8.2 8.2z"/>
                </svg>
                <span>{isAr ? "تواصل معنا عبر الواتساب" : "Chat on WhatsApp"}</span>
              </a>

              {/* Browse All Trips Button */}
              <Link
                to="/all-experiences"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900/80 text-white font-extrabold text-xs sm:text-sm border border-white/20 backdrop-blur-md flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <Compass className="w-4 h-4 text-sky-300 shrink-0" />
                <span>{isAr ? "استكشف جميع الرحلات والأسعار" : "Explore All Experiences"}</span>
                {isAr ? <ArrowLeft className="w-3.5 h-3.5 text-sky-300" /> : <ArrowRight className="w-3.5 h-3.5 text-sky-300" />}
              </Link>
            </motion.div>

            {/* Reassurance Footer Micro Line */}
            <p className="text-[10px] sm:text-[11px] text-slate-200 pt-0.5 tracking-wide drop-shadow-sm">
              {isAr 
                ? "✓ بدون دفع مسبق إجباري • تأكيد فوري عبر الواتساب • استشارة سياحية مجانية"
                : "✓ No mandatory upfront payment • Instant confirmation via WhatsApp • Free consultation"}
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTA;
