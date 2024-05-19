import React from 'react'
import { useDispatch } from 'react-redux'
import modal from 'modules/modal/provider'
import { SORT_TYPE } from 'modules/PercentGame/types/enum'
import { actions } from 'modules/PercentGame/slices'

import { Button } from 'antd'
import { ScrollUnfurled } from 'components/Icons/Game'
import PrizeView from 'modules/PercentGame/components/PrizeView'

const InsideMyBag = () => {
  const dispatch = useDispatch()
  const sort = (sortType: SORT_TYPE) => {
    dispatch(actions.sortPrize({ type: sortType }))
  }
  const onOpenRefining = () => {
    modal.percentGame.refining({
      maskClosable: false,
    })
  }
  return (
    <div>
      <PrizeView isBorderWrapper={false} />
      <div
        className="section-border"
        style={{
          marginTop: 20,
          borderRadius: 8,
          padding: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexGrow: 1,
          }}
        >
          <Button
            type="primary"
            className="btn-item-action"
            icon={<ScrollUnfurled size={24} />}
            onClick={onOpenRefining}
          />
          <Button type="primary" onClick={() => sort(SORT_TYPE.UP_TO)}>
            Sort up
          </Button>
          <Button type="primary" onClick={() => sort(SORT_TYPE.DOWN_TO)}>
            Sort down
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InsideMyBag
