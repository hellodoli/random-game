import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import PrizeView from 'modules/PercentGame/components/PrizeView'
import { actions } from 'modules/PercentGame/slices'
import Forge from './Forge'
import './style.scss'

const iconSize = 40
const gap = 2

const Menu = () => {
  const dispatch = useDispatch()
  const props = useMemo(
    () => ({
      iconSize,
      gap,
    }),
    [iconSize, gap],
  )

  const onSelecPrize = useCallback((id: string) => {
    dispatch(actions.selectPrizeForMerge({ id }))
  }, [])

  useEffect(() => {
    return () => {
      dispatch(actions.resetMerge())
    }
  }, [])

  return (
    <div className="percent-game-refening-menu">
      <div className="menu-left section-border">
        <Forge {...props} />
      </div>
      <div className="menu-right section-border">
        <PrizeView {...props} isBorderWrapper={false} onClick={onSelecPrize} />
      </div>
    </div>
  )
}

export default memo(Menu)
