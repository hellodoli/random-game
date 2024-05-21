import { GradientSet } from 'types'
import { SORT_TYPE, ListPrizeOb } from 'modules/PercentGame/types'
import { DEFAULT_SORT } from 'modules/PercentGame/constants'

export const getSortPrizes = (
  listPrizeOb: ListPrizeOb,
  sort = DEFAULT_SORT,
) => {
  const diamond: ListPrizeOb = {}
  const gold: ListPrizeOb = {}
  const silver: ListPrizeOb = {}
  const bronze: ListPrizeOb = {}
  const prizes = Object.values(listPrizeOb)

  prizes.forEach((prize) => {
    const id = prize.id
    switch (prize.gradientSet) {
      case GradientSet.DIAMOND: {
        diamond[id] = prize
        break
      }
      case GradientSet.GOLD: {
        gold[id] = prize
        break
      }
      case GradientSet.SILVER: {
        silver[id] = prize
        break
      }
      case GradientSet.BRONZE: {
        bronze[id] = prize
        break
      }
      default:
        break
    }
  })

  switch (sort) {
    case SORT_TYPE.DOWN_TO:
      return { ...diamond, ...gold, ...silver, ...bronze }
    case SORT_TYPE.UP_TO:
      return { ...bronze, ...silver, ...gold, ...diamond }
    default:
      return listPrizeOb
  }
}
