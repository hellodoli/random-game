import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { getIconPrize } from 'modules/PercentGame/utils'
import { prizesSelector } from 'modules/PercentGame/selectors'
import {
  IconSize,
  OnSelectPrize,
  PRIZE_VIEW_OPEN_FROM,
} from 'modules/PercentGame/types'
import useActions from 'modules/PercentGame/hooks/useActions'

import PrizeItem from '../PrizeItem'
import PrizeViewWrapp from './PrizeViewWrapp'
import './style.scss'

interface Props {
  from?: PRIZE_VIEW_OPEN_FROM
  gap?: number
  isBorderWrapper?: boolean
  iconSize?: IconSize
  onClick?: OnSelectPrize
}

const View = ({
  from = PRIZE_VIEW_OPEN_FROM.INIT,
  gap = 4,
  isBorderWrapper = true,
  iconSize = 'medium',
  onClick,
}: Props) => {
  const prizes = useSelector(prizesSelector)
  const { onMouseEnter, onMouseLeave } = useActions()

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
            />
          )
        })}
      </div>
    </div>
  )
}

const PrizeView = memo(View)

export { PrizeViewWrapp, PrizeView }
export default PrizeView
