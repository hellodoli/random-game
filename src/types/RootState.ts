import { BaseState } from 'reducers/base'

import { ModalState } from 'modules/modal/types'
import { PercentGameState } from 'modules/PercentGame/types'

export interface RootState {
  base?: BaseState
  percentGame?: PercentGameState
  modal?: ModalState
}
