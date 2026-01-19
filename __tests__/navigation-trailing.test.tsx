import { fireEvent, render, screen } from '@testing-library/react'
import { Navigation } from '../src/components/layout/Navigation'

jest.mock('next/navigation', () => ({
  usePathname: () => '/contact/',
}))

describe('Navigation trailing slash handling', () => {
  it('normalizes pathname and sets active link', () => {
    render(<Navigation />)
    const contactLink = screen.getByRole('link', { name: /nav.contact/ })
    expect(contactLink.className).toContain('active')
  })
})
