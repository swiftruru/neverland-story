import type { Metadata } from 'next'
import { SITE_URL, buildMetadata } from '@/app/metadata'

const baseMeta = buildMetadata({
  title: '彼得潘的 Flutter 跨平台 App 程式設計入門',
  description: '為文組生量身訂做，10 週每週一晚，從零開始學程式，開心寫出 iOS / Android 的 Flutter App。',
  path: '/courses/flutter',
})

const pageUrl = new URL('/courses/flutter', SITE_URL).toString()
const ogImage = new URL('/flutter/advanced/og.png', SITE_URL).toString()

export const metadata: Metadata = {
  ...baseMeta,
  openGraph: {
    ...baseMeta.openGraph,
    title: '彼得潘的 Flutter 跨平台 App 程式設計入門 | 彼得潘',
    url: pageUrl,
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
  },
}

export default function FlutterLayout({ children }: { children: React.ReactNode }) {
  return children
}
