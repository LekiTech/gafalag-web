import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import all namespaces (for the default language, only)
import homeEng from './locales/eng/home.json';
import homeRus from './locales/rus/home.json';
import homeLez from './locales/lez/home.json';

export const defaultNS = 'home'
export const resources = {
  eng: {
    home: homeEng,
  },
	rus: {
		home: homeRus
	},
	lez: {
		home: homeLez
	}
} as const;

i18n.use(initReactI18next).init({
  lng: 'eng',
  ns: ['home'],
  defaultNS,
  resources,
});