'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

type Card = { id: 'time' | 'live' | 'size'; title: string; lines: string[] }

export default function SwiftuiInfoPage() {
  const { t } = useTranslation('swiftui')
  const cards = t('introPage.courseInfo.cards', { returnObjects: true }) as Card[]

  const iconMap = useMemo<Record<Card['id'], string>>(
    () => ({
      time: '/swiftui/info-time.png',
      live: '/swiftui/info-live.png',
      size: '/swiftui/info-size.png',
    }),
    []
  )

  return (
    <main className={styles.page}>
      <section className={styles.infoSection}>
        <div className="container">
          <p className={styles.kicker}>{t('hero.kicker')}</p>
          <div className={styles.infoHeader}>
            <h1 className={styles.title}>{t('introPage.courseInfo.heading')}</h1>
            <p className={styles.subtitle}>{t('sections.info.desc')}</p>
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
