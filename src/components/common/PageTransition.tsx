'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './PageTransition.module.css'

export function PageTransition() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 頁面切換時顯示 loading
    setIsLoading(true)
    setIsVisible(true)

    // 快速顯示後淡出 (300ms 顯示 + 200ms 淡出)
    const showTimer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 500)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [pathname])

  if (!isVisible) return null

  return (
    <div className={`${styles.overlay} ${!isLoading ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        {/* Loading 動畫 - 三個跳動的點 */}
        <div className={styles.loader}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </div>
  )
}
