'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { PaperCard, FadeInOnScroll } from '@components/common'
import { APP_WORKS, type AppWork } from './appWorks'
import styles from './page.module.css'

// 箭頭圖標
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 外部連結圖標
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

// 關閉圖標
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// 展開圖標
function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}

// APP 預設圖標
function AppDefaultIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2">
      {/* 手機外框 */}
      <rect x="20" y="8" width="40" height="64" rx="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* 螢幕 */}
      <rect x="24" y="16" width="32" height="44" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      {/* Home 按鈕 */}
      <circle cx="40" cy="66" r="3" />
      {/* App 圖示 */}
      <rect x="30" y="24" width="8" height="8" rx="2" />
      <rect x="42" y="24" width="8" height="8" rx="2" />
      <rect x="30" y="36" width="8" height="8" rx="2" />
      <rect x="42" y="36" width="8" height="8" rx="2" />
    </svg>
  )
}

// Modal 組件
function AppModal({
  app,
  onClose,
  t,
}: {
  app: AppWork
  onClose: () => void
  t: (key: string) => string
}) {
  // 處理 ESC 鍵關閉
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const description = t(`appWorks.${app.descriptionKey}`)
  const description2 = app.description2Key ? t(`appWorks.${app.description2Key}`) : ''
  const hasDescription2 = description2 && description2 !== `appWorks.${app.description2Key}` && description2 !== ''

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className={styles.modalImageWrapper}>
          {app.image ? (
            <Image
              src={app.image}
              alt={t(`appWorks.${app.titleKey}`)}
              width={600}
              height={800}
              className={styles.modalImage}
            />
          ) : (
            <div className={styles.modalPlaceholder}>
              <AppDefaultIcon className={styles.placeholderIcon} />
            </div>
          )}
        </div>

        <div className={styles.modalBody}>
          <h2 className={styles.modalTitle}>{t(`appWorks.${app.titleKey}`)}</h2>

          <p className={styles.modalDescription}>{description}</p>

          {hasDescription2 && (
            <p className={styles.modalDescription2}>{description2}</p>
          )}

          {app.url && (
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.modalButton}
            >
              {t('appWorks.viewOnAppStore')}
              <ExternalLinkIcon className={styles.modalButtonIcon} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function AppsPage() {
  const { t } = useTranslation()
  const [selectedApp, setSelectedApp] = useState<AppWork | null>(null)

  const openModal = useCallback((app: AppWork) => {
    setSelectedApp(app)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedApp(null)
  }, [])

  return (
    <div className={styles.appsPage}>
      <div className="container">
        {/* Header */}
        <FadeInOnScroll direction="up">
          <header className={styles.header}>
            <h1 className={styles.title}>{t('appWorks.mainTitle')}</h1>
            <p className={styles.subtitle}>{t('appWorks.subtitle')}</p>
          </header>
        </FadeInOnScroll>

        {/* Apps Grid */}
        <section className={styles.appsGrid}>
          {APP_WORKS.map((app, index) => {
            const description = t(`appWorks.${app.descriptionKey}`)
            const description2 = app.description2Key ? t(`appWorks.${app.description2Key}`) : ''
            const hasDescription2 = description2 && description2 !== `appWorks.${app.description2Key}` && description2 !== ''

            return (
              <FadeInOnScroll
                key={app.id}
                direction="up"
                delay={(index % 3) * 50}
                duration={400}
              >
                <PaperCard
                  tapeColor={index % 2 === 0 ? 'green' : 'yellow'}
                  tapePosition="top-left"
                  tapeRotation={index % 2 === 0 ? -3 : 3}
                  hover
                >
                  <article className={styles.appCard}>
                    <button
                      className={styles.cardClickArea}
                      onClick={() => openModal(app)}
                      aria-label={`${t('appWorks.viewDetails')} ${t(`appWorks.${app.titleKey}`)}`}
                    >
                      <div className={styles.imageWrapper}>
                        {app.image ? (
                          <Image
                            src={app.image}
                            alt={t(`appWorks.${app.titleKey}`)}
                            width={400}
                            height={533}
                            className={styles.appImage}
                          />
                        ) : (
                          <div className={styles.imagePlaceholder}>
                            <AppDefaultIcon className={styles.placeholderIcon} />
                          </div>
                        )}
                        <div className={styles.imageOverlay}>
                          <ExpandIcon className={styles.expandIcon} />
                        </div>
                      </div>
                    </button>

                    <div className={styles.appContent}>
                      <h2
                        className={styles.appTitleClickable}
                        onClick={() => openModal(app)}
                      >
                        {t(`appWorks.${app.titleKey}`)}
                      </h2>

                      <p className={styles.appDescription}>
                        {description}
                      </p>

                      {hasDescription2 && (
                        <p className={styles.appDescription2}>
                          {description2}
                        </p>
                      )}

                      <div className={styles.cardActions}>
                        <button
                          className={styles.viewDetailsButton}
                          onClick={() => openModal(app)}
                        >
                          {t('appWorks.viewDetails')}
                          <ExpandIcon className={styles.buttonIcon} />
                        </button>

                        {app.url && (
                          <a
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.learnMoreButton}
                          >
                            {t('appWorks.viewOnAppStore')}
                            <ArrowIcon className={styles.buttonArrow} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </PaperCard>
              </FadeInOnScroll>
            )
          })}
        </section>
      </div>

      {/* Modal */}
      {selectedApp && (
        <AppModal
          app={selectedApp}
          onClose={closeModal}
          t={t}
        />
      )}
    </div>
  )
}
