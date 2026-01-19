import { render } from '@testing-library/react'
import { Tape } from '../src/components/common/Tape'

describe('Tape', () => {
  it('renders bottom-left position with rotation', () => {
    const { container } = render(<Tape position="bottom-left" rotation={10} color="blue" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('bottomleft')
    expect(el.className).toContain('blue')
    expect(el.getAttribute('style')).toContain('--tape-rotation: 10deg')
  })

  it('uses defaults when no props provided', () => {
    const { container } = render(<Tape />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('topcenter')
    expect(el.className).toContain('yellow')
    expect(el.getAttribute('style')).toContain('--tape-rotation: 0deg')
  })
})
