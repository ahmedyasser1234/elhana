import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Search, Compass, Calendar, Clock, Users, Sparkles, Check,
  ChevronRight, ChevronLeft, ArrowRight, ArrowLeft, Star, ShieldCheck,
  CheckCircle2, Plus, Minus, Flame, Sunset, Sunrise, Sun, Moon, Info
} from 'lucide-react';
import { EXPERIENCES, getLocalizedExperience } from '../../data/experiences';
import { useBooking } from '../../context/BookingContext';
import { useCurrency } from '../../context/CurrencyContext';

export const QuickAdventureBookingModal = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const navigate = useNavigate();
  const {
    isAdventureModalOpen,
    closeAdventureModal,
    modalInitialExperience,
    setBookingDraft,
    calculateTotal
  } = useBooking();
  const { formatPrice } = useCurrency();

  // Wizard Step: 1 = Choose Adventure, 2 = Configure Details & Calculate Total
  const [step, setStep] = useState(1);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Selected Experience
  const [selectedExp, setSelectedExp] = useState(null);

  // Booking details configuration
  const [bookingDate, setBookingDate] = useState(() => {
    // Tomorrow by default
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    return tm.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('04:00 PM');
  
  // Passengers / Vehicles
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Safari vehicles (if applicable)
  const [singleQuads, setSingleQuads] = useState(1);
  const [doubleQuads, setDoubleQuads] = useState(0);
  const [buggy2Seater, setBuggy2Seater] = useState(0);
  const [buggy4Seater, setBuggy4Seater] = useState(0);

  // Extras
  const [bedouinPartyOption, setBedouinPartyOption] = useState('none');
  const [privateTransfer, setPrivateTransfer] = useState(false);
  const [photoVideoPackage, setPhotoVideoPackage] = useState(false);
  const [bedouinScarf, setBedouinScarf] = useState(false);
  const [desertGoggles, setDesertGoggles] = useState(false);
  const [camelRide30min, setCamelRide30min] = useState(false);
  const [telescopeStargazing, setTelescopeStargazing] = useState(false);

  // Reset or preset when modal opens
  useEffect(() => {
    if (isAdventureModalOpen) {
      if (modalInitialExperience) {
        setSelectedExp(modalInitialExperience);
        setStep(2);
      } else {
        // If none pre-selected, start at step 1 or default to ATV if they want
        setStep(1);
      }
    }
  }, [isAdventureModalOpen, modalInitialExperience]);

  // Categories list
  const categories = useMemo(() => [
    { id: 'all', label: isAr ? 'جميع الرحلات (20+)' : 'All Trips (20+)', icon: '✨' },
    { id: 'safari', label: isAr ? '🏜️ سفاري الصحراء والبيتش باجي' : '🏜️ Desert Safari & Buggy', filter: ['atv', 'buggy', 'safari', 'camel', 'horse'] },
    { id: 'sea', label: isAr ? '🛥️ رحلات البحر الأحمر واليخوت' : '🛥️ Red Sea & Yacht Trips', filter: ['yacht', 'snorkeling', 'diving', 'parasailing', 'banana', 'sea'] },
    { id: 'excursions', label: isAr ? '🏖️ رحلات سيناء (دهب، كاترين، طابا)' : '🏖️ Sinai Excursions (Dahab, Taba)', filter: ['dahab', 'excursions'] },
    { id: 'romantic', label: isAr ? '💍 عروض المناسبات والرومانسية' : '💍 Special Events & Proposals', filter: ['yacht', 'bedouin'] },
  ], [isAr]);

  // Filtered experiences
  const filteredExperiences = useMemo(() => {
    return EXPERIENCES.filter((exp) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const catObj = categories.find(c => c.id === selectedCategory);
        if (catObj && catObj.filter) {
          if (selectedCategory === 'romantic') {
            const isRomantic = exp.slug.includes('marry-me') || exp.slug.includes('romantic');
            if (!isRomantic) return false;
          } else {
            const matchesCat = catObj.filter.includes(exp.category);
            if (!matchesCat) return false;
          }
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const locExp = getLocalizedExperience(exp, i18n.language);
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (locExp?.title || exp.title).toLowerCase().includes(q);
        const descMatch = (locExp?.shortDescription || exp.shortDescription || '').toLowerCase().includes(q);
        const locMatch = (locExp?.location || exp.location || '').toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !locMatch) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, categories, i18n.language]);

  // Check if chosen experience is a safari/buggy vehicle activity
  const isSafariType = useMemo(() => {
    if (!selectedExp) return false;
    const cat = selectedExp.category;
    const slug = selectedExp.slug;
    return cat === 'atv' || cat === 'buggy' || cat === 'safari' || slug.includes('safari') || slug.includes('quad') || slug.includes('buggy');
  }, [selectedExp]);

  // Available Time Slots for selected experience
  const availableSlots = useMemo(() => {
    if (selectedExp?.availableTimes && selectedExp.availableTimes.length > 0) {
      return selectedExp.availableTimes.map((t) => {
        // e.g. "04:30 AM (Daily Pickup)" or "04:30 صباحاً (الشروق)"
        return { label: t, value: t.split(' ')[0] + ' ' + (t.includes('PM') || t.includes('مساء') ? 'PM' : 'AM') };
      });
    }

    if (isSafariType) {
      return [
        { label: isAr ? '🌅 04:30 AM - رحلة الشروق (الفجر)' : '🌅 04:30 AM - Sunrise Safari', value: '04:30 AM' },
        { label: isAr ? '☀️ 09:00 AM - رحلة الصباح والسرعة' : '☀️ 09:00 AM - Morning Safari', value: '09:00 AM' },
        { label: isAr ? '🌇 04:00 PM - رحلة الغروب الذهبية (الأكثر طلباً)' : '🌇 04:00 PM - Golden Sunset (Popular)', value: '04:00 PM' },
        { label: isAr ? '🌙 06:30 PM - سهرة العشاء البدوي والحفلة' : '🌙 06:30 PM - Bedouin Dinner & Show', value: '06:30 PM' }
      ];
    }

    return [
      { label: isAr ? '08:00 AM - صباحاً (الموعد الرئيسي)' : '08:00 AM - Morning Departure', value: '08:00 AM' },
      { label: isAr ? '09:30 AM - صباحاً (فترة ثانية)' : '09:30 AM - Late Morning', value: '09:30 AM' },
      { label: isAr ? '02:00 PM - ظهراً (فترة مسائية)' : '02:00 PM - Afternoon Tour', value: '02:00 PM' }
    ];
  }, [selectedExp, isSafariType, isAr]);

  // Set default time slot whenever slots change
  useEffect(() => {
    if (availableSlots.length > 0) {
      setSelectedTimeSlot(availableSlots[0].value);
    }
  }, [availableSlots]);

  // Calculate Live Total dynamically
  const liveTotal = useMemo(() => {
    if (!selectedExp) return 0;

    let base = 0;
    const basePrice = selectedExp.startingPrice || 15;

    if (isSafariType && (singleQuads > 0 || doubleQuads > 0 || buggy2Seater > 0 || buggy4Seater > 0)) {
      base = (singleQuads * 15) + (doubleQuads * 20) + (buggy2Seater * 28) + (buggy4Seater * 32);
    } else {
      base = (adults * basePrice) + (children * basePrice * 0.6);
    }

    let extras = 0;
    const totalPeople = isSafariType
      ? Math.max(adults + children, (singleQuads * 1) + (doubleQuads * 2) + (buggy2Seater * 2) + (buggy4Seater * 4))
      : (adults + children);

    if (privateTransfer) {
      extras += totalPeople > 6 ? 34 : 22;
    }
    if (photoVideoPackage) extras += 28;
    if (bedouinScarf) extras += (4 * Math.max(1, adults));
    if (desertGoggles) extras += (6 * Math.max(1, adults));
    if (camelRide30min) extras += (10 * Math.max(1, adults));
    if (telescopeStargazing) extras += (5 * Math.max(1, adults));

    if (bedouinPartyOption === 'vip_dinner') {
      extras += (adults * 18) + (children * 10);
    } else if (bedouinPartyOption === 'standard_dinner') {
      extras += (adults * 10) + (children * 5);
    }

    return Math.round(base + extras);
  }, [
    selectedExp, isSafariType, adults, children,
    singleQuads, doubleQuads, buggy2Seater, buggy4Seater,
    privateTransfer, photoVideoPackage, bedouinScarf, desertGoggles,
    camelRide30min, telescopeStargazing, bedouinPartyOption
  ]);

  // Proceed to Checkout
  const handleProceedToCheckout = () => {
    if (!selectedExp) return;

    // Push configured values into BookingContext
    setBookingDraft(prev => ({
      ...prev,
      experience: selectedExp,
      date: bookingDate,
      timeSlot: selectedTimeSlot,
      adults: adults,
      children: children,
      singleQuads: isSafariType ? singleQuads : 0,
      doubleQuads: isSafariType ? doubleQuads : 0,
      buggy2Seater: isSafariType ? buggy2Seater : 0,
      buggy4Seater: isSafariType ? buggy4Seater : 0,
      bedouinPartyOption: bedouinPartyOption,
      privateTransfer: privateTransfer,
      photoVideoPackage: photoVideoPackage,
      bedouinScarf: bedouinScarf,
      desertGoggles: desertGoggles,
      camelRide30min: camelRide30min,
      telescopeStargazing: telescopeStargazing,
    }));

    closeAdventureModal();
    navigate('/checkout');
  };

  if (!isAdventureModalOpen) return null;

  const locSelectedExp = selectedExp ? getLocalizedExperience(selectedExp, i18n.language) : null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden"
      onClick={closeAdventureModal}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-700/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center shadow-lg shadow-[#0284C7]/30 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <h2 className="text-base sm:text-lg font-black font-heading tracking-tight">
                  {isAr ? 'احجز مغامرتك في شرم الشيخ' : 'Book Your Sharm Adventure'}
                </h2>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {step === 1
                  ? (isAr ? 'اختر الرحلة المطلوبة من قائمتنا المميزة للانتقال لتأكيد الحجز' : 'Choose your desired tour from our verified excursions')
                  : (isAr ? `تحديد تفاصيل: ${locSelectedExp?.title || selectedExp?.title}` : `Configuring: ${locSelectedExp?.title || selectedExp?.title}`)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Step Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <span className={step === 1 ? 'text-[#38BDF8] font-black' : 'text-slate-400'}>
                1. {isAr ? 'اختر الرحلة' : 'Select Tour'}
              </span>
              <span className="text-slate-500">→</span>
              <span className={step === 2 ? 'text-[#38BDF8] font-black' : 'text-slate-400'}>
                2. {isAr ? 'التفاصيل والحساب' : 'Details & Total'}
              </span>
            </div>

            <button
              type="button"
              onClick={closeAdventureModal}
              className="p-2 rounded-xl bg-white/10 text-slate-300 hover:bg-red-500 hover:text-white transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 bg-slate-50/60">
          
          {/* STEP 1: CHOOSE ADVENTURE */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Search & Categories Filter Bar */}
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs space-y-3">
                {/* Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isAr ? 'ابحث عن أي رحلة (سفاري، يخت رأس محمد، دهب، غوص، براشيل...)' : 'Search tours (safari, yacht, dahab, diving...)'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-9 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:bg-white transition"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-3 rtl:right-auto ltr:right-3 ltr:left-auto text-slate-400 hover:text-slate-600 text-xs p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer shrink-0 ${
                          isActive
                            ? 'bg-[#0284C7] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid of Tours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredExperiences.map((exp) => {
                  const locExp = getLocalizedExperience(exp, i18n.language);
                  const title = locExp?.title || exp.title;
                  const image = exp.images?.[0] || '/images/hero-safari.jpg';
                  const isSelected = selectedExp?.slug === exp.slug;

                  return (
                    <div
                      key={exp.id || exp.slug}
                      onClick={() => {
                        setSelectedExp(exp);
                        setStep(2);
                      }}
                      className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between hover:shadow-lg cursor-pointer ${
                        isSelected
                          ? 'border-[#0284C7] ring-2 ring-[#0284C7]/20 shadow-md'
                          : 'border-slate-200 hover:border-[#0284C7]/60'
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={image}
                          alt={title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                        {/* Badges */}
                        <div className="absolute top-2.5 right-2.5 rtl:left-2.5 rtl:right-auto flex items-center gap-1.5">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-xs">
                            {locExp?.duration || exp.duration || '3 Hours'}
                          </span>
                        </div>

                        <div className="absolute bottom-2.5 right-2.5 rtl:right-2.5 rtl:left-auto left-2.5 text-white flex items-center justify-between">
                          <span className="text-xs font-black text-amber-300 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-300" />
                            {exp.rating || 4.9}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#0284C7] tracking-wider block">
                            {locExp?.categoryLabel || exp.categoryLabel || exp.category}
                          </span>
                          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#0284C7] transition font-heading line-clamp-2 mt-0.5">
                            {title}
                          </h3>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 block">{isAr ? 'ابتداءً من' : 'From'}</span>
                            <span className="text-sm sm:text-base font-black text-slate-900 font-heading">
                              {formatPrice(exp.startingPrice || 15)}
                            </span>
                          </div>

                          <button
                            type="button"
                            className="py-1.5 px-3 rounded-xl bg-sky-50 text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white font-extrabold text-xs transition flex items-center gap-1"
                          >
                            <span>{isAr ? 'اختيار' : 'Select'}</span>
                            {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredExperiences.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <Compass className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-600">
                    {isAr ? 'لم نعثر على رحلات تطابق بحثك' : 'No tours matched your search'}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                    className="text-xs font-bold text-[#0284C7] hover:underline"
                  >
                    {isAr ? 'إعادة ضبط كل الفلاتر' : 'Reset all filters'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: CONFIGURE DETAILS & CALCULATE TOTAL */}
          {step === 2 && selectedExp && (
            <div className="space-y-4">
              
              {/* Selected Trip Banner */}
              <div className="bg-white rounded-2xl p-4 border border-sky-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedExp.images?.[0] || '/images/hero-safari.jpg'}
                    alt={locSelectedExp?.title || selectedExp.title}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded-full inline-block">
                      {isAr ? 'المغامرة المختارة' : 'Selected Tour'}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 font-heading mt-0.5 line-clamp-1">
                      {locSelectedExp?.title || selectedExp.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isAr ? 'السعر الأساسي:' : 'Base price:'}{' '}
                      <span className="font-extrabold text-slate-900">{formatPrice(selectedExp.startingPrice || 15)}</span>
                      {' • '}
                      <span>{locExp?.duration || selectedExp.duration}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-1.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-center"
                >
                  <span>{isAr ? '🔄 تغيير المغامرة' : '🔄 Change Tour'}</span>
                </button>
              </div>

              {/* 2-Column Configuration Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* Left (or main in RTL) 2 Cols: Date, Time, Passengers/Vehicles, Extras */}
                <div className="lg:col-span-2 space-y-4">
                  
                  {/* Date & Time Slot */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
                    <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#0284C7]" />
                      {isAr ? '1. تاريخ وموعد الرحلة' : '1. Date & Departure Time'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Date Picker */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          {isAr ? 'تاريخ المغامرة' : 'Tour Date'}
                        </label>
                        <input
                          type="date"
                          value={bookingDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>

                      {/* Time Slot Picker */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          {isAr ? 'موعد الانطلاق' : 'Departure Slot'}
                        </label>
                        <select
                          value={selectedTimeSlot}
                          onChange={(e) => setSelectedTimeSlot(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        >
                          {availableSlots.map((slot, idx) => (
                            <option key={idx} value={slot.value}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Passengers & Vehicles */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
                    <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#0284C7]" />
                      {isAr ? '2. المسافرون والمركبات' : '2. Travelers & Vehicles'}
                    </h4>

                    {/* If Safari: Show Quads and Buggies options */}
                    {isSafariType ? (
                      <div className="space-y-2.5">
                        <p className="text-[11px] text-slate-500">
                          {isAr
                            ? 'حدد عدد مركبات البيتش باجي والكار باجي المطلوبة لجولتكم:'
                            : 'Select vehicles for your desert safari:'}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Single Quad */}
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <div>
                              <span className="text-xs font-extrabold text-slate-800 block">
                                {isAr ? '🏍️ بيتش باجي فردي (سنجل)' : '🏍️ Single Quad'}
                              </span>
                              <span className="text-[10px] text-slate-500">{formatPrice(15)} / {isAr ? 'مركبة' : 'quad'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setSingleQuads(Math.max(0, singleQuads - 1))}
                                className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-5 text-center text-xs font-black text-slate-900">{singleQuads}</span>
                              <button
                                type="button"
                                onClick={() => setSingleQuads(singleQuads + 1)}
                                className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center font-bold hover:bg-[#0369A1] cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Double Quad */}
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <div>
                              <span className="text-xs font-extrabold text-slate-800 block">
                                {isAr ? '👥 بيتش باجي زوجي (دبل)' : '👥 Double Quad'}
                              </span>
                              <span className="text-[10px] text-slate-500">{formatPrice(20)} / {isAr ? 'مركبة (راكبين)' : 'quad (2 riders)'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setDoubleQuads(Math.max(0, doubleQuads - 1))}
                                className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-5 text-center text-xs font-black text-slate-900">{doubleQuads}</span>
                              <button
                                type="button"
                                onClick={() => setDoubleQuads(doubleQuads + 1)}
                                className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center font-bold hover:bg-[#0369A1] cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Buggy 2-seater */}
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <div>
                              <span className="text-xs font-extrabold text-slate-800 block">
                                {isAr ? '🏎️ كار باجي (شخصين)' : '🏎️ Buggy 2-Seater'}
                              </span>
                              <span className="text-[10px] text-slate-500">{formatPrice(28)} / {isAr ? 'باجي' : 'buggy'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setBuggy2Seater(Math.max(0, buggy2Seater - 1))}
                                className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-5 text-center text-xs font-black text-slate-900">{buggy2Seater}</span>
                              <button
                                type="button"
                                onClick={() => setBuggy2Seater(buggy2Seater + 1)}
                                className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center font-bold hover:bg-[#0369A1] cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Buggy 4-seater */}
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <div>
                              <span className="text-xs font-extrabold text-slate-800 block">
                                {isAr ? '🚜 كار باجي عائلي (4 أفراد)' : '🚜 Buggy 4-Seater Family'}
                              </span>
                              <span className="text-[10px] text-slate-500">{formatPrice(32)} / {isAr ? 'باجي' : 'buggy'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setBuggy4Seater(Math.max(0, buggy4Seater - 1))}
                                className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-5 text-center text-xs font-black text-slate-900">{buggy4Seater}</span>
                              <button
                                type="button"
                                onClick={() => setBuggy4Seater(buggy4Seater + 1)}
                                className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center font-bold hover:bg-[#0369A1] cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* People count */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700">{isAr ? 'عدد الأفراد البالغين المرافقين:' : 'Adults count:'}</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-xs font-black text-slate-900">{adults}</span>
                            <button
                              type="button"
                              onClick={() => setAdults(adults + 1)}
                              className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center font-bold hover:bg-[#0369A1] cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Non-safari: Standard Adults and Children */
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <div>
                            <span className="text-xs font-extrabold text-slate-800 block">
                              {isAr ? 'البالغين (12+ سنة)' : 'Adults (12+ yrs)'}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {formatPrice(selectedExp.startingPrice || 15)} / {isAr ? 'فرد' : 'person'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-xs font-black text-slate-900">{adults}</span>
                            <button
                              type="button"
                              onClick={() => setAdults(adults + 1)}
                              className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center font-bold hover:bg-[#0369A1] cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <div>
                            <span className="text-xs font-extrabold text-slate-800 block">
                              {isAr ? 'الأطفال (4 - 11 سنة)' : 'Children (4-11 yrs)'}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {formatPrice(Math.round((selectedExp.startingPrice || 15) * 0.6))} ({isAr ? 'خصم 40%' : '40% off'})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setChildren(Math.max(0, children - 1))}
                              className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-xs font-black text-slate-900">{children}</span>
                            <button
                              type="button"
                              onClick={() => setChildren(children + 1)}
                              className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center font-bold hover:bg-[#0369A1] cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Optional Extras */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
                    <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      {isAr ? '3. إضافات اختيارية مميزة (حسب رغبتك)' : '3. Optional VIP Add-ons'}
                    </h4>

                    <div className="space-y-2">
                      {/* Bedouin Dinner */}
                      {isSafariType && (
                        <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                          <span className="text-xs font-extrabold text-amber-950 block">
                            {isAr ? '🏕️ العشاء البدوي وحفلة الفلكلور' : '🏕️ Bedouin Dinner & Folklore Show'}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <button
                              type="button"
                              onClick={() => setBedouinPartyOption('none')}
                              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition text-center cursor-pointer ${
                                bedouinPartyOption === 'none'
                                  ? 'bg-amber-600 text-white border-amber-600'
                                  : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100/50'
                              }`}
                            >
                              {isAr ? 'بدون عشاء' : 'No Dinner'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setBedouinPartyOption('standard_dinner')}
                              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition text-center cursor-pointer ${
                                bedouinPartyOption === 'standard_dinner'
                                  ? 'bg-amber-600 text-white border-amber-600'
                                  : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100/50'
                              }`}
                            >
                              {isAr ? 'عشاء عادي (+10$)' : 'Standard Dinner (+$10)'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setBedouinPartyOption('vip_dinner')}
                              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition text-center cursor-pointer ${
                                bedouinPartyOption === 'vip_dinner'
                                  ? 'bg-amber-600 text-white border-amber-600'
                                  : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100/50'
                              }`}
                            >
                              {isAr ? 'عشاء VIP فاخر (+18$)' : 'VIP Dinner (+$18)'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* VIP Private Transfer */}
                      <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/70 transition cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={privateTransfer}
                            onChange={(e) => setPrivateTransfer(e.target.checked)}
                            className="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7]"
                          />
                          <span className="text-xs font-bold text-slate-800">
                            {isAr ? '🚗 سيارة توصيل خاصة VIP من وإلى فندقك' : '🚗 Private VIP Transfer Door-to-Door'}
                          </span>
                        </div>
                        <span className="text-[11px] font-extrabold text-[#0284C7]">{formatPrice(22)}</span>
                      </label>

                      {/* Photo/Video Package */}
                      <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/70 transition cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={photoVideoPackage}
                            onChange={(e) => setPhotoVideoPackage(e.target.checked)}
                            className="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7]"
                          />
                          <span className="text-xs font-bold text-slate-800">
                            {isAr ? '📸 ألبوم صور وفيديو احترافي HD للجولة' : '📸 GoPro HD Photos & Video Album'}
                          </span>
                        </div>
                        <span className="text-[11px] font-extrabold text-[#0284C7]">{formatPrice(28)}</span>
                      </label>

                      {/* Camel ride */}
                      {isSafariType && (
                        <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/70 transition cursor-pointer">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={camelRide30min}
                              onChange={(e) => setCamelRide30min(e.target.checked)}
                              className="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7]"
                            />
                            <span className="text-xs font-bold text-slate-800">
                              {isAr ? '🐪 جولة ركوب جمال صحراوية (30 دقيقة)' : '🐪 30-Min Desert Camel Ride'}
                            </span>
                          </div>
                          <span className="text-[11px] font-extrabold text-[#0284C7]">{formatPrice(10)}</span>
                        </label>
                      )}

                      {/* Telescope */}
                      {isSafariType && (
                        <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/70 transition cursor-pointer">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={telescopeStargazing}
                              onChange={(e) => setTelescopeStargazing(e.target.checked)}
                              className="w-4 h-4 rounded text-[#0284C7] focus:ring-[#0284C7]"
                            />
                            <span className="text-xs font-bold text-slate-800">
                              {isAr ? '🔭 رصد النجوم والمجرات بالتليسكوب' : '🔭 Telescope Stargazing'}
                            </span>
                          </div>
                          <span className="text-[11px] font-extrabold text-[#0284C7]">{formatPrice(5)}</span>
                        </label>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right Summary & Checkout Action Column */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4 sticky top-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-xs uppercase font-extrabold text-sky-400 tracking-wider">
                        {isAr ? 'ملخص الحساب والإجمالي' : 'Calculation & Total'}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {isAr ? 'تأكيد فوري' : 'Instant Confirm'}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>{isAr ? 'المغامرة:' : 'Tour:'}</span>
                        <span className="font-bold text-white text-right max-w-[150px] truncate">
                          {locSelectedExp?.title || selectedExp.title}
                        </span>
                      </div>

                      <div className="flex justify-between text-slate-300">
                        <span>{isAr ? 'التاريخ:' : 'Date:'}</span>
                        <span className="font-bold text-white">{bookingDate}</span>
                      </div>

                      <div className="flex justify-between text-slate-300">
                        <span>{isAr ? 'الموعد:' : 'Time:'}</span>
                        <span className="font-bold text-sky-400">{selectedTimeSlot}</span>
                      </div>

                      <div className="flex justify-between text-slate-300">
                        <span>{isAr ? 'العدد:' : 'Travelers:'}</span>
                        <span className="font-bold text-white">
                          {isSafariType
                            ? `${singleQuads > 0 ? `${singleQuads} سنجل ` : ''}${doubleQuads > 0 ? `${doubleQuads} دبل ` : ''}${buggy2Seater > 0 ? `${buggy2Seater} باجي2 ` : ''}${buggy4Seater > 0 ? `${buggy4Seater} باجي4 ` : ''}` || `${adults} أفراد`
                            : `${adults} بالغ${children > 0 ? ` ، ${children} طفل` : ''}`}
                        </span>
                      </div>

                      {/* Total Box */}
                      <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            {isAr ? 'إجمالي المبلغ المستحق' : 'Total Price'}
                          </span>
                          <span className="text-[10px] text-emerald-400">
                            {isAr ? 'الدفع عند الوصول' : 'Pay upon pickup'}
                          </span>
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-white font-heading">
                          {formatPrice(liveTotal)}
                        </span>
                      </div>
                    </div>

                    {/* Guarantees */}
                    <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-400 font-medium">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        <span>{isAr ? 'توصيل واستقبال مجاني من الفندق' : 'Free hotel pickup & return'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        <span>{isAr ? 'بدون أي عربون أو تكاليف خفية' : 'Zero booking deposit'}</span>
                      </div>
                    </div>

                    {/* Big Action Button */}
                    <button
                      type="button"
                      onClick={handleProceedToCheckout}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-sky-500 hover:from-[#0369A1] hover:to-sky-600 text-white font-black text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>{isAr ? 'المتابعة لتأكيد الحجز (بياناتك)' : 'Proceed to Confirm Booking'}</span>
                      {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
export default QuickAdventureBookingModal;
