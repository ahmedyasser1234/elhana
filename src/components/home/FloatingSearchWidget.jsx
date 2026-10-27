import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Search, Check, X } from 'lucide-react';
import { CATEGORIES } from '../../data/experiences';
import { SHARM_HOTELS, SHARM_ZONES } from '../../data/sharmHotels';

export const FloatingSearchWidget = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const navigate = useNavigate();

  const [hotelZone, setHotelZone] = useState('');
  const [hotelSearchQuery, setHotelSearchQuery] = useState('');
  const [hotelOpen, setHotelOpen] = useState(false);

  const [category, setCategory] = useState('all');
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const [guests, setGuests] = useState(2);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const hotelRef = useRef(null);
  const categoryRef = useRef(null);
  const guestsRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hotelRef.current && !hotelRef.current.contains(event.target)) {
        setHotelOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target)) {
        setGuestsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter hotels by search query
  const filteredZones = useMemo(() => {
    if (!hotelSearchQuery.trim()) {
      return SHARM_ZONES.map((zone) => ({
        ...zone,
        hotels: SHARM_HOTELS.filter((h) => h.zoneId === zone.id),
      })).filter((zone) => zone.hotels.length > 0);
    }
    const q = hotelSearchQuery.toLowerCase().trim();
    return SHARM_ZONES.map((zone) => {
      const zoneMatches = (isAr ? zone.nameAr : zone.nameEn).toLowerCase().includes(q);
      const hotels = SHARM_HOTELS.filter((h) => {
        if (h.zoneId !== zone.id) return false;
        if (zoneMatches) return true;
        return (
          h.name.toLowerCase().includes(q) ||
          h.nameAr.includes(q) ||
          (h.keywords && h.keywords.some((k) => k.toLowerCase().includes(q)))
        );
      });
      return { ...zone, hotels };
    }).filter((zone) => zone.hotels.length > 0);
  }, [hotelSearchQuery, isAr]);

  // Selected hotel display label
  const selectedHotelLabel = useMemo(() => {
    if (!hotelZone) {
      return isAr ? 'جميع فنادق ومناطق شرم الشيخ' : 'All Sharm Hotels & Resorts';
    }
    const found = SHARM_HOTELS.find(
      (h) => h.name === hotelZone || h.nameAr === hotelZone || h.id === hotelZone
    );
    if (found) {
      return isAr ? found.nameAr : found.name;
    }
    return hotelZone;
  }, [hotelZone, isAr]);

  // Selected category display label
  const selectedCategoryLabel = useMemo(() => {
    if (!category || category === 'all') {
      return isAr ? 'كل التجارب والرحلات' : 'All Tours & Activities';
    }
    const found = CATEGORIES.find((c) => c.id === category);
    if (found) {
      return isAr ? (found.titleAr || found.title) : found.title;
    }
    return category;
  }, [category, isAr]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category && category !== 'all') {
      params.set('category', category);
    }
    if (hotelZone && hotelZone !== 'all') {
      params.set('hotel', hotelZone);
      params.set('search', hotelZone);
    }
    if (date) {
      params.set('date', date);
    }
    if (guests) {
      params.set('guests', guests.toString());
    }
    navigate(`/experiences?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white/95 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border border-sky-100 shadow-[0_15px_40px_rgba(2,132,199,0.14)] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-3.5 items-end relative z-40"
    >
      
      {/* 1. Hotel / Location in Sharm El Sheikh (Custom Downward Dropdown) */}
      <div className="space-y-1.5 relative" ref={hotelRef}>
        <label className="text-[11px] md:text-xs uppercase font-bold text-sky-700 tracking-wider block">
          {t('search.whereStaying', isAr ? 'مكان الإقامة بـ شرم الشيخ' : 'Staying in Sharm El Sheikh')}
        </label>
        
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => {
            setHotelOpen(!hotelOpen);
            setCategoryOpen(false);
            setGuestsOpen(false);
          }}
          className="w-full bg-slate-50 hover:bg-slate-100/90 text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-[13px] font-semibold text-start flex items-center justify-between transition-colors focus:border-[#0284C7] focus:outline-none cursor-pointer"
        >
          <span className="truncate pr-1 rtl:pr-0 rtl:pl-1">
            {selectedHotelLabel}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
              hotelOpen ? 'rotate-180 text-[#0284C7]' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu (Always Drops DOWNWARDS) */}
        {hotelOpen && (
          <div className="absolute top-full mt-2 w-full min-w-[280px] sm:min-w-[340px] left-0 rtl:left-auto rtl:right-0 z-50 bg-white rounded-2xl shadow-2xl border border-sky-100 p-2.5 transition-all">
            {/* Search Input inside Dropdown */}
            <div className="relative mb-2">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-2.5 rtl:left-auto rtl:right-2.5 pointer-events-none" />
              <input
                type="text"
                value={hotelSearchQuery}
                onChange={(e) => setHotelSearchQuery(e.target.value)}
                placeholder={isAr ? "ابحث باسم الفندق أو المنطقة..." : "Search hotel or area..."}
                autoFocus
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-8 pr-7 rtl:pl-7 rtl:pr-8 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:bg-white transition"
              />
              {hotelSearchQuery && (
                <button
                  type="button"
                  onClick={() => setHotelSearchQuery('')}
                  className="absolute top-1/2 -translate-y-1/2 right-2.5 rtl:right-auto rtl:left-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Scrollable list */}
            <div className="max-h-64 sm:max-h-72 overflow-y-auto space-y-1">
              {/* Option: All Sharm Hotels */}
              <button
                type="button"
                onClick={() => {
                  setHotelZone('');
                  setHotelOpen(false);
                  setHotelSearchQuery('');
                }}
                className={`w-full text-start px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  !hotelZone ? 'bg-sky-50 text-[#0284C7]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{isAr ? 'جميع فنادق ومناطق شرم الشيخ' : 'All Sharm Hotels & Resorts'}</span>
                {!hotelZone && <Check className="w-4 h-4 text-[#0284C7]" />}
              </button>

              {/* Zones and Hotels */}
              {filteredZones.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 font-medium">
                  {isAr ? 'لا توجد فنادق مطابقة للبحث' : 'No matching hotels found'}
                </div>
              ) : (
                filteredZones.map((zone) => (
                  <div key={zone.id} className="pt-2">
                    <div className="px-3 py-1 text-[11px] font-bold text-sky-800 bg-sky-50/70 rounded-lg mb-1">
                      {isAr ? zone.nameAr : zone.nameEn}
                    </div>
                    <div className="space-y-0.5">
                      {zone.hotels.map((h) => {
                        const localizedTitle = isAr ? h.nameAr : h.name;
                        const isSelected = hotelZone === localizedTitle || hotelZone === h.name;
                        return (
                          <button
                            key={h.id}
                            type="button"
                            onClick={() => {
                              setHotelZone(localizedTitle);
                              setHotelOpen(false);
                              setHotelSearchQuery('');
                            }}
                            className={`w-full text-start px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-sky-50 text-[#0284C7] font-bold'
                                : 'text-slate-700 hover:bg-slate-50 font-medium'
                            }`}
                          >
                            <span className="truncate">{localizedTitle}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Activity Type (Custom Downward Dropdown) */}
      <div className="space-y-1.5 relative" ref={categoryRef}>
        <label className="text-[11px] md:text-xs uppercase font-bold text-sky-700 tracking-wider block">
          {t('search.chooseExperience', isAr ? 'نوع التجربة' : 'Select Experience')}
        </label>
        
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => {
            setCategoryOpen(!categoryOpen);
            setHotelOpen(false);
            setGuestsOpen(false);
          }}
          className="w-full bg-slate-50 hover:bg-slate-100/90 text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-[13px] font-semibold text-start flex items-center justify-between transition-colors focus:border-[#0284C7] focus:outline-none cursor-pointer"
        >
          <span className="truncate pr-1 rtl:pr-0 rtl:pl-1">
            {selectedCategoryLabel}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
              categoryOpen ? 'rotate-180 text-[#0284C7]' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu (Always Drops DOWNWARDS) */}
        {categoryOpen && (
          <div className="absolute top-full mt-2 w-full min-w-[240px] left-0 rtl:left-auto rtl:right-0 z-50 bg-white rounded-2xl shadow-2xl border border-sky-100 p-2 transition-all">
            <div className="max-h-64 overflow-y-auto space-y-1">
              <button
                type="button"
                onClick={() => {
                  setCategory('all');
                  setCategoryOpen(false);
                }}
                className={`w-full text-start px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  category === 'all' ? 'bg-sky-50 text-[#0284C7]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{isAr ? 'كل التجارب والرحلات' : 'All Tours & Activities'}</span>
                {category === 'all' && <Check className="w-4 h-4 text-[#0284C7]" />}
              </button>
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                const title = isAr ? (cat.titleAr || cat.title) : cat.title;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.id);
                      setCategoryOpen(false);
                    }}
                    className={`w-full text-start px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 text-[#0284C7] font-bold'
                        : 'text-slate-700 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span>{t(`categories.${cat.id}`, title)}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. Date & Guests */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <label className="text-[11px] md:text-xs uppercase font-bold text-sky-700 tracking-wider block">
            {t('search.selectDate', isAr ? 'التاريخ' : 'Date')}
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs sm:text-[13px] font-semibold focus:border-[#0284C7] focus:bg-white focus:outline-none"
          />
        </div>

        {/* Guests Dropdown */}
        <div className="space-y-1.5 relative" ref={guestsRef}>
          <label className="text-[11px] md:text-xs uppercase font-bold text-sky-700 tracking-wider block">
            {t('search.guests', isAr ? 'عدد الأفراد' : 'Guests')}
          </label>
          <button
            type="button"
            onClick={() => {
              setGuestsOpen(!guestsOpen);
              setHotelOpen(false);
              setCategoryOpen(false);
            }}
            className="w-full bg-slate-50 hover:bg-slate-100/90 text-slate-800 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs sm:text-[13px] font-semibold text-start flex items-center justify-between transition-colors focus:border-[#0284C7] focus:outline-none cursor-pointer"
          >
            <span>
              {isAr
                ? `${guests} ${guests === 1 ? 'فرد' : guests === 2 ? 'فردين' : guests <= 10 ? 'أفراد' : 'فرد'}`
                : `${guests} ${guests === 1 ? 'Guest' : 'Guests'}`}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200 ${
                guestsOpen ? 'rotate-180 text-[#0284C7]' : ''
              }`}
            />
          </button>

          {guestsOpen && (
            <div className="absolute top-full mt-2 w-full min-w-[130px] left-0 rtl:left-auto rtl:right-0 z-50 bg-white rounded-2xl shadow-2xl border border-sky-100 p-1.5 transition-all">
              <div className="max-h-52 overflow-y-auto space-y-0.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => {
                  const isSelected = guests === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setGuests(num);
                        setGuestsOpen(false);
                      }}
                      className={`w-full text-start px-2 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-sky-50 text-[#0284C7] font-bold'
                          : 'text-slate-700 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <span>
                        {isAr
                          ? `${num} ${num === 1 ? 'فرد' : num === 2 ? 'فردين' : num <= 10 ? 'أفراد' : 'فرد'}`
                          : `${num} ${num === 1 ? 'Guest' : 'Guests'}`}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#0284C7]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Search Button */}
      <div>
        <button
          type="submit"
          className="w-full py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-[#F97316]/25 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        >
          <span>{t('search.searchBtn', isAr ? 'بحث عن رحلة' : 'Find Adventures')}</span>
        </button>
      </div>

    </form>
  );
};

export default FloatingSearchWidget;
