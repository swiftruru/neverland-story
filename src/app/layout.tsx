import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { I18nProvider } from '@i18n/I18nProvider'
import { Header, Navigation, Footer } from '@components/layout'
import { BreadcrumbJsonLd, PwaProvider } from '@components/common'
import '@styles/global.css'
import styles from './layout.module.css'
import { SITE_URL, buildMetadata, buildAbsoluteUrl } from './metadata'

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

const baseMetadata = buildMetadata({
  title: undefined,
  description: '彼得潘的 iOS App 程式設計入門 - Neverland Story',
  path: '/',
})

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(buildAbsoluteUrl('/')),
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/pwa-512.png',
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
          <div className={styles.layout}>
            <Header />
            <Navigation />
            <main className={styles.main}>
              <PageTransition />
              {children}
            </main>
            <Footer />
            <FloatingContact />
            <BackToTop />
          </div>
        </I18nProvider>
      </body>
    </html>
  )
}
