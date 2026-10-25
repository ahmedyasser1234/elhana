import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';

export const TermsConditionsPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead title={isAr ? "الشروط والأحكام | مجموعة الهنا" : "Terms & Conditions | El Hana Group Sharm El Sheikh"} description="Terms and conditions for booking safari, sea trips, and transfers in Sharm El Sheikh." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <Breadcrumbs items={[{ label: t('footer.terms') }]} />

        <SectionTitle title={t('footer.terms')} subtitle={isAr ? "قواعد التشغيل وشروط الرحلات" : "Operating rules and traveler terms."} center={false} />

        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-sky-100 shadow-md space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
          <h3 className="text-lg font-bold text-slate-900 font-heading">{isAr ? "1. تعليمات وسلوكيات الرحلة" : "1. Tour Operation & Conduct"}</h3>
          <p className="font-normal">{isAr ? "يجب على المشاركين في رحلات البيتش باجي والكار باجي التزام تعليمات السلامة الصادرة عن المرشدين. ارتداء الخوذات الواقية والنظارات أمر إلزامي." : "Participants on quad bike safaris and dune buggy tours must follow guide safety instructions at all times. Wearing protective helmets and goggles provided by El Hana Group is mandatory."}</p>

          <h3 className="text-lg font-bold text-slate-900 font-heading">{isAr ? "2. المواعيد والتوصيل من الفندق" : "2. Resort Pickup & Timing"}</h3>
          <p className="font-normal">{isAr ? "يتوجب على المسافرين التواجد في صالة استقبال (لوبي) الفندق قبل 10 دقائق من موعد التحرك المحدد. ينتظر السائق حتى 15 دقيقة كحد أقصى." : "Travelers are required to be present at their designated resort lobby 10 minutes prior to scheduled pickup time. Drivers will wait up to 15 minutes."}</p>

          <h3 className="text-lg font-bold text-slate-900 font-heading">{isAr ? "3. التراخيص والتأمين" : "3. Licensing & Insurance"}</h3>
          <p className="font-normal">{isAr ? "جميع سياراتنا وحافلاتنا واليخوت البحرية مرخصة ومطابقة لمعايير وزارة السياحة المصرية في جنوب سيناء ومغطاة بتأمين شامل للركاب." : "All vehicles and marine vessels operated by El Hana Group comply with South Sinai Ministry of Tourism regulations and carry full third-party passenger insurance."}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
