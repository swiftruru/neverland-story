'use client'

import styles from './Skeleton.module.css'

interface SkeletonProps {
  /** 寬度，可為數字（px）或字串（如 '100%'） */
  width?: number | string
  /** 高度，可為數字（px）或字串 */
  height?: number | string
  /** 變體：text（文字行）、circular（圓形）、rectangular（矩形）、rounded（圓角矩形） */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  /** 是否啟用動畫 */
  animation?: 'pulse' | 'wave' | 'none'
  /** 額外的 className */
  className?: string
}

export function Skeleton({
  width,
  height,
  variant = 'text',
  animation = 'pulse',
  className = '',
}: SkeletonProps) {
  const style: React.CSSProperties = {}

  if (width !== undefined) {
    style.width = typeof width === 'number' ? `${width}px` : width
  }

  if (height !== undefined) {
    style.height = typeof height === 'number' ? `${height}px` : height
  }

  const variantClass = styles[variant] || ''
  const animationClass = animation !== 'none' ? styles[animation] : ''

  return (
    <span
      className={`${styles.skeleton} ${variantClass} ${animationClass} ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}

// 預設骨架屏組合：文字段落
interface SkeletonTextProps {
  lines?: number
  className?: string
}

export function SkeletonText({ lines = 3, className = '' }: SkeletonTextProps) {
  return (
    <div className={`${styles.textBlock} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  )
}

// 預設骨架屏組合：卡片
interface SkeletonCardProps {
  hasImage?: boolean
  imageHeight?: number
  className?: string
}

export function SkeletonCard({
  hasImage = true,
  imageHeight = 200,
  className = '',
}: SkeletonCardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      {hasImage && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={imageHeight}
          className={styles.cardImage}
        />
      )}
      <div className={styles.cardContent}>
        <Skeleton variant="text" width="70%" height={24} />
        <Skeleton variant="text" width="40%" height={16} />
        <SkeletonText lines={2} />
      </div>
    </div>
  )
}

// 預設骨架屏組合：圖片
interface SkeletonImageProps {
  width?: number | string
  height?: number | string
  className?: string
}

export function SkeletonImage({
  width = '100%',
  height = 200,
  className = '',
}: SkeletonImageProps) {
  return (
    <Skeleton
      variant="rectangular"
      width={width}
      height={height}
      animation="wave"
      className={className}
    />
  )
}

// 預設骨架屏組合：頭像
interface SkeletonAvatarProps {
  size?: number
  className?: string
}

export function SkeletonAvatar({ size = 48, className = '' }: SkeletonAvatarProps) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  )
}
