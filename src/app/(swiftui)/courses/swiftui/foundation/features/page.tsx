'use client'

import { Trans, useTranslation } from 'react-i18next'
import styles from '../page.module.css'

const featureIds = [
  'from-zero',
  'live',
  'ta',
  'apps',
  'tech',
  'funny',
  'assignments',
  'blog',
  'ai',
  'mentoring',
  'tools',
] as const

type FeatureId = (typeof featureIds)[number]

const componentsMap: Record<FeatureId, Record<string, JSX.Element>> = {
  'from-zero': {
    snail: (
      <a href="https://medium.com/@apppeterpan/彼得潘的課程主題曲-蝸牛改編-89a99c3a2712" target="_blank" rel="noreferrer">
        蝸牛
      </a>
    ),
  },
  live: {},
  ta: {
    line: (
      <a
        href="https://medium.com/@apppeterpan/swift-ios-app-課程的-line-私訊和課前課後談心解惑-af70202bf948"
        target="_blank"
        rel="noreferrer"
      />
    ),
  },
  apps: {},
  tech: {
    swiftStory: (
      <a
        href="https://medium.com/彼得潘的-swift-ios-app-開發教室/當你努力想學習-swift-時-全世界都會來幫你-b11dca643686"
        target="_blank"
        rel="noreferrer"
      />
    ),
  },
  funny: {
    studentNotes: (
      <a href="https://medium.com/@apppeterpan/以幽默風趣的程式教學為己任-f69d7dad8d6f" target="_blank" rel="noreferrer" />
    ),
  },
  assignments: {
    designer: (
      <a href="https://medium.com/@apppeterpan/精心設計的課堂練習和課後作業-b2ff1199e70c" target="_blank" rel="noreferrer" />
    ),
    alumni: (
      <a
        href="https://medium.com/@apppeterpan/參考模仿學長姐的-ios-app-作業-感謝同學們精心繪製的圖片-e71f920aeb1e"
        target="_blank"
        rel="noreferrer"
      />
    ),
  },
  blog: {
    writerPlan: (
      <a href="https://medium.com/@apppeterpan/ios-app-開發作家養成計畫-f6eea56c5f4d" target="_blank" rel="noreferrer" />
    ),
  },
  ai: {},
  mentoring: {
    oneOnOne: (
      <a
        href="https://medium.com/彼得潘的-swift-ios-app-開發教室/免費-1-小時的一對一-ios-app-開發討論-ee25d706f7b4"
        target="_blank"
        rel="noreferrer"
      />
    ),
    followUp: (
      <a
        href="https://medium.com/彼得潘的-swift-ios-app-開發教室/neverland-課程結束後陪你繼續寫-ios-app-47562dd5ac49"
        target="_blank"
        rel="noreferrer"
      />
    ),
  },
  tools: {
    portfolio: (
      <a
        href="https://medium.com/彼得潘的-swift-ios-app-開發教室/模仿-100-days-of-swift-製作自己的-app-畫面照片牆-be9c1581b44"
        target="_blank"
        rel="noreferrer"
      />
    ),
  },
}

export default function SwiftuiFeaturesPage() {
  const { t } = useTranslation('swiftui')

  return (
    <main className={styles.page}>
      <section className={styles.featuresSection}>
        <div className="container">
          <p className={styles.kicker}>{t('hero.kicker')}</p>
          <div className={styles.sectionHeader}>
            <h1 className={styles.title}>{t('sections.features.title')}</h1>
            <p className={styles.subtitle}>{t('sections.features.desc')}</p>
          </div>
          <div className={styles.featureGrid}>
            {featureIds.map((id) => (
              <article key={id} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{t(`featuresPage.items.${id}.title`)}</h3>
                <p className={styles.featureDesc}>
                  <Trans i18nKey={`featuresPage.items.${id}.desc`} t={t} components={componentsMap[id]} />
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
