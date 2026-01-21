'use client'

import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

export default function SwiftuiTuitionPage() {
  const { t } = useTranslation('swiftui')
  const plans = t('introPage.tuitionPage.plans', { returnObjects: true }) as {
    id: string
    title: string
    subtitle?: string
    price: string
    original?: string
    note?: string
    linkLabel?: string
    linkUrl?: string
    image: string
  }[]

  return (
    <main className={styles.page}>
      <section className={styles.tuitionSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h1 className={styles.title}>{t('sections.tuition.title')}</h1>
            <p className={styles.subtitle}>{t('sections.tuition.desc')}</p>
          </div>
          <div className={styles.tuitionGrid}>
            {plans.map((plan, idx) => (
              <article key={plan.id} className={styles.tuitionCard} style={{ '--tuition-idx': idx } as React.CSSProperties}>
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
    </main>
  )
}
