import { render, screen } from '@testing-library/react'
import { FadeInOnScroll } from '../src/components/common/FadeInOnScroll'

describe('FadeInOnScroll', () => {
  it('renders children with fadeIn class and custom delay/duration', () => {
    render(
      <FadeInOnScroll delay={150} duration={300} direction="left">
        <div>內容</div>
      </FadeInOnScroll>
    )

    const el = screen.getByText('內容').parentElement
    expect(el).toHaveClass('fadeIn')
    expect(el).toHaveClass('left')
    expect(el?.getAttribute('style')).toContain('--fade-delay: 150ms')
    expect(el?.getAttribute('style')).toContain('--fade-duration: 300ms')
  })
})
