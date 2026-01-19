import { fireEvent, render, screen } from '@testing-library/react'
import { FloatingContact } from '../src/components/common/FloatingContact'

describe('FloatingContact', () => {
  it('toggles options and closes on Escape', () => {
    render(<FloatingContact />)

    const toggle = screen.getByRole('button', { name: /floatingContact.open/ })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    const linkButton = screen.getByRole('link', { name: /floatingContact.allContacts/ })
    expect(linkButton).toBeInTheDocument()

    fireEvent.keyDown(toggle.parentElement as HTMLElement, { key: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('mailto link does not add target', () => {
    render(<FloatingContact />)
    fireEvent.click(screen.getByRole('button', { name: /floatingContact.open/ }))

    const mailLink = screen.getByRole('link', { name: /floatingContact.email/ })
    expect(mailLink).toHaveAttribute('href', 'mailto:apppeterpan@gmail.com')
    expect(mailLink).not.toHaveAttribute('target')
  })
})
