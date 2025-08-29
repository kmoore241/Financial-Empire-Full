'use client';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// If you have more languages (e.g., es.json), import them and extend resources.
import en from './en.json';

const resources = {
  en: { translation: en },
  // es: { translation: es },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector) // browser-only
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator'],
        caches: ['localStorage', 'cookie'],
      },
    })
    .catch(() => { /* swallow init errors in prod */ });
}

export default i18n;
