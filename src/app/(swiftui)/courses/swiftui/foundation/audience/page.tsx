'use client'

import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function SwiftuiAudiencePage() {
  const { t } = useTranslation('swiftui')
  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>{t('sections.audience.title')}</h1>
        <p className={styles.subtitle}>{t('sections.audience.desc')}</p>
        <p className={styles.placeholder}>{t('placeholder')}</p>
      </div>
    </main>
  )
}
