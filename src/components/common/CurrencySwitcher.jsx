import React, { useState, useRef, useEffect } from 'react';
import { DollarSign, ChevronDown } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const CurrencySwitcher = () => {
  const { currency, setCurrency, rates } = useCurrency();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeCurrency = rates[currency] || rates.USD;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-lg border border-stone-200 transition"
        title="Select Currency"
      >
        <DollarSign className="w-3.5 h-3.5 text-[#0284C7]" />
        <span className="font-bold text-stone-800">{activeCurrency.symbol}</span>
        <span className="uppercase font-bold text-stone-800">{currency}</span>
        <ChevronDown className="w-3 h-3 text-stone-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-stone-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {Object.keys(rates).map((code) => {
            const item = rates[code];
            const isSelected = currency === code;
            return (
              <button
                key={code}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left hover:bg-stone-100 transition ${
                  isSelected ? 'font-bold text-[#0284C7] bg-sky-50' : 'text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#0284C7] w-4">{item.symbol}</span>
                  <span>{code}</span>
                </div>
                {isSelected && <span className="text-[10px] text-[#0284C7]">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CurrencySwitcher;
