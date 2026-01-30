'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CookieConsent.module.css'

const CONSENT_KEY = 'cookie-consent'
const CONSENT_VERSION = '1'

type ConsentStatus = 'pending' | 'accepted' | 'declined'

interface ConsentData {
  status: ConsentStatus
  version: string
  timestamp: number
}

/**
 * 更新 Google Analytics 同意狀態
 */
function updateGoogleConsent(granted: boolean) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
    })
  }
}

/**
 * Cookie 同意橫幅
 * GDPR 合規並整合 Google Analytics 同意管理
 */
export function CookieConsent() {
  const { t } = useTranslation('common')
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // 檢查是否已有同意記錄
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored) {
      try {
        const data: ConsentData = JSON.parse(stored)
        // 檢查版本是否一致
        if (data.version === CONSENT_VERSION && data.status !== 'pending') {
          // 已有有效的同意記錄，更新 GA 狀態
          updateGoogleConsent(data.status === 'accepted')
          return
        }
      } catch {
        // 解析失敗，顯示橫幅
      }
    }
    // 延遲顯示橫幅，讓頁面先載入
    const timer = setTimeout(() => {
      setIsVisible(true)
      // 觸發進入動畫
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const saveConsent = useCallback((status: ConsentStatus) => {
    const data: ConsentData = {
      status,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data))
    updateGoogleConsent(status === 'accepted')

    // 退出動畫
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }, [])

  const handleAccept = useCallback(() => {
    saveConsent('accepted')
  }, [saveConsent])

  const handleDecline = useCallback(() => {
    saveConsent('declined')
  }, [saveConsent])

  if (!isVisible) return null

  return (
    <div
      className={`${styles.container} ${isAnimating ? styles.visible : ''}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      {/* 裝飾性膠帶 */}
      <span className={`${styles.tape} ${styles.tapeLeft}`} aria-hidden="true" />
      <span className={`${styles.tape} ${styles.tapeRight}`} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.icon} aria-hidden="true">
          🍪
        </div>

        <div className={styles.text}>
          <h3 id="cookie-consent-title" className={styles.title}>
            {t('cookie.title', '我們使用 Cookies')}
          </h3>
          <p id="cookie-consent-description" className={styles.description}>
            {t(
              'cookie.description',
              '我們使用 cookies 來分析網站流量並改善您的瀏覽體驗。點擊「接受」即表示您同意我們使用 cookies。'
            )}
          </p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.declineButton}
            onClick={handleDecline}
          >
            {t('cookie.decline', '拒絕')}
          </button>
          <button
            type="button"
            className={styles.acceptButton}
            onClick={handleAccept}
          >
            {t('cookie.accept', '接受')}
          </button>
        </div>
      </div>
    </div>
  )
}
