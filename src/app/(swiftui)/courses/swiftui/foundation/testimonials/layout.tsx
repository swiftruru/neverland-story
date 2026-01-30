import { buildCoursePageMetadata, SWIFTUI_FOUNDATION_CONFIG, SITE_URL } from '@/app/metadata'
import { ReviewJsonLd, type ReviewItem } from '@components/common'

export const metadata = buildCoursePageMetadata('testimonials', SWIFTUI_FOUNDATION_CONFIG)

const courseName = '文組生的 iOS SwiftUI App 程式設計入門'
const courseUrl = new URL('/courses/swiftui/foundation', SITE_URL).toString()

const reviews: ReviewItem[] = [
  {
    author: '文組學員',
    reviewBody:
      '身為完全沒有程式背景的文組生，原本很擔心自己跟不上，但彼得潘的教學方式非常淺顯易懂，讓我從零開始也能做出自己的 App。',
  },
  {
    author: 'SwiftUI 初學者',
    reviewBody:
      'SwiftUI 的課程內容循序漸進，從基礎的 UI 元件到完整的 App 架構，每一步都有清楚的說明和實作練習。',
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
