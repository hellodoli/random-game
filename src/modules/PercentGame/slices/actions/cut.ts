import { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { PercentGameState } from 'modules/PercentGame/types'
import { toggleMetaAction } from 'modules/PercentGame/utils'

export const cutActions = {
  toggleIsCuttingPrize: (state: PercentGameState) => {
    const { value, status } = toggleMetaAction(state.isCutting)
    state.isCutting = value
    state.metaStatus = status
  },
  cutPrize(
    state: PercentGameState,
    action: PayloadAction<{
      id: string
      itemQuantity: number
    }>,
  ) {
    const { id, itemQuantity } = action.payload
    const selectPrize = state.prizes[id]
    const selectPrizeNumber = selectPrize.number
    if (selectPrize && selectPrizeNumber > 1) {
      selectPrize.number -= itemQuantity
      const cutPrizeId = uuidv4()
      const cutPrize = {
        ...selectPrize,
        id: cutPrizeId,
        number: itemQuantity,
      }
      state.prizes[cutPrizeId] = cutPrize
    }
  },
}
