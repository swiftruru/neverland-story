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
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}
