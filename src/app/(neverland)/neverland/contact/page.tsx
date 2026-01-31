'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { PaperCard, FadeInOnScroll } from '@components/common'
import { useToast } from '@/contexts/ToastContext'
import styles from './page.module.css'

// 聯絡方式資料
interface ContactLink {
  id: string
  icon: string
  url?: string
  copyValue?: string
}

const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'facebook',
    icon: 'facebook',
    url: 'https://www.facebook.com/deeplove.pan',
  },
  {
    id: 'fanpage',
    icon: 'facebook',
    url: 'https://www.facebook.com/iphone.peterpan/',
  },
  {
    id: 'linePersonal',
    icon: 'line',
    copyValue: 'deeplovepeterpan',
  },
  {
    id: 'lineOfficial',
    icon: 'line',
    copyValue: '@puy0405e',
  },
  {
    id: 'emailBusiness',
    icon: 'email',
    url: 'mailto:peterpan@p207.app',
    copyValue: 'peterpan@p207.app',
  },
  {
    id: 'emailPersonal',
    icon: 'email',
    url: 'mailto:apppeterpan@gmail.com',
    copyValue: 'apppeterpan@gmail.com',
  },
  {
    id: 'medium',
    icon: 'medium',
    url: 'https://medium.com/@apppeterpan',
  },
  {
    id: 'instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/deeplovepeter/',
    copyValue: 'deeplovepeter',
  },
  {
    id: 'slideshare',
    icon: 'slideshare',
    url: 'http://www.slideshare.net/deeplovepan',
  },
  {
    id: 'linkedin',
    icon: 'linkedin',
    url: 'https://www.linkedin.com/in/apppeterpan',
  },
  {
    id: 'itsAllAboutApp',
    icon: 'github',
    url: "https://github.com/AppPeterPan/It-s-all-about-App/wiki/It's-all-about-App",
  },
]

// SVG 圖標組件
function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    case 'line':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      )
    case 'email':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      )
    case 'check':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      )
    case 'medium':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 6.5h3.2l4.7 9.6 4.2-7.6 4.7 7.6V7.1L22 6.5v11l-3 .6v-6.2l-4.5 7.6h-.7L8.9 9.8v8.3l2.6.6v.8H2.9v-.8l2.1-.6V7.1L2 6.5z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5zm4.25-3.1a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
        </svg>
      )
    case 'slideshare':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.5 6.2a3.3 3.3 0 1 1-3.3 3.3 3.3 3.3 0 0 1 3.3-3.3zm9 0a3.3 3.3 0 1 1-3.3 3.3 3.3 3.3 0 0 1 3.3-3.3zm-9.1 7.4c2.3 0 4.2 1.9 4.2 4.2V21H3.3v-3.2c0-2.3 1.9-4.2 4.1-4.2zm9.2 0c2.3 0 4.2 1.9 4.2 4.2V21h-8.3v-3.2c0-2.3 1.9-4.2 4.1-4.2z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.9-1.9 3.9-1.9 4.2 0 5 2.7 5 6.2V21h-4v-5.2c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.6V21H9z" />
        </svg>
      )
    case 'github':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.36-1.2-3.36-1.2-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.9 1.52 2.36 1.08 2.94.83.1-.66.35-1.08.63-1.33-2.22-.26-4.56-1.12-4.56-5a3.9 3.9 0 0 1 1.03-2.7 3.6 3.6 0 0 1 .1-2.66s.84-.27 2.75 1.03a9.3 9.3 0 0 1 5 0c1.92-1.3 2.76-1.03 2.76-1.03.54 1.34.2 2.33.1 2.66a3.9 3.9 0 0 1 1.03 2.7c0 3.9-2.35 4.74-4.6 5 .36.3.68.9.68 1.83v2.7c0 .27.18.6.69.48A10 10 0 0 0 12 2z" />
        </svg>
      )
    default:
      return null
  }
}

