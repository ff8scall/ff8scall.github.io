import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationKO from './locales/ko/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    ko: {
        translation: translationKO
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ko', // Default to Korean if language not detected
        interpolation: {
            escapeValue: false // React already safes from xss
        }
    });

export default i18n;
