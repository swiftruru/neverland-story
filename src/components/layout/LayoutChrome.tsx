'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header, Navigation, Footer, FooterSwiftui } from './index'
import { BackToTop, FloatingContact } from '@components/common'
import { SwiftuiNav } from './SwiftuiNav'
import { SwiftNav } from './SwiftNav'
import styles from './LayoutChrome.module.css'

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isSwiftuiSite = useMemo(() => pathname?.startsWith('/courses/swiftui'), [pathname])
  const isSwiftSite = useMemo(() => pathname?.startsWith('/courses/swift'), [pathname])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={styles.layout}>
      {isSwiftuiSite ? (
        <SwiftuiNav />
      ) : isSwiftSite ? (
        <SwiftNav />
      ) : (
        <>
          <Header />
          <Navigation />
        </>
      )}

      <main className={styles.main}>{children}</main>

      {isSwiftuiSite || isSwiftSite ? <FooterSwiftui /> : <Footer />}
      <FloatingContact />
      <BackToTop />
    </div>
  )
}
