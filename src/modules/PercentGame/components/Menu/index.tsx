import React from 'react'
import { Button } from 'antd'
import { openModalRefining } from 'modules/PercentGame/utils/modal'
import { AnvilImpact } from 'components/Icons/Game'
import Bag from '../Header/Bag'

const Menu = () => {
  return (
    <div
      className="game-menu-area section-border flex-1"
      style={{ padding: 'var(--body-gap)' }}
    >
      <Bag iconSize={28} />
      <Button
        type="primary"
        icon={<AnvilImpact size={28} />}
        className="btn-item btn-item-action btn-open-bag size--medium w-full mt-3 rounded-3xl"
        onClick={() => openModalRefining()}
        style={{
          width: '100%',
        }}
      />
    </div>
  )
}

export default Menu
