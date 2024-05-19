import React from 'react'
import { BaseModalProps, Modal } from 'modules/modal'
import InsideMyBag from 'modules/PercentGame/components/InsideMyBag'

const Bag = ({ type: modalType }: BaseModalProps) => {
  return (
    <Modal modalType={modalType} className="game-module-percent-game-modal">
      <InsideMyBag />
    </Modal>
  )
}

export default Bag
