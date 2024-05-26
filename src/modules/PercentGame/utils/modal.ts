/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from 'antd'
import { ModalExtraProps } from 'modules/modal/types'
import { MODAL_EXTRA_PROPS_DEFAULT } from 'modules/modal/constants'

interface ModalProps {
  title?: string
  content?: any
  centered?: boolean
  modalExtraProps?: ModalExtraProps
  className?: string
  onOk?: () => void
}

const getModalProps = (props: ModalProps) => {
  const { modalExtraProps, onOk, ...rest } = props
  return {
    ...rest,
    content: props.content || null,
    ...(modalExtraProps || MODAL_EXTRA_PROPS_DEFAULT),
    className: `game-module-percent-game-modal ${props.className}`,
    centered: props.centered || false,
    ...(typeof onOk === 'function' ? { onOk } : {}),
  }
}

export const showModalInfo = (props: ModalProps) => {
  Modal.info({
    ...getModalProps(props),
    title: props.title || '',
  })
}

export const showModalSuccess = (props: ModalProps) => {
  Modal.success({
    ...getModalProps(props),
    title: props.title || 'Success',
  })
}

export const showModalError = (props: ModalProps) => {
  Modal.error({
    ...getModalProps(props),
    title: props.title || 'Error',
  })
}

export const showModalConfirm = (props: ModalProps) => {
  Modal.confirm({
    ...getModalProps(props),
    title: props.title || 'Confirm',
  })
}
