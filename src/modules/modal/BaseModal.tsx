import React, { useCallback } from 'react'
import { Modal } from 'antd'
import { BaseModalCompProps } from './types'
import { MODAL_EXTRA_PROPS_DEFAULT } from './constants'

const BaseModal = ({
  children,
  isOpen,
  onClose,
  centered = true,
  className = '',
  modalExtraProps = MODAL_EXTRA_PROPS_DEFAULT,
}: BaseModalCompProps) => {
  const {
    maskClosable = MODAL_EXTRA_PROPS_DEFAULT.maskClosable,
    closable = MODAL_EXTRA_PROPS_DEFAULT.closable,
  } = modalExtraProps

  const onOk = useCallback(() => {
    onClose()
  }, [])

  const onCancel = useCallback(() => {
    onClose()
  }, [])

  return (
    <Modal
      open={isOpen}
      centered={centered}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={maskClosable}
      closable={closable}
      cancelButtonProps={{ style: { display: 'none' } }}
      className={className}
    >
      {children}
    </Modal>
  )
}

export default BaseModal
