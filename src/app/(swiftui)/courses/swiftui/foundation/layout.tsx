import type { Metadata } from 'next'
import { SITE_URL, buildMetadata } from '@/app/metadata'
import { CourseJsonLd, StaticBreadcrumbJsonLd, type BreadcrumbItem } from '@components/common'

const courseName = '文組生的 iOS SwiftUI App 程式設計入門'
const courseDescription =
  '給文組與零基礎的你，彼得潘用 SwiftUI 帶你走進 iOS App 的世界，從零開始也能做出漂亮的 App。'

const baseMeta = buildMetadata({
  title: `${courseName} | 彼得潘`,
  description: courseDescription,
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
    title: `${courseName} | 彼得潘`,
    url: pageUrl,
    type: 'article',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: courseName,
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
      en: pageUrl,
    },
  },
}

const breadcrumbItems: BreadcrumbItem[] = [
  { name: '首頁', url: new URL('/neverland', SITE_URL).toString() },
  { name: '課程總覽', url: new URL('/neverland/courses', SITE_URL).toString() },
  { name: courseName, url: pageUrl },
]

export default function FoundationLayout({ children }: { children: React.ReactNode }) {
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
