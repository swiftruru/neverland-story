'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import styles from './FadeInOnScroll.module.css'

interface FadeInOnScrollProps {
  children: ReactNode
  /** 動畫方向 */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** 延遲時間（毫秒） */
  delay?: number
  /** 動畫持續時間（毫秒） */
  duration?: number
  /** 觸發閾值（0-1，元素進入視窗的比例） */
  threshold?: number
  /** 位移距離（像素） */
  distance?: number
  /** 是否只觸發一次 */
  once?: boolean
  /** 額外的 className */
  className?: string
}

export function FadeInOnScroll({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  distance = 30,
  once = true,
  className = '',
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, once])

  const directionClass = styles[direction] || ''

  return (
    <div
      ref={ref}
      className={`${styles.fadeIn} ${directionClass} ${isVisible ? styles.visible : ''} ${className}`}
      style={{
        '--fade-delay': `${delay}ms`,
        '--fade-duration': `${duration}ms`,
        '--fade-distance': `${distance}px`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

// 批量動畫包裝器：子元素依序進場
interface StaggerContainerProps {
  children: ReactNode
  /** 每個子元素之間的延遲（毫秒） */
  staggerDelay?: number
  /** 動畫方向 */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** 基礎延遲（毫秒） */
  baseDelay?: number
  /** 額外的 className */
  className?: string
}

export function StaggerContainer({
  children,
  staggerDelay = 100,
  direction = 'up',
  baseDelay = 0,
  className = '',
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.staggerContainer} ${className}`}
      style={{
        '--stagger-delay': `${staggerDelay}ms`,
        '--stagger-direction': direction,
        '--stagger-base-delay': `${baseDelay}ms`,
      } as React.CSSProperties}
      data-visible={isVisible}
    >
      {children}
    </div>
  )
}

// 簡化版：直接包裝列表項目
interface FadeInListProps {
  children: ReactNode[]
  /** 每個子元素之間的延遲（毫秒） */
  staggerDelay?: number
  /** 動畫方向 */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** 基礎延遲（毫秒） */
  baseDelay?: number
  /** 額外的 className */
  className?: string
}

export function FadeInList({
  children,
  staggerDelay = 100,
  direction = 'up',
  baseDelay = 0,
  className = '',
}: FadeInListProps) {
  return (
    <>
      {children.map((child, index) => (
        <FadeInOnScroll
          key={index}
          direction={direction}
          delay={baseDelay + index * staggerDelay}
          className={className}
        >
          {child}
        </FadeInOnScroll>
      ))}
    </>
  )
}
