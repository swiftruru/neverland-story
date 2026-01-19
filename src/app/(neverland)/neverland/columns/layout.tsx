import type { Metadata } from 'next'
import { buildMetadata } from '@/app/metadata'

export const metadata: Metadata = buildMetadata({
  title: '雜誌專欄',
  description: 'MacToday App 開發專欄，2011.02 ~ 2014.10',
  path: '/columns',
})

export default function ColumnsLayout({ children }: { children: React.ReactNode }) {
  return children
}
