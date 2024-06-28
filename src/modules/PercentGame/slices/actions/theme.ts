import { PayloadAction } from '@reduxjs/toolkit'
import { PercentGameState } from 'modules/PercentGame/types'

export const themeActions = {
  toggleIsMirror: (
    state: PercentGameState,
    action: PayloadAction<{
      isMirror: boolean
    }>,
  ) => {
    const { isMirror } = action.payload
    state.isMirror = isMirror
  },
  turnOffIsMirror: (state: PercentGameState) => {
    state.isMirror = false
  },
  turnOnIsMirror: (state: PercentGameState) => {
    state.isMirror = true
  },
}
