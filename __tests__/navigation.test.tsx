import { fireEvent, render, screen } from '@testing-library/react'
import { Navigation } from '../src/components/layout/Navigation'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navigation', () => {
  it('toggles mobile menu with hamburger and closes on overlay click', () => {
    render(<Navigation />)

    const hamburger = screen.getByRole('button', { name: /nav.openMenu/ })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')

    const overlay = document.querySelector('.overlay') as HTMLElement
    expect(overlay).toBeInTheDocument()
    fireEvent.click(overlay)
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })
})
