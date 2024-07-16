import { Modal } from 'antd'
import { ModalExtraProps } from 'modules/modal/types'
import { MODAL_EXTRA_PROPS_DEFAULT } from 'modules/modal/constants'
import modal from 'modules/modal/provider'
import { themeProviderClass } from 'utils/settings'

interface ModalProps {
  title?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any
  centered?: boolean
  modalExtraProps?: ModalExtraProps
  className?: string
  wrapClassName?: string
  onOk?: () => void
  onCancel?: () => void
}

const getModalProps = (props: ModalProps) => {
  const { modalExtraProps, onOk, onCancel, ...rest } = props
  return {
    ...rest,
    content: props.content || null,
    ...(modalExtraProps || MODAL_EXTRA_PROPS_DEFAULT),
    className: `game-module-percent-game-modal ${props.className || ''}`,
    wrapClassName: `${themeProviderClass}${props.wrapClassName || ''}`,
    centered: props.centered || false,
    ...(typeof onOk === 'function' ? { onOk } : {}),
    ...(typeof onCancel === 'function' ? { onCancel } : {}),
  }
}

export const showModalInfo = (props: ModalProps, isChain = false) => {
  const modalFuncProps = {
    ...getModalProps(props),
    title: props.title || '',
  }
  if (!isChain) {
    Modal.info(modalFuncProps)
    return
  }
  const modal = Modal.info(modalFuncProps)
  const closeModal = () => modal.destroy()
  return {
    modal,
    closeModal,
  }
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

export const openModalRefining = (modalExtraProps?: ModalExtraProps) => {
  modal.percentGame.refining({
    maskClosable: false,
    ...modalExtraProps,
  })
}

export const openModalRoll = (modalExtraProps?: ModalExtraProps) => {
  modal.percentGame.roll({
    maskClosable: false,
    ...modalExtraProps,
  })
}
