import { PayloadAction } from '@reduxjs/toolkit'
import { PercentGameState } from 'modules/PercentGame/types'
import { DEFAULT_TICKET_PRICE } from 'modules/PercentGame/constants'

const ticketPrice = DEFAULT_TICKET_PRICE

export const ticketActions = {
  buyTicket: (state: PercentGameState) => {
    if (state.money >= ticketPrice) {
      state.ticket += 1
      state.money -= ticketPrice
    }
  },
  sellTicket: (state: PercentGameState) => {
    if (state.ticket > 0) {
      state.ticket -= 1
      state.money += ticketPrice
    }
  },
  buyAmountTicket(
    state: PercentGameState,
    action: PayloadAction<{ ticket: number }>,
  ) {
    const { ticket } = action.payload
    const prevTicket = state.ticket
    const gap = ticket - prevTicket
    if (gap !== 0) {
      const prevMoney = state.money
      const consumeMoney = gap * ticketPrice
      state.money = prevMoney - consumeMoney
      state.ticket = ticket
    }
  },
}
