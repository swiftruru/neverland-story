'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

type AssignmentItem = { title: string; alt: string; src: string }

export default function SwiftuiAssignmentsPage() {
  const { t } = useTranslation('swiftui')
  const items = t('introPage.assignmentsPage.items', { returnObjects: true }) as AssignmentItem[]
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)
  const goto = (delta: number) => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev
      const next = (prev + delta + items.length) % items.length
      return next
    })
  }

  return (
    <main className={styles.page}>
      <section className={styles.assignmentsSection}>
        <div className="container">
          <p className={styles.kicker}>{t('hero.kicker')}</p>
          <div className={styles.sectionHeader}>
            <h1 className={styles.title}>{t('introPage.assignmentsPage.heading')}</h1>
            <p className={styles.subtitle}>{t('sections.assignments.desc')}</p>
          </div>
          <div className={styles.assignmentHeader}>
            <a className={styles.blogLink} href={t('introPage.assignmentsPage.blogUrl')} target="_blank" rel="noreferrer">
              {t('introPage.assignmentsPage.blogLabel')}
            </a>
          </div>
          <div className={styles.assignmentGrid}>
            {items.map((item, idx) => (
              <article key={item.src} className={styles.assignmentCard}>
                <div className={styles.assignmentImage} onClick={() => openLightbox(idx)}>
                  <Image src={item.src} alt={item.alt} width={320} height={640} />
                  <div className={styles.imageOverlay}>
                    <span>{t('introPage.assignmentsPage.heading')}</span>
                  </div>
                </div>
                <div className={styles.assignmentBody}>
                  <button className={styles.viewButton} onClick={() => openLightbox(idx)}>
                    {t('cta.start')}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
            ×
          </button>
          <button className={styles.lightboxNav} onClick={(e) => (e.stopPropagation(), goto(-1))} aria-label="Previous">
            ‹
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[lightboxIndex].src}
              alt={items[lightboxIndex].alt}
              width={360}
              height={720}
              className={styles.lightboxImg}
            />
          </div>
          <button className={styles.lightboxNav} onClick={(e) => (e.stopPropagation(), goto(1))} aria-label="Next">
            ›
          </button>
        </div>
      )}
    </main>
  )
}
