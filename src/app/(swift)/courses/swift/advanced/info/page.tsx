 'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function SwiftInfoPage() {
  const { t } = useTranslation('swift')
  const cards = t('infoPage.cards', { returnObjects: true }) as {
    id: 'time' | 'location' | 'live' | 'size'
    title: string
    lines: string[]
  }[]

  const iconMap = useMemo<Record<string, string>>(
    () => ({
      time: '/swift/advanced/info/info-time.png',
      location: '/swift/advanced/info/info-location.png',
      live: '/swift/advanced/info/info-live.png',
      size: '/swift/advanced/info/info-size.png',
    }),
    []
  )

  return (
    <main className={styles.page}>
      <section className={styles.infoSection}>
        <div className="container">
          <p className={styles.kicker}>{t('hero.kicker')}</p>
          <div className={styles.infoHeader}>
            <h1 className={styles.title}>{t('infoPage.heading')}</h1>
            <p className={styles.subtitle}>{t('infoPage.desc')}</p>
          </div>

          <div className={styles.infoGrid}>
            {cards.map((card) => (
              <article key={card.id} className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <Image src={iconMap[card.id]} alt={card.title} width={120} height={120} />
                </div>
                <h3 className={styles.infoTitle}>{card.title}</h3>
                <ul className={styles.infoLines}>
                  {card.lines.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
