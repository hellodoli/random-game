import { PayloadAction } from '@reduxjs/toolkit'
import { GradientSet } from 'types/enum/color'
import {
  PercentGameState,
  RollResult,
  RESULT_ROLL_TYPE,
  Prize,
} from 'modules/PercentGame/types'
import {
  getRandom,
  getPrize,
  getMergePrizeSameType,
  showModalError,
} from 'modules/PercentGame/utils'

export const rollActions = {
  startRoll: (
    state: PercentGameState,
    action: PayloadAction<{ consume: number; gradient: GradientSet }>,
  ) => {
    const { consume, gradient } = action.payload
    state.isRolling = true
    state.ticket -= consume
    state.rollColorGradient = gradient
  },
  endRoll: (
    state: PercentGameState,
    action: PayloadAction<{
      consume: number
      count: number
      rates: RollResult[]
      callback?: (prize: Prize) => void
    }>,
  ) => {
    const { rates, count } = action.payload
    state.isRolling = false
    state.rollColorGradient = null

    let prizes: Prize[] = [...state.prizes]
    let setPrizes: Prize[] = []
    for (let i = 0; i < count; i++) {
      const { type: resultType } = getRandom(rates)
      if (resultType !== RESULT_ROLL_TYPE.NOTHING) {
        const newPrize = getPrize(resultType)
        prizes = getMergePrizeSameType(prizes, newPrize).prizes
        setPrizes = getMergePrizeSameType(setPrizes, newPrize).prizes
      }
    }

    if (!setPrizes.length) {
      const title = 'Oh no, you got nothing item (T_T)'
      showModalError({ title })
    }
    console.log({
      prizes,
      setPrizes,
    })
    state.prizes = prizes
    state.setPrizes = setPrizes
  },
  setProgress: (
    state: PercentGameState,
    action: PayloadAction<{ progress?: number }>,
  ) => {
    const { progress = 0 } = action.payload
    state.progress = progress
  },
}
