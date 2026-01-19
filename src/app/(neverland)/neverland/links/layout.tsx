import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: '相關連結',
  description: '實用資源連結',
  path: '/links',
})

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return children
}
