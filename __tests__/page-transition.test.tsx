import { act, render } from '@testing-library/react'
import { PageTransition } from '../src/components/common/PageTransition'

jest.mock('next/navigation', () => ({
  usePathname: () => '/first',
}))

describe('PageTransition', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('shows overlay then fades out after timing', () => {
    const { container, rerender } = render(<PageTransition />)
    expect(container.firstChild).toBeInTheDocument()

    // simulate route change triggers effect again
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/second')
    rerender(<PageTransition />)

    act(() => {
      jest.advanceTimersByTime(350)
    })
    const overlay = container.firstChild as HTMLElement
    expect(overlay.className).toContain('fadeOut')

    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(container.firstChild).toBeNull()
  })
})
