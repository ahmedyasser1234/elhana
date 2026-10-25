import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { TransferCalculator } from '../components/transfers/TransferCalculator';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { Car, CheckCircle2 } from 'lucide-react';
import { VEHICLE_TYPES } from '../data/transfers';
import { GoogleMapLocation } from '../components/common/GoogleMapLocation';
import { useCurrency } from '../context/CurrencyContext';

export const TransfersPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { formatPrice } = useCurrency();

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-orange-50 via-white to-sky-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? "خدمة الانتقالات الخاصة والمطار في شرم الشيخ 24/7 | مجموعة الهنا" : "Private Hotel & Airport Transfers in Sharm El Sheikh"}
        description={isAr ? "احجز سيارات انتقال خاصة ومكيفة بين مطار شرم الشيخ الدولي وجميع فنادق نعمة، نبق، الهضبة، ودهب بأسعار ثابتة." : "Book reliable private airport taxis and hotel transfers in Sharm El Sheikh, Naama Bay, Nabq, Hadaba, and Dahab."}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        <Breadcrumbs items={[{ label: t('nav.transfers') }]} />

        {/* Header */}
        <SectionTitle
          badge={isAr ? "خدمة توصيل خاصة 24/7" : "24/7 Private Transportation"}
          title={t('transfers.title')}
          subtitle={t('transfers.subtitle')}
        />

        {/* Live Transfer Calculator */}
        <TransferCalculator />

        {/* Vehicle Fleet Showcase */}
        <div className="space-y-8">
          <SectionTitle
            badge={isAr ? "أسطول السيارات" : "Vehicle Fleet"}
            title={t('transfers.selectVehicle')}
            subtitle={isAr ? "جميع سياراتنا حديثة، مكيفة، ويتم تعقيمها وتنظيفها قبل كل رحلة." : "All vehicles are modern, air-conditioned, and sanitized prior to every ride."}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VEHICLE_TYPES.map((v) => (
              <div key={v.id} className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-orange-100 shadow-md space-y-4 flex flex-col justify-between hover:border-[#F97316] hover:shadow-xl transition duration-300">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-[#F97316] flex items-center justify-center font-bold">
                    <Car className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">{isAr ? v.nameAr : v.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{isAr ? v.descriptionAr : v.description}</p>
                  
                  <div className="pt-2 space-y-1.5 text-xs text-slate-700 font-semibold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                      <span>{isAr ? `حتى ${v.maxPassengers} ركاب` : `Max ${v.maxPassengers} Passengers`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                      <span>{isAr ? `حتى ${v.maxLuggage} حقائب كبيرة` : `Max ${v.maxLuggage} Suitcases`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                      <span>{isAr ? "تكييف كامل وواي فاي مجاني" : "Free Air-Conditioning & WiFi"}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-xs text-slate-400 font-bold uppercase">{t('common.startingFrom')}</span>
                  <span className="text-2xl font-black text-[#F97316] font-heading">{formatPrice(v.basePrice)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transfer Hub Map */}
        <div className="space-y-6">
          <GoogleMapLocation defaultLocationId="airport" />
        </div>

        {/* Transfer FAQs */}
        <div className="space-y-6">
          <SectionTitle
            title={t('common.faq')}
            subtitle={isAr ? "أبرز الأسئلة الشائعة حول انتقالات المطار والتوصيل بين الفنادق." : "Common questions regarding airport pickup and hotel shuttles."}
          />
          <FAQAccordion />
        </div>

      </div>
    </div>
  );
};

export default TransfersPage;
