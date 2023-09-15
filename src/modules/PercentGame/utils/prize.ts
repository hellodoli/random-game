import { v4 as uuidv4 } from 'uuid'
import { GradientSet, Gradient } from 'types'
import {
  RESULT_ROLL_TYPE,
  Prize,
  ICONS,
  IconSize,
} from 'modules/PercentGame/types'
import {
  DEFAULT_LIST_PRIZE_ARR,
  DEFAULT_LIST_PRIZE_OB,
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

export const isSamePrize = (myPrize: Prize, newPrize: Prize) => {
  if (
    myPrize.iconId === newPrize.iconId &&
    myPrize?.gradient === newPrize?.gradient &&
    myPrize?.gradientSet === newPrize?.gradientSet
  )
    return true
  return false
}

export const getMergePrizeSameType = (prizes: Prize[], prize: Prize) => {
  const matchPrize = prizes.find((item) => isSamePrize(item, prize))
  if (!matchPrize) {
    const newPrize = { ...prize, number: 1 }
    return {
      isSameType: false,
      prize: newPrize,
      prizes: [...prizes, newPrize],
    }
  }

  const newPrize: Prize = {
    ...matchPrize,
    ...(typeof matchPrize.number === 'number'
      ? { number: matchPrize.number + 1 }
      : { number: 1 }),
  }

  return {
    isSameType: true,
    prize: newPrize,
    prizes: prizes.map((oldPrize) => {
      if (oldPrize.id === newPrize.id) return newPrize
      return oldPrize
    }),
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
  let prizes: Prize[] = []
  const resultsType = [
    RESULT_ROLL_TYPE.GOLD,
    RESULT_ROLL_TYPE.SILVER,
    RESULT_ROLL_TYPE.BRONZE,
  ]
  for (let i = 0; i < 200; i++) {
    const resultType = getRandomItemFromList(resultsType)
    const newPrize = getPrize(resultType)
    prizes = getMergePrizeSameType(prizes, newPrize).prizes
  }
  return prizes
}

export const getFilterNumberZeroPrizes = (prizes: Prize[]) => {
  return prizes.filter((prize) => !!(prize.number || 0))
}
