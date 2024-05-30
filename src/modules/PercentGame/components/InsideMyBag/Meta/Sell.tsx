import React, { useCallback, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfitIcon from 'components/Icons/Game/Profit'
import { META_TYPE } from 'modules/PercentGame/types/enum'
import { actions } from 'modules/PercentGame/slices'
import {
  isSellingSelector,
  isDisabledActionSelector,
} from 'modules/PercentGame/selectors'
import MetaBtn from './MetaBtn'

const Sell = () => {
  const dispatch = useDispatch()
  const isSelling = useSelector(isSellingSelector)
  const isDisabledAction = useSelector(isDisabledActionSelector)
  const onClick = useCallback(() => {
    dispatch(actions.toggleIsSellingPrize())
  }, [])

  return (
    <MetaBtn
      type={META_TYPE.SELL}
      icon={<ProfitIcon size={24} />}
      isActive={isSelling}
      isDisabled={isDisabledAction && !isSelling}
      title="Sell Prize"
      onClick={onClick}
    />
  )
}

export default memo(Sell)
