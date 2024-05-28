import React, { useCallback, memo, useRef } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { getState } from 'utils/reduxStore'
import { PRIZE_VIEW_OPEN_FROM } from 'modules/PercentGame/types'
import {
  isSellingSelector,
  isCuttingSelector,
} from 'modules/PercentGame/selectors'
import { actions } from 'modules/PercentGame/slices'
import { showModalConfirm } from 'modules/PercentGame/utils'
import PrizeView from 'modules/PercentGame/components/PrizeView'
import ConfirmDelete, { ConfirmDeleteForwardRef } from './ConfirmDelete'

const Prizes = () => {
  const isSelling = useSelector(isSellingSelector)
  const isCutting = useSelector(isCuttingSelector)
  const dispatch = useDispatch()
  const ref = useRef<ConfirmDeleteForwardRef>(null)

  const onClickPrizeItem = useCallback(
    (id: string) => {
      if (!isSelling && !isCutting) return
      const state = getState()
      const prize = state.percentGame?.prizes?.[id]

      showModalConfirm({
        title: 'Do you want to sell these items?',
        centered: true,
        content: prize ? <ConfirmDelete prize={prize} ref={ref} /> : null,
        onOk: () => {
          if (ref.current) {
            const { type, customQuantity, itemQuantity } =
              ref.current.getDeleteItemValues()
            dispatch(
              actions.sellPrize({ id, customQuantity, itemQuantity, type }),
            )
          }
        },
      })
    },
    [isSelling, isCutting],
  )

  return (
    <div
      className={clsx('section-prizes my-5', {
        'is-selling': isSelling,
        'is-cutting': isCutting,
        'is-meta-on': isSelling || isCutting,
      })}
    >
      <PrizeView
        isBorderWrapper={false}
        from={PRIZE_VIEW_OPEN_FROM.BAG}
        onClick={onClickPrizeItem}
      />
    </div>
  )
}

export default memo(Prizes)
