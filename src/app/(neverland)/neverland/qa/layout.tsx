import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'
import { FAQJsonLd, type FAQItem } from '@components/common'

export const metadata: Metadata = buildMetadata({
  title: 'Q & A',
  description: '常見問題解答',
  path: '/qa',
})

const faqItems: FAQItem[] = [
  {
    question: 'iOS App 開發的十個 Q & A',
    answer: '關於 iOS App 開發最常被問到的十個問題，一次為你解答',
  },
  {
    question: '學習開發 Swift iOS App 前的準備',
    answer: '在開始學習之前，你需要準備什麼？從設備到心態的完整指南',
  },
  {
    question: '彼得潘 iOS App 開發教學的八個承諾',
    answer: '彼得潘對每一位學員的承諾，用心教學、真誠分享',
  },
  {
    question: 'Swift iOS App 學習資源和課程整理',
    answer: '精選的 Swift iOS App 學習資源，從入門到進階都有',
  },
  {
    question: '彼得潘的 999 道 SwiftUI / UIKit / Flutter / Jetpack Compose App 謎題',
    answer: '實戰練習題庫，從做中學，挑戰自我',
  },
  {
    question: '彼得潘的真實 iOS App 畫面功能復刻',
    answer: '學習復刻真實 App 的 UI 和功能，提升實戰能力',
  },
]

export default function QaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FAQJsonLd items={faqItems} />
      {children}
    </>
  )
}
