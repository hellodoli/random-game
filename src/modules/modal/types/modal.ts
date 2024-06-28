import { ReactNode } from 'react'
import { ModalExtraProps } from './data'

interface Base {
  // optional
  centered?: boolean
  className?: string
  wrapClassName?: string
  isHideCancel?: boolean
  isDisabledCancel?: boolean
  isDisabledOk?: boolean
}

export interface BaseModalProps {
  type: string
}

export interface BaseModalCompProps extends Base {
  children?: ReactNode
  modalExtraProps?: ModalExtraProps
  isOpen: boolean
  onClose: () => void
  onCancel?: () => void
  onOk?: () => void
}

export interface ModalCompProps extends Base {
  children?: ReactNode
  modalType: string
}

export type ListModalNameArr = string[]

export interface ListModalNameOb {
  [key: string]: string
}
