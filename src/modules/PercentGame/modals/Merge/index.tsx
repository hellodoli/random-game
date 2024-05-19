import React from 'react'
import { BaseModalProps, Modal } from 'modules/modal'

import Menu from './Menu'

const Refining = (props: BaseModalProps) => {
  const { type: modalType } = props
  return (
    <Modal modalType={modalType} className="game-module-percent-game-modal">
      <Menu />
    </Modal>
  )
}

export default Refining
