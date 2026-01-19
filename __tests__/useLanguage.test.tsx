import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useLanguage } from '../src/hooks/useLanguage'

jest.mock('@i18n/index', () => ({
  LANGUAGES: [
    { code: 'zh-TW', name: '正體中文' },
    { code: 'en', name: 'English' },
  ],
}))

const changeLanguage = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'zh-TW',
      changeLanguage,
    },
  }),
}))

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
})

function TestComponent() {
  const { toggleLanguage, changeLanguage: changeLang } = useLanguage()
  return (
    <div>
      <button onClick={toggleLanguage}>toggle</button>
      <button onClick={() => changeLang('en')}>change-en</button>
      <button onClick={() => changeLang('zh-TW')}>change-zh</button>
    </div>
  )
}

describe('useLanguage', () => {
  beforeEach(() => {
    changeLanguage.mockClear()
    ;(window.localStorage.setItem as jest.Mock).mockClear()
  })

  it('toggleLanguage switches between zh-TW and en', () => {
    render(<TestComponent />)
    fireEvent.click(screen.getByText('toggle'))
    expect(changeLanguage).toHaveBeenCalledWith('en')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('language', 'en')
    expect(document.documentElement.lang).toBe('en')
  })

  it('changeLanguage writes chosen lang', () => {
    render(<TestComponent />)
    fireEvent.click(screen.getByText('change-en'))
    expect(changeLanguage).toHaveBeenCalledWith('en')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('language', 'en')
  })

  it('changeLanguage can switch back to zh-TW', () => {
    render(<TestComponent />)
    fireEvent.click(screen.getByText('change-zh'))
    expect(changeLanguage).toHaveBeenCalledWith('zh-TW')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('language', 'zh-TW')
  })
})
