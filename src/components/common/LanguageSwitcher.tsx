'use client'

import { useEffect, useState, useCallback } from 'react'
import { useLanguage } from '@hooks/useLanguage'
import { useToast } from '@/contexts/ToastContext'
import styles from './LanguageSwitcher.module.css'

export function LanguageSwitcher() {
  const { currentLanguage, toggleLanguage } = useLanguage()
  const { info } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 顯示「另一個」語言的名稱，讓使用者知道點擊後會切換到什麼
  const displayLabel = currentLanguage === 'zh-TW' ? 'English' : '正體中文'

  const handleToggle = useCallback(() => {
    toggleLanguage()
    // 切換後顯示新語言的訊息
    const newLang = currentLanguage === 'zh-TW' ? 'en' : 'zh-TW'
    const message = newLang === 'zh-TW' ? '已切換為正體中文' : 'Switched to English'
    info(message)
  }, [toggleLanguage, currentLanguage, info])

  if (!mounted) {
    return null
  }

  return (
    <button
      className={styles.toggleButton}
      onClick={handleToggle}
      aria-label={`Switch to ${displayLabel}`}
      data-tour="language-switcher"
    >
      {displayLabel}
    </button>
  )
}
