'use client'

import { useEffect, useRef } from 'react'
import styles from './ReadingProgress.module.css'

function getScrollProgress() {
  const doc = document.documentElement
  const scrollTop = doc.scrollTop || document.body.scrollTop
  const scrollHeight = doc.scrollHeight - doc.clientHeight
  if (scrollHeight <= 0) return 0
  return Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
}

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const update = () => {
      rafRef.current = null
      const progress = getScrollProgress()
      if (barRef.current) {
        barRef.current.style.setProperty('--progress', `${progress}%`)
      }
    }

    const scheduleUpdate = () => {
      if (rafRef.current !== null) return
      rafRef.current = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  return <div ref={barRef} className={styles.bar} aria-hidden="true" />
}
