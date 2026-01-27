'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@components/common'
import styles from './FlutterNav.module.css'

const NAV_ITEMS = [
  { id: 'intro', key: 'nav.intro', href: '/courses/flutter/advanced/intro' },
  { id: 'goals', key: 'nav.goals', href: '/courses/flutter/advanced/goals' },
  { id: 'info', key: 'nav.info', href: '/courses/flutter/advanced/info' },
  { id: 'features', key: 'nav.features', href: '/courses/flutter/advanced/features' },
  { id: 'assignments', key: 'nav.assignments', href: '/courses/flutter/advanced/assignments' },
  { id: 'audience', key: 'nav.audience', href: '/courses/flutter/advanced/audience' },
  { id: 'instructor', key: 'nav.instructor', href: '/courses/flutter/advanced/instructor' },
  { id: 'outline', key: 'nav.outline', href: '/courses/flutter/advanced/outline' },
  { id: 'tuition', key: 'nav.tuition', href: '/courses/flutter/advanced/tuition' },
  { id: 'signup', key: 'nav.signup', href: '/courses/flutter/advanced/signup' },
  { id: 'testimonials', key: 'nav.testimonials', href: '/courses/flutter/advanced/testimonials' },
  { id: 'more', key: 'nav.more', href: '/courses/flutter/advanced/more' },
  { id: 'contact', key: 'nav.contact', href: '/courses/flutter/advanced/contact' },
]

export function FlutterNav() {
  const pathname = usePathname()
  const { t } = useTranslation('flutter')
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className={styles.wrapper}>
      <div className={styles.brandBar}>
        <Link className={styles.brand} href="/courses/flutter/advanced">
          <img src="/flutter/advanced/logo.png" alt="Flutter Advanced logo" className={styles.logo} />
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
