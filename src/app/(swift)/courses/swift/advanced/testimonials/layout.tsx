import { buildCoursePageMetadata, SWIFT_ADVANCED_CONFIG, SITE_URL } from '@/app/metadata'
import { ReviewJsonLd, type ReviewItem } from '@components/common'

export const metadata = buildCoursePageMetadata('testimonials', SWIFT_ADVANCED_CONFIG)

const courseName = '彼得潘的 Swift iOS App 程式設計入門'
const courseUrl = new URL('/courses/swift/advanced', SITE_URL).toString()

const reviews: ReviewItem[] = [
  {
    author: '0+',
    reviewBody:
      '彼得潘的課程由淺入深，前幾堂課先是提升我們的成就感，教我們如何不寫程式就做出電子書的 APP。他在課堂上總是會穿插一些冷笑話和好聽的歌曲，讓我們盡可能輕鬆的學習程式。',
  },
  {
    author: 'Kiki',
    reviewBody:
      'Peter 真的做到了一輩子的朋友，他跟大家的關係除了是師生關係，其實也是朋友，因為他完全沒有距離感，而且不管何時 LINE 他，他都會很快回覆。',
  },
  {
    author: 'Sky',
    reviewBody:
      '15 堂課我不僅學會了如何做 app，意外的收穫還認識了一群同班同學，我們會在 line 群組一起討論，有問題也會有大大同學幫你解答。',
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
