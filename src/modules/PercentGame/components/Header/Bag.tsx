import React, { memo } from 'react'
import clsx from 'clsx'
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
      className={clsx('btn-item btn-item-action btn-open-bag size--medium', {
        'rounded-[50%]': rounded,
        'rounded-3xl': !rounded,
      })}
      onClick={onClick}
      style={{
        width: rounded ? 'auto' : '100%',
        ...btnStyle,
      }}
    />
  )
}

export default memo(Bag)
