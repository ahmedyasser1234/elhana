import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { HelpCircle, PhoneCall } from 'lucide-react';
import { getWhatsAppLink } from '../components/common/WhatsAppButton';
import { Button } from '../components/common/Button';

export const FAQPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-orange-50 via-white to-sky-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? "الأسئلة الشائعة والمركز المساعد | مجموعة الهنا" : "FAQ & Help Center | El Hana Group Sharm El Sheikh"}
        description={isAr ? "جميع الأسئلة والإجابات الشائعة حول حجز رحلات البيتش باجي، اليخوت، مواعيد التوصيل، وسياسات الإلغاء بشرم الشيخ." : "Frequently asked questions about quad biking, dune buggies, Bedouin dinners, sea cruises, pickup locations, and cancellation policy in Sharm El Sheikh."}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <Breadcrumbs items={[{ label: t('nav.faq') }]} />

        <SectionTitle
          badge={isAr ? "مركز المساعدة" : "Help Center"}
          title={t('common.faq')}
          subtitle={isAr ? "كل ما تحتاج معرفته قبل حجز مغامراتك في شرم الشيخ." : "Everything you need to know before booking your Sharm El Sheikh adventures."}
        />

        <FAQAccordion />

        <div className="bg-slate-900 text-white rounded-3xl p-8 text-center max-w-3xl mx-auto border border-sky-400/30 space-y-4 shadow-2xl">
          <HelpCircle className="w-10 h-10 text-[#0284C7] mx-auto" />
          <h3 className="text-xl font-bold font-heading">{isAr ? "هل ما زال لديك أي سؤال؟" : "Still Have Questions?"}</h3>
          <p className="text-xs text-slate-300 font-normal">{isAr ? "فريق خدمة العملاء متواجد أونلاين 24/7 عبر الواتساب للإجابة عن جميع استفساراتك." : "Our customer support team is online 24/7 on WhatsApp to answer any specific inquiry."}</p>
          <div>
            <a href={getWhatsAppLink()} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" size="md" icon={PhoneCall}>
                {t('common.askWhatsapp')}
              </Button>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQPage;
