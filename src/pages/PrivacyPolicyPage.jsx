import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';

export const PrivacyPolicyPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead title={isAr ? "سياسة الخصوصية | مجموعة الهنا" : "Privacy Policy | El Hana Group Sharm El Sheikh"} description="Privacy policy and data protection practices for El Hana Group in Sharm El Sheikh." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <Breadcrumbs items={[{ label: t('footer.privacyPolicy') }]} />

        <SectionTitle title={t('footer.privacyPolicy')} subtitle={isAr ? "آخر تحديث: يناير 2026" : "Last updated: January 2026"} center={false} />

        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-sky-100 shadow-md space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
          <h3 className="text-lg font-bold text-slate-900 font-heading">{isAr ? "1. البيانات التي نجمعها" : "1. Information We Collect"}</h3>
          <p className="font-normal">{isAr ? "نجمع البيانات الشخصية مثل الاسم الكامل، البريد الإلكتروني، رقم الواتساب، واسم الفندق فقط لغرض تنظيم الرحلات والتوصيل بشرم الشيخ." : "We collect personal information such as full name, email address, WhatsApp telephone number, and hotel location solely for the purpose of fulfilling your excursion bookings and hotel transfers in Sharm El Sheikh."}</p>

          <h3 className="text-lg font-bold text-slate-900 font-heading">{isAr ? "2. كيف نستخدم بياناتك" : "2. How We Use Your Data"}</h3>
          <p className="font-normal">{isAr ? "تُستخدم بياناتك حصرياً لتنسيق مواعيد التوصيل مع سائقي الفنادق وإرسال إيصالات الحجز. نحن لا نبيع ولا نؤجر بيانات المسافرين لأي طرف ثالث." : "Your details are used strictly to coordinate pickup times with resort lobby drivers and send booking vouchers. We never sell, rent, or trade traveler data to third parties."}</p>

          <h3 className="text-lg font-bold text-slate-900 font-heading">{isAr ? "3. الأمان والدفع" : "3. Security & Payments"}</h3>
          <p className="font-normal">{isAr ? "في معاملات الدفع عبر الإنترنت، نستخدم بوابات دفع تشفيرية مشفرة بـ SSL 256-bit. خيارات الدفع عند الوصول لا تتطلب أي تخزين لبيانات البطاقة." : "For online payment transactions, financial data is processed via PCI-DSS compliant payment gateways with SSL 256-bit encryption. Cash on arrival bookings require zero upfront card storage."}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
