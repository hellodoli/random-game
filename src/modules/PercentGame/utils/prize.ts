import { v4 as uuidv4 } from 'uuid'
import { GradientSet, Gradient } from 'types'
import {
  RESULT_ROLL_TYPE,
  ICONS,
  Prize,
  ListPrizeOb,
  IconSize,
} from 'modules/PercentGame/types'
import {
  DEFAULT_LIST_PRIZE_ARR,
  DEFAULT_LIST_PRIZE_OB,
  DEFAULT_ITEM_RANDOM_TYPE,
  DEFAULT_ITEM_RANDOM_NUMBER,
} from 'modules/PercentGame/constants'

function getRandomItemFromList<Type>(items: Type[] = []): Type {
  const index = Math.floor(Math.random() * items.length)
  return items[index]
}

const getGradientSet = (type: RESULT_ROLL_TYPE = RESULT_ROLL_TYPE.BRONZE) => {
  switch (type) {
    case RESULT_ROLL_TYPE.BRONZE:
      return GradientSet.BRONZE
    case RESULT_ROLL_TYPE.SILVER:
      return GradientSet.SILVER
    case RESULT_ROLL_TYPE.GOLD:
      return GradientSet.GOLD
    case RESULT_ROLL_TYPE.DIAMOND:
      return GradientSet.DIAMOND
    default:
      return GradientSet.BRONZE
  }
}

export const getPrizes = (listPrizeOb: ListPrizeOb) => {
  return Object.values(listPrizeOb)
}

export const isSamePrize = (myPrize: Prize, newPrize: Prize) => {
  if (
    myPrize.iconId === newPrize.iconId &&
    myPrize?.gradient === newPrize?.gradient &&
    myPrize?.gradientSet === newPrize?.gradientSet
  )
    return true
  return false
}

export const getMergePrizeSameType = (
  listPrizeOb: ListPrizeOb,
  prize: Prize,
) => {
  const prizes = getPrizes(listPrizeOb)
  const combinePrize = prizes.find((item) => isSamePrize(item, prize))
  if (!combinePrize) {
    const newPrize = { ...prize, number: 1 }
    return {
      isCombine: false,
      prize: newPrize,
      prizeId: newPrize.id,
    }
  }

  const newPrize = {
    ...combinePrize,
    number:
      typeof combinePrize.number === 'number' ? combinePrize.number + 1 : 1,
  }

  return {
    isCombine: true,
    prize: newPrize,
    prizeId: newPrize.id,
  }
}

export const getPrize = (type = RESULT_ROLL_TYPE.BRONZE) => {
  const prizeSetItems = DEFAULT_LIST_PRIZE_ARR
  //const gradientItems = [Gradient.HORIZONTAL, Gradient.RADIAL];
  const randomPrize = getRandomItemFromList(prizeSetItems)
  //const randomGradient = getRandomItemFromList(gradientItems);

  const prize: Prize = {
    id: uuidv4(),
    iconId: randomPrize.id,
    iconName: randomPrize.name,
    gradientSet: getGradientSet(type),
    gradient: Gradient.HORIZONTAL,
  }
  return prize
}

export const getIconPrize = (iconId: ICONS) => {
  return DEFAULT_LIST_PRIZE_OB[iconId]['icon']
}

export const getIconSize = (iconSize: IconSize) => {
  switch (iconSize) {
    case 'big':
      return 80
    case 'medium':
      return 56
    case 'small':
      return 28
    default:
      return iconSize
  }
}

export const getRandomPrizes = () => {
  const listPrize: ListPrizeOb = {}
  const resultsType = DEFAULT_ITEM_RANDOM_TYPE
  for (let i = 0; i < DEFAULT_ITEM_RANDOM_NUMBER; i++) {
    const resultType = getRandomItemFromList(resultsType)
    const generatePrize = getPrize(resultType)
    const { prizeId, prize: newPrize } = getMergePrizeSameType(
      listPrize,
      generatePrize,
    )
    listPrize[prizeId] = newPrize
  }
  return listPrize
}

export const getZeroQuantityPrizeIds = (listPrizeOb: ListPrizeOb) => {
  const listDeleteId: string[] = []
  const prizes = getPrizes(listPrizeOb)
  prizes.forEach((prize) => {
    if (!prize.number || prize.number === 0) listDeleteId.push(prize.id)
  })
  return listDeleteId
}
