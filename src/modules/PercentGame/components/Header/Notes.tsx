import React from 'react'
import { DEFAULT_TICKET_PRICE } from 'modules/PercentGame/constants'

import TicketIcon from 'components/Icons/Game/Ticket'
import CrownCoin from 'components/Icons/Game/CrownCoin'

interface Props {
  ticketPrice?: number
}

const Notes = ({ ticketPrice = DEFAULT_TICKET_PRICE }: Props) => {
  return (
    <div
      className="flex items-center consume-item notes"
      style={{
        marginRight: 'auto',
      }}
    >
      <span>(</span>
      <TicketIcon size={14} marginRight={4} />
      <span>{`= ${ticketPrice}`}</span>
      <CrownCoin
        size={14}
        marginLeft={2}
        marginRight={4}
        classNames="coin-icon"
      />
      <span>)</span>
    </div>
  )
}

export default Notes
