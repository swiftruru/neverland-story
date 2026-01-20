import { act, fireEvent, render, screen, within } from '@testing-library/react'
import ContactPage from '../src/app/(neverland)/neverland/contact/page'

jest.useFakeTimers()

describe('Contact page', () => {
  it('renders all contact cards with links and copy buttons working', async () => {
    render(<ContactPage />)

    const cards = screen.getAllByRole('heading', { level: 3 })
    expect(cards).toHaveLength(10)

    // email link uses mailto and is focusable
    const emailLink = screen.getByRole('link', { name: /pages.contact.sendEmail/ })
    expect(emailLink).toHaveAttribute('href', 'mailto:apppeterpan@gmail.com')

    // external links open in new tab (e.g., Medium)
    const visitLinks = screen.getAllByRole('link', { name: /pages.contact.visit/ })
    const mediumLink = visitLinks.find((link) => link.getAttribute('href') === 'https://medium.com/@apppeterpan')
    expect(mediumLink).toBeDefined()
    if (mediumLink) {
      expect(mediumLink).toHaveAttribute('target', '_blank')
      expect(mediumLink).toHaveAttribute('rel', expect.stringContaining('noopener'))
    }

    // copy button toggles state and writes to clipboard
    const lineCard = cards.find((card) => card.textContent?.includes('pages.contact.linePersonal'))
    expect(lineCard).toBeDefined()
    if (!lineCard) return

    const copyButton = within(lineCard.closest('div') as HTMLElement).getByRole('button', {
      name: /pages.contact.copy/,
    })

    await act(async () => {
      fireEvent.click(copyButton)
      await Promise.resolve()
    })
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('deeplovepeterpan')
    expect(copyButton).toBeDisabled()

    // revert after timeout
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(copyButton).not.toBeDisabled()
  })
})
