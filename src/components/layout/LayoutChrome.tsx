'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header, Navigation, Footer, FooterSwiftui } from './index'
import { BottomNav } from './BottomNav'
import { SwiftBottomNav } from './SwiftBottomNav'
import { SwiftuiBottomNav } from './SwiftuiBottomNav'
import { FlutterBottomNav } from './FlutterBottomNav'
import { BackToTop, FloatingContact, SwipeNavigation } from '@components/common'
import { SwiftuiNav } from './SwiftuiNav'
import { SwiftNav } from './SwiftNav'
import { FlutterNav } from './FlutterNav'
import styles from './LayoutChrome.module.css'

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isSwiftuiSite = useMemo(() => pathname?.startsWith('/courses/swiftui'), [pathname])
  const isSwiftSite = useMemo(() => pathname?.startsWith('/courses/swift'), [pathname])
  const isFlutterSite = useMemo(() => pathname?.startsWith('/courses/flutter'), [pathname])
  // BottomNav 顯示邏輯
  const isNeverlandSite = pathname?.startsWith('/neverland')
  const showNeverlandBottomNav = isNeverlandSite
  const showSwiftBottomNav = isSwiftSite && !isSwiftuiSite
  const showSwiftuiBottomNav = isSwiftuiSite
  const showFlutterBottomNav = isFlutterSite
  const hasBottomNav = showNeverlandBottomNav || showSwiftBottomNav || showSwiftuiBottomNav || showFlutterBottomNav
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`${styles.layout} ${hasBottomNav ? styles.hasBottomNav : ''}`}>
      {isSwiftuiSite ? (
        <SwiftuiNav />
      ) : isFlutterSite ? (
        <FlutterNav />
      ) : isSwiftSite ? (
        <SwiftNav />
      ) : (
        <>
          <Header />
          <Navigation />
        </>
      )}

      <main className={styles.main}>{children}</main>

      {isSwiftuiSite || isSwiftSite || isFlutterSite ? <FooterSwiftui /> : <Footer />}
      <FloatingContact />
      <BackToTop />
      {showNeverlandBottomNav && <BottomNav />}
      {showSwiftBottomNav && (
        <>
          <SwipeNavigation courseType="swift" />
          <SwiftBottomNav />
        </>
      )}
      {showSwiftuiBottomNav && (
        <>
          <SwipeNavigation courseType="swiftui" />
          <SwiftuiBottomNav />
        </>
      )}
      {showFlutterBottomNav && (
        <>
          <SwipeNavigation courseType="flutter" />
          <FlutterBottomNav />
        </>
      )}
    </div>
  )
}
