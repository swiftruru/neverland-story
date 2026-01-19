'use client'

import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function SwiftuiIntroPage() {
  const { t } = useTranslation('swiftui')
  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>{t('sections.intro.title')}</h1>
        <p className={styles.subtitle}>{t('sections.intro.desc')}</p>
        <p className={styles.placeholder}>{t('placeholder')}</p>
      </div>
    </main>
  )
}
