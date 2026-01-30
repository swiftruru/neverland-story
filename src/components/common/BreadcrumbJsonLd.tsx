'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@constants/navigation'
import { buildAbsoluteUrl, withBasePath } from '../../app/metadata'

/**
 * 自動偵測路徑的麵包屑元件 (Client Component)
 * 用於 Neverland 頁面
 */
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

// ============================================
// Server-side Breadcrumb Component
// ============================================

export interface BreadcrumbItem {
  name: string
  url: string
}

interface StaticBreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

/**
 * 靜態麵包屑元件 (Server Component compatible)
 * 用於課程頁面，需要明確傳入麵包屑項目
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */
export function StaticBreadcrumbJsonLd({ items }: StaticBreadcrumbJsonLdProps) {
  if (!items.length) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
