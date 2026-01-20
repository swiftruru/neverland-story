import { render, screen } from '@testing-library/react'
import { Navigation } from '../src/components/layout/Navigation'

jest.mock('next/navigation', () => ({
  usePathname: () => '/neverland/contact',
}))

describe('Navigation active state', () => {
  it('marks current route as active', () => {
    render(<Navigation />)

    const contactLink = screen.getByRole('link', { name: /nav.contact/ })
    expect(contactLink.className).toContain('active')

    const homeLink = screen.getByRole('link', { name: /nav.home/ })
    expect(homeLink.className).not.toContain('active')
  })
})
