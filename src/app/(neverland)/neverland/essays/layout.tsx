import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: '散文集',
  description: '從開發、職涯到生活思考，整理彼得潘寫過的 iOS App 相關散文與專訪。',
  path: '/essays',
})

export default function EssaysLayout({ children }: { children: React.ReactNode }) {
  return children
}
