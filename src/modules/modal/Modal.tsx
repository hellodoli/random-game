import React from 'react'
import { useModal } from './hooks'
import BaseModal from './BaseModal'
import { ModalCompProps } from './types'

const Modal = ({ children, modalType, ...rest }: ModalCompProps) => {
  const { isOpen, onClose, modalExtraProps } = useModal(modalType)
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modalExtraProps={modalExtraProps}
      {...rest}
    >
      {children}
    </BaseModal>
  )
}

export default Modal
