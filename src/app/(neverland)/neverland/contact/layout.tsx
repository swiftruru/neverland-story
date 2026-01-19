import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: '聯絡',
  description: '與彼得潘聯繫',
  path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
