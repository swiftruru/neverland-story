'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { Header, Navigation, Footer } from './index'
import { BackToTop, FloatingContact } from '@components/common'
import { SwiftuiNav } from './SwiftuiNav'
import styles from './LayoutChrome.module.css'

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isSwiftuiSite = useMemo(() => pathname?.startsWith('/courses/swiftui'), [pathname])

  return (
    <div className={styles.layout}>
      {isSwiftuiSite ? (
        <SwiftuiNav />
      ) : (
        <>
          <Header />
          <Navigation />
        </>
      )}

      <main className={styles.main}>{children}</main>

      {!isSwiftuiSite && <Footer />}
      <FloatingContact />
      <BackToTop />
    </div>
  )
}
