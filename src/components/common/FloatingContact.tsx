'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import styles from './FloatingContact.module.css'

// 聯絡方式圖標
function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6L12 13 2 6" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const CONTACT_LINKS = [
  {
    id: 'line',
    icon: LineIcon,
    url: 'https://line.me/ti/p/~deeplovepeterpan',
    color: '#06c755',
  },
  {
    id: 'email',
    icon: EmailIcon,
    url: 'mailto:apppeterpan@gmail.com',
    color: '#006850',
  },
  {
    id: 'facebook',
    icon: FacebookIcon,
    url: 'https://www.facebook.com/deeplove.pan',
    color: '#1877f2',
  },
]

export function FloatingContact() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const contactHref = pathname?.startsWith('/courses/swiftui')
    ? '/courses/swiftui/foundation/contact'
    : '/neverland/contact'

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }, [])

  return (
    <div
      className={styles.container}
      onKeyDown={handleKeyDown}
    >
      {/* 聯絡選項 */}
      <div className={`${styles.options} ${isOpen ? styles.optionsOpen : ''}`}>
        {CONTACT_LINKS.map((contact, index) => {
          const IconComponent = contact.icon
          const isMailto = contact.url.startsWith('mailto:')

          return (
            <a
              key={contact.id}
              href={contact.url}
              {...(isMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className={styles.optionButton}
              style={{
                '--contact-color': contact.color,
                '--delay': `${index * 50}ms`,
              } as React.CSSProperties}
              aria-label={t(`floatingContact.${contact.id}`)}
              title={t(`floatingContact.${contact.id}`)}
            >
              <IconComponent />
            </a>
          )
        })}

        {/* 聯絡頁面連結 */}
        <Link
          href={contactHref}
          className={styles.optionButton}
          style={{
            '--contact-color': '#006850',
            '--delay': `${CONTACT_LINKS.length * 50}ms`,
          } as React.CSSProperties}
          aria-label={t('floatingContact.allContacts')}
          title={t('floatingContact.allContacts')}
          onClick={() => setIsOpen(false)}
        >
          <span className={styles.moreText}>...</span>
        </Link>
      </div>

      {/* 主按鈕 */}
      <button
        type="button"
        className={`${styles.mainButton} ${isOpen ? styles.mainButtonOpen : ''}`}
        onClick={toggleOpen}
        aria-label={isOpen ? t('floatingContact.close') : t('floatingContact.open')}
        aria-expanded={isOpen}
      >
        <span className={styles.iconWrapper}>
          <span className={`${styles.icon} ${isOpen ? styles.iconHidden : ''}`}>
            <ContactIcon />
          </span>
          <span className={`${styles.icon} ${isOpen ? '' : styles.iconHidden}`}>
            <CloseIcon />
          </span>
        </span>
      </button>
    </div>
  )
}
