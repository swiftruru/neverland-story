import Script from 'next/script'

interface PersonJsonLdProps {
  name: string
  url: string
  image?: string
  jobTitle?: string
  description?: string
  sameAs?: string[]
}

/**
 * Person Schema 結構化資料元件
 * 用於講師或人物頁面，幫助 Google 識別人物資訊
 * @see https://developers.google.com/search/docs/appearance/structured-data/person
 */
export function PersonJsonLd({
  name,
  url,
  image,
  jobTitle,
  description,
  sameAs,
}: PersonJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url,
    ...(image && { image }),
    ...(jobTitle && { jobTitle }),
    ...(description && { description }),
    ...(sameAs?.length && { sameAs }),
  }

  return (
    <Script
      id="person-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
