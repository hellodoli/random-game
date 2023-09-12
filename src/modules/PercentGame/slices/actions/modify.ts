import { PayloadAction } from '@reduxjs/toolkit'
import { GradientSet } from 'types'
import { SORT_TYPE, Prize, PercentGameState } from 'modules/PercentGame/types'

const getFilterPrize = (prizes: Prize[], gradientSet: GradientSet) => {
  return prizes.filter((prize) => prize.gradientSet === gradientSet)
}

const getPrizeGroup = (prizes: Prize[]) => {
  return {
    diamond: getFilterPrize(prizes, GradientSet.DIAMOND),
    gold: getFilterPrize(prizes, GradientSet.GOLD),
    silver: getFilterPrize(prizes, GradientSet.SILVER),
    bronze: getFilterPrize(prizes, GradientSet.BRONZE),
  }
}

export const modifyActions = {
  sortPrize: (
    state: PercentGameState,
    action: PayloadAction<{ type?: SORT_TYPE }>,
  ) => {
    const { type = SORT_TYPE.DOWN_TO } = action.payload
    const { diamond, gold, silver, bronze } = getPrizeGroup(state.prizes)
    if (type === SORT_TYPE.DOWN_TO)
      state.prizes = [...diamond, ...gold, ...silver, ...bronze]
    else state.prizes = [...bronze, ...silver, ...gold, ...diamond]
  },
  hoverPrize: (
    state: PercentGameState,
    action: PayloadAction<{ prize?: Prize | null }>,
  ) => {
    const { prize = null } = action.payload
    state.prizeHover = prize
  },
}
