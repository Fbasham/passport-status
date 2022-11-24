import { FC, MouseEventHandler } from 'react'
import ActionButton from './ActionButton'
import { ActionButtonProps } from './ActionButton'
import { FocusOn } from 'react-focus-on'

export interface ModalProps {
  buttonText: string
  description: string
  isOpen: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  buttons: ActionButtonProps[]
}

const Modal: FC<ModalProps> = ({
  buttonText,
  description,
  buttons,
  onClick,
  isOpen,
}) => {
  return (
    <>
      <ActionButton text={buttonText} onClick={onClick} />
      {isOpen && (
        <FocusOn autoFocus={false}>
          <div
            className="fixed top-0 left-0 w-screen h-full flex justify-center items-center"
            style={{ background: 'rgba(71, 71, 71, 0.8)' }}
          >
            <div className="p-4 bg-white border-2 border-black">
              <p className="font-body p-2">{description}</p>
              <div className="flex space-x-2 mx-4 justify-center">
                {buttons.map((buttonProps) => (
                  <ActionButton key={buttonProps.text} {...buttonProps} />
                ))}
              </div>
            </div>
          </div>
        </FocusOn>
      )}
    </>
  )
}

export default Modal
