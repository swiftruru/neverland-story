import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'APP 作品',
  description: '學員與個人作品展示',
  path: '/apps',
})

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return children
}
