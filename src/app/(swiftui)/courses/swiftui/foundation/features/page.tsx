'use client'

import { useTranslation } from 'react-i18next'
import styles from '../page.module.css'

type Feature = {
  id: string
  title: string
  desc: JSX.Element
}

export default function SwiftuiFeaturesPage() {
  const { t } = useTranslation('swiftui')

  const features: Feature[] = [
    {
      id: 'from-zero',
      title: '從零開始學程式，一步一步慢慢教',
      desc: (
        <>
          像
          <a href="https://medium.com/@apppeterpan/彼得潘的課程主題曲-蝸牛改編-89a99c3a2712" target="_blank" rel="noreferrer">
            蝸牛
          </a>
          一樣，一步一步往上爬，帶著你從無到有創作出自己的 App。
        </>
      ),
    },
    {
      id: 'live',
      title: '線上直播和無期限觀看錄影複習',
      desc: (
        <>
          提供線上直播，在家裡也可以上課。直播畫面清晰、課後錄影可無期限重播，隨時複習每個細節。
        </>
      ),
    },
    {
      id: 'ta',
      title: '課程助教：LINE 私訊問問題和課前課後解惑',
      desc: (
        <>
          <a
            href="https://medium.com/@apppeterpan/swift-ios-app-課程的-line-私訊和課前課後談心解惑-af70202bf948"
            target="_blank"
            rel="noreferrer"
          >
            可透過 LINE 私訊與課前課後談心解惑
          </a>
          ，遇到問題卡關有人可問，課後也持續支援。
        </>
      ),
    },
    {
      id: 'apps',
      title: '開發十個完整的 App',
      desc: <>從無到有打造十個以上生動有趣的 App，累積成長軌跡。</>,
    },
    {
      id: 'tech',
      title: '最新技術：Swift、Xcode、SwiftUI、iOS SDK',
      desc: (
        <>
          使用最新技術讓學習更順暢，參考
          <a
            href="https://medium.com/彼得潘的-swift-ios-app-開發教室/當你努力想學習-swift-時-全世界都會來幫你-b11dca643686"
            target="_blank"
            rel="noreferrer"
          >
            Swift 學習心得
          </a>
          ，少走冤枉路。
        </>
      ),
    },
    {
      id: 'funny',
      title: '幽默風趣的教學',
      desc: (
        <>
          生動教學搭配冷笑話，讓你輕鬆領悟開發心法，可參考
          <a href="https://medium.com/@apppeterpan/以幽默風趣的程式教學為己任-f69d7dad8d6f" target="_blank" rel="noreferrer">
            學生心得
          </a>
          。
        </>
      ),
    },
    {
      id: 'assignments',
      title: '精心設計的課堂練習和課後作業',
      desc: (
        <>
          精美教材與作業提升動力，感謝
          <a href="https://medium.com/@apppeterpan/精心設計的課堂練習和課後作業-b2ff1199e70c" target="_blank" rel="noreferrer">
            設計師合作
          </a>
          與
          <a href="https://medium.com/@apppeterpan/參考模仿學長姐的-ios-app-作業-感謝同學們精心繪製的圖片-e71f920aeb1e" target="_blank" rel="noreferrer">
            學長姐分享
          </a>
          ，讓你做出想分享的美美 App。
        </>
      ),
    },
    {
      id: 'blog',
      title: 'Blog 分享記錄學習 App 開發的成長',
      desc: (
        <>
          模仿 100 Days of Swift，透過 Blog 記錄成長。延伸閱讀「
          <a href="https://medium.com/@apppeterpan/ios-app-開發作家養成計畫-f6eea56c5f4d" target="_blank" rel="noreferrer">
            iOS App 開發作家養成計畫
          </a>
          」。
        </>
      ),
    },
    {
      id: 'ai',
      title: '結合 AI 教學和學習',
      desc: (
        <>
          善用 Xcode、Claude、ChatGPT、Gemini、Copilot、Cursor、Grok 等 AI 助教，解題、出作業、debug、重構、注解一次搞定。
        </>
      ),
    },
    {
      id: 'mentoring',
      title: '免費 1 小時一對一 & 課後每週諮詢',
      desc: (
        <>
          免費 1 小時討論開發/上架/求職/模擬面試，課後每週歡迎持續討論。詳見
          <a
            href="https://medium.com/彼得潘的-swift-ios-app-開發教室/免費-1-小時的一對一-ios-app-開發討論-ee25d706f7b4"
            target="_blank"
            rel="noreferrer"
          >
            一對一討論
          </a>
          與
          <a
            href="https://medium.com/彼得潘的-swift-ios-app-開發教室/neverland-課程結束後陪你繼續寫-ios-app-47562dd5ac49"
            target="_blank"
            rel="noreferrer"
          >
            課程未完待續
          </a>
          。
        </>
      ),
    },
    {
      id: 'tools',
      title: '學習業界開發合作工具',
      desc: (
        <>
          使用 GitHub、Medium、GitHub Pages、CakeResume 打造
          <a
            href="https://medium.com/彼得潘的-swift-ios-app-開發教室/模仿-100-days-of-swift-製作自己的-app-畫面照片牆-be9c1581b44"
            target="_blank"
            rel="noreferrer"
          >
            App 作品集
          </a>
          與履歷，熟悉協作流程。
        </>
      ),
    },
  ]

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
            {features.map((item) => (
              <article key={item.id} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{item.title}</h3>
                <p className={styles.featureDesc}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
