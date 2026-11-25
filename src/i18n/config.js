import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import ar from './translations/ar.json';
import ru from './translations/ru.json';
import it from './translations/it.json';
import de from './translations/de.json';
import es from './translations/es.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  ru: { translation: ru },
  it: { translation: it },
  de: { translation: de },
  es: { translation: es }
};

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    // 1. Check URL query parameters: ?lang=it or ?l=it or ?locale=it
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang') || params.get('l') || params.get('locale');
      if (urlLang && ['en', 'ar', 'ru', 'it', 'de', 'es'].includes(urlLang.toLowerCase())) {
        const cleanLang = urlLang.toLowerCase();
        localStorage.setItem('app_lang', cleanLang);
        return cleanLang;
      }

      // 2. Check path prefix: /it or /it/...
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      if (pathParts.length > 0 && ['en', 'ar', 'ru', 'it', 'de', 'es'].includes(pathParts[0].toLowerCase())) {
        const cleanLang = pathParts[0].toLowerCase();
        localStorage.setItem('app_lang', cleanLang);
        return cleanLang;
      }
    } catch (e) {
      // Ignore errors in non-browser context
    }

    // 3. Fallback to localStorage
    const saved = localStorage.getItem('app_lang');
    if (saved && ['en', 'ar', 'ru', 'it', 'de', 'es'].includes(saved)) {
      return saved;
    }
  }

  return 'en';
};

const savedLang = getInitialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
