import { FC, MouseEventHandler } from 'react'

import { CheckStatusApiResponse } from '../lib/types'
import { StatusCode } from '../lib/types'
import ActionButton, { ActionButtonStyle } from './ActionButton'
import CheckStatusFileBeingProcessed from './CheckStatusResponses/CheckStatusFileBeingProcessed'
import CheckStatusNoRecord from './CheckStatusResponses/CheckStatusNoRecord'
import CheckStatusNotAcceptable from './CheckStatusResponses/CheckStatusNotAcceptable'
import CheckStatusReadyForPickup from './CheckStatusResponses/CheckStatusReadyForPickup'
import CheckStatusShippingCanadaPost from './CheckStatusResponses/CheckStatusShippingCanadaPost'
import CheckStatusShippingFedex from './CheckStatusResponses/CheckStatusShippingFedex'

export interface CheckStatusInfoProps {
  id: string
  onGoBackClick: MouseEventHandler<HTMLButtonElement>
  goBackText: string
  goBackStyle?: ActionButtonStyle
  checkStatusResponse?: CheckStatusApiResponse | null
}

export const CheckStatusInfo: FC<CheckStatusInfoProps> = ({
  goBackText,
  id,
  onGoBackClick,
  goBackStyle,
  checkStatusResponse,
}) => {
  //Determine which status response to render
  let statusComponent
  switch (checkStatusResponse?.status) {
    case StatusCode.FILE_BEING_PROCESSED:
      statusComponent = <CheckStatusFileBeingProcessed />
      break
    case StatusCode.PASSPORT_ISSUED_READY_FOR_PICKUP:
      statusComponent = <CheckStatusReadyForPickup />
      break
    case StatusCode.PASSPORT_ISSUED_SHIPPING_CANADA_POST:
      statusComponent = (
        <CheckStatusShippingCanadaPost
          trackingNumber={checkStatusResponse.manifestNumber}
        />
      )
      break
    case StatusCode.PASSPORT_ISSUED_SHIPPING_FEDEX:
      statusComponent = (
        <CheckStatusShippingFedex
          trackingNumber={checkStatusResponse.manifestNumber}
        />
      )
      break
    case StatusCode.NOT_ACCEPTABLE_FOR_PROCESSING:
      statusComponent = <CheckStatusNotAcceptable />
      break
    default:
      statusComponent = <CheckStatusNoRecord />
      break
  }
  return (
    <div id={id}>
      {statusComponent}
      <div className="pt-5">
        <ActionButton
          onClick={onGoBackClick}
          text={goBackText}
          style={goBackStyle}
        />
      </div>
    </div>
  )
}

export default CheckStatusInfo
