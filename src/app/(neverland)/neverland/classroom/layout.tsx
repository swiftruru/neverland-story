import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: '開發教室',
  description: '實作課程與練習',
  path: '/classroom',
})

export default function ClassroomLayout({ children }: { children: React.ReactNode }) {
  return children
}
