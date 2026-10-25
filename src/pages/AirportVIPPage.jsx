import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { ShieldCheck, Plane, PlaneTakeoff, PlaneLanding, Star, Crown, CheckCircle2, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '../components/common/WhatsAppButton';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';

export const AirportVIPPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();

  const [selectedService, setSelectedService] = useState(null);

  const vipServices = [
    {
      id: "fast-track-arrival",
      title: isAr ? "خدمة الفاست تراك عند الوصول (Fast Track Arrival)" : "Sharm Airport Fast Track Arrival",
      type: "Arrival",
      price: 60,
      badge: "Most Popular",
      desc: isAr ? "إنهاء كافة إجراءات الجوازات والفيزا والجمارك في غضون 5 دقائق فقط مع مندوب خاص يسحب الحقائب فور وصولك." : "Skip passport lines and custom queues in under 5 minutes with a dedicated agent handling your luggage.",
      features: [
        isAr ? "مستقبل يقابلك عند بوابة الطائرة بيافطة اسمك" : "Personal agent meeting you right at the aircraft gate with your name sign",
        isAr ? "إنهاء ختم التأشيرة والفيزا بدون أي انتظار" : "Instant VIP visa stamp & passport clearance without queueing",
        isAr ? "مساعدة فورية في حمل الحقائب والأمتعة" : "Dedicated luggage porter assistance at baggage belt",
        isAr ? "توصيل مباشر إلى سيارتك الخاصة لجميع الفنادق" : "Direct escort to your private hotel transfer vehicle"
      ]
    },
    {
      id: "fast-track-departure",
      title: isAr ? "خدمة الفاست تراك عند المغادرة (Fast Track Departure)" : "Sharm Airport Fast Track Departure",
      type: "Departure",
      price: 60,
      badge: "Fast & Smooth",
      desc: isAr ? "تجاوز طوابير التفتيش ومكاتب تذاكر الطيران والجوازات عند العودة لبلدك بكل سهولة وراحة." : "Bypass security checks, airline check-in desks, and passport control lines when departing Sharm.",
      features: [
        isAr ? "استقبال خاص من خارج بوابة صالة المغادرة" : "Greeter welcoming you outside departure hall entrance",
        isAr ? "تجاوز طوابير تفتيش الأمتعة الأولى" : "Priority access through initial airport security scanning",
        isAr ? "إنهاء بوردنج الطيران وختم الجوازات مسار سريع" : "Fast-track airline counter check-in & passport exit stamp",
        isAr ? "توصيل حتى بوابة صعود الطائرة" : "Escort to your designated flight boarding gate"
      ]
    },
    {
      id: "vip-lounge-access",
      title: isAr ? "دخول صالة كبار الزوار (VIP Lounge Access)" : "VIP Airport Lounge Experience",
      type: "Lounge",
      price: 85,
      badge: "Luxury & Comfort",
      desc: isAr ? "استمتع بالراحة، الوجبات الفاخرة، المشروبات، والإنترنت السريع داخل صالة VIP المجهزة بالمطار قبل موعد رحلتك." : "Relax in comfort with gourmet snacks, open bar, high-speed Wi-Fi, and plush seating before your flight.",
      features: [
        isAr ? "دخول لمدة 3 ساعات لصالة كبار الزوار المجهزة بالكامل" : "3 Hours full access to Sharm Airport VIP Lounge",
        isAr ? "بوفيه مفتوح للمشروبات الساخنة والباردة والوجبات الفاخرة" : "Open buffet with hot/cold beverages, sandwiches & fresh pastries",
        isAr ? "واي فاي عالي السرعة وشاشات متابعة الطيران" : "High-speed Wi-Fi, charging stations & flight monitors",
        isAr ? "مساحة هادئة للأطفال والأسر ورياضات الاسترخاء" : "Quiet relaxation areas for families & business travelers"
      ]
    },
    {
      id: "royal-diamond-vip",
      title: isAr ? "باقة الماس الملكية (Royal Diamond VIP Package)" : "Royal Diamond VIP Arrival & Departure",
      type: "Full VIP",
      price: 250,
      badge: "Royal Luxury",
      desc: isAr ? "أرقى خدمة استقبال VIP كاملة من بوابة الطائرة بسيارة ليموزين خاصة إلى صالة كبار الزوار مع التوصيل للفندق." : "Ultimate VIP treatment including private tarmac limousine shuttle from airplane door, VIP lounge, and luxury hotel transfer.",
      features: [
        isAr ? "سيارة ليموزين VIP خاصة بنقلك من باب الطائرة" : "Private luxury limousine transfer directly from aircraft ramp",
        isAr ? "إنهاء كافة المعاملات في صالة كبار الزوار الشرفية" : "Passport clearance processed inside executive VIP lounge",
        isAr ? "حقائب مجهزة ومغلفة ومحملة ببروتوكول خاص" : "Private luggage handling & custom priority tagging",
        isAr ? "سيارة مرسيدس VIP للتوصيل من المطار للفندق" : "Luxury Mercedes VIP transport from airport to resort"
      ]
    }
  ];

  const handleBookVIP = (service) => {
    const msg = `Hello! I would like to book Sharm Airport VIP Service: ${service.title} (${formatPrice(service.price)}). Please provide pickup/flight details form.`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="pt-28 pb-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Glow Backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F97316]/15 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? "خدمات مطار شرم الشيخ VIP والفاست تراك | مجموعة الهنا" : "Sharm Airport VIP Fast Track & Lounge Services | El Hana Group"}
        description={isAr ? "احجز خدمة الفاست تراك واستقبال كبار الزوار بمطار شرم الشيخ وصالات VIP بدون أي طوابير." : "Book Sharm El Sheikh Airport VIP Fast Track, Meet & Assist, and VIP Lounge access. Skip all airport queues."}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <Breadcrumbs items={[{ label: isAr ? "خدمات المطار VIP" : "Airport VIP Services" }]} />

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Crown className="w-4 h-4" />
            <span>{isAr ? "خدمات الاستقبال الفاخرة 24/7" : "24/7 Luxury Airport Protocol"}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight">
            {isAr ? "خدمات مطار شرم الشيخ VIP والفاست تراك" : "Sharm El Sheikh Airport VIP & Fast Track"}
          </h1>
          <p className="text-sm md:text-base text-slate-400 font-normal leading-relaxed">
            {isAr 
              ? "وفر وقتك في المطار وتجنب طوابير الجوازات والتفتيش بفضل فريق الاستقبال الخاص بـ El Hana Group عند الوصول أو المغادرة."
              : "Save time and skip long passport queues at Sharm Airport with our priority VIP meet & assist team."}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vipServices.map((service) => (
            <div 
              key={service.id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 hover:border-[#0284C7]/50 transition duration-300 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-[#0284C7]/20 border border-[#0284C7]/40 text-[#38BDF8]">
                    {service.badge}
                  </span>
                  <div className="text-2xl font-black font-heading text-amber-400">
                    {formatPrice(service.price)}
                    <span className="text-xs text-slate-400 font-normal"> / {isAr ? 'مسافر' : 'Traveler'}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-heading text-white">{service.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{service.desc}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleBookVIP(service)}
                  className="w-full shadow-lg"
                  icon={Sparkles}
                >
                  {isAr ? "احجز خدمة VIP الآن" : "Book VIP Service Now"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Micro Trust Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-sky-900/40 via-slate-900 to-amber-900/40 border border-slate-800 text-center space-y-4">
          <div className="flex justify-center items-center gap-2 text-amber-400">
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <h4 className="text-lg md:text-xl font-bold font-heading text-white">
            {isAr ? "خدمة معتمدة رسمياً ومتاحة لجميع رحلات الطيران بالمطار 24 ساعة" : "Officially Approved & Available for All Airlines 24/7"}
          </h4>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            {isAr ? "تنسيق كامل مسبق مع سلطات المطار لضمان أقصى درجات السرعة والرفاهية لرحلتك." : "Direct coordination with airport authorities ensuring maximum speed, comfort and privacy."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AirportVIPPage;
