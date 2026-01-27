'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

export function FooterSwiftui() {
  const pathname = usePathname()
  const namespace = useMemo(() => {
    if (pathname?.startsWith('/courses/flutter')) return 'flutter'
    if (pathname?.startsWith('/courses/swift/')) return 'swift'
    return 'swiftui'
  }, [pathname])

  const { t } = useTranslation(namespace)
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
