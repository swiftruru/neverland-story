'use client'

import { useTranslation } from 'react-i18next'
import { LANGUAGES, type LanguageCode } from '@i18n/index'

export function useLanguage() {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language as LanguageCode

  const changeLanguage = (lang: LanguageCode) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
  }

  const toggleLanguage = () => {
    const nextLang = currentLanguage === 'zh-TW' ? 'en' : 'zh-TW'
    changeLanguage(nextLang)
  }

  return {
    currentLanguage,
    languages: LANGUAGES,
    changeLanguage,
    toggleLanguage,
  }
}
