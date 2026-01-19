'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@constants/navigation'
import { SITE_URL } from '../../app/metadata'

export function BreadcrumbJsonLd() {
  const pathname = usePathname()

  const breadcrumb = useMemo(() => {
    const current = NAV_ITEMS.find((item) => item.path === pathname)
    if (!current) return null

    const items = [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首頁',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: current.label,
        item: new URL(current.path, SITE_URL).toString(),
      },
    ]

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    }
  }, [pathname])

  if (!breadcrumb) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
    />
  )
}
