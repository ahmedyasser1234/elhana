import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Crown,
  Compass,
  Ship,
  Car,
  Plane,
  Waves,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Percent
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const CompletePackagesSection = () => {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();
  const isAr = i18n.language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activePackageIdx, setActivePackageIdx] = useState(0);

  const packages = [
    {
      id: 'royal-all-inclusive',
      tabLabelAr: '👑 باقة VIP الملكية (الأكثر طلباً)',
      tabLabelEn: '👑 Royal VIP All-Inclusive (Best Seller)',
      badgeAr: 'باقات شرم الحصرية • توفير 35%',
      badgeEn: 'Exclusive Sharm Combos • Save 35%',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      titleAr: 'باقة شرم الملكية VIP الشاملة',
      titleEn: 'Royal VIP Sharm All-Inclusive Combo',
      titleHighlightAr: 'الشاملة',
      titleHighlightEn: 'All-Inclusive',
      descriptionAr:
        'البرنامج السياحي المتكامل والأكثر فخامة في شرم الشيخ. يجمع بين أروع مغامرات الصحراء بالبيتش باجي والعشاء البدوي الفاخر، ورحلة يخت ملكي خاص لمحمية رأس محمد والجزيرة البيضاء مع الغوص بالأسطوانة وانتقالات المطار VIP مجاناً.',
      descriptionEn:
        'The most luxurious all-inclusive vacation combo in Sharm El Sheikh. Combines the desert ATV safari with VIP Bedouin dinner & show, a luxury yacht cruise to Ras Mohammed & White Island with scuba diving, and complimentary round-trip VIP airport transfers.',
      durationAr: '3 - 4 أيام (البرنامج المتكامل)',
      durationEn: '3 - 4 Days (Full Program)',
      originalPrice: 130,
      offerPrice: 85,
      savingAmount: 45,
      priceBadgeAr: 'عرض الباقة الملكية VIP',
      priceBadgeEn: 'Royal VIP Special Offer',
      priceIncludesAr: 'يشمل: سوبر سفاري + يخت رأس محمد + غوص + استقبال وتوصيل المطار VIP',
      priceIncludesEn: 'Includes: Super Safari + VIP Yacht + Scuba Dive + Free Airport VIP Transfers',
      image: '/images/sea/ras-mohammed-luxury-yacht.webp',
      accentColor: '#F59E0B',
      featuresAr: [
        'سوبر سفاري بالبيتش باجي 250cc في قلب وادي الصدى',
        'ركوب الجمال البدوية عند مغيب الشمس فوق الرمال الذهبية',
        'عشاء بدوي مشوي فاخر في الخيمة البدوية مع بوفيه مفتوح',
        'حفلة فلكلورية شرقية (تنورة ورقص شرقي) وجلسة رصد النجوم بالتلسكوب',
        'يوم كامل على يخت ملكي VIP فاخر لرأس محمد والجزيرة البيضاء',
        'وجبة غداء مأكولات بحرية طازجة ومشروبات منعشة طوال اليوم',
        'غطسة استكشافية بالأسطوانة (Scuba Diving) مع مدرب PADI محترف',
        'انتقالات مطار شرم الشيخ VIP مجاناً ذهاب وعودة بسيارة خاصة حديثة'
      ],
      featuresEn: [
        '250cc Quad ATV desert adventure through Echo Valley',
        'Sunset camel caravan ride across golden desert dunes',
        'Open BBQ VIP Bedouin dinner inside authentic Bedouin camp',
        'Oriental folklore show (Tanoura & Belly dance) + Telescope stargazing',
        'Full-day VIP luxury yacht cruise to Ras Mohammed & White Island',
        'Fresh seafood & BBQ lunch buffet with unlimited soft drinks',
        'Introductory scuba diving session with certified PADI divemaster',
        'FREE round-trip Sharm El Sheikh Airport VIP private transfers'
      ],
      whatsappMsg:
        'مرحباً مجموعة الهنا، أرغب في حجز باقة شرم الملكية VIP الشاملة بسعر العرض الخاص (85$ للفرد بدلاً من 130$)، برجاء تزويدي بالمواعيد والتفاصيل.'
    },
    {
      id: 'classic-combo',
      tabLabelAr: '⚡ مغامرات شرم الكلاسيكية (يومان)',
      tabLabelEn: '⚡ Classic Sharm Adventure (2 Days)',
      badgeAr: 'باقات التوفير • الأكثر طلباً',
      badgeEn: 'Best Value • Most Popular',
      badgeColor: 'bg-sky-100 text-[#0284C7] border-sky-300',
      titleAr: 'باقة مغامرات شرم الكلاسيكية',
      titleEn: 'Classic Sharm Adventure Combo',
      titleHighlightAr: 'الكلاسيكية',
      titleHighlightEn: 'Classic Combo',
      descriptionAr:
        'الباقة المثالية للاستمتاع بأهم وأقوى تجارب شرم الشيخ الأساسية في يومين فقط: إثارة البيتش باجي في الصحراء مع الشاي البدوي، والرحلة البحرية الاستثنائية لمحمية رأس محمد والجزيرة البيضاء الساحرة بأفضل سعر توفيري.',
      descriptionEn:
        'The perfect 2-day combo covering Sharm El Sheikh essentials: exhilarating desert ATV quad biking with authentic Bedouin tea, and a premium yacht cruise to Ras Mohammed and the magical White Island with lunch.',
      durationAr: 'يومان من المغامرة',
      durationEn: '2 Days of Adventure',
      originalPrice: 65,
      offerPrice: 45,
      savingAmount: 20,
      priceBadgeAr: 'عرض الكومبو الكلاسيكي',
      priceBadgeEn: 'Classic Combo Offer',
      priceIncludesAr: 'يشمل: سفاري بيتش باجي 250cc + يخت رأس محمد والجزيرة البيضاء + غداء وانتقالات',
      priceIncludesEn: 'Includes: 250cc Quad ATV Safari + White Island Yacht + Lunch Buffet + Pickups',
      image: '/images/real/user-atv-safari.webp',
      accentColor: '#0284C7',
      featuresAr: [
        'جولة سفاري بيتش باجي (ATV) 250cc لمدة ساعتين بين الجبال',
        'التوقف في وادي الصدى للاستمتاع بظاهرة صدى الصوت والتقاط الصور',
        'استراحة شاي بدوي بالأعشاب والخبز البدوي الطازج في المخيم',
        'رحلة بحرية فاخرة باليخت إلى محمية رأس محمد الوطنية',
        'نزول الجزيرة البيضاء (مالديف مصر) والسباحة على الرمال الناعمة',
        'وقفات سنوركلينج برفقة مرشد بحري متخصص لمشاهدة الشعاب المرجانية',
        'بوفيه غداء مفتوح ولذيذ على متن اليخت مع مشروبات طوال اليوم',
        'توصيل مجاني من وإلى باب فندقك في شرم الشيخ للرحلتين'
      ],
      featuresEn: [
        '2-hour 250cc Quad ATV safari ride through Sinai mountain trails',
        'Echo Valley stop for sound resonance and desert landscape photos',
        'Bedouin tent relaxation with herbal tea and fresh Bedouin bread',
        'Full-day yacht cruise to world-famous Ras Mohammed National Park',
        'Disembarking and swimming at the sandbar of White Island',
        'Guided snorkeling stops among protected colorful coral reefs',
        'Open buffet lunch prepared on board with soft drinks',
        'Free hotel lobby door-to-door pickups for both excursions'
      ],
      whatsappMsg:
        'مرحباً مجموعة الهنا، أرغب في حجز باقة مغامرات شرم الكلاسيكية بسعر العرض (45$ بدلاً من 65$)، برجاء تأكيد الحجز.'
    },
    {
      id: 'family-wonders',
      tabLabelAr: '🌴 العائلة وعجائب سيناء (4-5 أيام)',
      tabLabelEn: '🌴 Family & Sinai Wonders (4-5 Days)',
      badgeAr: 'باقة العائلات والمجموعات • توفير $60',
      badgeEn: 'Family & Groups • Save $60',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      titleAr: 'باقة العائلة الشاملة وعجائب سيناء',
      titleEn: 'Ultimate Family & Sinai Wonders Combo',
      titleHighlightAr: 'وعجائب سيناء',
      titleHighlightEn: 'Sinai Wonders',
      descriptionAr:
        'برنامج عائلي مصمم بعناية ليناسب جميع أفراد الأسرة والأطفال وكبار السن. يجمع بين راحة الكار باجي العائلي 4 مقاعد، وسهرة العشاء البدوي، ويخت الجزيرة البيضاء، وجولة دهب الساحرة والبلو هول مع وادي قني.',
      descriptionEn:
        'Specially curated for families, kids, and groups seeking comfort and wonder. Features a 4-seater family dune buggy, Bedouin dinner & folklore night, White Island yacht cruise, and a private day trip to Dahab Blue Hole & Canyon.',
      durationAr: '4 - 5 أيام (برنامج عائلي مريح)',
      durationEn: '4 - 5 Days (Family Friendly)',
      originalPrice: 185,
      offerPrice: 125,
      savingAmount: 60,
      priceBadgeAr: 'عرض العائلة والمجموعات الخاص',
      priceBadgeEn: 'Family & Group Special Deal',
      priceIncludesAr: 'يشمل: كار باجي 4 مقاعد + عشاء بدوي + يخت بحري + جولة دهب والبلو هول',
      priceIncludesEn: 'Includes: 4-Seater Buggy + Bedouin Dinner + White Island Yacht + Dahab Tour',
      image: '/images/real/family-buggy-ride.jpg',
      accentColor: '#10B981',
      featuresAr: [
        'كار باجي بولاريس عائلي آمن ومريح 4 مقاعد في وادي الماندال',
        'عشاء بدوي مشوي فاخر في المخيم مع حفلة فلكلورية وعرض التنورة',
        'رحلة يخت رأس محمد والجزيرة البيضاء مناسبة للأطفال والعائلات',
        'معدات سنوركلينج وسترات نجاة آمنة لجميع الأعمار مجاناً',
        'رحلة يوم كامل إلى دهب، البلو هول، وركوب الجمال على شاطئ البحر',
        'زيارة واحة وادي قني الطبيعية وشراء الهدايا التذكارية من ممشى دهب',
        'سائق وسيارة خاصة مكيفة لجميع الجولات لضمان راحة وخصوصية العائلة',
        'خصم إضافي خاص للأطفال تحت 10 سنوات'
      ],
      featuresEn: [
        'Safe 4-seater Polaris family dune buggy tour in Mandal Valley',
        'Luxury Bedouin BBQ dinner with oriental Tanoura folklore show',
        'Family-friendly Ras Mohammed & White Island luxury cruise',
        'Free snorkeling equipment & sanitized life jackets for all ages',
        'Full-day private tour to Dahab, the Blue Hole, and seaside camel ride',
        'Visit to Wadi Qnai oasis and shopping at vibrant Dahab Promenade',
        'Private air-conditioned chauffeur throughout for maximum comfort',
        'Special discounted family rates for children under 10'
      ],
      whatsappMsg:
        'مرحباً مجموعة الهنا، أرغب في الاستفسار وحجز باقة العائلة الشاملة وعجائب سيناء بسعر العرض (125$ بدلاً من 185$).'
    }
  ];

  const currentPkg = packages[activePackageIdx];

  const getWhatsAppBookingLink = (msg) => {
    return `https://wa.me/201100777330?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FFFDF7] via-white to-amber-50/30 text-slate-800 relative overflow-hidden">
      {/* Ambient Decorative Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider border border-amber-300 shadow-xs">
            <Percent className="w-3.5 h-3.5 text-amber-600" />
            <span>{isAr ? 'عروض وباقات الرحلات الشاملة' : 'Complete Tour Combos & Deals'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
            {isAr ? 'رحلات كاملة' : 'All-Inclusive Vacation Packages'}{' '}
            <span className="text-[#F97316]">{isAr ? 'عرض في السعر وتوفير حقيقي' : '& Best Value Combos'}</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
            {isAr
              ? 'وفّر وقتك وميزانيتك مع باقاتنا المتكاملة التي تجمع بين رحلات السفاري واليخوت البحرية والغوص وانتقالات المطار بأسعار خاصة جداً وخصومات تصل إلى 35%.'
              : 'Save time and money with all-inclusive multi-day packages combining desert safaris, yacht cruises, scuba diving, and airport transfers at exclusive combo rates.'}
          </p>
        </div>

        {/* 1. Quick Tabs Selector (To switch packages smoothly) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-slate-100/90 max-w-4xl mx-auto border border-slate-200">
          {packages.map((pkg, idx) => {
            const isActive = idx === activePackageIdx;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setActivePackageIdx(idx)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-md border border-slate-200 scale-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>{isAr ? pkg.tabLabelAr : pkg.tabLabelEn}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* 2. GRAND SHOWCASE CARD (Matching user's exact screenshot design) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPkg.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-xl"
          >
            {/* ── Left Column: Showcase Image Card with Floating Offer Banner ── */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 bg-slate-900 group">
                <img
                  src={currentPkg.image}
                  alt={isAr ? currentPkg.titleAr : currentPkg.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Top Duration Badge */}
                <div className="absolute top-4 start-4">
                  <span className="px-3.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-black border border-white/20 flex items-center gap-1.5 shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isAr ? currentPkg.durationAr : currentPkg.durationEn}</span>
                  </span>
                </div>

                {/* Floating Bottom Offer Pill (Identical to user's screenshot) */}
                <div className="absolute bottom-4 inset-x-4 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-100 flex items-center justify-between gap-3">
                  {/* Price Block */}
                  <div className="shrink-0">
                    <span className="text-xs text-slate-400 line-through block font-medium">
                      {formatPrice(currentPkg.originalPrice)}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#F97316] leading-none block">
                      {formatPrice(currentPkg.offerPrice)}
                    </span>
                  </div>

                  {/* Offer Description Block */}
                  <div className="text-end">
                    <span className="inline-block text-[11px] sm:text-xs font-black text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full mb-1">
                      {isAr ? currentPkg.priceBadgeAr : currentPkg.priceBadgeEn}
                    </span>
                    <p className="text-[11px] text-slate-600 line-clamp-1 font-medium">
                      {isAr ? currentPkg.priceIncludesAr : currentPkg.priceIncludesEn}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column: Grand Package Content, Bullets & CTAs ── */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              
              {/* Category Pill Tag */}
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black border ${currentPkg.badgeColor}`}>
                  <Sparkles className="w-3 h-3 text-[#F97316]" />
                  <span>{isAr ? currentPkg.badgeAr : currentPkg.badgeEn}</span>
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-slate-900 tracking-tight leading-tight">
                  {isAr ? currentPkg.titleAr : currentPkg.titleEn}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  {isAr ? currentPkg.descriptionAr : currentPkg.descriptionEn}
                </p>
              </div>

              {/* 2-Column Feature Bullets (Exactly matching screenshot bullet style) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-2 border-t border-slate-100">
                {(isAr ? currentPkg.featuresAr : currentPkg.featuresEn).map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 leading-snug">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] shrink-0 mt-1.5" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4 border-t border-slate-100">
                <a
                  href={getWhatsAppBookingLink(currentPkg.whatsappMsg)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-black text-sm shadow-lg shadow-[#0284C7]/25 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                  <span>{isAr ? 'احجز الباقة عبر الواتساب (تأكيد فوري)' : 'Book Package via WhatsApp'}</span>
                  <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = (activePackageIdx + 1) % packages.length;
                    setActivePackageIdx(nextIdx);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <span>{isAr ? 'الباقة التالية' : 'Next Package'}</span>
                  <ChevronLeft className="w-4 h-4 text-slate-400 rtl:rotate-0 rotate-180" />
                </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default CompletePackagesSection;
