import { fireEvent, render, screen } from '@testing-library/react'
import { LazyImage } from '../src/components/common/LazyImage'

describe('LazyImage', () => {
  it('shows skeleton until load, then applies loaded class', () => {
    render(
      <LazyImage
        src="/demo.jpg"
        alt="懶加載"
        width={200}
        height={100}
        placeholder="skeleton"
      />
    )

    const skeleton = screen.getByRole('img').previousElementSibling
    expect(skeleton?.className).toContain('skeleton')

    fireEvent.load(screen.getByAltText('懶加載'))
    expect(screen.getByAltText('懶加載').className).toContain('imageLoaded')
  })

  it('shows error placeholder when load fails', () => {
    render(
      <LazyImage
        src="/broken.jpg"
        alt="錯誤圖"
        width={200}
        height={100}
      />
    )
    fireEvent.error(screen.getByAltText('錯誤圖'))
    expect(screen.getByText('載入失敗')).toBeInTheDocument()
  })

  it('applies blur placeholder when enabled and skips when priority', () => {
    const { rerender } = render(
      <LazyImage
        src="/blur.jpg"
        alt="模糊圖"
        width={100}
        height={50}
        placeholder="blur"
        priority={false}
      />
    )
    const img = screen.getByAltText('模糊圖')
    expect(img.getAttribute('data-blur-placeholder')).toBe('true')
    expect(img.getAttribute('data-blur-dataurl')).toBeTruthy()

    rerender(
      <LazyImage
        src="/blur.jpg"
        alt="模糊圖"
        width={100}
        height={50}
        placeholder="blur"
        priority
        objectFit="contain"
      />
    )
    const img2 = screen.getByAltText('模糊圖')
    expect(img2.getAttribute('data-blur-placeholder')).toBeNull()
    expect(img2.getAttribute('style')).toContain('object-fit: contain')
  })

  it('handles click when onClick provided (button role)', () => {
    const handleClick = jest.fn()
    render(
      <LazyImage
        src="/clickable.jpg"
        alt="可點擊"
        width={50}
        height={50}
        placeholder="none"
        onClick={handleClick}
      />
    )
    const wrapper = screen.getByRole('button')
    fireEvent.click(wrapper)
    expect(handleClick).toHaveBeenCalled()
  })
})
