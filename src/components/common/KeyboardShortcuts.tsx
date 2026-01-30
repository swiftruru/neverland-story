'use client'

import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import styles from './KeyboardShortcuts.module.css'

/**
 * 鍵盤快捷鍵提供者
 * 啟用全站快捷鍵並提供說明彈窗
 */
export function KeyboardShortcuts() {
  const { t } = useTranslation()
  const [showHelp, setShowHelp] = useState(false)

  const handleHelpRequest = useCallback(() => {
    setShowHelp((prev) => !prev)
  }, [])

  const handleClose = useCallback(() => {
    setShowHelp(false)
  }, [])

  // 啟用鍵盤導航
  useKeyboardNavigation({
    enableScrollKeys: !showHelp, // 彈窗開啟時停用捲動快捷鍵
    scrollDistance: 150,
    enableHomeEnd: !showHelp,
    onHelpRequest: handleHelpRequest,
  })

  // ESC 關閉彈窗
  useEffect(() => {
    if (!showHelp) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [showHelp, handleClose])

  if (!showHelp) return null

  return (
    <div className={styles.overlay} onClick={handleClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          aria-label={t('common.close', '關閉')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className={styles.title}>{t('a11y.keyboardShortcuts', '鍵盤快捷鍵')}</h2>

        <div className={styles.shortcuts}>
          <div className={styles.group}>
            <h3 className={styles.groupTitle}>{t('a11y.navigation', '導航')}</h3>
            <ul className={styles.list}>
              <li>
                <kbd>j</kbd>
                <span>{t('a11y.scrollDown', '向下捲動')}</span>
              </li>
              <li>
                <kbd>k</kbd>
                <span>{t('a11y.scrollUp', '向上捲動')}</span>
              </li>
              <li>
                <kbd>Home</kbd>
                <span>{t('a11y.goToTop', '回到頂部')}</span>
              </li>
              <li>
                <kbd>End</kbd>
                <span>{t('a11y.goToBottom', '跳至底部')}</span>
              </li>
            </ul>
          </div>

          <div className={styles.group}>
            <h3 className={styles.groupTitle}>{t('a11y.general', '一般')}</h3>
            <ul className={styles.list}>
              <li>
                <kbd>?</kbd>
                <span>{t('a11y.showShortcuts', '顯示快捷鍵說明')}</span>
              </li>
              <li>
                <kbd>Esc</kbd>
                <span>{t('a11y.closeDialog', '關閉彈窗')}</span>
              </li>
              <li>
                <kbd>Tab</kbd>
                <span>{t('a11y.nextElement', '下一個元素')}</span>
              </li>
              <li>
                <kbd>Shift</kbd> + <kbd>Tab</kbd>
                <span>{t('a11y.prevElement', '上一個元素')}</span>
              </li>
            </ul>
          </div>
        </div>

        <p className={styles.hint}>{t('a11y.pressEscToClose', '按 Esc 關閉')}</p>
      </div>
    </div>
  )
}
