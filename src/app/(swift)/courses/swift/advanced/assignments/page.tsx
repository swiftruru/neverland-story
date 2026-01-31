'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function SwiftAssignmentsPage() {
  const { t } = useTranslation('swift')

  return (
    <main className={styles.page}>
      <section className={styles.assignmentsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h1 className={styles.title}>{t('assignmentsPage.heading')}</h1>
            <p className={styles.subtitle}>{t('assignmentsPage.subtitle')}</p>
            <Link href={t('assignmentsPage.ctaLink')} target="_blank" className={styles.primary}>
              {t('assignmentsPage.ctaLabel')}
            </Link>
          </div>
          <article className={styles.assignmentsCard}>
            <div className={styles.assignmentsTape} />
            <div className={styles.assignmentsImageWrap}>
              <Image
                src="/swift/advanced/assignments/hero.webp"
                alt={t('assignmentsPage.imageAlt')}
                width={1280}
                height={900}
                className={styles.assignmentsImage}
                priority
              />
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
