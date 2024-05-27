import { GradientSet } from 'types'
import { Slots, Slot, Prize } from 'modules/PercentGame/types'
import {
  GRADIENT_COLOR_SET,
  DEFAULT_HIGHEST_GRADIENT_SET,
  DEFAULT_GRADIENT_COLOR_SET,
} from 'modules/PercentGame/constants'

interface MergeInfoProps {
  slots: Slots
  isMergeSameLevel?: boolean
  isMergeSameIconType?: boolean
}

export const getLevel = (gradientSet: GradientSet) => {
  return parseInt(`${gradientSet}`)
}

export const getPrizesFromSlots = (slots: Slots) =>
  slots.filter((slot) => slot) as Slot[]

export const getPrizeFromSlot = (slot: Slot | null): Prize | null => {
  if (!slot) return null
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slotId, ...rest } = slot
  return { ...rest }
}

export const isIncludeHighestLevel = (slots: Slots) => {
  const hightestLevel = getLevel(DEFAULT_HIGHEST_GRADIENT_SET)
  const slotsPrize = getPrizesFromSlots(slots)
  return slotsPrize.some(
    (prize) => getLevel(prize.gradientSet) === hightestLevel,
  )
}

export const getPrizeResultWhenMergeSameIcon = (slots: Slots) => {
  let slot = null
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
    slot,
    prize: getPrizeFromSlot(slot),
    gradientSet: slot ? slot.gradientSet : null,
    level: slot ? getLevel(slot.gradientSet) : -1,
  }
}

export const getPrizeResultWhenMergeRandom = (slots: Slots) => {
  let slot = null
  const slotsPrize = getPrizesFromSlots(slots)
  if (slotsPrize.length) {
    const listLevel: number[] = []
    const listRandomPrize: Slot[] = []
    slotsPrize.forEach((prize) => {
      const level = getLevel(prize.gradientSet)
      if (!listLevel.includes(level)) {
        listRandomPrize.push(prize)
      }
    })
    const index = Math.floor(Math.random() * listRandomPrize.length)
    slot = listRandomPrize[index]
  }

  return {
    slotsPrize,
    slot,
    prize: getPrizeFromSlot(slot),
    gradientSet: slot ? slot.gradientSet : null,
    level: slot ? getLevel(slot.gradientSet) : -1,
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
  const gradient = GRADIENT_COLOR_SET[gradientSet]
  const fromColor = gradient.FROM || DEFAULT_GRADIENT_COLOR_SET.FROM
  const toColor = gradient.TO || DEFAULT_GRADIENT_COLOR_SET.TO
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
  let resultPrizeWhenMergeSameIcon = null
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
  let resultPrizeWhenMergeSameIcon = null

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

export const getNextGradientSet = (gradientSet: GradientSet) => {
  switch (gradientSet) {
    case GradientSet.BRONZE:
      return GradientSet.SILVER
    case GradientSet.SILVER:
      return GradientSet.GOLD
    case GradientSet.GOLD:
      return GradientSet.DIAMOND
    default:
      return gradientSet
  }
}
