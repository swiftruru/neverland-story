import type { Metadata } from 'next'
import { SITE_URL, buildMetadata } from '@/app/metadata'

const baseMeta = buildMetadata({
  title: '彼得潘的 Swift iOS App 程式設計入門 | 彼得潘',
  description:
    '彼得潘專為 Swift 學習者設計的 iOS App 課程站點骨架，將陸續補齊課程簡介、目標、作業、學費與聯絡等內容。',
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
        alt: '彼得潘的 Swift iOS App 程式設計入門',
      },
    ],
  },
  twitter: {
    ...baseMeta.twitter,
    images: [ogImage],
    title: '彼得潘的 Swift iOS App 程式設計入門 | 彼得潘',
    description:
      '彼得潘專為 Swift 學習者設計的 iOS App 課程站點骨架，將陸續補齊課程簡介、目標、作業、學費與聯絡等內容。',
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
