'use client'

import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function SwiftuiSignupPage() {
  const { t } = useTranslation('swiftui')
  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>{t('sections.signup.title')}</h1>
        <p className={styles.subtitle}>{t('sections.signup.desc')}</p>
        <p className={styles.placeholder}>{t('placeholder')}</p>
      </div>
    </main>
  )
}
