'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { withBasePath } from './metadata'

export default function RootRedirect() {
  const target = withBasePath('/')

  useEffect(() => {
    window.location.replace(target)
  }, [target])

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <p>即將為你導向 Neverland：</p>
        <Link href={target} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
          {target}
        </Link>
      </div>
    </main>
  )
}
