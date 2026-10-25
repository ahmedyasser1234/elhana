import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Car, MapPin, Calendar, Clock, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SHARM_LOCATIONS, VEHICLE_TYPES } from '../../data/transfers';
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
  if (pickupObj.name.includes('Dahab') || dropoffObj.name.includes('Dahab')) {
    distanceMultiplier = 2.8;
  } else if (pickupObj.name.includes('Airport') && dropoffObj.name.includes('Nabq')) {
    distanceMultiplier = 1.2;
  }

  const calculatedPriceInUSD = Math.round(vehicle.basePrice * distanceMultiplier);

  const handleBookTransfer = () => {
    const pickupName = isAr ? pickupObj.nameAr : pickupObj.name;
    const dropoffName = isAr ? dropoffObj.nameAr : dropoffObj.name;
    
    showToast(
      isAr 
        ? `ØªÙ… Ø­ÙØ¸ Ø­Ø¬Ø² Ø§Ù„ØªÙˆØµÙŠÙ„ Ù…Ù† ${pickupName} Ø¥Ù„Ù‰ ${dropoffName}! Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ù„ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø­Ø¬Ø².` 
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
            <span>{isAr ? "Ø³ÙŠØ§Ø±Ø§Øª Ø®Ø§ØµØ© ÙˆØªØ§ÙƒØ³ÙŠ Ø§Ù„Ù…Ø·Ø§Ø± 24 Ø³Ø§Ø¹Ø©" : "Private Shuttle & Airport Taxi"}</span>
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 font-heading">
            {isAr ? "Ø­Ø³Ø§Ø¨ ØªÙƒÙ„ÙØ© Ø§Ù„Ù…Ø´ÙˆØ§Ø± ÙˆØ§Ù„ØªÙˆØµÙŠÙ„" : "Calculate Your Transfer Fare"}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500 font-bold uppercase block">
            {isAr ? "Ø§Ù„Ø³Ø¹Ø± Ø§Ù„ØªÙ‚Ø¯ÙŠØ±ÙŠ" : "Estimated Rate"}
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
            <span>{isAr ? "Ù…ÙƒØ§Ù† Ø§Ù„ØªØ­Ø±Ùƒ / Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù…" : "Pickup Location"}</span>
          </label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 focus:border-[#D4AF37]"
          >
            {SHARM_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {isAr ? loc.nameAr : loc.name} ({isAr ? loc.categoryAr : loc.category})
              </option>
            ))}
          </select>
        </div>

        {/* Dropoff Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#00A896]" />
            <span>{isAr ? "Ù…ÙƒØ§Ù† Ø§Ù„ÙˆØµÙˆÙ„ / Ø§Ù„ØªÙˆØµÙŠÙ„" : "Drop-off Location"}</span>
          </label>
          <select
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 focus:border-[#00A896]"
          >
            {SHARM_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {isAr ? loc.nameAr : loc.name} ({isAr ? loc.categoryAr : loc.category})
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAr ? "ØªØ§Ø±ÙŠØ® Ø§Ù„Ø±Ø­Ù„Ø©" : "Date"}</span>
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
              <span>{isAr ? "ÙˆÙ‚Øª Ø§Ù„ØªØ­Ø±Ùƒ" : "Pickup Time"}</span>
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
            <span>{isAr ? "Ø¹Ø¯Ø¯ Ø§Ù„Ø±ÙƒØ§Ø¨ ÙˆØ§Ù„Ø­Ù‚Ø§Ø¦Ø¨" : "Passengers & Luggage"}</span>
          </label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>
                {num} {isAr ? 'Ø±ÙƒØ§Ø¨' : 'Passengers'}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Vehicle Type Choice */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
          {isAr ? "Ø§Ø®ØªØ± Ù†ÙˆØ¹ Ø§Ù„Ø³ÙŠØ§Ø±Ø© ÙˆØ§Ù„Ø£Ø³Ø·ÙˆÙ„" : "Select Vehicle Class"}
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
                      ? `Ø­ØªÙ‰ ${v.maxPassengers} Ø±ÙƒØ§Ø¨ Ùˆ ${v.maxLuggage} Ø­Ù‚Ø§Ø¦Ø¨` 
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
              ? "Ù…ØªØ§Ø¨Ø¹Ø© Ø­ÙŠØ© Ù„Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ø·ÙŠØ±Ø§Ù† + 60 Ø¯Ù‚ÙŠÙ‚Ø© Ø§Ù†ØªØ¸Ø§Ø± Ù…Ø¬Ø§Ù†ÙŠ" 
              : "Flight status tracking + 60 min free waiting time"}
          </span>
        </div>
        <Button variant="primary" size="lg" onClick={handleBookTransfer} icon={Sparkles}>
          {isAr 
            ? `Ø§Ø­Ø¬Ø² Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø§Ù„Ø¢Ù† (${formatPrice(calculatedPriceInUSD)})` 
            : `Book Transfer Now (${formatPrice(calculatedPriceInUSD)})`}
        </Button>
      </div>

    </div>
  );
};

export default TransferCalculator;



