import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ticketSelector,
  moneySelector,
  isRollingSelector,
} from 'modules/PercentGame/selectors'
import { actions } from 'modules/PercentGame/slices'

import { Button } from 'antd'
import TicketIcon from 'components/Icons/Game/Ticket'

const Tickets = () => {
  const dispatch = useDispatch()
  const ticket = useSelector(ticketSelector)
  const money = useSelector(moneySelector)
  const isRolling = useSelector(isRollingSelector)
  return (
    <div
      className="consume-item ticket"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <TicketIcon size={20} marginRight={4} />
      <Button
        shape="circle"
        icon={<span className="buy-ticket-icon">+</span>}
        className="buy-ticket-btn buy-ticket-add"
        onClick={() => dispatch(actions.buyTicket())}
        disabled={!money || isRolling}
        ghost
      ></Button>
      <span className="text number-ticket">{ticket}</span>
      <Button
        shape="circle"
        icon={<span className="buy-ticket-icon">-</span>}
        className="buy-ticket-btn buy-ticket-minus"
        onClick={() => dispatch(actions.sellTicket())}
        disabled={!ticket || isRolling}
        ghost
      ></Button>
    </div>
  )
}

export default memo(Tickets)
