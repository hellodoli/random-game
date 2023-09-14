import React, { useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Button } from 'antd'
import { GradientSet, Gradient } from 'types'
import { slotsSelector } from 'modules/PercentGame/selectors'
import PrizeItem from 'modules/PercentGame/components/PrizeItem'
import { Slots } from 'modules/PercentGame/types'
import {
  GRADIENT_COLOR_SET_FROM_ENUM,
  GRADIENT_COLOR_SET,
} from 'modules/PercentGame/constants'
import { actions } from 'modules/PercentGame/slices'
import { getIconPrize } from 'modules/PercentGame/utils'

const mergeRate = 89 / 100

interface Props {
  iconSize: number
  gap: number
}

const getSlotMergeEnable = (slots: Slots) => {
  let isEnable = false
  let isMergeSameIconType = false
  let background = ''

  if (!slots.includes(null)) {
    const slot = slots?.[0]
    const iconId = slot?.iconId || ''
    const gra = slot?.gradient || Gradient.HORIZONTAL
    const graSet = slot?.gradientSet || GradientSet.BRONZE
    const isSameSet = slots.every(
      (slot) => slot?.gradientSet === graSet && slot?.gradient === gra,
    )
    if (isSameSet) {
      isEnable = true
      isMergeSameIconType = slots.every((slot) => slot?.iconId === iconId)
      const gradient = GRADIENT_COLOR_SET_FROM_ENUM[graSet]
      const fromColor = gradient?.FROM || GRADIENT_COLOR_SET.BRONZE.FROM
      const toColor = gradient?.TO || GRADIENT_COLOR_SET.BRONZE.TO
      background = `linear-gradient(to right, ${fromColor} , ${toColor})`
    }
  }

  return {
    isEnable,
    background,
    isMergeSameIconType,
  }
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
  const { isEnable, background } = useMemo(() => {
    return getSlotMergeEnable(slots)
  }, [slots])
  const maxWidth = (iconSize + 8 + gap * 2) * 2
  const disabled = !isEnable || loading

  const onUnselectPrize = useCallback((id: string) => {
    dispatch(actions.unSelectPrizeForRefining({ id }))
  }, [])

  const onMerge = () => {
    if (loading) return
    // setLoading(true)
    const d = Math.random()
    if (d < mergeRate) {
      // merge success
    }
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
        <div className="merge-rate">
          {isEnable ? `${mergeRate * 100}%` : ''}
        </div>
        <Button
          type="primary"
          className={clsx({
            'is-disable': disabled,
          })}
          disabled={disabled}
          style={{
            background: !disabled ? '' : 'rgba(0, 0, 0, 0.45)',
            opacity: !disabled ? 0.8 : 1,
          }}
          block
        >
          Preview
        </Button>
        <Button
          type="primary"
          className={clsx({
            'is-disable': disabled,
          })}
          disabled={disabled}
          style={{
            background: !disabled ? background : 'rgba(0, 0, 0, 0.45)',
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
