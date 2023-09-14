import { MODAL_TYPE, showModal } from 'modules/modal'

export const showModals = {
  openBag: showModal(MODAL_TYPE.PERCENT_GAME.OPEN_BAG),
  refining: showModal(MODAL_TYPE.PERCENT_GAME.REFINING), // dung luyện
}
