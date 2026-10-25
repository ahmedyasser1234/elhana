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

const savedLang = localStorage.getItem('app_lang') || 'en';

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
