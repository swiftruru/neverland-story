import { fireEvent, render, screen, within } from '@testing-library/react'
import { ZoomImage } from '../src/components/common/ZoomImage'

describe('ZoomImage', () => {
  it('點擊後顯示放大視窗並可關閉', () => {
    render(<ZoomImage src="/demo.jpg" alt="測試圖片" width={100} height={100} />)

    const trigger = screen.getByRole('button', { name: /點擊放大 測試圖片/ })
    fireEvent.click(trigger)

    const dialog = screen.getByRole('dialog', { name: '測試圖片' })
    expect(dialog).toBeInTheDocument()
    expect(within(dialog).getByAltText('測試圖片')).toBeInTheDocument()

    fireEvent.click(dialog)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on Escape key', () => {
    render(<ZoomImage src="/demo.jpg" alt="測試圖片" width={100} height={100} />)
    fireEvent.click(screen.getByRole('button', { name: /點擊放大 測試圖片/ }))

    const dialog = screen.getByRole('dialog', { name: '測試圖片' })
    fireEvent.keyDown(dialog, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
