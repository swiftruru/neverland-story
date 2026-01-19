'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { PaperCard, FadeInOnScroll } from '@components/common'
import { assetPath } from '@/app/metadata'
import styles from './page.module.css'

// 家教服務資料
const SERVICES = [
  {
    id: 'vibe-coding',
    titleKey: 'vibeCoding.title',
    descriptionKey: 'vibeCoding.description',
    image: assetPath('tutoring/vibe-coding-coach.png'),
    url: 'https://appvibecoding.mystrikingly.com/',
  },
  {
    id: 'app-mentor',
    titleKey: 'appMentor.title',
    descriptionKey: 'appMentor.description',
    image: assetPath('tutoring/app-mentor.png'),
    url: 'https://yourappmentor.mystrikingly.com/',
  },
]

// 箭頭圖標
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function TutoringPage() {
  const { t } = useTranslation()

  return (
    <div className={styles.tutoringPage}>
      <div className="container">
        <FadeInOnScroll direction="up">
          <header className={styles.header}>
            <h1 className={styles.title}>{t('tutoring.mainTitle')}</h1>
            <p className={styles.subtitle}>{t('tutoring.subtitle')}</p>
          </header>
        </FadeInOnScroll>

        <section className={styles.servicesList}>
          {SERVICES.map((service, index) => (
            <FadeInOnScroll
              key={service.id}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 150}
            >
              <PaperCard
                tapeColor={index % 2 === 0 ? 'green' : 'yellow'}
                tapePosition="top-left"
                tapeRotation={index % 2 === 0 ? -2 : 2}
                hover
              >
                <article className={styles.serviceCard}>
                  <div className={styles.serviceContent}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={service.image}
                        alt={t(`tutoring.${service.titleKey}`)}
                        width={320}
                        height={320}
                        className={styles.serviceImage}
                      />
                    </div>

                    <div className={styles.serviceInfo}>
                      <h2 className={styles.serviceTitle}>
                        {t(`tutoring.${service.titleKey}`)}
                      </h2>
                      <p className={styles.serviceDescription}>
                        {t(`tutoring.${service.descriptionKey}`)}
                      </p>
                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ctaButton}
                      >
                        {t('tutoring.learnMore')}
                        <ArrowIcon className={styles.ctaIcon} />
                      </a>
                    </div>
                  </div>
                </article>
              </PaperCard>
            </FadeInOnScroll>
          ))}
        </section>
      </div>
    </div>
  )
}
