'use client'

import { useEffect } from 'react'

export function PwaProvider() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    const onLoad = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Ignore registration errors to avoid breaking the app.
      })
    }

    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return null
}
