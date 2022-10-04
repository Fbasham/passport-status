import PropTypes from 'prop-types'
import { FC } from 'react'

export interface ErrorSummaryItem {
  feildId: string
  errorMessage: string
}

export interface ErrorSummaryProps {
  id: string
  errors: ErrorSummaryItem[]
  summary: string
}

export const getErrorSummaryItem = (
  feildId: string,
  errorMessage: string
): ErrorSummaryItem => ({
  feildId,
  errorMessage,
})

const ErrorSummary: FC<ErrorSummaryProps> = ({ id, errors, summary }) => {
  return (
    <section
      id={id}
      className="border-l-6 border-accent-error mb-6 ml-2.5 pl-4"
    >
      <h2 className="text-2xl pt-4">{summary}</h2>
      <ul className="list-disc pb-6 ml-4">
        {errors.map(({ feildId, errorMessage }, index) => (
          <li key={index}>
            <a className="visited:text-link-default" href={`#${feildId}`}>
              {errorMessage}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

ErrorSummary.propTypes = {
  id: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
}

export default ErrorSummary