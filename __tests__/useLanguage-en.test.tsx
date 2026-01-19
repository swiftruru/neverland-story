import { render, screen, fireEvent } from '@testing-library/react'

jest.doMock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}))

const mockSetItem = jest.fn()
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => 'en'),
    setItem: mockSetItem,
  },
})

describe('useLanguage starting from en', () => {
  it('toggleLanguage switches back to zh-TW', async () => {
    const { useLanguage } = await import('../src/hooks/useLanguage')
    function Test() {
      const { toggleLanguage } = useLanguage()
      return <button onClick={toggleLanguage}>toggle</button>
    }

    render(<Test />)
    fireEvent.click(screen.getByText('toggle'))
    expect(mockSetItem).toHaveBeenCalledWith('language', 'zh-TW')
  })
})
