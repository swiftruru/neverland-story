'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { FadeInOnScroll } from '@components/common'
import { assetPath } from '@/app/metadata'
import styles from './page.module.css'

import 'swiper/css'
import 'swiper/css/navigation'

// 膠帶顏色調色盤
const tapePalette = [
  { top: '#f4e5aa', bottom: '#f1d778' }, // 黃色
  { top: '#cbe7d6', bottom: 'rgba(160, 200, 160, 0.88)' }, // 綠色
]

// 相片資料
const PHOTOS = [
  { id: 1, src: assetPath('gallery/class-photo-01.png'), alt: 'classPhoto1' },
  { id: 2, src: assetPath('gallery/class-photo-02.png'), alt: 'classPhoto2' },
  { id: 3, src: assetPath('gallery/class-photo-03.png'), alt: 'classPhoto3' },
  { id: 4, src: assetPath('gallery/class-photo-04.png'), alt: 'classPhoto4' },
  { id: 5, src: assetPath('gallery/class-photo-05.png'), alt: 'classPhoto5' },
  { id: 6, src: assetPath('gallery/class-photo-06.png'), alt: 'classPhoto6' },
  { id: 7, src: assetPath('gallery/class-photo-07.png'), alt: 'classPhoto7' },
  { id: 8, src: assetPath('gallery/class-photo-08.png'), alt: 'classPhoto8' },
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

// Lightbox 組件（使用 Swiper）
function Lightbox({
  photos,
  initialIndex,
  onClose,
  t,
}: {
  photos: typeof PHOTOS
  initialIndex: number
  onClose: () => void
  t: (key: string) => string
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const touchStartRef = useRef<{ x: number; y: number; target: EventTarget | null } | null>(null)

  // 判斷是否為可互動元素（不應關閉 lightbox 的元素）
  const isInteractiveElement = useCallback((target: HTMLElement | null): boolean => {
    if (!target) return false

    const interactiveSelectors = [
      'button',
      '[role="button"]',
      '.swiper-button-prev',
      '.swiper-button-next',
      'img',
      '[class*="lightboxClose"]',
      '[class*="lightboxCounter"]',
      '[class*="lightboxImage"]',
    ]

    for (const selector of interactiveSelectors) {
      if (target.matches(selector) || target.closest(selector)) {
        return true
      }
    }
    return false
  }, [])

  // 處理 ESC 關閉、鎖定 body 滾動、以及原生觸控事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    // 記錄觸控開始位置
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        target: e.target,
      }
    }

    // 觸控結束時判斷是否為點擊（非滑動）
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || !overlayRef.current) return

      const touch = e.changedTouches[0]
      const deltaX = Math.abs(touch.clientX - touchStartRef.current.x)
      const deltaY = Math.abs(touch.clientY - touchStartRef.current.y)

      // 如果移動距離小於 10px，視為點擊而非滑動
      const isTap = deltaX < 10 && deltaY < 10

      if (isTap) {
        const target = touchStartRef.current.target as HTMLElement
        // 確保點擊發生在 lightbox 內且不是互動元素
        if (overlayRef.current.contains(target) && !isInteractiveElement(target)) {
          onClose()
        }
      }

      touchStartRef.current = null
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.body.style.overflow = ''
    }
  }, [onClose, isInteractiveElement])

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.realIndex ?? swiper.activeIndex)
  }

  // 點擊非互動區域時關閉（桌面版）
  const handleContentClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (!isInteractiveElement(target)) {
      onClose()
    }
  }

  return (
    <div
      ref={overlayRef}
      className={styles.lightboxOverlay}
      onClick={handleContentClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={contentRef}
        className={styles.lightboxContent}
      >
        {/* 關閉按鈕 */}
        <button
          className={styles.lightboxClose}
          onClick={onClose}
          type="button"
          aria-label={t('gallery.close')}
        >
          <CloseIcon />
        </button>

        {/* Swiper 輪播 */}
        <Swiper
          modules={[Navigation, Keyboard]}
          initialSlide={initialIndex}
          navigation
          keyboard={{ enabled: true }}
          loop={true}
          grabCursor={true}
          onSlideChange={handleSlideChange}
          className={styles.lightboxSwiper}
        >
          {photos.map((photo) => (
            <SwiperSlide
              key={photo.id}
              className={styles.lightboxSlide}
            >
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
            </SwiperSlide>
          ))}
        </Swiper>

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

        {/* 拍立得風格照片牆 */}
        <div className={styles.photoGrid}>
          {PHOTOS.map((photo, index) => (
            <FadeInOnScroll
              key={photo.id}
              direction="up"
              delay={(index % 4) * 80}
              duration={500}
            >
              <figure
                className={styles.photoCard}
                style={{
                  ['--photo-idx' as string]: index,
                  ['--tape-top' as string]: tapePalette[index % 2].top,
                  ['--tape-bottom' as string]: tapePalette[index % 2].bottom,
                }}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`${t('gallery.viewPhoto')} ${index + 1}`}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              >
                <span className={styles.photoTape} />
                <div className={styles.photoImage}>
                  <Image
                    src={photo.src}
                    alt={t(`gallery.${photo.alt}`)}
                    width={600}
                    height={400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </figure>
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
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
          t={t}
        />
      )}
    </main>
  )
}
