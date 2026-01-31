'use client'

import { useTranslation } from 'react-i18next'
import { PaperCard, ZoomImage, FadeInOnScroll } from '@components/common'
import { assetPath } from '@/app/metadata'
import styles from './page.module.css'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className={styles.home}>
      {/* Hero Banner Section */}
      <section className={styles.heroBanner}>
        <div className={styles.bannerOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <FadeInOnScroll direction="up" delay={100}>
            <div className={styles.profileCard}>
              <PaperCard tapeColor="green" tapeRotation={-3} hover={false}>
                <div className={styles.profileInner}>
                  <div className={styles.headshotWrapper}>
                    <ZoomImage
                      src={assetPath('peter-pan-headshot.webp')}
                      alt={t('home.headshotAlt')}
                      width={160}
                      height={160}
                      className={styles.headshot}
                      priority
                    />
                  </div>
                  <div className={styles.profileText}>
                    <h1 className={styles.title}>{t('home.title')}</h1>
                    <p className={styles.subtitle}>{t('home.subtitle')}</p>
                  </div>
                </div>
              </PaperCard>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Description Section */}
      <section className={`container ${styles.descriptionSection}`}>
        <FadeInOnScroll direction="up" delay={200}>
          <PaperCard tapeColor="yellow" tapePosition="top-left" tapeRotation={-5} variant="lined" hover={false}>
            <div className={styles.description}>
              <h2 className={styles.descriptionTitle}>{t('home.rolesTitle')}</h2>
              <div className={styles.roles}>
                <div className={styles.roleGroup}>
                  <span className={styles.roleLabel}>{t('home.mainJob')}</span>
                  <p className={styles.roleContent}>{t('home.mainJobContent')}</p>
                </div>
                <div className={styles.roleGroup}>
                  <span className={styles.roleLabel}>{t('home.sideJob')}</span>
                  <p className={styles.roleContent}>{t('home.sideJobContent')}</p>
                </div>
              </div>
            </div>
          </PaperCard>
        </FadeInOnScroll>
      </section>
    </div>
  )
}
