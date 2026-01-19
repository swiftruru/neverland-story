import { fireEvent, render, screen } from '@testing-library/react'
import { Navigation } from '../src/components/layout/Navigation'

jest.mock('next/navigation', () => ({
  usePathname: () => '/videos',
}))

describe('Navigation overlay closes menu', () => {
  it('clicking overlay closes menu', () => {
    render(<Navigation />)
    const hamburger = screen.getByRole('button', { name: /nav.openMenu/ })
    fireEvent.click(hamburger)
    const overlay = document.querySelector('.overlay') as HTMLElement
    fireEvent.click(overlay)
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })
})
