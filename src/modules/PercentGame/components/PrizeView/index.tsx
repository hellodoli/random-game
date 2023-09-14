import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { GradientSet, Gradient } from 'types'
import { getIconPrize } from 'modules/PercentGame/utils'
import { prizesSelector } from 'modules/PercentGame/selectors'
import useActions from 'modules/PercentGame/hooks/useActions'

import PrizeItem from '../PrizeItem'
import PrizeViewWrapp from './PrizeViewWrapp'
import './style.scss'

interface Props {
  gap?: number
}

const PrizeView = ({ gap = 4 }: Props) => {
  const prizes = useSelector(prizesSelector)
  const { onMouseEnter, onMouseLeave } = useActions()

  return (
    <div className="game-prize-section section-border">
      <div
        className="game-prize-section-wrapper"
        style={{ margin: `calc(${-1 * gap}px)` }}
      >
        {prizes.map((prize) => {
          const {
            id,
            iconId,
            gradient = Gradient.HORIZONTAL,
            gradientSet = GradientSet.BRONZE,
            number = 1,
            iconName,
          } = prize
          return (
            <PrizeItem
              key={id}
              id={id}
              gradient={gradient}
              gradientSet={gradientSet}
              number={number}
              icon={getIconPrize(iconId)}
              iconId={iconId}
              iconName={iconName}
              gap={gap / 2}
              isHoverView={true}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          )
        })}
      </div>
    </div>
  )
}

export { PrizeViewWrapp }
export default memo(PrizeView)
