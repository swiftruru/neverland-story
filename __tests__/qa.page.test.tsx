import { render, screen } from '@testing-library/react'
import QAPage from '../src/app/qa/page'

describe('Q&A page', () => {
  it('renders FAQ JSON-LD and all article cards', () => {
    const { container } = render(<QAPage />)

    // FAQ schema
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
    const json = JSON.parse(script?.textContent || '{}')
    expect(json['@type']).toBe('FAQPage')
    expect(json.mainEntity).toHaveLength(6)

    // Article cards / links
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(6)
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    })
  })
})
