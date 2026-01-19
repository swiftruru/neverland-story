import { fireEvent, render, screen } from '@testing-library/react'
import { LanguageSwitcher } from '../src/components/common/LanguageSwitcher'

const toggleLanguage = jest.fn(() => {
  window.localStorage.setItem('language', 'en')
})

jest.mock('@hooks/useLanguage', () => ({
  useLanguage: () => ({
    currentLanguage: 'zh-TW',
    toggleLanguage,
  }),
}))

const mockSetItem = jest.fn()
Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: mockSetItem,
  },
})

describe('LanguageSwitcher', () => {
  it('toggles language and updates localStorage', () => {
    render(<LanguageSwitcher />)

    const button = screen.getByRole('button', { name: /Switch to English/ })
    fireEvent.click(button)

    expect(toggleLanguage).toHaveBeenCalled()
    expect(mockSetItem).toHaveBeenCalledWith('language', 'en')
  })
})
