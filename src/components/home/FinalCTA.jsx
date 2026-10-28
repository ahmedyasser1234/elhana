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
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-transparent via-sky-50/30 to-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Hero Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-sky-900/30 text-white"
        >
          {/* Background Real Travel Photo */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: `url('/images/sea/ras-mohammed-luxury-yacht.jpg')`
            }}
          />

          {/* Deep Luxury Dark & Color Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-sky-950/90 backdrop-blur-[2px]" />

          {/* Glowing Ambient Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284C7]/25 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />

          {/* Content Wrapper */}
          <div className="relative z-10 px-6 py-14 sm:px-12 sm:py-20 lg:py-24 max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-sky-200 text-xs sm:text-sm font-bold shadow-lg shadow-black/20"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>
                {isAr ? "رحلتك القادمة في جنوب سيناء تبدأ هنا" : "Your Next South Sinai Adventure Starts Here"}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="space-y-4"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight leading-[1.2] text-white">
                {isAr ? "مغامرتك في شرم الشيخ وجنوب سيناء " : "Your Adventure in Sharm & South Sinai "}
                <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">
                  {isAr ? "بانتظارك الآن" : "Awaits You Now"}
                </span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
                {isAr 
                  ? "سفاري الصحراء والبيتش باجي، رحلات اليخوت الفاخرة لرأس محمد وتيران، وأجمل رحلات دهب، سانت كاترين، طابا، ونويبع. احجز بأفضل الأسعار المباشرة مع تأكيد فوري ودعم متواصل على مدار الساعة."
                  : "Desert quad safaris, luxury yacht cruises to Ras Mohammed & Tiran, and scenic day trips to Dahab, Mount Sinai, Taba, and Nuweiba. Book directly with official best rates and 24/7 VIP support."}
              </p>
            </motion.div>

            {/* Trust Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto pt-1"
            >
              {trustPills.map((pill, idx) => {
                const Icon = pill.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs text-xs font-semibold text-slate-200"
                  >
                    <Icon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">{pill.text}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.55 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              {/* WhatsApp Button */}
              <a
                href={getWhatsAppLink(waMessage)}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                {/* Official WhatsApp SVG Icon */}
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.518 0-10 4.482-10 10 0 1.761.458 3.475 1.327 4.985l-1.408 5.15 5.277-1.385c1.457.794 3.109 1.25 4.804 1.25 5.518 0 10-4.482 10-10 0-5.518-4.482-10-10-10zm0 18.2c-1.571 0-3.111-.422-4.457-1.22l-.32-.191-3.308.868.883-3.226-.208-.332c-.878-1.398-1.341-3.023-1.341-4.699 0-4.52 3.678-8.2 8.2-8.2 4.523 0 8.2 3.68 8.2 8.2 0 4.522-3.677 8.2-8.2 8.2z"/>
                </svg>
                <span>{isAr ? "تواصل معنا عبر الواتساب" : "Chat on WhatsApp"}</span>
              </a>

              {/* Browse All Trips Button */}
              <Link
                to="/all-experiences"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm sm:text-base border border-white/25 backdrop-blur-md flex items-center justify-center gap-2.5 shadow-xl shadow-black/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <Compass className="w-5 h-5 text-sky-300 shrink-0" />
                <span>{isAr ? "استكشف جميع الرحلات والأسعار" : "Explore All Experiences"}</span>
                {isAr ? <ArrowLeft className="w-4 h-4 text-sky-300" /> : <ArrowRight className="w-4 h-4 text-sky-300" />}
              </Link>
            </motion.div>

            {/* Reassurance Footer Micro Line */}
            <p className="text-[11px] sm:text-xs text-slate-300 pt-1 tracking-wide">
              {isAr 
                ? "✓ بدون دفع مسبق إجباري • تأكيد فوري عبر الواتساب • استشارة سياحية مجانية لاختيار رحلتك"
                : "✓ No mandatory upfront payment • Instant confirmation via WhatsApp • Free travel consultation"}
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTA;
