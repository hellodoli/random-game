import React from 'react'
import { useDispatch } from 'react-redux'
import { BaseModalProps, BaseModal, useModal } from 'modules/modal'
import { SORT_TYPE } from 'modules/PercentGame/types/enum'
import { actions } from 'modules/PercentGame/slices'

import { Button } from 'antd'
import PrizeView from 'modules/PercentGame/components/PrizeView'

const MyBag = () => {
  const dispatch = useDispatch()
  const sort = (sortType: SORT_TYPE) => {
    dispatch(actions.sortPrize({ type: sortType }))
  }
  return (
    <div>
      <PrizeView />
      <div>
        <br />
        <Button type="primary" onClick={() => sort(SORT_TYPE.DOWN_TO)}>
          Sort down{' '}
        </Button>{' '}
        <Button type="primary" onClick={() => sort(SORT_TYPE.UP_TO)}>
          Sort up{' '}
        </Button>
      </div>
    </div>
  )
}

const OpenBag = (props: BaseModalProps) => {
  const { type: modalType } = props
  const { isOpen, onClose } = useModal(modalType)
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <MyBag />
    </BaseModal>
  )
}

export default OpenBag
