'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { FadeInOnScroll } from '@components/common'
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

export default function FerrymanPage() {
  const { t } = useTranslation()

  return (
    <main className={styles.ferrymanPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <FadeInOnScroll direction="up">
            <div className={styles.heroIcon}>
              <LifebuoyIcon />
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll direction="up" delay={100}>
            <h1 className={styles.heroTitle}>{t('ferryman.mainTitle')}</h1>
          </FadeInOnScroll>

          <FadeInOnScroll direction="up" delay={200}>
            <p className={styles.heroSubtitle}>{t('ferryman.subtitle')}</p>
          </FadeInOnScroll>

          <FadeInOnScroll direction="up" delay={300}>
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
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <FadeInOnScroll direction="up">
            <h2 className={styles.sectionTitle}>{t('ferryman.servicesTitle')}</h2>
          </FadeInOnScroll>

          <FadeInOnScroll direction="up" delay={100}>
            <div className={styles.scenariosImageWrapper}>
              <Image
                src="/ferryman/help-scenarios.png"
                alt={t('ferryman.scenariosAlt')}
                width={800}
                height={400}
                className={styles.scenariosImage}
              />
            </div>
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
    </main>
  )
}
