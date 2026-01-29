import { buildCoursePageMetadata, SWIFTUI_FOUNDATION_CONFIG } from '@/app/metadata'

export const metadata = buildCoursePageMetadata('qa', SWIFTUI_FOUNDATION_CONFIG)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
