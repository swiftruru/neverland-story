import { buildMetadata } from '../src/app/metadata'

describe('buildMetadata', () => {
  it('產生含 OG/Twitter 與 canonical 的完整 metadata', () => {
    const metadata = buildMetadata({
      title: '測試頁面',
      description: '測試描述',
      path: '/sample',
    })

    expect(metadata.title).toBe('測試頁面 | 彼得潘的 iOS App 程式設計入門')
    expect(metadata.description).toBe('測試描述')
    expect(metadata.openGraph?.url).toBe('https://neverland.swift.moe/sample')
    expect(metadata.openGraph?.images?.[0]).toEqual(
      expect.objectContaining({
        url: '/og-cover.png',
        width: 1200,
        height: 630,
      })
    )
    expect(metadata.twitter?.card).toBe('summary_large_image')
    expect(metadata.alternates?.canonical).toBe('https://neverland.swift.moe/sample')
  })
})
