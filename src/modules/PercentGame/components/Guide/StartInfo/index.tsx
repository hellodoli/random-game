import React from 'react'
import { Space } from 'antd'
import { GameStartInfo } from './types'
import {
  DEFAULT_MONEY,
  DEFAULT_TICKET_NUMBER,
  DEFAULT_ITEM_RANDOM_NUMBER,
} from 'modules/PercentGame/constants'
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
  return (
    <Space direction="vertical" size="middle">
      {listGameStartInfo.map((item) => (
        <RowItem key={item.id} {...item} />
      ))}
    </Space>
  )
}

export default StartInfo
