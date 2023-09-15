import {
  DEFAULT_MONEY,
  DEFAULT_TICKET_NUMBER,
  GRADIENT_COLOR_SET,
} from 'modules/PercentGame/constants'
import { PercentGameState } from 'modules/PercentGame/types/state'
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
  slots: [null, null, null, null],
}

export { initialState }
