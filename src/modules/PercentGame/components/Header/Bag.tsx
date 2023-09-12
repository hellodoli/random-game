import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'antd'
import { Flex } from '@gapo_ui/components'
import { Backpack } from 'components/Icons/Game'
import PrizeView from 'modules/PercentGame/components/PrizeView'
import { SORT_TYPE } from 'modules/PercentGame/types/enum'
import { actions } from 'modules/PercentGame/slices'

interface Props {
  rounded?: boolean
}

const Block = () => {
  const dispatch = useDispatch()
  const sort = (sortType: SORT_TYPE) => {
    dispatch(actions.sortPrize({ type: sortType }))
  }
  return (
    <div>
      <PrizeView />
      <div>
        <br />
        <button onClick={() => sort(SORT_TYPE.DOWN_TO)}>Sort down </button>{' '}
        <button onClick={() => sort(SORT_TYPE.UP_TO)}>Sort up </button>
      </div>
    </div>
  )
}

const Bag = ({ rounded = false }: Props) => {
  const [open, setOpen] = useState(false)
  const onClick = () => setOpen(true)

  return (
    <Flex
      UNSAFE_className="consume-item bag"
      alignItems="center"
      marginEnd={rounded ? 10 : 0}
    >
      <Button
        type="primary"
        shape="circle"
        icon={<Backpack width={20} height={20} classNames="my-bag-icon" />}
        size="middle"
        className="my-bag-btn btn-item-action"
        onClick={onClick}
        style={{
          width: rounded ? 'auto' : '100%',
          borderRadius: rounded ? '50%' : '20px',
        }}
      />
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        centered={true}
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Block />
      </Modal>
    </Flex>
  )
}

export default memo(Bag)
