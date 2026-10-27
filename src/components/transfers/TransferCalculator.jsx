import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Car, MapPin, Calendar, Clock, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SHARM_LOCATIONS, VEHICLE_TYPES } from '../../data/transfers';
import { SHARM_ZONES } from '../../data/sharmHotels';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import { useCurrency } from '../../context/CurrencyContext';

export const TransferCalculator = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();

  const [pickup, setPickup] = useState(SHARM_LOCATIONS[0].id);
  const [dropoff, setDropoff] = useState(SHARM_LOCATIONS[1].id);
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_TYPES[0].id);
  const [transferDate, setTransferDate] = useState(new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(new Date()));
  const [transferTime, setTransferTime] = useState('12:00');
  const [passengers, setPassengers] = useState(2);

  const pickupObj = SHARM_LOCATIONS.find(l => l.id === pickup) || SHARM_LOCATIONS[0];
  const dropoffObj = SHARM_LOCATIONS.find(l => l.id === dropoff) || SHARM_LOCATIONS[1];
  const vehicle = VEHICLE_TYPES.find(v => v.id === selectedVehicle) || VEHICLE_TYPES[0];

  let distanceMultiplier = 1.0;
  if (pickupObj?.zoneId === 'dahab' || dropoffObj?.zoneId === 'dahab' || pickupObj?.name?.includes('Dahab') || dropoffObj?.name?.includes('Dahab')) {
    distanceMultiplier = 2.8;
  } else if ((pickupObj?.id === 'ssh-airport' || dropoffObj?.id === 'ssh-airport') && (pickupObj?.zoneId === 'nabq' || dropoffObj?.zoneId === 'nabq')) {
    distanceMultiplier = 1.2;
  }

  const calculatedPriceInUSD = Math.round(vehicle.basePrice * distanceMultiplier);

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

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-xl space-y-6 max-w-4xl mx-auto">
      
      {/* Header Box */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#B8860B] font-bold text-xs uppercase tracking-wider mb-2">
            <Car className="w-3.5 h-3.5" />
            <span>{isAr ? "سيارات خاصة وتاكسي المطار 24 ساعة" : "Private Shuttle & Airport Taxi"}</span>
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 font-heading">
            {isAr ? "حساب تكلفة المشوار والتوصيل" : "Calculate Your Transfer Fare"}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500 font-bold uppercase block">
            {isAr ? "السعر التقديري" : "Estimated Rate"}
          </span>
          <div className="text-3xl font-black text-[#B8860B] font-heading">
            {formatPrice(calculatedPriceInUSD)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Pickup Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isAr ? "مكان التحرك / الاستلام" : "Pickup Location"}</span>
          </label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 focus:border-[#D4AF37]"
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

        {/* Dropoff Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#00A896]" />
            <span>{isAr ? "مكان الوصول / التوصيل" : "Drop-off Location"}</span>
          </label>
          <select
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 focus:border-[#00A896]"
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

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAr ? "تاريخ الرحلة" : "Date"}</span>
            </label>
            <input
              type="date"
              value={transferDate}
              min={new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(new Date())}
              onChange={(e) => setTransferDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAr ? "وقت التحرك" : "Pickup Time"}</span>
            </label>
            <input
              type="time"
              value={transferTime}
              onChange={(e) => setTransferTime(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
            />
          </div>
        </div>

        {/* Passenger count */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isAr ? "عدد الركاب والحقائب" : "Passengers & Luggage"}</span>
          </label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>
                {num} {isAr ? 'ركاب' : 'Passengers'}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Vehicle Type Choice */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
          {isAr ? "اختر نوع السيارة والأسطول" : "Select Vehicle Class"}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {VEHICLE_TYPES.map((v) => {
            const vehiclePriceInUSD = Math.round(v.basePrice * distanceMultiplier);
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVehicle(v.id)}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between cursor-pointer ${
                  selectedVehicle === v.id
                    ? 'bg-stone-900 text-white border-[#D4AF37] shadow-lg'
                    : 'bg-stone-50 text-stone-800 border-stone-200 hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="font-bold text-sm">{isAr ? v.nameAr : v.name}</div>
                  <div className="text-[11px] opacity-80 mt-1">
                    {isAr 
                      ? `حتى ${v.maxPassengers} ركاب و ${v.maxLuggage} حقائب` 
                      : `Up to ${v.maxPassengers} passengers & ${v.maxLuggage} bags`}
                  </div>
                </div>
                <div className="pt-3 font-extrabold text-sm text-[#D4AF37]">
                  {formatPrice(vehiclePriceInUSD)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-100">
        <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>
            {isAr 
              ? "متابعة حية لمواعيد الطيران + 60 دقيقة انتظار مجاني" 
              : "Flight status tracking + 60 min free waiting time"}
          </span>
        </div>
        <Button variant="primary" size="lg" onClick={handleBookTransfer} icon={Sparkles}>
          {isAr 
            ? `احجز الانتقال الآن (${formatPrice(calculatedPriceInUSD)})` 
            : `Book Transfer Now (${formatPrice(calculatedPriceInUSD)})`}
        </Button>
      </div>

    </div>
  );
};

export default TransferCalculator;
