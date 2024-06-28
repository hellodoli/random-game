import {
  DEFAULT_MONEY,
  DEFAULT_TICKET_NUMBER,
  DEFAULT_SLOTS,
  DEFAULT_GRADIENT_COLOR_SET,
} from 'modules/PercentGame/constants'
import { MERGE_STATUS, META_STATUS, PercentGameState } from '../types'
import { getRandomPrizes } from 'modules/PercentGame/utils/prize'

const initialState: PercentGameState = {
  money: DEFAULT_MONEY,
  ticket: DEFAULT_TICKET_NUMBER,
  isRolling: false,
  progress: 0,
  prizes: getRandomPrizes(),
  setPrizes: {}, // cache prizes in one roll
  prize: null,
  prizeHover: null,
  rollColorGradient: DEFAULT_GRADIENT_COLOR_SET,
  slots: DEFAULT_SLOTS,
  mergeStatus: MERGE_STATUS.PREPARE,
  mergeActions: {
    pickUpPrizeToBagAfterMerge: false,
  },
  isSelling: false,
  isCutting: false,
  metaStatus: META_STATUS.INITITAL,
  isMirror: false,
}

export { initialState }
