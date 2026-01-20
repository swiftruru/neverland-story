import { act, render } from '@testing-library/react'
import { PwaProvider } from '../src/components/common/PwaProvider'

describe('PwaProvider', () => {
  it('registers service worker on load when supported', () => {
    const register = jest.fn(() => Promise.resolve())
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: { register },
      configurable: true,
    })

    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = render(<PwaProvider />)
    const loadHandler = (addEventListenerSpy.mock.calls.find((c) => c[0] === 'load') || [])[1] as () => void
    expect(loadHandler).toBeInstanceOf(Function)

    act(() => {
      loadHandler?.()
    })
    expect(register).toHaveBeenCalledWith('/neverland/sw.js')

    // Cleanup
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('load', loadHandler)
  })
})
