import type { Metadata } from 'next'

export const SITE_NAME = '彼得潘的 iOS App 程式設計入門'
export const SITE_DESCRIPTION = '彼得潘的 iOS App 程式設計入門 - Neverland Story'

// 站點來源與子路徑，可透過環境變數覆蓋，方便同一份程式部署到不同子站
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://p207.app'
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/neverland'
export const ASSET_BASE = BASE_PATH

type MetadataInput = {
  title?: string
  description?: string
  path?: string
}

const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`)

export function withBasePath(path: string) {
  const normalized = normalizePath(path || '/')
  const base = BASE_PATH === '/' ? '' : BASE_PATH.replace(/\/+$/, '')
  return `${base}${normalized}`.replace(/\/+/g, '/')
}

export function assetPath(path: string) {
  const clean = path.startsWith('/') ? path.slice(1) : path
  const base = ASSET_BASE === '/' ? '' : ASSET_BASE.replace(/\/+$/, '')
  return `${base}/${clean}`.replace(/\/+/g, '/')
}

export function buildAbsoluteUrl(path: string) {
  const pathname = withBasePath(path)
  return new URL(pathname, SITE_URL).toString()
}

// 課程子頁面 metadata 配置
export type CoursePageType =
  | 'intro'
  | 'info'
  | 'features'
  | 'goals'
  | 'audience'
  | 'instructor'
  | 'outline'
  | 'assignments'
  | 'tuition'
  | 'testimonials'
  | 'qa'
  | 'contact'
  | 'signup'
  | 'more'

type CourseMetaConfig = {
  courseName: string
  courseDescription: string
  basePath: string
  ogImage: string
}

const PAGE_TITLES: Record<CoursePageType, string> = {
  intro: '課程介紹',
  info: '課程資訊',
  features: '課程特色',
  goals: '學習目標',
  audience: '適合對象',
  instructor: '講師介紹',
  outline: '課程大綱',
  assignments: '作業說明',
  tuition: '學費方案',
  testimonials: '學員心得',
  qa: '常見問題',
  contact: '聯絡我們',
  signup: '立即報名',
  more: '更多課程',
}

const PAGE_DESCRIPTIONS: Record<CoursePageType, string> = {
  intro: '深入了解課程內容與學習成果',
  info: '課程時間、地點與上課方式',
  features: '課程獨特優勢與教學特色',
  goals: '完成課程後你將學會的技能',
  audience: '了解這門課程是否適合你',
  instructor: '認識你的講師彼得潘',
  outline: '完整課程大綱與每週進度',
  assignments: '課程作業與實作專案說明',
  tuition: '學費方案與優惠資訊',
  testimonials: '聽聽學員怎麼說',
  qa: '常見問題與解答',
  contact: '有任何問題歡迎聯絡我們',
  signup: '立即報名加入課程',
  more: '探索更多彼得潘的課程',
}

export function buildCoursePageMetadata(
  pageType: CoursePageType,
  config: CourseMetaConfig
): Metadata {
  const pageTitle = PAGE_TITLES[pageType]
  const fullTitle = `${pageTitle}｜${config.courseName}`
  const pageDescription = `${PAGE_DESCRIPTIONS[pageType]}。${config.courseDescription}`
  const url = new URL(`${config.basePath}/${pageType}`, SITE_URL).toString()

  return {
    title: fullTitle,
    description: pageDescription,
    openGraph: {
      title: fullTitle,
      description: pageDescription,
      url,
      siteName: 'Neverland Story',
      images: [
        {
          url: config.ogImage,
          width: 1200,
          height: 630,
          alt: config.courseName,
        },
      ],
      locale: 'zh_TW',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: pageDescription,
      images: [config.ogImage],
    },
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': url,
      },
    },
  }
}

// Swift Advanced 課程配置
export const SWIFT_ADVANCED_CONFIG: CourseMetaConfig = {
  courseName: '彼得潘的 Swift iOS App 程式設計入門',
  courseDescription: '用最新的 Swift、UIKit 與 SwiftUI，做出真正酷炫的 iOS App',
  basePath: '/courses/swift/advanced',
  ogImage: new URL('/swift/advanced/og.png', SITE_URL).toString(),
}

// SwiftUI Foundation 課程配置
export const SWIFTUI_FOUNDATION_CONFIG: CourseMetaConfig = {
  courseName: '文組生的 iOS SwiftUI App 程式設計入門',
  courseDescription: '專為文組生設計，從零開始學習 iOS App 開發',
  basePath: '/courses/swiftui/foundation',
  ogImage: new URL('/swiftui/foundation/og.png', SITE_URL).toString(),
}

// Flutter Advanced 課程配置
export const FLUTTER_ADVANCED_CONFIG: CourseMetaConfig = {
  courseName: '彼得潘的 Flutter 跨平台 App 程式設計入門',
  courseDescription: '學習 Flutter 跨平台 App 開發，一次開發 iOS 與 Android',
  basePath: '/courses/flutter/advanced',
  ogImage: new URL('/flutter/advanced/og.png', SITE_URL).toString(),
}

export function buildMetadata({ title, description, path = '/' }: MetadataInput): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const pageDescription = description || SITE_DESCRIPTION
  const url = buildAbsoluteUrl(path)

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: 'Neverland Story',
      images: [
        {
          url: buildAbsoluteUrl('/og-cover.png'),
          width: 1200,
          height: 630,
          alt: 'Neverland Story',
        },
      ],
      locale: 'zh_TW',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [buildAbsoluteUrl('/og-cover.png')],
    },
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': url,
      },
    },
  }
}
