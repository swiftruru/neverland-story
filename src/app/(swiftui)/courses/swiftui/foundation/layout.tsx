import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: '文組生的 iOS SwiftUI App 程式設計入門',
  description: '專為文組與零基礎轉職者設計的 SwiftUI 入門路徑：簡介、目標、課程資訊、特色、作業、對象、講師、Q&A、大綱、學費、報名、學生心得與聯絡。',
  path: '/courses/swiftui/foundation',
})

export default function FoundationLayout({ children }: { children: React.ReactNode }) {
  return children
}
