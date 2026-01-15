'use client'

import { useLanguage } from '@hooks/useLanguage'
import styles from './LanguageSwitcher.module.css'

export function LanguageSwitcher() {
  const { currentLanguage, toggleLanguage } = useLanguage()

  // 顯示「另一個」語言的名稱，讓使用者知道點擊後會切換到什麼
  const displayLabel = currentLanguage === 'zh-TW' ? 'English' : '正體中文'

  return (
    <button
      className={styles.toggleButton}
      onClick={toggleLanguage}
      aria-label={`Switch to ${displayLabel}`}
    >
      {displayLabel}
    </button>
  )
}
