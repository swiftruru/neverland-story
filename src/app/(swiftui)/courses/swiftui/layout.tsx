import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'SwiftUI 課程',
  description: 'SwiftUI 課程路徑：文組生入門與進階實作。',
  path: '/courses/swiftui',
})

export default function SwiftuiLayout({ children }: { children: React.ReactNode }) {
  return children
}
