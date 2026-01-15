'use client'

import { useTranslation } from 'react-i18next'
import { PaperCard } from '@components/common'
import styles from './PageTemplate.module.css'

interface PageTemplateProps {
  pageKey: string
}

export function PageTemplate({ pageKey }: PageTemplateProps) {
  const { t } = useTranslation()

  return (
    <div className={`container ${styles.page}`}>
      <PaperCard
        tapeColor="yellow"
        tapePosition="top-left"
        tapeRotation={-5}
        variant="lined"
        hover={false}
      >
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{t(`pages.${pageKey}.title`)}</h1>
          <p className={styles.pageDescription}>{t(`pages.${pageKey}.description`)}</p>
        </header>
        <section className={styles.content}>
          <p className={styles.placeholder}>{t('pages.comingSoon')}</p>
        </section>
      </PaperCard>
    </div>
  )
}
