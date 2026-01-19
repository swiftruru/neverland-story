'use client'

import { useTranslation } from 'react-i18next'
import { PaperCard, FadeInOnScroll } from '@components/common'
import styles from './page.module.css'

type LinkItem = {
  labelKey: string
  url: string
}

type ExperienceItem = {
  id: string
  titleKey: string
  descriptionKey?: string
  links?: LinkItem[]
  extraKey?: string
}

const CURRENT_ITEMS: ExperienceItem[] = [
  {
    id: 'writer',
    titleKey: 'experience.current.writer.title',
    descriptionKey: 'experience.current.writer.description',
  },
  {
    id: 'trainer',
    titleKey: 'experience.current.trainer.title',
    descriptionKey: 'experience.current.trainer.description',
    links: [
      { labelKey: 'experience.current.trainer.links.ntuTraining', url: 'https://train.csie.ntu.edu.tw/train/' },
      { labelKey: 'experience.current.trainer.links.alphaCamp', url: 'https://www.alphacamp.co/' },
      { labelKey: 'experience.current.trainer.links.ichih', url: 'http://www.ichih.com/' },
      { labelKey: 'experience.current.trainer.links.iii', url: 'http://www.iii.org.tw/' },
      { labelKey: 'experience.current.trainer.links.tibame', url: 'https://www.tibame.com/' },
      { labelKey: 'experience.current.trainer.links.studioA', url: 'https://www.studioa.com.tw/' },
    ],
    extraKey: 'experience.current.trainer.extra',
  },
  {
    id: 'campus',
    titleKey: 'experience.current.campus.title',
    descriptionKey: 'experience.current.campus.description',
  },
  {
    id: 'columns',
    titleKey: 'experience.current.columns.title',
    links: [
      { labelKey: 'experience.current.columns.links.appcoda', url: 'http://www.appcoda.com.tw/' },
      { labelKey: 'experience.current.columns.links.alphaCamp', url: 'https://www.alphacamp.co/' },
    ],
  },
  {
    id: 'training',
    titleKey: 'experience.current.training.title',
    descriptionKey: 'experience.current.training.description',
  },
  {
    id: 'wwdc',
    titleKey: 'experience.current.wwdc.title',
    descriptionKey: 'experience.current.wwdc.description',
  },
  {
    id: 'advisor',
    titleKey: 'experience.current.advisor.title',
    links: [
      { labelKey: 'experience.current.advisor.links.funtek', url: 'http://imkit.co/' },
    ],
    extraKey: 'experience.current.advisor.extra',
  },
  {
    id: 'freelance',
    titleKey: 'experience.current.freelance.title',
    descriptionKey: 'experience.current.freelance.description',
  },
]

const PAST_ITEMS: ExperienceItem[] = [
  { id: 'mactoday', titleKey: 'experience.past.mactoday' },
  { id: 'pchome', titleKey: 'experience.past.pchome' },
  { id: 'punapp', titleKey: 'experience.past.punapp' },
  { id: 'funtek', titleKey: 'experience.past.funtek' },
  { id: 'acaia', titleKey: 'experience.past.acaia' },
  { id: 'passionBean', titleKey: 'experience.past.passionBean' },
  { id: 'nthuGrad', titleKey: 'experience.past.nthuGrad' },
  { id: 'nthu', titleKey: 'experience.past.nthu' },
  { id: 'kshs', titleKey: 'experience.past.kshs' },
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

export default function ExperiencePage() {
  const { t } = useTranslation()

  return (
    <div className={styles.experiencePage}>
      <div className="container">
        <FadeInOnScroll direction="up">
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <span className={styles.kicker}>{t('experience.kicker')}</span>
              <h1 className={styles.title}>{t('experience.mainTitle')}</h1>
              <p className={styles.subtitle}>{t('experience.subtitle')}</p>
            </div>
            <a
              href="https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/swift-ios-app-%E7%A8%8B%E5%BC%8F%E9%96%8B%E7%99%BC%E4%BD%9C%E5%AE%B6%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84%E6%96%87%E5%AD%97%E7%B0%A1%E6%AD%B7-f09d4239c809"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fullListLink}
            >
              <span>{t('experience.fullList')}</span>
              <ExternalLinkIcon className={styles.externalIcon} />
            </a>
          </header>
        </FadeInOnScroll>

        <section className={styles.timelineSection}>
          <div className={styles.timelineColumn}>
            <FadeInOnScroll direction="up">
              <h2 className={styles.sectionTitle}>{t('experience.nowTitle')}</h2>
            </FadeInOnScroll>

            <div className={styles.cardList}>
              {CURRENT_ITEMS.map((item, index) => (
                <FadeInOnScroll key={item.id} direction="up" delay={index * 80}>
                  <PaperCard
                    tapeColor={index % 2 === 0 ? 'green' : 'yellow'}
                    tapePosition="top-left"
                    tapeRotation={index % 2 === 0 ? -2 : 2}
                    hover
                  >
                    <div className={styles.experienceCard}>
                      <h3 className={styles.cardTitle}>{t(item.titleKey)}</h3>
                      {item.descriptionKey && (
                        <p className={styles.cardDescription}>{t(item.descriptionKey)}</p>
                      )}
                      {item.links && (
                        <div className={styles.linkList}>
                          {item.links.map((link) => (
                            <a
                              key={link.labelKey}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.linkItem}
                            >
                              {t(link.labelKey)}
                            </a>
                          ))}
                        </div>
                      )}
                      {item.extraKey && (
                        <p className={styles.cardExtra}>{t(item.extraKey)}</p>
                      )}
                    </div>
                  </PaperCard>
                </FadeInOnScroll>
              ))}
            </div>
          </div>

          <div className={styles.timelineColumn}>
            <FadeInOnScroll direction="up">
              <h2 className={styles.sectionTitle}>{t('experience.pastTitle')}</h2>
            </FadeInOnScroll>

            <div className={styles.cardList}>
              {PAST_ITEMS.map((item, index) => (
                <FadeInOnScroll key={item.id} direction="up" delay={index * 80}>
                  <PaperCard
                    tapeColor={index % 2 === 0 ? 'yellow' : 'green'}
                    tapePosition="top-left"
                    tapeRotation={index % 2 === 0 ? -2 : 2}
                    hover
                  >
                    <div className={styles.experienceCard}>
                      <p className={styles.cardDescription}>{t(item.titleKey)}</p>
                    </div>
                  </PaperCard>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
