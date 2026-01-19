import { fireEvent, render, screen } from '@testing-library/react'
import { ZoomableLazyImage } from '../src/components/common/LazyImage'

describe('ZoomableLazyImage', () => {
  it('triggers onZoom when clicked', () => {
    const onZoom = jest.fn()
    render(
      <ZoomableLazyImage
        src="/zoomable.jpg"
        alt="可放大"
        width={120}
        height={60}
        onZoom={onZoom}
      />
    )
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onZoom).toHaveBeenCalled()
  })
})
