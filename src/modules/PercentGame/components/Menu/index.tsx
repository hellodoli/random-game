import React from 'react'
import { Button } from 'antd'
import modal from 'modules/modal/provider'
import { ScrollUnfurled } from 'components/Icons/Game'
import Bag from '../Header/Bag'
import './style.scss'

const Menu = () => {
  const onClickOpenMerge = () => {
    modal.percentGame.refining({
      maskClosable: false,
    })
  }
  return (
    <div className="game-menu-area section-border">
      <Bag iconSize={28} />
      <Button
        type="primary"
        icon={<ScrollUnfurled size={28} classNames="my-bag-icon" />}
        className="btn-item-action btn-open-bag size--medium"
        onClick={onClickOpenMerge}
        style={{
          width: '100%',
          marginTop: 10,
          borderRadius: 20,
        }}
      />
    </div>
  )
}

export default Menu
