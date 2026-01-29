import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonZhTW from './locales/common/zh-TW.json'
import commonEn from './locales/common/en.json'
import neverlandZhTW from './locales/neverland/zh-TW.json'
import neverlandEn from './locales/neverland/en.json'
import swiftuiZhTW from './locales/swiftui/zh-TW.json'
import swiftuiEn from './locales/swiftui/en.json'
import swiftZhTW from './locales/swift/zh-TW.json'
import swiftEn from './locales/swift/en.json'
import flutterZhTW from './locales/flutter/zh-TW.json'
import flutterEn from './locales/flutter/en.json'

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
    'zh-TW': { common: commonZhTW, neverland: neverlandZhTW, swiftui: swiftuiZhTW, swift: swiftZhTW, flutter: flutterZhTW },
    en: { common: commonEn, neverland: neverlandEn, swiftui: swiftuiEn, swift: swiftEn, flutter: flutterEn },
  },
  defaultNS: 'neverland',
  // SSR 預設中文；若前端有儲存偏好則覆蓋
  lng: savedLanguage || 'zh-TW',
  fallbackLng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
