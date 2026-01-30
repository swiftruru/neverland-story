'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import styles from './BottomNav.module.css'

// SVG Icons as components
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const CoursesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="14" y2="10" />
  </svg>
)

const ContactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

// 作品 icon
const AppsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

const NAV_ITEMS = [
  { href: '/', icon: HomeIcon, labelKey: 'home' },
  { href: '/neverland/apps', icon: AppsIcon, labelKey: 'works' },
  { href: '/neverland/courses', icon: CoursesIcon, labelKey: 'lectures' },
  { href: '/neverland/contact', icon: ContactIcon, labelKey: 'contact' },
]

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useTranslation('common')
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // 滾動時隱藏/顯示
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY
      const scrolledEnough = Math.abs(currentScrollY - lastScrollY) > 10

      if (scrolledEnough) {
        setIsVisible(!scrollingDown || currentScrollY < 50)
        setLastScrollY(currentScrollY)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // 判斷是否為當前頁面
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  return (
    <nav
      className={`${styles.bottomNav} ${isVisible ? styles.visible : styles.hidden}`}
      aria-label={t('bottomNav.ariaLabel')}
    >
      {NAV_ITEMS.map(({ href, icon: Icon, labelKey }) => {
        const active = isActive(href)
        return (
          <Link
            key={href}
            href={href}
            className={`${styles.navItem} ${active ? styles.active : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className={styles.iconWrapper}>
              <Icon />
            </span>
            <span className={styles.label}>{t(`bottomNav.${labelKey}`)}</span>
          </Link>
        )
      })}
    </nav>
  )
}
