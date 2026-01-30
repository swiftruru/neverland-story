'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

type GoogleAnalyticsProps = {
  measurementId: string
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

const CONSENT_KEY = 'cookie-consent'

/**
 * 檢查是否已同意 cookies
 */
function getInitialConsentStatus(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      return data.status === 'accepted'
    }
  } catch {
    // 解析失敗
  }
  return false
}

function getContentGroup(pathname: string): string {
  if (pathname.startsWith('/neverland')) return 'neverland'
  if (pathname.startsWith('/courses/swift/')) return 'swift'
  if (pathname.startsWith('/courses/swiftui/')) return 'swiftui'
  if (pathname.startsWith('/courses/flutter/')) return 'flutter'
  if (pathname.startsWith('/courses')) return 'courses'
  return 'other'
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      const contentGroup = getContentGroup(pathname)
      window.gtag('config', measurementId, {
        page_path: pathname,
        content_group: contentGroup,
      })
    }
  }, [pathname, measurementId])

  // 根據已存的同意狀態決定初始值
  const consentGranted = typeof window !== 'undefined' ? getInitialConsentStatus() : false
  const consentDefault = consentGranted ? 'granted' : 'denied'

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // GDPR 同意模式 - 預設拒絕，等待用戶同意
          gtag('consent', 'default', {
            analytics_storage: '${consentDefault}',
            ad_storage: '${consentDefault}',
            ad_user_data: '${consentDefault}',
            ad_personalization: '${consentDefault}',
            wait_for_update: 500
          });

          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}
