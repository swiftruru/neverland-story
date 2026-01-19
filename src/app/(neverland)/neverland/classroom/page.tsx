'use client'

import { useTranslation } from 'react-i18next'
import { PaperCard } from '@components/common'
import styles from './page.module.css'

export default function ClassroomPage() {
  const { t } = useTranslation()

  return (
    <div className={styles.classroomPage}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>{t('pages.classroom.mainTitle')}</h1>
          <p className={styles.subtitle}>{t('pages.classroom.subtitle')}</p>
        </header>

        <section className={styles.ctaSection}>
          <PaperCard tapeColor="green" tapePosition="top-left" tapeRotation={-3} hover={false}>
            <div className={styles.ctaContent}>
              <a
                href="https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                {t('pages.classroom.visitMedium')}
              </a>
            </div>
          </PaperCard>
        </section>
      </div>
    </div>
  )
}
