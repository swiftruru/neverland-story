import type { Metadata } from 'next'
import { I18nProvider } from '@i18n/I18nProvider'
import { Header, Navigation, Footer } from '@components/layout'
import '@styles/global.css'
import styles from './layout.module.css'

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
            <main className={styles.main}>{children}</main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  )
}
