'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { PaperCard, FadeInOnScroll } from '@components/common'
import styles from './page.module.css'

// 書籍資料
const BOOKS = [
  {
    id: 'swift-programming',
    titleKey: 'swiftProgramming.title',
    url: 'https://swiftbook.mystrikingly.com/',
    coverImage: '/books/swift-programming-cover.png',
    publishDate: '2017.12',
    rankings: [
      { store: 'books.ranking.booksStore', rank: 'Top 2', category: 'books.ranking.computerNewBooks' },
      { store: 'books.ranking.kingstoneStore', rank: 'Top 1', category: 'books.ranking.computerNewBooks' },
    ],
    rankingImage: '/books/swift-programming-ranking.png',
  },
  {
    id: 'swift-intro',
    titleKey: 'swiftIntro.title',
    url: 'https://www.taaze.tw/products/11100741376.html',
    coverImage: '/books/swift-intro-cover.png',
    publishDate: '2015.3',
    supplementLinks: [
      {
        labelKey: 'swiftIntro.swift3Supplement',
        url: 'https://medium.com/@apppeterpan/swift%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88%E5%85%A5%E9%96%80%E5%A4%96%E5%82%B3-2-0%E7%89%88%E4%BF%AE%E8%A8%82%E8%A3%9C%E5%85%85%E5%8C%85-e1ca60c52326',
      },
    ],
    rankings: [
      { store: 'books.ranking.booksStore', rank: 'Top 3', category: 'books.ranking.computerBestsellers' },
      { store: 'books.ranking.booksStore', rank: 'Top 2', category: 'books.ranking.computerNewBooks' },
      { store: 'books.ranking.pchome', rank: 'Top 2', category: 'books.ranking.computerNewBooks' },
      { store: 'books.ranking.pchome', rank: 'Top 3', category: 'books.ranking.computerWeeklyBestsellers' },
      { store: 'books.ranking.kingstoneStore', rank: 'Top 3', category: 'books.ranking.computerNewBooks' },
    ],
    rankingImage: '/books/swift-intro-ranking.png',
  },
  {
    id: 'app-intro-v2',
    titleKey: 'appIntroV2.title',
    url: 'https://www.taaze.tw/products/11100598108.html',
    coverImage: '/books/app-intro-v2-cover.png',
    publishDate: '2012.2',
    rankings: [
      { store: 'books.ranking.booksStore', rank: 'Top 1', category: 'books.ranking.computerCategory' },
      { store: 'books.ranking.booksStore', rank: 'Top 6', category: 'books.ranking.annualTop100Computer2012' },
      { store: 'books.ranking.tenlong', rank: 'Top 1', category: 'books.ranking.salesRanking' },
      { store: 'books.ranking.pchome', rank: 'Top 1', category: 'books.ranking.computerPhoto' },
    ],
    rankingImage: '/books/app-intro-v2-ranking.png',
  },
  {
    id: 'app-intro-v1',
    titleKey: 'appIntroV1.title',
    url: 'https://www.eslite.com/product/1001113631994712',
    coverImage: '/books/app-intro-v1-cover.jpg',
    publishDate: '2010.11',
    awards: [
      { labelKey: 'appIntroV1.ithomeAward' },
    ],
    rankings: [],
  },
]

// Lightbox 組件
function Lightbox({
  src,
  alt,
  onClose
}: {
  src: string
  alt: string
  onClose: () => void
}) {
  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose} aria-label="Close">
        ×
      </button>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className={styles.lightboxImage}
        onClick={onClose}
      />
    </div>
  )
}

export default function BooksPage() {
  const { t } = useTranslation()
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <div className={styles.booksPage}>
      <div className="container">
        <FadeInOnScroll direction="up">
          <header className={styles.header}>
            <h1 className={styles.title}>{t('books.mainTitle')}</h1>
            <p className={styles.subtitle}>{t('books.subtitle')}</p>
          </header>
        </FadeInOnScroll>

        <section className={styles.booksList}>
          {BOOKS.map((book, index) => (
            <FadeInOnScroll
              key={book.id}
              direction="up"
              delay={index * 100}
            >
              <PaperCard
                tapeColor="green"
                tapePosition="top-left"
                tapeRotation={-2}
                hover
              >
              <article className={styles.bookCard}>
                <div className={styles.bookCoverWrapper}>
                  <Image
                    src={book.coverImage}
                    alt={t(`books.${book.titleKey}`)}
                    width={200}
                    height={280}
                    className={styles.bookCover}
                    onClick={() => setLightboxImage({
                      src: book.coverImage,
                      alt: t(`books.${book.titleKey}`)
                    })}
                  />
                </div>

                <div className={styles.bookInfo}>
                  {book.url ? (
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.bookTitle}
                    >
                      {t(`books.${book.titleKey}`)}
                    </a>
                  ) : (
                    <h2 className={styles.bookTitleText}>{t(`books.${book.titleKey}`)}</h2>
                  )}

                  <div className={styles.bookMeta}>
                    <span className={styles.publishDate}>
                      {book.publishDate} {t('books.published')}
                    </span>
                  </div>

                  {book.supplementLinks && book.supplementLinks.length > 0 && (
                    <div className={styles.supplementLinks}>
                      {book.supplementLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.supplementLink}
                        >
                          {t(`books.${link.labelKey}`)}
                        </a>
                      ))}
                    </div>
                  )}

                  {book.awards && book.awards.length > 0 && (
                    <div className={styles.awardsSection}>
                      <h4 className={styles.awardsTitle}>{t('books.awardsTitle')}</h4>
                      <ul className={styles.awardsList}>
                        {book.awards.map((award, index) => (
                          <li key={index} className={styles.awardItem}>
                            {t(`books.${award.labelKey}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {book.rankings.length > 0 && (
                    <div className={styles.rankingSection}>
                      <h4 className={styles.rankingTitle}>{t('books.rankingTitle')}</h4>
                      <ul className={styles.rankingList}>
                        {book.rankings.map((ranking, index) => (
                          <li key={index} className={styles.rankingItem}>
                            {t(ranking.store)}{t(ranking.category)} <strong>{ranking.rank}</strong>
                          </li>
                        ))}
                      </ul>

                      {book.rankingImage && (
                        <div className={styles.rankingImageWrapper}>
                          <Image
                            src={book.rankingImage}
                            alt={t('books.rankingImageAlt')}
                            width={400}
                            height={300}
                            className={styles.rankingImage}
                            onClick={() => setLightboxImage({
                              src: book.rankingImage,
                              alt: t('books.rankingImageAlt')
                            })}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
              </PaperCard>
            </FadeInOnScroll>
          ))}
        </section>
      </div>

      {lightboxImage && (
        <Lightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  )
}
