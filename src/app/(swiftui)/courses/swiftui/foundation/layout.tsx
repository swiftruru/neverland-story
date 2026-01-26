import type { Metadata } from 'next'
import { SITE_URL, buildMetadata } from '@/app/metadata'

const baseMeta = buildMetadata({
  title: '文組生的 iOS SwiftUI App 程式設計入門 | 彼得潘',
  description:
    '給文組與零基礎的你，彼得潘用 SwiftUI 帶你走進 iOS App 的世界，從零開始也能做出漂亮的 App。',
  path: '/courses/swiftui/foundation',
})

const pageUrl = new URL('/courses/swiftui/foundation', SITE_URL).toString()
const ogImage = new URL('/swiftui/foundation/og.png', SITE_URL).toString()
// Static assets in /public are served from root, don't use withBasePath
const manifestUrl = '/swiftui/foundation/manifest.json'
const iconUrl = '/swiftui/foundation/icons/pwa-512.png'

export const metadata: Metadata = {
  ...baseMeta,
  openGraph: {
    ...baseMeta.openGraph,
    title: '文組生的 iOS SwiftUI App 程式設計入門 | 彼得潘',
    url: pageUrl,
    type: 'article',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: '文組生的 iOS SwiftUI App 程式設計入門',
      },
    ],
  },
  twitter: {
    ...baseMeta.twitter,
    images: [ogImage],
    title: '文組生的 iOS SwiftUI App 程式設計入門 | 彼得潘',
    description:
      '給文組與零基礎的你，彼得潘用 SwiftUI 帶你走進 iOS App 的世界，從零開始也能做出漂亮的 App。',
  },
  manifest: manifestUrl,
  icons: {
    icon: iconUrl,
  },
  appleWebApp: {
    capable: true,
    title: '文組生 SwiftUI',
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

export default function FoundationLayout({ children }: { children: React.ReactNode }) {
  return children
}
