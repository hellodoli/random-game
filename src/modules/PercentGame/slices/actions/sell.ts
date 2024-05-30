import { PayloadAction } from '@reduxjs/toolkit'
import {
  PercentGameState,
  SELL_PRIZE_OPTION,
  META_STATUS,
} from 'modules/PercentGame/types'
import { getSellPrize, toggleMetaAction } from 'modules/PercentGame/utils/sell'

export const sellActions = {
  resetMetaState: (state: PercentGameState) => {
    state.isSelling = false
    state.isCutting = false
    state.metaStatus = META_STATUS.INITITAL
  },
  toggleIsSellingPrize(state: PercentGameState) {
    const { value, status } = toggleMetaAction(state.isSelling)
    state.isSelling = value
    state.metaStatus = status
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

    if (!deletePrize) {
      return
    }

    const { pricePerOne, priceAll } = getSellPrize(
      deletePrize.gradientSet,
      deletePrize.number,
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
    deletePrize.number -= quantity

    if (
      type === SELL_PRIZE_OPTION.ALL ||
      (type === SELL_PRIZE_OPTION.ONE && itemQuantity === 1) ||
      (type === SELL_PRIZE_OPTION.CUSTOM && customQuantity === itemQuantity)
    ) {
      delete state.prizes[id]
    }
  },
  changeMetaStatus(
    state: PercentGameState,
    action: PayloadAction<{
      status: META_STATUS
    }>,
  ) {
    const { status } = action.payload
    state.metaStatus = status
  },
  clickOutsideWhenHasMetaAction(state: PercentGameState) {
    if (state.metaStatus === META_STATUS.PREPARE) {
      sellActions.resetMetaState(state)
    }
  },
}
