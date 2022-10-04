import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import ErrorSummary from '../../components/ErrorSummary'

expect.extend(toHaveNoViolations)

describe('ErrorSummary', () => {
  const { container } = render(
    <ErrorSummary
      id="id"
      summary="summary"
      errors={[{ feildId: 'id', errorMessage: 'error' }]}
    />
  )

  it('renders', () => {
    const sut = screen.getByText('summary')
    expect(sut).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})