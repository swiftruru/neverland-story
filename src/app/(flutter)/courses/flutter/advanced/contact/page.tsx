'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PaperCard, FadeInOnScroll } from '@components/common'
import styles from '../page.module.css'

type ContactLink = {
  id: string
  icon: 'facebook' | 'line' | 'email'
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
    id: 'email',
    icon: 'email',
    url: 'mailto:apppeterpan@gmail.com',
    copyValue: 'apppeterpan@gmail.com',
  },
]

function Icon({ name, className }: { name: ContactLink['icon']; className?: string }) {
  switch (name) {
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    case 'line':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      )
    case 'email':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      )
    default:
      return null
  }
}

function CopyButton({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      className={`${styles.actionButtonSecondary} ${copied ? styles.copied : ''}`}
      onClick={handleCopy}
      disabled={copied}
    >
      {copied ? copiedLabel : label}
    </button>
  )
}

export default function FlutterContactPage() {
  const { t } = useTranslation('flutter')
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('sending')

    const formData = new FormData(event.currentTarget)
    formData.append('access_key', '4b672674-8caa-4cde-8b6e-3994d032f333')

    const form = event.currentTarget

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setFormStatus('success')
        form.reset()
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.contactHero}>
        <div className="container">
          <FadeInOnScroll direction="up">
            <div className={styles.kickerRowWrap}>
              <div className={styles.kickerRow}>
                <p className={`${styles.kicker} ${styles.kickerLeft}`}>{t('hero.kicker')}</p>
              </div>
            </div>
            <div className={styles.contactHeroContent}>
              <header className={styles.contactHeader}>
                <h1 className={styles.title}>{t('pages.contact.mainTitle')}</h1>
                <p className={styles.subtitle}>{t('pages.contact.subtitle')}</p>
              </header>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <section className={styles.contactGrid}>
            {CONTACT_LINKS.map((contact, index) => (
              <FadeInOnScroll key={contact.id} direction="up" delay={index * 80}>
                <PaperCard
                  tapeColor={index % 2 === 0 ? 'yellow' : 'green'}
                  tapePosition="top-left"
                  tapeRotation={-2}
                  hover
                >
                  <div className={styles.contactCard}>
                    <div className={`${styles.iconWrapper} ${styles[contact.icon]}`}>
                      <Icon name={contact.icon} className={styles.icon} />
                    </div>
                    <h3 className={styles.contactName}>{t(`pages.contact.${contact.id}`)}</h3>
                    {contact.copyValue && <p className={styles.contactValue}>{contact.copyValue}</p>}
                    <div className={styles.actions}>
                      {contact.url && (
                        <a
                          href={contact.url}
                          className={styles.actionButton}
                          {...(contact.url.startsWith('mailto:')
                            ? {}
                            : { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                          {contact.id === 'email' ? t('pages.contact.sendEmail') : t('pages.contact.visit')}
                        </a>
                      )}
                      {contact.copyValue && (
                        <CopyButton
                          text={contact.copyValue}
                          label={t('pages.contact.copy')}
                          copiedLabel={t('pages.contact.copied')}
                        />
                      )}
                    </div>
                  </div>
                </PaperCard>
              </FadeInOnScroll>
            ))}
          </section>
        </div>
      </section>

      <section className={`${styles.contactSection} ${styles.contactFormSection}`}>
        <div className="container">
          <FadeInOnScroll direction="up" delay={120}>
            <PaperCard tapeColor="green" tapePosition="top-left" tapeRotation={-2} hover={false}>
              <div className={styles.contactFormCard}>
                <div className={styles.contactFormHeader}>
                  <h2>{t('pages.contact.form.title')}</h2>
                  <p>{t('pages.contact.form.subtitle')}</p>
                </div>
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <label htmlFor="name">{t('pages.contact.form.name')}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={t('pages.contact.form.namePlaceholder')}
                      required
                    />
                  </div>
                  <div className={styles.formRow}>
                    <label htmlFor="email">{t('pages.contact.form.email')}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t('pages.contact.form.emailPlaceholder')}
                      required
                    />
                  </div>
                  <div className={styles.formRowFull}>
                    <label htmlFor="message">{t('pages.contact.form.message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder={t('pages.contact.form.messagePlaceholder')}
                      required
                    />
                  </div>
                  <div className={styles.formActions}>
                    <button type="submit" className={styles.submitButton} disabled={formStatus === 'sending'}>
                      {formStatus === 'sending'
                        ? t('pages.contact.form.sending')
                        : t('pages.contact.form.submit')}
                    </button>
                    {formStatus === 'success' && (
                      <span className={styles.formStatusSuccess}>{t('pages.contact.form.success')}</span>
                    )}
                    {formStatus === 'error' && (
                      <span className={styles.formStatusError}>{t('pages.contact.form.error')}</span>
                    )}
                  </div>
                </form>
              </div>
            </PaperCard>
          </FadeInOnScroll>
        </div>
      </section>
    </main>
  )
}
