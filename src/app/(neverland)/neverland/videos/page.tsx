'use client'

import { useTranslation } from 'react-i18next'
import { PaperCard } from '@components/common'
import styles from './page.module.css'

export default function VideosPage() {
  const { t } = useTranslation()

  return (
    <div className={styles.videosPage}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>{t('pages.videos.mainTitle')}</h1>
          <p className={styles.subtitle}>{t('pages.videos.subtitle')}</p>
        </header>

        <section className={styles.videoSection}>
          <PaperCard tapeColor="yellow" tapePosition="top-left" tapeRotation={-3} hover={false}>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/rR3U_ejGNto?si=c4jUjCU1hE5JvI0h"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className={styles.videoIframe}
              />
            </div>
          </PaperCard>
        </section>
      </div>
    </div>
  )
}
