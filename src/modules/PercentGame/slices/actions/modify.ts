import { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import {
  SORT_TYPE,
  Prize,
  PercentGameState,
  MERGE_STATUS,
  MergeActions,
} from 'modules/PercentGame/types'
import {
  isSamePrize,
  getMergePrizeSameType,
  getFilterNumberZeroPrizes,
} from 'modules/PercentGame/utils'
import {
  getNextGradientSet,
  getPrizeResultWhenMergeRandom,
} from 'modules/PercentGame/utils/merge'
import { getSortPrizes } from 'modules/PercentGame/utils/sort'
import { DEFAULT_SLOTS, DEFAULT_SORT } from 'modules/PercentGame/constants'

export const modifyActions = {
  sortPrize: (
    state: PercentGameState,
    action: PayloadAction<{ type?: SORT_TYPE }>,
  ) => {
    const { type = DEFAULT_SORT } = action.payload
    const sortPrizes = getSortPrizes(state.prizes, type)
    state.prizes = sortPrizes
  },
  hoverPrize: (
    state: PercentGameState,
    action: PayloadAction<{ prize?: Prize | null }>,
  ) => {
    const { prize = null } = action.payload
    state.prizeHover = prize
  },
  // merge prize
  selectPrizeForMerge: (
    state: PercentGameState,
    action: PayloadAction<{ id: string }>,
  ) => {
    const { id } = action.payload
    const prize = state.prizes.find((prize) => prize.id === id)
    const prizeCount = prize?.number || 0
    const isFullSlot = !state.slots.includes(null)
    if (prize && !isFullSlot && prizeCount > 0) {
      const emptySlotIndex = state.slots.indexOf(null)
      if (emptySlotIndex >= 0)
        state.slots[emptySlotIndex] = { ...prize, id: uuidv4(), number: 1 }
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
      state.mergeStatus = MERGE_STATUS.PREPARE
    }
  },
  unSelectPrizeForMerge: (
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
      state.mergeStatus = MERGE_STATUS.PREPARE
    }
  },
  selectResultPrize: (
    state: PercentGameState,
    action: PayloadAction<{ prize: Prize }>,
  ) => {
    const { prize } = action.payload
    state.prizes = getMergePrizeSameType(state.prizes, prize).prizes
    state.mergeStatus = MERGE_STATUS.INITITAL
  },
  resetMerge: (state: PercentGameState) => {
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
    state.mergeStatus = MERGE_STATUS.INITITAL
  },
  merge: (
    state: PercentGameState,
    action: PayloadAction<{
      rate: number
      randomMergeResult: boolean
      resultPrizeWhenMergeSameIcon: Prize | null
      cb: (isSuccess: boolean, prize: Prize | null) => void
    }>,
  ) => {
    const {
      rate,
      randomMergeResult,
      resultPrizeWhenMergeSameIcon: prizeWhenMergeSameIcon,
      cb,
    } = action.payload
    const isSuccess = rate === 1 ? true : Math.random() <= rate

    if (!isSuccess) {
      state.slots = DEFAULT_SLOTS
      state.prizes = getFilterNumberZeroPrizes(state.prizes)
      state.mergeStatus = MERGE_STATUS.MERGE_FAILED
      cb(false, null)
      return
    }

    // create new prize
    const createNewPrize = (prize: Prize | null): Prize | null => {
      if (prize) {
        return {
          ...prize,
          id: uuidv4(),
          gradientSet: getNextGradientSet(prize.gradientSet),
        }
      }
      return null
    }
    const newPrize = randomMergeResult
      ? createNewPrize(getPrizeResultWhenMergeRandom([...state.slots]).prize)
      : createNewPrize(prizeWhenMergeSameIcon)

    // merge new prize to exist prizes
    if (newPrize) {
      const { pickUpPrizeToBagAfterMerge: autoPickUp } = state.mergeActions
      state.slots = DEFAULT_SLOTS
      const newPrizes = autoPickUp
        ? getMergePrizeSameType(state.prizes, newPrize).prizes
        : state.prizes
      state.prizes = getFilterNumberZeroPrizes(newPrizes)
      state.mergeStatus = MERGE_STATUS.MERGE_SUCCESS
    }
    cb(true, newPrize)
  },
  changeMergeActions: (
    state: PercentGameState,
    action: PayloadAction<{
      mergeActions: Partial<MergeActions>
    }>,
  ) => {
    const { mergeActions } = action.payload
    state.mergeActions = { ...state.mergeActions, ...mergeActions }
  },
}
