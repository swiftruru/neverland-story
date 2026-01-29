'use client'

import Link from 'next/link'
import { FadeInOnScroll, PaperCard } from '@components/common'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import styles from '../page.module.css'

export default function FlutterMorePage() {
  const { t } = useTranslation('flutter')
  const items = t('morePage.items', { returnObjects: true }) as {
    id: string
    title: string
    description: string
    href: string
    image: string
  }[]
  const thanks = t('morePage.thanks.items', { returnObjects: true }) as {
    id: string
    name: string
    href?: string
    image: string
  }[]
  const thanksTitle = t('morePage.thanks.title')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <main className={styles.page}>
      <section className={styles.outlineSection}>
        <div className="container">
          <div className={styles.kickerRow}>
            <p className={`${styles.kicker} ${styles.kickerLeft}`}>{t('hero.kicker')}</p>
          </div>
          <div className={styles.sectionHeader}>
            <h1 className={styles.title}>{t('sections.more.title')}</h1>
            <p className={styles.subtitle}>{t('sections.more.desc')}</p>
          </div>
          <div className={styles.moreGrid}>
            {items.map((item, index) => (
              <FadeInOnScroll key={item.id} direction="up" delay={index * 80}>
                <PaperCard
                  tapeColor={index % 2 === 0 ? 'yellow' : 'green'}
                  tapePosition="top-left"
                  tapeRotation={-2}
                  hover
                >
                  <div className={styles.moreCard}>
                    <div className={styles.moreImage} onClick={() => setLightboxIndex(index)}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.moreBody}>
                      <h3>
                        <Link href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </Link>
                      </h3>
                      <p>{item.description}</p>
                      <div className={styles.moreActions}>
                        <Link
                          className={styles.moreLink}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{t('cta.learnMore')}</span>
                          <svg className={styles.moreArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </PaperCard>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className={`${styles.lightbox} ${styles.moreLightbox}`} role="dialog" aria-modal="true" onClick={() => setLightboxIndex(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightboxIndex(null)} aria-label="Close">
            ×
          </button>
          <div className={styles.lightboxContent}>
            <img src={items[lightboxIndex].image} alt={items[lightboxIndex].title} className={styles.lightboxImg} />
            <p className={styles.lightboxCaption}>{items[lightboxIndex].title}</p>
          </div>
        </div>
      )}

      <section className={styles.thanksSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>{thanksTitle}</h2>
          </div>
          <div className={styles.thanksGrid}>
            {thanks.map((item, idx) => (
              <FadeInOnScroll key={item.id} direction="up" delay={idx * 60}>
                <PaperCard
                  tapeColor={idx % 2 === 0 ? 'yellow' : 'green'}
                  tapePosition="top-left"
                  tapeRotation={-2}
                  hover
                >
                  <div className={styles.thanksCard}>
                    <div className={styles.thanksLogo}>
                      {item.href ? (
                        <Link href={item.href} target="_blank" rel="noopener noreferrer">
                          <img src={item.image} alt={item.name} />
                        </Link>
                      ) : (
                        <img src={item.image} alt={item.name} />
                      )}
                    </div>
                    <p className={styles.thanksName}>
                      {item.href ? (
                        <Link href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.name}
                        </Link>
                      ) : (
                        item.name
                      )}
                    </p>
                  </div>
                </PaperCard>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
