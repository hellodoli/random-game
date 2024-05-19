import { MODAL_TYPE } from 'modules/modal'

import Bag from './Bag'
import Merge from './Merge'

export const modalViews = {
  [MODAL_TYPE.PERCENT_GAME.OPEN_BAG]: Bag,
  [MODAL_TYPE.PERCENT_GAME.REFINING]: Merge,
}
