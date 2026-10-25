import React from 'react';

export const LoadingSkeleton = ({ count = 3, type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 animate-pulse space-y-4">
            <div className="w-full h-48 bg-stone-200 rounded-xl"></div>
            <div className="h-4 bg-stone-200 rounded w-1/3"></div>
            <div className="h-6 bg-stone-200 rounded w-3/4"></div>
            <div className="h-4 bg-stone-200 rounded w-full"></div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-stone-200 rounded w-1/4"></div>
              <div className="h-9 bg-stone-200 rounded-xl w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-stone-200 rounded w-1/2"></div>
      <div className="h-4 bg-stone-200 rounded w-full"></div>
      <div className="h-4 bg-stone-200 rounded w-2/3"></div>
    </div>
  );
};

export default LoadingSkeleton;
