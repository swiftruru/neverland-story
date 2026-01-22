import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import neverlandZhTW from './locales/neverland/zh-TW.json'
import neverlandEn from './locales/neverland/en.json'
import swiftuiZhTW from './locales/swiftui/zh-TW.json'
import swiftuiEn from './locales/swiftui/en.json'

export const LANGUAGES = [
  { code: 'zh-TW', label: '中文', shortLabel: '中' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

const savedLanguage =
  typeof window !== 'undefined' &&
  typeof window.localStorage?.getItem === 'function' &&
  window.localStorage.getItem('language')

i18n.use(initReactI18next).init({
  resources: {
    'zh-TW': { translation: neverlandZhTW, swiftui: swiftuiZhTW },
    en: { translation: neverlandEn, swiftui: swiftuiEn },
  },
  // SSR 預設中文；若前端有儲存偏好則覆蓋
  lng: savedLanguage || 'zh-TW',
  fallbackLng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
