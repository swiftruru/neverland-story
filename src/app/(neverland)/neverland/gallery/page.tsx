'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { FadeInOnScroll } from '@components/common'
import styles from './page.module.css'

// 相片資料
const PHOTOS = [
  { id: 1, src: '/gallery/class-photo-01.png', alt: 'classPhoto1' },
  { id: 2, src: '/gallery/class-photo-02.png', alt: 'classPhoto2' },
  { id: 3, src: '/gallery/class-photo-03.png', alt: 'classPhoto3' },
  { id: 4, src: '/gallery/class-photo-04.png', alt: 'classPhoto4' },
  { id: 5, src: '/gallery/class-photo-05.png', alt: 'classPhoto5' },
  { id: 6, src: '/gallery/class-photo-06.png', alt: 'classPhoto6' },
  { id: 7, src: '/gallery/class-photo-07.png', alt: 'classPhoto7' },
  { id: 8, src: '/gallery/class-photo-08.png', alt: 'classPhoto8' },
]

// 關閉圖標
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// 左箭頭圖標
function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

// 右箭頭圖標
function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

// 放大圖標
function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  )
}

// Lightbox 組件
function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  t,
}: {
  photos: typeof PHOTOS
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  t: (key: string) => string
}) {
  const photo = photos[currentIndex]

  // 處理鍵盤事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
        {/* 關閉按鈕 */}
        <button
          className={styles.lightboxClose}
          onClick={onClose}
          aria-label={t('gallery.close')}
        >
          <CloseIcon />
        </button>

        {/* 上一張 */}
        <button
          className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
          onClick={onPrev}
          aria-label={t('gallery.prev')}
        >
          <ChevronLeftIcon />
        </button>

        {/* 圖片 */}
        <div className={styles.lightboxImageWrapper}>
          <Image
            src={photo.src}
            alt={t(`gallery.${photo.alt}`)}
            fill
            className={styles.lightboxImage}
            sizes="(max-width: 768px) 100vw, 90vw"
            priority
          />
        </div>

        {/* 下一張 */}
        <button
          className={`${styles.lightboxNav} ${styles.lightboxNext}`}
          onClick={onNext}
          aria-label={t('gallery.next')}
        >
          <ChevronRightIcon />
        </button>

        {/* 計數器 */}
        <div className={styles.lightboxCounter}>
          {currentIndex + 1} / {photos.length}
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const { t } = useTranslation()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === 0 ? PHOTOS.length - 1 : prev - 1
    })
  }, [])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === PHOTOS.length - 1 ? 0 : prev + 1
    })
  }, [])

  return (
    <main className={styles.galleryPage}>
      <div className="container">
        {/* 標題區 */}
        <FadeInOnScroll direction="up">
          <header className={styles.header}>
            <h1 className={styles.title}>{t('gallery.mainTitle')}</h1>
            <p className={styles.subtitle}>{t('gallery.subtitle')}</p>
          </header>
        </FadeInOnScroll>

        {/* 瀑布流網格 */}
        <div className={styles.masonryGrid}>
          {PHOTOS.map((photo, index) => (
            <FadeInOnScroll
              key={photo.id}
              direction="up"
              delay={(index % 4) * 80}
              duration={500}
            >
              <button
                className={styles.photoCard}
                onClick={() => openLightbox(index)}
                aria-label={`${t('gallery.viewPhoto')} ${index + 1}`}
              >
                <div className={styles.photoWrapper}>
                  <Image
                    src={photo.src}
                    alt={t(`gallery.${photo.alt}`)}
                    width={600}
                    height={400}
                    className={styles.photo}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className={styles.photoOverlay}>
                    <ZoomIcon />
                  </div>
                </div>
              </button>
            </FadeInOnScroll>
          ))}
        </div>

        {/* 底部提示 */}
        <FadeInOnScroll direction="up" delay={200}>
          <p className={styles.hint}>{t('gallery.hint')}</p>
        </FadeInOnScroll>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={PHOTOS}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
          t={t}
        />
      )}
    </main>
  )
}
