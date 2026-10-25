import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CATEGORIES } from '../../data/experiences';
import { SHARM_LOCATIONS } from '../../data/transfers';

export const FloatingSearchWidget = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hotelZone, setHotelZone] = useState('Naama Bay');
  const [category, setCategory] = useState('all');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/experiences?category=${category}&search=${encodeURIComponent(hotelZone)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white/95 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border border-sky-100 shadow-[0_15px_40px_rgba(2,132,199,0.14)] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-3.5 items-end"
    >
      
      {/* 1. Hotel Location */}
      <div className="space-y-1.5">
        <label className="text-[11px] uppercase font-extrabold text-[#0284C7] tracking-wider block">
          {t('search.whereStaying')}
        </label>
        <select
          value={hotelZone}
          onChange={(e) => setHotelZone(e.target.value)}
          className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:border-[#0284C7] focus:outline-none"
        >
          {SHARM_LOCATIONS.map((loc) => (
            <option key={loc.id} value={loc.name}>{loc.name}</option>
          ))}
        </select>
      </div>

      {/* 2. Activity Type */}
      <div className="space-y-1.5">
        <label className="text-[11px] uppercase font-extrabold text-[#0284C7] tracking-wider block">
          {t('search.chooseExperience')}
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:border-[#0284C7] focus:outline-none"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {t(`categories.${cat.id}`, cat.title)}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Date & Guests */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase font-extrabold text-[#0284C7] tracking-wider block">
            {t('search.selectDate')}
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] uppercase font-extrabold text-[#0284C7] tracking-wider block">
            {t('search.guests')}
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? (t('search.guestSingle', 'Guest')) : (t('search.guestMultiple', 'Guests'))}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Search Button */}
      <div>
        <button
          type="submit"
          className="w-full py-3 bg-[#F97316] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#F97316]/25 hover:bg-[#EA580C] hover:scale-[1.02] transition duration-300 flex items-center justify-center cursor-pointer"
        >
          <span>{t('search.searchBtn')}</span>
        </button>
      </div>

    </form>
  );
};

export default FloatingSearchWidget;
