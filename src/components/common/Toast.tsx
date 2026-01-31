'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast, Toast as ToastType, ToastType as ToastVariant } from '@/contexts/ToastContext'
import styles from './Toast.module.css'

const SWIPE_THRESHOLD = 80

// 各類型的 Icon
const icons: Record<ToastVariant, JSX.Element> = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
}

interface ToastItemProps {
  toast: ToastType
  onRemove: (id: string) => void
  closeLabel: string
}

function ToastItem({ toast, onRemove, closeLabel }: ToastItemProps) {
  const [exiting, setExiting] = useState(false)
  const [exitDirection, setExitDirection] = useState<'right' | 'left'>('right')
  const [offsetX, setOffsetX] = useState(0)
  const startXRef = useRef(0)
  const isDraggingRef = useRef(false)
  const toastRef = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => {
    setExiting(true)
    setTimeout(() => {
      onRemove(toast.id)
    }, 250)
  }, [toast.id, onRemove])

  // Touch 事件處理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
    isDraggingRef.current = true
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return
    const currentX = e.touches[0].clientX
    const diff = currentX - startXRef.current
    setOffsetX(diff)
  }, [])

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false

    if (Math.abs(offsetX) > SWIPE_THRESHOLD) {
      // 滑動超過閾值，關閉
      setExitDirection(offsetX > 0 ? 'right' : 'left')
      setExiting(true)
      setTimeout(() => {
        onRemove(toast.id)
      }, 250)
    } else {
      // 彈回原位
      setOffsetX(0)
    }
  }, [offsetX, toast.id, onRemove])

  // 鍵盤支援
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleClose])

  const exitClass = exiting
    ? exitDirection === 'left'
      ? styles.exitingLeft
      : styles.exiting
    : ''

  return (
    <div
      ref={toastRef}
      className={`${styles.toast} ${styles[toast.type]} ${exitClass}`}
      role="alert"
      aria-live="polite"
      style={{
        transform: !exiting && offsetX !== 0 ? `translateX(${offsetX}px)` : undefined,
        opacity: !exiting ? 1 - Math.abs(offsetX) / 200 : undefined,
        transition: isDraggingRef.current ? 'none' : 'transform 0.2s ease, opacity 0.2s ease',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Icon */}
      <span className={styles.icon} aria-hidden="true">
        {icons[toast.type]}
      </span>

      {/* Message */}
      <span className={styles.message}>{toast.message}</span>

      {/* Close Button */}
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleClose}
        aria-label={closeLabel}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Progress Bar */}
      {toast.duration > 0 && !exiting && (
        <div
          className={styles.progressBar}
          style={{ animationDuration: `${toast.duration}ms` }}
        />
      )}
    </div>
  )
}

/**
 * Toast Container
 * 顯示所有活動中的 toast
 */
export function ToastContainer() {
  const { t } = useTranslation('common')
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className={styles.container} aria-label={t('toast.area')}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
          closeLabel={t('toast.close')}
        />
      ))}
    </div>
  )
}
