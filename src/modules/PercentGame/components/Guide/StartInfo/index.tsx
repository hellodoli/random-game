import React from 'react'
import { Space, Checkbox } from 'antd'
import type { CheckboxProps } from 'antd'
import { GameStartInfo } from './types'
import {
  DEFAULT_MONEY,
  DEFAULT_TICKET_NUMBER,
  DEFAULT_ITEM_RANDOM_NUMBER,
} from 'modules/PercentGame/constants'
import { STORAGE_KEYS, saveLocalStorageByCheckbox } from 'utils/storages'
import {
  CrownCoin,
  Ticket,
  PerspectiveDice6FacesRandom,
} from 'components/Icons/Game'
import RowItem from './RowItem'

const listGameStartInfo: GameStartInfo[] = [
  {
    id: 'coin',
    icon: CrownCoin,
    title: 'Coin',
    value: DEFAULT_MONEY,
  },
  {
    id: 'ticket',
    icon: Ticket,
    title: 'Ticket',
    value: DEFAULT_TICKET_NUMBER,
  },
  {
    id: 'prize',
    icon: PerspectiveDice6FacesRandom,
    title: 'Random prize',
    value: DEFAULT_ITEM_RANDOM_NUMBER,
  },
]

const StartInfo = () => {
  const onChange: CheckboxProps['onChange'] = (e) => {
    const checked = !!e.target.checked
    const key = STORAGE_KEYS.IS_HIDE_START_GAME_INFO_FOREVER
    saveLocalStorageByCheckbox(checked, key)
  }
  return (
    <Space direction="vertical" size="middle" className="w-full">
      {listGameStartInfo.map((item) => (
        <RowItem key={item.id} {...item} />
      ))}
      <div className="mx-auto mt-4">
        <Checkbox onChange={onChange}>Never show again</Checkbox>
      </div>
    </Space>
  )
}

export default StartInfo
