import { fireEvent, render, screen } from '@testing-library/react'
import { LanguageSwitcher } from '../src/components/common/LanguageSwitcher'
import { ToastProvider } from '../src/contexts/ToastContext'

const toggleLanguage = jest.fn(() => {
  window.localStorage.setItem('language', 'en')
})

jest.mock('@hooks/useLanguage', () => ({
  useLanguage: () => ({
    currentLanguage: 'zh-TW',
    toggleLanguage,
  }),
}))

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ToastProvider>{ui}</ToastProvider>)
}

const mockSetItem = jest.fn()
Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: mockSetItem,
  },
})

describe('LanguageSwitcher', () => {
  it('toggles language and updates localStorage', () => {
    renderWithProviders(<LanguageSwitcher />)

    const button = screen.getByRole('button', { name: /Switch to English/ })
    fireEvent.click(button)

    expect(toggleLanguage).toHaveBeenCalled()
    expect(mockSetItem).toHaveBeenCalledWith('language', 'en')
  })
})
