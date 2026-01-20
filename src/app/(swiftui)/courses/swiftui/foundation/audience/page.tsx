'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

type PromiseItem = {
  title: string
  desc?: string
  descPrefix?: string
  descSuffix?: string
  link?: string
  links?: { label: string; url: string }[]
}
type PromiseLink = { label: string; url: string }

export default function SwiftuiAudiencePage() {
  const { t } = useTranslation('swiftui')
  const targets = t('introPage.audiencePage.targets', { returnObjects: true }) as string[]
  const promises = t('introPage.audiencePage.promises', { returnObjects: true }) as PromiseItem[]

  return (
    <main className={styles.page}>
      <section className={styles.audienceSection}>
        <div className="container">
          <p className={styles.kicker}>{t('hero.kicker')}</p>
          <div className={styles.sectionHeader}>
            <h1 className={styles.title}>{t('introPage.audiencePage.heading')}</h1>
            <p className={styles.subtitle}>{t('introPage.audiencePage.description')}</p>
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
              {t('introPage.audiencePage.psPrefix')}
              <Link href={t('introPage.audiencePage.psLinkUrl')} target="_blank" className={styles.inlineLink}>
                {t('introPage.audiencePage.psLinkLabel')}
              </Link>
              {t('introPage.audiencePage.psSuffix')}
              <Link href={t('introPage.audiencePage.compareLink')} target="_blank" className={styles.inlineLink}>
                {t('introPage.audiencePage.compareLinkLabel')}
              </Link>
              。
            </p>
          </div>
        </div>
      </section>

      <section className={styles.promisesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>{t('introPage.audiencePage.promisesTitle')}</h2>
            <Link href={t('introPage.audiencePage.promisesLink')} target="_blank" className={styles.promiseLinkButton}>
              {t('introPage.audiencePage.promisesLinkLabel')}
            </Link>
          </div>
          <div className={styles.promiseGrid}>
            {promises.map((item, idx) => (
              <article key={idx} className={styles.promiseCard}>
                <div className={styles.promiseTape} />
                <h3>{item.title}</h3>
                <p>
                  {item.descPrefix ? item.descPrefix + ' ' : item.desc ?? ''}
                  {Array.isArray(item.links)
                    ? item.links.map((lnk, i) => (
                        <span key={lnk.url}>
                          {i > 0 ? '、' : ' '}
                          <Link href={lnk.url} target="_blank" className={styles.inlineLink}>
                            {lnk.label}
                          </Link>
                        </span>
                      ))
                    : null}
                  {item.descSuffix ? item.descSuffix : ''}
                  {item.link ? (
                    <>
                      {' '}
                      <Link href={item.link} target="_blank" className={styles.inlineLink}>
                        詳細
                      </Link>
                    </>
                  ) : null}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
