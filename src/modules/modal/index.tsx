import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { useModal, useModalSlice } from './hooks'
import { selectModals } from './selectors'
import { MODAL_TYPE } from './constants'
import { showModal } from './helper'
import { allViews } from './modalViews'
import BaseModal from './BaseModal'
import Modal from './Modal'

const Modals = () => {
  useModalSlice()
  const modals = useSelector(selectModals)

  const renderModal = useCallback((type: string) => {
    const ModalComponent = allViews[type]
    if (ModalComponent) {
      return <ModalComponent key={type} type={type} />
    }
    return null
  }, [])

  return <>{modals.map((type) => renderModal(type))}</>
}

export * from './types'
export { Modals, BaseModal, Modal, MODAL_TYPE, showModal, useModal }
