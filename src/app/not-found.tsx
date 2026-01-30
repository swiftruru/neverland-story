'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import styles from './not-found.module.css'

// 熱門頁面連結
const POPULAR_LINKS = [
  { href: '/courses/swift/advanced', icon: '🍎', key: 'swift' },
  { href: '/courses/swiftui/foundation', icon: '📱', key: 'swiftui' },
  { href: '/courses/flutter/advanced', icon: '💙', key: 'flutter' },
  { href: '/neverland', icon: '✨', key: 'neverland' },
]

// URL 對應建議
const URL_SUGGESTIONS: Record<string, { path: string; key: string }> = {
  swift: { path: '/courses/swift/advanced', key: 'swift' },
  ios: { path: '/courses/swift/advanced', key: 'swift' },
  swiftui: { path: '/courses/swiftui/foundation', key: 'swiftui' },
  flutter: { path: '/courses/flutter/advanced', key: 'flutter' },
  dart: { path: '/courses/flutter/advanced', key: 'flutter' },
  course: { path: '/courses', key: 'courses' },
  courses: { path: '/courses', key: 'courses' },
  about: { path: '/neverland', key: 'neverland' },
  contact: { path: '/neverland/contact', key: 'contact' },
  gallery: { path: '/neverland/gallery', key: 'gallery' },
}

// 根據 URL 取得智慧推薦（優先匹配較長的關鍵字）
function getSuggestion(pathname: string): { path: string; key: string } | null {
  const pathLower = pathname.toLowerCase()
  // 依關鍵字長度排序，優先匹配較長的（例如 swiftui 優先於 swift）
  const sortedEntries = Object.entries(URL_SUGGESTIONS).sort(
    ([a], [b]) => b.length - a.length
  )
  for (const [keyword, suggestion] of sortedEntries) {
    if (pathLower.includes(keyword)) {
      return suggestion
    }
  }
  return null
}

export default function NotFound() {
  const { t, ready } = useTranslation('common')
  const [isClient, setIsClient] = useState(false)
  const [suggestion, setSuggestion] = useState<{ path: string; key: string } | null>(null)

  useEffect(() => {
    setIsClient(true)
    // 使用 window.location.pathname 而非 usePathname，避免 404 context 問題
    if (typeof window !== 'undefined') {
      setSuggestion(getSuggestion(window.location.pathname))
    }
  }, [])

  // 等待 i18n 和客戶端準備好
  if (!isClient || !ready) {
    return null
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.paper}>
          <span className={styles.tape} />
          <div className={styles.paperContent}>
            <h1 className={styles.errorCode}>{t('notFound.code')}</h1>
            <div className={styles.divider} />
            <h2 className={styles.title}>{t('notFound.title')}</h2>
            <p className={styles.description}>
              {t('notFound.description')}
              <br />
              {t('notFound.descriptionSub')}
            </p>

            {/* 智慧建議 */}
            {suggestion && (
              <div className={styles.suggestion}>
                <p className={styles.suggestionText}>
                  {t('notFound.didYouMean')}
                </p>
                <Link href={suggestion.path} className={styles.suggestionLink}>
                  {t(`notFound.suggestions.${suggestion.key}`)}
                  <svg viewBox="0 0 20 20" fill="currentColor" className={styles.suggestionArrow}>
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            )}

            <div className={styles.actions}>
              <Link href="/" className={styles.primaryButton}>
                <span className={styles.buttonIcon}>←</span>
                {t('notFound.backHome')}
              </Link>
              <Link href="/neverland" className={styles.secondaryButton}>
                {t('notFound.exploreNeverland')}
              </Link>
            </div>
          </div>
        </div>

        {/* 熱門頁面連結 */}
        <div className={styles.popularSection}>
          <h3 className={styles.popularTitle}>{t('notFound.popularTitle')}</h3>
          <div className={styles.popularLinks}>
            {POPULAR_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.popularLink}>
                <span className={styles.popularIcon}>{link.icon}</span>
                <span className={styles.popularText}>
                  {t(`notFound.popular.${link.key}`)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.decoration}>
          <svg className={styles.leaf} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
        </div>
      </div>
    </main>
  )
}
