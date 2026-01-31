'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { haptic } from '@/utils/haptic'
import styles from './PullToRefresh.module.css'

const PULL_THRESHOLD = 60 // 觸發刷新的下拉距離（降低門檻）
const MAX_PULL = 100 // 最大下拉距離
const RESISTANCE = 1.8 // 阻力係數（降低阻力更流暢）

export function PullToRefresh() {
  const { t } = useTranslation('common')
  const [isPwa, setIsPwa] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startYRef = useRef(0)
  const isPullingRef = useRef(false)
  const canPullRef = useRef(false)
  const hasHapticRef = useRef(false) // 追蹤是否已觸發震動

  // 檢測是否為 PWA 模式
  useEffect(() => {
    const checkPwa = () => {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true
      setIsPwa(isStandalone)
    }

    checkPwa()

    // 監聽 display-mode 變化
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    mediaQuery.addEventListener('change', checkPwa)
    return () => mediaQuery.removeEventListener('change', checkPwa)
  }, [])

  // 檢查是否在頁面最頂部
  const isAtTop = useCallback(() => {
    return window.scrollY <= 1 && document.documentElement.scrollTop <= 1
  }, [])

  // 處理觸控開始
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isRefreshing) return

    // 檢查是否在頂部
    if (isAtTop()) {
      canPullRef.current = true
      startYRef.current = e.touches[0].clientY
    } else {
      canPullRef.current = false
    }
  }, [isRefreshing, isAtTop])

  // 處理觸控移動
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isRefreshing || !canPullRef.current) return

    const currentY = e.touches[0].clientY
    const deltaY = currentY - startYRef.current

    // 只有向下拉時才處理
    if (deltaY > 0 && isAtTop()) {
      isPullingRef.current = true

      // 套用阻力曲線（越拉越重）
      const rawDistance = deltaY / RESISTANCE
      const distance = Math.min(rawDistance, MAX_PULL)

      // 當達到閾值時觸發震動
      if (distance >= PULL_THRESHOLD && !hasHapticRef.current) {
        haptic('medium')
        hasHapticRef.current = true
      } else if (distance < PULL_THRESHOLD && hasHapticRef.current) {
        hasHapticRef.current = false
      }

      setPullDistance(distance)

      // 防止頁面滾動和 overscroll 效果
      if (distance > 5) {
        e.preventDefault()
      }
    } else if (deltaY <= 0 && isPullingRef.current) {
      // 向上滑時重置
      setPullDistance(0)
      isPullingRef.current = false
    }
  }, [isRefreshing, isAtTop])

  // 處理觸控結束
  const handleTouchEnd = useCallback(() => {
    if (isRefreshing || !isPullingRef.current) return

    if (pullDistance >= PULL_THRESHOLD) {
      // 觸發刷新時震動
      haptic('heavy')
      setIsRefreshing(true)

      // 執行刷新
      setTimeout(() => {
        window.location.reload()
      }, 400)
    } else {
      // 回彈動畫
      setPullDistance(0)
    }

    isPullingRef.current = false
    canPullRef.current = false
    startYRef.current = 0
    hasHapticRef.current = false
  }, [pullDistance, isRefreshing])

  // 綁定事件監聽器
  useEffect(() => {
    if (!isPwa) return

    // 設定 overscroll 行為
    document.body.style.overscrollBehavior = 'none'

    const options = { passive: false } as AddEventListenerOptions

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, options)
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    document.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      document.body.style.overscrollBehavior = ''
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [isPwa, handleTouchStart, handleTouchMove, handleTouchEnd])

  // 非 PWA 模式不渲染
  if (!isPwa) return null

  // 計算進度 (0 到 1)
  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1)
  const isReady = pullDistance >= PULL_THRESHOLD

  return (
    <div
      className={styles.container}
      style={{
        transform: `translateY(${Math.max(pullDistance - 50, -50)}px)`,
        opacity: pullDistance > 5 ? Math.min(progress * 1.5, 1) : 0,
        transition: isPullingRef.current ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        className={`${styles.spinner} ${isRefreshing ? styles.refreshing : ''} ${isReady ? styles.ready : ''}`}
        style={{
          transform: isRefreshing ? 'scale(1)' : `rotate(${progress * 360}deg) scale(${0.6 + progress * 0.4})`,
        }}
      >
        {isRefreshing ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12a9 9 0 11-6.219-8.56" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="7 13 12 18 17 13" />
            <polyline points="7 6 12 11 17 6" />
          </svg>
        )}
      </div>
      <span className={styles.text}>
        {isRefreshing
          ? t('pullToRefresh.refreshing')
          : isReady
            ? t('pullToRefresh.release')
            : t('pullToRefresh.pull')}
      </span>
    </div>
  )
}
