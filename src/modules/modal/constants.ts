import { ModalExtraProps } from './types'
import { getMergeModalName } from './helper'

const modalPercentGame = getMergeModalName('PERCENT_GAME', [
  'OPEN_BAG',
  'REFINING',
  'EDIT_THEME',
])

export const MODAL_TYPE = {
  ...modalPercentGame.list,
}

export const MODAL_EXTRA_PROPS_DEFAULT: ModalExtraProps = {
  maskClosable: true,
  closable: false,
}
