import React, { useCallback, useMemo, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Button } from 'antd'
import { Prize } from 'modules/PercentGame/types'
import { slotsSelector } from 'modules/PercentGame/selectors'
import { actions } from 'modules/PercentGame/slices'
import { getIconPrize } from 'modules/PercentGame/utils'
import { getMerge } from 'modules/PercentGame/utils/merge'
import PrizeItem from 'modules/PercentGame/components/PrizeItem'
import Preview from './Preview'
import SlotHolder from './SlotHolder'
import ForgeToast, { showToast as showToastAfterMerge } from './Toast'
import Result, { ResultRef } from './Result'

interface Props {
  iconSize: number
  gap: number
}

const Forge = ({ iconSize = 40, gap = 2 }: Props) => {
  const dispatch = useDispatch()
  const slots = useSelector(slotsSelector)
  const resultRef = useRef<ResultRef>(null)
  const [loading, setLoading] = useState(false)
  const { isMerge, rate, randomMergeResult, resultPrizeWhenMergeSameIcon } =
    useMemo(() => getMerge(slots), [slots])
  const maxWidth = (iconSize + 8 + gap * 2) * 2
  const isEnable = isMerge
  const disabled = !isEnable || loading

  const onHandleMergeCallback = useCallback(
    (isSuccess: boolean, prize: Prize | null) => {
      setLoading(false)
      showToastAfterMerge(isSuccess)
      resultRef.current?.changePrize(prize)
    },
    [],
  )

  const onUnselectPrize = useCallback((id: string) => {
    dispatch(actions.unSelectPrizeForMerge({ id }))
  }, [])

  const onMerge = () => {
    if (loading) return
    setLoading(true)
    dispatch(
      actions.merge({
        rate,
        randomMergeResult,
        resultPrizeWhenMergeSameIcon,
        cb: onHandleMergeCallback,
      }),
    )
  }

  return (
    <>
      <div className="forge-wrapper" style={{ maxWidth: `${maxWidth}px` }}>
        {slots.map((slot, index) => {
          if (!slot)
            return <SlotHolder key={index} iconSize={iconSize} gap={gap} />
          const prize = slot
          return (
            <PrizeItem
              key={prize.id}
              {...prize}
              icon={getIconPrize(prize.iconId)}
              iconSize={iconSize}
              gap={gap}
              isHoverView={false}
              isShowNumber={false}
              onClick={onUnselectPrize}
            />
          )
        })}
      </div>
      <Result ref={resultRef} iconSize={iconSize} />
      <div className="forge-action">
        <Preview
          rate={rate}
          isMerge={isMerge}
          randomMergeResult={randomMergeResult}
          slots={slots}
          resultPrizeWhenMergeSameIcon={resultPrizeWhenMergeSameIcon}
        />
        <Button
          type="primary"
          className={clsx('btn-merge', {
            'is-disable': disabled,
          })}
          disabled={disabled}
          style={{
            marginTop: 20,
            background: !disabled
              ? 'linear-gradient(to right, var(--color-primary), var(--color-secondary))'
              : 'rgba(0, 0, 0, 0.45)',
          }}
          block
          onClick={onMerge}
        >
          Merge
        </Button>
      </div>
      <ForgeToast />
    </>
  )
}

export default Forge
