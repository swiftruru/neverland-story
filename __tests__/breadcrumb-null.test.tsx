import { render } from '@testing-library/react'
import { BreadcrumbJsonLd } from '../src/components/common/BreadcrumbJsonLd'

jest.mock('next/navigation', () => ({
  usePathname: () => '/not-exist',
}))

describe('BreadcrumbJsonLd (no match)', () => {
  it('renders null when no nav item matches path', () => {
    const { container } = render(<BreadcrumbJsonLd />)
    expect(container.firstChild).toBeNull()
  })
})
