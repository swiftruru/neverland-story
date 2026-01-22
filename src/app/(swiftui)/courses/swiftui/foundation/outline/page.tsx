'use client'

import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function SwiftuiOutlinePage() {
  const { t } = useTranslation('swiftui')
  const items = t('introPage.outlinePage.items', { returnObjects: true }) as {
    id: string
    title: string
    description: string
    image: string
  }[]

  return (
    <main className={styles.page}>
      <section className={styles.outlineSection}>
        <div className="container">
          <div className={styles.kickerRow}>
            <p className={`${styles.kicker} ${styles.kickerLeft}`}>{t('hero.kicker')}</p>
          </div>
          <div className={styles.sectionHeader}>
            <h1 className={styles.title}>{t('sections.outline.title')}</h1>
            <p className={styles.subtitle}>{t('sections.outline.desc')}</p>
          </div>
          <div className={styles.outlineGrid}>
            {items.map((item, index) => (
              <article key={item.id} className={styles.outlineCard} style={{ '--outline-index': index } as React.CSSProperties}>
                <span className={styles.outlineTape} />
                <div className={styles.outlineImage}>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className={styles.outlineBody}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
