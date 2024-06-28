import React, { useCallback, useMemo } from 'react'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'
import { BaseModalCompProps } from './types'
import { MODAL_EXTRA_PROPS_DEFAULT } from './constants'
import { themeProviderClass, themeProviderMirrorClass } from 'utils/settings'
import { isMirrorSelector } from 'modules/PercentGame/selectors'

const BaseModal = ({
  children,
  isOpen,
  onClose,
  centered = true,
  className = '',
  wrapClassName = '',
  modalExtraProps = MODAL_EXTRA_PROPS_DEFAULT,
  isHideCancel = true,
  isDisabledCancel = false,
  isDisabledOk = false,
  onCancel: onCancelProp,
  onOk: onOkProp,
}: BaseModalCompProps) => {
  const isMirror = useSelector(isMirrorSelector)
  const {
    maskClosable = MODAL_EXTRA_PROPS_DEFAULT.maskClosable,
    closable = MODAL_EXTRA_PROPS_DEFAULT.closable,
  } = modalExtraProps

  const cancelButtonProps = useMemo(
    () => ({
      style: { ...(isHideCancel && { display: 'none' }) },
      disabled: isDisabledCancel,
    }),
    [isHideCancel, isDisabledCancel],
  )

  const okButtonProps = useMemo(
    () => ({
      disabled: isDisabledOk,
    }),
    [isDisabledOk],
  )

  const onOk = useCallback(() => {
    onOkProp?.()
    onClose()
  }, [])

  const onCancel = useCallback(() => {
    onCancelProp?.()
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
      cancelButtonProps={cancelButtonProps}
      okButtonProps={okButtonProps}
      className={className}
      wrapClassName={`${
        isMirror ? themeProviderMirrorClass : themeProviderClass
      } ${wrapClassName}`}
    >
      {children}
    </Modal>
  )
}

export default BaseModal
