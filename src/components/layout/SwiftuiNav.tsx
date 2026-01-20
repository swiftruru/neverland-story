'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@components/common'
import styles from './SwiftuiNav.module.css'

const NAV_ITEMS = [
  { id: 'intro', key: 'nav.intro', href: '/courses/swiftui/foundation/intro' },
  { id: 'goals', key: 'nav.goals', href: '/courses/swiftui/foundation/goals' },
  { id: 'info', key: 'nav.info', href: '/courses/swiftui/foundation/info' },
  { id: 'features', key: 'nav.features', href: '/courses/swiftui/foundation/features' },
  { id: 'assignments', key: 'nav.assignments', href: '/courses/swiftui/foundation/assignments' },
  { id: 'audience', key: 'nav.audience', href: '/courses/swiftui/foundation/audience' },
  { id: 'instructor', key: 'nav.instructor', href: '/courses/swiftui/foundation/instructor' },
  { id: 'qa', key: 'nav.qa', href: '/courses/swiftui/foundation/qa' },
  { id: 'outline', key: 'nav.outline', href: '/courses/swiftui/foundation/outline' },
  { id: 'tuition', key: 'nav.tuition', href: '/courses/swiftui/foundation/tuition' },
  { id: 'signup', key: 'nav.signup', href: '/courses/swiftui/foundation/signup' },
  { id: 'testimonials', key: 'nav.testimonials', href: '/courses/swiftui/foundation/testimonials' },
  { id: 'contact', key: 'nav.contact', href: '/courses/swiftui/foundation/contact' },
]

export function SwiftuiNav() {
  const pathname = usePathname()
  const { t } = useTranslation('swiftui')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className={styles.wrapper}>
      <div className={styles.brandBar}>
        <Link className={styles.brand} href="/courses/swiftui/foundation">
          <img src="/swiftui/logo.png" alt="SwiftUI Foundation logo" className={styles.logo} />
          <span>{t('hero.title')}</span>
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
                {t(item.key)}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
