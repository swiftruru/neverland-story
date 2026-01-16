'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { Skeleton } from './Skeleton'
import styles from './LazyImage.module.css'

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  /** 佔位圖類型 */
  placeholder?: 'skeleton' | 'blur' | 'none'
  /** 自訂模糊佔位圖（base64 或 URL） */
  blurDataURL?: string
  /** 是否優先載入（用於 above-the-fold 圖片） */
  priority?: boolean
  /** 圖片適應模式 */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  /** 點擊事件 */
  onClick?: () => void
  /** 骨架屏變體 */
  skeletonVariant?: 'rectangular' | 'rounded'
}

// 生成簡單的模糊佔位圖 SVG（使用 btoa 代替 Buffer 以支援 client 端）
function generateBlurSVG(width: number, height: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><filter id="b" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="20"/></filter><rect width="100%" height="100%" fill="#e6f2ef"/><rect width="100%" height="100%" fill="#d4cfc2" filter="url(#b)" opacity="0.5"/></svg>`
  if (typeof window === 'undefined') {
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
  }
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'skeleton',
  blurDataURL,
  priority = false,
  objectFit = 'cover',
  onClick,
  skeletonVariant = 'rectangular',
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoaded(true)
  }, [])

  // 使用 Next.js 內建的 blur placeholder
  const useNativeBlur = placeholder === 'blur' && !priority

  // 生成模糊佔位圖
  const blurPlaceholder = blurDataURL || generateBlurSVG(width, height)

  if (hasError) {
    return (
      <div
        className={`${styles.errorPlaceholder} ${className}`}
        style={{ width, height }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span>載入失敗</span>
      </div>
    )
  }

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ width, height }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Skeleton 佔位 */}
      {placeholder === 'skeleton' && !isLoaded && (
        <Skeleton
          variant={skeletonVariant}
          width="100%"
          height="100%"
          animation="wave"
          className={styles.skeleton}
        />
      )}

      {/* 圖片 */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${styles.image} ${isLoaded ? styles.imageLoaded : ''}`}
        style={{ objectFit }}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        {...(useNativeBlur
          ? {
              placeholder: 'blur',
              blurDataURL: blurPlaceholder,
            }
          : {})}
      />
    </div>
  )
}

// 可點擊放大的 LazyImage
interface ZoomableLazyImageProps extends Omit<LazyImageProps, 'onClick'> {
  onZoom?: () => void
}

export function ZoomableLazyImage({
  onZoom,
  className = '',
  ...props
}: ZoomableLazyImageProps) {
  return (
    <div className={`${styles.zoomableWrapper} ${className}`}>
      <LazyImage
        {...props}
        onClick={onZoom}
        className={styles.zoomableImage}
      />
      <span className={styles.zoomHint} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      </span>
    </div>
  )
}
