import type { Metadata } from 'next'

export const SITE_NAME = '彼得潘的 iOS App 程式設計入門'
export const SITE_DESCRIPTION = '彼得潘的 iOS App 程式設計入門 - Neverland Story'
export const SITE_URL = 'https://neverland.swift.moe/'

type MetadataInput = {
  title?: string
  description?: string
  path?: string
}

export function buildMetadata({ title, description, path = '/' }: MetadataInput): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const pageDescription = description || SITE_DESCRIPTION
  const url = new URL(path, SITE_URL).toString()

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
          url: '/og-cover.png',
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
      images: ['/og-cover.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': url,
      },
    },
  }
}
