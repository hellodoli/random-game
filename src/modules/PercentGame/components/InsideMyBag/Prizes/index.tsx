import React, { useCallback, memo, useRef } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { getState } from 'utils/reduxStore'
import { PRIZE_VIEW_OPEN_FROM, META_STATUS } from 'modules/PercentGame/types'
import {
  isSellingSelector,
  isCuttingSelector,
} from 'modules/PercentGame/selectors'
import { actions } from 'modules/PercentGame/slices'
import { dispatchChangeMetaStatus } from 'modules/PercentGame/utils'
import PrizeView from 'modules/PercentGame/components/PrizeView'
import type { ConfirmDeleteForwardRef, ConfirmCutForwardRef } from './Confirm'
import { ConfirmDelete, confirm, ConfirmCut } from './Confirm'

const Prizes = () => {
  const isSelling = useSelector(isSellingSelector)
  const isCutting = useSelector(isCuttingSelector)
  const dispatch = useDispatch()
  const deleteRef = useRef<ConfirmDeleteForwardRef>(null)
  const cutRef = useRef<ConfirmCutForwardRef>(null)

  const onHandleCutItem = useCallback(
    (id: string) => {
      const confirmCut = cutRef.current
      if (!confirmCut) return
      const { itemQuantity } = confirmCut.getCutItemValues()
      dispatch(
        actions.cutPrize({
          id,
          itemQuantity,
        }),
      )
      setTimeout(() => {
        dispatchChangeMetaStatus(META_STATUS.PREPARE)
      })
    },
    [cutRef],
  )

  const onHandleSellItem = useCallback(
    (id: string) => {
      const confirmDelete = deleteRef.current
      if (!confirmDelete) return
      const { type, customQuantity, itemQuantity } =
        confirmDelete.getDeleteItemValues()
      dispatch(actions.sellPrize({ id, customQuantity, itemQuantity, type }))
      setTimeout(() => {
        dispatchChangeMetaStatus(META_STATUS.PREPARE)
      })
    },
    [deleteRef],
  )

  const onClickPrizeItem = useCallback(
    (id: string) => {
      if (!isSelling && !isCutting) return
      const state = getState()
      const prize = state.percentGame?.prizes?.[id]
      dispatchChangeMetaStatus(META_STATUS.OPEN_MODAL)

      if (isSelling) {
        confirm({
          title: 'Do you want to sell these items?',
          content: prize ? (
            <ConfirmDelete prize={prize} ref={deleteRef} />
          ) : null,
          onOk: () => onHandleSellItem(id),
        })
        return
      }

      const quantity = prize?.number || 0
      if (isCutting && quantity > 0) {
        const isShowModalError = quantity === 1
        confirm({
          title: isShowModalError
            ? `Can't cut item with quantity equal 1`
            : 'Please choose the quantity you want',
          content: isShowModalError ? null : (
            <ConfirmCut quantity={quantity} ref={cutRef} />
          ),
          isShowModalError,
          onOk: () => {
            if (!isShowModalError) onHandleCutItem(id)
          },
        })
      }
    },
    [isSelling, isCutting, onHandleSellItem, onHandleCutItem],
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
