import React, { memo } from 'react'
import { GameIcon, Type, Shape, Gradient, GradientSet } from 'types'
import {
  ICONS,
  onMouseLeavePrize,
  onMouseEnterPrize,
} from 'modules/PercentGame/types'

import './style.scss'

interface Props {
  id: string
  icon: (props: GameIcon) => JSX.Element
  iconId: ICONS
  iconName: string
  gradientSet?: GradientSet
  gradient?: Gradient
  number?: number
  isShowNumber?: boolean
  gap?: number
  onMouseEnter?: onMouseEnterPrize
  onMouseLeave?: onMouseLeavePrize
}

const PrizeItem = ({
  id,
  icon: Icon,
  iconId,
  iconName,
  gradientSet = GradientSet.BRONZE,
  gradient = Gradient.HORIZONTAL,
  number = 1,
  isShowNumber = true,
  gap = 2,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
}: Props) => {
  const onMouseEnter = () => {
    if (onMouseEnterProp) {
      onMouseEnterProp({
        id,
        iconId,
        iconName,
        gradientSet,
        gradient,
      })
    }
  }
  const onMouseLeave = () => {
    if (onMouseLeaveProp) onMouseLeaveProp()
  }
  return (
    <div
      className="game-prize-item"
      style={{ margin: `${gap}px` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Icon
        size={32}
        type={Type.GRADIENT}
        shape={Shape.ROUNDED_SQUARE}
        gradient={gradient}
        gradientSet={gradientSet}
      />
      {isShowNumber && <span className="label-count">{number}</span>}
    </div>
  )
}

export default memo(PrizeItem)
