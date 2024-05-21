import React from 'react'
import { Button } from 'antd'
import modal from 'modules/modal/provider'
import { PRIZE_VIEW_OPEN_FROM } from 'modules/PercentGame/types/enum'
import { ScrollUnfurled, Profit, Scissors } from 'components/Icons/Game'
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
      <div className="my-5">
        <PrizeView isBorderWrapper={false} from={PRIZE_VIEW_OPEN_FROM.BAG} />
      </div>
      <div className="section-border section-rounded mt-5">
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            className="btn-item btn-item-action"
            icon={<ScrollUnfurled size={24} />}
            onClick={onOpenRefining}
          />
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="primary"
              className="btn-item btn-item-meta"
              icon={<Profit size={24} />}
              onClick={() => alert('Coming soon!')}
            />
            <Button
              type="primary"
              className="btn-item btn-item-meta"
              icon={<Scissors size={24} />}
              onClick={() => alert('Coming soon!')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsideMyBag
