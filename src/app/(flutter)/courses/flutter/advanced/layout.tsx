import type { Metadata } from 'next'
import { SITE_URL, buildMetadata } from '@/app/metadata'
import { CourseJsonLd, StaticBreadcrumbJsonLd, type BreadcrumbItem } from '@components/common'

const courseName = '彼得潘的 Flutter 跨平台 App 程式設計入門'
const courseDescription =
  '彼得潘帶你學 Flutter 跨平台 App 開發，用一套程式做出 iOS 與 Android App，成為酷炫的 App 開發魔法師。'

const baseMeta = buildMetadata({
  title: `${courseName} | 彼得潘`,
  description: courseDescription,
  path: '/courses/flutter/advanced',
})

const pageUrl = new URL('/courses/flutter/advanced', SITE_URL).toString()
const ogImage = new URL('/flutter/advanced/flutter-og.png', SITE_URL).toString()
const manifestUrl = '/flutter/advanced/manifest.json'
const iconUrl = '/flutter/advanced/icons/pwa-512.png'

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
      en: pageUrl,
    },
  },
}

const breadcrumbItems: BreadcrumbItem[] = [
  { name: '首頁', url: new URL('/neverland', SITE_URL).toString() },
  { name: '課程總覽', url: new URL('/neverland/courses', SITE_URL).toString() },
  { name: courseName, url: pageUrl },
]

export default function FlutterAdvancedLayout({ children }: { children: React.ReactNode }) {
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
