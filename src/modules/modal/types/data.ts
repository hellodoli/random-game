export interface ModalExtraProps {
  maskClosable?: boolean
  closable?: boolean
}

export interface Modal {
  type: string
  modalExtraProps: ModalExtraProps
}
