'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

type PromiseItem = {
  title: string
  desc?: string
  descPrefix?: string
  descSuffix?: string
  links?: { label: string; url: string }[]
}

export default function FlutterAudiencePage() {
  const { t } = useTranslation('flutter')
  const targets = t('audiencePage.targets', { returnObjects: true }) as string[]
  const promises = t('audiencePage.promises', { returnObjects: true }) as PromiseItem[]

  return (
    <main className={styles.page}>
      <section className={styles.audienceSection}>
        <div className="container">
          <p className={styles.kicker}>{t('hero.kicker')}</p>
          <div className={styles.sectionHeader}>
            <h1 className={styles.title}>{t('audiencePage.heading')}</h1>
            <p className={styles.subtitle}>{t('audiencePage.description')}</p>
          </div>
          <div className={styles.targetGrid}>
            {targets.map((item, idx) => (
              <article key={idx} className={styles.targetCard}>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <div className={styles.noteBox}>
            <p>
              {t('audiencePage.psPrefix')}
              <Link
                href={t('audiencePage.psLinkUrl')}
                className={styles.inlineLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('audiencePage.psLinkLabel')}
              </Link>
              {t('audiencePage.psSuffix')}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.promisesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>{t('audiencePage.promisesTitle')}</h2>
            <Link href={t('audiencePage.promisesLink')} target="_blank" className={styles.promiseLinkButton}>
              {t('audiencePage.promisesLinkLabel')}
            </Link>
          </div>
          <div className={styles.promiseGrid}>
            {promises.map((item, idx) => (
              <article key={idx} className={styles.promiseCard}>
                <div className={styles.promiseTape} />
                <h3>{item.title}</h3>
                <p>
                  {item.descPrefix ? `${item.descPrefix} ` : ''}
                  {item.desc ? item.desc : ''}
                  {Array.isArray(item.links)
                    ? item.links.map((lnk, i) => (
                        <span key={lnk.url}>
                          {i > 0 ? '、' : ''}
                          <Link href={lnk.url} target="_blank" className={styles.inlineLink}>
                            {lnk.label}
                          </Link>
                        </span>
                      ))
                    : null}
                  {item.descSuffix ? item.descSuffix : ''}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
