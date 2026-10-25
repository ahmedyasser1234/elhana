import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, MapPin, MessageCircle, Heart, Camera, Share2, Video, Phone } from 'lucide-react';
import { getWhatsAppLink } from './WhatsAppButton';

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <footer className="bg-gradient-to-br from-sky-50/90 via-white to-orange-50/80 text-slate-800 pt-16 pb-12 border-t border-sky-200/70 relative overflow-hidden">
      {/* Ambient Light Glow Accents (Sky Blue & Orange) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0284C7]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Footer Micro Trust Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl bg-white/90 border border-sky-100 shadow-md backdrop-blur-md">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-2xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center shrink-0 border border-[#0284C7]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 font-heading">
                {isAr ? "مشغل سياحي مرخص 100%" : "Licensed Local Operator"}
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                {isAr ? "وزارة السياحة - جنوب سيناء" : "South Sinai Tourism Ministry"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-2xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center shrink-0 border border-[#0284C7]/20">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 font-heading">
                {isAr ? "توصيل مجاني من الفندق" : "Resort Lobby Pickup"}
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                {isAr ? "خليج نعمة، نبق، الهضبة، والمطار" : "Naama, Nabq, Hadaba & Airport"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 border border-[#25D366]/20">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 font-heading">
                {isAr ? "دعم 24/7 عبر الواتساب" : "24/7 WhatsApp Support"}
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                {isAr ? "خدمة عملاء بعدة لغات" : "Multilingual assistance"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-2xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center shrink-0 border border-[#0284C7]/20">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 font-heading">
                {isAr ? "ضمان أفضل سعر في شرم" : "Best Price Guarantee"}
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                {isAr ? "خيارات دفع كاش عند الوصول" : "Pay on pickup options"}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group" title="El Hana Group">
              <img
                src="/logo.png"
                alt="El Hana Group Logo"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#0284C7] shadow-lg shadow-[#0284C7]/20 group-hover:scale-105 transition duration-300"
              />
              <span className="font-extrabold text-xl text-slate-900 font-heading tracking-tight group-hover:text-[#0284C7] transition">
                El Hana Group
              </span>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-normal">
              {t('footer.description')}
            </p>

            <div className="flex items-center gap-3 text-slate-600 pt-2">
              <a
                href="https://www.instagram.com/el_hana_group/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-sky-100 shadow-sm flex items-center justify-center hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:to-purple-600 hover:border-transparent transition duration-300"
                title="Instagram @el_hana_group"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61583787661164"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-sky-100 shadow-sm flex items-center justify-center hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition duration-300"
                title="Facebook"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="tel:+20110077330"
                className="w-9 h-9 rounded-xl bg-white border border-sky-100 shadow-sm flex items-center justify-center hover:text-white hover:bg-[#0284C7] hover:border-[#0284C7] transition duration-300"
                title="اتصال هاتف: 0110077330"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-sky-100 shadow-sm flex items-center justify-center hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition duration-300"
                title="واتساب: 01044790588"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Desert Safaris */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7] font-heading">
              {t('nav.safari')}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-700">
              <li><Link to="/atv-tours" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "سفاري بيتش باجي (ATV)" : "ATV Quad Bikes"}</Link></li>
              <li><Link to="/buggy-tours" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "رحلات الكار باجي" : "Dune Buggy Tours"}</Link></li>
              <li><Link to="/bedouin-experience" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "السهرة والعشاء البدوي" : "Bedouin Experience"}</Link></li>
              <li><Link to="/camel-riding" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "ركوب الجمال بالصحراء" : "Camel Caravan"}</Link></li>
              <li><Link to="/horse-riding" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "ركوب الخيل بالصحراء والشاطئ" : "Horseback Riding"}</Link></li>
              <li><Link to="/safari" className="text-[#0284C7] font-bold hover:text-amber-600 hover:underline transition inline-block">{isAr ? "عرض جميع رحلات السفاري" : "All Desert Safaris"}</Link></li>
            </ul>
          </div>

          {/* Col 3: Red Sea Trips */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7] font-heading">
              {t('nav.seaTrips')}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-700">
              <li><Link to="/yacht-trips" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "رحلات اليخوت VIP الملكية" : "VIP Yacht Cruises"}</Link></li>
              <li><Link to="/snorkeling" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "سنوركلينج رأس محمد وتيران" : "Ras Mohammed & Tiran"}</Link></li>
              <li><Link to="/diving" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "غوص الغواصة والغطس" : "Intro Scuba Diving"}</Link></li>
              <li><Link to="/parasailing" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "باراشوت طيران باراسيليج" : "Parasailing Flight"}</Link></li>
              <li><Link to="/banana-boat" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "الألعاب المائية والبنانا" : "Banana & Tube Rides"}</Link></li>
              <li><Link to="/sea-trips" className="text-[#0284C7] font-bold hover:text-amber-600 hover:underline transition inline-block">{isAr ? "عرض جميع رحلات البحر" : "All Sea Trips"}</Link></li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7] font-heading">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-700">
              <li><Link to="/about" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{t('nav.about')}</Link></li>
              <li><Link to="/transfers" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{t('nav.transfers')}</Link></li>
              <li><Link to="/contact" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{t('nav.contact')}</Link></li>
              <li><Link to="/faq" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{t('nav.faq')}</Link></li>
              <li><Link to="/blog" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{t('nav.blog')}</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "الشروط والأحكام" : "Terms & Conditions"}</Link></li>
              <li><Link to="/cancellation-policy" className="hover:text-amber-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition duration-200 inline-block">{isAr ? "سياسة الإلغاء" : "Cancellation Policy"}</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sky-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-medium">
          <div>
            © {new Date().getFullYear()} {t('footer.rights')}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#25D366] transition flex items-center gap-1.5 font-bold"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? "دعم واتساب مباشر" : "WhatsApp Support"}</span>
            </a>
            <Link to="/privacy-policy" className="hover:text-slate-900 transition">{isAr ? "الخصوصية" : "Privacy"}</Link>
            <Link to="/terms-and-conditions" className="hover:text-slate-900 transition">{isAr ? "الشروط" : "Terms"}</Link>
            <Link to="/cancellation-policy" className="hover:text-slate-900 transition">{isAr ? "الإلغاء" : "Cancellation"}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
