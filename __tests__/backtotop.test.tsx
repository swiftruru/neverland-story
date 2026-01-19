import { fireEvent, render, screen } from '@testing-library/react'
import { BackToTop } from '../src/components/common/BackToTop'

describe('BackToTop', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn()
  })

  it('shows button after scroll and scrolls to top on click', () => {
    render(<BackToTop />)
    const btn = screen.getByRole('button', { name: /backToTop.label/ })
    expect(btn.className).not.toContain('visible')

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true })
    fireEvent.scroll(window)
    expect(btn.className).toContain('visible')

    fireEvent.click(btn)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
