import React from 'react'
import { DEFAULT_TICKET_PRICE } from 'modules/PercentGame/constants'

import TicketIcon from 'components/Icons/Game/Ticket'
import CrownCoin from 'components/Icons/Game/CrownCoin'

interface Props {
  ticketPrice?: number
}

const Notes = ({ ticketPrice = DEFAULT_TICKET_PRICE }: Props) => {
  return (
    <div className="flex items-center text-sm mr-auto text-color-white">
      <span>(</span>
      <TicketIcon size={14} classNames="mr-1" />
      <span>{`= ${ticketPrice}`}</span>
      <CrownCoin size={14} classNames="coin-icon mx-1" />
      <span>)</span>
    </div>
  )
}

export default Notes
