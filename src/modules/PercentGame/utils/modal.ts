/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from 'antd'
import { ModalExtraProps } from 'modules/modal/types'
import { MODAL_EXTRA_PROPS_DEFAULT } from 'modules/modal/constants'

interface ModalProps {
  title?: string
  content?: any
  centered?: boolean
  modalExtraProps?: ModalExtraProps
}

export const showModalInfo = ({
  title = '',
  content = null,
  modalExtraProps = MODAL_EXTRA_PROPS_DEFAULT,
  centered = false,
}: ModalProps) => {
  Modal.info({
    title,
    content,
    onOk() {},
    className: 'game-module-percent-game-modal',
    ...modalExtraProps,
    centered,
  })
}

export const showModalSuccess = ({
  title = 'Success',
  content = null,
  modalExtraProps = MODAL_EXTRA_PROPS_DEFAULT,
  centered = false,
}: ModalProps) => {
  Modal.success({
    title,
    content,
    onOk() {},
    className: 'game-module-percent-game-modal',
    ...modalExtraProps,
    centered,
  })
}

export const showModalError = ({
  title = 'Error',
  content = null,
  modalExtraProps = MODAL_EXTRA_PROPS_DEFAULT,
  centered = false,
}: ModalProps) => {
  Modal.error({
    title,
    content,
    className: 'game-module-percent-game-modal',
    ...modalExtraProps,
    centered,
  })
}
