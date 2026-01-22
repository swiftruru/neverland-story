'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES, type LanguageCode } from '@i18n/index'

export function useLanguage() {
  const { i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)

  const currentLanguage = i18n.language as LanguageCode

  const changeLanguage = (lang: LanguageCode) => {
    i18n.changeLanguage(lang)
    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('language', lang)
    }
    document.documentElement.lang = lang
  }

  const toggleLanguage = () => {
    const nextLang = currentLanguage === 'zh-TW' ? 'en' : 'zh-TW'
    changeLanguage(nextLang)
  }

  // 首次掛載後才載入 localStorage 設定，避免 SSR / CSR 語系不一致
  useEffect(() => {
    setMounted(true)
    const saved =
      typeof window !== 'undefined' && typeof window.localStorage?.getItem === 'function'
        ? (window.localStorage.getItem('language') as LanguageCode | null)
        : null
    if (saved && saved !== currentLanguage) {
      changeLanguage(saved)
    }
  }, [])

  if (!mounted) {
    return {
      currentLanguage,
      languages: LANGUAGES,
      changeLanguage,
      toggleLanguage: () => {},
    }
  }

  return {
    currentLanguage,
    languages: LANGUAGES,
    changeLanguage,
    toggleLanguage,
  }
}
