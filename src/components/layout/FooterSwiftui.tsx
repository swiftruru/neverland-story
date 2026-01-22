'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

export function FooterSwiftui() {
  const { t } = useTranslation('swiftui')
  const currentYear = new Date().getFullYear()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <p className={styles.copyright}>{t('footer.copyright', { year: currentYear })}</p>
      </div>
    </footer>
  )
}
