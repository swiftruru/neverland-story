'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import styles from './not-found.module.css'

export default function NotFound() {
  const { t } = useTranslation('common')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.paper}>
          <span className={styles.tape} />
          <div className={styles.paperContent}>
            <h1 className={styles.errorCode}>{t('notFound.code')}</h1>
            <div className={styles.divider} />
            <h2 className={styles.title}>{t('notFound.title')}</h2>
            <p className={styles.description}>
              {t('notFound.description')}
              <br />
              {t('notFound.descriptionSub')}
            </p>
            <div className={styles.actions}>
              <Link href="/" className={styles.primaryButton}>
                {t('notFound.backHome')}
              </Link>
              <Link href="/neverland" className={styles.secondaryButton}>
                {t('notFound.exploreNeverland')}
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.decoration}>
          <svg className={styles.leaf} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
        </div>
      </div>
    </main>
  )
}
