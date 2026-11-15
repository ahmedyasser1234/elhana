import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight, 
  ArrowLeftRight,
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Briefcase,
  PlaneTakeoff,
  MessageCircle
} from 'lucide-react';
import { SHARM_LOCATIONS, VEHICLE_TYPES } from '../../data/transfers';
import { SHARM_ZONES } from '../../data/sharmHotels';
import { useToast } from '../../context/ToastContext';
import { useCurrency } from '../../context/CurrencyContext';
import { getWhatsAppLink } from '../common/WhatsAppButton';

export const TransferCalculator = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();

  const [pickup, setPickup] = useState(SHARM_LOCATIONS[0].id);
  const [dropoff, setDropoff] = useState(SHARM_LOCATIONS[1].id);
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_TYPES[0].id);
  const [transferDate, setTransferDate] = useState(
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(new Date())
  );
  const [transferTime, setTransferTime] = useState('12:00');
  const [passengers, setPassengers] = useState(2);

  const pickupObj = SHARM_LOCATIONS.find(l => l.id === pickup) || SHARM_LOCATIONS[0];
  const dropoffObj = SHARM_LOCATIONS.find(l => l.id === dropoff) || SHARM_LOCATIONS[1];
  const vehicle = VEHICLE_TYPES.find(v => v.id === selectedVehicle) || VEHICLE_TYPES[0];

  let distanceMultiplier = 1.0;
  if (
    pickupObj?.zoneId === 'dahab' || 
    dropoffObj?.zoneId === 'dahab' || 
    pickupObj?.name?.includes('Dahab') || 
    dropoffObj?.name?.includes('Dahab')
  ) {
    distanceMultiplier = 2.8;
  } else if (
    (pickupObj?.id === 'ssh-airport' || dropoffObj?.id === 'ssh-airport') && 
    (pickupObj?.zoneId === 'nabq' || dropoffObj?.zoneId === 'nabq')
  ) {
    distanceMultiplier = 1.2;
  }

  const calculatedPriceInUSD = Math.round(vehicle.basePrice * distanceMultiplier);

  // Swap pickup & dropoff
  const handleSwapLocations = () => {
    const prevPickup = pickup;
    setPickup(dropoff);
    setDropoff(prevPickup);
  };

  // Popular route presets
  const popularRoutes = [
    {
      nameAr: "مطار شرم ← خليج نعمة",
      nameEn: "Airport → Naama Bay",
      pickupId: "ssh-airport",
      dropoffId: SHARM_LOCATIONS.find(l => l.zoneId === 'naama_bay')?.id || SHARM_LOCATIONS[1].id
    },
    {
      nameAr: "مطار شرم ← خليج نبق",
      nameEn: "Airport → Nabq Bay",
      pickupId: "ssh-airport",
      dropoffId: SHARM_LOCATIONS.find(l => l.zoneId === 'nabq')?.id || SHARM_LOCATIONS[2].id
    },
    {
      nameAr: "مطار شرم ← الهضبة",
      nameEn: "Airport → Hadaba",
      pickupId: "ssh-airport",
      dropoffId: SHARM_LOCATIONS.find(l => l.zoneId === 'hadaba')?.id || SHARM_LOCATIONS[3].id
    },
    {
      nameAr: "شرم الشيخ ← دهب",
      nameEn: "Sharm → Dahab",
      pickupId: "ssh-airport",
      dropoffId: SHARM_LOCATIONS.find(l => l.zoneId === 'dahab')?.id || SHARM_LOCATIONS[4].id
    }
  ];

  const handleBookTransfer = () => {
    const pickupName = isAr ? pickupObj.nameAr : pickupObj.name;
    const dropoffName = isAr ? dropoffObj.nameAr : dropoffObj.name;
    
    showToast(
      isAr 
        ? `تم حفظ حجز التوصيل من ${pickupName} إلى ${dropoffName}! جاري الانتقال لتأكيد الحجز.` 
        : `Transfer from ${pickupName} to ${dropoffName} saved! Proceeding to checkout.`, 
      'success'
    );

    navigate('/checkout', {
      state: {
        isTransferBooking: true,
        pickup: pickupName,
        dropoff: dropoffName,
        vehicleName: isAr ? vehicle.nameAr : vehicle.name,
        vehicleId: vehicle.id,
        routeNames: [pickupObj.name, dropoffObj.name],
        date: transferDate,
        time: transferTime,
        passengers,
        price: calculatedPriceInUSD
      }
    });
  };

  const whatsappMessage = isAr
    ? `مرحباً! أود حجز توصيل خاص مع الهنا:\n• خط السير: من ${pickupObj.nameAr} إلى ${dropoffObj.nameAr}\n• فئة السيارة: ${vehicle.nameAr}\n• الموعد: ${transferDate} الساعة ${transferTime}\n• عدد الركاب: ${passengers}\n• السعر التقديري: $${calculatedPriceInUSD}`
    : `Hello! I would like to book a private transfer with El Hana:\n• Route: From ${pickupObj.name} to ${dropoffObj.name}\n• Vehicle: ${vehicle.name}\n• Date & Time: ${transferDate} at ${transferTime}\n• Passengers: ${passengers}\n• Estimated Rate: $${calculatedPriceInUSD}`;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-sky-100 shadow-2xl space-y-6 max-w-4xl mx-auto relative overflow-hidden">
      
      {/* Decorative top gradient bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#F97316]"></div>

      {/* Header Box */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0284C7] font-bold text-xs uppercase tracking-wider border border-sky-200 shadow-2xs">
            <Car className="w-3.5 h-3.5" />
            <span>{isAr ? "سيارات خاصة وتاكسي المطار 24 ساعة" : "Private Shuttle & Airport Taxi 24/7"}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
            {isAr ? "حساب تسعيرة المشوار والحجز الفوري" : "Calculate Fare & Book Instantly"}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {isAr ? "سعر ثابت شامل السائق والبنزين وبدون أي رسوم خفية" : "Guaranteed fixed pricing with zero hidden fees"}
          </p>
        </div>

        {/* Live Estimated Price Card */}
        <div className="bg-gradient-to-br from-sky-50 to-orange-50/50 p-4 rounded-2xl border border-sky-200/80 text-start md:text-end shrink-0 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
            {isAr ? "السعر الإجمالي للمركبة" : "Total Vehicle Fare"}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#0369A1] font-heading mt-0.5">
            {formatPrice(calculatedPriceInUSD)}
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
            ✓ {isAr ? "ادفع الآن أو كاش عند الوصول" : "Pay online or cash upon arrival"}
          </span>
        </div>
      </div>

      {/* Quick Popular Route Chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
          {isAr ? "خطوط التوصيل الأكثر طلباً (اختر بنقرة واحدة):" : "Most Popular Routes (Click to select):"}
        </span>
        <div className="flex flex-wrap gap-2">
          {popularRoutes.map((route, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setPickup(route.pickupId);
                setDropoff(route.dropoffId);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-[#0284C7] border border-slate-200 hover:border-sky-300 text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs"
            >
              {isAr ? route.nameAr : route.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Locations Selection with Swap Button */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
        
        {/* Pickup Location (5 cols) */}
        <div className="md:col-span-5 space-y-1.5">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>{isAr ? "مكان التحرك / الاستلام (Pickup)" : "Pickup Location"}</span>
          </label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0284C7] focus:bg-white shadow-xs cursor-pointer"
          >
            {SHARM_ZONES.map((zone) => {
              const zoneHotels = SHARM_LOCATIONS.filter((h) => h.zoneId === zone.id);
              if (zoneHotels.length === 0) return null;
              return (
                <optgroup
                  key={zone.id}
                  label={isAr ? zone.nameAr : zone.nameEn}
                >
                  {zoneHotels.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {isAr ? loc.nameAr : loc.name} ({isAr ? loc.categoryAr : loc.category})
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        </div>

        {/* Swap Button (1 col) */}
        <div className="md:col-span-1 flex items-center justify-center pt-2 md:pt-5">
          <button
            type="button"
            onClick={handleSwapLocations}
            title={isAr ? "عكس اتجاه المشوار" : "Swap pickup and drop-off"}
            aria-label={isAr ? "عكس اتجاه المشوار" : "Swap pickup and drop-off"}
            className="w-10 h-10 rounded-2xl bg-sky-50 hover:bg-[#0284C7] text-[#0284C7] hover:text-white border border-sky-200 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-xs active:scale-90 cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dropoff Location (5 cols) */}
        <div className="md:col-span-5 space-y-1.5">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
            <span>{isAr ? "مكان الوصول / التوصيل (Drop-off)" : "Drop-off Location"}</span>
          </label>
          <select
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#F97316] focus:bg-white shadow-xs cursor-pointer"
          >
            {SHARM_ZONES.map((zone) => {
              const zoneHotels = SHARM_LOCATIONS.filter((h) => h.zoneId === zone.id);
              if (zoneHotels.length === 0) return null;
              return (
                <optgroup
                  key={zone.id}
                  label={isAr ? zone.nameAr : zone.nameEn}
                >
                  {zoneHotels.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {isAr ? loc.nameAr : loc.name} ({isAr ? loc.categoryAr : loc.category})
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        </div>

      </div>

      {/* Date, Time & Passengers Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        
        {/* Date Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>{isAr ? "تاريخ الرحلة" : "Transfer Date"}</span>
          </label>
          <input
            type="date"
            value={transferDate}
            min={new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(new Date())}
            onChange={(e) => setTransferDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0284C7] focus:bg-white"
          />
        </div>

        {/* Time Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>{isAr ? "وقت التحرك أو وصول الطائرة" : "Pickup / Flight Time"}</span>
          </label>
          <input
            type="time"
            value={transferTime}
            onChange={(e) => setTransferTime(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0284C7] focus:bg-white"
          />
        </div>

        {/* Passengers Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>{isAr ? "عدد الركاب" : "Passengers"}</span>
          </label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0284C7] focus:bg-white cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map((num) => (
              <option key={num} value={num}>
                {num} {isAr ? 'ركاب' : 'Passengers'}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Vehicle Class Choice */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black uppercase tracking-wider text-slate-900 block">
            {isAr ? "اختر فئة السيارة المناسبة لحجم مجموعتك:" : "Select Vehicle Category:"}
          </label>
          <span className="text-[11px] text-slate-500 font-semibold">
            {isAr ? "جميع الفئات مكيفة ومجهزة بالكامل" : "All classes fully A/C equipped"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {VEHICLE_TYPES.map((v) => {
            const vehiclePriceInUSD = Math.round(v.basePrice * distanceMultiplier);
            const isSelected = selectedVehicle === v.id;

            return (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v.id)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-3 relative group ${
                  isSelected
                    ? 'bg-slate-900 text-white border-[#0284C7] shadow-xl scale-[1.02]'
                    : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-sky-300 shadow-2xs'
                }`}
              >
                {/* Active check pill */}
                {isSelected && (
                  <div className="absolute top-3 end-3 w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-xs font-black shadow-sm">
                    ✓
                  </div>
                )}

                <div className="space-y-2">
                  <div className="font-black text-sm leading-snug">
                    {isAr ? v.nameAr : v.name}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-semibold opacity-90">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-sky-400" />
                      {v.maxPassengers} {isAr ? 'ركاب' : 'Seats'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-amber-400" />
                      {v.maxLuggage} {isAr ? 'حقائب' : 'Bags'}
                    </span>
                  </div>

                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                    {isAr ? v.descriptionAr : v.description}
                  </p>
                </div>

                <div className={`pt-3 border-t flex items-baseline justify-between ${isSelected ? 'border-slate-800' : 'border-slate-200/80'}`}>
                  <span className={`text-[10px] uppercase font-bold ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                    {isAr ? 'السعر المحدد' : 'Fixed Rate'}
                  </span>
                  <span className="text-xl font-black font-heading text-[#38BDF8]">
                    {formatPrice(vehiclePriceInUSD)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons & Trust Line */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleBookTransfer}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] hover:from-[#0369A1] hover:to-[#0c4a6e] text-white font-black text-sm sm:text-base shadow-lg shadow-sky-600/30 hover:shadow-sky-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>
              {isAr 
                ? `احجز مشوارك الآن (${formatPrice(calculatedPriceInUSD)})` 
                : `Book Transfer Now (${formatPrice(calculatedPriceInUSD)})`}
            </span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <a
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-2 border-emerald-300/80 font-black text-xs sm:text-sm rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.99]"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span>{isAr ? "تنسيق وحجز سريع عبر واتساب" : "Instant WhatsApp Coordination"}</span>
          </a>
        </div>

        {/* 3 Trust Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <PlaneTakeoff className="w-4 h-4 text-[#0284C7] shrink-0" />
            <span>{isAr ? "متابعة حية لمواعيد الطيران" : "Live flight tracking"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{isAr ? "60 دقيقة انتظار مجاني بالمطار" : "60 min free waiting time"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{isAr ? "إلغاء مجاني حتى 24 ساعة" : "Free cancellation up to 24h"}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TransferCalculator;