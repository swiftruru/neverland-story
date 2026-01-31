'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { haptic } from '@/utils/haptic'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration: number
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const DEFAULT_DURATION = 4000

/**
 * 產生唯一 ID
 */
function generateId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * 根據類型觸發觸覺回饋
 */
function triggerHaptic(type: ToastType) {
  switch (type) {
    case 'success':
      haptic('success')
      break
    case 'error':
      haptic('error')
      break
    case 'warning':
      haptic('warning')
      break
    case 'info':
      haptic('light')
      break
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = generateId()
      const newToast: Toast = {
        ...toast,
        id,
        duration: toast.duration ?? DEFAULT_DURATION,
      }

      // 觸發觸覺回饋
      triggerHaptic(newToast.type)

      setToasts((prev) => [...prev, newToast])

      // 設定自動消失
      if (newToast.duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, newToast.duration)
      }

      return id
    },
    [removeToast]
  )

  // 便捷方法
  const success = useCallback(
    (message: string, duration?: number) => {
      addToast({ type: 'success', message, duration: duration ?? DEFAULT_DURATION })
    },
    [addToast]
  )

  const error = useCallback(
    (message: string, duration?: number) => {
      addToast({ type: 'error', message, duration: duration ?? DEFAULT_DURATION })
    },
    [addToast]
  )

  const warning = useCallback(
    (message: string, duration?: number) => {
      addToast({ type: 'warning', message, duration: duration ?? DEFAULT_DURATION })
    },
    [addToast]
  )

  const info = useCallback(
    (message: string, duration?: number) => {
      addToast({ type: 'info', message, duration: duration ?? DEFAULT_DURATION })
    },
    [addToast]
  )

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

/**
 * 使用 Toast 功能的 Hook
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
