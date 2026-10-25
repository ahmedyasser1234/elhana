import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sun, Bike, Car, Tent, Footprints, Sparkles, Anchor, Ship, Waves, Wind, Smile } from 'lucide-react';

const iconMap = {
  Compass, Sun, Bike, Car, Tent, Footprints, Sparkles, Anchor, Ship, Waves, Wind, Smile
};

export const CategoryCard = ({ category, active = false, onClick }) => {
  const IconComponent = iconMap[category.icon] || Compass;

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border text-left transition-all duration-300 w-full group flex items-center justify-between cursor-pointer ${
        active
          ? 'bg-stone-900 text-white border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-105'
          : 'bg-white text-stone-800 border-stone-200 hover:border-[#D4AF37]/50 hover:bg-stone-50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
          active ? 'bg-[#D4AF37] text-stone-950 font-bold' : 'bg-stone-100 text-[#B8860B] group-hover:bg-[#D4AF37]/20'
        }`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs md:text-sm font-bold font-heading line-clamp-1">{category.title}</h4>
          <span className={`text-[11px] font-medium ${active ? 'text-stone-300' : 'text-stone-500'}`}>
            {category.count} Adventures
          </span>
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;
