import { render } from '@testing-library/react'
import { BreadcrumbJsonLd } from '../src/components/common/BreadcrumbJsonLd'

jest.mock('next/navigation', () => ({
  usePathname: () => '/ferryman',
}))

describe('BreadcrumbJsonLd', () => {
  it('renders breadcrumb JSON-LD for current nav item', () => {
    const { container } = render(<BreadcrumbJsonLd />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
    const json = JSON.parse(script?.textContent || '{}')
    expect(json['@type']).toBe('BreadcrumbList')
    expect(json.itemListElement).toHaveLength(2)
    expect(json.itemListElement[0]).toEqual(
      expect.objectContaining({
        position: 1,
        name: '首頁',
      })
    )
    expect(json.itemListElement[1]).toEqual(
      expect.objectContaining({
        position: 2,
        name: '金牌擺渡人',
      })
    )
  })
})
