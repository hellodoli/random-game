import React from 'react'
import modal from 'modules/modal/provider'

import { Button } from 'antd'
import { ScrollUnfurled } from 'components/Icons/Game'
import PrizeView from 'modules/PercentGame/components/PrizeView'

import Filters from './Filters'

const InsideMyBag = () => {
  const onOpenRefining = () => {
    modal.percentGame.refining({
      maskClosable: false,
    })
  }
  return (
    <div>
      <Filters />
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <PrizeView isBorderWrapper={false} />
      </div>
      <div className="section-border section-rounded">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Button
            type="primary"
            className="btn-item-action"
            icon={<ScrollUnfurled size={24} />}
            onClick={onOpenRefining}
          />
          <Button
            type="primary"
            className="btn-item-action"
            onClick={onOpenRefining}
          />
        </div>
      </div>
    </div>
  )
}

export default InsideMyBag
