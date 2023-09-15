import { GradientSet } from 'types'
import { Slots, Prize } from 'modules/PercentGame/types'
import {
  GRADIENT_COLOR_SET_FROM_ENUM,
  GRADIENT_COLOR_SET,
  DEFAULT_HIGHEST_GRADIENT_SET,
} from 'modules/PercentGame/constants'

interface MergeInfoProps {
  slots: Slots
  isMergeSameLevel?: boolean
  isMergeSameIconType?: boolean
}

const getLevel = (gradientSet: GradientSet) => {
  return parseInt(`${gradientSet}`)
}

const getPrizesFromSlots = (slots: Slots) => {
  const slotsPrize = slots.filter((slot) => slot) as Prize[]
  return slotsPrize
}

export const isIncludeHighestLevel = (slots: Slots) => {
  const hightestLevel = getLevel(DEFAULT_HIGHEST_GRADIENT_SET)
  const slotsPrize = getPrizesFromSlots(slots)
  return slotsPrize.some(
    (prize) => getLevel(prize.gradientSet) === hightestLevel,
  )
}

const getPrizeResultWhenMergeSameIcon = (slots: Slots) => {
  let slot: Prize | null = null
  const slotsPrize = getPrizesFromSlots(slots)
  if (slotsPrize.length) {
    let tempSlot = slotsPrize[0]
    slotsPrize.forEach((prize) => {
      const level = getLevel(prize.gradientSet)
      const curLevel = getLevel(tempSlot.gradientSet)
      if (level < curLevel) tempSlot = prize
    })
    slot = tempSlot
  }

  return {
    slotsPrize,
    prize: slot,
    gradientSet: slot ? slot.gradientSet : null,
    level: slot ? parseInt(`${slot.gradientSet}`) : -1,
  }
}

export const getMergeColorBackground = ({
  slots,
  isMergeSameLevel = false,
  isMergeSameIconType = false,
}: MergeInfoProps) => {
  let slot: null | Prize = null
  if (!isMergeSameLevel && !isMergeSameIconType) return ''
  if (isMergeSameLevel) {
    slot = slots[0]
  } else {
    // merge same item
    slot = getPrizeResultWhenMergeSameIcon(slots).prize
  }
  if (!slot) return ''
  const gradientSet = slot.gradientSet
  const gradient = GRADIENT_COLOR_SET_FROM_ENUM[gradientSet]
  const fromColor = gradient?.FROM || GRADIENT_COLOR_SET.BRONZE.FROM
  const toColor = gradient?.TO || GRADIENT_COLOR_SET.BRONZE.TO
  return `linear-gradient(to right, ${fromColor} , ${toColor})`
}

export const getMergeRate = ({
  slots,
  isMergeSameLevel = false,
  isMergeSameIconType = false,
}: MergeInfoProps) => {
  if (!isMergeSameLevel && !isMergeSameIconType) {
    return {
      rate: 0,
      randomMergeResult: false,
      resultPrizeWhenMergeSameIcon: null,
    }
  }
  let randomMergeResult = false
  let rate = 0
  let resultPrizeWhenMergeSameIcon: Prize | null = null
  if (isMergeSameIconType) {
    // same item but various level
    const {
      level: baseLevel,
      slotsPrize,
      prize,
    } = getPrizeResultWhenMergeSameIcon(slots)
    const baseRate = 1 / slotsPrize.length
    slotsPrize.forEach((prize) => {
      const level = getLevel(prize.gradientSet)
      if (level === baseLevel) rate += baseRate
      else {
        let gapLevel = level - baseLevel
        if (gapLevel < 0) gapLevel = gapLevel * -1
        rate += baseRate / Math.pow(slotsPrize.length, gapLevel)
      }
    })
    if (rate < 0) rate = 0
    if (rate > 1) rate = 1
    resultPrizeWhenMergeSameIcon = prize
  } else if (isMergeSameLevel) {
    // various item but same level
    rate = 0.89
    randomMergeResult = true
  }
  return {
    rate,
    randomMergeResult,
    resultPrizeWhenMergeSameIcon,
  }
}

export const getMerge = (slots: Slots) => {
  let isMerge = false
  let isMergeSameLevel = false
  let isMergeSameIconType = false
  let background = ''
  let randomMergeResult = false
  let rate = 0
  let resultPrizeWhenMergeSameIcon: Prize | null = null

  const notMerge = () => ({
    isMerge: false,
    isMergeSameLevel: false,
    isMergeSameIconType: false,
    background: '',
    randomMergeResult: false,
    rate: 0,
    resultPrizeWhenMergeSameIcon: null,
  })

  if (!slots.includes(null)) {
    const slot = slots?.[0]
    const iconId = slot?.iconId || ''
    const gra = slot?.gradient
    const graSet = slot?.gradientSet

    const isSameGradient = slots.every((slot) => slot?.gradient === gra)
    if (!isSameGradient) return notMerge()

    isMergeSameIconType = slots.every((slot) => slot?.iconId === iconId)
    isMergeSameLevel = slots.every((slot) => slot?.gradientSet === graSet)

    if (
      (isMergeSameLevel || isMergeSameIconType) &&
      !isIncludeHighestLevel(slots)
    ) {
      const mergeInfo = {
        slots,
        isMergeSameIconType,
        isMergeSameLevel,
      }
      isMerge = true
      background = getMergeColorBackground(mergeInfo)
      const mergeRate = getMergeRate(mergeInfo)
      rate = mergeRate.rate
      randomMergeResult = mergeRate.randomMergeResult
      resultPrizeWhenMergeSameIcon = mergeRate.resultPrizeWhenMergeSameIcon
    }
  }

  return {
    background,
    isMerge,
    isMergeSameIconType,
    isMergeSameLevel,
    rate,
    randomMergeResult,
    resultPrizeWhenMergeSameIcon,
  }
}
