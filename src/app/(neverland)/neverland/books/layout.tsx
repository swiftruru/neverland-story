import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: '著作',
  description: 'iOS 開發相關書籍',
  path: '/books',
})

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return children
}
