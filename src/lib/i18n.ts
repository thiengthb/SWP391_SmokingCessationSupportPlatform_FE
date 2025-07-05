import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Language } from '../types/models/setting';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: Language.EN.toLowerCase(),
    lng: localStorage.getItem('language') || Language.EN.toLowerCase(),
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
