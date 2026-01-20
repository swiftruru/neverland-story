import { render } from '@testing-library/react'

const redirectMock = jest.fn()

jest.mock('next/navigation', () => ({
  redirect: (...args: unknown[]) => redirectMock(...args),
}))

import Home from '../src/app/page'

describe('Home page', () => {
  it('redirects to neverland base path', () => {
    render(<Home />)

    expect(redirectMock).toHaveBeenCalledWith('/neverland/')
  })
})
