import type { Metadata } from 'next'
import { SITE_URL, buildMetadata } from '@/app/metadata'
import { CourseJsonLd, StaticBreadcrumbJsonLd, type BreadcrumbItem } from '@components/common'

const courseName = '彼得潘的 Swift iOS App 程式設計入門'
const courseDescription =
  '彼得潘為已有程式基礎的你準備的 iOS App 進階課程，用最新的 Swift、UIKit 與 SwiftUI，一起做出真正酷炫又能用的 App。'

const baseMeta = buildMetadata({
  title: `${courseName} | 彼得潘`,
  description: courseDescription,
  path: '/courses/swift/advanced',
})

const pageUrl = new URL('/courses/swift/advanced', SITE_URL).toString()
const ogImage = new URL('/swift/advanced/og.webp', SITE_URL).toString()
const manifestUrl = '/swift/advanced/manifest.json'
const iconUrl = '/swift/advanced/icons/pwa-512.png'

export const metadata: Metadata = {
  ...baseMeta,
  openGraph: {
    ...baseMeta.openGraph,
    title: `${courseName} | 彼得潘`,
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
    title: `${courseName} | 彼得潘`,
    description: courseDescription,
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
      en: pageUrl,
    },
  },
}

const breadcrumbItems: BreadcrumbItem[] = [
  { name: '首頁', url: new URL('/neverland', SITE_URL).toString() },
  { name: '課程總覽', url: new URL('/neverland/courses', SITE_URL).toString() },
  { name: courseName, url: pageUrl },
]

export default function SwiftAdvancedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CourseJsonLd
        name={courseName}
        description={courseDescription}
        provider="彼得潘 Peter Pan"
        url={pageUrl}
        image={ogImage}
        duration="P8W"
      />
      <StaticBreadcrumbJsonLd items={breadcrumbItems} />
      {children}
    </>
  )
}
