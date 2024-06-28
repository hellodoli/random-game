import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { getIconPrize } from 'modules/PercentGame/utils'
import { prizesSelector } from 'modules/PercentGame/selectors'
import {
  PRIZE_VIEW_OPEN_FROM,
  IconSize,
  OnSelectPrize,
  Prize,
  OnMouseEnterPrize,
  OnMouseLeavePrize,
} from 'modules/PercentGame/types'
import useActions from 'modules/PercentGame/hooks/useActions'

import PrizeItem from '../PrizeItem'
import PrizeViewWrapp from './PrizeViewWrapp'
import './style.scss'

const defaultPrizes: Prize[] = []

interface ViewProps {
  from?: PRIZE_VIEW_OPEN_FROM
  gap?: number
  isBorderWrapper?: boolean
  iconSize?: IconSize
  onClick?: OnSelectPrize
  isShowNumber?: boolean
}

interface RenderViewProps extends ViewProps {
  prizes?: Prize[]
  onMouseEnter?: OnMouseEnterPrize
  onMouseLeave?: OnMouseLeavePrize
}

const RenderView = (props: RenderViewProps) => {
  const {
    isShowNumber = true,
    from = PRIZE_VIEW_OPEN_FROM.INIT,
    gap = 4,
    isBorderWrapper = true,
    iconSize = 'medium',
    onClick,
    prizes = defaultPrizes,
    onMouseEnter,
    onMouseLeave,
  } = props
  return (
    <div
      className={clsx('game-prize-section', `open-from-view-${from}`, {
        'section-border': isBorderWrapper,
      })}
    >
      <div
        className="game-prize-section-wrapper"
        style={{ margin: `calc(${-1 * gap}px)` }}
      >
        {prizes.map((prize) => {
          return (
            <PrizeItem
              key={prize.id}
              {...prize}
              icon={getIconPrize(prize.iconId)}
              iconSize={iconSize}
              gap={gap / 2}
              isHoverView={true}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              isShowNumber={isShowNumber}
            />
          )
        })}
      </div>
    </div>
  )
}

const View = (props: ViewProps) => {
  const prizes = useSelector(prizesSelector)
  const { onMouseEnter, onMouseLeave } = useActions()
  return (
    <RenderView
      {...props}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      prizes={prizes}
    />
  )
}

const PrizeRenderView = memo(RenderView)
const PrizeView = memo(View)

export { PrizeViewWrapp, PrizeRenderView, PrizeView }
export default PrizeView
