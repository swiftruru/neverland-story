'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CookieConsent.module.css'

const CONSENT_KEY = 'cookie-consent'
const CONSENT_VERSION = '1'
const ONBOARDING_KEY = 'onboarding-tour-completed'

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

    // 等待新手導覽完成後再顯示
    const checkAndShow = () => {
      const onboardingCompleted = localStorage.getItem(ONBOARDING_KEY)
      if (onboardingCompleted) {
        // 新手導覽已完成，顯示 Cookie 橫幅
        setIsVisible(true)
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
        return true
      }
      return false
    }

    // 如果新手導覽已完成，延遲顯示
    if (checkAndShow()) return

    // 監聽 storage 變化，當新手導覽完成時顯示
    const handleStorage = (e: StorageEvent) => {
      if (e.key === ONBOARDING_KEY && e.newValue) {
        setTimeout(() => {
          setIsVisible(true)
          requestAnimationFrame(() => {
            setIsAnimating(true)
          })
        }, 500) // 導覽結束後稍等一下再顯示
      }
    }

    // 也設定一個 fallback，如果用戶跳過導覽或導覽不顯示
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true)
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      }
    }, 15000) // 15 秒後無論如何都顯示

    window.addEventListener('storage', handleStorage)

    // 也監聯自訂事件（用於同一視窗內的變化）
    const handleOnboardingComplete = () => {
      setTimeout(() => {
        setIsVisible(true)
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      }, 500)
    }
    window.addEventListener('onboarding-complete', handleOnboardingComplete)

    return () => {
      clearTimeout(fallbackTimer)
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('onboarding-complete', handleOnboardingComplete)
    }
  }, [isVisible])

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
