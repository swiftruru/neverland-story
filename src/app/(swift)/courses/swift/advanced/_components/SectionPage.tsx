'use client'

import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

const sectionsMap = {
  intro: true,
  goals: true,
  info: true,
  features: true,
  qa: true,
  audience: true,
  instructor: true,
  assignments: true,
  outline: true,
  tuition: true,
  signup: true,
  testimonials: true,
  contact: true,
}

export function SectionPage({ sectionKey }: { sectionKey: keyof typeof sectionsMap }) {
  const { t } = useTranslation('swift')
  return (
    <main className={styles.page}>
      <section className={styles.testimonialHero}>
        <div className="container">
          <div className={styles.kickerRow}>
            <p className={`${styles.kicker} ${styles.kickerLeft}`}>{t('hero.kicker')}</p>
          </div>
          <div className={styles.heroContent}>
            <div className={styles.sectionHeader}>
              <h1 className={styles.title}>{t(`sections.${sectionKey}.title`)}</h1>
              <p className={styles.subtitle}>{t(`sections.${sectionKey}.desc`)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className="container">
          <article className={styles.sectionCard}>
            <p className={styles.placeholder}>{t('placeholders.comingSoon')}</p>
          </article>
        </div>
      </section>
    </main>
  )
}
