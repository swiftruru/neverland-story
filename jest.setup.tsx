import '@testing-library/jest-dom'
import React from 'react'

// Mock next/image to behave like a normal img in tests
jest.mock('next/image', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @next/next/no-img-element
  return function MockedImage({ priority: _priority, ...props }: any) {
    return <img {...props} />
  }
})

// Basic mock for react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: () => Promise.resolve() },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: {
    type: '3rdParty',
    init: () => null,
  },
}))

// Mock IntersectionObserver for scroll animations
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!global.IntersectionObserver) {
  // @ts-expect-error define mock on global
  global.IntersectionObserver = MockIntersectionObserver
}

// Mock clipboard for copy interactions
if (!global.navigator.clipboard) {
  // @ts-expect-error clipboard mock
  global.navigator.clipboard = {
    writeText: jest.fn(() => Promise.resolve()),
  }
}
