'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PwaInstallPrompt.module.css'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const STORAGE_KEY = 'pwa-install-prompt-dismissed'
const DISMISS_DURATION_DAYS = 7
const SCROLL_THRESHOLD = 300

export function PwaInstallPrompt() {
  const { t, ready } = useTranslation('common')
  const [isVisible, setIsVisible] = useState(false)
  const [isSheetVisible, setIsSheetVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [platform, setPlatform] = useState<'ios' | 'android' | 'unsupported'>('unsupported')
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  // 檢測平台
  const detectPlatform = useCallback(() => {
    if (typeof window === 'undefined') return 'unsupported'

    const ua = navigator.userAgent.toLowerCase()
    const isIos = /iphone|ipad|ipod/.test(ua)
    const isSafari = /safari/.test(ua) && !/chrome/.test(ua) && !/crios/.test(ua)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as Navigator & { standalone?: boolean }).standalone === true

    // 已安裝則不顯示
    if (isStandalone) return 'unsupported'

    if (isIos && isSafari) return 'ios'
    if (/android/.test(ua) && /chrome/.test(ua)) return 'android'

    return 'unsupported'
  }, [])

  // 檢查是否已關閉過
  const isDismissed = useCallback(() => {
    if (typeof window === 'undefined') return true
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) return false

    const dismissedTime = parseInt(dismissed, 10)
    const now = Date.now()
    const daysPassed = (now - dismissedTime) / (1000 * 60 * 60 * 24)

    return daysPassed < DISMISS_DURATION_DAYS
  }, [])

  // 關閉提示
  const handleDismiss = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsSheetVisible(false)
      setIsClosing(false)
      localStorage.setItem(STORAGE_KEY, Date.now().toString())
    }, 300)
  }, [])

  // Android 安裝
  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        handleDismiss()
      }
    } catch {
      // 忽略錯誤
    }

    setDeferredPrompt(null)
  }, [deferredPrompt, handleDismiss])

  // 監聽 beforeinstallprompt 事件 (Android)
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  // 初始化平台檢測
  useEffect(() => {
    setPlatform(detectPlatform())
  }, [detectPlatform])

  // 滾動觸發顯示
  useEffect(() => {
    if (platform === 'unsupported' || isDismissed()) return

    let hasTriggered = false

    const handleScroll = () => {
      if (hasTriggered) return

      const scrollY = window.scrollY || document.documentElement.scrollTop
      if (scrollY > SCROLL_THRESHOLD) {
        hasTriggered = true
        // 先顯示背景遮罩
        setIsVisible(true)
        // 延遲後再顯示 sheet，讓動畫更有層次感
        setTimeout(() => {
          setIsSheetVisible(true)
        }, 100)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [platform, isDismissed])

  if (!ready || !isVisible || platform === 'unsupported') return null

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.closing : ''}`} onClick={handleDismiss}>
      {isSheetVisible && (
        <div
          className={`${styles.sheet} ${isClosing ? styles.closing : ''}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-prompt-title"
        >
        {/* 拖曳指示器 */}
        <div className={styles.handle} />

        {/* 關閉按鈕 */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleDismiss}
          aria-label={t('pwaPrompt.close')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 內容 */}
        <div className={styles.content}>
          {/* App 圖示 */}
          <div className={styles.appIcon}>
            <img src="/icons/pwa-512.png" alt="App icon" />
          </div>

          <h2 id="pwa-prompt-title" className={styles.title}>
            {t('pwaPrompt.title')}
          </h2>

          <p className={styles.description}>
            {t('pwaPrompt.description')}
          </p>

          {platform === 'ios' ? (
            // iOS Safari 指引
            <div className={styles.iosInstructions}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <div className={styles.stepContent}>
                  <span className={styles.stepText}>{t('pwaPrompt.ios.step1')}</span>
                  <div className={styles.shareIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.shareIconIos}>
                      <path d="M12 2l3.5 3.5-1.41 1.41L12 4.83 9.91 6.91 8.5 5.5 12 2zm0 4.83l-1.41 1.41L12 6.83l1.41 1.41L12 6.83zM4 12h16v2H4v-2zm0 4h16v2H4v-2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <div className={styles.stepContent}>
                  <span className={styles.stepText}>{t('pwaPrompt.ios.step2')}</span>
                  <div className={styles.addIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Android Chrome 安裝按鈕
            <button
              type="button"
              className={styles.installButton}
              onClick={handleInstall}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t('pwaPrompt.android.install')}
            </button>
          )}
        </div>

        {/* 稍後提示 */}
        <button
          type="button"
          className={styles.laterButton}
          onClick={handleDismiss}
        >
          {t('pwaPrompt.later')}
        </button>
        </div>
      )}
    </div>
  )
}
