import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal, DollarSign, Star, Clock, Filter, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../data/experiences';

export const FilterSidebar = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortByChange,
  onReset
}) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-6 sticky top-24 w-full">
      
      {/* Search Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5 font-bold text-[#0F172A] font-heading text-sm">
          <div className="p-1.5 rounded-xl bg-sky-50 border border-sky-100 text-[#0284C7]">
            <Filter className="w-4 h-4" />
          </div>
          <span>{isAr ? "فلاتر البحث" : "Filter Experiences"}</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-bold text-slate-500 hover:text-[#0284C7] flex items-center gap-1.5 transition py-1 px-2 rounded-lg hover:bg-slate-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isAr ? "إعادة ضبط" : "Reset"}</span>
        </button>
      </div>

      {/* Search input with proper RTL/LTR directional alignment */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">
          {isAr ? "كلمات البحث" : "Search Keywords"}
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={isAr ? "ابحث عن بيتش باجي، يخت، غوص..." : "Search quad, yacht, buggy..."}
            className="w-full ltr:pl-10 ltr:pr-4 rtl:pr-10 rtl:pl-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition"
          />
        </div>
      </div>

      {/* Category selector with comfortable height & smooth custom scroll */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">
          {isAr ? "الأقسام والتصنيفات" : "Categories"}
        </label>
        <div className="space-y-1.5 max-h-[360px] overflow-y-auto ltr:pr-1 rtl:pl-1 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#0284C7] text-white shadow-md shadow-sky-600/20 font-black scale-[1.01]'
                    : 'bg-slate-50/70 hover:bg-sky-50/60 text-slate-700 hover:text-[#0284C7] border border-slate-100/80'
                }`}
              >
                <span className="truncate">{t(`categories.${cat.id}`, cat.title)}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black flex-shrink-0 ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white text-slate-500 border border-slate-200/80 shadow-2xs'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="flex justify-between items-center text-xs">
          <label className="font-extrabold uppercase tracking-wider text-slate-600">
            {t('experiences.priceRange')}
          </label>
          <span className="font-black text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-100">
            ${maxPrice} USD
          </span>
        </div>
        <input
          type="range"
          min="15"
          max="250"
          step="5"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className="w-full accent-[#0284C7] cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[11px] text-slate-400 font-bold">
          <span>$15</span>
          <span>$250+</span>
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">
          {t('experiences.sortBy')}
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition cursor-pointer"
        >
          <option value="popular">{t('experiences.popular')}</option>
          <option value="rating">{t('experiences.rating')}</option>
          <option value="price-low">{t('experiences.priceLow')}</option>
          <option value="price-high">{t('experiences.priceHigh')}</option>
        </select>
      </div>

    </div>
  );
};

export default FilterSidebar;
