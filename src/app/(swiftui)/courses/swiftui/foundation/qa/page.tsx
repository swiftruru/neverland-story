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

  return (
    <main className={styles.page}>
      <section
        className={styles.qaHero}
        style={{ backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0.18)), url('/swiftui/foundation/qa/hero.jpg')" }}
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
    </main>
  )
}
