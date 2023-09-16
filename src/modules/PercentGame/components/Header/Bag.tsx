import React, { memo } from 'react'
import { Button } from 'antd'
import modal from 'modules/modal/provider'
import { Backpack } from 'components/Icons/Game'

const btnStyleDefault = {}

interface Props {
  rounded?: boolean
  iconSize?: number
  btnStyle?: { [key: string]: string | number }
  shape?: 'circle' | 'round' | 'default'
}

const Bag = ({
  rounded = false,
  iconSize = 20,
  btnStyle = btnStyleDefault,
  shape = 'default',
}: Props) => {
  const onClick = () => {
    modal.percentGame.openBag()
  }
  return (
    <Button
      type="primary"
      shape={rounded ? 'circle' : shape}
      icon={<Backpack size={iconSize} classNames="my-bag-icon" />}
      className="btn-item-action btn-open-bag size--medium"
      onClick={onClick}
      style={{
        width: rounded ? 'auto' : '100%',
        borderRadius: rounded ? '50%' : 20,
        ...btnStyle,
      }}
    />
  )
}

export default memo(Bag)
