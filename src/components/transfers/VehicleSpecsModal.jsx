import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Briefcase, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Wifi, 
  Wind, 
  Car, 
  Award,
  Calendar
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const VehicleSpecsModal = ({ 
  isOpen, 
  onClose, 
  car, 
  onSelectCar, 
  calculatedPrice,
  isRoundTrip = false 
}) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { formatPrice } = useCurrency();

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!isOpen || !car) return null;

  const images = car.gallery && car.gallery.length > 0 ? car.gallery : [car.image];
  const specs = isAr ? car.specsAr : car.specsEn;

  const handleSelectAndClose = () => {
    if (onSelectCar) {
      onSelectCar(car.id);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[99999] bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-sky-100 shadow-2xl relative space-y-5 text-slate-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-slate-100 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2.5 py-1 rounded-full bg-[#0284C7] text-white text-[10px] font-black uppercase tracking-wider shrink-0">
              {isAr ? car.tagAr : car.tagEn}
            </span>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-black font-heading text-slate-900 truncate">
                {isAr ? car.nameAr : car.name}
              </h3>
              <span className="text-[11px] text-slate-500 font-semibold block">
                {isAr ? `موديل ${car.model}` : `Model ${car.model}`}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-5 space-y-6">

          {/* Interactive Photo Gallery Viewport */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
              <img
                src={images[activeImgIdx] || images[0]}
                alt={isAr ? car.nameAr : car.name}
                className="w-full h-full object-cover transition-all duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Prev / Next Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImgIdx(prev => (prev > 0 ? prev - 1 : images.length - 1))}
                    className="absolute start-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md shadow-md transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveImgIdx(prev => (prev < images.length - 1 ? prev + 1 : 0))}
                    className="absolute end-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md shadow-md transition cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </>
              )}

              {/* Photo counter pill */}
              <div className="absolute bottom-3 end-3 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                {activeImgIdx + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImgIdx(i)}
                    className={`w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                      activeImgIdx === i 
                        ? 'border-[#0284C7] ring-2 ring-sky-300 scale-105 shadow-sm' 
                        : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {isAr ? car.descriptionAr : car.descriptionEn}
            </p>
          </div>

          {/* Detailed Specifications Sheet */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>{isAr ? "مواصفات وتجهيزات السيارة:" : "Vehicle Specifications & Features:"}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              
              {/* Passengers */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? "سعة الركاب" : "Passenger Capacity"}</span>
                  <span className="font-extrabold text-slate-900">{specs?.passengers || `${car.maxPassengers} ركاب`}</span>
                </div>
              </div>

              {/* Luggage */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? "سعة الأمتعة والحقائب" : "Luggage Trunk"}</span>
                  <span className="font-extrabold text-slate-900">{specs?.luggage || `${car.maxLuggage} حقائب كبيرة`}</span>
                </div>
              </div>

              {/* Climate A/C */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? "نظام التكييف" : "Climate Control"}</span>
                  <span className="font-extrabold text-slate-900">{specs?.ac || "تكييف هواء فائق التبريد"}</span>
                </div>
              </div>

              {/* Comfort & Seating */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? "المقاعد والراحة" : "Seating Comfort"}</span>
                  <span className="font-extrabold text-slate-900">{specs?.comfort || "مقاعد مريحة وعزل صوتي"}</span>
                </div>
              </div>

              {/* WiFi & Charging */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? "الاتصال والشحن" : "Connectivity"}</span>
                  <span className="font-extrabold text-slate-900">{specs?.wifi || "شواحن هواتف USB"}</span>
                </div>
              </div>

              {/* Chauffeur Service */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{isAr ? "خدمة السائق" : "Private Chauffeur"}</span>
                  <span className="font-extrabold text-slate-900">{specs?.driver || "سائق خاص بزي رسمي مع لافتة استقبال"}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Price Preview Card */}
          <div className="bg-gradient-to-br from-sky-50 to-orange-50/50 p-4 rounded-2xl border border-sky-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                {isAr ? "تكلفة المشوار لهذه السيارة" : "Trip Rate for This Vehicle"}
              </span>
              <div className="text-2xl font-black text-[#0284C7] font-heading mt-0.5">
                {formatPrice(calculatedPrice || car.basePrice)}
              </div>
              <span className="text-[11px] text-emerald-700 font-bold block">
                ✓ {isRoundTrip 
                    ? (isAr ? "السعر شامل الذهاب والعودة والسائق والوقود" : "All inclusive for both outbound & return") 
                    : (isAr ? "شامل السائق والوقود وتتبع الطيران" : "Includes driver, fuel & flight tracking")}
              </span>
            </div>

            <button
              type="button"
              onClick={handleSelectAndClose}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] hover:from-[#0369A1] hover:to-[#0c4a6e] text-white font-black text-xs sm:text-sm shadow-md transition cursor-pointer active:scale-95 shrink-0"
            >
              {isAr ? "اختر هذه السيارة للحجز" : "Select This Car"}
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
          >
            {isAr ? "إغلاق" : "Close"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default VehicleSpecsModal;
