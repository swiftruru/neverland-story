import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { I18nProvider } from '@i18n/I18nProvider'
import { Header, Navigation, Footer } from '@components/layout'
import '@styles/global.css'
import styles from './layout.module.css'

const PageTransition = dynamic(
  () => import('@components/common/PageTransition').then((mod) => mod.PageTransition),
  { ssr: false }
)

export const metadata: Metadata = {
  title: '彼得潘的 iOS App 程式設計入門',
  description: '彼得潘的 iOS App 程式設計入門 - Neverland Story',
  icons: {
    icon: '/favicon.png',
  },
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
          <div className={styles.layout}>
            <Header />
            <Navigation />
            <main className={styles.main}>
              <PageTransition />
              {children}
            </main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  )
}
