import React, { useState } from 'react'
import { Checkbox, CheckboxProps } from 'antd'
import {
  getLocalStorage,
  STORAGE_KEYS,
  saveLocalStorageByCheckbox,
} from 'utils/storages'

interface Props {
  setIsDirty: (isDirty: boolean) => void
}

const lsKey = STORAGE_KEYS.IS_REMEMBER_THEME

const CheckBoxSetting = ({ setIsDirty }: Props) => {
  const [checkedRememberTheme, setCheckedRememberTheme] = useState(
    !!getLocalStorage(lsKey),
  )

  const onChange: CheckboxProps['onChange'] = (e) => {
    const checked = !!e.target.checked
    setIsDirty(true)
    setCheckedRememberTheme(checked)
    saveLocalStorageByCheckbox(checked, lsKey)
  }

  return (
    <Checkbox onChange={onChange} checked={checkedRememberTheme}>
      Remember theme
    </Checkbox>
  )
}

export default CheckBoxSetting
