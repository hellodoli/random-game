import { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import {
  Prize,
  PercentGameState,
  MERGE_STATUS,
  MergeActions,
  Slot,
  Slots,
} from 'modules/PercentGame/types'
import {
  getMergePrizeSameType,
  getZeroQuantityPrizeIds,
  getPrizesFromSlots,
} from 'modules/PercentGame/utils'
import {
  getNextGradientSet,
  getPrizeResultWhenMergeRandom,
} from 'modules/PercentGame/utils/merge'
import { DEFAULT_SLOTS } from 'modules/PercentGame/constants'

export const modifyActions = {
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
    const prize = state.prizes[id]
    const prizeCount = prize.number
    const isFullSlot = !state.slots.includes(null)

    if (prize && !isFullSlot && prizeCount > 0) {
      const emptySlotIndex = state.slots.indexOf(null)
      // update empty slot with `Prize`
      if (emptySlotIndex >= 0) {
        const newSlot = {
          ...prize,
          slotId: uuidv4(), // create new `Slot` with `slotId`
          number: 1, // ratain count = 1
        }
        state.slots[emptySlotIndex] = newSlot
      }
      // update number of `Prize`
      state.prizes[id] = {
        ...state.prizes[id],
        number: prizeCount - 1,
      }
      // update `state.mergeStatus`
      state.mergeStatus = MERGE_STATUS.PREPARE
    }
  },
  unSelectPrizeForMerge: (
    state: PercentGameState,
    action: PayloadAction<{ slotId: string; id: string }>,
  ) => {
    const { slotId, id } = action.payload
    const selectSlot = state.slots.find((slot) => slot?.slotId === slotId)
    const targetPrize = state.prizes[id]
    if (selectSlot && targetPrize) {
      state.slots = state.slots.map((slot) => {
        if (slot?.slotId === slotId) return null
        return slot
      }) as Slots
      state.prizes[id] = {
        ...targetPrize,
        number: targetPrize.number + 1,
      }
      state.mergeStatus = MERGE_STATUS.PREPARE
    }
  },
  selectResultPrize: (
    state: PercentGameState,
    action: PayloadAction<{ prize: Prize }>,
  ) => {
    const { prize } = action.payload
    const { prizeId, prize: newPrize } = getMergePrizeSameType(
      state.prizes,
      prize,
    )
    state.prizes[prizeId] = newPrize
    state.mergeStatus = MERGE_STATUS.INITITAL
  },
  resetMerge: (state: PercentGameState) => {
    const slots = getPrizesFromSlots(state.slots)
    slots.forEach((slot) => {
      const id = slot.id
      state.prizes[id] = {
        ...state.prizes[id],
        number: state.prizes[id].number + 1,
      }
    })
    state.slots = DEFAULT_SLOTS
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
      const prizes = { ...state.prizes }
      const slots = state.slots.filter((slot) => slot) as Slot[]
      const slotIds = slots.map((slot) => slot.id)
      slotIds.forEach((id) => {
        const prize = prizes[id]
        if (prize && (!prize.number || prize.number === 0)) delete prizes[id]
      })

      state.slots = DEFAULT_SLOTS
      state.prizes = prizes
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
    const generatePrize = randomMergeResult
      ? createNewPrize(getPrizeResultWhenMergeRandom([...state.slots]).prize)
      : createNewPrize(prizeWhenMergeSameIcon)

    // merge new prize to exist prizes
    if (generatePrize) {
      const { pickUpPrizeToBagAfterMerge: autoPickUp } = state.mergeActions
      const prizes = { ...state.prizes }

      if (autoPickUp) {
        const { prizeId, prize: newPrize } = getMergePrizeSameType(
          state.prizes,
          generatePrize,
        )
        prizes[prizeId] = newPrize
      }

      const zeroQuantityPrizeIds = getZeroQuantityPrizeIds(prizes)
      zeroQuantityPrizeIds.forEach((id) => delete prizes[id])

      state.slots = DEFAULT_SLOTS
      state.prizes = prizes
      state.mergeStatus = MERGE_STATUS.MERGE_SUCCESS
    }
    cb(true, generatePrize)
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
