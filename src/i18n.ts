import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

const languageDetectorOptions = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
  lookupLocalStorage: 'LOCALE',
};

i18n
  .use(initReactI18next)
  .use(new LanguageDetector(languageDetectorOptions))
  .use(Backend)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['common'],
    defaultNS: 'common',
    returnNull: false,
    /* 
    DESCRIPTION: For manually testing some language
    lng: localStorage.getItem('LOCALE') || 'ua', 
    */
    fallbackLng: ['en', 'ee', 'ru', 'ua'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
