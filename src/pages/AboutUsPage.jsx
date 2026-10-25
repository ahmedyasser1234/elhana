import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { Button } from '../components/common/Button';
import { Compass, ShieldCheck, MapPin, Award, PhoneCall } from 'lucide-react';
import { getWhatsAppLink } from '../components/common/WhatsAppButton';

export const AboutUsPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const teamMembers = [
    {
      name: isAr ? "الشيخ سالم البدوي" : "Sheikh Salem El-Bedawi",
      role: isAr ? "كبير مرشدي صحراء سيناء" : "Head Sinai Desert Guide",
      image: "/images/real/atv-quad-hero.png",
      bio: isAr ? "مواليد وديان سيناء بخبرة تزيد عن 20 عاماً في دروب وجبال الصحراء." : "Born and raised in the Sinai valleys with over 20 years of mountain navigation experience."
    },
    {
      name: isAr ? "الكابتن طارق منصور" : "Captain Tarek Mansour",
      role: isAr ? "مدرب غوص PADI ماستر وقبطان يخت" : "PADI Master Scuba Instructor & Captain",
      image: "/images/real/atv-quad.jpg",
      bio: isAr ? "مدرب غوص معتمد بأكثر من 4,000 غطسة مسجلة بمحمية رأس محمد وتيران." : "Certified diving instructor with over 4,000 logged dives in Ras Mohammed and Tiran."
    },
    {
      name: isAr ? "إيلينا روستوفا" : "Elena Rostova",
      role: isAr ? "مديرة العلاقات الدولية للزوار" : "International Guest Relations Manager",
      image: "/images/real/camel-caravan.jpg",
      bio: isAr ? "تتحدث الإنجليزية والروسية والإيطالية لضمان خدمة سلسة لزوار الفنادق." : "Fluent in English, Russian & Italian to ensure smooth communication for every resort guest."
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? "من نحن | مجموعة الهنا للسياحة والسفاري بشرم الشيخ" : "About El Hana Group | Premier Sharm El Sheikh Tour Operator"}
        description={isAr ? "تعرف على مجموعة الهنا للسياحة والسفاري، المشغل الرائد لرحلات البيتش باجي واليخوت الفاخرة والانتقالات بشرم الشيخ." : "Learn about El Hana Group, Sharm El Sheikh's top-rated luxury safari and Red Sea excursion operator."}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">

        {/* Taller Luxury Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-10 md:p-14 min-h-[420px] sm:min-h-[500px] md:min-h-[560px] flex flex-col justify-between border border-sky-400/30 shadow-2xl">
          <img
            src="/images/real/family-buggy-ride.jpg"
            alt="Sinai Mountains Sunset"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75 transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent rtl:bg-gradient-to-l"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-slate-950/30"></div>

          {/* Top Overlapping Breadcrumbs */}
          <div className="relative z-10">
            <Breadcrumbs items={[{ label: t('nav.about') }]} variant="hero" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0284C7]/25 border border-[#0284C7]/50 text-[#38BDF8] font-extrabold text-xs uppercase tracking-wider backdrop-blur-md shadow-md">
              <Compass className="w-4 h-4" /> <span>{isAr ? "تراث سيناء وضيافة البحر الأحمر" : "Sinai Heritage & Red Sea Hospitality"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white leading-tight drop-shadow-md">
              {isAr ? "نصنع ذكريات لا تُنسى في " : "Crafting Unforgettable "}
              <span className="text-[#F97316]">{isAr ? "قلب سيناء" : "Sinai Memories"}</span>
            </h1>
            <p className="text-slate-200 text-sm md:text-base lg:text-lg leading-relaxed font-medium drop-shadow-sm">
              {isAr
                ? "تأسست مجموعة الهنا في شرم الشيخ بشغف واحد: إظهار السحر الحقيقي لجنوب سيناء لضيوفنا — من كثبان الصحراء الذهبية والليالي البدوية إلى الشعاب المرجانية الفيروزية في البحر الأحمر."
                : "Founded in Sharm El Sheikh, El Hana Group was created with a single passion: to show travelers the true magic of South Sinai—from the golden desert dunes and Bedouin star nights to the turquoise marine reefs of the Red Sea."}
            </p>
          </div>
        </div>

        {/* Story & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SectionTitle
              badge={isAr ? "قصتنا" : "Our Story"}
              title={isAr ? "سياحة أصيلة في سيناء مبنية على الثقة" : "Authentic Sinai Tourism Built on Trust"}
              subtitle={isAr ? "نجمع بين التراث البدوي المحلي ومعايير الخدمة الفندقية الفاخرة." : "We combine local Bedouin heritage with international 5-star service standards."}
              center={false}
            />
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
              {isAr
                ? "على عكس وكالات الحجز الوسطية، نمتلك ونشغل أسطولنا الخاص من مركبات البيتش باجي الـ 250cc، الكار باجي، اليخوت الفاخرة، وحافلات التوصيل المكيفة. كل رحلة يقودها مرشدون محليون معتمدون يعرفون كل وادٍ وشعب مرجاني عن ظهر قلب."
                : "Unlike generic booking agencies, we operate our own fleet of 250cc Yamaha quad bikes, custom dune buggies, VIP luxury yachts, and private air-conditioned shuttle minivans. Every tour is led by certified local guides who know every valley and coral reef by heart."}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-100 shadow-md space-y-1">
                <div className="text-2xl font-black text-[#0284C7] font-heading">15,000+</div>
                <div className="text-xs text-slate-500 font-bold">{isAr ? "سائح ومغامر سعيد" : "Happy Vacationers"}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-orange-100 shadow-md space-y-1">
                <div className="text-2xl font-black text-[#F97316] font-heading">4.9 / 5</div>
                <div className="text-xs text-slate-500 font-bold">{isAr ? "متوسط تقييم الضيوف" : "Average Guest Rating"}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-sky-100 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-[#0284C7] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">{isAr ? "الأمان أولاً" : "Safety First"}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{isAr ? "معدات أمان كاملة، خوذات حماية، وقباطنة غوص معتمدون." : "Full safety gear, helmets, PADI dive masters, and regular equipment checks."}</p>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-orange-100 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-[#F97316] flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">{isAr ? "توصيل مجاني" : "Lobby Pickup"}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{isAr ? "انتقالات مجانية من وإلى لوبي جميع فنادق شرم الشيخ." : "Complimentary hotel lobby transfers for all Sharm resort districts."}</p>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-sky-100 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-[#0284C7] flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">{isAr ? "شركة مرخصة" : "Licensed Operator"}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{isAr ? "سجل سياحي رسمي معتمد من وزارة السياحة المصرية." : "Fully registered and licensed under the Egyptian Ministry of Tourism."}</p>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">{isAr ? "دعم 24/7" : "24/7 WhatsApp"}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{isAr ? "فريق خدمة عملاء متواجد على مدار الساعة للرد على استفساراتكم." : "Multilingual staff available at any hour to assist with trip questions."}</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <SectionTitle
            badge={isAr ? "فريقنا المحلي" : "Our Local Team"}
            title={isAr ? "تعرف على خبراء مغامرات سيناء" : "Meet the Sinai Experts"}
            subtitle={isAr ? "المرشدون المحترفون وقباطنة الغوص الذين سيرافقونك في رحلتك." : "The passionate guides and diving captains behind your adventure."}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden border border-sky-100 shadow-md p-6 text-center space-y-4">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#0284C7]" />
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-heading">{member.name}</h4>
                  <div className="text-xs text-[#0284C7] font-extrabold uppercase tracking-wider">{member.role}</div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 border border-sky-400/30 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl font-extrabold font-heading text-white">{isAr ? "هل لديك أي استفسار قبل الحجز؟" : "Have Questions Before Booking?"}</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">{isAr ? "تحدث مباشرة مع فريقنا عبر الواتساب للحصول على خصومات المجموعات أو الرحلات الخاصة." : "Chat directly with our team on WhatsApp for custom group discounts or private charter itineraries."}</p>
          <div className="flex justify-center gap-4">
            <a href={getWhatsAppLink()} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" size="lg" icon={PhoneCall}>
                {t('common.askWhatsapp')}
              </Button>
            </a>
            <Link to="/experiences">
              <Button variant="primary" size="lg">
                {t('experiences.exploreAll')}
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUsPage;
