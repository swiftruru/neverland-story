'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@constants/navigation'
import { buildAbsoluteUrl, withBasePath } from '../../app/metadata'

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
        item: buildAbsoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: current.label,
        item: buildAbsoluteUrl(current.path.replace(withBasePath('/'), '/') || '/'),
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
