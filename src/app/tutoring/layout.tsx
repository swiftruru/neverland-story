import type { Metadata } from 'next'
import { buildMetadata } from '../metadata'

export const metadata: Metadata = buildMetadata({
  title: '家教',
  description: '一對一教學服務',
  path: '/tutoring',
})

export default function TutoringLayout({ children }: { children: React.ReactNode }) {
  return children
}
