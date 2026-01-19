import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: '相冊',
  description: '活動與課程照片',
  path: '/gallery',
})

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
