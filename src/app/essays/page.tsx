'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { PaperCard, FadeInOnScroll } from '@components/common'
import styles from './page.module.css'

interface EssayItem {
  id: string
  titleKey: string
  descriptionKey: string
  date: string
  url: string
  image?: string
}

const ESSAYS: EssayItem[] = [
  {
    id: 'mac-choice',
    titleKey: 'items.macChoice.title',
    descriptionKey: 'items.macChoice.description',
    date: '2020/1/1',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E5%AD%B8%E7%BF%92%E9%96%8B%E7%99%BC-swift-ios-app-%E8%A9%B2%E8%B2%B7%E5%93%AA%E5%8F%B0-mac-%E5%91%A2-79b22c5d317a',
  },
  {
    id: 'medium-homework',
    titleKey: 'items.mediumHomework.title',
    descriptionKey: 'items.mediumHomework.description',
    date: '2019/12/5',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E6%89%BE%E5%88%B0-ios-app-%E5%B7%A5%E4%BD%9C%E7%9A%84%E6%AD%A3%E7%9B%B8%E9%97%9C%E6%A2%9D%E4%BB%B6-medium-%E7%9A%84-app-%E4%BD%9C%E6%A5%AD%E6%96%87%E7%AB%A0-5a4a523966eb',
  },
  {
    id: 'tech-girlz',
    titleKey: 'items.techGirlz.title',
    descriptionKey: 'items.techGirlz.description',
    date: '2019/7/27',
    url: 'https://www.tech-girlz.com/2019/07/ios-developer-peter-pan.html',
  },
  {
    id: 'career-switch',
    titleKey: 'items.careerSwitch.title',
    descriptionKey: 'items.careerSwitch.description',
    date: '2019/4/25',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E9%9D%9E%E6%9C%AC%E7%A7%91%E5%A6%82%E4%BD%95%E5%9C%A8%E5%B9%BE%E5%80%8B%E6%9C%88%E5%85%A7%E8%BD%89%E8%81%B7%E5%B7%A5%E7%A8%8B%E5%B8%AB-%E4%B8%80%E9%80%B1-40-%E5%B0%8F%E6%99%82%E7%9A%84%E7%B7%B4%E7%BF%92-ebacb8b704af',
  },
  {
    id: 'after-get-job',
    titleKey: 'items.afterGetJob.title',
    descriptionKey: 'items.afterGetJob.description',
    date: '2018/12/4',
    url: 'https://medium.com/%e5%bd%bc%e5%be%97%e6%bd%98%e7%9a%84-swift-ios-app-%e9%96%8b%e7%99%bc%e6%95%99%e5%ae%a4/%e5%ad%b8%e4%ba%86%e7%a8%8b%e5%bc%8f%e6%89%be%e5%88%b0%e5%b7%a5%e4%bd%9c%e5%be%8c-%e6%98%af%e5%90%a6%e5%b0%b1%e5%83%8f%e7%8e%8b%e5%ad%90%e5%85%ac%e4%b8%bb-%e5%be%9e%e6%ad%a4%e9%81%8e%e8%91%97%e5%b9%b8%e7%a6%8f%e5%bf%ab%e6%a8%82%e7%9a%84%e6%97%a5%e5%ad%90-adb56bf04289',
  },
  {
    id: 'app-store',
    titleKey: 'items.appStore.title',
    descriptionKey: 'items.appStore.description',
    date: '2018/10/15',
    url: 'https://www.appcoda.com.tw/ios-app-submission/',
  },
  {
    id: 'homework-speed',
    titleKey: 'items.homeworkSpeed.title',
    descriptionKey: 'items.homeworkSpeed.description',
    date: '2018/8/19',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E7%82%BA%E4%BB%80%E9%BA%BC%E5%85%B6%E4%BB%96%E5%90%8C%E5%AD%B8%E7%A8%8B%E5%BC%8F%E4%BD%9C%E6%A5%AD%E5%AF%AB%E9%82%A3%E9%BA%BC%E5%BF%AB-%E6%98%AF%E4%B8%8D%E6%98%AF%E6%88%91%E5%A4%AA%E5%BC%B1%E5%91%A2-269925a51a52',
  },
  {
    id: 'xcode-10-preview',
    titleKey: 'items.xcode10.title',
    descriptionKey: 'items.xcode10.description',
    date: '2018/6/18',
    url: 'https://www.appcoda.com.tw/xcode-10/',
  },
  {
    id: 'not-suited',
    titleKey: 'items.notSuited.title',
    descriptionKey: 'items.notSuited.description',
    date: '2018/5/1',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E5%B8%B8%E5%B8%B8%E6%83%B3%E4%B8%8D%E5%87%BA%E4%BE%86-%E6%98%AF%E4%B8%8D%E6%98%AF%E8%87%AA%E5%B7%B1%E4%B8%8D%E9%81%A9%E5%90%88%E5%AF%AB%E7%A8%8B%E5%BC%8F%E5%91%A2-a7b4fbeba9e4',
  },
  {
    id: 'push-notification',
    titleKey: 'items.pushNotification.title',
    descriptionKey: 'items.pushNotification.description',
    date: '2018/3/12',
    url: 'https://www.appcoda.com.tw/push-notification/',
  },
  {
    id: 'better-swift',
    titleKey: 'items.betterSwift.title',
    descriptionKey: 'items.betterSwift.description',
    date: '2017/9/5',
    url: 'https://www.appcoda.com.tw/write-better-swift/',
  },
  {
    id: 'learn-after-30',
    titleKey: 'items.learnAfter30.title',
    descriptionKey: 'items.learnAfter30.description',
    date: '2017/8/19',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E8%B6%85%E9%81%8E-30-%E6%AD%B2-%E9%96%8B%E5%A7%8B%E5%AD%B8%E7%A8%8B%E5%BC%8F%E4%BE%86%E5%BE%97%E5%8F%8A%E5%97%8E-cc7d3af772af',
  },
  {
    id: 'xcode-9',
    titleKey: 'items.xcode9.title',
    descriptionKey: 'items.xcode9.description',
    date: '2017/6/9',
    url: 'https://www.appcoda.com.tw/xcode9/',
  },
  {
    id: 'appcoda-interview',
    titleKey: 'items.appcodaInterview.title',
    descriptionKey: 'items.appcodaInterview.description',
    date: '2017/5/14',
    url: 'http://www.appcoda.com.tw/peter-pan-ios-developer-interview/',
  },
  {
    id: 'swift-optional',
    titleKey: 'items.swiftOptional.title',
    descriptionKey: 'items.swiftOptional.description',
    date: '2017/4/10',
    url: 'http://www.appcoda.com.tw/swift-optional-intro/',
  },
  {
    id: 'error-handling',
    titleKey: 'items.errorHandling.title',
    descriptionKey: 'items.errorHandling.description',
    date: '2017/2/23',
    url: 'http://www.appcoda.com.tw/swift-error-handling/',
  },
  {
    id: 'ios-faq-1',
    titleKey: 'items.iosFaq1.title',
    descriptionKey: 'items.iosFaq1.description',
    date: '2017/1/24',
    url: 'https://blog.alphacamp.co/2017/01/24/ios-app-development-faq1/',
  },
  {
    id: 'ios-startup-13',
    titleKey: 'items.iosStartup13.title',
    descriptionKey: 'items.iosStartup13.description',
    date: '2017/1/19',
    url: 'http://www.slideshare.net/deeplovepan/ios-app-13',
  },
  {
    id: 'learning-tips',
    titleKey: 'items.learningTips.title',
    descriptionKey: 'items.learningTips.description',
    date: '2016/11/17',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E6%8E%8C%E6%8F%A1%E5%85%AB%E5%80%8B%E9%87%8D%E9%BB%9E-%E8%AE%93%E4%BD%A0%E4%B8%8A%E8%AA%B2%E5%AD%B8%E7%A8%8B%E5%BC%8F%E6%9B%B4%E6%9C%89%E6%95%88-47ccdc793bc8',
  },
  {
    id: 'ios10-notifications',
    titleKey: 'items.ios10Notifications.title',
    descriptionKey: 'items.ios10Notifications.description',
    date: '2016/8/26',
    url: 'http://www.appcoda.com.tw/ios10-user-notifications/',
  },
  {
    id: 'learn-programming',
    titleKey: 'items.learnProgramming.title',
    descriptionKey: 'items.learnProgramming.description',
    date: '2016/8/4',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E9%82%A3%E4%BA%9B%E5%B9%B4%E6%88%91%E5%80%91%E5%AD%B8%E4%B8%8D%E6%9C%83%E7%9A%84%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88-b647b2de5980',
  },
  {
    id: 'swift-without-mac',
    titleKey: 'items.swiftWithoutMac.title',
    descriptionKey: 'items.swiftWithoutMac.description',
    date: '2016/6/22',
    url: 'https://blog.alphacamp.co/2016/06/22/how-to-learn-swift-without-mac/',
  },
  {
    id: 'swift-3',
    titleKey: 'items.swift3.title',
    descriptionKey: 'items.swift3.description',
    date: '2016/5/26',
    url: 'https://blog.alphacamp.co/2016/05/26/swift-3/',
  },
  {
    id: 'ios-qa-10',
    titleKey: 'items.iosQa10.title',
    descriptionKey: 'items.iosQa10.description',
    date: '2016/3/11',
    url: 'https://medium.com/@apppeterpan/%E9%97%9C%E6%96%BCios-app%E9%96%8B%E7%99%BC%E7%9A%84%E5%8D%81%E5%80%8Bq-a-65833f6eb993',
  },
  {
    id: 'teaching-benefits',
    titleKey: 'items.teachingBenefits.title',
    descriptionKey: 'items.teachingBenefits.description',
    date: '2015/12/11',
    url: 'https://blog.alphacamp.co/2015/12/11/teaching-is-the-best-way-to-be-a-good-app-developer/',
  },
  {
    id: 'little-prince-app',
    titleKey: 'items.littlePrince.title',
    descriptionKey: 'items.littlePrince.description',
    date: '2015/11/9',
    url: 'https://blog.alphacamp.co/2015/11/09/the-little-prince-will-teach-you-how-to-develop-your-first-app/',
  },
  {
    id: 'class-or-self',
    titleKey: 'items.classOrSelf.title',
    descriptionKey: 'items.classOrSelf.description',
    date: '2015/8/10',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/app-%E6%80%8E%E9%BA%BC%E5%AD%B8-%E4%B8%8A%E8%AA%B2%E9%82%84%E6%98%AF%E8%87%AA%E5%AD%B8-db3d9314ac89',
  },
  {
    id: 'world-helps',
    titleKey: 'items.worldHelps.title',
    descriptionKey: 'items.worldHelps.description',
    date: '2015/7/27',
    url: 'https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E7%95%B6%E4%BD%A0%E5%8A%AA%E5%8A%9B%E6%83%B3%E5%AD%B8%E7%BF%92-swift-%E6%99%82-%E5%85%A8%E4%B8%96%E7%95%8C%E9%83%BD%E6%9C%83%E4%BE%86%E5%B9%AB%E4%BD%A0-b11dca643686',
  },
  {
    id: 'app-learning-tips',
    titleKey: 'items.appLearningTips.title',
    descriptionKey: 'items.appLearningTips.description',
    date: '2014/12/23',
    url: 'https://blog.alphacamp.co/2014/12/23/beautiful-app-life/',
  },
]

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function EssaysPage() {
  const { t } = useTranslation()

  return (
    <div className={styles.essaysPage}>
      <div className="container">
        <FadeInOnScroll direction="up">
          <header className={styles.header}>
            <h1 className={styles.title}>{t('essays.mainTitle')}</h1>
            <p className={styles.subtitle}>{t('essays.subtitle')}</p>
            <a
              href="https://medium.com/@apppeterpan/%E5%BD%BC%E5%BE%97%E6%BD%98%E5%92%8C-ios-app-%E7%9A%84%E9%82%A3%E4%BA%9B%E5%B9%B4%E6%95%A3%E6%96%87%E9%9B%86-4794cc6b753c"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.featureLink}
            >
              <span>{t('essays.featureLink')}</span>
              <ExternalLinkIcon className={styles.featureIcon} />
            </a>
          </header>
        </FadeInOnScroll>

        <section className={styles.essaysList}>
          {ESSAYS.map((essay, index) => (
            <FadeInOnScroll
              key={essay.id}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 60}
              duration={180}
            >
              <PaperCard
                tapeColor={index % 2 === 0 ? 'green' : 'yellow'}
                tapePosition="top-left"
                tapeRotation={index % 2 === 0 ? -2 : 2}
                hover
              >
                <article className={styles.essayCard}>
                  <div className={styles.essayContent}>
                    <div className={styles.imageWrapper}>
                      {essay.image ? (
                        <Image
                          src={essay.image}
                          alt={t(`essays.${essay.titleKey}`)}
                          width={320}
                          height={240}
                          className={styles.essayImage}
                        />
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <span className={styles.placeholderLabel}>{t('essays.placeholder')}</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.essayInfo}>
                      <p className={styles.essayDate}>{essay.date}</p>
                      <h2 className={styles.essayTitle}>
                        {t(`essays.${essay.titleKey}`)}
                      </h2>
                      <p className={styles.essayDescription}>
                        {t(`essays.${essay.descriptionKey}`)}
                      </p>
                      <a
                        href={essay.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ctaButton}
                      >
                        {t('essays.readMore')}
                        <ExternalLinkIcon className={styles.ctaIcon} />
                      </a>
                    </div>
                  </div>
                </article>
              </PaperCard>
            </FadeInOnScroll>
          ))}
        </section>
      </div>
    </div>
  )
}
