import { buildMetadata, SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '../src/app/metadata'

describe('buildMetadata', () => {
  it('產生含 OG/Twitter 與 canonical 的完整 metadata', () => {
    const metadata = buildMetadata({
      title: '測試頁面',
      description: '測試描述',
      path: '/sample',
    })

    expect(metadata.title).toBe('測試頁面 | 彼得潘的 iOS App 程式設計入門')
    expect(metadata.description).toBe('測試描述')
    expect(metadata.openGraph?.url).toBe('https://p207.app/neverland/sample')
    expect(metadata.openGraph?.images?.[0]).toEqual(
      expect.objectContaining({
        url: 'https://p207.app/neverland/og-cover.png',
        width: 1200,
        height: 630,
      })
    )
    expect(metadata.twitter?.card).toBe('summary_large_image')
    expect(metadata.alternates?.canonical).toBe('https://p207.app/neverland/sample')
  })

  it('使用預設值時回傳站點資訊', () => {
    const metadata = buildMetadata({})
    expect(metadata.title).toBe('彼得潘的 iOS App 程式設計入門')
    expect(metadata.description).toBe('彼得潘的 iOS App 程式設計入門 - Neverland Story')
    expect(metadata.openGraph?.url).toBe('https://p207.app/neverland/')
  })

  it('可覆寫描述與路徑為根目錄', () => {
    const metadata = buildMetadata({ description: '自訂描述', path: '/' })
    expect(metadata.description).toBe('自訂描述')
    expect(metadata.alternates?.canonical).toBe('https://p207.app/neverland/')
  })

  it('多語言 alternate 至少包含 zh-TW', () => {
    const metadata = buildMetadata({ path: '/videos' })
    expect(metadata.alternates?.languages?.['zh-TW']).toBe('https://p207.app/neverland/videos')
  })

  it('站點常數皆存在', () => {
    expect(SITE_NAME).toBeTruthy()
    expect(SITE_DESCRIPTION).toBeTruthy()
    expect(SITE_URL).toBeTruthy()
  })
})
