import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';

export const CancellationPolicyPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-orange-50 via-white to-sky-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead title={isAr ? "سياسة الإلغاء والاسترداد | مجموعة الهنا" : "Cancellation & Refund Policy | El Hana Group"} description="Clear and fair cancellation policy for all Sharm El Sheikh desert and sea tours." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <Breadcrumbs items={[{ label: t('footer.cancellationPolicy') }]} />

        <SectionTitle title={t('footer.cancellationPolicy')} subtitle={isAr ? "سياسة إلغاء مرنة بدون أي تعقيدات." : "Flexible cancellation terms."} center={false} />

        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-orange-100 shadow-md space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
          <h3 className="text-lg font-bold text-slate-900 font-heading">{isAr ? "1. مهلة الإلغاء المجاني" : "1. Free Cancellation Window"}</h3>
          <p className="font-normal">{isAr ? "يمكنك إلغاء أي رحلة أو توصيل مجاناً قبل 24 ساعة من موعد انطلاق الرحلة واسترداد المبلغ بالكامل 100% دون أي رسوم إلغاء." : "You can cancel any experience or transfer up to 24 hours before trip departure with 100% full refund and zero penalty fees."}</p>

          <h3 className="text-lg font-bold text-slate-900 font-heading">{isAr ? "2. الظروف الجوية والبحرية" : "2. Weather & Maritime Conditions"}</h3>
          <p className="font-normal">{isAr ? "في حال إلغاء الرحلة البحرية من قبل حرس الحدود أو بسبب شدة الرياح والأمواج، يسترد الضيف 100% من المبلغ أو يتم تعديل موعد الرحلة لموعد آخر مجاناً." : "If a sea trip or marine cruise is cancelled by the Egyptian Coast Guard due to high waves or strong winds, guests receive a 100% full refund or free rescheduling to another day."}</p>

          <h3 className="text-lg font-bold text-slate-900 font-heading">{isAr ? "3. حجوزات الدفع عند الوصول" : "3. Pay on Arrival Bookings"}</h3>
          <p className="font-normal">{isAr ? "في حال اختيار 'الدفع نقداً عند الوصول'، يمكنك تعديل أو إلغاء حجزك ببساطة عبر مراسلة فريقنا على الواتساب دون أي رسوم مالية." : "If you selected 'Cash on Arrival', you can modify or cancel your booking simply by messaging our team on WhatsApp without any financial charge."}</p>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicyPage;
