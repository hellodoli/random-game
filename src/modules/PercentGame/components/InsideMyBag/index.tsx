import React from 'react'
import { Button } from 'antd'
import modal from 'modules/modal/provider'
import { PRIZE_VIEW_OPEN_FROM } from 'modules/PercentGame/types/enum'
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
        <PrizeView isBorderWrapper={false} from={PRIZE_VIEW_OPEN_FROM.BAG} />
      </div>
      <div className="section-border section-rounded">
        <div className="flex items-center gap-2">
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
