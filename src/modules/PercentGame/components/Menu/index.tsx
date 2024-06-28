import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import modal from 'modules/modal/provider'
import { isMirrorSelector } from 'modules/PercentGame/selectors'
import { AnvilImpact } from 'components/Icons/Game'
import Bag from '../Header/Bag'
import './style.scss'

const Menu = () => {
  const isMirror = useSelector(isMirrorSelector)
  const onClickOpenMerge = () => {
    if (!isMirror) {
      modal.percentGame.refining({
        maskClosable: false,
      })
    }
  }
  return (
    <div className="game-menu-area section-border">
      <Bag iconSize={28} isMirror={isMirror} />
      <Button
        type="primary"
        icon={<AnvilImpact size={28} />}
        className="btn-item btn-item-action btn-open-bag size--medium"
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
