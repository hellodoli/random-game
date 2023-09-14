import React, { ReactNode, useCallback } from 'react'
import { Modal } from 'antd'

interface Props {
  children?: ReactNode
  isOpen: boolean
  onClose: () => void
  // optional
  centered?: boolean
  className?: string
}

const BaseModal = ({
  children,
  isOpen,
  onClose,
  centered = true,
  className = '',
}: Props) => {
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
      className={className}
    >
      {children}
    </Modal>
  )
}

export default BaseModal
