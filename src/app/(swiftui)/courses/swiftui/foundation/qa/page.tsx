'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function SwiftuiQaPage() {
  const { t } = useTranslation('swiftui')
  const heading = t('introPage.qaPage.heading')
  const desc = t('introPage.qaPage.description')
  const cta = t('introPage.qaPage.cta')
  const url = t('introPage.qaPage.url')
  const afterTitle = t('introPage.qaPage.afterLearn.title')
  const afterItemsRaw = t('introPage.qaPage.afterLearn.items', { returnObjects: true })
  const afterItems = Array.isArray(afterItemsRaw) ? (afterItemsRaw as { title: string; body: string }[]) : []

  return (
    <main className={styles.page}>
      <section
        className={styles.qaHero}
        style={{ backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0.18)), url('/swiftui/foundation/qa/hero.webp')" }}
      >
        <div className="container">
          <div className={styles.qaHeroContent}>
            <p className={styles.kicker}>{t('hero.kicker')}</p>
            <h1 className={styles.qaTitle}>{heading}</h1>
            <p className={styles.qaSubtitle}>{desc}</p>
            <div className={styles.heroActions}>
              <Link href={url} target="_blank" className={styles.primary}>
                {cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.afterLearnSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.afterLearnTitle}>{afterTitle}</h2>
          </div>
          <div className={styles.afterLearnGrid}>
            {afterItems.map((item, idx) => (
              <div
                key={item.title}
                className={styles.afterLearnCard}
                style={{ ['--after-idx' as string]: idx }}
              >
                <span className={styles.afterLearnTape} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
