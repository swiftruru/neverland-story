import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Q & A',
  description: '常見問題解答',
  path: '/qa',
})

export default function QaLayout({ children }: { children: React.ReactNode }) {
  return children
}
