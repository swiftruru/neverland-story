import Script from 'next/script'

export interface ReviewItem {
  author: string
  reviewBody: string
}

interface ReviewJsonLdProps {
  itemName: string
  itemType?: 'Course' | 'Product' | 'Organization'
  itemUrl: string
  reviews: ReviewItem[]
}

/**
 * Review Schema 結構化資料元件
 * 用於學員見證頁面，幫助 Google 顯示評價資訊
 * @see https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 */
export function ReviewJsonLd({ itemName, itemType = 'Course', itemUrl, reviews }: ReviewJsonLdProps) {
  if (!reviews.length) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': itemType,
    name: itemName,
    url: itemUrl,
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewBody: review.reviewBody,
    })),
  }

  return (
    <Script
      id="review-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
