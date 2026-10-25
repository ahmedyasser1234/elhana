import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { currentLang, changeLanguage, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeLang = languages.find(l => l.code === currentLang) || languages[0];

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
      >
        <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>{activeLang.flag}</span>
        <span className="uppercase font-bold text-stone-800">{activeLang.code}</span>
        <ChevronDown className="w-3 h-3 text-stone-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-stone-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left hover:bg-stone-100 transition ${
                currentLang === lang.code ? 'font-bold text-[#B8860B] bg-[#D4AF37]/10' : 'text-stone-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
              <span className="text-[10px] uppercase font-mono text-stone-400">{lang.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
