import { act, render, waitFor } from '@testing-library/react'
import { PwaProvider } from '../src/components/common/PwaProvider'

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => '/test',
}))

describe('PwaProvider', () => {
  const originalReadyState = Object.getOwnPropertyDescriptor(document, 'readyState')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    // Restore readyState
    if (originalReadyState) {
      Object.defineProperty(document, 'readyState', originalReadyState)
    }
  })

  it('registers service worker on load when document is loading', async () => {
    // Mock document.readyState to be 'loading'
    Object.defineProperty(document, 'readyState', {
      value: 'loading',
      configurable: true,
    })

    const mockRegistration = {
      active: null,
      installing: null,
      addEventListener: jest.fn(),
    }
    const register = jest.fn(() => Promise.resolve(mockRegistration))
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: { register },
      configurable: true,
    })

    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = render(<PwaProvider />)
    const loadCall = addEventListenerSpy.mock.calls.find((c) => c[0] === 'load')
    const loadHandler = loadCall?.[1] as () => void
    expect(loadHandler).toBeInstanceOf(Function)

    await act(async () => {
      loadHandler?.()
    })

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith('/sw.js', { scope: '/' })
    })

    // Cleanup
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('load', loadHandler)
  })

  it('registers service worker immediately when document is complete', async () => {
    // Document.readyState defaults to 'complete' in jsdom
    Object.defineProperty(document, 'readyState', {
      value: 'complete',
      configurable: true,
    })

    const mockRegistration = {
      active: null,
      installing: null,
      addEventListener: jest.fn(),
    }
    const register = jest.fn(() => Promise.resolve(mockRegistration))
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: { register },
      configurable: true,
    })

    await act(async () => {
      render(<PwaProvider />)
    })

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith('/sw.js', { scope: '/' })
    })
  })
})
