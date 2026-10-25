import React from 'react';
import { Star } from 'lucide-react';

export const Rating = ({ score = 4.9, count = null, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1 text-amber-500 font-medium ${className}`}>
      <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
      <span className="text-stone-900 font-bold text-sm">{score}</span>
      {count && <span className="text-stone-500 text-xs font-normal">({count})</span>}
    </div>
  );
};

export default Rating;
