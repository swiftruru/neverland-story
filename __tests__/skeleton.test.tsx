import { render } from '@testing-library/react'
import { Skeleton, SkeletonAvatar, SkeletonCard, SkeletonImage, SkeletonText } from '../src/components/common/Skeleton'

describe('Skeleton components', () => {
  it('renders base skeleton with styles', () => {
    const { container } = render(<Skeleton width={120} height={16} variant="rounded" animation="wave" />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('skeleton')
    expect(el).toHaveClass('rounded')
    expect(el).toHaveClass('wave')
    expect(el.getAttribute('style')).toContain('width: 120px')
    expect(el.getAttribute('style')).toContain('height: 16px')
  })

  it('renders preset composites', () => {
    const { container, rerender } = render(<SkeletonAvatar size={40} />)
    expect(container.querySelector('.circular')).toBeInTheDocument()

    rerender(<SkeletonAvatar />)
    expect(container.querySelector('.circular')).toBeInTheDocument()

    rerender(<SkeletonImage />)
    expect(container.querySelector('.rectangular')).toBeInTheDocument()

    rerender(<SkeletonCard hasImage imageHeight={180} />)
    expect(container.querySelector('.cardImage')).toBeInTheDocument()

    rerender(<SkeletonCard />)
    expect(container.querySelector('.cardImage')).toBeInTheDocument()

    rerender(<SkeletonImage width={300} height={150} />)
    expect(container.querySelector('.rectangular')).toBeInTheDocument()

    rerender(<SkeletonText lines={2} />)
    expect(container.querySelectorAll('.text').length).toBeGreaterThan(0)

    rerender(<SkeletonCard hasImage={false} />)
    expect(container.querySelector('.cardImage')).toBeNull()
  })
})
