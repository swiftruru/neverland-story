'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function FlutterSignupPage() {
  const { t } = useTranslation('flutter')
  const formUrl = t('signupPage.formUrl')
  const psUrl = t('signupPage.psUrl')
  const steps = t('signupPage.steps', { returnObjects: true }) as string[]
  const photos = t('signupPage.photos.items', { returnObjects: true }) as {
    src: string
    alt: string
    caption?: string
  }[]
  const photosCtaLabel = t('signupPage.photos.ctaLabel')
  const photosCtaUrl = t('signupPage.photos.ctaUrl')
  const [activePhoto, setActivePhoto] = useState<number | null>(null)

  const closePhoto = () => setActivePhoto(null)
  const showPrev = () => {
    if (activePhoto === null) return
    setActivePhoto((activePhoto + photos.length - 1) % photos.length)
  }
  const showNext = () => {
    if (activePhoto === null) return
    setActivePhoto((activePhoto + 1) % photos.length)
  }

  useEffect(() => {
    if (activePhoto === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePhoto()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activePhoto, photos.length])

  return (
    <main className={styles.page}>
      <section className={styles.signupSection}>
        <div className="container">
          <div className={styles.signupLayout}>
            <div className={styles.signupHero}>
              <p className={styles.kicker}>{t('hero.kicker')}</p>
              <h1 className={styles.title}>{t('signupPage.title')}</h1>
              <p className={styles.subtitle}>{t('signupPage.description')}</p>
              <p className={styles.signupHint}>{t('signupPage.hint')}</p>
              <ul className={styles.signupSteps}>
                {steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            <div className={styles.signupCard}>
              <span className={styles.signupTape} />
              <div className={styles.signupIcon}>
                <img src="/flutter/advanced/signup/forms-logo.svg" alt="Google Form" />
              </div>
              <div className={styles.signupBody}>
                <h3>{t('signupPage.formHeading')}</h3>
                <p className={styles.signupDesc}>{t('signupPage.formCopy')}</p>
                <a href={formUrl} target="_blank" rel="noopener noreferrer" className={styles.formLink}>
                  {t('signupPage.cta')}
                </a>
              </div>
            </div>
          </div>

          <div className={styles.signupPs}>
            <h4>PS</h4>
            <p>
              {t('signupPage.psText')}{' '}
              <a href={psUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                {t('signupPage.psLinkLabel')}
              </a>
              。
            </p>
          </div>
        </div>
      </section>

      <section className={styles.photoSection}>
        <div className="container">
          <div className={styles.photoHeader}>
            <h2 className={styles.title}>{t('signupPage.photos.title')}</h2>
            <a href={photosCtaUrl} target="_blank" rel="noopener noreferrer" className={styles.blogLink}>
              {photosCtaLabel}
            </a>
          </div>

          <div className={styles.photoGrid}>
            {photos.map((item, idx) => (
              <figure
                key={item.src}
                className={styles.photoCard}
                style={{ ['--photo-idx' as string]: idx }}
                onClick={() => setActivePhoto(idx)}
              >
                <span className={styles.photoTape} />
                <div className={styles.photoImage}>
                  <img src={item.src} alt={item.alt} />
                </div>
                {item.caption && <figcaption className={styles.photoCaption}>{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {activePhoto !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={closePhoto}>
          <button
            className={styles.lightboxClose}
            onClick={(e) => {
              e.stopPropagation()
              closePhoto()
            }}
            aria-label="Close"
          >
            ×
          </button>
          <button
            className={styles.lightboxNav}
            onClick={(e) => {
              e.stopPropagation()
              showPrev()
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <div className={styles.lightboxContent}>
            <img
              className={styles.lightboxImg}
              src={photos[activePhoto].src}
              alt={photos[activePhoto].alt}
            />
            {photos[activePhoto].caption && (
              <p className={styles.lightboxCaption}>{photos[activePhoto].caption}</p>
            )}
          </div>
          <button
            className={styles.lightboxNav}
            onClick={(e) => {
              e.stopPropagation()
              showNext()
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </main>
  )
}
