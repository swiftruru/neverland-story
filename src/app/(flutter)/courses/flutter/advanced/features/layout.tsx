import { buildCoursePageMetadata, FLUTTER_ADVANCED_CONFIG } from '@/app/metadata'

export const metadata = buildCoursePageMetadata('features', FLUTTER_ADVANCED_CONFIG)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
