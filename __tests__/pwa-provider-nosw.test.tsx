import { render } from '@testing-library/react'
import { PwaProvider } from '../src/components/common/PwaProvider'

describe('PwaProvider without service worker support', () => {
  it('skips registration when navigator.serviceWorker is missing', () => {
    const original = (global.navigator as any).serviceWorker
    // @ts-expect-error remove serviceWorker
    delete (global.navigator as any).serviceWorker

    const addSpy = jest.spyOn(window, 'addEventListener')
    render(<PwaProvider />)
    expect(addSpy).not.toHaveBeenCalledWith('load', expect.any(Function))

    if (original) {
      Object.defineProperty(global.navigator, 'serviceWorker', { value: original, configurable: true })
    }
  })
})
