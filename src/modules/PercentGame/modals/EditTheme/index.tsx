import React from 'react'
import { BaseModalProps, Modal } from 'modules/modal'
import { Form } from 'antd'

const EditTheme = ({ type: modalType }: BaseModalProps) => {
  return (
    <Modal modalType={modalType} className="game-module-percent-game-modal">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Select">Coming soon</Form.Item>
      </Form>
    </Modal>
  )
}

export default EditTheme
