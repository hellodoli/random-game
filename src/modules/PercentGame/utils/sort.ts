import { GradientSet } from 'types'
import { SORT_TYPE, Prize } from 'modules/PercentGame/types'
import { DEFAULT_SORT } from 'modules/PercentGame/constants'

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

export const getSortPrizes = (prizes: Prize[], sort = DEFAULT_SORT) => {
  const { diamond, gold, silver, bronze } = getPrizeGroup(prizes)
  switch (sort) {
    case SORT_TYPE.DOWN_TO:
      return [...diamond, ...gold, ...silver, ...bronze]
    case SORT_TYPE.UP_TO:
      return [...bronze, ...silver, ...gold, ...diamond]
    default:
      return prizes
  }
}
