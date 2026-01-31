/**
 * Service Worker for Neverland Story PWA
 * 提供離線瀏覽支援，快取重要頁面和靜態資源
 */

const CACHE_VERSION = 'v2'
const STATIC_CACHE = `neverland-static-${CACHE_VERSION}`
const PAGES_CACHE = `neverland-pages-${CACHE_VERSION}`
const IMAGES_CACHE = `neverland-images-${CACHE_VERSION}`

// 預先快取的核心頁面
const PRECACHE_PAGES = [
  '/',
  '/neverland/',
  '/neverland/courses/',
  '/neverland/tutoring/',
  '/offline.html',
  // Swift 課程
  '/courses/swift/advanced/',
  '/courses/swift/advanced/intro/',
  '/courses/swift/advanced/instructor/',
  '/courses/swift/advanced/outline/',
  '/courses/swift/advanced/tuition/',
  // SwiftUI 課程
  '/courses/swiftui/foundation/',
  '/courses/swiftui/foundation/intro/',
  '/courses/swiftui/foundation/instructor/',
  '/courses/swiftui/foundation/outline/',
  '/courses/swiftui/foundation/tuition/',
  // Flutter 課程
  '/courses/flutter/advanced/',
  '/courses/flutter/advanced/intro/',
  '/courses/flutter/advanced/instructor/',
  '/courses/flutter/advanced/outline/',
  '/courses/flutter/advanced/tuition/',
]

// 預先快取的靜態資源
const PRECACHE_STATIC = [
  '/manifest.json',
  '/icons/pwa-512.png',
]

// 需要快取的資源類型
const CACHEABLE_EXTENSIONS = [
  '.js', '.css', '.woff', '.woff2', '.ttf', '.otf',
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'
]

// 安裝事件 - 預先快取資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // 快取頁面
      caches.open(PAGES_CACHE).then((cache) => {
        return Promise.allSettled(
          PRECACHE_PAGES.map((url) =>
            cache.add(url).catch((err) => {
              console.warn(`Failed to cache ${url}:`, err)
            })
          )
        )
      }),
      // 快取靜態資源
      caches.open(STATIC_CACHE).then((cache) => {
        return Promise.allSettled(
          PRECACHE_STATIC.map((url) =>
            cache.add(url).catch((err) => {
              console.warn(`Failed to cache ${url}:`, err)
            })
          )
        )
      }),
    ]).then(() => self.skipWaiting())
  )
})

// 啟動事件 - 清理舊快取
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, PAGES_CACHE, IMAGES_CACHE]

  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => !currentCaches.includes(key))
            .map((key) => {
              console.log('Deleting old cache:', key)
              return caches.delete(key)
            })
        )
      })
      .then(() => self.clients.claim())
  )
})

// 判斷是否為可快取的靜態資源
function isCacheableStatic(url) {
  return CACHEABLE_EXTENSIONS.some((ext) => url.pathname.endsWith(ext))
}

// 判斷是否為圖片資源
function isImageRequest(url) {
  return /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(url.pathname)
}

// 判斷是否為 API 請求
function isApiRequest(url) {
  return url.pathname.startsWith('/api/')
}

// 判斷是否為需要快取的頁面
function isCacheablePage(url) {
  // 課程相關頁面
  if (url.pathname.startsWith('/courses/')) return true
  // Neverland 頁面
  if (url.pathname.startsWith('/neverland/')) return true
  // 首頁
  if (url.pathname === '/') return true
  return false
}

// 網路優先策略 (用於頁面導航)
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    const cached = await caches.match(request)
    if (cached) return cached
    // 如果是導航請求，返回離線頁面
    if (request.mode === 'navigate') {
      return caches.match('/offline.html')
    }
    throw error
  }
}

// 快取優先策略 (用於靜態資源)
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request)
  if (cached) return cached

  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    throw error
  }
}

// Stale-While-Revalidate 策略 (用於圖片)
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => null)

  return cached || fetchPromise
}

// 攔截 fetch 請求
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // 只處理 GET 請求
  if (request.method !== 'GET') return

  // 跳過非同源請求 (除了 CDN 資源)
  if (url.origin !== self.location.origin) {
    // 對於外部字體和 CDN 資源，使用 cache-first
    if (url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com') ||
        url.hostname.includes('cdn')) {
      event.respondWith(cacheFirst(request, STATIC_CACHE))
    }
    return
  }

  // 跳過 API 請求
  if (isApiRequest(url)) return

  // 頁面導航請求 - 網路優先
  if (request.mode === 'navigate') {
    if (isCacheablePage(url)) {
      event.respondWith(networkFirst(request, PAGES_CACHE))
    } else {
      event.respondWith(
        fetch(request).catch(() => caches.match('/offline.html'))
      )
    }
    return
  }

  // 圖片請求 - Stale-While-Revalidate
  if (isImageRequest(url)) {
    event.respondWith(staleWhileRevalidate(request, IMAGES_CACHE))
    return
  }

  // 靜態資源 - 快取優先
  if (isCacheableStatic(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
    return
  }
})

// 監聽來自客戶端的訊息
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }

  // 手動觸發快取更新
  if (event.data === 'cachePages') {
    caches.open(PAGES_CACHE).then((cache) => {
      PRECACHE_PAGES.forEach((url) => {
        cache.add(url).catch(() => {})
      })
    })
  }
})
