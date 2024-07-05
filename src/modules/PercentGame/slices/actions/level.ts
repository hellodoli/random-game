import { PayloadAction } from '@reduxjs/toolkit'
import { PercentGameState } from 'modules/PercentGame/types'
import { addExp_Redux } from 'modules/PercentGame/utils/exp'

export const levelActions = {
  addExp: (state: PercentGameState, action: PayloadAction<{ exp: number }>) => {
    addExp_Redux(state, action.payload)
  },
}
