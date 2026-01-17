'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { PaperCard, FadeInOnScroll } from '@components/common'
import styles from './page.module.css'

// 講座課程資料類型
interface Course {
  id: string
  titleKey: string
  dateKey: string
  descriptionKey: string
  image: string
  url?: string
}

// 講座課程資料
const COURSES: Course[] = [
  {
    id: 'swift-ios-app',
    titleKey: 'swiftIosApp.title',
    dateKey: 'swiftIosApp.date',
    descriptionKey: 'swiftIosApp.description',
    image: '/courses/swift-ios-app.png',
    url: 'https://swiftpeterpan.mystrikingly.com/',
  },
  {
    id: 'swiftui-beginner',
    titleKey: 'swiftuiBeginner.title',
    dateKey: 'swiftuiBeginner.date',
    descriptionKey: 'swiftuiBeginner.description',
    image: '/courses/swiftui-beginner.png',
    url: 'https://learniosfromzero.mystrikingly.com/',
  },
  {
    id: 'ntou-swiftui',
    titleKey: 'ntouSwiftui.title',
    dateKey: 'ntouSwiftui.date',
    descriptionKey: 'ntouSwiftui.description',
    image: '/courses/ntou-swiftui.png',
  },
  {
    id: 'flutter-intro',
    titleKey: 'flutterIntro.title',
    dateKey: 'flutterIntro.date',
    descriptionKey: 'flutterIntro.description',
    image: '/courses/flutter-intro.png',
  },
  {
    id: 'ntou-flutter',
    titleKey: 'ntouFlutter.title',
    dateKey: 'ntouFlutter.date',
    descriptionKey: 'ntouFlutter.description',
    image: '/courses/ntou-flutter.png',
  },
  {
    id: 'ntou-python',
    titleKey: 'ntouPython.title',
    dateKey: 'ntouPython.date',
    descriptionKey: 'ntouPython.description',
    image: '/courses/ntou-python.png',
  },
  {
    id: 'flutter-cross-platform',
    titleKey: 'flutterCrossPlatform.title',
    dateKey: 'flutterCrossPlatform.date',
    descriptionKey: 'flutterCrossPlatform.description',
    image: '/courses/flutter-cross-platform.png',
    url: 'https://flutterapp.mystrikingly.com/',
  },
  {
    id: 'apcs-aiot-camp',
    titleKey: 'apcsAiotCamp.title',
    dateKey: 'apcsAiotCamp.date',
    descriptionKey: 'apcsAiotCamp.description',
    image: '/courses/apcs-aiot-camp.png',
    url: 'https://www.chtti.cht.com.tw/general/course_info.jsp?activity_id=599',
  },
  {
    id: 'youth-ios-training',
    titleKey: 'youthIosTraining.title',
    dateKey: 'youthIosTraining.date',
    descriptionKey: 'youthIosTraining.description',
    image: '/courses/youth-ios-training.png',
  },
  {
    id: 'ntou-swiftui-game',
    titleKey: 'ntouSwiftuiGame.title',
    dateKey: 'ntouSwiftuiGame.date',
    descriptionKey: 'ntouSwiftuiGame.description',
    image: '/courses/ntou-swiftui-game.png',
  },
  {
    id: 'ios-rest-api',
    titleKey: 'iosRestApi.title',
    dateKey: 'iosRestApi.date',
    descriptionKey: 'iosRestApi.description',
    image: '/courses/ios-rest-api.png',
    url: 'https://iosrestapiapp.mystrikingly.com/',
  },
  {
    id: 'first-swiftui-app',
    titleKey: 'firstSwiftuiApp.title',
    dateKey: 'firstSwiftuiApp.date',
    descriptionKey: 'firstSwiftuiApp.description',
    image: '/courses/first-swiftui-app.png',
    url: 'https://firstiosswiftuiapp.mystrikingly.com/',
  },
  {
    id: 'christmas-gift-app',
    titleKey: 'christmasGiftApp.title',
    dateKey: 'christmasGiftApp.date',
    descriptionKey: 'christmasGiftApp.description',
    image: '/courses/christmas-gift-app.png',
    url: 'http://swiftuichristmasgift.mystrikingly.com/',
  },
  {
    id: 'app-dev-swift-book',
    titleKey: 'appDevSwiftBook.title',
    dateKey: 'appDevSwiftBook.date',
    descriptionKey: 'appDevSwiftBook.description',
    image: '/courses/app-dev-swift-book.png',
    url: 'https://swiftappworkshop3.mystrikingly.com/',
  },
  {
    id: 'swiftui-ebook',
    titleKey: 'swiftuiEbook.title',
    dateKey: 'swiftuiEbook.date',
    descriptionKey: 'swiftuiEbook.description',
    image: '/courses/swiftui-ebook.png',
    url: 'https://swiftuibook.mystrikingly.com/',
  },
  {
    id: 'yahoo-training',
    titleKey: 'yahooTraining.title',
    dateKey: 'yahooTraining.date',
    descriptionKey: 'yahooTraining.description',
    image: '/courses/yahoo-training.png',
  },
  {
    id: 'wwdc19-workshop',
    titleKey: 'wwdc19Workshop.title',
    dateKey: 'wwdc19Workshop.date',
    descriptionKey: 'wwdc19Workshop.description',
    image: '/courses/wwdc19-workshop.png',
    url: 'https://swiftappworkshop4.mystrikingly.com/',
  },
  {
    id: 'tic-tac-toe',
    titleKey: 'ticTacToe.title',
    dateKey: 'ticTacToe.date',
    descriptionKey: 'ticTacToe.description',
    image: '/courses/tic-tac-toe.png',
    url: 'https://swiftappworkshop2.mystrikingly.com/',
  },
  {
    id: 'swift-recursive-iterative',
    titleKey: 'swiftRecursiveIterative.title',
    dateKey: 'swiftRecursiveIterative.date',
    descriptionKey: 'swiftRecursiveIterative.description',
    image: '/courses/swift-recursive-iterative.png',
    url: 'http://csproblemsinswift.strikingly.com/',
  },
  {
    id: 'programming-beginner-talk',
    titleKey: 'programmingBeginnerTalk.title',
    dateKey: 'programmingBeginnerTalk.date',
    descriptionKey: 'programmingBeginnerTalk.description',
    image: '/courses/programming-beginner-talk.png',
    url: 'https://howtocodeforbeginners.mystrikingly.com/',
  },
  {
    id: 'swift-programming-intro',
    titleKey: 'swiftProgrammingIntro.title',
    dateKey: 'swiftProgrammingIntro.date',
    descriptionKey: 'swiftProgrammingIntro.description',
    image: '/courses/swift-programming-intro.png',
    url: 'http://learnswift.strikingly.com/',
  },
  {
    id: 'auto-layout-stack-view',
    titleKey: 'autoLayoutStackView.title',
    dateKey: 'autoLayoutStackView.date',
    descriptionKey: 'autoLayoutStackView.description',
    image: '/courses/auto-layout-stack-view.png',
    url: 'http://autolayout.strikingly.com/',
  },
  {
    id: 'musickit-love-song',
    titleKey: 'musickitLoveSong.title',
    dateKey: 'musickitLoveSong.date',
    descriptionKey: 'musickitLoveSong.description',
    image: '/courses/musickit-love-song.png',
  },
  {
    id: 'liberal-arts-first-app',
    titleKey: 'liberalArtsFirstApp.title',
    dateKey: 'liberalArtsFirstApp.date',
    descriptionKey: 'liberalArtsFirstApp.description',
    image: '/courses/liberal-arts-first-app.png',
    url: 'http://learniosappfirsttime.strikingly.com/',
  },
  {
    id: 'ios-app-wizard-free',
    titleKey: 'iosAppWizardFree.title',
    dateKey: 'iosAppWizardFree.date',
    descriptionKey: 'iosAppWizardFree.description',
    image: '/courses/ios-app-wizard-free.png',
    url: 'http://learniosapp.strikingly.com/',
  },
  {
    id: 'ntu-cs-x-mobile',
    titleKey: 'ntuCsXMobile.title',
    dateKey: 'ntuCsXMobile.date',
    descriptionKey: 'ntuCsXMobile.description',
    image: '/courses/ntu-cs-x-mobile.png',
    url: 'https://ceiba.ntu.edu.tw/course/db36f6/',
  },
  {
    id: 'wwdc17-xcode9-swift4',
    titleKey: 'wwdc17Xcode9Swift4.title',
    dateKey: 'wwdc17Xcode9Swift4.date',
    descriptionKey: 'wwdc17Xcode9Swift4.description',
    image: '/courses/wwdc17-xcode9-swift4.png',
    url: 'http://wwdc17peterpan.strikingly.com/',
  },
  {
    id: 'nccu-swift-ios',
    titleKey: 'nccuSwiftIos.title',
    dateKey: 'nccuSwiftIos.date',
    descriptionKey: 'nccuSwiftIos.description',
    image: '/courses/nccu-swift-ios.png',
    url: 'https://medium.com/@apppeterpan/%E6%94%BF%E5%A4%A7%E5%8D%97%E9%A2%A8%E5%9B%9B%E9%87%8D%E5%A5%8F%E7%9A%84-ios-app-%E9%96%8B%E7%99%BC%E8%88%87-swift-%E7%A8%8B%E5%BC%8F%E8%AA%9E%E6%B3%95-2cb31c62362e',
  },
  {
    id: 'fcu-one-song-app',
    titleKey: 'fcuOneSongApp.title',
    dateKey: 'fcuOneSongApp.date',
    descriptionKey: 'fcuOneSongApp.description',
    image: '/courses/fcu-one-song-app.png',
    url: 'https://medium.com/@apppeterpan/%E9%80%A2%E7%94%B2%E5%A4%A7%E5%AD%B8%E7%B5%A6%E6%88%91%E4%B8%80%E9%A6%96%E6%AD%8C%E7%9A%84%E6%99%82%E9%96%93%E5%81%9A-app-331d88339158',
  },
  {
    id: 'dessert-app-experience',
    titleKey: 'dessertAppExperience.title',
    dateKey: 'dessertAppExperience.date',
    descriptionKey: 'dessertAppExperience.description',
    image: '/courses/dessert-app-experience.png',
    url: 'http://blesseddessertapp.strikingly.com/',
  },
  {
    id: 'ntu-startup-challenge-workshop',
    titleKey: 'ntuStartupChallengeWorkshop.title',
    dateKey: 'ntuStartupChallengeWorkshop.date',
    descriptionKey: 'ntuStartupChallengeWorkshop.description',
    image: '/courses/ntu-startup-challenge-workshop.png',
    url: 'https://medium.com/@apppeterpan/%E5%8F%B0%E5%A4%A7%E5%89%B5%E5%89%B5%E6%8C%91%E6%88%B0%E8%B3%BD-ios-app-%E9%96%8B%E7%99%BC%E5%B7%A5%E4%BD%9C%E5%9D%8A-7700a22055fe',
  },
  {
    id: 'alpha-camp-ios-bootcamp',
    titleKey: 'alphaCampIosBootcamp.title',
    dateKey: 'alphaCampIosBootcamp.date',
    descriptionKey: 'alphaCampIosBootcamp.description',
    image: '/courses/alpha-camp-ios-bootcamp.png',
    url: 'https://www.alphacamp.co/bootcamp/ios-app-dev-bootcamp/',
  },
  {
    id: 'ios-app-startup-methods',
    titleKey: 'iosAppStartupMethods.title',
    dateKey: 'iosAppStartupMethods.date',
    descriptionKey: 'iosAppStartupMethods.description',
    image: '',
    url: 'https://medium.com/@apppeterpan/%E5%88%A9%E7%94%A8-ios-app-%E6%8A%80%E8%A1%93%E5%89%B5%E6%A5%AD%E7%9A%84-13-%E5%80%8B%E6%96%B9%E6%B3%95-5c7559bd0de5',
  },
  {
    id: 'first-handmade-ios-app',
    titleKey: 'firstHandmadeIosApp.title',
    dateKey: 'firstHandmadeIosApp.date',
    descriptionKey: 'firstHandmadeIosApp.description',
    image: '/courses/first-handmade-ios-app.png',
    url: 'http://firstiosapp.strikingly.com/',
  },
  {
    id: 'learn-code-from-zero',
    titleKey: 'learnCodeFromZero.title',
    dateKey: 'learnCodeFromZero.date',
    descriptionKey: 'learnCodeFromZero.description',
    image: '/courses/learn-code-from-zero.png',
    url: 'http://learncodefromzero.strikingly.com/',
  },
  {
    id: 'ncu-ios-app-intro',
    titleKey: 'ncuIosAppIntro.title',
    dateKey: 'ncuIosAppIntro.date',
    descriptionKey: 'ncuIosAppIntro.description',
    image: '',
  },
  {
    id: 'objc-to-swift',
    titleKey: 'objcToSwift.title',
    dateKey: 'objcToSwift.date',
    descriptionKey: 'objcToSwift.description',
    image: '/courses/objc-to-swift.png',
    url: 'http://objectivectoswift.strikingly.com/',
  },
  {
    id: 'girls-handmade-ios-app',
    titleKey: 'girlsHandmadeIosApp.title',
    dateKey: 'girlsHandmadeIosApp.date',
    descriptionKey: 'girlsHandmadeIosApp.description',
    image: '/courses/girls-handmade-ios-app.png',
    url: 'http://girlapp.strikingly.com/',
  },
  {
    id: 'ntmofa-magic-app',
    titleKey: 'ntmofaMagicApp.title',
    dateKey: 'ntmofaMagicApp.date',
    descriptionKey: 'ntmofaMagicApp.description',
    image: '',
    url: 'http://ntmofaiosapp.strikingly.com/',
  },
  {
    id: 'kkday-corporate-training',
    titleKey: 'kkdayCorporateTraining.title',
    dateKey: 'kkdayCorporateTraining.date',
    descriptionKey: 'kkdayCorporateTraining.description',
    image: '',
  },
  {
    id: 'college-ios-magic',
    titleKey: 'collegeIosMagic.title',
    dateKey: 'collegeIosMagic.date',
    descriptionKey: 'collegeIosMagic.description',
    image: '',
    url: 'http://collegelearnios.strikingly.com/',
  },
  {
    id: 'first-code-contact',
    titleKey: 'firstCodeContact.title',
    dateKey: 'firstCodeContact.date',
    descriptionKey: 'firstCodeContact.description',
    image: '',
    url: 'http://firstswiftcode.strikingly.com/',
  },
  {
    id: 'find-ios-deep-dive',
    titleKey: 'findIosDeepDive.title',
    dateKey: 'findIosDeepDive.date',
    descriptionKey: 'findIosDeepDive.description',
    image: '',
    url: 'https://www.find.org.tw/seminar_info.aspx?s=66',
  },
  {
    id: 'little-prince-ebook-app',
    titleKey: 'littlePrinceEbookApp.title',
    dateKey: 'littlePrinceEbookApp.date',
    descriptionKey: 'littlePrinceEbookApp.description',
    image: '',
    url: 'https://www.alphacamp.co/seminars/build-your-first-iphone-app/',
  },
  {
    id: 'stanford-ios-study-group',
    titleKey: 'stanfordIosStudyGroup.title',
    dateKey: 'stanfordIosStudyGroup.date',
    descriptionKey: 'stanfordIosStudyGroup.description',
    image: '',
  },
  {
    id: 'tcu-ios-app-intro',
    titleKey: 'tcuIosAppIntro.title',
    dateKey: 'tcuIosAppIntro.date',
    descriptionKey: 'tcuIosAppIntro.description',
    image: '',
  },
  {
    id: 'hk-ios-collaborative',
    titleKey: 'hkIosCollaborative.title',
    dateKey: 'hkIosCollaborative.date',
    descriptionKey: 'hkIosCollaborative.description',
    image: '',
  },
  {
    id: 'app-dream-journey',
    titleKey: 'appDreamJourney.title',
    dateKey: 'appDreamJourney.date',
    descriptionKey: 'appDreamJourney.description',
    image: '',
  },
  {
    id: 'first-coding-experience',
    titleKey: 'firstCodingExperience.title',
    dateKey: 'firstCodingExperience.date',
    descriptionKey: 'firstCodingExperience.description',
    image: '',
  },
  {
    id: 'build-app-for-love',
    titleKey: 'buildAppForLove.title',
    dateKey: 'buildAppForLove.date',
    descriptionKey: 'buildAppForLove.description',
    image: '',
  },
  {
    id: 'objc-programming',
    titleKey: 'objcProgramming.title',
    dateKey: 'objcProgramming.date',
    descriptionKey: 'objcProgramming.description',
    image: '',
  },
  {
    id: 'csu-ios-collaborative',
    titleKey: 'csuIosCollaborative.title',
    dateKey: 'csuIosCollaborative.date',
    descriptionKey: 'csuIosCollaborative.description',
    image: '',
  },
  {
    id: 'app-account-submission',
    titleKey: 'appAccountSubmission.title',
    dateKey: 'appAccountSubmission.date',
    descriptionKey: 'appAccountSubmission.description',
    image: '',
  },
  {
    id: 'ios7-sdk-bootcamp',
    titleKey: 'ios7SdkBootcamp.title',
    dateKey: 'ios7SdkBootcamp.date',
    descriptionKey: 'ios7SdkBootcamp.description',
    image: '',
  },
  {
    id: 'idea-to-app',
    titleKey: 'ideaToApp.title',
    dateKey: 'ideaToApp.date',
    descriptionKey: 'ideaToApp.description',
    image: '',
  },
  {
    id: 'mothers-day-app',
    titleKey: 'mothersDayApp.title',
    dateKey: 'mothersDayApp.date',
    descriptionKey: 'mothersDayApp.description',
    image: '',
  },
  {
    id: 'mobile-app-startup',
    titleKey: 'mobileAppStartup.title',
    dateKey: 'mobileAppStartup.date',
    descriptionKey: 'mobileAppStartup.description',
    image: '',
  },
  {
    id: 'music-becomes-app',
    titleKey: 'musicBecomesApp.title',
    dateKey: 'musicBecomesApp.date',
    descriptionKey: 'musicBecomesApp.description',
    image: '',
  },
]

