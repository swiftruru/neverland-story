'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { PaperCard, FadeInOnScroll } from '@components/common'
import styles from './page.module.css'

const COLUMN_ENTRIES = [
  { key: '2014-10', labelKey: 'entries.2014-10' },
  { key: '2014-09', labelKey: 'entries.2014-09' },
  { key: 'ellipsis', labelKey: 'entries.ellipsis' },
  { key: '2011-02', labelKey: 'entries.2011-02' },
]

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ColumnsPage() {
  const { t } = useTranslation()

  return (
    <div className={styles.columnsPage}>
      <div className="container">
        <FadeInOnScroll direction="up">
          <header className={styles.header}>
            <div className={styles.headerIntro}>
              <span className={styles.kicker}>{t('columns.kicker')}</span>
              <h1 className={styles.title}>{t('columns.mainTitle')}</h1>
              <p className={styles.subtitle}>{t('columns.subtitle')}</p>
            </div>
            <a
              href="https://medium.com/@apppeterpan/mactoday-app%E9%96%8B%E7%99%BC%E5%B0%88%E6%AC%84%E6%96%87%E7%AB%A0%E6%B8%85%E5%96%AE-c105acc2052e"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fullListLink}
            >
              <span>{t('columns.fullList')}</span>
              <ExternalLinkIcon className={styles.externalIcon} />
            </a>
          </header>
        </FadeInOnScroll>

        <FadeInOnScroll direction="up" delay={120}>
          <PaperCard tapeColor="green" tapePosition="top-left" tapeRotation={-2} hover={false}>
            <section className={styles.magazineSection}>
              <div className={styles.magazineFrame}>
                <Image
                  src="/columns/mactoday-magazine-collage.png"
                  alt={t('columns.magazineAlt')}
                  width={1400}
                  height={900}
                  className={styles.magazineImage}
                />
              </div>
            </section>
          </PaperCard>
        </FadeInOnScroll>

        <section className={styles.entriesSection}>
          <FadeInOnScroll direction="up">
            <h2 className={styles.entriesTitle}>{t('columns.entriesTitle')}</h2>
          </FadeInOnScroll>
          <div className={styles.entriesList}>
            {COLUMN_ENTRIES.map((entry, index) => (
              <FadeInOnScroll
                key={entry.key}
                direction="up"
                delay={80 + index * 60}
                duration={180}
              >
                <div className={styles.entryItem}>
                  <span className={styles.entryBullet} />
                  <span className={styles.entryText}>{t(`columns.${entry.labelKey}`)}</span>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
