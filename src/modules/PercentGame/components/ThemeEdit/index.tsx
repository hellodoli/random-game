import React from 'react'
import { Button } from 'antd'
import { FairyWand } from 'components/Icons/Game'

import modal from 'modules/modal/provider'

const ThemeEdit = () => {
  return (
    <Button
      type="primary"
      size="large"
      shape="circle"
      className="absolute right-0 top-2/4 btn-linear transform -translate-y-1/2"
      icon={<FairyWand size={20} />}
      onClick={() =>
        modal.percentGame.editTheme({
          maskClosable: false,
        })
      }
    ></Button>
  )
}

export default ThemeEdit
