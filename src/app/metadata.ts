import type { Metadata } from 'next'

export const SITE_NAME = '彼得潘的 iOS App 程式設計入門'
export const SITE_DESCRIPTION = '彼得潘的 iOS App 程式設計入門 - Neverland Story'

// 站點來源與子路徑，可透過環境變數覆蓋，方便同一份程式部署到不同子站
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://p207.app'
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/neverland'
export const ASSET_BASE = BASE_PATH

type MetadataInput = {
  title?: string
  description?: string
  path?: string
}

const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`)

export function withBasePath(path: string) {
  const normalized = normalizePath(path || '/')
  const base = BASE_PATH === '/' ? '' : BASE_PATH.replace(/\/+$/, '')
  return `${base}${normalized}`.replace(/\/+/g, '/')
}

export function assetPath(path: string) {
  const clean = path.startsWith('/') ? path.slice(1) : path
  const base = ASSET_BASE === '/' ? '' : ASSET_BASE.replace(/\/+$/, '')
  return `${base}/${clean}`.replace(/\/+/g, '/')
}

export function buildAbsoluteUrl(path: string) {
  const pathname = withBasePath(path)
  return new URL(pathname, SITE_URL).toString()
}

export function buildMetadata({ title, description, path = '/' }: MetadataInput): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const pageDescription = description || SITE_DESCRIPTION
  const url = buildAbsoluteUrl(path)

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: 'Neverland Story',
      images: [
        {
          url: buildAbsoluteUrl('/og-cover.png'),
          width: 1200,
          height: 630,
          alt: 'Neverland Story',
        },
      ],
      locale: 'zh_TW',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [buildAbsoluteUrl('/og-cover.png')],
    },
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': url,
      },
    },
  }
}
