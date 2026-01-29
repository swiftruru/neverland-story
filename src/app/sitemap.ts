import type { MetadataRoute } from 'next'

const SITE_URL = 'https://p207.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Neverland 主站頁面
  const neverlandPages = [
    '',
    '/apps',
    '/books',
    '/classroom',
    '/columns',
    '/contact',
    '/courses',
    '/essays',
    '/experience',
    '/ferryman',
    '/gallery',
    '/links',
    '/qa',
    '/tutoring',
    '/videos',
  ].map((path) => ({
    url: `${SITE_URL}/neverland${path}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  // 課程總覽頁面
  const coursesOverview = [
    { url: `${SITE_URL}/courses`, priority: 0.9 },
  ].map((item) => ({
    ...item,
    lastModified,
    changeFrequency: 'weekly' as const,
  }))

  // Swift iOS 進階課程子頁面
  const swiftAdvancedSubPages = [
    '',
    '/intro',
    '/info',
    '/features',
    '/goals',
    '/audience',
    '/instructor',
    '/outline',
    '/assignments',
    '/tuition',
    '/testimonials',
    '/qa',
    '/contact',
    '/signup',
    '/more',
  ]

  const swiftAdvancedPages = swiftAdvancedSubPages.map((path) => ({
    url: `${SITE_URL}/courses/swift/advanced${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 0.9 : 0.7,
  }))

  // SwiftUI Foundation 課程子頁面
  const swiftuiFoundationSubPages = [
    '',
    '/intro',
    '/info',
    '/features',
    '/goals',
    '/audience',
    '/instructor',
    '/outline',
    '/assignments',
    '/tuition',
    '/testimonials',
    '/qa',
    '/contact',
    '/signup',
    '/more',
  ]

  const swiftuiFoundationPages = swiftuiFoundationSubPages.map((path) => ({
    url: `${SITE_URL}/courses/swiftui/foundation${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 0.9 : 0.7,
  }))

  // Flutter Advanced 課程子頁面
  const flutterAdvancedSubPages = [
    '',
    '/intro',
    '/info',
    '/features',
    '/goals',
    '/audience',
    '/instructor',
    '/outline',
    '/assignments',
    '/tuition',
    '/testimonials',
    '/contact',
    '/signup',
    '/more',
  ]

  const flutterAdvancedPages = flutterAdvancedSubPages.map((path) => ({
    url: `${SITE_URL}/courses/flutter/advanced${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 0.9 : 0.7,
  }))

  return [
    ...neverlandPages,
    ...coursesOverview,
    ...swiftAdvancedPages,
    ...swiftuiFoundationPages,
    ...flutterAdvancedPages,
  ]
}
