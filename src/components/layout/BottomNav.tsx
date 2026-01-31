'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { haptic } from '@/utils/haptic'
import styles from './BottomNav.module.css'

// SVG Icons as components
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

// 家教 icon (人物+學習)
const TutoringIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

// 講座課程 icon
const CoursesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="14" y2="10" />
  </svg>
)

// 散文集 icon (筆/寫作)
const EssaysIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
)

// 經歷 icon (公事包/履歷)
const ExperienceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

// 更多 icon (三條橫線/漢堡)
const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const NAV_ITEMS = [
  { href: '/', icon: HomeIcon, labelKey: 'home' },
  { href: '/neverland/tutoring', icon: TutoringIcon, labelKey: 'tutoring' },
  { href: '/neverland/courses', icon: CoursesIcon, labelKey: 'courses' },
  { href: '/neverland/essays', icon: EssaysIcon, labelKey: 'essays' },
  { href: '/neverland/experience', icon: ExperienceIcon, labelKey: 'experience' },
]

export function BottomNav() {
  const pathname = usePathname()
  const { t, ready } = useTranslation('common')

  // 判斷是否為當前頁面
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  // 等待 i18n 準備好
  if (!ready) return null

  // 切換漢堡選單
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
      {/* 更多按鈕 - 切換漢堡選單 */}
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
