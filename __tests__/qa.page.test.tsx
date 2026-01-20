import { render, screen } from '@testing-library/react'
import QAPage from '../src/app/(swiftui)/courses/swiftui/foundation/qa/page'

describe('Q&A page', () => {
  it('shows hero heading and CTA link', () => {
    render(<QAPage />)

    expect(screen.getByRole('heading', { level: 1, name: /introPage.qaPage.heading/ })).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /introPage.qaPage.cta/ })
    expect(link).toHaveAttribute('href')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
