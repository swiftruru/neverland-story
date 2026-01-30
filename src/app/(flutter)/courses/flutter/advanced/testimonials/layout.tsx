import { buildCoursePageMetadata, FLUTTER_ADVANCED_CONFIG, SITE_URL } from '@/app/metadata'
import { ReviewJsonLd, type ReviewItem } from '@components/common'

export const metadata = buildCoursePageMetadata('testimonials', FLUTTER_ADVANCED_CONFIG)

const courseName = '彼得潘的 Flutter 跨平台 App 程式設計入門'
const courseUrl = new URL('/courses/flutter/advanced', SITE_URL).toString()

const reviews: ReviewItem[] = [
  {
    author: 'Flutter 學員',
    reviewBody:
      '學習 Flutter 讓我能同時開發 iOS 和 Android App，彼得潘的課程內容紮實，從 Dart 語法到完整 App 開發都有涵蓋。',
  },
  {
    author: '跨平台開發者',
    reviewBody:
      '原本只會 iOS 開發，透過這門課學會了 Flutter，現在能用一套程式碼做出跨平台的 App，大幅提升開發效率。',
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReviewJsonLd itemName={courseName} itemType="Course" itemUrl={courseUrl} reviews={reviews} />
      {children}
    </>
  )
}
