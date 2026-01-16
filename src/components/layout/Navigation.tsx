'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { NAV_ITEMS } from '@constants/navigation'
import styles from './Navigation.module.css'

export function Navigation() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  // 路由改變時關閉選單
  useEffect(() => {
    closeMenu()
  }, [pathname, closeMenu])

  // 開啟選單時禁止背景滾動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.navContent}`}>
        {/* 漢堡按鈕 - 只在手機版顯示 */}
        <button
          type="button"
          className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMenu}
          aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={isOpen}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>

        {/* 選單內容 */}
        <div className={`${styles.menuWrapper} ${isOpen ? styles.menuOpen : ''}`}>
          {/* 手機版背景遮罩 */}
          <div className={styles.overlay} onClick={closeMenu} />

          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              // 處理 trailing slash 的情況
              const normalizedPathname = pathname.endsWith('/') && pathname !== '/'
                ? pathname.slice(0, -1)
                : pathname
              const isActive = normalizedPathname === item.path
              return (
                <li key={item.id} className={styles.navItem}>
                  <Link
                    href={item.path}
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                    onClick={closeMenu}
                  >
                    {t(`nav.${item.id}`)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
