'use client'

import { Trans, useTranslation } from 'react-i18next'
import styles from '../page.module.css'

type TuitionPlan = {
  id: string
  title: string
  subtitle?: string
  price: string
  original?: string
  note?: string
  linkLabel?: string
  linkUrl?: string
  image: string
}

export default function SwiftTuitionPage() {
  const { t } = useTranslation('swift')
  const plans = t('introPage.tuitionPage.plans', { returnObjects: true }) as TuitionPlan[]

  return (
    <main className={styles.page}>
      <section className={styles.tuitionSection}>
        <div className="container">
          <div className={styles.kickerRow}>
            <p className={`${styles.kicker} ${styles.kickerLeft}`}>{t('hero.kicker')}</p>
          </div>
          <div className={styles.sectionHeader}>
            <h1 className={styles.title}>{t('sections.tuition.title')}</h1>
            <p className={styles.subtitle}>{t('sections.tuition.desc')}</p>
          </div>
          <div className={styles.tuitionGrid}>
            {plans.map((plan, idx) => (
              <article
                key={plan.id}
                className={styles.tuitionCard}
                style={{ '--tuition-idx': idx } as React.CSSProperties}
              >
                <span className={styles.tuitionTape} />
                <div className={styles.tuitionIcon}>
                  <img src={plan.image} alt={plan.title} />
                </div>
                <div className={styles.tuitionBody}>
                  <h3>{plan.title}</h3>
                  {plan.subtitle && <p className={styles.planSubtitle}>{plan.subtitle}</p>}
                  <div className={styles.priceBlock}>
                    <span className={styles.price}>{plan.price}</span>
                    {plan.original && <span className={styles.original}>{plan.original}</span>}
                  </div>
                  {plan.note && <p className={styles.planNote}>{plan.note}</p>}
                  {plan.linkUrl && (
                    <a href={plan.linkUrl} target="_blank" rel="noopener noreferrer" className={styles.planLink}>
                      {plan.linkLabel || plan.linkUrl}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.noticeSection}>
        <div className="container">
          <div className={styles.noticeHeader}>
            <h2 className={styles.title}>{t('introPage.tuitionPage.noticeTitle')}</h2>
          </div>
          <div className={styles.noticeCard}>
            <span className={styles.noticeTape} aria-hidden="true" />
            <ol className={styles.noticeList}>
              <li>
                <Trans
                  i18nKey="introPage.tuitionPage.noticeItems.0"
                  ns="swift"
                  t={t}
                  components={{
                    link1: (
                      <a
                        href="https://medium.com/@apppeterpan/%E5%AD%B8-ios-app-%E9%96%8B%E7%99%BC-%E5%9C%A8-studio-a-%E8%B2%B7-mac-%E4%BA%AB%E7%89%B9%E5%88%A5%E5%84%AA%E6%83%A0-fa2e7fffaf2c#.ot8xowjnz"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                  }}
                />
              </li>
              <li>{t('introPage.tuitionPage.noticeItems.1')}</li>
            </ol>
            <p className={styles.noticePs}>{t('introPage.tuitionPage.noticePs')}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
