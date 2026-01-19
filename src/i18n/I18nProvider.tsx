'use client'

import { I18nextProvider } from 'react-i18next'
import { useEffect } from 'react'
import i18n from './index'

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
