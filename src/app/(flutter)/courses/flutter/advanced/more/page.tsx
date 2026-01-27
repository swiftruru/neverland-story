'use client'

import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function FlutterMorePage() {
  const { t } = useTranslation('flutter')

  return (
    <main className={styles.page}>
      <section className={styles.learnSection}>
        <div className="container">
          <div className={styles.learnCard}>
            <p className={styles.kicker}>{t('hero.kicker')}</p>
            <h1 className={styles.learnTitle}>{t('sections.more.title')}</h1>
            <p className={styles.placeholder}>{t('sections.more.desc')}</p>
            <p className={styles.placeholder} style={{ marginTop: '1rem' }}>{t('placeholder')}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
