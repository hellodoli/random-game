import React from 'react'
import { BaseModalProps, BaseModal, useModal } from 'modules/modal'

import Menu from './Menu'

const Refining = (props: BaseModalProps) => {
  const { type: modalType } = props
  const { isOpen, onClose } = useModal(modalType)
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="game-module-percent-game-modal"
    >
      <Menu />
    </BaseModal>
  )
}

export default Refining
