import Script from 'next/script'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQJsonLdProps {
  items: FAQItem[]
}

/**
 * FAQ Schema 結構化資料元件
 * 用於 Q&A 頁面，幫助 Google 在搜尋結果顯示常見問題
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
export function FAQJsonLd({ items }: FAQJsonLdProps) {
  if (!items.length) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
