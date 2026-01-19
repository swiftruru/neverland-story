import { render } from '@testing-library/react'
import { Skeleton, SkeletonText } from '../src/components/common/Skeleton'

describe('Skeleton branches', () => {
  it('supports animation none and default sizes', () => {
    const { container } = render(<Skeleton animation="none" variant="text" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).not.toContain('wave')
    expect(el.className).toContain('text')
    expect(el.getAttribute('style')).toBeNull()
  })

  it('uses defaults when no props given', () => {
    const { container } = render(<Skeleton />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('text')
    expect(el.className).toContain('pulse')
  })

  it('SkeletonText defaults to 3 lines with last shorter', () => {
    const { container } = render(<SkeletonText />)
    const texts = container.querySelectorAll('.text')
    expect(texts.length).toBe(3)
    expect(texts[2].getAttribute('style')).toContain('width: 60%')
  })

  it('falls back when variant class is missing', () => {
    const { container } = render(
      // @ts-expect-error invalid variant to hit fallback
      <Skeleton variant="invalid" />
    )
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('skeleton')
  })
})
