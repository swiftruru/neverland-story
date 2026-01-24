import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { I18nProvider } from '@i18n/I18nProvider'
import { BreadcrumbJsonLd, PwaProvider } from '@components/common'
import '@styles/global.css'
import styles from './layout.module.css'
import { SITE_URL, buildAbsoluteUrl, withBasePath } from './metadata'
import { LayoutChrome } from '@components/layout/LayoutChrome'

const PageTransition = dynamic(
  () => import('@components/common/PageTransition').then((mod) => mod.PageTransition),
  { ssr: false }
)

const FloatingContact = dynamic(
  () => import('@components/common/FloatingContact').then((mod) => mod.FloatingContact),
  { ssr: false }
)

const BackToTop = dynamic(
  () => import('@components/common/BackToTop').then((mod) => mod.BackToTop),
  { ssr: false }
)

const ReadingProgress = dynamic(
  () => import('@components/common/ReadingProgress').then((mod) => mod.ReadingProgress),
  { ssr: false }
)

const ogImage = buildAbsoluteUrl('/og-cover.png')

const baseMetadata: Metadata = {
  title: '愛瘋一切為蘋果的彼得潘小王子｜App 開發・寫作・教學',
  description: '作家、果粉、iOS / Flutter App 開發者與講師。從寫作到教學，從專案到陪跑，陪你把想法變成 App。',
  openGraph: {
    title: '彼得潘 Peter Pan｜App 開發・寫作・教學',
    description: '作家、果粉、iOS / Flutter App 開發者與講師。從寫作到教學，從專案到陪跑，陪你把想法變成 App。',
    url: buildAbsoluteUrl('/'),
    siteName: '愛瘋一切為蘋果的彼得潘小王子',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: '彼得潘 Peter Pan｜App 開發・寫作・教學',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '彼得潘 Peter Pan｜App 開發・寫作・教學',
    description: '作家、果粉、iOS / Flutter App 開發者與講師。從寫作到教學，從專案到陪跑，陪你把想法變成 App。',
    images: [ogImage],
  },
}

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(buildAbsoluteUrl('/')),
  manifest: withBasePath('/manifest.json'),
  icons: {
    icon: withBasePath('/icons/pwa-512.png'),
  },
  appleWebApp: {
    title: '彼得潘 Neverland',
  },
}

export const viewport: Viewport = {
  themeColor: '#006850',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>
        <I18nProvider>
          <PwaProvider />
          <ReadingProgress />
          <BreadcrumbJsonLd />
          <LayoutChrome>
            <div className={styles.layout}>
              <main className={styles.main}>
                <PageTransition />
                {children}
              </main>
            </div>
          </LayoutChrome>
        </I18nProvider>
      </body>
    </html>
  )
}
