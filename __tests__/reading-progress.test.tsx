import { fireEvent, render } from '@testing-library/react'
import { ReadingProgress } from '../src/components/common/ReadingProgress'

// mock requestAnimationFrame to run immediately
beforeAll(() => {
  window.requestAnimationFrame = (cb: FrameRequestCallback): number => {
    cb(performance.now())
    return 1
  }
  window.cancelAnimationFrame = () => {}
})

describe('ReadingProgress', () => {
  it('updates CSS variable on scroll/resize', () => {
    const { container } = render(<ReadingProgress />)
    const bar = container.firstChild as HTMLElement
    expect(bar).toBeInTheDocument()

    // simulate scroll height/position
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true })
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 1000, configurable: true })
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 500, configurable: true })

    fireEvent.scroll(window)
    fireEvent.resize(window)

    const progress = bar.style.getPropertyValue('--progress')
    expect(progress).toBe('50%')
  })
})
