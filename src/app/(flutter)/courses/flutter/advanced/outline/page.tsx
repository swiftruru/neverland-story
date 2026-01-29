'use client'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function FlutterOutlinePage() {
  const { t } = useTranslation('flutter')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const rawItems = t('outlinePage.items', { returnObjects: true })
  const items = Array.isArray(rawItems) ? rawItems : []

  if (!isClient) {
    return null
  }

  return (
    <main className={styles.page}>
      <section className={styles.outlineSection}>
        <div className="container">
          <div className={styles.kickerRow}>
            <p className={`${styles.kicker} ${styles.kickerLeft}`}>{t('hero.kicker')}</p>
          </div>
          <div className={styles.sectionHeader}>
            <h1 className={styles.title}>{t('outlinePage.heading')}</h1>
            <p className={styles.subtitle}>{t('outlinePage.description')}</p>
          </div>
          <div className={styles.outlineGrid}>
            {items.map((item, index) => (
              <article
                key={index}
                className={styles.outlineCardSimple}
                style={{ '--outline-index': index } as React.CSSProperties}
              >
                <span className={styles.outlineTapeSimple} />
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
