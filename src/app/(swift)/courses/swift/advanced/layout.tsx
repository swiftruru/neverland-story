import type { Metadata } from 'next'
import { SITE_URL, buildMetadata } from '@/app/metadata'

const baseMeta = buildMetadata({
  title: '彼得潘的 Swift iOS App 程式設計入門 | 彼得潘',
  description:
    '彼得潘為已有程式基礎的你準備的 iOS App 進階課程，用最新的 Swift、UIKit 與 SwiftUI，一起做出真正酷炫又能用的 App。',
  path: '/courses/swift/advanced',
})

const pageUrl = new URL('/courses/swift/advanced', SITE_URL).toString()
const ogImage = new URL('/swift/advanced/og.png', SITE_URL).toString()
const manifestUrl = '/swift/advanced/manifest.json'
const iconUrl = '/swift/advanced/icons/pwa-512.png'

export const metadata: Metadata = {
  ...baseMeta,
  openGraph: {
    ...baseMeta.openGraph,
    url: pageUrl,
    type: 'article',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: '彼得潘的 Swift iOS App 程式設計（進階）',
      },
    ],
  },
  twitter: {
    ...baseMeta.twitter,
    images: [ogImage],
    title: '彼得潘的 Swift iOS App 程式設計入門 | 彼得潘',
    description:
      '彼得潘為已有程式基礎的你準備的 iOS App 進階課程，用最新的 Swift、UIKit 與 SwiftUI，一起做出真正酷炫又能用的 App。',
  },
  manifest: manifestUrl,
  icons: {
    icon: iconUrl,
  },
  appleWebApp: {
    capable: true,
    title: '彼得潘 Swift',
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

export default function SwiftAdvancedLayout({ children }: { children: React.ReactNode }) {
  return children
}
