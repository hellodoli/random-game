import React, {
  useImperativeHandle,
  forwardRef,
  memo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import {
  mergeStatusSelector,
  pickUpPrizeAfterMergeSelector,
} from 'modules/PercentGame/selectors'
import { Prize, MERGE_STATUS } from 'modules/PercentGame/types'
import { getIconPrize } from 'modules/PercentGame/utils'
import { actions } from 'modules/PercentGame/slices'

import { WingedSword } from 'components/Icons/Game'
import PrizeItem from 'modules/PercentGame/components/PrizeItem'
import SlotHolder from './SlotHolder'

export interface ResultRef {
  changePrize: (prize: Prize | null) => void
}

interface Props {
  iconSize: number
}

// eslint-disable-next-line react/display-name
const Result = forwardRef<ResultRef, Props>((props, ref) => {
  const { iconSize } = props
  const dispatch = useDispatch()
  const mergeStatus = useSelector(mergeStatusSelector)
  const isPickUp = useSelector(pickUpPrizeAfterMergeSelector)
  const [prizeResult, setPrizeResult] = useState<Prize | null>(null)
  const isShowPrizeResult =
    !!prizeResult && !isPickUp && mergeStatus === MERGE_STATUS.MERGE_SUCCESS
  const cache = useRef({ prizeResult })

  useImperativeHandle(
    ref,
    () => ({
      changePrize(prize: Prize | null) {
        setPrizeResult(isPickUp ? null : prize)
      },
    }),
    [isPickUp],
  )

  const onSelectResultPrize = useCallback(
    (id: string = '') => {
      const { prizeResult: prizeResultInput } = cache.current
      const prize = id ? prizeResult : prizeResultInput
      if (!prize) return
      dispatch(actions.selectResultPrize({ prize }))
      setPrizeResult(null)
    },
    [prizeResult],
  )

  const renderMergeResult = () => {
    const size = iconSize * 1.5
    if (isShowPrizeResult) {
      return (
        <PrizeItem
          {...prizeResult}
          iconSize={size}
          icon={getIconPrize(prizeResult.iconId)}
          isShowNumber={false}
          onClick={onSelectResultPrize}
        />
      )
    }
    return <SlotHolder iconSize={size} />
  }

  useEffect(() => {
    cache.current.prizeResult = prizeResult
  }, [prizeResult])

  useEffect(() => {
    const isPrepare = mergeStatus === MERGE_STATUS.PREPARE
    if (isPrepare && prizeResult) onSelectResultPrize(prizeResult.id)
  }, [mergeStatus, prizeResult])

  useEffect(() => {
    return () => {
      const { prizeResult } = cache.current
      if (prizeResult) onSelectResultPrize()
    }
  }, [])

  return (
    <div className="forege-result">
      <WingedSword
        size={80}
        fill="var(--color-primary)"
        marginTop={8}
        marginBottom={16}
      />
      <div className="result-prize">{renderMergeResult()}</div>
      <div className="actions">
        <label className="action-label action-row">
          <input
            type="checkbox"
            className="action-checkbox"
            checked={isPickUp}
            disabled={isShowPrizeResult}
            onChange={() =>
              dispatch(
                actions.changeMergeActions({
                  mergeActions: { pickUpPrizeToBagAfterMerge: !isPickUp },
                }),
              )
            }
          />
          <span
            className={clsx('label-text', {
              'text-muted': isShowPrizeResult,
            })}
          >
            Auto pickup
          </span>
        </label>
      </div>
    </div>
  )
})

export default memo(Result)
