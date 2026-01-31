import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { I18nProvider } from '@i18n/I18nProvider'
import { ToastProvider } from '@/contexts/ToastContext'
import {
  BreadcrumbJsonLd,
  CookieConsent,
  GoogleAnalytics,
  KeyboardShortcuts,
  OrganizationJsonLd,
  PwaProvider,
  SkipToContent,
} from '@components/common'
import '@styles/global.css'
import styles from './layout.module.css'
import { buildAbsoluteUrl } from './metadata'
import { LayoutChrome } from '@components/layout/LayoutChrome'

const PageTransition = dynamic(
  () => import('@components/common/PageTransition').then((mod) => mod.PageTransition),
  { ssr: false }
)

const ReadingProgress = dynamic(
  () => import('@components/common/ReadingProgress').then((mod) => mod.ReadingProgress),
  { ssr: false }
)

const PwaInstallPrompt = dynamic(
  () => import('@components/common/PwaInstallPrompt').then((mod) => mod.PwaInstallPrompt),
  { ssr: false }
)

const PullToRefresh = dynamic(
  () => import('@components/common/PullToRefresh').then((mod) => mod.PullToRefresh),
  { ssr: false }
)

const NetworkStatus = dynamic(
  () => import('@components/common/NetworkStatus').then((mod) => mod.NetworkStatus),
  { ssr: false }
)

const OnboardingTour = dynamic(
  () => import('@components/common/OnboardingTour').then((mod) => mod.OnboardingTour),
  { ssr: false }
)

const ToastContainer = dynamic(
  () => import('@components/common/Toast').then((mod) => mod.ToastContainer),
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
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/pwa-512.png',
  },
  appleWebApp: {
    capable: true,
    title: '彼得潘 Neverland',
    statusBarStyle: 'default',
  },
  other: {
    'mobile-web-app-capable': 'yes',
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
        <GoogleAnalytics measurementId="G-QBT96TN0KR" />
        <I18nProvider>
          <ToastProvider>
            <SkipToContent targetId="main-content" />
            <KeyboardShortcuts />
            <CookieConsent />
            <PwaProvider />
            <PwaInstallPrompt />
            <PullToRefresh />
            <NetworkStatus />
            <OnboardingTour />
            <ToastContainer />
            <ReadingProgress />
            <BreadcrumbJsonLd />
            <OrganizationJsonLd
            name="彼得潘的 App Neverland"
            url={buildAbsoluteUrl('/neverland')}
            logo={buildAbsoluteUrl('/icons/pwa-512.png')}
            description="作家、果粉、iOS / Flutter App 開發者與講師。從寫作到教學，從專案到陪跑，陪你把想法變成 App。"
            sameAs={[
              'https://medium.com/@apppeterpan',
              'https://www.facebook.com/iphone.peterpan/',
              'http://www.appcoda.com.tw/',
            ]}
            contactPoint={{
              contactType: 'customer service',
              url: buildAbsoluteUrl('/neverland/contact'),
            }}
          />
          <LayoutChrome>
            <div className={styles.layout}>
              <main id="main-content" className={styles.main} tabIndex={-1}>
                <PageTransition />
                {children}
              </main>
            </div>
          </LayoutChrome>
          </ToastProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
