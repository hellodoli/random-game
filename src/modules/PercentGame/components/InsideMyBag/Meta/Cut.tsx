import React, { useCallback, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Scissors from 'components/Icons/Game/Scissors'
import { META_TYPE } from 'modules/PercentGame/types/enum'
import { actions } from 'modules/PercentGame/slices'
import {
  isCuttingSelector,
  isDisabledActionSelector,
} from 'modules/PercentGame/selectors'
import MetaBtn from './MetaBtn'

const Cut = () => {
  const dispatch = useDispatch()
  const isCutting = useSelector(isCuttingSelector)
  const isDisabledAction = useSelector(isDisabledActionSelector)
  const onClick = useCallback(() => {
    dispatch(actions.toggleIsCuttingPrize())
  }, [])
  return (
    <MetaBtn
      type={META_TYPE.CUT}
      icon={<Scissors size={24} />}
      isActive={isCutting}
      isDisabled={isDisabledAction && !isCutting}
      title="Cut Prize"
      onClick={onClick}
    />
  )
}

export default memo(Cut)
