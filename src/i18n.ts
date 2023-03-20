import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationUA from './locales/ua/translation.json';
import translationRU from './locales/ru/translation.json';
import translationEE from './locales/ee/translation.json';

export const resources = {
  en: {
    translation: translationEN,
  },
  ua: {
    translation: translationUA,
  },
  ru: {
    translation: translationRU,
  },
  ee: {
    translation: translationEE,
  },
};

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
  .init({
    resources,
    returnNull: false,
    /* lng: localStorage.getItem('LOCALE') || 'ua', */
    fallbackLng: ['en', 'ee', 'ru', 'ua'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
