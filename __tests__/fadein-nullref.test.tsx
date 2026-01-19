import { render } from '@testing-library/react'
import React from 'react'

import { FadeInOnScroll, StaggerContainer } from '../src/components/common/FadeInOnScroll'

describe('FadeInOnScroll with null refs', () => {
  const originalUseRef = React.useRef

  beforeEach(() => {
    jest.spyOn(React, 'useRef').mockReturnValue({ current: null } as any)
  })

  afterEach(() => {
    ;(React.useRef as jest.Mock).mockRestore()
  })

  it('exits early when element is null (FadeInOnScroll)', () => {
    const { container } = render(
      <FadeInOnScroll>
        <div>Null ref</div>
      </FadeInOnScroll>
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('exits early when element is null (StaggerContainer)', () => {
    const { container } = render(
      <StaggerContainer>
        <div>Null ref</div>
      </StaggerContainer>
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
