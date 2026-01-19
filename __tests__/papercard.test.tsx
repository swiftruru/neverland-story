import { render, screen } from '@testing-library/react'
import { PaperCard } from '../src/components/common/PaperCard'

describe('PaperCard', () => {
  it('shows tape with correct color and rotation by default', () => {
    const { container } = render(
      <PaperCard tapeColor="pink" tapeRotation={5}>
        <div>內容</div>
      </PaperCard>
    )

    const tape = container.querySelector('.tape')
    expect(tape).toBeInTheDocument()
    expect(tape?.className).toContain('pink')
    expect(tape?.getAttribute('style')).toContain('--tape-rotation: 5deg')
  })

  it('can hide tape and hover style', () => {
    render(
      <PaperCard tapePosition="none" hover={false}>
        <div>純卡片</div>
      </PaperCard>
    )
    const card = screen.getByText('純卡片').closest('div')
    expect(card?.className).not.toContain('hover')
    const tape = card?.querySelector('.tape')
    expect(tape).toBeNull()
  })
})
