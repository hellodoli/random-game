import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import ProfitIcon from 'components/Icons/Game/Profit'
import useTrackMouse from 'modules/PercentGame/hooks/useTrackMouse'
import { actions } from 'modules/PercentGame/slices'
import { isSellingSelector } from 'modules/PercentGame/selectors'

const Track = () => {
  const { x, y, isShow } = useTrackMouse({
    offsetWidth: 20,
    isNotShowWhenInit: true,
  })

  useEffect(() => {
    const onDblClick = () => {
      // handle logic dbclick outside
    }
    window.addEventListener('dblclick', onDblClick)
    return () => {
      window.removeEventListener('dblclick', onDblClick)
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        top: `${y}px`,
        left: `${x}px`,
        visibility: isShow ? 'visible' : 'hidden',
      }}
      className="game-item-pointer-view"
    >
      <ProfitIcon size={24} />
    </div>
  )
}

const Sell = () => {
  const isSelling = useSelector(isSellingSelector)
  const dispatch = useDispatch()
  return (
    <>
      <Button
        type="primary"
        className={clsx('btn-item btn-item-meta', {
          'ring-4': isSelling,
        })}
        icon={<ProfitIcon size={24} />}
        onClick={() => dispatch(actions.toggleIsSellingPrize())}
        title="Sell Prize"
      />
      {isSelling && <Track />}
    </>
  )
}

export default Sell
