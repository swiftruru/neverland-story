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

i18n.use(initReactI18next).init({
  resources: {
    'zh-TW': { translation: neverlandZhTW, swiftui: swiftuiZhTW },
    en: { translation: neverlandEn, swiftui: swiftuiEn },
  },
  // 以中文作為 SSR 時的預設，避免伺服端與前端不同語系造成 hydration mismatch
  lng: 'zh-TW',
  fallbackLng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
