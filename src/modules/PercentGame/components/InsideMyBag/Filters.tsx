import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from 'antd'
import { isDisabledActionSelector } from 'modules/PercentGame/selectors'
import { SORT_TYPE } from 'modules/PercentGame/types'
import { DEFAULT_SORT_PRIZE } from 'modules/PercentGame/constants'
import { actions } from 'modules/PercentGame/slices'

const Filters = () => {
  const dispatch = useDispatch()
  const isDisabled = useSelector(isDisabledActionSelector)

  const handleChange = (sortType: SORT_TYPE) => {
    dispatch(actions.sortPrize({ type: sortType }))
  }

  return (
    <div className="section-border section-rounded">
      <Select
        placeholder="Sort"
        style={{ width: 200 }}
        onChange={handleChange}
        options={DEFAULT_SORT_PRIZE}
        disabled={isDisabled}
      />
    </div>
  )
}

export default memo(Filters)
