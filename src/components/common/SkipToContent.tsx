'use client'

import { useTranslation } from 'react-i18next'
import styles from './SkipToContent.module.css'

interface SkipToContentProps {
  /** 目標元素的 ID（不含 #） */
  targetId?: string
  /** 顯示的文字 */
  label?: string
}

export function SkipToContent({ targetId = 'main-content', label }: SkipToContentProps) {
  const { t } = useTranslation()
  const displayLabel = label || t('a11y.skipToContent', '跳至主要內容')

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.focus()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <a href={`#${targetId}`} className={styles.skipLink} onClick={handleClick}>
      {displayLabel}
    </a>
  )
}
