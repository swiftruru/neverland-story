import type { Metadata } from 'next'
import { SITE_URL, buildMetadata } from '@/app/metadata'

const baseMeta = buildMetadata({
  title: '彼得潘的 Flutter 跨平台 App 程式設計入門 | 彼得潘',
  description:
    '為文組生量身訂做，10 週每週一晚，從零開始學程式，開心寫出 iOS / Android 的 Flutter App。',
  path: '/courses/flutter/advanced',
})

const pageUrl = new URL('/courses/flutter/advanced', SITE_URL).toString()
const ogImage = new URL('/flutter/advanced/og.png', SITE_URL).toString()
const manifestUrl = '/flutter/advanced/manifest.json'
const iconUrl = '/flutter/advanced/icons/pwa-512.png'

export const metadata: Metadata = {
  ...baseMeta,
  openGraph: {
    ...baseMeta.openGraph,
    title: '彼得潘的 Flutter 跨平台 App 程式設計入門 | 彼得潘',
    url: pageUrl,
    type: 'article',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: '彼得潘的 Flutter 跨平台 App 程式設計入門',
      },
    ],
  },
  twitter: {
    ...baseMeta.twitter,
    images: [ogImage],
    title: '彼得潘的 Flutter 跨平台 App 程式設計入門 | 彼得潘',
    description:
      '為文組生量身訂做，10 週每週一晚，從零開始學程式，開心寫出 iOS / Android 的 Flutter App。',
  },
  manifest: manifestUrl,
  icons: {
    icon: iconUrl,
  },
  appleWebApp: {
    capable: true,
    title: '彼得潘 Flutter',
    statusBarStyle: 'default',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  alternates: {
    canonical: pageUrl,
    languages: {
      'zh-TW': pageUrl,
    },
  },
}

export default function FlutterAdvancedLayout({ children }: { children: React.ReactNode }) {
  return children
}
