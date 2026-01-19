import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'

describe('Home page', () => {
  it('shows hero title, subtitle, and zoom trigger', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { level: 1, name: /home.title/ })).toBeInTheDocument()
    expect(screen.getByText(/home.subtitle/)).toBeInTheDocument()

    const zoomButton = screen.getByRole('button', { name: /點擊放大 home.headshotAlt/ })
    expect(zoomButton).toBeInTheDocument()
  })
})
