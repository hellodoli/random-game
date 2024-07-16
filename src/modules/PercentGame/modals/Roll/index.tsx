import React from 'react'
import { BaseModalProps, BaseModal, useModal } from 'modules/modal'

import Header from 'modules/PercentGame/components/Header'
import RollAction from 'modules/PercentGame/components/RollAction'

const Roll = ({ type: modalType }: BaseModalProps) => {
  const { isOpen, onClose, modalExtraProps } = useModal(modalType)
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="game-module-percent-game-modal"
      modalExtraProps={modalExtraProps}
    >
      <div className="game-rolling-area__resert-modal">
        <Header />
        <RollAction />
      </div>
    </BaseModal>
  )
}

export default Roll
