'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function FlutterIntroPage() {
  const { t } = useTranslation('flutter')
  const heroLines = t('introPage.heroLines', { returnObjects: true }) as string[]
  const learnItems = t('introPage.learnItems', { returnObjects: true }) as string[]

  return (
    <main className={styles.page}>
      <section
        className={styles.introHero}
        style={{ backgroundImage: 'url(/flutter/advanced/intro-bg.jpg)' }}
      >
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <p className={styles.kicker}>{t('hero.kicker')}</p>
            <h1 className={styles.title}>{t('introPage.heroTitle')}</h1>
            <ul className={styles.heroList}>
              {heroLines.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
            <div className={styles.heroActions}>
              <Link href="/courses/flutter/advanced/signup" className={styles.primary}>
                {t('introPage.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.learnSection}>
        <div className="container">
          <div className={styles.learnCard}>
            <p className={styles.kicker}>{t('hero.kicker')}</p>
            <h2 className={styles.learnTitle}>{t('introPage.learnTitle')}</h2>
            <ul className={styles.learnList}>
              {learnItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
