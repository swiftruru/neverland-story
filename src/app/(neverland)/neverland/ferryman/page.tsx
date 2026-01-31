'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { FadeInOnScroll } from '@components/common'
import { assetPath } from '@/app/metadata'
import styles from './page.module.css'

// 外部連結圖標
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 服務項目圖標
function LifebuoyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </svg>
  )
}

// 服務項目
const SERVICES = [
  { key: 'work', icon: '💼' },
  { key: 'school', icon: '🎓' },
  { key: 'demo', icon: '📱' },
  { key: 'outsource', icon: '🤝' },
  { key: 'interview', icon: '👔' },
  { key: 'appStore', icon: '🚀' },
]

const PROCESS_STEPS = [
  { key: 'diagnose', order: '01' },
  { key: 'plan', order: '02' },
  { key: 'build', order: '03' },
  { key: 'launch', order: '04' },
]

const HIGHLIGHTS = ['focus', 'clarity', 'delivery']

export default function FerrymanPage() {
  const { t } = useTranslation()

  return (
    <main className={styles.ferrymanPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} />
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <FadeInOnScroll direction="up">
                <span className={styles.heroBadge}>{t('ferryman.badge')}</span>
              </FadeInOnScroll>

              <FadeInOnScroll direction="up" delay={80}>
                <div className={styles.heroTitleRow}>
                  <span className={styles.heroIcon}>
                    <LifebuoyIcon />
                  </span>
                  <h1 className={styles.heroTitle}>{t('ferryman.mainTitle')}</h1>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll direction="up" delay={160}>
                <p className={styles.heroSubtitle}>{t('ferryman.subtitle')}</p>
              </FadeInOnScroll>

              <FadeInOnScroll direction="up" delay={240}>
                <p className={styles.heroLead}>{t('ferryman.lead')}</p>
              </FadeInOnScroll>

              <FadeInOnScroll direction="up" delay={320}>
                <a
                  href="http://iosappferryman.strikingly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaButton}
                >
                  <span>{t('ferryman.learnMore')}</span>
                  <ExternalLinkIcon className={styles.ctaIcon} />
                </a>
              </FadeInOnScroll>
            </div>

            <FadeInOnScroll direction="up" delay={200}>
              <div className={styles.heroPanel}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelLabel}>{t('ferryman.panelTitle')}</span>
                  <span className={styles.panelSubtitle}>{t('ferryman.panelSubtitle')}</span>
                </div>
                <div className={styles.statGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{t('ferryman.stats.years.value')}</span>
                    <span className={styles.statLabel}>{t('ferryman.stats.years.label')}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{t('ferryman.stats.apps.value')}</span>
                    <span className={styles.statLabel}>{t('ferryman.stats.apps.label')}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{t('ferryman.stats.cases.value')}</span>
                    <span className={styles.statLabel}>{t('ferryman.stats.cases.label')}</span>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className={styles.highlightsSection}>
        <div className="container">
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightsContent}>
              <FadeInOnScroll direction="up">
                <h2 className={styles.sectionTitle}>{t('ferryman.highlightsTitle')}</h2>
              </FadeInOnScroll>
              <FadeInOnScroll direction="up" delay={120}>
                <p className={styles.sectionDescription}>{t('ferryman.highlightsDescription')}</p>
              </FadeInOnScroll>
              <div className={styles.highlightsList}>
                {HIGHLIGHTS.map((item, index) => (
                  <FadeInOnScroll key={item} direction="up" delay={160 + index * 60}>
                    <div className={styles.highlightItem}>
                      <span className={styles.highlightMarker} />
                      <span>{t(`ferryman.highlights.${item}`)}</span>
                    </div>
                  </FadeInOnScroll>
                ))}
              </div>
            </div>

            <FadeInOnScroll direction="up" delay={100}>
              <div className={styles.scenariosImageWrapper}>
                <Image
                  src={assetPath('ferryman/help-scenarios.webp')}
                  alt={t('ferryman.scenariosAlt')}
                  width={800}
                  height={480}
                  className={styles.scenariosImage}
                />
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className="container">
          <FadeInOnScroll direction="up">
            <h2 className={styles.sectionTitle}>{t('ferryman.processTitle')}</h2>
          </FadeInOnScroll>
          <FadeInOnScroll direction="up" delay={100}>
            <p className={styles.sectionDescription}>{t('ferryman.processDescription')}</p>
          </FadeInOnScroll>

          <div className={styles.processGrid}>
            {PROCESS_STEPS.map((step, index) => (
              <FadeInOnScroll key={step.key} direction="up" delay={140 + index * 80}>
                <div className={styles.processCard}>
                  <span className={styles.processOrder}>{step.order}</span>
                  <h3 className={styles.processTitle}>{t(`ferryman.process.${step.key}.title`)}</h3>
                  <p className={styles.processDescription}>{t(`ferryman.process.${step.key}.description`)}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <FadeInOnScroll direction="up">
            <h2 className={styles.sectionTitle}>{t('ferryman.servicesTitle')}</h2>
          </FadeInOnScroll>
          <FadeInOnScroll direction="up" delay={100}>
            <p className={styles.sectionDescription}>{t('ferryman.servicesDescription')}</p>
          </FadeInOnScroll>

          <div className={styles.servicesGrid}>
            {SERVICES.map((service, index) => (
              <FadeInOnScroll
                key={service.key}
                direction="up"
                delay={(index % 3) * 80}
              >
                <div className={styles.serviceCard}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <h3 className={styles.serviceTitle}>
                    {t(`ferryman.services.${service.key}`)}
                  </h3>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <FadeInOnScroll direction="up">
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>{t('ferryman.ctaTitle')}</h2>
              <p className={styles.ctaDescription}>{t('ferryman.ctaDescription')}</p>
              <a
                href="http://iosappferryman.strikingly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButtonLarge}
              >
                <span>{t('ferryman.ctaButton')}</span>
                <ExternalLinkIcon className={styles.ctaIcon} />
              </a>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Interview Curator Section */}
      <section className={styles.interviewSection}>
        <div className="container">
          <FadeInOnScroll direction="up">
            <div className={styles.interviewCard}>
              <span className={styles.interviewBadge}>{t('ferryman.interview.badge')}</span>
              <h2 className={styles.interviewTitle}>{t('ferryman.interview.title')}</h2>
              <p className={styles.interviewSubtitle}>{t('ferryman.interview.subtitle')}</p>
              <a
                href="http://interviewiosapp.strikingly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.interviewButton}
              >
                <span>{t('ferryman.interview.cta')}</span>
                <ExternalLinkIcon className={styles.ctaIcon} />
              </a>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </main>
  )
}
