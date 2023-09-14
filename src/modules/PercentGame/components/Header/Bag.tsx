import React, { memo } from 'react'
import { Button } from 'antd'
import modal from 'modules/modal/provider'
import { Backpack } from 'components/Icons/Game'

interface Props {
  rounded?: boolean
}

const Bag = ({ rounded = false }: Props) => {
  const onClick = () => {
    modal.percentGame.openBag()
  }
  return (
    <div
      className="consume-item bag"
      style={{
        marginRight: rounded ? 10 : 0,
      }}
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
          borderRadius: rounded ? '50%' : '4px',
        }}
      />
    </div>
  )
}

export default memo(Bag)
