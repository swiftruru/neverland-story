'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { haptic } from '@/utils/haptic'
import styles from './BottomNav.module.css'

// SVG Icons as components
const IntroIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

const InstructorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const OutlineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
)

const TuitionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

const SignupIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
)

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const BASE_PATH = '/courses/swift/advanced'

const NAV_ITEMS = [
  { href: `${BASE_PATH}/intro`, icon: IntroIcon, labelKey: 'intro' },
  { href: `${BASE_PATH}/instructor`, icon: InstructorIcon, labelKey: 'instructor' },
  { href: `${BASE_PATH}/outline`, icon: OutlineIcon, labelKey: 'outline' },
  { href: `${BASE_PATH}/tuition`, icon: TuitionIcon, labelKey: 'tuition' },
  { href: `${BASE_PATH}/signup`, icon: SignupIcon, labelKey: 'signup' },
]

export function SwiftBottomNav() {
  const pathname = usePathname()
  const { t, ready } = useTranslation('swift')

  const isActive = (href: string) => {
    const normalizedPathname = pathname?.endsWith('/') ? pathname.slice(0, -1) : pathname
    const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href
    return normalizedPathname === normalizedHref
  }

  if (!ready) return null

  const toggleMenu = () => {
    haptic('light')
    window.dispatchEvent(new CustomEvent('toggleMobileMenu'))
  }

  return (
    <nav
      className={styles.bottomNav}
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
            onClick={() => haptic('light')}
          >
            <span className={styles.iconWrapper}>
              <Icon />
            </span>
            <span className={styles.label}>{t(`bottomNav.${labelKey}`)}</span>
          </Link>
        )
      })}
      <button
        type="button"
        className={styles.navItem}
        onClick={toggleMenu}
        aria-label={t('bottomNav.more')}
      >
        <span className={styles.iconWrapper}>
          <MoreIcon />
        </span>
        <span className={styles.label}>{t('bottomNav.more')}</span>
      </button>
    </nav>
  )
}
