'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header, Navigation, Footer, FooterSwiftui, BottomNav } from './index'
import { BackToTop, FloatingContact } from '@components/common'
import { SwiftuiNav } from './SwiftuiNav'
import { SwiftNav } from './SwiftNav'
import { FlutterNav } from './FlutterNav'
import styles from './LayoutChrome.module.css'

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isSwiftuiSite = useMemo(() => pathname?.startsWith('/courses/swiftui'), [pathname])
  const isSwiftSite = useMemo(() => pathname?.startsWith('/courses/swift'), [pathname])
  const isFlutterSite = useMemo(() => pathname?.startsWith('/courses/flutter'), [pathname])
  // BottomNav 只在 neverland 路由顯示
  const isNeverlandSite = pathname?.startsWith('/neverland')
  const showBottomNav = isNeverlandSite
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`${styles.layout} ${showBottomNav ? styles.hasBottomNav : ''}`}>
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
      {showBottomNav && <BottomNav />}
    </div>
  )
}
