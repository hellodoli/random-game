import React, { memo, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ticketSelector,
  moneySelector,
  isRollingSelector,
} from 'modules/PercentGame/selectors'
import { actions } from 'modules/PercentGame/slices'
import { DEFAULT_TICKET_PRICE } from 'modules/PercentGame/constants'
import TicketIcon from 'components/Icons/Game/Ticket'

const Tickets = () => {
  const dispatch = useDispatch()
  const ticket = useSelector(ticketSelector)
  const money = useSelector(moneySelector)
  const isRolling = useSelector(isRollingSelector)
  const moneyFromTicket = ticket * DEFAULT_TICKET_PRICE
  const max = Math.floor((money + moneyFromTicket) / DEFAULT_TICKET_PRICE)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const quantity = parseInt(value)
    if (!isNaN(quantity) && quantity <= max && quantity >= 0) {
      dispatch(actions.buyAmountTicket({ ticket: quantity }))
    }
  }

  return (
    <div
      className="consume-item ticket"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <TicketIcon size={20} marginRight={4} />
      <input
        type="number"
        value={ticket}
        onChange={onChange}
        step={1}
        min={0}
        max={max}
        className="inline-block rounded"
        style={{ padding: '2px 0 2px 8px' }}
        disabled={isRolling}
      />
    </div>
  )
}

export default memo(Tickets)
