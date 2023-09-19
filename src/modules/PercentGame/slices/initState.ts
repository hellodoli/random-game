import {
  DEFAULT_MONEY,
  DEFAULT_TICKET_NUMBER,
  GRADIENT_COLOR_SET,
  DEFAULT_SLOTS,
} from 'modules/PercentGame/constants'
import { MERGE_STATUS, PercentGameState } from '../types'
import { getRandomPrizes } from 'modules/PercentGame/utils/prize'

const initialState: PercentGameState = {
  money: DEFAULT_MONEY,
  ticket: DEFAULT_TICKET_NUMBER,
  isRolling: false,
  progress: 0,
  prizes: getRandomPrizes(),
  setPrizes: [], // cache prizes in one roll
  prize: null,
  prizeHover: null,
  rollColorGradient: GRADIENT_COLOR_SET.BRONZE,
  slots: DEFAULT_SLOTS,
  mergeStatus: MERGE_STATUS.PREPARE,
  mergeActions: {
    pickUpPrizeToBagAfterMerge: false,
  },
}

export { initialState }
