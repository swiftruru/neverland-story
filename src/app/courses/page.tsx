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
          <Image
            src={course.image}
            alt={t(`courses.${course.titleKey}`)}
            width={600}
            height={375}
            className={styles.modalImage}
          />
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
                delay={index * 100}
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
                        <Image
                          src={course.image}
                          alt={t(`courses.${course.titleKey}`)}
                          width={400}
                          height={250}
                          className={styles.courseImage}
                        />
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
