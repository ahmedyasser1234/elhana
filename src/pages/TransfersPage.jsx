import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TransferCalculator } from '../components/transfers/TransferCalculator';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { 
  Car, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  PlaneTakeoff, 
  Users, 
  Briefcase, 
  Award, 
  MapPin, 
  PhoneCall 
} from 'lucide-react';
import { VEHICLE_TYPES } from '../data/transfers';
import { GoogleMapLocation } from '../components/common/GoogleMapLocation';
import { useCurrency } from '../context/CurrencyContext';

export const TransfersPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { formatPrice } = useCurrency();

  const trustHighlights = [
    {
      icon: PlaneTakeoff,
      titleAr: "تتبع مواعيد الطيران حياً",
      titleEn: "Live Flight Tracking",
      descAr: "سائقنا يتابع موعد هبوط طائرتك وينتظرك حتى لو تأخرت الرحلة.",
      descEn: "Your driver tracks your flight status and waits even if delayed."
    },
    {
      icon: Clock,
      titleAr: "60 دقيقة انتظار مجاني",
      titleEn: "60 Min Free Waiting",
      descAr: "وقت كافٍ لاستلام الحقائب وإنهاء إجراءات الجوازات بدون أي رسوم.",
      descEn: "Plenty of time for baggage claim & customs with 0 extra fees."
    },
    {
      icon: Award,
      titleAr: "استقبال خاص بيافطة اسمك",
      titleEn: "Meet & Greet Nameplate",
      descAr: "السائق يستقبلك في صالة الوصول حاملاً لافتة باسمك للمساعدة.",
      descEn: "Driver waits in arrivals holding a sign with your name."
    },
    {
      icon: ShieldCheck,
      titleAr: "أسعار ثابتة بدون عداد",
      titleEn: "Fixed Transparent Rates",
      descAr: "سعر محدد وشامل مسبقاً، بدون مساومة أو مفاجآت عند الوصول.",
      descEn: "All-inclusive upfront pricing with zero haggling or meter surprises."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      titleAr: "احسب واحجز مشوارك أونلاين",
      titleEn: "Calculate & Book in 1 Min",
      descAr: "حدد مكان التحرك والوصول وفئة السيارة وادفع الآن أو كاش عند الاستلام.",
      descEn: "Select pickup, destination, and vehicle. Pay online or cash on arrival."
    },
    {
      step: 2,
      titleAr: "تأكيد فوري وتنسيق السائق",
      titleEn: "Instant Driver Coordination",
      descAr: "نرسل لك إشعاراً فورياً بتفاصيل الحجز ورقم السائق ونوع السيارة عبر WhatsApp.",
      descEn: "Instant confirmation with driver contact and car details sent via WhatsApp."
    },
    {
      step: 3,
      titleAr: "توصيل VIP مريح وآمن",
      titleEn: "Relaxing VIP Door-to-Door",
      descAr: "السائق يستقبلك في الموعد وينقلك في سيارة حديثة ومكيفة مباشرة حتى باب فندقك.",
      descEn: "Your chauffeur meets you on time and drives you directly to your hotel."
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-gradient-to-br from-sky-50/70 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0284C7]/8 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-[#F97316]/8 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? "خدمة الانتقالات الخاصة وتاكسي المطار في شرم الشيخ 24/7 | مجموعة الهنا" : "Private Hotel & Airport Transfers in Sharm El Sheikh 24/7 | El Hana"}
        description={isAr ? "احجز سيارات انتقال خاصة ومكيفة بين مطار شرم الشيخ الدولي وجميع فنادق نعمة، نبق، الهضبة، ودهب بأسعار ثابتة وتتبع لمواعيد الطيران." : "Book reliable private airport taxis and hotel transfers in Sharm El Sheikh, Naama Bay, Nabq, Hadaba, and Dahab with flight tracking."}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 relative z-10">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: isAr ? 'الانتقالات وتوصيل المطار' : 'Transfers' }]} />

        {/* ── 1. HERO SECTION ─────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-sky-200 text-[#0284C7] text-xs font-black uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-ping shrink-0" />
            <span>{isAr ? "خدمة توصيل خاصة وتاكسي مطار 24/7" : "24/7 Private VIP Airport Transfers"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-heading tracking-tight leading-tight">
            {isAr ? "انتقالات خاصة VIP بين المطار وفنادق شرم الشيخ" : "Private VIP Airport & Hotel Transfers in Sharm El Sheikh"}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
            {isAr 
              ? "سائق خاص بانتظارك في صالة الوصول مع يافطة باسمك، تتبع حي لمواعيد الطيران، 60 دقيقة انتظار مجاني بالمطار، وسيارات حديثة ومكيفة بأسعار ثابتة ومحددة مسبقاً."
              : "Private chauffeur waiting at arrivals with your nameplate, live flight monitoring, 60 minutes free airport waiting, and sanitized air-conditioned vehicles with guaranteed fixed rates."}
          </p>

          {/* Quick Value Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
              ✈️ {isAr ? "تتبع مواعيد الطيران حياً" : "Live Flight Tracking"}
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
              ⏳ {isAr ? "60 دقيقة انتظار مجاني" : "60 Min Free Waiting"}
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
              🙋‍♂️ {isAr ? "استقبال بيافطة اسمك" : "Meet & Greet Sign"}
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
              💵 {isAr ? "دفع كاش أو أونلاين" : "Cash or Online Payment"}
            </span>
          </div>
        </div>

        {/* ── 2. LIVE TRANSFER CALCULATOR WIDGET ─────────────── */}
        <TransferCalculator />

        {/* ── 3. FOUR CORE GUARANTEES ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-sky-100 shadow-md hover:shadow-xl hover:border-sky-300 transition-all duration-300 space-y-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center border border-sky-100 group-hover:scale-110 transition-transform shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 font-heading">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── 4. VEHICLE FLEET SHOWCASE ───────────────────────── */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#F97316] text-xs font-bold uppercase tracking-wider border border-orange-200">
              <Car className="w-3.5 h-3.5" />
              <span>{isAr ? "أسطول سيارات الهنا" : "Vehicle Fleet"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {isAr ? "اختر فئة السيارة الأنسب لرحلتك" : "Select Your Preferred Vehicle Class"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {isAr ? "جميع سياراتنا حديثة، مكيفة، ويتم تعقيمها وتنظيفها بالكامل قبل كل رحلة." : "All vehicles are modern, fully air-conditioned, and sanitized prior to every ride."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VEHICLE_TYPES.map((v) => (
              <div 
                key={v.id} 
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-[#0284C7]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Vehicle Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={v.image} 
                    alt={isAr ? v.nameAr : v.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <div className="absolute bottom-3 start-3">
                    <span className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-black shadow-md border border-white/20">
                      {isAr ? v.nameAr : v.name}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {isAr ? v.descriptionAr : v.description}
                    </p>
                    
                    {/* Capacity Specs */}
                    <div className="pt-2 space-y-2 text-xs text-slate-700 font-semibold border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#0284C7] shrink-0" />
                        <span>{isAr ? `تتسع حتى ${v.maxPassengers} ركاب` : `Up to ${v.maxPassengers} Passengers`}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{isAr ? `تتسع لـ ${v.maxLuggage} حقائب سفر كبيرة` : `Up to ${v.maxLuggage} Luggage Bags`}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{isAr ? "تكييف كامل + واي فاي مجاني بالسيارة" : "Full Air Conditioning + Free WiFi"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        {isAr ? "تبدأ من" : "Starting from"}
                      </span>
                      <span className="text-2xl font-black text-[#0369A1] font-heading">
                        {formatPrice(v.basePrice)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        window.scrollTo({ top: 320, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-[#0284C7] text-[#0284C7] hover:text-white text-xs font-black transition cursor-pointer shadow-2xs"
                    >
                      {isAr ? "احسب السعر واحجز" : "Select & Book"}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ── 5. HOW IT WORKS (3 SIMPLE STEPS) ────────────────── */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-sky-100 shadow-xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase text-[#0284C7] tracking-wider block">
              {isAr ? "خطوات بسيطة وسريعة" : "Easy 3-Step Process"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {isAr ? "كيف تعمل خدمة التوصيل معنا؟" : "How Our Private Transfers Work"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {howItWorks.map((st) => (
              <div 
                key={st.step} 
                className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3 relative text-start rtl:text-right"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white font-black text-sm flex items-center justify-center shadow-md">
                  {st.step}
                </div>
                <h3 className="text-base font-black text-slate-900 font-heading">
                  {isAr ? st.titleAr : st.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {isAr ? st.descAr : st.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 6. INTERACTIVE MAP HUB ───────────────────────────── */}
        <div className="space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl font-bold font-heading text-slate-900">
              {isAr ? "نغطي جميع مناطق وفنادق شرم الشيخ ودهب" : "We Cover All Sharm & Dahab Hotel Zones"}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {isAr ? "انتقالات مباشرة من صالة المطار إلى خليج نعمة، خليج نبق، الهضبة، رأس نصراني، السوق القديم، ودهب." : "Door-to-door shuttle covering Naama Bay, Nabq, Hadaba, Sharks Bay, Old Market, and Dahab."}
            </p>
          </div>
          <GoogleMapLocation defaultLocationId="airport" />
        </div>

        {/* ── 7. FREQUENTLY ASKED QUESTIONS ────────────────────── */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase text-[#0284C7] tracking-wider block">
              {isAr ? "إجابات فورية" : "Got Questions?"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {isAr ? "الأسئلة الشائعة حول توصيل المطار والفنادق" : "Airport & Hotel Transfer FAQs"}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {isAr ? "كل ما تود معرفته عن المواعيد، الحقائب، وطرق الدفع." : "Everything you need to know about pickup times, luggage, and payment."}
            </p>
          </div>
          <FAQAccordion />
        </div>

      </div>
    </div>
  );
};

export default TransfersPage;