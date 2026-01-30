'use client'

import { useEffect, useCallback } from 'react'

interface KeyboardNavigationOptions {
  /** 是否啟用 j/k 捲動 */
  enableScrollKeys?: boolean
  /** 捲動距離（像素） */
  scrollDistance?: number
  /** 是否啟用 Home/End 快捷鍵 */
  enableHomeEnd?: boolean
  /** 是否啟用 ? 顯示說明（需自行處理顯示邏輯） */
  onHelpRequest?: () => void
}

/**
 * 鍵盤導航 Hook
 * 提供 j/k 捲動、Home/End 跳轉等快捷鍵
 */
export function useKeyboardNavigation({
  enableScrollKeys = true,
  scrollDistance = 100,
  enableHomeEnd = true,
  onHelpRequest,
}: KeyboardNavigationOptions = {}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // 如果焦點在輸入框、文字區域或可編輯元素上，不觸發快捷鍵
      const target = e.target as HTMLElement
      const isEditable =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable

      if (isEditable) return

      // j/k 捲動
      if (enableScrollKeys) {
        if (e.key === 'j' && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault()
          window.scrollBy({ top: scrollDistance, behavior: 'smooth' })
        }
        if (e.key === 'k' && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault()
          window.scrollBy({ top: -scrollDistance, behavior: 'smooth' })
        }
      }

      // Home/End 跳轉
      if (enableHomeEnd) {
        if (e.key === 'Home' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        if (e.key === 'End' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }
      }

      // ? 顯示說明
      if (e.key === '?' && onHelpRequest) {
        e.preventDefault()
        onHelpRequest()
      }
    },
    [enableScrollKeys, scrollDistance, enableHomeEnd, onHelpRequest]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}

/**
 * 焦點陷阱 Hook
 * 用於 Modal/Dialog 內的焦點循環
 */
export function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab：如果在第一個元素，跳到最後一個
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab：如果在最後一個元素，跳到第一個
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    // 初始焦點設定到第一個可聚焦元素
    firstElement?.focus()

    container.addEventListener('keydown', handleKeyDown)
    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [containerRef, isActive])
}
