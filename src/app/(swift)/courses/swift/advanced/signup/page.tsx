'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { LazyImage } from '@components/common'
import styles from '../page.module.css'

import 'swiper/css'
import 'swiper/css/navigation'

// 膠帶顏色調色盤
const tapePalette = [
  { top: '#f4e5aa', bottom: '#f1d778' }, // 黃色
  { top: '#cbe7d6', bottom: 'rgba(160, 200, 160, 0.88)' }, // 綠色
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
function PhotoLightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: { src: string; alt: string; caption?: string }[]
  initialIndex: number
  onClose: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isClosing, setIsClosing] = useState(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const touchStartRef = useRef<{ x: number; y: number; target: EventTarget | null } | null>(null)

  // 帶淡出動畫的關閉函數
  const handleClose = useCallback(() => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 200)
  }, [isClosing, onClose])

  // 判斷是否為可互動元素（不應關閉 lightbox 的元素）
  const isInteractiveElement = useCallback((target: HTMLElement | null): boolean => {
    if (!target) return false

    const interactiveSelectors = [
      'button',
      '[role="button"]',
      '.swiper-button-prev',
      '.swiper-button-next',
      '[class*="swiperLightboxClose"]',
      '[class*="swiperLightboxCounter"]',
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
      if (e.key === 'Escape') handleClose()
    }

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        target: e.target,
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || !overlayRef.current) return

      const touch = e.changedTouches[0]
      const deltaX = Math.abs(touch.clientX - touchStartRef.current.x)
      const deltaY = Math.abs(touch.clientY - touchStartRef.current.y)

      const isTap = deltaX < 10 && deltaY < 10

      if (isTap) {
        const target = touchStartRef.current.target as HTMLElement
        if (overlayRef.current.contains(target) && !isInteractiveElement(target)) {
          handleClose()
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
  }, [handleClose, isInteractiveElement])

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.realIndex ?? swiper.activeIndex)
  }

  const handleContentClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (!isInteractiveElement(target)) {
      handleClose()
    }
  }

  return (
    <div
      ref={overlayRef}
      className={`${styles.swiperLightboxOverlay} ${isClosing ? styles.swiperLightboxClosing : ''}`}
      onClick={handleContentClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.swiperLightboxContent}>
        <button
          className={styles.swiperLightboxClose}
          onClick={handleClose}
          type="button"
          aria-label="關閉"
        >
          <CloseIcon />
        </button>

        <Swiper
          modules={[Navigation, Keyboard]}
          initialSlide={initialIndex}
          navigation
          keyboard={{ enabled: true }}
          loop={true}
          grabCursor={true}
          onSlideChange={handleSlideChange}
          className={styles.swiperLightboxSwiper}
        >
          {photos.map((photo, idx) => (
            <SwiperSlide key={idx} className={styles.swiperLightboxSlide}>
              <div className={styles.swiperLightboxImageWrapper}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={styles.swiperLightboxImage}
                  sizes="(max-width: 768px) 100vw, 90vw"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.swiperLightboxCounter}>
          {currentIndex + 1} / {photos.length}
        </div>

        {photos[currentIndex]?.caption && (
          <p className={styles.swiperLightboxCaption}>{photos[currentIndex].caption}</p>
        )}
      </div>
    </div>
  )
}

export default function SwiftSignupPage() {
  const { t } = useTranslation('swift')
  const formUrl = t('introPage.signupPage.formUrl')
  const psUrl = t('introPage.signupPage.psUrl')
  const steps = t('introPage.signupPage.steps', { returnObjects: true }) as string[]
  const photos = t('introPage.signupPage.photos.items', { returnObjects: true }) as {
    src: string
    alt: string
    caption?: string
  }[]
  const photosCtaLabel = t('introPage.signupPage.photos.ctaLabel')
  const photosCtaUrl = t('introPage.signupPage.photos.ctaUrl')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  return (
    <main className={styles.page}>
      <section className={styles.signupSection}>
        <div className="container">
          <div className={styles.signupLayout}>
            <div className={styles.signupHero}>
              <p className={styles.kicker}>{t('hero.kicker')}</p>
              <h1 className={styles.title}>{t('introPage.signupPage.title')}</h1>
              <p className={styles.subtitle}>{t('introPage.signupPage.description')}</p>
              <p className={styles.signupHint}>{t('introPage.signupPage.hint')}</p>
              <ul className={styles.signupSteps}>
                {steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            <div className={styles.signupCard}>
              <span className={styles.signupTape} />
              <div className={styles.signupIcon}>
                <img src="/swift/advanced/signup/forms-logo.svg" alt="Google Form" />
              </div>
              <div className={styles.signupBody}>
                <h3>{t('introPage.signupPage.formHeading')}</h3>
                <p className={styles.signupDesc}>{t('introPage.signupPage.formCopy')}</p>
                <a href={formUrl} target="_blank" rel="noopener noreferrer" className={styles.formLink}>
                  {t('introPage.signupPage.cta')}
                </a>
              </div>
            </div>
          </div>

          <div className={styles.signupPs}>
            <h4>PS</h4>
            <p>
              {t('introPage.signupPage.psText')}{' '}
              <a href={psUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                {t('introPage.signupPage.psLinkLabel')}
              </a>
              。
            </p>
          </div>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div className="container">
          <div className={styles.videoHeader}>
            <h2 className={styles.title}>{t('introPage.signupPage.video.title')}</h2>
            <p className={styles.subtitle}>{t('introPage.signupPage.video.description')}</p>
          </div>

          <div className={styles.videoCard}>
            <span className={styles.videoTape} />
            <div className={styles.videoFrame}>
              <iframe
                src="https://www.youtube.com/embed/rR3U_ejGNto?si=jbF217rgyybz5V4c"
                title="給我一首歌的時間做 App"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.photoSection}>
        <div className="container">
          <div className={styles.photoHeader}>
            <h2 className={styles.title}>{t('introPage.signupPage.photos.title')}</h2>
            <a href={photosCtaUrl} target="_blank" rel="noopener noreferrer" className={styles.blogLink}>
              {photosCtaLabel}
            </a>
          </div>

          <div className={styles.photoGrid}>
            {photos.map((item, idx) => (
              <figure
                key={item.src}
                className={styles.photoCard}
                style={{
                  ['--photo-idx' as string]: idx,
                  ['--tape-top' as string]: tapePalette[idx % 2].top,
                  ['--tape-bottom' as string]: tapePalette[idx % 2].bottom,
                }}
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                aria-label={`查看照片 ${idx + 1}`}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(idx)}
              >
                <span className={styles.photoTape} />
                <div className={styles.photoImage}>
                  <LazyImage
                    src={item.src}
                    alt={item.alt}
                    width={400}
                    height={300}
                    placeholder="blur"
                  />
                </div>
                {item.caption && <figcaption className={styles.photoCaption}>{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </main>
  )
}
