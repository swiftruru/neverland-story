'use client'

import { useState, useCallback, useEffect } from 'react'
import type { KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import styles from './ZoomImage.module.css'

interface ZoomImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function ZoomImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: ZoomImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isZoomed) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isZoomed])

  const openZoom = useCallback(() => {
    setIsZoomed(true)
  }, [])

  const closeZoom = useCallback(() => {
    setIsZoomed(false)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeZoom()
      }
    },
    [closeZoom]
  )

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={openZoom}
        aria-label={`點擊放大 ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
        />
        <span className={styles.zoomIcon} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        </span>
      </button>

      {isMounted &&
        isZoomed &&
        createPortal(
          <div
            className={styles.overlay}
            onClick={closeZoom}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            tabIndex={-1}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeZoom}
              aria-label="關閉"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className={styles.imageWrapper}>
              <Image
                src={src}
                alt={alt}
                width={width * 3}
                height={height * 3}
                className={styles.zoomedImage}
                priority
              />
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
