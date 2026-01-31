'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@components/common'
import styles from './SwiftuiNav.module.css'

const NAV_ITEMS = [
  { id: 'intro', key: 'nav.intro', href: '/courses/swift/advanced/intro' },
  { id: 'info', key: 'nav.info', href: '/courses/swift/advanced/info' },
  { id: 'features', key: 'nav.features', href: '/courses/swift/advanced/features' },
  { id: 'qa', key: 'nav.qa', href: '/courses/swift/advanced/qa' },
  { id: 'audience', key: 'nav.audience', href: '/courses/swift/advanced/audience' },
  { id: 'instructor', key: 'nav.instructor', href: '/courses/swift/advanced/instructor' },
  { id: 'assignments', key: 'nav.assignments', href: '/courses/swift/advanced/assignments' },
  { id: 'outline', key: 'nav.outline', href: '/courses/swift/advanced/outline' },
  { id: 'tuition', key: 'nav.tuition', href: '/courses/swift/advanced/tuition' },
  { id: 'signup', key: 'nav.signup', href: '/courses/swift/advanced/signup' },
  { id: 'testimonials', key: 'nav.testimonials', href: '/courses/swift/advanced/testimonials' },
  { id: 'more', key: 'nav.more', href: '/courses/swift/advanced/more' },
  { id: 'contact', key: 'nav.contact', href: '/courses/swift/advanced/contact' },
]

export function SwiftNav() {
  const pathname = usePathname()
  const { t } = useTranslation('swift')
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    setMounted(true)
  }, [])

  // 監聽 BottomNav 的「更多」按鈕事件
  useEffect(() => {
    const handleToggleMenu = () => setMenuOpen((prev) => !prev)
    window.addEventListener('toggleMobileMenu', handleToggleMenu)
    return () => window.removeEventListener('toggleMobileMenu', handleToggleMenu)
  }, [])

  return (
    <header className={styles.wrapper}>
      <div className={styles.brandBar}>
        <Link className={styles.brand} href="/courses/swift/advanced">
          <img src="/swift/advanced/logo.webp" alt="Swift Advanced logo" className={styles.logo} />
          <span suppressHydrationWarning>{mounted ? t('hero.title') : ''}</span>
        </Link>
        <div className={styles.actions}>
          <div className={styles.langSwitch}>
            <LanguageSwitcher />
          </div>
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </div>
      <div className={`${styles.navWrapper} ${menuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
        <nav className={styles.nav}>
          <button
            type="button"
            className={styles.navClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`${styles.link} ${active ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span suppressHydrationWarning>{mounted ? t(item.key) : ''}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
