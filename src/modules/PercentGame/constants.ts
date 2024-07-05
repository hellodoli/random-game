import { GRADIENT_COLOR_SET, DEFAULT_GRADIENT_COLOR_SET } from '../../constants'
import { GradientSet } from 'types/enum/icon'
import {
  /* enum */
  RESULT_ROLL_TYPE,
  SORT_TYPE,
  MERGE_STATUS,
  /* interface */
  Slots,
  ListSortPrizeArr,
  PrizeSet,
  TrackMouseOptions,
} from './types'

export * from './data'
export { GRADIENT_COLOR_SET, DEFAULT_GRADIENT_COLOR_SET }

/**
 * default state value
 * OPERATION WHEN START GAME
 */
export const DEFAULT_TICKET_PRICE = 5
export const DEFAULT_TICKET_NUMBER = 128
export const DEFAULT_MONEY = 320
export const DEFAULT_ITEM_RANDOM_NUMBER = 50
export const DEFAULT_ITEM_RANDOM_TYPE = [
  RESULT_ROLL_TYPE.BRONZE,
  RESULT_ROLL_TYPE.SILVER,
]

/**
 * ROLL
 * PRIZE
 */
export const DEFAULT_SELL_PRIZE_PERCENT = 0.8

export const DEFAULT_LIST_ROLL_BTN = [
  {
    id: 1,
    name: 'BRONZE',
    rollType: GradientSet.BRONZE,
    consume: 1,
    rates: [
      { rate: 92, type: RESULT_ROLL_TYPE.BRONZE },
      { rate: 2, type: RESULT_ROLL_TYPE.NOTHING },
      { rate: 5, type: RESULT_ROLL_TYPE.SILVER },
      { rate: 1, type: RESULT_ROLL_TYPE.GOLD },
    ],
  },
  {
    id: 2,
    name: 'SILVER',
    rollType: GradientSet.SILVER,
    consume: 4,
    rates: [
      { rate: 92, type: RESULT_ROLL_TYPE.SILVER },
      { rate: 2, type: RESULT_ROLL_TYPE.NOTHING },
      { rate: 5, type: RESULT_ROLL_TYPE.GOLD },
      { rate: 1, type: RESULT_ROLL_TYPE.DIAMOND },
    ],
  },
  {
    id: 3,
    name: 'GOLD',
    rollType: GradientSet.GOLD,
    consume: 16,
    rates: [
      { rate: 93, type: RESULT_ROLL_TYPE.GOLD },
      { rate: 5, type: RESULT_ROLL_TYPE.DIAMOND },
      { rate: 2, type: RESULT_ROLL_TYPE.NOTHING },
    ],
  },
  {
    id: 4,
    name: 'DIAMOND',
    rollType: GradientSet.DIAMOND,
    consume: 64,
    rates: [
      { rate: 98, type: RESULT_ROLL_TYPE.DIAMOND },
      { rate: 2, type: RESULT_ROLL_TYPE.NOTHING },
    ],
  },
]

export const PRIZE_SET: PrizeSet = {
  [GradientSet.BRONZE]: {
    consume: 1,
  },
  [GradientSet.SILVER]: {
    consume: 4,
  },
  [GradientSet.GOLD]: {
    consume: 16,
  },
  [GradientSet.DIAMOND]: {
    consume: 64,
  },
}

export const DEFAULT_HIGHEST_GRADIENT_SET = GradientSet.DIAMOND

/**
 * MERGE
 */
export const DEFAULT_SLOTS: Slots = [null, null, null, null]

/**
 * SORT
 * FILTERS
 */
export const DEFAULT_SORT = SORT_TYPE.UP_TO
export const DEFAULT_SORT_PRIZE: ListSortPrizeArr = [
  {
    label: 'Price: low to high',
    value: DEFAULT_SORT,
  },
  {
    label: 'Price: high to low',
    value: SORT_TYPE.DOWN_TO,
  },
]

/**
 * TRACK MOUSE
 */
export const DEFAULT_TRACK_MOUSE_OPTIONS: TrackMouseOptions = {
  offsetWidth: 0,
  isNotShowWhenInit: false,
}

/**
 * EXP
 */
export const DEFAULT_EXP_TAKE = {
  [MERGE_STATUS.MERGE_FAILED]: 50,
  [MERGE_STATUS.MERGE_SUCCESS]: 200,
}
