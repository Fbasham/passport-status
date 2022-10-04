import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Status from '../../pages/status'
import { useRouter } from 'next/router'
import { useCheckStatus } from '../../hooks/api/useCheckStatus'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
jest.mock('../../components/InputField', () => () => {
  return <mock-modal data-testid="test-modal" />
})
jest.mock('../../components/ActionButton', () => () => {
  return <mock-modal data-testid="button-modal" />
})
jest.mock('../../components/ErrorSummary', () => () => {
  return <mock-modal data-testid="errors-modal" />
})
jest.mock('../../hooks/api/useCheckStatus')

describe('Check status page page', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
    useCheckStatus.mockImplementation(() => ({}))
  })

  it('should render the page', () => {
    render(<Status />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})