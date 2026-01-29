'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { FadeInOnScroll, PaperCard } from '@components/common'
import styles from './page.module.css'

type Course = {
  id: string
  title: string
  description: string
  href: string
  image: string
  tags: string[]
}

export default function CoursesPage() {
  const { t } = useTranslation('common')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const rawCourses = t('coursesPage.courses', { returnObjects: true })
  const courses: Course[] = Array.isArray(rawCourses) ? rawCourses : []

  if (!isClient) {
    return null
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <p className={styles.kicker}>{t('coursesPage.kicker')}</p>
            <h1 className={styles.title}>{t('coursesPage.title')}</h1>
            <p className={styles.subtitle}>{t('coursesPage.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className={styles.coursesSection}>
        <div className="container">
          <div className={styles.coursesGrid}>
            {courses.map((course, index) => (
              <FadeInOnScroll key={course.id} direction="up" delay={index * 100}>
                <Link href={course.href} className={styles.courseLink}>
                  <PaperCard
                    tapeColor={index % 2 === 0 ? 'yellow' : 'green'}
                    tapePosition="top-left"
                    tapeRotation={-2}
                    hover
                  >
                    <article className={styles.courseCard}>
                      <div className={styles.courseImage}>
                        <img src={course.image} alt={course.title} />
                      </div>
                      <div className={styles.courseBody}>
                        <div className={styles.tags}>
                          {course.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className={styles.courseTitle}>{course.title}</h2>
                        <p className={styles.courseDescription}>{course.description}</p>
                        <span className={styles.viewCourse}>
                          {t('coursesPage.viewCourse')}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </article>
                  </PaperCard>
                </Link>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
