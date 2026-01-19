import { render, screen } from '@testing-library/react'
import FerrymanPage from '../src/app/ferryman/page'

describe('Ferryman page', () => {
  it('renders all service cards and CTAs with external links', () => {
    const { container } = render(<FerrymanPage />)

    // 6 service cards should render
    const serviceCards = container.querySelectorAll('.serviceCard')
    expect(serviceCards.length).toBe(6)

    // Hero CTA + CTA section + Interview CTA (3 external links total)
    const links = screen.getAllByRole('link')
    const hrefs = links.map((link) => link.getAttribute('href'))
    expect(hrefs).toEqual(
      expect.arrayContaining([
        'http://iosappferryman.strikingly.com/',
        'http://interviewiosapp.strikingly.com/',
      ])
    )

    // External links should open in new tab with rel safety flags
    links.forEach((link) => {
      if (link.getAttribute('href')?.includes('strikingly.com')) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
      }
    })
  })
})
