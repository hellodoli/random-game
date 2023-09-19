import { MODAL_TYPE } from 'modules/modal'

import OpenBag from './OpenBag'
import Merge from './Merge'

export const modalViews = {
  [MODAL_TYPE.PERCENT_GAME.OPEN_BAG]: OpenBag,
  [MODAL_TYPE.PERCENT_GAME.REFINING]: Merge,
}
