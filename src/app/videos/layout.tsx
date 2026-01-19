import type { Metadata } from 'next'
import { buildMetadata } from '../metadata'

export const metadata: Metadata = buildMetadata({
  title: '影片',
  description: 'iOS 開發教學影片',
  path: '/videos',
})

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return children
}
