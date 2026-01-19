import type { Metadata } from 'next'
import { buildMetadata } from '../metadata'

export const metadata: Metadata = buildMetadata({
  title: '經歷',
  description: '從教學、顧問到軟體工程，累積超過十年的 iOS App 開發與培訓經驗。',
  path: '/experience',
})

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children
}
