'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PullToRefresh.module.css'

const PULL_THRESHOLD = 80 // 觸發刷新的下拉距離
const MAX_PULL = 120 // 最大下拉距離
const RESISTANCE = 2.5 // 阻力係數

export function PullToRefresh() {
  const { t } = useTranslation('common')
  const [isPwa, setIsPwa] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isPulling, setIsPulling] = useState(false)
  const startYRef = useRef(0)
  const currentYRef = useRef(0)

  // 檢測是否為 PWA 模式
  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true

    setIsPwa(isStandalone)
  }, [])

  // 處理觸控開始
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isRefreshing) return
    if (window.scrollY > 0) return

    startYRef.current = e.touches[0].clientY
    currentYRef.current = e.touches[0].clientY
  }, [isRefreshing])

  // 處理觸控移動
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isRefreshing) return
    if (startYRef.current === 0) return

    currentYRef.current = e.touches[0].clientY
    const deltaY = currentYRef.current - startYRef.current

    // 只有向下拉且在頁面頂部時才處理
    if (deltaY > 0 && window.scrollY === 0) {
      // 套用阻力
      const distance = Math.min(deltaY / RESISTANCE, MAX_PULL)
      setPullDistance(distance)
      setIsPulling(true)

      // 防止頁面滾動
      if (distance > 10) {
        e.preventDefault()
      }
    }
  }, [isRefreshing])

  // 處理觸控結束
  const handleTouchEnd = useCallback(() => {
    if (isRefreshing) return

    if (pullDistance >= PULL_THRESHOLD) {
      // 觸發刷新
      setIsRefreshing(true)
      setPullDistance(PULL_THRESHOLD)

      // 執行刷新
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } else {
      // 回彈
      setPullDistance(0)
      setIsPulling(false)
    }

    startYRef.current = 0
    currentYRef.current = 0
  }, [pullDistance, isRefreshing])

  // 綁定事件監聽器
  useEffect(() => {
    if (!isPwa) return

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPwa, handleTouchStart, handleTouchMove, handleTouchEnd])

  // 非 PWA 模式不渲染
  if (!isPwa) return null

  // 計算進度 (0 到 1)
  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1)
  const rotation = progress * 360
  const scale = 0.5 + progress * 0.5
  const opacity = progress

  return (
    <div
      className={`${styles.container} ${isPulling || isRefreshing ? styles.active : ''}`}
      style={{
        transform: `translateY(${pullDistance - 60}px)`,
        opacity: pullDistance > 10 ? opacity : 0,
      }}
    >
      <div
        className={`${styles.spinner} ${isRefreshing ? styles.refreshing : ''}`}
        style={{
          transform: `rotate(${rotation}deg) scale(${scale})`,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 12a9 9 0 11-6.219-8.56" />
        </svg>
      </div>
      <span className={styles.text}>
        {isRefreshing
          ? t('pullToRefresh.refreshing')
          : pullDistance >= PULL_THRESHOLD
            ? t('pullToRefresh.release')
            : t('pullToRefresh.pull')}
      </span>
    </div>
  )
}
