import { buildCoursePageMetadata, SWIFT_ADVANCED_CONFIG } from '@/app/metadata'
import { FAQJsonLd, type FAQItem } from '@components/common'

export const metadata = buildCoursePageMetadata('qa', SWIFT_ADVANCED_CONFIG)

const faqItems: FAQItem[] = [
  {
    question: '學完 iOS App 課程後可以持續精進學習嗎？',
    answer:
      '10 週的學習只是起點，養成自學能力才是關鍵。每年新的 iOS SDK 都讓我們甜蜜忙碌，有興趣就持續練功；有問題也歡迎隨時 FB 找彼得潘討論。',
  },
  {
    question: '學完 iOS App 課程後可以找到工作嗎？',
    answer: '台灣有大量 iOS App 職缺，彼得潘認識許多 App 團隊與老闆，未來可以協助推薦。',
  },
  {
    question: '學完 iOS App 課程後可以接案嗎？',
    answer: '透過接案磨練，累積作品集與收入，也能持續提升開發實力。',
  },
  {
    question: '學完 iOS App 課程後可以創業嗎？',
    answer: '上架自己的 App，累積下載與廣告收入；幾個作品就能成為亮眼的履歷與起點。',
  },
  {
    question: '學完後有進階課程優惠嗎？',
    answer:
      '彼得潘開設的進階課程皆可享八折（不含與第三方合作的課程）。學習沒有終點，Apple 每年都有新技術值得精進。',
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FAQJsonLd items={faqItems} />
      {children}
    </>
  )
}
