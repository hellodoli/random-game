import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { AnvilImpact } from 'components/Icons/Game'
import { openModalRefining } from 'modules/PercentGame/utils/modal'
import { isDisabledActionSelector } from 'modules/PercentGame/selectors'
import Sell from './Meta/Sell'
import Cut from './Meta/Cut'

const Buttons = () => {
  const isDisabled = useSelector(isDisabledActionSelector)
  return (
    <div className="section-border section-rounded mt-5">
      <div className="flex items-center gap-2">
        <Button
          type="primary"
          className="btn-item btn-item-action"
          icon={<AnvilImpact size={24} />}
          onClick={() => openModalRefining()}
          disabled={isDisabled}
          title="Open Refining"
        />
        <div className="ml-auto flex items-center gap-2">
          <Sell />
          <Cut />
        </div>
      </div>
    </div>
  )
}

export default Buttons
