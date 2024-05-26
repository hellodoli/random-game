import { PayloadAction } from '@reduxjs/toolkit'
import { PercentGameState, SELL_PRIZE_OPTION } from 'modules/PercentGame/types'
import { getSellPrize } from 'modules/PercentGame/utils/sell'

export const sellActions = {
  toggleIsSellingPrize: (state: PercentGameState) => {
    state.isSelling = !state.isSelling
  },
  resetSell: (state: PercentGameState) => {
    state.isSelling = false
  },
  sellPrize(
    state: PercentGameState,
    action: PayloadAction<{
      id: string
      type: SELL_PRIZE_OPTION
      itemQuantity: number
      customQuantity: number
    }>,
  ) {
    const { id, type, customQuantity, itemQuantity } = action.payload
    const deletePrize = state.prizes[id]
    if (deletePrize) {
      const { pricePerOne, priceAll } = getSellPrize(
        deletePrize.gradientSet,
        deletePrize?.number,
      )

      let sellPrice = pricePerOne
      let quantity = 1
      if (type === SELL_PRIZE_OPTION.ALL) {
        sellPrice = priceAll
        quantity = itemQuantity
      } else if (type === SELL_PRIZE_OPTION.CUSTOM) {
        sellPrice = pricePerOne * customQuantity
        quantity = customQuantity
      }

      state.money += sellPrice
      if (typeof deletePrize.number === 'number') {
        deletePrize.number -= quantity
      }

      if (
        type === SELL_PRIZE_OPTION.ALL ||
        (type === SELL_PRIZE_OPTION.ONE && itemQuantity === 1) ||
        (type === SELL_PRIZE_OPTION.CUSTOM && customQuantity === itemQuantity)
      ) {
        delete state.prizes[id]
      }
    }
  },
}
