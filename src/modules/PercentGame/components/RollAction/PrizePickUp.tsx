import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setPrizesSelector } from 'modules/PercentGame/selectors'
import { showModalSuccess } from 'modules/PercentGame/utils'
import { DEFAULT_LIST_PRIZE_OB } from 'modules/PercentGame/constants'
import {
  Prize,
  OnMouseEnterPrize,
  OnMouseLeavePrize,
} from 'modules/PercentGame/types'
import useActions from 'modules/PercentGame/hooks/useActions'
import PrizeItem from '../PrizeItem'

const Prizes = ({
  prizes = [],
  onMouseEnter,
  onMouseLeave,
}: {
  prizes: Prize[]
  onMouseEnter?: OnMouseEnterPrize
  onMouseLeave?: OnMouseLeavePrize
}) => {
  return (
    <div>
      {prizes.map((prize) => {
        const { id, iconId, iconName, gradientSet, number = 1 } = prize
        return (
          <PrizeItem
            key={id}
            id={id}
            isShowNumber={true}
            icon={DEFAULT_LIST_PRIZE_OB[iconId]['icon']}
            gradientSet={gradientSet}
            number={number}
            iconId={iconId}
            iconName={iconName}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        )
      })}
    </div>
  )
}

const PrizePickUp = () => {
  const { onMouseEnter, onMouseLeave } = useActions()
  const prizes = useSelector(setPrizesSelector)
  useEffect(() => {
    if (!prizes.length) return
    showModalSuccess({
      title: 'Congrat, you got:',
      content: (
        <Prizes
          prizes={prizes}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ),
    })
  }, [prizes, onMouseEnter, onMouseLeave])
  return null
}

export default memo(PrizePickUp)