// 複製按鈕組件
function CopyButton({
  text,
  label,
  copiedLabel,
  onCopied,
}: {
  text: string
  label: string
  copiedLabel: string
  onCopied?: () => void
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      onCopied?.()
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 靜默失敗
    }
  }

  return (
    <button
      type="button"
      className={`${styles.actionButtonSecondary} ${copied ? styles.copied : ''}`}
      onClick={handleCopy}
      disabled={copied}
    >
      {copied ? (
        <>
          <Icon name="check" className={styles.checkIcon} />
          {copiedLabel}
        </>
      ) : (
        label
      )}
    </button>
  )
}

export default function ContactPage() {
  const { t } = useTranslation('neverland')
  const { success, error } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCopy = () => {
    success(t('pages.contact.copied'))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    success(t('pages.contact.form.sending'))

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append('access_key', 'cdf36c24-830b-4074-8f19-e7d3221fbd3b')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        success(t('pages.contact.form.success'))
        form.reset()
      } else {
        error(t('pages.contact.form.error'))
      }
    } catch {
      error(t('pages.contact.form.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.contactPage}>
      <div className="container">
        <FadeInOnScroll direction="up">
          <header className={styles.header}>
            <h1 className={styles.title}>{t('pages.contact.mainTitle')}</h1>
            <p className={styles.subtitle}>{t('pages.contact.subtitle')}</p>
            <p className={styles.note}>
              {t('pages.contact.note')}{' '}
              <a
                href="http://iosappanswer.strikingly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {t('pages.contact.qaColumn')}
              </a>
            </p>
          </header>
        </FadeInOnScroll>

        <section className={styles.contactGrid}>
          {CONTACT_LINKS.map((contact, index) => (
            <FadeInOnScroll
              key={contact.id}
              direction="up"
              delay={index * 80}
            >
              <PaperCard
                tapeColor={contact.id.includes('email') || contact.id.includes('line') ? 'green' : 'yellow'}
                tapePosition="top-left"
                tapeRotation={-3}
                hover
              >
                <div className={styles.contactCard}>
                  <div className={`${styles.iconWrapper} ${styles[contact.icon]}`}>
                    <Icon name={contact.icon} className={styles.icon} />
                  </div>
                  <h3 className={styles.contactName}>{t(`pages.contact.${contact.id}`)}</h3>
                  {contact.copyValue && (
                    <p className={styles.contactValue}>{contact.copyValue}</p>
                  )}
                  <div className={styles.actions}>
                    {contact.url && (
                      <a
                        href={contact.url}
                        {...(contact.url.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                        className={styles.actionButton}
                      >
                        {contact.url.startsWith('mailto:') ? t('pages.contact.sendEmail') : t('pages.contact.visit')}
                      </a>
                    )}
                    {contact.copyValue && (
                      <CopyButton
                        text={contact.copyValue}
                        label={t('pages.contact.copy')}
                        copiedLabel={t('pages.contact.copied')}
                        onCopied={handleCopy}
                      />
                    )}
                  </div>
                </div>
              </PaperCard>
            </FadeInOnScroll>
          ))}
        </section>

        <FadeInOnScroll direction="up" delay={80}>
          <PaperCard tapeColor="green" tapePosition="top-left" tapeRotation={-2}>
            <div className={styles.formCard}>
              <div className={styles.formIntro}>
                <h2 className={styles.formTitle}>{t('pages.contact.form.title')}</h2>
                <p className={styles.formDescription}>{t('pages.contact.form.subtitle')}</p>
              </div>
              <form className={styles.web3Form} onSubmit={onSubmit}>
                <div className={styles.formRow}>
                  <label className={styles.label}>
                    {t('pages.contact.form.name')}
                    <input name="name" type="text" required placeholder={t('pages.contact.form.namePlaceholder')} />
                  </label>
                  <label className={styles.label}>
                    {t('pages.contact.form.email')}
                    <input name="email" type="email" required placeholder={t('pages.contact.form.emailPlaceholder')} />
                  </label>
                </div>
                <label className={styles.label}>
                  {t('pages.contact.form.message')}
                  <textarea name="message" rows={4} required placeholder={t('pages.contact.form.messagePlaceholder')} />
                </label>
                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('pages.contact.form.sending') : t('pages.contact.form.submit')}
                  </button>
                </div>
              </form>
            </div>
          </PaperCard>
        </FadeInOnScroll>
      </div>
    </div>
  )
}
