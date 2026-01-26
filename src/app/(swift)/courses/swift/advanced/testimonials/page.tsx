'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import styles from '../page.module.css'

type Testimonial = {
  title: string
  author: string
  course: string
  courseLink?: string
  link?: string
  photo: string
  paragraphs: string[]
}

export default function TestimonialsPage() {
  const { t } = useTranslation('swift')
  const testimonials = useMemo(
    () => (t('testimonialsPage.items', { returnObjects: true }) as Testimonial[]) || [],
    [t]
  )
  const [activeAvatar, setActiveAvatar] = useState<Testimonial | null>(null)
  const [isClient, setIsClient] = useState(false)

  // 避免語系切換造成的 SSR / CSR 文字不一致
  useEffect(() => {
    setIsClient(true)
  }, [])

  const heroTitle = t('testimonialsPage.title')
  const heroSubtitle = t('testimonialsPage.subtitle')
  const heroCtaLabel = t('testimonialsPage.ctaLabel')
  const heroCtaUrl = t('testimonialsPage.ctaUrl')
  const viewFullLabel = t('testimonialsPage.viewFull')
  const avatarAria = (author: string) => t('testimonialsPage.avatarAria', { author })
  const essays = t('testimonialsPage.essays.items', { returnObjects: true }) as {
    title: string
    url: string
  }[]
  const essaysTitle = t('testimonialsPage.essays.title')
  const essaysCtaLabel = t('testimonialsPage.essays.ctaLabel')
  const essaysCtaUrl = t('testimonialsPage.essays.ctaUrl')
  const essaysItemLabel = t('testimonialsPage.essays.itemCta')

  // 首畫面避免 SSR / CSR 語系差異造成的 hydration 錯誤
  if (!isClient) {
    return null
  }

  return (
    <main className={styles.page} suppressHydrationWarning>
      <section className={styles.testimonialHero}>
        <div className="container">
          <div className={styles.kickerRowWrap}>
            <div className={styles.kickerRow}>
              <p className={`${styles.kicker} ${styles.kickerLeft}`}>{t('hero.kicker')}</p>
            </div>
          </div>
          <div className={styles.heroContent}>
            <div className={styles.sectionHeader}>
              <h1 className={styles.title}>{heroTitle}</h1>
              <p className={styles.subtitle}>{heroSubtitle}</p>
              {heroCtaUrl && heroCtaLabel && (
                <a className={styles.primary} href={heroCtaUrl} target="_blank" rel="noopener noreferrer">
                  {heroCtaLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonialSection}>
        <div className="container">
          <div className={styles.testimonialGrid}>
            {testimonials.map((item, idx) => (
              <article key={`${item.author}-${idx}`} className={styles.testimonialCard}>
                <span className={styles.testimonialTape} style={{ ['--testimonial-idx' as string]: idx }} />
                <div className={styles.testimonialProfile}>
                  <button
                    className={styles.testimonialAvatar}
                    onClick={() => setActiveAvatar(item)}
                    aria-label={avatarAria(item.author)}
                  >
                    <img src={item.photo} alt={item.author} />
                  </button>
                  <div>
                    <p className={styles.testimonialCourse}>
                      {item.courseLink ? (
                        <a href={item.courseLink} target="_blank" rel="noopener noreferrer">
                          {item.course}
                        </a>
                      ) : (
                        item.course
                      )}
                    </p>
                    {item.title && <h3 className={styles.testimonialTitle}>{item.title}</h3>}
                    <p className={styles.testimonialAuthor}>{item.author}</p>
                  </div>
                </div>
                <div className={styles.testimonialBody}>
                  {item.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {item.link && (
                  <a className={styles.testimonialLink} href={item.link} target="_blank" rel="noopener noreferrer">
                    {viewFullLabel}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.essaySection}>
        <div className="container">
          <div className={styles.essayHeader}>
            <div>
              <p className={styles.kicker}>{t('hero.kicker')}</p>
              <h2 className={styles.essayTitle}>{essaysTitle}</h2>
            </div>
            {essaysCtaUrl && (
              <a className={styles.essayCta} href={essaysCtaUrl} target="_blank" rel="noopener noreferrer">
                {essaysCtaLabel}
              </a>
            )}
          </div>
          <div className={styles.essayGrid}>
            {essays.map((essay, idx) => (
              <a
                key={`${essay.title}-${idx}`}
                className={styles.essayCard}
                href={essay.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.essayTape} style={{ ['--essay-idx' as string]: idx }} />
                <h3>{essay.title}</h3>
                <span className={styles.essayLinkLabel}>{essaysItemLabel}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {activeAvatar && (
        <div
          className={`${styles.lightbox} ${styles.avatarLightbox}`}
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveAvatar(null)}
        >
          <button className={styles.lightboxClose}>×</button>
          <div className={styles.lightboxContent}>
            <img className={styles.lightboxImg} src={activeAvatar.photo} alt={activeAvatar.author} />
            <p className={styles.lightboxCaption}>{activeAvatar.author}</p>
          </div>
        </div>
      )}
    </main>
  )
}
