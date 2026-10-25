import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n/config';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇪🇬', dir: 'rtl' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' }
];

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  const changeLanguage = (langCode) => {
    const found = LANGUAGES.find(l => l.code === langCode);
    if (found) {
      i18n.changeLanguage(langCode);
      setCurrentLang(langCode);
      localStorage.setItem('app_lang', langCode);
      document.documentElement.dir = found.dir;
      document.documentElement.lang = langCode;
    }
  };

  useEffect(() => {
    const active = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
    document.documentElement.dir = active.dir;
    document.documentElement.lang = active.code;
  }, [currentLang]);

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage, languages: LANGUAGES, isRTL: currentLang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
