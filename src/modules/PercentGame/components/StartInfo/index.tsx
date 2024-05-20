import React from 'react'
import { Space } from 'antd'
// import { Gradient, GradientSet, Type, Shape } from 'types/enum/icon'
import {
  DEFAULT_MONEY,
  DEFAULT_TICKET_NUMBER,
  DEFAULT_ITEM_RANDOM_NUMBER,
} from 'modules/PercentGame/constants'
import { GameIcon } from 'components/Icons/types'
import {
  CrownCoin,
  Ticket,
  PerspectiveDice6FacesRandom,
} from 'components/Icons/Game'

interface RowItem {
  id: string
  icon: (props: GameIcon) => JSX.Element
  title: string
  value: number
}

const list: RowItem[] = [
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

const Item = ({ icon: Icon, title, value }: RowItem) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center w-36 gap-1">
        <Icon fill="var(--color-gradient-gold-to)" size={36} />
        <span>{`(${title})`}</span>
      </div>
      <span>:</span>
      <span className="font-bold">{value}</span>
    </div>
  )
}

const StartInfo = () => {
  return (
    <Space direction="vertical" size="middle">
      {list.map((item) => {
        return <Item key={item.id} {...item} />
      })}
    </Space>
  )
}

export default StartInfo
