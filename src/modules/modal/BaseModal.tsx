import React, { ReactNode, useCallback } from 'react'
import { Modal } from 'antd'

interface Props {
  children?: ReactNode
  isOpen: boolean
  onClose: () => void
  // optional
  centered?: boolean
}

const BaseModal = ({ children, isOpen, onClose, centered = true }: Props) => {
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
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      {children}
    </Modal>
  )
}

export default BaseModal
