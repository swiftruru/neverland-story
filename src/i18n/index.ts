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

function detectBrowserLanguage(): LanguageCode {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'zh-TW'
  }

  // 取得瀏覽器語言列表（優先順序）
  const browserLanguages = navigator.languages || [navigator.language]

  for (const lang of browserLanguages) {
    const lowerLang = lang.toLowerCase()
    // 中文語系：zh, zh-tw, zh-cn, zh-hk, zh-sg 等
    if (lowerLang.startsWith('zh')) {
      return 'zh-TW'
    }
    // 英文語系：en, en-us, en-gb 等
    if (lowerLang.startsWith('en')) {
      return 'en'
    }
  }

  // 預設繁體中文
  return 'zh-TW'
}

function getInitialLanguage(): LanguageCode {
  // 優先使用使用者儲存的偏好
  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage?.getItem === 'function'
  ) {
    const saved = window.localStorage.getItem('language')
    if (saved === 'zh-TW' || saved === 'en') {
      return saved
    }
  }

  // 否則偵測瀏覽器語系
  return detectBrowserLanguage()
}

i18n.use(initReactI18next).init({
  resources: {
    'zh-TW': { common: commonZhTW, neverland: neverlandZhTW, swiftui: swiftuiZhTW, swift: swiftZhTW, flutter: flutterZhTW },
    en: { common: commonEn, neverland: neverlandEn, swiftui: swiftuiEn, swift: swiftEn, flutter: flutterEn },
  },
  defaultNS: 'neverland',
  lng: getInitialLanguage(),
  fallbackLng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
