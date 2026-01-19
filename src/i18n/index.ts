import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import zhTW from './locales/zh-TW.json'
import en from './locales/en.json'

export const LANGUAGES = [
  { code: 'zh-TW', label: '中文', shortLabel: '中' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

i18n.use(initReactI18next).init({
  resources: {
    'zh-TW': { translation: zhTW },
    en: { translation: en },
  },
  lng: 'zh-TW',
  fallbackLng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
