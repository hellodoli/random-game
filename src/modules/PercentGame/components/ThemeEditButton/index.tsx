import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'
import { FairyWand } from 'components/Icons/Game'

import modal from 'modules/modal/provider'
import { actions } from 'modules/PercentGame/slices'

const ThemeEdit = () => {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(actions.turnOnIsMirror())
    modal.percentGame.editTheme({
      maskClosable: false,
    })
  }
  return (
    <Button
      type="primary"
      size="large"
      shape="circle"
      className="absolute right-0 top-1/2 btn-linear transform -translate-y-1/2"
      icon={<FairyWand size={20} />}
      onClick={onClick}
    ></Button>
  )
}

export default ThemeEdit
