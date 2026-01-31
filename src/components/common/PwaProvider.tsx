'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'

export function PwaProvider() {
  const pathname = usePathname()
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

  // 註冊 Service Worker
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    const registerSW = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        })
        setRegistration(reg)

        // 檢查更新
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          if (!newWorker) return

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 新版本已安裝，可以提示使用者重新整理
              console.log('New service worker available')
            }
          })
        })
      } catch (error) {
        console.warn('Service worker registration failed:', error)
      }
    }

    // 頁面載入完成後註冊
    if (document.readyState === 'complete') {
      registerSW()
    } else {
      window.addEventListener('load', registerSW)
      return () => window.removeEventListener('load', registerSW)
    }
  }, [])

  // 當路由變化時，觸發頁面快取
  const cacheCurrentPage = useCallback(() => {
    if (registration?.active) {
      registration.active.postMessage('cachePages')
    }
  }, [registration])

  useEffect(() => {
    // 延遲快取，避免影響頁面載入效能
    const timer = setTimeout(cacheCurrentPage, 3000)
    return () => clearTimeout(timer)
  }, [pathname, cacheCurrentPage])

  // 監聽網路狀態變化
  useEffect(() => {
    const handleOnline = () => {
      // 網路恢復時，觸發快取更新
      if (registration?.active) {
        registration.active.postMessage('cachePages')
      }
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [registration])

  return null
}
