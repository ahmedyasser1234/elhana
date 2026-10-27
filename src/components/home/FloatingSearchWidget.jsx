import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CATEGORIES } from '../../data/experiences';
import { SHARM_HOTELS, SHARM_ZONES } from '../../data/sharmHotels';

export const FloatingSearchWidget = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const navigate = useNavigate();

  const [hotelZone, setHotelZone] = useState('');
  const [category, setCategory] = useState('all');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);

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
      className="bg-white/95 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border border-sky-100 shadow-[0_15px_40px_rgba(2,132,199,0.14)] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-3.5 items-end"
    >
      
      {/* 1. Hotel / Location in Sharm El Sheikh */}
      <div className="space-y-1.5">
        <label className="text-[11px] uppercase font-extrabold text-[#0284C7] tracking-wider block">
          {t('search.whereStaying', isAr ? 'مكان الإقامة بـ شرم الشيخ' : 'Staying in Sharm El Sheikh')}
        </label>
        <select
          value={hotelZone}
          onChange={(e) => setHotelZone(e.target.value)}
          className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:border-[#0284C7] focus:outline-none transition cursor-pointer"
        >
          <option value="">
            {isAr ? '🏨 جميع فنادق ومنتجعات شرم الشيخ (100% تغطية)' : '🏨 All Sharm Hotels & Resorts (100% Pickup)'}
          </option>

          {SHARM_ZONES.map((zone) => {
            const zoneHotels = SHARM_HOTELS.filter((h) => h.zoneId === zone.id);
            if (zoneHotels.length === 0) return null;
            return (
              <optgroup
                key={zone.id}
                label={isAr ? `📍 ${zone.nameAr}` : `📍 ${zone.nameEn}`}
                className="font-bold text-slate-700 bg-slate-100"
              >
                {zoneHotels.map((h) => {
                  const localizedTitle = isAr ? h.nameAr : h.name;
                  return (
                    <option
                      key={h.id}
                      value={localizedTitle}
                      className="font-normal text-slate-900 bg-white py-1"
                    >
                      {localizedTitle}
                    </option>
                  );
                })}
              </optgroup>
            );
          })}
        </select>
      </div>

      {/* 2. Activity Type */}
      <div className="space-y-1.5">
        <label className="text-[11px] uppercase font-extrabold text-[#0284C7] tracking-wider block">
          {t('search.chooseExperience', isAr ? 'اختر نوع التجربة' : 'Select Experience')}
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:border-[#0284C7] focus:outline-none transition cursor-pointer"
        >
          <option value="all">
            {isAr ? '✨ كل التجارب والرحلات' : '✨ All Tours & Activities'}
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {t(`categories.${cat.id}`, isAr ? (cat.titleAr || cat.title) : cat.title)}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Date & Guests */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase font-extrabold text-[#0284C7] tracking-wider block">
            {t('search.selectDate', isAr ? 'التاريخ' : 'Date')}
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold focus:border-[#0284C7] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] uppercase font-extrabold text-[#0284C7] tracking-wider block">
            {t('search.guests', isAr ? 'عدد الأفراد' : 'Guests')}
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold focus:border-[#0284C7] focus:outline-none cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {isAr 
                  ? `${num} ${num === 1 ? 'فرد واحد' : num === 2 ? 'فردين' : num <= 10 ? 'أفراد' : 'فرد'}`
                  : `${num} ${num === 1 ? 'Guest' : 'Guests'}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Search Button */}
      <div>
        <button
          type="submit"
          className="w-full py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#F97316]/25 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        >
          <span>{t('search.searchBtn', isAr ? 'بحث عن رحلة' : 'Find Adventures')}</span>
        </button>
      </div>

    </form>
  );
};

export default FloatingSearchWidget;
