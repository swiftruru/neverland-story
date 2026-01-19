import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: '金牌擺渡人',
  description: '幫助你解決 iOS App 開發問題，度過難關',
  path: '/ferryman',
})

export default function FerrymanLayout({ children }: { children: React.ReactNode }) {
  return children
}
