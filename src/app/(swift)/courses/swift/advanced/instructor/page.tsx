'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

type LinkItem = { label: string; url: string }
type DetailItem = string

export default function SwiftInstructorPage() {
  const { t } = useTranslation('swift')
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const links = t('introPage.instructorPage.links', { returnObjects: true }) as LinkItem[]
  const details = t('introPage.instructorPage.details', { returnObjects: true }) as DetailItem[]

  const renderRich = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g
    const nodes: (string | JSX.Element)[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
      nodes.push(
        <Link key={match[2] + match.index} href={match[2]} target="_blank" className={styles.inlineLink}>
          {match[1]}
        </Link>
      )
      lastIndex = regex.lastIndex
    }
    if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
    return nodes
  }

  return (
    <main className={styles.page}>
      <section className={styles.instructorHero}>
        <div className="container">
          <div className={styles.instructorLayout}>
            <div className={styles.instructorPortrait}>
              <button
                type="button"
                className={styles.portraitButton}
                onClick={() => setIsZoomOpen(true)}
                aria-label={t('introPage.instructorPage.avatarAlt')}
              >
                <Image
                  src="/swift/advanced/instructor/portrait.png"
                  alt={t('introPage.instructorPage.avatarAlt')}
                  width={280}
                  height={280}
                  className={styles.portraitImg}
                />
              </button>
            </div>
            <div className={styles.instructorBio}>
              <p className={styles.kicker}>{t('hero.kicker')}</p>
              <h1 className={styles.title}>{t('introPage.instructorPage.heading')}</h1>
              <p className={styles.subtitle}>{t('introPage.instructorPage.heroSubtitle')}</p>
              <div className={styles.linkChips}>
                <Link href={t('introPage.instructorPage.bioLink')} target="_blank" rel="noopener noreferrer" className={styles.chip}>
                  {t('introPage.instructorPage.subheading')}
                </Link>
                {links.map((link) => (
                  <Link key={link.url} href={link.url} target="_blank" className={styles.chip}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.instructorSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>{t('introPage.instructorPage.heroTitle')}</h2>
          </div>
          <div className={styles.instructorGrid}>
            {details.map((item, idx) => (
              <article key={idx} className={styles.instructorCard}>
                <div className={styles.instructorTape} />
                <p>{renderRich(item)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {isZoomOpen && (
        <div className={styles.instructorLightbox} onClick={() => setIsZoomOpen(false)} role="presentation">
          <div className={styles.lightboxFrame}>
            <button type="button" className={styles.lightboxClose} aria-label="Close" onClick={() => setIsZoomOpen(false)}>
              ×
            </button>
            <Image
              src="/swift/advanced/instructor/portrait.png"
              alt={t('introPage.instructorPage.avatarAlt')}
              width={560}
              height={560}
              className={styles.lightboxImage}
            />
          </div>
        </div>
      )}
    </main>
  )
}
