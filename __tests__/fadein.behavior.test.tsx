import { render, act } from '@testing-library/react'
import { FadeInOnScroll, StaggerContainer, FadeInList } from '../src/components/common/FadeInOnScroll'

describe('FadeInOnScroll behavior', () => {
  let callback: ((entries: IntersectionObserverEntry[]) => void) | null = null
  const observe = jest.fn()
  const unobserve = jest.fn()

  beforeEach(() => {
    callback = null
    ;(global as any).IntersectionObserver = jest.fn((cb) => {
      callback = cb
      return { observe, unobserve, disconnect: jest.fn(), root: null, rootMargin: '0px', thresholds: [] }
    })
  })

  it('toggles visibility when once=false and leaving viewport', () => {
    const { container } = render(
      <FadeInOnScroll once={false} direction="none">
        <div>內容</div>
      </FadeInOnScroll>
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).not.toContain('visible')

    act(() => {
      callback?.([{ isIntersecting: true } as IntersectionObserverEntry])
    })
    expect(wrapper.className).toContain('visible')

    act(() => {
      callback?.([{ isIntersecting: false } as IntersectionObserverEntry])
    })
    expect(wrapper.className).not.toContain('visible')
  })

  it('falls back to empty direction class when unknown direction provided', () => {
    const { container } = render(
      // @ts-expect-error test invalid direction
      <FadeInOnScroll direction="invalid">
        <div>錯誤方向</div>
      </FadeInOnScroll>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('fadeIn')
  })

  it('unobserves when once=true (default)', () => {
    const { container } = render(
      <FadeInOnScroll>
        <div>測試</div>
      </FadeInOnScroll>
    )
    act(() => {
      callback?.([{ isIntersecting: true } as IntersectionObserverEntry])
    })
    expect(unobserve).toHaveBeenCalled()
    expect(container.firstChild?.className).toContain('visible')
  })

  it('stagger container sets data-visible after intersect', () => {
    const { container } = render(
      <StaggerContainer staggerDelay={50}>
        <div>一</div>
        <div>二</div>
      </StaggerContainer>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.getAttribute('data-visible')).toBe('false')
    act(() => {
      callback?.([{ isIntersecting: true } as IntersectionObserverEntry])
    })
    expect(wrapper.getAttribute('data-visible')).toBe('true')

    // leaving viewport should not revert when unobserved
    act(() => {
      callback?.([{ isIntersecting: false } as IntersectionObserverEntry])
    })
    expect(wrapper.getAttribute('data-visible')).toBe('true')
  })

  it('FadeInList applies increasing delay', () => {
    const { container } = render(
      <FadeInList staggerDelay={30} baseDelay={10}>
        {[<div key="a">A</div>, <div key="b">B</div>]}
      </FadeInList>
    )
    const wrappers = container.querySelectorAll('.fadeIn')
    expect(wrappers.length).toBe(2)
    expect(wrappers[1].getAttribute('style')).toContain('--fade-delay: 40ms')
  })
})
