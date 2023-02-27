import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import DateSelect from '../../components/DateSelect'

expect.extend(toHaveNoViolations)

describe('DateSelect', () => {
  const sut = (
    <DateSelect
      dateSelectLabelId="date-select-label"
      id="date-select"
      label="Year"
      onChange={jest.fn()}
      type="year"
      options={[{ value: '1900', label: '1900' }]}
      value="1900"
    />
  )

  it('renders', () => {
    render(sut)
    const screenText = screen.getByText('Year')
    expect(screenText).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})