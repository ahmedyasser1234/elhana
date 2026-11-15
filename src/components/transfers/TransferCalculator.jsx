import React, { useState, useEffect } from 'react';
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
  PlaneLanding,
  MessageCircle,
  Eye,
  Check
} from 'lucide-react';
import { 
  SHARM_LOCATIONS, 
  VEHICLE_TYPES, 
  FLEET_CARS, 
  getCarsByCategory, 
  getCarById 
} from '../../data/transfers';
import { SHARM_ZONES } from '../../data/sharmHotels';
import { useToast } from '../../context/ToastContext';
import { useCurrency } from '../../context/CurrencyContext';
import { getWhatsAppLink } from '../common/WhatsAppButton';
import { VehicleSpecsModal } from './VehicleSpecsModal';

export const TransferCalculator = ({ 
  selectedVehicleId, 
  onSelectVehicle, 
  isSidebar = false,
  id = "transfer-booking-widget" 
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();

  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [pickup, setPickup] = useState(SHARM_LOCATIONS[0].id);
  const [dropoff, setDropoff] = useState(SHARM_LOCATIONS[1].id);

  // Category & Specific Car Selection
  const [activeCategory, setActiveCategory] = useState(selectedVehicleId || VEHICLE_TYPES[0].id);
  const [selectedCarId, setSelectedCarId] = useState(FLEET_CARS[1].id); // default car-corolla

  // Modal State for Specs & Photo Gallery
  const [modalCar, setModalCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dates & Times
  const [transferDate, setTransferDate] = useState(
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(new Date())
  );
  const [transferTime, setTransferTime] = useState('12:00');
  
  // Return Date defaults to 3 days after arrival
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(d);
  });
  const [returnTime, setReturnTime] = useState('14:00');

  const [passengers, setPassengers] = useState(2);

  // Sync category if prop changes from outside
  useEffect(() => {
    if (selectedVehicleId) {
      setActiveCategory(selectedVehicleId);
      const catCars = getCarsByCategory(selectedVehicleId);
      if (catCars.length > 0 && !catCars.some(c => c.id === selectedCarId)) {
        setSelectedCarId(catCars[0].id);
      }
    }
  }, [selectedVehicleId]);

  const activeCar = FLEET_CARS.find(c => c.id === selectedCarId) || FLEET_CARS[0];

  const handleSelectCar = (carId) => {
    setSelectedCarId(carId);
    const carObj = getCarById(carId);
    if (carObj) {
      setActiveCategory(carObj.categoryId);
      if (onSelectVehicle) {
        onSelectVehicle(carObj.categoryId);
      }
    }
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    const catCars = getCarsByCategory(catId);
    if (catCars.length > 0) {
      setSelectedCarId(catCars[0].id);
    }
    if (onSelectVehicle) {
      onSelectVehicle(catId);
    }
  };

  const pickupObj = SHARM_LOCATIONS.find(l => l.id === pickup) || SHARM_LOCATIONS[0];
  const dropoffObj = SHARM_LOCATIONS.find(l => l.id === dropoff) || SHARM_LOCATIONS[1];

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

  const oneWayPrice = Math.round(activeCar.basePrice * distanceMultiplier);
  const calculatedPriceInUSD = isRoundTrip ? (oneWayPrice * 2) : oneWayPrice;

  // Swap pickup & dropoff
  const handleSwapLocations = () => {
    const prevPickup = pickup;
    setPickup(dropoff);
    setDropoff(prevPickup);
  };

  // Popular route presets
  const popularRoutes = [
    {
      nameAr: "مطار شرم ← نعمة",
      nameEn: "Airport → Naama",
      pickupId: "ssh-airport",
      dropoffId: SHARM_LOCATIONS.find(l => l.zoneId === 'naama_bay')?.id || SHARM_LOCATIONS[1].id
    },
    {
      nameAr: "مطار شرم ← نبق",
      nameEn: "Airport → Nabq",
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
      nameAr: "شرم ← دهب",
      nameEn: "Sharm → Dahab",
      pickupId: "ssh-airport",
      dropoffId: SHARM_LOCATIONS.find(l => l.zoneId === 'dahab')?.id || SHARM_LOCATIONS[4].id
    }
  ];

  const handleBookTransfer = () => {
    const pickupName = isAr ? pickupObj.nameAr : pickupObj.name;
    const dropoffName = isAr ? dropoffObj.nameAr : dropoffObj.name;
    const carName = isAr ? activeCar.nameAr : activeCar.name;
    
    showToast(
      isAr 
        ? `تم حفظ حجز سيارة (${carName}) ${isRoundTrip ? 'ذهاب وعودة' : 'اتجاه واحد'}! جاري الانتقال لتأكيد الحجز.` 
        : `Transfer booking (${carName} - ${isRoundTrip ? 'Round-Trip' : 'One-Way'}) saved! Proceeding to checkout.`, 
      'success'
    );

    navigate('/checkout', {
      state: {
        isTransferBooking: true,
        isRoundTrip,
        pickup: pickupName,
        dropoff: dropoffName,
        vehicleName: carName,
        vehicleId: activeCar.id,
        categoryId: activeCategory,
        routeNames: [pickupObj.name, dropoffObj.name],
        date: transferDate,
        time: transferTime,
        returnDate: isRoundTrip ? returnDate : null,
        returnTime: isRoundTrip ? returnTime : null,
        passengers,
        price: calculatedPriceInUSD
      }
    });
  };

  const whatsappMessage = isAr
    ? `مرحباً! أود حجز توصيل خاص مع الهنا:\n• نوع المشوار: ${isRoundTrip ? 'ذهاب وعودة (Round Trip)' : 'اتجاه واحد (One Way)'}\n• السيارة المختارة: ${activeCar.nameAr} (موديل ${activeCar.model})\n• مشوار الذهاب: من ${pickupObj.nameAr} إلى ${dropoffObj.nameAr}\n• موعد الذهاب: ${transferDate} الساعة ${transferTime}${isRoundTrip ? `\n• مشوار العودة: من ${dropoffObj.nameAr} إلى ${pickupObj.nameAr}\n• موعد العودة: ${returnDate} الساعة ${returnTime}` : ''}\n• عدد الركاب: ${passengers}\n• السعر الإجمالي: $${calculatedPriceInUSD}`
    : `Hello! I would like to book a private transfer with El Hana:\n• Trip Type: ${isRoundTrip ? 'Round-Trip' : 'One-Way'}\n• Selected Car: ${activeCar.name} (${activeCar.model})\n• Outbound: From ${pickupObj.name} to ${dropoffObj.name} on ${transferDate} at ${transferTime}${isRoundTrip ? `\n• Return: From ${dropoffObj.name} to ${pickupObj.name} on ${returnDate} at ${returnTime}` : ''}\n• Passengers: ${passengers}\n• Estimated Rate: $${calculatedPriceInUSD}`;

  return (
    <div 
      id={id}
      className={`bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-xl space-y-5 overflow-hidden ${
        isSidebar ? 'sticky top-24 max-w-full' : 'max-w-4xl mx-auto shadow-2xl'
      }`}
    >
      
      {/* Decorative top gradient bar */}
      <div className="h-1.5 -mx-6 -mt-6 mb-2 bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#F97316]"></div>

      {/* Header Price & Bank Rates */}
      <div className="pb-4 border-b border-slate-100 flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {isAr ? "السعر الإجمالي للسيارة المحددة" : "Total Rate for Selected Car"}
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-3xl font-black text-slate-900 font-heading">
                {formatPrice(calculatedPriceInUSD)}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                / {isRoundTrip 
                    ? (isAr ? "ذهاب وعودة بالكامل" : "Round-trip total") 
                    : (isAr ? "اتجاه واحد للسيارة" : "One-way private vehicle")}
              </span>
            </div>
            {isRoundTrip && (
              <span className="text-[11px] font-bold text-[#0284C7] block mt-0.5">
                {isAr 
                  ? `(يشمل: ${formatPrice(oneWayPrice)} ذهاب + ${formatPrice(oneWayPrice)} عودة)` 
                  : `(Includes: ${formatPrice(oneWayPrice)} Outbound + ${formatPrice(oneWayPrice)} Return)`}
              </span>
            )}
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold shadow-2xs">
            ✓ {isAr ? "شامل كل الرسوم" : "All inclusive"}
          </span>
        </div>

        {/* Live Exchange Rates (EUR / GBP / EGP) */}
        <div className="flex items-center flex-wrap gap-1.5 pt-1 text-[11px] font-bold">
          <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            €{Math.round(calculatedPriceInUSD * 0.893)} EUR
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            £{Math.round(calculatedPriceInUSD * 0.757)} GBP
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold shadow-2xs">
            {Math.round(calculatedPriceInUSD * 52.39)} {isAr ? 'ج.م' : 'EGP'}
          </span>
        </div>

        {/* Selected Car Notice */}
        <div className="mt-1 px-3 py-2 rounded-xl bg-sky-50 border border-sky-200 text-slate-900 text-xs font-bold flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-[#0284C7] shrink-0" />
            <span>
              {isAr ? "السيارة المحددة:" : "Selected Car:"} <strong>{isAr ? activeCar.nameAr : activeCar.name}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setModalCar(activeCar);
              setIsModalOpen(true);
            }}
            className="text-[11px] text-[#0284C7] hover:underline font-extrabold cursor-pointer"
          >
            {isAr ? "صور ومواصفات" : "Specs & Photos"}
          </button>
        </div>
      </div>

      {/* ── TRIP TYPE SEGMENTED TOGGLE: ONE-WAY vs ROUND-TRIP ── */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-800 block">
          {isAr ? "نوع الرحلة / المشوار:" : "Trip Type:"}
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setIsRoundTrip(false)}
            className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              !isRoundTrip
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{isAr ? "اتجاه واحد (ذهاب فقط)" : "One-Way (Single)"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRoundTrip(true)}
            className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isRoundTrip
                ? 'bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>{isAr ? "ذهاب وعودة (شامل)" : "Round-Trip (Return)"}</span>
          </button>
        </div>
      </div>

      {/* Quick Route Preset Chips */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 block">
          {isAr ? "خطوط سريعة بنقرة واحدة:" : "Quick Route Presets:"}
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {popularRoutes.map((route, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setPickup(route.pickupId);
                setDropoff(route.dropoffId);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-[#0284C7] border border-slate-200 hover:border-sky-300 text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs truncate text-center"
            >
              {isAr ? route.nameAr : route.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Pickup & Dropoff Selection */}
      <div className="space-y-2.5">
        {/* Pickup */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>
              {isAr 
                ? (isRoundTrip ? "مكان الاستلام الأول (الذهاب)" : "مكان الاستلام (Pickup)") 
                : (isRoundTrip ? "Initial Pickup Location (Outbound)" : "Pickup Location")}
            </span>
          </label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0284C7] focus:bg-white cursor-pointer"
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

        {/* Swap Button */}
        <div className="flex items-center justify-center -my-1">
          <button
            type="button"
            onClick={handleSwapLocations}
            title={isAr ? "عكس خط السير" : "Swap Pickup and Drop-off"}
            aria-label={isAr ? "عكس خط السير" : "Swap Pickup and Drop-off"}
            className="w-8 h-8 rounded-full bg-sky-50 hover:bg-[#0284C7] text-[#0284C7] hover:text-white border border-sky-200 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-xs active:scale-90 cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 rotate-90 sm:rotate-0" />
          </button>
        </div>

        {/* Dropoff */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
            <span>
              {isAr 
                ? (isRoundTrip ? "مكان الوصول للذهاب (والانطلاق للعودة)" : "مكان التوصيل (Drop-off)") 
                : (isRoundTrip ? "Drop-off Location (Pickup for Return)" : "Drop-off Location")}
            </span>
          </label>
          <select
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#F97316] focus:bg-white cursor-pointer"
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

      {/* Date, Time & Return Schedule */}
      <div className="space-y-3 pt-1">
        {/* Outbound Leg Card */}
        <div className={`p-3 rounded-2xl border space-y-2 ${isRoundTrip ? 'bg-sky-50/50 border-sky-200' : 'bg-transparent border-transparent p-0'}`}>
          {isRoundTrip && (
            <div className="flex items-center gap-2 text-xs font-black text-[#0284C7] pb-1 border-b border-sky-100">
              <PlaneTakeoff className="w-4 h-4 text-[#0284C7]" />
              <span>{isAr ? "مشوار الذهاب (Outbound)" : "Outbound Transfer"}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#0284C7]" />
                <span>{isAr ? "تاريخ الذهاب" : "Outbound Date"}</span>
              </label>
              <input
                type="date"
                value={transferDate}
                min={new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(new Date())}
                onChange={(e) => {
                  setTransferDate(e.target.value);
                  if (returnDate < e.target.value) {
                    setReturnDate(e.target.value);
                  }
                }}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#0284C7]" />
                <span>{isAr ? "وقت الذهاب" : "Outbound Time"}</span>
              </label>
              <input
                type="time"
                value={transferTime}
                onChange={(e) => setTransferTime(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
              />
            </div>
          </div>
        </div>

        {/* Return Leg Card (When Round-Trip is Active) */}
        {isRoundTrip && (
          <div className="p-3 rounded-2xl border bg-orange-50/50 border-orange-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-[#F97316] pb-1 border-b border-orange-100">
              <PlaneLanding className="w-4 h-4 text-[#F97316]" />
              <span>{isAr ? "مشوار العودة (Return)" : "Return Transfer"}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#F97316]" />
                  <span>{isAr ? "تاريخ العودة" : "Return Date"}</span>
                </label>
                <input
                  type="date"
                  value={returnDate}
                  min={transferDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#F97316]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#F97316]" />
                  <span>{isAr ? "وقت تحرك العودة" : "Return Time"}</span>
                </label>
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#F97316]"
                />
              </div>
            </div>

            <p className="text-[10px] text-slate-600 font-semibold leading-relaxed pt-1">
              {isAr 
                ? `مشوار العودة: سيتم نقلك من ${dropoffObj.nameAr} إلى ${pickupObj.nameAr}.` 
                : `Return route: Pickup from ${dropoffObj.name} back to ${pickupObj.name}.`}
            </p>
          </div>
        )}

        {/* Passengers Input */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
            <Users className="w-3 h-3 text-[#0284C7]" />
            <span>{isAr ? "عدد الركاب" : "Passengers"}</span>
          </label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0284C7] cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15].map((num) => (
              <option key={num} value={num}>
                {num} {isAr ? (num === 1 ? 'راكب واحد' : num === 2 ? 'راكبان' : 'ركاب') : (num === 1 ? '1 Passenger' : `${num} Passengers`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── 1. VEHICLE CATEGORIES SELECTOR (أنواع السيارات) ── */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black uppercase tracking-wider text-slate-900 block">
            {isAr ? "1. اختر نوع السيارة (الفئة):" : "1. Select Vehicle Category:"}
          </label>
          <span className="text-[10px] text-slate-500 font-semibold">
            {isAr ? "انقر لعرض السيارات المتاحة" : "Click to view cars"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {VEHICLE_TYPES.map((cat) => {
            const isCatActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`p-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer border-2 text-start ${
                  isCatActive
                    ? 'bg-slate-900 text-white border-[#0284C7] shadow-md scale-[1.01]'
                    : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-sky-300 shadow-2xs'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#0284C7]" />
                <span className="truncate leading-tight flex-1">
                  {isAr ? cat.tagAr : cat.tagEn}
                </span>
                {isCatActive && <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. CARS UNDER SELECTED CATEGORY AS CARDS (كروت العربيات) ── */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black uppercase tracking-wider text-slate-900 block">
            {isAr ? "2. اختر السيارة واضغط لرؤية صورها ومواصفاتها:" : "2. Choose Car & Click for Specs / Photos:"}
          </label>
        </div>

        <div className="space-y-2.5">
          {getCarsByCategory(activeCategory).map((car) => {
            const carBase = Math.round(car.basePrice * distanceMultiplier);
            const carPrice = isRoundTrip ? (carBase * 2) : carBase;
            const isCarSelected = selectedCarId === car.id;

            return (
              <div
                key={car.id}
                onClick={() => handleSelectCar(car.id)}
                className={`p-3 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group ${
                  isCarSelected
                    ? 'bg-slate-900 text-white border-[#0284C7] shadow-xl scale-[1.01]'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-sky-300 shadow-2xs'
                }`}
              >
                {/* Left: Car image + details */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 ring-1 ring-slate-200 bg-slate-950">
                    <img
                      src={car.image}
                      alt={isAr ? car.nameAr : car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-0.5 end-0.5 bg-black/75 text-white text-[8px] px-1 rounded font-bold">
                      {car.gallery?.length || 1} 📷
                    </span>
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-[#0284C7] bg-sky-50 px-1.5 py-0.2 rounded">
                        {isAr ? `موديل ${car.model}` : `Model ${car.model}`}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-black truncate leading-snug">
                      {isAr ? car.nameAr : car.name}
                    </h4>

                    <div className="flex items-center gap-2 text-[10px] opacity-80">
                      <span className="flex items-center gap-0.5">
                        <Users className="w-2.5 h-2.5 text-sky-400" />
                        {car.maxPassengers}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Briefcase className="w-2.5 h-2.5 text-amber-400" />
                        {car.maxLuggage}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold truncate">
                        {isAr ? "مكيفة بالكامل" : "Full A/C"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Price + Action Button */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className={`text-base font-black font-heading ${isCarSelected ? 'text-[#38BDF8]' : 'text-[#0284C7]'}`}>
                    {formatPrice(carPrice)}
                  </div>

                  {/* View Specs & Photos Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalCar(car);
                      setIsModalOpen(true);
                    }}
                    className="px-2 py-1 rounded-lg bg-sky-50 hover:bg-[#0284C7] text-[#0284C7] hover:text-white text-[10px] font-extrabold transition flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{isAr ? "المواصفات والصور" : "Specs"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons & Trust Line */}
      <div className="pt-2 border-t border-slate-100 space-y-2.5">
        <button
          type="button"
          onClick={handleBookTransfer}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] hover:from-[#0369A1] hover:to-[#0c4a6e] text-white font-black text-sm shadow-md shadow-sky-600/30 hover:shadow-sky-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>
            {isAr 
              ? (isRoundTrip 
                  ? `احجز الذهاب والعودة الآن (${formatPrice(calculatedPriceInUSD)})` 
                  : `احجز مشوارك الآن (${formatPrice(calculatedPriceInUSD)})`)
              : (isRoundTrip
                  ? `Book Round-Trip Now (${formatPrice(calculatedPriceInUSD)})`
                  : `Book Transfer Now (${formatPrice(calculatedPriceInUSD)})`)}
          </span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>

        <a
          href={getWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-black text-xs rounded-2xl shadow-xs transition-all duration-200 active:scale-[0.99]"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span>
            {isAr 
              ? (isRoundTrip ? "تنسيق ذهاب وعودة عبر واتساب" : "تنسيق فوري عبر واتساب")
              : (isRoundTrip ? "WhatsApp Round-Trip Booking" : "WhatsApp Quick Coordination")}
          </span>
        </a>

        {/* Guarantees */}
        <div className="pt-2 text-[11px] font-semibold text-slate-500 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <PlaneTakeoff className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
            <span>{isAr ? "متابعة حية لمواعيد الطيران مجاناً" : "Live flight tracking included"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{isAr ? "60 دقيقة انتظار مجاني بصالة الوصول" : "60 min free airport wait time"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{isAr ? "إلغاء مجاني حتى 24 ساعة قبل الرحلة" : "Free cancellation up to 24h"}</span>
          </div>
        </div>
      </div>

      {/* ── 3. INTERACTIVE CAR SPECS & PHOTO GALLERY MODAL ── */}
      <VehicleSpecsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        car={modalCar}
        onSelectCar={handleSelectCar}
        calculatedPrice={
          modalCar 
            ? (Math.round(modalCar.basePrice * distanceMultiplier) * (isRoundTrip ? 2 : 1)) 
            : calculatedPriceInUSD
        }
        isRoundTrip={isRoundTrip}
      />

    </div>
  );
};

export default TransferCalculator;
