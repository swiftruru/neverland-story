'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@components/common'
import styles from './Header.module.css'

export function Header() {
  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>{t('home.title')}</span>
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
