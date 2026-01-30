import Script from 'next/script'

interface OrganizationJsonLdProps {
  name: string
  url: string
  logo?: string
  description?: string
  sameAs?: string[]
  contactPoint?: {
    contactType: string
    email?: string
    url?: string
  }
}

/**
 * Organization Schema 結構化資料元件
 * 用於網站品牌識別，幫助 Google 顯示知識面板
 * @see https://developers.google.com/search/docs/appearance/structured-data/organization
 */
export function OrganizationJsonLd({
  name,
  url,
  logo,
  description,
  sameAs,
  contactPoint,
}: OrganizationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description }),
    ...(sameAs?.length && { sameAs }),
    ...(contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: contactPoint.contactType,
        ...(contactPoint.email && { email: contactPoint.email }),
        ...(contactPoint.url && { url: contactPoint.url }),
      },
    }),
  }

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
