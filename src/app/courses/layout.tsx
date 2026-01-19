import type { Metadata } from 'next'
import { buildMetadata } from '../metadata'

export const metadata: Metadata = buildMetadata({
  title: '講座課程',
  description: '公開講座與研習課程',
  path: '/courses',
})

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children
}
