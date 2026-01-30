'use client'

import Script from 'next/script'

type CourseJsonLdProps = {
  name: string
  description: string
  provider: string
  url: string
  image?: string
  duration?: string
  language?: string
}

export function CourseJsonLd({
  name,
  description,
  provider,
  url,
  image,
  duration,
  language = 'zh-TW',
}: CourseJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Person',
      name: provider,
      url: 'https://p207.app/neverland',
    },
    url,
    ...(image && { image }),
    ...(duration && {
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        duration,
        inLanguage: language,
      },
    }),
    inLanguage: language,
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <Script
      id="course-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
