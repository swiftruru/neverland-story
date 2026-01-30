'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import styles from './SwipeNavigation.module.css'

// 課程子頁面的導航順序（與 BottomNav 一致）
const NAV_ORDER = ['intro', 'instructor', 'outline', 'tuition', 'signup']

// 各課程的基礎路徑
const COURSE_PATHS: Record<string, string> = {
  swift: '/courses/swift/advanced',
  swiftui: '/courses/swiftui/foundation',
  flutter: '/courses/flutter/advanced',
}

const SWIPE_THRESHOLD = 50 // 最小滑動距離
const SWIPE_VELOCITY_THRESHOLD = 0.3 // 最小滑動速度 (px/ms)

interface SwipeNavigationProps {
  courseType: 'swift' | 'swiftui' | 'flutter'
}

export function SwipeNavigation({ courseType }: SwipeNavigationProps) {
  const { t } = useTranslation('common')
  const pathname = usePathname()
  const router = useRouter()

  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const startTimeRef = useRef(0)
  const isSwipingRef = useRef(false)
  const isHorizontalRef = useRef<boolean | null>(null)

  const basePath = COURSE_PATHS[courseType]

  // 從路徑取得當前頁面
  const getCurrentPageIndex = useCallback(() => {
    if (!pathname) return -1
    const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    const currentPage = normalizedPath.split('/').pop()
    return NAV_ORDER.indexOf(currentPage || '')
  }, [pathname])

  // 取得目標頁面資訊
  const getTargetPage = useCallback((dir: 'prev' | 'next') => {
    const currentIndex = getCurrentPageIndex()
    if (currentIndex === -1) return null

    const targetIndex = dir === 'prev' ? currentIndex - 1 : currentIndex + 1
    if (targetIndex < 0 || targetIndex >= NAV_ORDER.length) return null

    return {
      index: targetIndex,
      page: NAV_ORDER[targetIndex],
      path: `${basePath}/${NAV_ORDER[targetIndex]}`,
    }
  }, [getCurrentPageIndex, basePath])

  // 導航到目標頁面
  const navigateTo = useCallback((dir: 'prev' | 'next') => {
    const target = getTargetPage(dir)
    if (!target) return

    setIsTransitioning(true)
    setDirection(dir === 'prev' ? 'right' : 'left')

    // 延遲導航讓動畫播放
    setTimeout(() => {
      router.push(target.path)
      setSwipeOffset(0)
      setIsTransitioning(false)
      setDirection(null)
    }, 150)
  }, [getTargetPage, router])

  // 處理觸控開始
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isTransitioning) return

    startXRef.current = e.touches[0].clientX
    startYRef.current = e.touches[0].clientY
    startTimeRef.current = Date.now()
    isSwipingRef.current = true
    isHorizontalRef.current = null
  }, [isTransitioning])

  // 處理觸控移動
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isSwipingRef.current || isTransitioning) return

    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const deltaX = currentX - startXRef.current
    const deltaY = currentY - startYRef.current

    // 判斷滑動方向（只判斷一次）
    if (isHorizontalRef.current === null) {
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        isHorizontalRef.current = Math.abs(deltaX) > Math.abs(deltaY)
      }
    }

    // 只處理水平滑動
    if (!isHorizontalRef.current) return

    const currentIndex = getCurrentPageIndex()
    if (currentIndex === -1) return

    // 檢查邊界
    const canSwipeRight = currentIndex > 0
    const canSwipeLeft = currentIndex < NAV_ORDER.length - 1

    // 套用阻力
    let adjustedOffset = deltaX
    if ((deltaX > 0 && !canSwipeRight) || (deltaX < 0 && !canSwipeLeft)) {
      adjustedOffset = deltaX * 0.2 // 邊界阻力
    }

    setSwipeOffset(adjustedOffset)

    // 防止頁面滾動
    if (Math.abs(deltaX) > 10) {
      e.preventDefault()
    }
  }, [isTransitioning, getCurrentPageIndex])

  // 處理觸控結束
  const handleTouchEnd = useCallback(() => {
    if (!isSwipingRef.current || isTransitioning) return

    const deltaX = swipeOffset
    const elapsed = Date.now() - startTimeRef.current
    const velocity = Math.abs(deltaX) / elapsed

    // 判斷是否達到滑動閾值
    const shouldNavigate =
      Math.abs(deltaX) > SWIPE_THRESHOLD ||
      velocity > SWIPE_VELOCITY_THRESHOLD

    if (shouldNavigate && isHorizontalRef.current) {
      if (deltaX > 0 && getTargetPage('prev')) {
        navigateTo('prev')
      } else if (deltaX < 0 && getTargetPage('next')) {
        navigateTo('next')
      } else {
        // 回彈
        setSwipeOffset(0)
      }
    } else {
      // 回彈
      setSwipeOffset(0)
    }

    isSwipingRef.current = false
    isHorizontalRef.current = null
  }, [swipeOffset, isTransitioning, getTargetPage, navigateTo])

  // 綁定事件
  useEffect(() => {
    const options = { passive: false } as AddEventListenerOptions

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, options)
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    document.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  // 重置狀態當路徑變化
  useEffect(() => {
    setSwipeOffset(0)
    setIsTransitioning(false)
    setDirection(null)
  }, [pathname])

  const currentIndex = getCurrentPageIndex()
  if (currentIndex === -1) return null

  const prevPage = getTargetPage('prev')
  const nextPage = getTargetPage('next')
  const showLeftIndicator = swipeOffset < -20 && nextPage
  const showRightIndicator = swipeOffset > 20 && prevPage

  return (
    <>
      {/* 左側指示器（向右滑動時顯示） */}
      {prevPage && (
        <div
          className={`${styles.indicator} ${styles.left} ${showRightIndicator ? styles.visible : ''}`}
          style={{
            opacity: Math.min(Math.abs(swipeOffset) / 100, 1),
            transform: `translateX(${Math.min(swipeOffset * 0.3, 30)}px)`,
          }}
        >
          <div className={styles.arrow}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </div>
          <span className={styles.pageName}>
            {t(`swipeNav.${prevPage.page}`)}
          </span>
        </div>
      )}

      {/* 右側指示器（向左滑動時顯示） */}
      {nextPage && (
        <div
          className={`${styles.indicator} ${styles.right} ${showLeftIndicator ? styles.visible : ''}`}
          style={{
            opacity: Math.min(Math.abs(swipeOffset) / 100, 1),
            transform: `translateX(${Math.max(swipeOffset * 0.3, -30)}px)`,
          }}
        >
          <span className={styles.pageName}>
            {t(`swipeNav.${nextPage.page}`)}
          </span>
          <div className={styles.arrow}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      )}

      {/* 頁面進度指示器 */}
      <div className={styles.progressContainer}>
        <div className={styles.progress}>
          {NAV_ORDER.map((page, index) => (
            <div
              key={page}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            />
          ))}
        </div>
      </div>

      {/* 過渡遮罩 */}
      {isTransitioning && (
        <div
          className={`${styles.transitionOverlay} ${direction ? styles[direction] : ''}`}
        />
      )}
    </>
  )
}
