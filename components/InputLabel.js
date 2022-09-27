import PropTypes from 'prop-types'

export default function InputLabel(props) {
  return (
    <label
      htmlFor={props.id}
      className={`font-bold block mb-1.5 ${props.required ? 'required' : ''}`}
    >
      {props.label}
      {props.required ? (
        <strong className="text-accent-error">
          &nbsp;{props.textRequired}
        </strong>
      ) : null}
    </label>
  )
}

InputLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  textRequired: PropTypes.string,
}