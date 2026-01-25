'use client'

import { Trans, useTranslation } from 'react-i18next'
import styles from '../page.module.css'

type FeatureItem = {
  id: string
  title: string
  body: string[]
}

const tapePalette = [
  { top: '#f4e5aa', bottom: '#f1d778' }, // yellow
  { top: '#c8e7c7', bottom: '#b4dcb0' }, // green
]

export default function SwiftFeaturesPage() {
  const { t } = useTranslation('swift')
  const items = t('featuresPage.items', { returnObjects: true }) as FeatureItem[]

  const getLink = (id: string, slot: 'link1' | 'link2' | 'link3') => {
    const links: Record<string, Record<string, string>> = {
      tech: { link1: 'https://medium.com/彼得潘的-swift-ios-app-開發教室/當你努力想學習-swift-時-全世界都會來幫你-b11dca643686' },
      apps: { link1: 'https://medium.com/@apppeterpan/你出力寫-app-我出錢請飲料-6a9ac14a2a22' },
      ta: { link1: 'https://medium.com/@apppeterpan/swift-ios-app-課程的-line-私訊和課前課後談心解惑-af70202bf948' },
      humor: { link1: 'https://medium.com/@apppeterpan/以幽默風趣的程式教學為己任-f69d7dad8d6f' },
      practice: {
        link1: 'https://medium.com/彼得潘的試煉-勇者的-100-道-swift-ios-app-謎題',
        link2: 'https://medium.com/@apppeterpan/精心設計的課堂練習和課後作業-b2ff1199e70c',
        link3: 'https://medium.com/@apppeterpan/參考模仿學長姐的-ios-app-作業-感謝同學們精心繪製的圖片-e71f920aeb1e',
      },
      blog: { link1: 'https://medium.com/@apppeterpan/ios-app-開發作家養成計畫-f6eea56c5f4d' },
      exam: { link1: 'https://medium.com/彼得潘的試煉-勇者的-100-道-swift-ios-app-謎題/180-適合新手練習串接的-rest-api-ef027d4fc066' },
      workshop: {
        link1: 'https://medium.com/彼得潘的-swift-ios-app-開發教室/永不結束的作業-4a4c74968120',
        link2: 'http://advancedios.strikingly.com/',
      },
      tools: {
        link1: 'https://medium.com/彼得潘的-swift-ios-app-開發問題解答集/使用-github-pages-架設網站初體驗-c434956dbb92',
        link2: 'https://medium.com/彼得潘的-swift-ios-app-開發教室/模仿-100-days-of-swift-製作自己的-app-畫面照片牆-be9c1581b44',
      },
    }
    return links[id]?.[slot] || '#'
  }

  return (
    <main className={styles.page}>
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>{t('hero.kicker')}</p>
            <h1 className={styles.title}>{t('featuresPage.heading')}</h1>
            <p className={styles.subtitle}>{t('featuresPage.desc')}</p>
          </div>

          <div className={styles.featureGrid}>
            {items.map((item, idx) => {
              const palette = tapePalette[idx % tapePalette.length]
              return (
                <article
                  key={idx}
                  className={styles.featureCard}
                  style={
                    {
                      '--tape-top': palette.top,
                      '--tape-bottom': palette.bottom,
                      '--tape-rotation': `${idx % 2 === 0 ? -3 : 3}deg`,
                    } as React.CSSProperties
                  }
                >
                  <h3 className={styles.sectionTitle}>{item.title}</h3>
                  <div className={styles.sectionDesc}>
                    {item.body.map((_, pIdx) => (
                      <p key={pIdx}>
                        <Trans
                          ns="swift"
                          i18nKey={`featuresPage.items.${idx}.body.${pIdx}`}
                          components={{
                            link1: (
                              <a href={getLink(item.id, 'link1')} target="_blank" rel="noopener noreferrer" />
                            ),
                            link2: (
                              <a href={getLink(item.id, 'link2')} target="_blank" rel="noopener noreferrer" />
                            ),
                            link3: (
                              <a href={getLink(item.id, 'link3')} target="_blank" rel="noopener noreferrer" />
                            ),
                          }}
                        />
                      </p>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
