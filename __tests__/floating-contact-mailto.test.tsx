import { render, screen, fireEvent } from '@testing-library/react'
import { FloatingContact } from '../src/components/common/FloatingContact'

describe('FloatingContact mailto', () => {
  it('closes menu when navigating to contact page link', () => {
    render(<FloatingContact />)
    const toggle = screen.getByRole('button', { name: /floatingContact.open/ })
    fireEvent.click(toggle)

    const contactLink = screen.getByRole('link', { name: /floatingContact.allContacts/ })
    fireEvent.click(contactLink)

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
