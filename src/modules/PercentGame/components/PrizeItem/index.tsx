import React, { memo } from 'react'
import { Type, Shape, Gradient, GradientSet } from 'types'
import { GameIcon } from 'components/Icons/types'
import {
  ICONS,
  OnMouseEnterPrize,
  OnMouseLeavePrize,
  OnSelectPrize,
  IconSize,
} from 'modules/PercentGame/types'
import { getIconSize } from 'modules/PercentGame/utils'

import './style.scss'

interface Props {
  id: string
  slotId?: string // if `Prize` in slot for merge
  icon: (props: GameIcon) => JSX.Element
  iconId: ICONS
  iconName: string
  gradientSet?: GradientSet
  gradient?: Gradient
  iconSize?: IconSize
  // quatity
  number?: number
  isShowNumber?: boolean
  // item spacing
  gap?: number
  // hover option
  isHoverView?: boolean
  onMouseEnter?: OnMouseEnterPrize
  onMouseLeave?: OnMouseLeavePrize
  onClick?: OnSelectPrize
}

const PrizeItem = ({
  id,
  slotId = '',
  icon: Icon,
  iconId,
  iconName,
  iconSize = 'medium',
  gradientSet = GradientSet.BRONZE,
  gradient = Gradient.HORIZONTAL,
  // quatity
  number = 1,
  isShowNumber = true,
  // item spacing
  gap = 0,
  // hover option
  isHoverView = false,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  onClick,
}: Props) => {
  const onMouseEnter = () => {
    if (isHoverView && onMouseEnterProp) {
      onMouseEnterProp({
        id,
        iconId,
        iconName,
        gradientSet,
        gradient,
        number,
      })
    }
  }
  const onMouseLeave = () => {
    if (isHoverView && onMouseLeaveProp) onMouseLeaveProp()
  }
  return (
    <div
      className="game-prize-item"
      style={{ margin: `${gap}px` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick?.(id, slotId)}
    >
      <Icon
        size={getIconSize(iconSize)}
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
