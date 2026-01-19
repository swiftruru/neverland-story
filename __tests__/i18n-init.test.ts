import { act } from '@testing-library/react'

describe('i18n init with saved language', () => {
  it('uses saved language from localStorage', async () => {
    const setLang = 'en'
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => setLang),
        setItem: jest.fn(),
      },
    })

    jest.isolateModules(() => {
      // import i18n module to trigger init
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const i18n = require('../src/i18n/index').default
      expect(i18n.language).toBe(setLang)
    })
  })

  it('falls back to zh-TW when no saved language and window undefined', () => {
    const originalWindow = global.window
    // @ts-expect-error simulate server
    delete (global as any).window
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const i18n = require('../src/i18n/index').default
      expect(i18n.language).toBe('zh-TW')
    })
    ;(global as any).window = originalWindow
  })
})
