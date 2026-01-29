import { buildCoursePageMetadata, SWIFT_ADVANCED_CONFIG } from '@/app/metadata'

export const metadata = buildCoursePageMetadata('outline', SWIFT_ADVANCED_CONFIG)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
