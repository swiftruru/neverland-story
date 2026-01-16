'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './BackToTop.module.css'

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BackToTop() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  // 滾動超過 300px 後顯示
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    handleScroll() // 初始檢查
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <button
      type="button"
      className={`${styles.button} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label={t('backToTop.label')}
      title={t('backToTop.label')}
    >
      <ArrowUpIcon />
    </button>
  )
}