// 箭頭圖標
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 日曆圖標
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

// 外部連結圖標
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

// 關閉圖標
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// 展開圖標
function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}

// 課程預設圖標（書本+程式碼）
function CourseDefaultIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2">
      {/* 書本 */}
      <path d="M10 15 L10 60 Q25 55 40 60 Q55 55 70 60 L70 15 Q55 20 40 15 Q25 20 10 15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 15 L40 60" strokeLinecap="round" />
      {/* 程式碼符號 */}
      <path d="M22 32 L16 38 L22 44" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58 32 L64 38 L58 44" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 28 L32 48" strokeLinecap="round" />
    </svg>
  )
}

// Modal 組件
function CourseModal({
  course,
  onClose,
  t,
}: {
  course: Course
  onClose: () => void
  t: (key: string) => string
}) {
  // 處理 ESC 鍵關閉
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const description = t(`courses.${course.descriptionKey}`)
  const hasDescription = description && description !== `courses.${course.descriptionKey}` && description !== ''

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className={styles.modalImageWrapper}>
          {course.image ? (
            <Image
              src={course.image}
              alt={t(`courses.${course.titleKey}`)}
              width={600}
              height={375}
              className={styles.modalImage}
            />
          ) : (
            <div className={styles.modalPlaceholder}>
              <CourseDefaultIcon className={styles.placeholderIcon} />
            </div>
          )}
        </div>

        <div className={styles.modalBody}>
          <h2 className={styles.modalTitle}>{t(`courses.${course.titleKey}`)}</h2>

          <div className={styles.modalDate}>
            <CalendarIcon className={styles.calendarIcon} />
            <span>{t(`courses.${course.dateKey}`)}</span>
          </div>

          {hasDescription && (
            <p className={styles.modalDescription}>{description}</p>
          )}

          {course.url && (
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.modalButton}
            >
              {t('courses.learnMore')}
              <ExternalLinkIcon className={styles.modalButtonIcon} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  const { t } = useTranslation()
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const openModal = useCallback((course: Course) => {
    setSelectedCourse(course)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedCourse(null)
  }, [])

  return (
    <div className={styles.coursesPage}>
      <div className="container">
        {/* Header */}
        <FadeInOnScroll direction="up">
          <header className={styles.header}>
            <h1 className={styles.title}>{t('courses.mainTitle')}</h1>
            <p className={styles.subtitle}>{t('courses.subtitle')}</p>

            {/* 完整課程清單連結 */}
            <a
              href="https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-ios-app-%E8%AA%B2%E7%A8%8B%E8%AC%9B%E5%BA%A7-abe64c7e39ac#.th7d9e93k"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fullListLink}
            >
              <span>{t('courses.fullList')}</span>
              <ExternalLinkIcon className={styles.externalIcon} />
            </a>
          </header>
        </FadeInOnScroll>

        {/* Courses Grid */}
        <section className={styles.coursesGrid}>
          {COURSES.map((course, index) => {
            const description = t(`courses.${course.descriptionKey}`)
            const hasDescription = description && description !== `courses.${course.descriptionKey}` && description !== ''

            return (
              <FadeInOnScroll
                key={course.id}
                direction="up"
                delay={(index % 3) * 50}
                duration={400}
              >
                <PaperCard
                  tapeColor={index % 2 === 0 ? 'green' : 'yellow'}
                  tapePosition="top-left"
                  tapeRotation={index % 2 === 0 ? -3 : 3}
                  hover
                >
                  <article className={styles.courseCard}>
                    <button
                      className={styles.cardClickArea}
                      onClick={() => openModal(course)}
                      aria-label={`${t('courses.viewDetails')} ${t(`courses.${course.titleKey}`)}`}
                    >
                      <div className={styles.imageWrapper}>
                        {course.image ? (
                          <Image
                            src={course.image}
                            alt={t(`courses.${course.titleKey}`)}
                            width={400}
                            height={250}
                            className={styles.courseImage}
                          />
                        ) : (
                          <div className={styles.imagePlaceholder}>
                            <CourseDefaultIcon className={styles.placeholderIcon} />
                          </div>
                        )}
                        <div className={styles.imageOverlay}>
                          <ExpandIcon className={styles.expandIcon} />
                        </div>
                      </div>
                    </button>

                    <div className={styles.courseContent}>
                      <h2
                        className={styles.courseTitleClickable}
                        onClick={() => openModal(course)}
                      >
                        {t(`courses.${course.titleKey}`)}
                      </h2>

                      <div className={styles.courseDate}>
                        <CalendarIcon className={styles.calendarIcon} />
                        <span>{t(`courses.${course.dateKey}`)}</span>
                      </div>

                      {hasDescription && (
                        <p className={styles.courseDescription}>
                          {description}
                        </p>
                      )}

                      <div className={styles.cardActions}>
                        <button
                          className={styles.viewDetailsButton}
                          onClick={() => openModal(course)}
                        >
                          {t('courses.viewDetails')}
                          <ExpandIcon className={styles.buttonIcon} />
                        </button>

                        {course.url && (
                          <a
                            href={course.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.learnMoreButton}
                          >
                            {t('courses.learnMore')}
                            <ArrowIcon className={styles.buttonArrow} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </PaperCard>
              </FadeInOnScroll>
            )
          })}
        </section>
      </div>

      {/* Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={closeModal}
          t={t}
        />
      )}
    </div>
  )
}
