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
  isMirror?: boolean
}

const Bag = ({
  rounded = false,
  iconSize = 20,
  btnStyle = btnStyleDefault,
  shape = 'default',
  isMirror = false,
}: Props) => {
  const onClick = () => {
    if (!isMirror) {
      modal.percentGame.openBag({
        maskClosable: false,
      })
    }
  }
  return (
    <Button
      type="primary"
      shape={rounded ? 'circle' : shape}
      icon={<Backpack size={iconSize} classNames="my-bag-icon" />}
      className="btn-item btn-item-action btn-open-bag size--medium"
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
