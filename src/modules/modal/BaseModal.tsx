import React, { ReactNode, useCallback } from 'react'
import { Modal } from 'antd'
import { ModalExtraProps } from './types'
import { MODAL_EXTRA_PROPS_DEFAULT } from './constants'

interface Props {
  children?: ReactNode
  isOpen: boolean
  onClose: () => void
  // optional
  centered?: boolean
  className?: string
  modalExtraProps?: ModalExtraProps
}

const BaseModal = ({
  children,
  isOpen,
  onClose,
  centered = true,
  className = '',
  modalExtraProps = MODAL_EXTRA_PROPS_DEFAULT,
}: Props) => {
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
