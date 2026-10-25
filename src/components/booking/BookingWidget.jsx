import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, Plus, Minus, ShieldCheck, Camera, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../common/Button';
import { getWhatsAppLink, WhatsAppIcon } from '../common/WhatsAppButton';
import { useCurrency } from '../../context/CurrencyContext';
import { TripSlotMediaModal } from '../safari/TripSlotMediaModal';

export const BookingWidget = ({ experience }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const isAr = lang === 'ar';
  const { formatPrice } = useCurrency();

  const { bookingDraft, updateBooking } = useBooking();

  const safariCategories = ['safari', 'atv', 'buggy', 'bedouin', 'camel', 'horse'];
  const isSafari = safariCategories.includes(experience?.category) || 
                   ['atv-quad-bike-safari', 'dune-buggy-adventure', 'authentic-bedouin-experience-dinner', 'super-desert-combo-safari'].includes(experience?.slug);
  const isBedouinStandaloneExp = experience?.slug === 'authentic-bedouin-experience-dinner';

  const [adults, setAdults] = useState(bookingDraft.adults || 2);
  const [childrenCount, setChildrenCount] = useState(bookingDraft.children || 0);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaModalSlot, setMediaModalSlot] = useState('sunset');

  const getSlotIdFromTime = (timeStr) => {
    if (!timeStr) return 'sunset';
    if (timeStr.includes('04:30')) return 'sunrise';
    if (timeStr.includes('09:00')) return 'morning';
    if (timeStr.includes('04:00') || timeStr.includes('03:00')) return 'sunset';
    if (timeStr.includes('05:30') || timeStr.includes('06:30')) return 'dinner';
    return 'sunset';
  };
  const [selectedDate, setSelectedDate] = useState(bookingDraft.date || new Date().toISOString().split('T')[0]);
  const [hotel, setHotel] = useState(bookingDraft.hotelName || '');
  
  // Custom Quad & Buggy Vehicle Counters - All default to 0 unless customer explicitly adds them
  const [singleQuads, setSingleQuads] = useState(bookingDraft.singleQuads || 0);
  const [doubleQuads, setDoubleQuads] = useState(bookingDraft.doubleQuads || 0);
  const [buggy2Seater, setBuggy2Seater] = useState(bookingDraft.buggy2Seater || 0);
  const [buggy4Seater, setBuggy4Seater] = useState(bookingDraft.buggy4Seater || 0);

  // Bedouin Party Preference
  const [bedouinPartyOption, setBedouinPartyOption] = useState(
    isBedouinStandaloneExp ? 'dinner_only' : (bookingDraft.bedouinPartyOption || 'none')
  );
  const [bedouinPartySubOption, setBedouinPartySubOption] = useState(bookingDraft.bedouinPartySubOption || 'dinner_standard');

  // Dynamic Pickup Times based on User Business Rules
  const isDinnerOnly = isBedouinStandaloneExp || bedouinPartyOption === 'dinner_only';
  const isSafariWithDinner = !isDinnerOnly && (bedouinPartyOption === 'standard_dinner' || bedouinPartyOption === 'vip_dinner' || bedouinPartyOption === 'with_safari');

  const dinnerOnlySlot = isAr ? '06:30 مساءً (الاستقبال من الفندق)' : '06:30 PM (Hotel Pickup)';
  const safariDinnerSlot = isAr ? '05:30 مساءً (الاستقبال من الفندق)' : '05:30 PM (Hotel Pickup)';

  // isHorseCamelTab must be defined early (before availableTimeSlots)
  const isHorseCamelTabEarly = experience?.activeTab === 'camel' || experience?.activeTab === 'horse'
    || experience?.category === 'horse' || experience?.category === 'camel';

  let availableTimeSlots = [];
  if (experience?.availableTimes && experience.availableTimes.length > 0) {
    availableTimeSlots = experience.availableTimes;
  } else if (!isSafari) {
    if (experience?.activeTab === 'catherine' || experience?.category === 'catherine' || experience?.slug?.includes('catherine')) {
      availableTimeSlots = [isAr ? '10:30 مساءً (التحرك الليلي وصعود الجبل)' : '10:30 PM (Night Pickup & Ascent)'];
    } else if (experience?.activeTab === 'taba' || experience?.category === 'taba' || experience?.slug?.includes('taba')) {
      availableTimeSlots = [isAr ? '07:00 صباحاً (الاستقبال من الفندق)' : '07:00 AM (Hotel Pickup)'];
    } else {
      // Dahab, Nuweiba, or other day tours: single morning departure at 08:00 AM
      availableTimeSlots = [isAr ? '08:00 صباحاً (الاستقبال من الفندق)' : '08:00 AM (Hotel Pickup)'];
    }
  } else if (isDinnerOnly && !isHorseCamelTabEarly) {
    availableTimeSlots = [dinnerOnlySlot];
  } else if (isSafariWithDinner) {
    availableTimeSlots = [safariDinnerSlot];
  } else {
    availableTimeSlots = [
      isAr ? '04:30 صباحاً (الفجر)' : '04:30 AM (Sunrise)',
      isAr ? '09:00 صباحاً (الصباح)' : '09:00 AM (Morning)',
      isAr ? '03:00 مساءً (العصر)' : '03:00 PM (Afternoon)',
      isAr ? '04:00 مساءً (الغروب)' : '04:00 PM (Sunset)'
    ];
  }

  const [selectedTime, setSelectedTime] = useState(() => {
    if (availableTimeSlots && availableTimeSlots.length > 0) {
      return !isSafari ? availableTimeSlots[0] : (availableTimeSlots[3] || availableTimeSlots[0]);
    }
    if (isDinnerOnly) return dinnerOnlySlot;
    if (isSafariWithDinner) return safariDinnerSlot;
    return availableTimeSlots[3] || availableTimeSlots[0];
  });

  // Keep selectedTime synchronized when dinner options or language change
  useEffect(() => {
    if (availableTimeSlots && availableTimeSlots.length > 0) {
      if (!availableTimeSlots.includes(selectedTime)) {
        setSelectedTime(!isSafari ? availableTimeSlots[0] : (availableTimeSlots[3] || availableTimeSlots[0]));
      }
    } else if (isDinnerOnly) {
      setSelectedTime(dinnerOnlySlot);
    } else if (isSafariWithDinner) {
      setSelectedTime(safariDinnerSlot);
    }
  }, [availableTimeSlots, bedouinPartyOption, experience?.id, experience?.activeTab, isAr, isDinnerOnly, isSafari, isSafariWithDinner]);

  // Notify parent page (SafariUnifiedPage) when bedouinPartyOption changes so itinerary updates
  useEffect(() => {
    if (typeof experience?.onBedouinPartyChange === 'function') {
      experience.onBedouinPartyChange(bedouinPartyOption);
    }
  }, [bedouinPartyOption]);

  // Synchronize widget options when activeTab or activeSubTab changes on parent page (without forcing vehicle counts)
  useEffect(() => {
    if (experience?.activeTab === 'bedouin' || isBedouinStandaloneExp) {
      setBedouinPartyOption('dinner_only');
      if (experience?.activeSubTab === 'vip') {
        setBedouinPartySubOption('dinner_vip');
      } else if (experience?.activeSubTab === 'standard') {
        setBedouinPartySubOption('dinner_standard');
      } else if (experience?.activeSubTab === 'romantic') {
        setBedouinPartySubOption('dinner_romantic');
      } else if (experience?.activeSubTab === 'proposal') {
        setBedouinPartySubOption('dinner_proposal');
      }
    }
  }, [experience?.activeTab, experience?.activeSubTab, isBedouinStandaloneExp]);

  // Extras
  const [privateTransfer, setPrivateTransfer] = useState(bookingDraft.privateTransfer || false);
  const [photoVideo, setPhotoVideo] = useState(bookingDraft.photoVideoPackage || false);
  const [bedouinScarf, setBedouinScarf] = useState(bookingDraft.bedouinScarf || false);
  const [desertGoggles, setDesertGoggles] = useState(bookingDraft.desertGoggles || false);
  const [privateSafari, setPrivateSafari] = useState(bookingDraft.privateSafari || false);
  const [camelRide30min, setCamelRide30min] = useState(bookingDraft.camelRide30min || false);
  const [horseRide1hr, setHorseRide1hr] = useState(bookingDraft.horseRide1hr || false);
  const [telescopeStargazing, setTelescopeStargazing] = useState(bookingDraft.telescopeStargazing || false);
  const [romanticBedouinUpgrade, setRomanticBedouinUpgrade] = useState(false);
  const [proposalBedouinUpgrade, setProposalBedouinUpgrade] = useState(false);
  const [yachtRomanticUpgrade, setYachtRomanticUpgrade] = useState(false);
  const [yachtProposalUpgrade, setYachtProposalUpgrade] = useState(false);

  if (!experience) return null;

  const startingPrice = experience.startingPrice || 20;

  // Multi-language Labels
  const getLabel = (key) => {
    const dict = {
      bestPrice: { ar: "أفضل سعر مضمّن", en: "Best Price" },
      timeSlot: { ar: "الموعد المتاح", en: "Time Slot" },
      adultsLabel: { ar: "البالغون (12+)", en: "Adults (12+)" },
      childrenLabel: { ar: "الأطفال (3-11)", en: "Children (3-11)" },
      vehicleSelection: { ar: "اختيار عدد المركبات (المكن والكار باجي بنفس الصفحة)", en: "Vehicle Selection (Quads & Buggies)" },
      singleQuadLabel: { ar: "بيتش باجي سنجل (راكب واحد)", en: "Single Quad Bike (1 Rider)" },
      doubleQuadLabel: { ar: "بيتش باجي دبل (راكبان)", en: "Double Quad Bike (2 Riders)" },
      buggy2Label: { ar: "كار باجي ثنائي (مقعدان)", en: "2-Seater Dune Buggy" },
      buggy4Label: { ar: "كار باجي رباعي (4 مقاعد)", en: "4-Seater Family Buggy" },
      bedouinPartySection: { ar: "الحفلة والعشاء البدوي مع السفاري", en: "Bedouin Dinner & Show Option" },
      bedouinStandardSafari: { ar: "عشاء بدوي عادي مع السفاري (+10$ للفرد)", en: "Standard Bedouin Dinner with Safari (+$10/person)" },
      bedouinVipSafari: { ar: "عشاء VIP فاخر مع السفاري (+18$ للفرد)", en: "VIP Bedouin Dinner with Safari (+$18/person)" },
      bedouinDinnerOnly: { ar: "حفلة وعشاء بدوي فقط بدون مكن (اختر الباقة أسفله)", en: "Standalone Bedouin Dinner & Show Only (No Riding)" },
      bedouinNone: { ar: "جولة سفاري فقط (بدون عشاء وحفلة)", en: "Safari Riding Only (No Dinner)" },
      dinnerStandardLabel: { ar: "عشاء بدوي عادي شامل الترانسفير ($20 للفرد)", en: "Standard Bedouin Dinner w/ Transfer ($20/person)" },
      dinnerVipLabel: { ar: "عشاء VIP فاخر شامل الترانسفير ($30 للفرد)", en: "VIP Bedouin Dinner w/ Transfer ($30/person)" },
      dinnerStargazingLabel: { ar: "عشاء بدوي عادي + تليسكوب ورؤية النجوم ($25 للفرد)", en: "Standard Dinner + Telescope Stargazing ($25/person)" },
      dinnerVipStargazingLabel: { ar: "عشاء VIP فاخر + تليسكوب ورؤية النجوم ($35 للفرد)", en: "VIP Dinner + Telescope Stargazing ($35/person)" },
      dinnerRomanticLabel: { ar: "عشاء بدوي رومانسي خاص بالشموع والورود لشخصين ($65)", en: "Private Romantic Candlelight Dinner for 2 ($65)" },
      dinnerProposalLabel: { ar: "باقة طلب الزواج VIP البدوية 'Marry Me' في قلب الصحراء ($180)", en: "Sinai Desert VIP Marry Me Proposal Package ($180)" },
      bedouinRomanticDinner: { ar: "عشاء رومانسي خاص لشخصين في خيمة معزولة بالشموع (+65$ للباقة)", en: "Private Romantic Candlelight Tent Dinner for 2 (+$65/package)" },
      bedouinProposalSafari: { ar: "باقة طلب الزواج VIP البدوية Marry Me مع السفاري (+180$ للباقة)", en: "Sinai Desert VIP Marry Me Proposal Package (+$180)" },
      yachtRomanticDinner: { ar: "ترقية إلى عشاء يخت رومانسي خاص لشخصين بالشموع والسي فود (+$95)", en: "Upgrade to Romantic VIP Yacht Candlelight Seafood Dinner (+$95)" },
      yachtProposalPackage: { ar: "باقة طلب الزواج VIP على سطح اليخت مع حروف Marry Me المضيئة (+$220)", en: "VIP Yacht Marry Me Proposal Package on Deck (+$220)" },
      hotelPlaceholder: { ar: "مثال: ريكسوس، سلطان جاردنز...", en: "e.g. Rixos, Sultan Gardens..." },
      optionalExtras: { ar: "إضافات اختيارية", en: "Optional Extras" },
      privateTransfer: { ar: "سيارة توصيل خاصة VIP", en: "Private VIP Vehicle Transfer" },
      photoPackage: { ar: "ألبوم صور وفيديو تصوير احترافي", en: "HD Photos & Video Package" },
      bedouinScarf: { ar: "شال بدوي صحراوي (إسكارف)", en: "Bedouin Desert Scarf" },
      desertGoggles: { ar: "نظارة صحراوية لحماية العين من الرمال", en: "Desert Protection Goggles" },
      privateSafari: { ar: "جولة سفاري خاصة بالكامل (Private Tour)", en: "Private Safari Tour Upgrade" },
      camelRideLabel: { ar: "جولة جمال صحراوية (30 دقيقة)", en: "30-Min Desert Camel Ride" },
      horseRideLabel: { ar: "جولة خيل عربي (ساعة كاملة)", en: "1-Hour Arabian Horse Riding" },
      telescopeLabel: { ar: "تليسكوب ورؤية النجوم والمجرات", en: "Telescope Stargazing Experience" },
      freeCancellation: { ar: "إلغاء مجاني", en: "Free Cancellation" },
      payOnArrival: { ar: "الدفع عند الوصول", en: "Pay on Arrival Option" }
    };
    return dict[key]?.[lang] || dict[key]?.en || '';
  };

  // Pricing Logic
  const quadSinglePrice = 15;
  const quadDoublePrice = 20;
  const buggy2Price = 28;
  const buggy4Price = 32;

  // Extras prices (EUR-based, converted to USD)
  // Photo €25 | Private car €20 | Van €30 | Scarf €4 | Goggles €6
  const photoVideoPrice = 28;       // €25
  const privateCarPrice = 22;       // €20 (up to 7 pax)
  const privateVanPrice = 34;       // €30 (7+ pax)
  const bedouinScarfPrice = 4;      // €4
  const desertGogglesPrice = 6;     // €6
  const camelExtra = 10;
  const horseExtra = 15;

  // Calculate total riders / passengers from selected vehicles
  const vehicleCapacity = (singleQuads * 1) + (doubleQuads * 2) + (buggy2Seater * 2) + (buggy4Seater * 4);
  // Total people count considers both guests dropdown and riders in vehicles
  const totalPeopleCount = Math.max(adults + childrenCount, vehicleCapacity);
  const isLargeGroup = totalPeopleCount > 6;
  const calculatedTransferPrice = isLargeGroup ? privateVanPrice : privateCarPrice;

  let vehiclesPrice = 0;
  let partyFee = 0;

  if (isBedouinStandaloneExp || bedouinPartyOption === 'dinner_only') {
    vehiclesPrice = 0;
    if (bedouinPartySubOption === 'dinner_proposal') {
      partyFee = 180;
    } else if (bedouinPartySubOption === 'dinner_romantic') {
      partyFee = 65;
    } else if (bedouinPartySubOption === 'dinner_vip_stargazing') {
      partyFee = (adults * 35) + (childrenCount * 20);
    } else if (bedouinPartySubOption === 'dinner_vip') {
      partyFee = (adults * 30) + (childrenCount * 18);
    } else if (bedouinPartySubOption === 'dinner_stargazing') {
      partyFee = (adults * 25) + (childrenCount * 15);
    } else {
      partyFee = (adults * 20) + (childrenCount * 12);
    }
  } else {
    vehiclesPrice = (singleQuads * quadSinglePrice) +
                    (doubleQuads * quadDoublePrice) +
                    (buggy2Seater * buggy2Price) +
                    (buggy4Seater * buggy4Price);
    if (bedouinPartyOption === 'proposal_safari') {
      partyFee = 180;
    } else if (bedouinPartyOption === 'romantic_dinner') {
      partyFee = 65;
    } else if (bedouinPartyOption === 'vip_dinner') {
      partyFee = (adults * 18) + (childrenCount * 10);
    } else if (bedouinPartyOption === 'standard_dinner' || bedouinPartyOption === 'with_safari') {
      partyFee = (adults * 10) + (childrenCount * 5);
    }
  }

  const extrasTotal = (privateTransfer ? calculatedTransferPrice : 0) +
                      (photoVideo ? photoVideoPrice : 0) +
                      (bedouinScarf ? bedouinScarfPrice : 0) +
                      (desertGoggles ? desertGogglesPrice : 0) +
                      (privateSafari ? 15 : 0) +
                      (camelRide30min ? camelExtra : 0) +
                      (horseRide1hr ? horseExtra : 0) +
                      (telescopeStargazing ? 5 : 0) +
                      (romanticBedouinUpgrade ? 65 : 0) +
                      (proposalBedouinUpgrade ? 180 : 0) +
                      (yachtRomanticUpgrade ? 95 : 0) +
                      (yachtProposalUpgrade ? 220 : 0);

  // isHorseCamelTab — defined near top for time slots, repeated here for clarity
  const isHorseCamelTab = isHorseCamelTabEarly;
  const horseCamelRate = experience?.activeTab === 'camel'
    ? (experience?.activeSubTab === 'extended' ? 15 : 10)
    : (experience?.activeSubTab === 'extended' ? 25 : 15);
  const horseCamelTotal = isHorseCamelTab ? (adults + childrenCount) * horseCamelRate : 0;

  const isExcursionOrGeneral = !isSafari;
  const excursionTotal = isExcursionOrGeneral
    ? (adults * (experience?.startingPrice || 30)) + (childrenCount * Math.round((experience?.startingPrice || 30) * 0.5))
    : 0;

  const grandTotal = Math.round(
    isExcursionOrGeneral
      ? (excursionTotal + extrasTotal)
      : isHorseCamelTab
      ? (horseCamelTotal + extrasTotal)
      : (vehiclesPrice + partyFee + extrasTotal)
  );

  // Dynamic Header Price Calculation based on current user selections
  const getDynamicHeaderPrice = () => {
    // 0. Non-safari experiences (Sinai Excursions like Dahab, Catherine, etc., or Sea trips)
    if (!isSafari) {
      return experience?.startingPrice || 30;
    }

    // 1. Horse / Camel — per-person pricing
    if (isHorseCamelTab) {
      if (experience?.activeTab === 'camel') {
        return experience?.activeSubTab === 'extended' ? 15 : 10;
      }
      // horse
      return experience?.activeSubTab === 'extended' ? 25 : 15;
    }

    // 2. Standalone Bedouin Dinner or Dinner Only chosen
    if (isBedouinStandaloneExp || bedouinPartyOption === 'dinner_only') {
      if (bedouinPartySubOption === 'dinner_proposal') return 180;
      if (bedouinPartySubOption === 'dinner_romantic') return 65;
      if (bedouinPartySubOption === 'dinner_vip_stargazing') return 35;
      if (bedouinPartySubOption === 'dinner_vip') return 30;
      if (bedouinPartySubOption === 'dinner_stargazing') return 25;
      return 20; // dinner_standard
    }

    // 3. Custom vehicle counts or sub-tab
    let baseVehicleRate = 0;
    if (buggy4Seater > 0) {
      baseVehicleRate = buggy4Price;
    } else if (buggy2Seater > 0) {
      baseVehicleRate = experience?.activeSubTab === 'polaris1000' ? 60 : buggy2Price;
    } else if (doubleQuads > 0) {
      baseVehicleRate = quadDoublePrice;
    } else if (singleQuads > 0) {
      baseVehicleRate = quadSinglePrice;
    } else {
      if (experience?.activeTab === 'buggy') {
        if (experience?.activeSubTab === 'polaris1000') baseVehicleRate = 60;
        else if (experience?.activeSubTab === '4seater') baseVehicleRate = buggy4Price;
        else baseVehicleRate = buggy2Price;
      } else if (experience?.activeTab === 'bedouin') {
        if (experience?.activeSubTab === 'proposal') baseVehicleRate = 180;
        else if (experience?.activeSubTab === 'romantic') baseVehicleRate = 65;
        else baseVehicleRate = experience?.activeSubTab === 'vip' ? 30 : 20;
      } else {
        baseVehicleRate = experience?.activeSubTab === 'double' ? quadDoublePrice : quadSinglePrice;
      }
    }

    // 4. Safari with dinner additions
    if (bedouinPartyOption === 'proposal_safari') {
      return baseVehicleRate + 180;
    }
    if (bedouinPartyOption === 'romantic_dinner') {
      return baseVehicleRate + 65;
    }
    if (bedouinPartyOption === 'vip_dinner') {
      return baseVehicleRate + 18;
    }
    if (bedouinPartyOption === 'standard_dinner' || bedouinPartyOption === 'with_safari') {
      return baseVehicleRate + 10;
    }

    return baseVehicleRate;
  };

  const dynamicHeaderPrice = getDynamicHeaderPrice();

  const getHeaderUnitLabel = () => {
    if (
      bedouinPartySubOption === 'dinner_proposal' ||
      bedouinPartySubOption === 'dinner_romantic' ||
      bedouinPartyOption === 'proposal_safari' ||
      bedouinPartyOption === 'romantic_dinner' ||
      experience?.activeSubTab === 'marry_me' ||
      experience?.activeSubTab === 'romantic_dinner' ||
      experience?.activeSubTab === 'proposal' ||
      experience?.activeSubTab === 'romantic' ||
      experience?.slug === 'marry-me-proposal-yacht' ||
      experience?.slug === 'marry-me-proposal-desert' ||
      experience?.slug === 'romantic-bedouin-candlelight-dinner' ||
      experience?.slug === 'romantic-vip-yacht-dinner'
    ) {
      return isAr ? 'باقة خاصة' : 'package';
    }
    if (!isSafari || isHorseCamelTab || isDinnerOnly || isBedouinStandaloneExp) {
      return isAr ? 'فرد واحد' : 'person';
    }
    if (buggy4Seater > 0) {
      return isAr ? 'عربة 4 مقاعد' : '4-seater';
    }
    if (buggy2Seater > 0) {
      return isAr ? 'عربة مقعدين' : '2-seater';
    }
    if (doubleQuads > 0) {
      return isAr ? 'بيتش باجي دبل' : 'double quad';
    }
    if (singleQuads > 0) {
      return isAr ? 'بيتش باجي سنجل' : 'single quad';
    }
    return t('search.guestSingle');
  };

  const handleProceedToCheckout = () => {
    const totalVehiclesCount = singleQuads + doubleQuads + buggy2Seater + buggy4Seater;
    if (!isDinnerOnly && !isHorseCamelTab && totalVehiclesCount === 0 && bedouinPartyOption === 'none') {
      alert(isAr ? 'يرجى اختيار مركبة واحدة على الأقل بالضغط على زر (+)' : 'Please select at least 1 vehicle by clicking (+)');
      return;
    }

    updateBooking({
      experience,
      date: selectedDate,
      timeSlot: selectedTime,
      adults,
      children: childrenCount,
      hotelName: hotel,
      singleQuads,
      doubleQuads,
      buggy2Seater,
      buggy4Seater,
      bedouinPartyOption,
      bedouinPartySubOption,
      privateTransfer,
      photoVideoPackage: photoVideo,
      bedouinScarf,
      desertGoggles,
      privateSafari,
      camelRide30min,
      horseRide1hr,
      telescopeStargazing,
      totalPrice: grandTotal
    });
    navigate('/checkout');
  };

  const whatsappMessage = isSafari
    ? `Hello! I want to reserve: ${experience.title || 'Safari Adventure'} on ${selectedDate} (${selectedTime}).\nVehicles: Single Quads: ${singleQuads}, Double Quads: ${doubleQuads}, 2-Seater Buggies: ${buggy2Seater}, 4-Seater Buggies: ${buggy4Seater}.\nBedouin Party: ${bedouinPartyOption}.\nGuests: ${adults} Adults, ${childrenCount} Kids.\nHotel: ${hotel || 'Sharm Resort'}.\nTotal: $${grandTotal}`
    : `Hello! I want to reserve: ${experience.title || 'Sinai Excursion'} on ${selectedDate} (${selectedTime}).\nGuests: ${adults} Adults, ${childrenCount} Kids.\nHotel: ${hotel || 'Sharm Resort'}.\nTotal: $${grandTotal}`;

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-xl space-y-6 sticky top-24 max-w-full overflow-hidden">
      
      {/* Header Price & Bank Rates */}
      <div className="pb-4 border-b border-stone-100 flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              {t('common.startingFrom')}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-black text-stone-900 font-heading">
                {formatPrice(dynamicHeaderPrice)}
              </span>
              <span className="text-xs text-stone-500 font-semibold">
                / {getHeaderUnitLabel()}
              </span>
            </div>
          </div>
        </div>

        {/* Live Exchange Rates (EUR / GBP / EGP) */}
        <div className="flex items-center flex-wrap gap-1.5 pt-1 text-[11px] font-bold">
          <span className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-700 border border-stone-200">
            €{Math.round(dynamicHeaderPrice * 0.893)} EUR
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-700 border border-stone-200">
            £{Math.round(dynamicHeaderPrice * 0.757)} GBP
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold shadow-2xs">
            {Math.round(dynamicHeaderPrice * 52.39)} {isAr ? 'ج.م' : 'EGP'}
          </span>
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="space-y-4">
        
        {/* Date Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 block">
            {t('search.selectDate')}
          </label>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#0284C7]"
          />
        </div>

        {/* Available Time Slots (Dynamic based on Safari/Dinner/Excursion Selection) */}
        {availableTimeSlots && availableTimeSlots.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700">{getLabel('timeSlot')}</label>
              {(isDinnerOnly || isSafariWithDinner || !isSafari || availableTimeSlots.length === 1) && (
                <span className="text-[10px] font-extrabold text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  {isAr ? 'موعد الاستقبال من الفندق' : 'Hotel Pickup'}
                </span>
              )}
            </div>
            <div className={`grid gap-1.5 ${availableTimeSlots.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {availableTimeSlots.map((time, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-between cursor-pointer ${
                    selectedTime === time
                      ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span>{time}</span>
                  {selectedTime === time && <Check className="w-3.5 h-3.5 text-[#0284C7]" />}
                </button>
              ))}
            </div>

            {/* Quick Preview Photos & Videos for this Time Slot (Safari ONLY) */}
            {isSafari && (
              <button
                type="button"
                onClick={() => {
                  setMediaModalSlot(getSlotIdFromTime(selectedTime));
                  setShowMediaModal(true);
                }}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-orange-50 via-amber-50 to-sky-50 hover:from-orange-100 hover:to-sky-100 border border-orange-200/90 text-[#EA580C] hover:text-orange-700 text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#F97316] group-hover:scale-110 transition" />
                <span>
                  {isAr
                    ? `📸 شاهد صور وفيديوهات موعد: ${selectedTime}`
                    : `📸 View Photos & Videos for: ${selectedTime}`}
                </span>
              </button>
            )}
          </div>
        )}

        {/* Guests Counter */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">
              {getLabel('adultsLabel')}
            </label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-900"
            >
              {[1,2,3,4,5,6,7,8,9,10,12,15].map(num => (
                <option key={num} value={num}>{num} {isAr ? 'بالغ' : 'Adult'}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700">{getLabel('childrenLabel')}</label>
            <select
              value={childrenCount}
              onChange={(e) => setChildrenCount(Number(e.target.value))}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-900"
            >
              {[0,1,2,3,4,5,6].map(num => (
                <option key={num} value={num}>{num} {isAr ? 'طفل' : 'Child'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Detailed Vehicles Selection or Horse/Camel Card */}
        {isSafari && (
          <div className="space-y-3 pt-3 border-t border-stone-100">
            {isHorseCamelTab ? (
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/90 text-amber-950 rounded-2xl text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold">{isAr ? 'جولة ركوب الخيل / الجمال المختارة:' : 'Selected Riding Tour:'}</span>
                  <span className="font-black text-[#0284C7] bg-white px-2.5 py-0.5 rounded-lg border border-sky-200 text-xs">
                    ${horseCamelRate} / {isAr ? 'فرد' : 'guest'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => experience?.onSubTabChange?.('camel')}
                    className={`p-2 rounded-xl text-center border font-bold text-xs transition ${
                      experience?.activeSubTab === 'camel'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>{isAr ? 'جمال' : 'Camels'}</div>
                    <div className="text-[10px] text-amber-500 font-extrabold">$10</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => experience?.onSubTabChange?.('horse')}
                    className={`p-2 rounded-xl text-center border font-bold text-xs transition ${
                      experience?.activeSubTab === 'horse'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>{isAr ? 'خيل عربي' : 'Horses'}</div>
                    <div className="text-[10px] text-amber-500 font-extrabold">$15</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => experience?.onSubTabChange?.('combo')}
                    className={`p-2 rounded-xl text-center border font-bold text-xs transition ${
                      experience?.activeSubTab === 'combo'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>{isAr ? 'كومبو' : 'Combo'}</div>
                    <div className="text-[10px] text-amber-500 font-extrabold">$25</div>
                  </button>
                </div>
                <p className="text-[11px] text-amber-800 font-medium">
                  {isAr ? 'يتم احتساب التكلفة تلقائياً بعدد الضيوف (البالغين والأطفال) شاملة خوذ الأمان والانتقال الفندقي.' : 'Calculated automatically per total guests including safety gear & hotel transfers.'}
                </p>
              </div>
            ) : bedouinPartyOption === 'dinner_only' ? (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs font-semibold">
                <span>{isAr ? 'تم اختيار حفلة وعشاء بدوي فقط (بدون قيادة مكن أو باجي). التوصيل بالفندق شامل مجاناً بدون إضافة رسوم مركبات.' : 'Selected Bedouin Dinner & Show only (No quad/buggy riding). Direct hotel transfer included with 0 vehicle fees.'}</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    {getLabel('vehicleSelection')}
                  </label>
                </div>

                <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              
                  {/* Single Quad */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 shadow-xs">
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {getLabel('singleQuadLabel')}
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold">{formatPrice(quadSinglePrice)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSingleQuads(Math.max(0, singleQuads - 1))}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-extrabold text-slate-900">{singleQuads}</span>
                      <button
                        type="button"
                        onClick={() => setSingleQuads(singleQuads + 1)}
                        className="w-7 h-7 rounded-lg bg-[#0284C7] text-white hover:bg-[#0369A1] flex items-center justify-center transition shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Double Quad */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 shadow-xs">
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {getLabel('doubleQuadLabel')}
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold">{formatPrice(quadDoublePrice)} ({isAr ? 'شخصان' : '2 Persons'})</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDoubleQuads(Math.max(0, doubleQuads - 1))}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-extrabold text-slate-900">{doubleQuads}</span>
                      <button
                        type="button"
                        onClick={() => setDoubleQuads(doubleQuads + 1)}
                        className="w-7 h-7 rounded-lg bg-[#0284C7] text-white hover:bg-[#0369A1] flex items-center justify-center transition shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 2-Seater Buggy */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 shadow-xs">
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {getLabel('buggy2Label')}
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold">{formatPrice(buggy2Price)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setBuggy2Seater(Math.max(0, buggy2Seater - 1))}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-extrabold text-slate-900">{buggy2Seater}</span>
                      <button
                        type="button"
                        onClick={() => setBuggy2Seater(buggy2Seater + 1)}
                        className="w-7 h-7 rounded-lg bg-[#0284C7] text-white hover:bg-[#0369A1] flex items-center justify-center transition shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 4-Seater Buggy */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 shadow-xs">
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {getLabel('buggy4Label')}
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold">{formatPrice(buggy4Price)} ({isAr ? 'عائلي 4 مقاعد' : 'Family 4 Seats'})</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setBuggy4Seater(Math.max(0, buggy4Seater - 1))}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-extrabold text-slate-900">{buggy4Seater}</span>
                      <button
                        type="button"
                        onClick={() => setBuggy4Seater(buggy4Seater + 1)}
                        className="w-7 h-7 rounded-lg bg-[#0284C7] text-white hover:bg-[#0369A1] flex items-center justify-center transition shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}

        {/* Bedouin Party Choice Selector */}
        {(isSafari || isBedouinStandaloneExp) && (
          <div className="space-y-2 pt-3 border-t border-stone-100">
            <label className="text-xs font-bold text-slate-900 block">
              {getLabel('bedouinPartySection')}
            </label>

            {!isBedouinStandaloneExp && (
              <div className="space-y-1.5">

                {/* ✅ DEFAULT: Safari Tour Only (No Dinner) - First & Active by default */}
                <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${bedouinPartyOption === 'none' ? 'bg-[#0284C7]/10 border-[#0284C7]' : 'bg-stone-50 border-stone-200'}`}>
                  <input
                    type="radio"
                    name="bedouinPartyOption"
                    value="none"
                    checked={bedouinPartyOption === 'none'}
                    onChange={() => setBedouinPartyOption('none')}
                    className="mt-0.5 accent-[#0284C7]"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{isAr ? 'جولة سفاري (بدون حفلة أو عشاء)' : 'Safari Tour Only (No Dinner)'}</div>
                    <div className="text-[10px] text-slate-500">{isAr ? 'رحلة قيادة المركبات فقط — بيتش باجي أو كار باجي — بدون عشاء أو عروض مسائية' : 'Pure riding experience — ATV Quad or Dune Buggy — without evening show or dinner'}</div>
                  </div>
                </label>

                <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${(bedouinPartyOption === 'standard_dinner' || bedouinPartyOption === 'with_safari') ? 'bg-sky-50/80 border-[#0284C7]' : 'bg-stone-50 border-stone-200'}`}>
                  <input
                    type="radio"
                    name="bedouinPartyOption"
                    value="standard_dinner"
                    checked={bedouinPartyOption === 'standard_dinner' || bedouinPartyOption === 'with_safari'}
                    onChange={() => setBedouinPartyOption('standard_dinner')}
                    className="mt-0.5 accent-[#0284C7]"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{getLabel('bedouinStandardSafari')}</div>
                    <div className="text-[10px] text-slate-500">{isAr ? 'شاملة قيادة المركبات + العشاء البدوي المشوي والاستعراضات الشرقية (10$ للفرد)' : 'Includes Quad/Buggy ride + Standard Bedouin BBQ dinner & oriental show (+$10/person)'}</div>
                  </div>
                </label>

                <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${bedouinPartyOption === 'vip_dinner' ? 'bg-amber-50/90 border-amber-500' : 'bg-stone-50 border-stone-200'}`}>
                  <input
                    type="radio"
                    name="bedouinPartyOption"
                    value="vip_dinner"
                    checked={bedouinPartyOption === 'vip_dinner'}
                    onChange={() => setBedouinPartyOption('vip_dinner')}
                    className="mt-0.5 accent-amber-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-amber-900">
                      {getLabel('bedouinVipSafari')}
                    </div>
                    <div className="text-[10px] text-amber-700">{isAr ? 'عشاء VIP فاخر بوفيه خاص + خدمات ممتازة مع السفاري (18$ للفرد)' : 'VIP Premium Buffet & exclusive seating with Safari (+$18/person)'}</div>
                  </div>
                </label>

                <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${bedouinPartyOption === 'romantic_dinner' ? 'bg-rose-50/90 border-rose-500' : 'bg-stone-50 border-stone-200'}`}>
                  <input
                    type="radio"
                    name="bedouinPartyOption"
                    value="romantic_dinner"
                    checked={bedouinPartyOption === 'romantic_dinner'}
                    onChange={() => setBedouinPartyOption('romantic_dinner')}
                    className="mt-0.5 accent-rose-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-rose-900">
                      {getLabel('bedouinRomanticDinner')}
                    </div>
                    <div className="text-[10px] text-rose-700">{isAr ? 'عشاء خاص لشخصين في خيمة معزولة بالشموع والورود بعد جولة السفاري' : 'Private candlelight tent dinner for two after the safari ride'}</div>
                  </div>
                </label>

                <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${bedouinPartyOption === 'proposal_safari' ? 'bg-amber-50/90 border-amber-500' : 'bg-stone-50 border-stone-200'}`}>
                  <input
                    type="radio"
                    name="bedouinPartyOption"
                    value="proposal_safari"
                    checked={bedouinPartyOption === 'proposal_safari'}
                    onChange={() => setBedouinPartyOption('proposal_safari')}
                    className="mt-0.5 accent-amber-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-amber-900">
                      {getLabel('bedouinProposalSafari')}
                    </div>
                    <div className="text-[10px] text-amber-700">{isAr ? 'حروف مضيئة MARRY ME وألعاب نارية وتصوير احترافي كامل بين الجبال' : 'Giant illuminated MARRY ME letters, fireworks & full photo/drone shoot'}</div>
                  </div>
                </label>

                <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${bedouinPartyOption === 'dinner_only' ? 'bg-sky-50/80 border-[#0284C7]' : 'bg-stone-50 border-stone-200'}`}>
                  <input
                    type="radio"
                    name="bedouinPartyOption"
                    value="dinner_only"
                    checked={bedouinPartyOption === 'dinner_only'}
                    onChange={() => {
                      setBedouinPartyOption('dinner_only');
                      setSingleQuads(0);
                      setDoubleQuads(0);
                      setBuggy2Seater(0);
                      setBuggy4Seater(0);
                    }}
                    className="mt-0.5 accent-[#0284C7]"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{getLabel('bedouinDinnerOnly')}</div>
                    <div className="text-[10px] text-slate-500">{isAr ? 'توصيل مباشر للفندق للخيمة البدوية للعشاء والحفلة فقط بدون قيادة مكن' : 'Direct hotel VIP transfer to Bedouin tent for Dinner & Show (No riding)'}</div>
                  </div>
                </label>

              </div>
            )}

            {/* Standalone Dinner Packages (When Bedouin page OR Dinner Only selected) */}
            {(isBedouinStandaloneExp || bedouinPartyOption === 'dinner_only') && (
              <div className="space-y-2 mt-3 pt-3 border-t border-dashed border-orange-200 bg-orange-50/50 p-3 rounded-2xl">
                <label className="text-xs font-black text-orange-950 block">
                  {isAr ? 'اختر باقة العشاء البدوي المستقلة (شاملة الترانسفير):' : 'Select Standalone Bedouin Dinner Package (Transfers Included):'}
                </label>

                <div className="space-y-1.5">
                  <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${bedouinPartySubOption === 'dinner_standard' ? 'bg-white border-orange-500 shadow-xs' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bedouinPartySubOption"
                        value="dinner_standard"
                        checked={bedouinPartySubOption === 'dinner_standard'}
                        onChange={() => {
                          setBedouinPartySubOption('dinner_standard');
                          if (experience?.activeTab === 'bedouin') {
                            experience?.onSubTabChange?.('standard');
                          }
                        }}
                        className="accent-orange-600"
                      />
                      <span className="text-xs font-bold text-stone-900">{getLabel('dinnerStandardLabel')}</span>
                    </div>
                  </label>

                  <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${bedouinPartySubOption === 'dinner_vip' ? 'bg-amber-100/80 border-amber-500 shadow-xs' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bedouinPartySubOption"
                        value="dinner_vip"
                        checked={bedouinPartySubOption === 'dinner_vip'}
                        onChange={() => {
                          setBedouinPartySubOption('dinner_vip');
                          if (experience?.activeTab === 'bedouin') {
                            experience?.onSubTabChange?.('vip');
                          }
                        }}
                        className="accent-amber-600"
                      />
                      <span className="text-xs font-bold text-amber-950">
                        {getLabel('dinnerVipLabel')}
                      </span>
                    </div>
                  </label>

                  <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${bedouinPartySubOption === 'dinner_stargazing' ? 'bg-sky-50 border-sky-500 shadow-xs' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bedouinPartySubOption"
                        value="dinner_stargazing"
                        checked={bedouinPartySubOption === 'dinner_stargazing'}
                        onChange={() => setBedouinPartySubOption('dinner_stargazing')}
                        className="accent-sky-600"
                      />
                      <span className="text-xs font-bold text-sky-950">
                        {getLabel('dinnerStargazingLabel')}
                      </span>
                    </div>
                  </label>

                  <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${bedouinPartySubOption === 'dinner_vip_stargazing' ? 'bg-purple-50 border-purple-500 shadow-xs' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bedouinPartySubOption"
                        value="dinner_vip_stargazing"
                        checked={bedouinPartySubOption === 'dinner_vip_stargazing'}
                        onChange={() => {
                          setBedouinPartySubOption('dinner_vip_stargazing');
                          if (experience?.activeTab === 'bedouin') {
                            experience?.onSubTabChange?.('vip');
                          }
                        }}
                        className="accent-purple-600"
                      />
                      <span className="text-xs font-bold text-purple-950">
                        {getLabel('dinnerVipStargazingLabel')}
                      </span>
                    </div>
                  </label>

                  <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${bedouinPartySubOption === 'dinner_romantic' ? 'bg-rose-50 border-rose-500 shadow-xs ring-1 ring-rose-400' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bedouinPartySubOption"
                        value="dinner_romantic"
                        checked={bedouinPartySubOption === 'dinner_romantic'}
                        onChange={() => {
                          setBedouinPartySubOption('dinner_romantic');
                          if (experience?.activeTab === 'bedouin') {
                            experience?.onSubTabChange?.('romantic');
                          }
                        }}
                        className="accent-rose-600"
                      />
                      <div>
                        <span className="text-xs font-bold text-rose-950 block">
                          {getLabel('dinnerRomanticLabel')}
                        </span>
                        <span className="text-[10px] text-rose-700">
                          {isAr ? 'خيمة خاصة لشخصين بالشموع والورود وعشاء مشويات' : 'Private tent for two with candles, roses & BBQ'}
                        </span>
                      </div>
                    </div>
                  </label>

                  <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${bedouinPartySubOption === 'dinner_proposal' ? 'bg-amber-100/90 border-amber-600 shadow-xs ring-1 ring-amber-500' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="bedouinPartySubOption"
                        value="dinner_proposal"
                        checked={bedouinPartySubOption === 'dinner_proposal'}
                        onChange={() => {
                          setBedouinPartySubOption('dinner_proposal');
                          if (experience?.activeTab === 'bedouin') {
                            experience?.onSubTabChange?.('proposal');
                          }
                        }}
                        className="accent-amber-600"
                      />
                      <div>
                        <span className="text-xs font-bold text-amber-950 block">
                          {getLabel('dinnerProposalLabel')}
                        </span>
                        <span className="text-[10px] text-amber-700">
                          {isAr ? 'حروف MARRY ME المضيئة وألعاب نارية وتصوير فوتوسيشن ودرون' : 'MARRY ME letters, fireworks & drone photo/video shoot'}
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hotel Pickup Location */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold text-stone-700 block">
            {t('checkout.hotelName')}
          </label>
          <input
            type="text"
            placeholder={getLabel('hotelPlaceholder')}
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#0284C7]"
          />
        </div>

        {/* Optional Add-ons */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">{getLabel('optionalExtras')}</label>

          {/* Private Transfer — dynamically switches to 14-seater van if > 6 pax */}
          <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100 transition">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={privateTransfer}
                  onChange={(e) => setPrivateTransfer(e.target.checked)}
                  className="w-4 h-4 accent-[#0284C7] rounded"
                />
                <span className="text-xs font-semibold text-stone-800">
                  {totalPeopleCount > 6
                    ? (isAr ? 'سيارة فان 14 راكب' : '14-Seater Van Transfer')
                    : (isAr ? 'سيارة خاصة VIP' : 'Private VIP Car Transfer')}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 pl-6">
                {isAr
                  ? (totalPeopleCount > 6 ? 'سيارة فان 14 راكب (لأكثر من 6 أفراد)' : 'سيارة خاصة (حتى 6 أفراد)')
                  : (totalPeopleCount > 6 ? '14-Seater Van (more than 6 guests)' : 'Private Car (up to 6 guests)')}
              </span>
            </div>
            <span className="text-xs font-bold text-stone-900">
              +€{totalPeopleCount > 6 ? 30 : 20}
            </span>
          </label>

          {/* Photo & Video Package — always shown */}
          <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100 transition">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={photoVideo}
                onChange={(e) => setPhotoVideo(e.target.checked)}
                className="w-4 h-4 accent-[#0284C7] rounded"
              />
              <span className="text-xs font-semibold text-stone-800">{getLabel('photoPackage')}</span>
            </div>
            <span className="text-xs font-bold text-stone-900">+€25</span>
          </label>

          {/* Bedouin Scarf — shown on safari & horse/camel tabs */}
          {(isSafari || isHorseCamelTab) && (
            <>
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={bedouinScarf}
                    onChange={(e) => setBedouinScarf(e.target.checked)}
                    className="w-4 h-4 accent-[#0284C7] rounded"
                  />
                  <span className="text-xs font-semibold text-stone-800">{getLabel('bedouinScarf')}</span>
                </div>
                <span className="text-xs font-bold text-stone-900">+€{bedouinScarfPrice}</span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={desertGoggles}
                    onChange={(e) => setDesertGoggles(e.target.checked)}
                    className="w-4 h-4 accent-[#0284C7] rounded"
                  />
                  <span className="text-xs font-semibold text-stone-800">{getLabel('desertGoggles')}</span>
                </div>
                <span className="text-xs font-bold text-stone-900">+€{desertGogglesPrice}</span>
              </label>
            </>
          )}

          {/* Safari-specific extras */}
          {isSafari && (
            <>
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={privateSafari}
                    onChange={(e) => setPrivateSafari(e.target.checked)}
                    className="w-4 h-4 accent-[#0284C7] rounded"
                  />
                  <span className="text-xs font-semibold text-stone-800">{getLabel('privateSafari')}</span>
                </div>
                <span className="text-xs font-bold text-stone-900">+{formatPrice(15)}</span>
              </label>

              {/* Camel / Horse add-on for safari or bedouin tabs */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={camelRide30min}
                    onChange={(e) => setCamelRide30min(e.target.checked)}
                    className="w-4 h-4 accent-[#0284C7] rounded"
                  />
                  <span className="text-xs font-semibold text-stone-800">{getLabel('camelRideLabel')}</span>
                </div>
                <span className="text-xs font-bold text-stone-900">+{formatPrice(camelExtra)}</span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={horseRide1hr}
                    onChange={(e) => setHorseRide1hr(e.target.checked)}
                    className="w-4 h-4 accent-[#0284C7] rounded"
                  />
                  <span className="text-xs font-semibold text-stone-800">{getLabel('horseRideLabel')}</span>
                </div>
                <span className="text-xs font-bold text-stone-900">+{formatPrice(horseExtra)}</span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={telescopeStargazing}
                    onChange={(e) => setTelescopeStargazing(e.target.checked)}
                    className="w-4 h-4 accent-[#0284C7] rounded"
                  />
                  <span className="text-xs font-semibold text-stone-800">{getLabel('telescopeLabel')}</span>
                </div>
                <span className="text-xs font-bold text-stone-900">+{formatPrice(5)}</span>
              </label>
            </>
          )}

          {/* Camel + Horse add-ons shown on Bedouin dinner tab (combo option) */}
          {(isBedouinStandaloneExp || experience?.activeTab === 'bedouin') && (
            <>
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-amber-100 bg-amber-50 cursor-pointer hover:bg-amber-100 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={camelRide30min}
                    onChange={(e) => setCamelRide30min(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                  <div>
                    <span className="text-xs font-semibold text-stone-800">{isAr ? 'أضف جولة جمال قبل العشاء' : 'Add Camel Ride before Dinner'}</span>
                    <div className="text-[10px] text-amber-700 font-medium">{isAr ? 'حجز مدمج مع العشاء البدوي' : 'Combined with Bedouin dinner booking'}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-800">+{formatPrice(camelExtra)}/{isAr ? 'فرد' : 'pax'}</span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-amber-100 bg-amber-50 cursor-pointer hover:bg-amber-100 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={horseRide1hr}
                    onChange={(e) => setHorseRide1hr(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                  <div>
                    <span className="text-xs font-semibold text-stone-800">{isAr ? 'أضف جولة خيل قبل العشاء' : 'Add Horse Ride before Dinner'}</span>
                    <div className="text-[10px] text-amber-700 font-medium">{isAr ? 'حجز مدمج مع العشاء البدوي' : 'Combined with Bedouin dinner booking'}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-800">+{formatPrice(horseExtra)}/{isAr ? 'فرد' : 'pax'}</span>
              </label>
            </>
          )}

          {/* Safari Romantic & Marry Me Addons */}
          {isSafari && (
            <>
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-rose-200 bg-rose-50/70 cursor-pointer hover:bg-rose-100/70 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={romanticBedouinUpgrade}
                    onChange={(e) => setRomanticBedouinUpgrade(e.target.checked)}
                    className="w-4 h-4 accent-rose-600 rounded"
                  />
                  <div>
                    <span className="text-xs font-semibold text-rose-950 block">{isAr ? 'عشاء رومانسي خاص بالشموع لشخصين في خيمة بدوية' : 'Romantic Candlelight Bedouin Tent for 2'}</span>
                    <span className="text-[10px] text-rose-700">{isAr ? 'خيمة خاصة معزولة مزينة بالشموع والورود وعشاء مشويات' : 'Private secluded tent with candles, roses & BBQ'}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-900">+${65}</span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 cursor-pointer hover:bg-amber-100/70 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={proposalBedouinUpgrade}
                    onChange={(e) => setProposalBedouinUpgrade(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                  <div>
                    <span className="text-xs font-semibold text-amber-950 block">{isAr ? 'باقة طلب الزواج VIP البدوية (Marry Me)' : 'VIP Desert Marry Me Proposal Setup'}</span>
                    <span className="text-[10px] text-amber-700">{isAr ? 'حروف MARRY ME المضيئة وألعاب نارية وورود وتصوير دروب' : 'Illuminated letters, fireworks, roses & drone shoot'}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-900">+${180}</span>
              </label>
            </>
          )}

          {/* Sea / Yacht Romantic & Marry Me Addons */}
          {(!isSafari && (experience?.category === 'yacht' || experience?.category === 'sea' || experience?.activeTab === 'yacht' || experience?.slug?.includes('yacht'))) && (
            <>
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-rose-200 bg-rose-50/70 cursor-pointer hover:bg-rose-100/70 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={yachtRomanticUpgrade}
                    onChange={(e) => setYachtRomanticUpgrade(e.target.checked)}
                    className="w-4 h-4 accent-rose-600 rounded"
                  />
                  <div>
                    <span className="text-xs font-semibold text-rose-950 block">{isAr ? 'ترقية لعشاء يخت رومانسي خاص لشخصين بالشموع' : 'Romantic VIP Yacht Candlelight Seafood Dinner for 2'}</span>
                    <span className="text-[10px] text-rose-700">{isAr ? 'يخت VIP خاص بالغروب، سي فود فاخر، ورود، وعزف كمان' : 'Private sunset yacht deck, seafood, roses & live violin'}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-900">+${95}</span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 cursor-pointer hover:bg-amber-100/70 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={yachtProposalUpgrade}
                    onChange={(e) => setYachtProposalUpgrade(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                  <div>
                    <span className="text-xs font-semibold text-amber-950 block">{isAr ? 'باقة طلب الزواج VIP على سطح اليخت (Marry Me)' : 'VIP Yacht Marry Me Proposal Package'}</span>
                    <span className="text-[10px] text-amber-700">{isAr ? 'حروف MARRY ME المضيئة وألعاب نارية فوق البحر وتصوير احترافي' : 'Illuminated letters on deck, fireworks, roses & drone shoot'}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-900">+${220}</span>
              </label>
            </>
          )}
        </div>

      </div>

      {/* Calculation Total Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white space-y-2.5 border border-slate-800 shadow-xl">
        {isSafari && grandTotal === 0 && (
          <div className="text-[11px] text-amber-300/90 font-medium pb-1.5 border-b border-slate-800">
            {isAr
              ? 'لم يتم اختيار مركبات أو عشاء بعد (اضغط + لإضافة مركبة)'
              : 'No vehicles or dinner selected yet (Click + to add)'}
          </div>
        )}
        {!isSafari && excursionTotal > 0 && (
          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>{isAr ? `تكلفة الرحلة (${adults} بالغين${childrenCount > 0 ? ` + ${childrenCount} أطفال` : ''})` : `Tour Price (${adults} Adults${childrenCount > 0 ? ` + ${childrenCount} Kids` : ''})`}</span>
            <span className="font-bold text-white">{formatPrice(excursionTotal)}</span>
          </div>
        )}
        {isHorseCamelTab && horseCamelTotal > 0 && (
          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>{isAr ? `تكلفة جولة الركوب (${adults + childrenCount} أفراد)` : `Riding Cost (${adults + childrenCount} guests)`}</span>
            <span className="font-bold text-white">{formatPrice(horseCamelTotal)}</span>
          </div>
        )}
        {vehiclesPrice > 0 && (
          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>{isAr ? 'تكلفة المركبات' : 'Vehicles Total'}</span>
            <span className="font-bold text-white">{formatPrice(vehiclesPrice)}</span>
          </div>
        )}
        {partyFee > 0 && (
          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>{isAr ? 'رسوم الحفلة والعشاء البدوي' : 'Bedouin Dinner & Show Fee'}</span>
            <span className="font-bold text-amber-300">+{formatPrice(partyFee)}</span>
          </div>
        )}
        {extrasTotal > 0 && (
          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>{isAr ? 'الإضافات الاختيارية' : 'Selected Extras'}</span>
            <span className="font-bold text-amber-300">+{formatPrice(extrasTotal)}</span>
          </div>
        )}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-extrabold text-[#38BDF8] block">
              {t('checkout.total')}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {isAr ? 'شامل الانتقالات والضريبة' : 'Transfers & taxes included'}
            </span>
          </div>
          <div className="text-end rtl:text-left ltr:text-right">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">
              {formatPrice(grandTotal)}
            </span>
            {grandTotal > 0 && (
              <div className="text-[11px] font-bold text-emerald-300 mt-0.5">
                ≈ {Math.round(grandTotal * 52.39)} {isAr ? 'ج.م' : 'EGP'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={handleProceedToCheckout}
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] hover:from-[#0369A1] hover:to-[#0c4a6e] text-white font-black text-sm sm:text-base shadow-lg shadow-sky-600/30 hover:shadow-sky-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t('checkout.confirmOrder')}</span>
        </button>

        <a
          href={getWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-2 border-emerald-300/80 font-black text-xs sm:text-sm rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.99]"
        >
          <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
          <span>{t('common.askWhatsapp')}</span>
        </a>
      </div>

      {/* Micro Trust Badges */}
      <div className="pt-1 flex items-center justify-center flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{getLabel('freeCancellation')}</span>
        </div>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{getLabel('payOnArrival')}</span>
        </div>
      </div>

      {/* Time Slot Specific Media Lightbox Modal */}
      <TripSlotMediaModal
        isOpen={showMediaModal}
        onClose={() => setShowMediaModal(false)}
        category={experience?.activeTab || experience?.category || 'atv'}
        subCategory={experience?.activeSubTab || 'all'}
        initialSlot={mediaModalSlot}
        onSelectSlotAndBook={(slotId, slotTime) => {
          const matched = availableTimeSlots.find(t => t.includes(slotTime.slice(0, 5))) || availableTimeSlots[0];
          if (matched) setSelectedTime(matched);
        }}
      />

    </div>
  );
};

export default BookingWidget;
