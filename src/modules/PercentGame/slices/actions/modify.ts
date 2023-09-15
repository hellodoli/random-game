import { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { GradientSet } from 'types'
import { SORT_TYPE, Prize, PercentGameState } from 'modules/PercentGame/types'
import {
  isSamePrize,
  getMergePrizeSameType,
  getFilterNumberZeroPrizes,
} from 'modules/PercentGame/utils'
import {
  getNextGradientSet,
  getPrizeResultWhenMergeRandom,
} from 'modules/PercentGame/utils/merge'
import { DEFAULT_SLOTS } from 'modules/PercentGame/constants'

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
  selectPrizeForRefining: (
    state: PercentGameState,
    action: PayloadAction<{ id: string }>,
  ) => {
    const { id } = action.payload
    const prize = state.prizes.find((prize) => prize.id === id)
    const prizeCount = prize?.number || 0
    const isFullSlot = !state.slots.includes(null)
    if (prize && !isFullSlot && prizeCount > 0) {
      const emptySlotIndex = state.slots.indexOf(null)
      if (emptySlotIndex >= 0) {
        state.slots[emptySlotIndex] = { ...prize, id: uuidv4(), number: 1 }
      }
      state.prizes = state.prizes.map((prize) => {
        if (prize.id === id) {
          let number = prizeCount
          number -= 1
          if (number < 0) number = 0
          return {
            ...prize,
            number,
          }
        }
        return prize
      })
    }
  },
  unSelectPrizeForRefining: (
    state: PercentGameState,
    action: PayloadAction<{ id: string }>,
  ) => {
    const { id } = action.payload
    const selectPrize = state.slots.find((slot) => slot?.id === id)
    if (selectPrize) {
      let index = -1
      const slots = state.slots
      slots.forEach((slot, i) => {
        if (selectPrize.id === slot?.id) index = i
      })
      if (index >= 0) state.slots[index] = null

      state.prizes = state.prizes.map((prize) => {
        if (isSamePrize(prize, selectPrize)) {
          return {
            ...prize,
            number: (prize.number || 0) + 1,
          }
        }
        return prize
      })
    }
  },
  resetRefining: (state: PercentGameState) => {
    const slots = state.slots.filter((slot) => slot) as Prize[]
    if (slots.length) {
      const prizes = [...state.prizes]
      slots.forEach((slot) => {
        prizes.forEach((prize, index) => {
          if (isSamePrize(prize, slot)) {
            state.prizes[index] = {
              ...state.prizes[index],
              number: (state.prizes[index]?.number || 0) + 1,
            }
          }
        })
      })
      state.slots = DEFAULT_SLOTS
    }
  },
  mergeRefining: (
    state: PercentGameState,
    action: PayloadAction<{
      rate: number
      randomMergeResult: boolean
      resultPrizeWhenMergeSameIcon: Prize | null
      cb: (isSuccess: boolean) => void
    }>,
  ) => {
    const {
      rate,
      randomMergeResult,
      resultPrizeWhenMergeSameIcon: prizeWhenMergeSameIcon,
      cb,
    } = action.payload
    let newPrize: Prize | null = null
    const isSuccess = rate === 1 ? true : Math.random() <= rate

    if (!isSuccess) {
      state.slots = DEFAULT_SLOTS
      state.prizes = getFilterNumberZeroPrizes(state.prizes)
      cb(false)
      return
    }

    // create new prize
    const createNewPrize = (prize: Prize | null) => {
      if (prize) {
        return {
          ...prize,
          id: uuidv4(),
          gradientSet: getNextGradientSet(prize.gradientSet),
        }
      }
      return null
    }
    if (randomMergeResult) {
      const { prize } = getPrizeResultWhenMergeRandom([...state.slots])
      newPrize = createNewPrize(prize)
    } else {
      newPrize = createNewPrize(prizeWhenMergeSameIcon)
    }

    // merge new prize to exist prizes
    if (newPrize) {
      const newPrizes = getMergePrizeSameType(state.prizes, newPrize).prizes
      state.slots = DEFAULT_SLOTS
      state.prizes = getFilterNumberZeroPrizes(newPrizes)
    }
    cb(true)
  },
}
