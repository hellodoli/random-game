import React, { useState, ReactNode } from 'react'
import { Modal } from 'antd'

interface Props {
  children?: ReactNode
}

const Modals = ({ children }: Props) => {
  const [open, setOpen] = useState(true)
  return (
    <Modal
      title="Modal 1000px width"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      {children}
    </Modal>
  )
}

export default Modals
