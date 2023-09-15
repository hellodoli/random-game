import React, { useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Button } from 'antd'
import { slotsSelector } from 'modules/PercentGame/selectors'
import { actions } from 'modules/PercentGame/slices'
import { getIconPrize } from 'modules/PercentGame/utils'
import { getMerge } from 'modules/PercentGame/utils/merge'
import PrizeItem from 'modules/PercentGame/components/PrizeItem'
import Preview from '../Preview'

interface Props {
  iconSize: number
  gap: number
}

const ItemHolder = ({ iconSize, gap }: Props) => (
  <div
    className="game-prize-item game-prize-item--holder"
    style={{ margin: `${gap}px` }}
  >
    <div style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
  </div>
)

const Forge = ({ iconSize = 40, gap = 2 }: Props) => {
  const dispatch = useDispatch()
  const slots = useSelector(slotsSelector)
  const [loading /*setLoading*/] = useState(false)
  const { isMerge, rate, randomMergeResult, resultPrizeWhenMergeSameIcon } =
    useMemo(() => getMerge(slots), [slots])
  const maxWidth = (iconSize + 8 + gap * 2) * 2
  const isEnable = isMerge
  const disabled = !isEnable || loading

  const onUnselectPrize = useCallback((id: string) => {
    dispatch(actions.unSelectPrizeForRefining({ id }))
  }, [])

  const onMerge = () => {
    if (loading) return
    // setLoading(true)
  }

  return (
    <>
      <div className="forge-wrapper" style={{ maxWidth: `${maxWidth}px` }}>
        {slots.map((slot, index) => {
          if (!slot)
            return <ItemHolder key={index} iconSize={iconSize} gap={gap} />
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
          className={clsx({
            'is-disable': disabled,
          })}
          disabled={disabled}
          style={{
            marginTop: 20,
            textTransform: 'uppercase',
            fontSize: 20,
            fontWeight: 'bold',
            height: 60,
            borderRadius: 40,
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
    </>
  )
}

export default Forge
