import { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { GradientSet } from 'types'
import { SORT_TYPE, Prize, PercentGameState } from 'modules/PercentGame/types'
import { isSamePrize } from 'modules/PercentGame/utils'
// import /*DEFAULT_LIST_PRIZE_OB*/ 'modules/PercentGame/constants'

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
    const isFullSlot = !state.slots.includes(null)
    if (prize && !isFullSlot && prize.number && prize.number > 0) {
      let number = prize.number || 0
      number -= 1
      if (number < 0) number = 0

      const emptySlotIndex = state.slots.indexOf(null)
      if (emptySlotIndex >= 0) {
        state.slots[emptySlotIndex] = { ...prize, id: uuidv4(), number: 1 }
      }

      state.prizes = state.prizes.map((prize) => {
        if (prize.id === id)
          return {
            ...prize,
            number,
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
      state.slots = [null, null, null, null]
    }
  },
  // mergeRefining: () => {},
}
