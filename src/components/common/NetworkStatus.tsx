'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './NetworkStatus.module.css'

type NetworkState = 'online' | 'offline' | 'reconnected'

export function NetworkStatus() {
  const { t } = useTranslation('common')
  const [state, setState] = useState<NetworkState>('online')
  const [visible, setVisible] = useState(false)
  const [wasOffline, setWasOffline] = useState(false)

  const handleOnline = useCallback(() => {
    if (wasOffline) {
      setState('reconnected')
      setVisible(true)

      // 3 秒後自動隱藏並重新整理
      setTimeout(() => {
        setVisible(false)
        // 延遲一下再刷新，讓動畫完成
        setTimeout(() => {
          window.location.reload()
        }, 300)
      }, 2000)
    }
    setWasOffline(false)
  }, [wasOffline])

  const handleOffline = useCallback(() => {
    setState('offline')
    setVisible(true)
    setWasOffline(true)
  }, [])

  useEffect(() => {
    // 初始化檢查
    if (!navigator.onLine) {
      setState('offline')
      setVisible(true)
      setWasOffline(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [handleOnline, handleOffline])

  // 手動關閉離線提示
  const dismiss = useCallback(() => {
    if (state === 'offline') {
      setVisible(false)
    }
  }, [state])

  // 手動重新整理
  const refresh = useCallback(() => {
    window.location.reload()
  }, [])

  if (!visible) return null

  return (
    <div
      className={`${styles.container} ${styles[state]}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        <div className={styles.icon}>
          {state === 'offline' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
              <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
              <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
              <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
          )}
        </div>

        <div className={styles.text}>
          <span className={styles.title}>
            {state === 'offline'
              ? t('networkStatus.offline')
              : t('networkStatus.reconnected')}
          </span>
          <span className={styles.subtitle}>
            {state === 'offline'
              ? t('networkStatus.offlineHint')
              : t('networkStatus.refreshing')}
          </span>
        </div>

        {state === 'offline' ? (
          <div className={styles.actions}>
            <button
              className={styles.retryBtn}
              onClick={refresh}
              aria-label={t('networkStatus.retry')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </button>
            <button
              className={styles.dismissBtn}
              onClick={dismiss}
              aria-label={t('networkStatus.dismiss')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ) : (
          <div className={styles.spinner} />
        )}
      </div>
    </div>
  )
}
