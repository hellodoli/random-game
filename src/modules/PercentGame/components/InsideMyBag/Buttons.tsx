import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import modal from 'modules/modal/provider'
import { ScrollUnfurled, Scissors } from 'components/Icons/Game'
import { isDisabledActionSelector } from 'modules/PercentGame/selectors'
import { actions } from 'modules/PercentGame/slices'
import Sell from './Sell'

const Buttons = () => {
  const dispatch = useDispatch()
  const isDisabled = useSelector(isDisabledActionSelector)
  const onOpenRefining = () => {
    modal.percentGame.refining({
      maskClosable: false,
    })
  }

  useEffect(() => {
    return () => {
      dispatch(actions.resetSell())
    }
  }, [])

  return (
    <div className="section-border section-rounded mt-5">
      <div className="flex items-center gap-2">
        <Button
          type="primary"
          className="btn-item btn-item-action"
          icon={<ScrollUnfurled size={24} />}
          onClick={onOpenRefining}
          disabled={isDisabled}
          title="Open Refining"
        />
        <div className="ml-auto flex items-center gap-2">
          <Sell />
          <Button
            type="primary"
            className="btn-item btn-item-meta"
            icon={<Scissors size={24} />}
            onClick={() => alert('Coming soon!')}
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  )
}

export default Buttons
