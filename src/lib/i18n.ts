import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { Language } from '@/types/enums/Language';
import { I18nNamespace } from '@/constants/I18nNamespace';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('language') || Language.EN.toLowerCase(),
    fallbackLng: Language.EN.toLowerCase(),

    ns: Object.values(I18nNamespace),
    defaultNS: I18nNamespace.COMMON,

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
