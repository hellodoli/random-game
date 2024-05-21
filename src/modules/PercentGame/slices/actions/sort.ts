import { PayloadAction } from '@reduxjs/toolkit'
import { SORT_TYPE, PercentGameState } from 'modules/PercentGame/types'
import { DEFAULT_SORT } from 'modules/PercentGame/constants'
import { getSortPrizes } from 'modules/PercentGame/utils/sort'

export const sortActions = {
  sortPrize: (
    state: PercentGameState,
    action: PayloadAction<{ type?: SORT_TYPE }>,
  ) => {
    const { type = DEFAULT_SORT } = action.payload
    const sortPrizes = getSortPrizes(state.prizes, type)
    state.prizes = sortPrizes
  },
}
