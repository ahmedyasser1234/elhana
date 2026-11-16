import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  CheckCircle2,
  Crown,
  Calendar,
  Users,
  Compass,
  Ship,
  Car,
  Plane,
  Waves,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const CompletePackagesSection = () => {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();
  const isAr = i18n.language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const packages = [
    {
      id: 'classic-combo',
      nameAr: 'باقة مغامرات شرم الكلاسيكية',
      nameEn: 'Classic Sharm Adventure Combo',
      badgeAr: 'الأكثر طلباً للأزواج والأصدقاء',
      badgeEn: 'Best Seller for Couples & Friends',
      badgeStyle: 'bg-sky-50 text-[#0284C7] border-sky-200',
      durationAr: 'يومان من المغامرة',
      durationEn: '2 Days of Adventure',
      originalPrice: 65,
      offerPrice: 45,
      savingAmount: 20,
      highlight: 'from-[#0284C7]/15 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#0284C7]/50',
      isPopular: false,
      image: '/images/real/user-atv-safari.webp',
      includes: [
        {
          icon: Compass,
          textAr: 'سفاري بيتش باجي 250cc في وادي الصدى مع شاي بدوي',
          textEn: '250cc Quad ATV Safari in Echo Valley with Bedouin tea'
        },
        {
          icon: Ship,
          textAr: 'رحلة يخت رأس محمد والجزيرة البيضاء VIP مع بوفيه غداء وسنوركلينج',
          textEn: 'Ras Mohammed & White Island VIP Yacht with lunch buffet & snorkeling'
        },
        {
          icon: Car,
          textAr: 'سيارات حديثة ومكيفة للتوصيل من وإلى باب فندقك في الرحلتين',
          textEn: 'Air-conditioned hotel transfers included for both trips'
        }
      ]
    },
    {
      id: 'royal-all-inclusive',
      nameAr: 'باقة شرم الملكية VIP الشاملة',
      nameEn: 'Royal VIP Sharm All-Inclusive Combo',
      badgeAr: 'الباقة الملكية الأكثر توفيراً ⭐⭐⭐⭐⭐',
      badgeEn: 'Ultimate Royal VIP Value ⭐⭐⭐⭐⭐',
      badgeStyle: 'bg-amber-500 text-white font-black shadow-md shadow-amber-500/25',
      durationAr: '3 - 4 أيام (البرنامج المتكامل)',
      durationEn: '3 - 4 Days (Full Highlights)',
      originalPrice: 130,
      offerPrice: 85,
      savingAmount: 45,
      highlight: 'from-[#F59E0B]/20 via-[#F97316]/10 to-transparent',
      borderColor: 'border-amber-400 ring-2 ring-amber-400/40 shadow-2xl shadow-amber-500/10',
      isPopular: true,
      image: '/images/sea/ras-mohammed-luxury-yacht.webp',
      includes: [
        {
          icon: Crown,
          textAr: 'سوبر سفاري VIP (بيتش باجي + جمال + عشاء بدوي فاخر + حفلة فلكلورية وتلسكوب)',
          textEn: 'Super VIP Safari (ATV + Camel + Bedouin Dinner & Show + Stargazing)'
        },
        {
          icon: Ship,
          textAr: 'يخت ملكي فاخر لرأس محمد والجزيرة البيضاء مع مأكولات بحرية طازجة ومشروبات',
          textEn: 'VIP Luxury Yacht to Ras Mohammed & White Island with seafood buffet'
        },
        {
          icon: Waves,
          textAr: 'غطسة استكشافية بالأسطوانة (Scuba Diving) مع مدرب PADI محترف في أعماق البحر',
          textEn: 'Introductory Scuba Diving with certified PADI divemaster'
        },
        {
          icon: Plane,
          textAr: 'انتقالات مطار شرم الشيخ VIP مجاناً بالكامل (ذهاب وعودة بسيارة خاصة)',
          textEn: 'FREE Round-Trip Sharm Airport VIP Private Car Transfers'
        }
      ]
    },
    {
      id: 'family-sinai-wonders',
      nameAr: 'باقة العائلة وجولات سيناء الكبرى',
      nameEn: 'Ultimate Family & Sinai Wonders Combo',
      badgeAr: 'مثالية للعائلات والمجموعات',
      badgeEn: 'Perfect for Families & Groups',
      badgeStyle: 'bg-emerald-50 text-[#059669] border-emerald-200',
      durationAr: '4 - 5 أيام (برنامج عائلي مريح)',
      durationEn: '4 - 5 Days (Family Friendly)',
      originalPrice: 185,
      offerPrice: 125,
      savingAmount: 60,
      highlight: 'from-[#059669]/15 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#059669]/50',
      isPopular: false,
      image: '/images/real/polaris-buggy-family.webp',
      includes: [
        {
          icon: Car,
          textAr: 'كار باجي عائلي بولاريس (4 مقاعد) في قلب رمال وجبال سيناء الساحرة',
          textEn: 'Family Polaris Dune Buggy (4-Seater) in Sinai desert'
        },
        {
          icon: Ship,
          textAr: 'يخت رأس محمد والجزيرة البيضاء VIP المريح لجميع أفراد الأسرة',
          textEn: 'Family-friendly VIP Yacht to Ras Mohammed & White Island'
        },
        {
          icon: Compass,
          textAr: 'رحلة يوم كامل لمدينة دهب والبلو هول والوادي الملون وجولة تسوق حرة',
          textEn: 'Full-Day Dahab, Blue Hole & Canyon adventure tour'
        },
        {
          icon: Plane,
          textAr: 'سيارة فان عائلية خاصة ومكيفة لجميع انتقالات المطار والفنادق طوال العطلة',
          textEn: 'Private Family Van for all airport & hotel excursions transfers'
        }
      ]
    }
  ];

  const handleBookPackage = (pkg) => {
    const pkgName = isAr ? pkg.nameAr : pkg.nameEn;
    const priceText = `$${pkg.offerPrice}`;
    const message = isAr
      ? `مرحباً مجموعة الهنا، أرغب في حجز "${pkgName}" بعرض السعر الخاص (${priceText} للفرد). أرجو تزويدي بكافة التفاصيل وتأكيد المواعيد.`
      : `Hello El Hana Group, I would like to book the "${pkgName}" with the special offer price (${priceText} per person). Please provide details and confirm dates.`;
    const whatsappUrl = `https://wa.me/201100777330?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-sky-50/40 to-slate-50 relative overflow-hidden">
      {/* Background Accent Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#F59E0B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-[#EA580C] text-xs font-black uppercase tracking-wider border border-orange-200/80 shadow-xs">
            <Percent className="w-3.5 h-3.5" />
            <span>{isAr ? 'عروض الباقات والرحلات الكاملة' : 'Complete All-Inclusive Holiday Packages'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
            {isAr ? 'باقات الرحلات الكاملة الشاملة' : 'All-Inclusive Trip Packages'}{' '}
            <span className="text-[#0284C7]">{isAr ? 'عرض في السعر وتوفير حقيقي' : 'Special Combo Offers'}</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
            {isAr
              ? 'اجمع أقوى تجارب شرم الشيخ (سفاري الصحراء + اليخوت الملكية + انتقالات المطار VIP) في باقة واحدة شاملة، واستمتع بخصم يصل إلى 35% مقارنة بحجز كل رحلة منفصلة مع تأكيد فوري ودون أي مصاريف خفية.'
              : 'Combine Sharm El Sheikh’s top adventures (Desert Safari + VIP Yacht Cruise + Airport Transfers) into one complete holiday bundle and save up to 35% compared to individual bookings.'}
          </p>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => {
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`bg-white rounded-3xl border ${pkg.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group`}
              >
                {/* Top Corner Ambient Glow */}
                <div
                  className={`absolute top-0 end-0 w-44 h-44 bg-gradient-to-bl ${pkg.highlight} rounded-bl-full pointer-events-none transition duration-500 group-hover:scale-125`}
                />

                {/* Popular Crown Badge for the Middle Package */}
                {pkg.isPopular && (
                  <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white text-[11px] font-black py-1.5 text-center uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm z-20">
                    <Crown className="w-3.5 h-3.5 fill-white" />
                    <span>{isAr ? 'عرض السعر الملكي الأكثر طلباً وتوفيراً' : 'Best Value & Most Popular Choice'}</span>
                  </div>
                )}

                {/* Card Header & Content */}
                <div className={`p-6 sm:p-8 space-y-6 ${pkg.isPopular ? 'pt-10' : ''}`}>
                  
                  {/* Category Pill & Duration */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-black border ${pkg.badgeStyle}`}>
                      {isAr ? pkg.badgeAr : pkg.badgeEn}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 font-bold bg-slate-100/90 px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isAr ? pkg.durationAr : pkg.durationEn}</span>
                    </span>
                  </div>

                  {/* Package Title */}
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black font-heading text-slate-900 group-hover:text-[#0284C7] transition-colors leading-tight">
                      {isAr ? pkg.nameAr : pkg.nameEn}
                    </h3>
                  </div>

                  {/* Price Showcase Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/60 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 font-bold block line-through">
                        {isAr ? 'السعر المنفصل:' : 'Regular:'} {formatPrice(pkg.originalPrice)}
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-3xl font-black text-slate-900 tracking-tight">
                          {formatPrice(pkg.offerPrice)}
                        </span>
                        <span className="text-xs text-slate-500 font-bold">
                          {isAr ? '/ للفرد' : '/ person'}
                        </span>
                      </div>
                    </div>

                    <div className="text-end">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-500 text-white font-black text-xs shadow-sm">
                        <span>{isAr ? 'وفر' : 'Save'} {formatPrice(pkg.savingAmount)}</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold block mt-1">
                        {isAr ? 'خصم باقة حصري' : 'Combo Discount'}
                      </span>
                    </div>
                  </div>

                  {/* Includes List */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                      <span>{isAr ? 'يشمل هذا البكج الكامل:' : 'What This Package Includes:'}</span>
                    </div>

                    <ul className="space-y-2.5">
                      {pkg.includes.map((item, i) => {
                        const IconComponent = item.icon;
                        return (
                          <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 leading-relaxed">
                            <div className="w-5 h-5 rounded-md bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" />
                            </div>
                            <span>{isAr ? item.textAr : item.textEn}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                </div>

                {/* Card Action Footer */}
                <div className="p-6 sm:p-8 pt-0 space-y-3">
                  <button
                    type="button"
                    onClick={() => handleBookPackage(pkg)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                      pkg.isPopular
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-orange-500/25'
                        : 'bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white shadow-sky-600/25'
                    }`}
                  >
                    <span>{isAr ? 'احجز الباقة واستفد من العرض' : 'Book Package & Lock Offer'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{isAr ? 'تأكيد فوري ودفع عند الوصول • إمكانية تعديل المواعيد' : 'Instant Confirmation • Pay on Arrival'}</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee Note */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {isAr ? 'تريد تخصيص برنامج باقة خاصة بعائلتك أو مجموعتك؟' : 'Need a custom tailored holiday package for your group?'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'تواصل مع فريق حجوزات الهنا مباشرة عبر الواتساب لتنسيق جدول رحلات مخصص بخصم إضافي.'
                  : 'Contact our WhatsApp concierge team to customize your private schedule with special bundle rates.'}
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/201100777330?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%A8%D8%A7%D9%82%D8%A9%20%D8%B1%D8%AD%D9%84%D8%A7%D8%AA%20%D8%AE%D8%A7%D8%B5%D8%A9%20%D8%A8%D8%B3%D8%B9%D8%B1%20%D8%AA%D9%88%D9%81%D9%8A%D8%B1%D9%8A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
          >
            <span>{isAr ? 'تخصيص باقة خاصة' : 'Custom Bundle Request'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default CompletePackagesSection;
