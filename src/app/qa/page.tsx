'use client'

import { useTranslation } from 'react-i18next'
import { PaperCard, FadeInOnScroll } from '@components/common'
import styles from './page.module.css'

// Q&A 文章資料
const QA_ARTICLES = [
  {
    id: 'ios-qa',
    titleKey: 'iosQA.title',
    descriptionKey: 'iosQA.description',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E9%97%9C%E6%96%BCios-app%E9%96%8B%E7%99%BC%E7%9A%84%E5%8D%81%E5%80%8Bq-a-65833f6eb993',
    icon: 'question',
  },
  {
    id: 'preparation',
    titleKey: 'preparation.title',
    descriptionKey: 'preparation.description',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E5%AD%B8%E7%BF%92%E9%96%8B%E7%99%BC-swift-ios-app-%E5%89%8D%E7%9A%84%E6%BA%96%E5%82%99-4f9e52debc16',
    icon: 'rocket',
  },
  {
    id: 'promises',
    titleKey: 'promises.title',
    descriptionKey: 'promises.description',
    url: 'https://apppeterpan.medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98ios-app%E9%96%8B%E7%99%BC%E6%95%99%E5%AD%B8%E7%9A%84%E4%BA%94%E5%80%8B%E6%89%BF%E8%AB%BE-5bc29a7c08a5',
    icon: 'heart',
  },
  {
    id: 'resources',
    titleKey: 'resources.title',
    descriptionKey: 'resources.description',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E4%B8%8D%E9%8C%AF%E7%9A%84-swift-ios-app-%E6%95%99%E5%AD%B8%E7%B6%B2%E7%AB%99%E5%92%8C%E8%AA%B2%E7%A8%8B-9a3bf1e03503',
    icon: 'book',
  },
  {
    id: 'puzzles',
    titleKey: 'puzzles.title',
    descriptionKey: 'puzzles.description',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84%E8%A9%A6%E7%85%89-%E5%8B%87%E8%80%85%E7%9A%84-100-%E9%81%93-swift-ios-app-%E8%AC%8E%E9%A1%8C',
    icon: 'puzzle',
  },
  {
    id: 'realApp',
    titleKey: 'realApp.title',
    descriptionKey: 'realApp.description',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84%E7%9C%9F%E5%AF%A6-ios-app-%E7%95%AB%E9%9D%A2%E5%8A%9F%E8%83%BD%E5%BE%A9%E5%88%BB',
    icon: 'phone',
  },
]

// 圖標組件
function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'question':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="17" r="0.5" fill="currentColor" />
        </svg>
      )
    case 'rocket':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'heart':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'book':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'puzzle':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'phone':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

// 箭頭圖標
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function QAPage() {
  const { t } = useTranslation()
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: QA_ARTICLES.map((article) => ({
      '@type': 'Question',
      name: t(`qa.${article.titleKey}`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`qa.${article.descriptionKey}`),
      },
    })),
  }

  return (
    <div className={styles.qaPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.bannerOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <FadeInOnScroll direction="up" delay={100}>
            <h1 className={styles.heroTitle}>{t('qa.mainTitle')}</h1>
            <p className={styles.heroSubtitle}>{t('qa.subtitle')}</p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Articles Grid */}
      <div className="container">
        <section className={styles.articlesGrid}>
          {QA_ARTICLES.map((article, index) => (
            <FadeInOnScroll
              key={article.id}
              direction="up"
              delay={index * 80}
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.articleLink}
              >
                <PaperCard
                  tapeColor={index % 2 === 0 ? 'green' : 'yellow'}
                  tapePosition="top-left"
                  tapeRotation={index % 2 === 0 ? -3 : 3}
                  hover
                >
                  <article className={styles.articleCard}>
                    <div className={styles.iconWrapper}>
                      <Icon name={article.icon} className={styles.icon} />
                    </div>
                    <div className={styles.articleContent}>
                      <h2 className={styles.articleTitle}>
                        {t(`qa.${article.titleKey}`)}
                      </h2>
                      <p className={styles.articleDescription}>
                        {t(`qa.${article.descriptionKey}`)}
                      </p>
                    </div>
                    <div className={styles.readMore}>
                      <span>{t('qa.readMore')}</span>
                      <ArrowIcon className={styles.arrowIcon} />
                    </div>
                  </article>
                </PaperCard>
              </a>
            </FadeInOnScroll>
          ))}
        </section>
      </div>
    </div>
  )
}
