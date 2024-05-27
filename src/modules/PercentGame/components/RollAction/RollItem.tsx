import React, { memo } from 'react'
import { GradientSet } from 'types/enum/icon'
import { GradientSetColorFromTo } from 'types/enum/color'
import {
  GRADIENT_COLOR_SET,
  DEFAULT_GRADIENT_COLOR_SET,
} from 'modules/PercentGame/constants'
import { RollResult } from 'modules/PercentGame/types'

import TicketIcon from 'components/Icons/Game/Ticket'
import { Button } from 'antd'

interface Props {
  id: number
  onRoll: (
    consume: number,
    count: number,
    rates: RollResult[],
    gradient: GradientSetColorFromTo,
  ) => void
  disabled?: boolean
  rollType?: GradientSet
  consume?: number
  count?: number
  rates: RollResult[]
}

const ConSumeTicket = ({ consume = 1 }: { consume?: number }) => {
  return (
    <span className="consume-ticket-count">
      <span>(</span>
      <TicketIcon size={14} />
      <span className="consume-count">{`x ${consume}`}</span>
      <span>)</span>
    </span>
  )
}

const RollItem = ({
  onRoll,
  disabled = false,
  rollType = GradientSet.BRONZE,
  consume = 1, // ticket/roll
  count = 1, // maximum roll
  rates,
}: Props) => {
  const gradient = GRADIENT_COLOR_SET[rollType]
  const fromColor = gradient.FROM || DEFAULT_GRADIENT_COLOR_SET.FROM
  const toColor = gradient.TO || DEFAULT_GRADIENT_COLOR_SET.TO

  const maxConsumeTicket = count * consume
  const background = `linear-gradient(to right, ${fromColor} , ${toColor})`

  const onClickStartRoll = (consume: number, count: number) => {
    onRoll(consume, count, rates, gradient)
  }

  return (
    <div className="roll-block">
      <Button
        shape="round"
        onClick={() => onClickStartRoll(consume, 1)}
        disabled={disabled}
        className={`btn-roll ${rollType}`}
        style={{ background }}
        block
      >
        <strong>
          <span>(</span>
          <span>1</span>
          <span>)</span>
          <span style={{ marginRight: 2 }}></span>
          <ConSumeTicket consume={consume} />
        </strong>
      </Button>
      <Button
        shape="round"
        onClick={() => onClickStartRoll(maxConsumeTicket, count)}
        disabled={disabled}
        className={`btn-roll ${rollType}`}
        style={{ background }}
        block
      >
        <strong>
          <span>(</span>
          <span>{count}</span>
          <span>)</span>
          <span style={{ marginRight: 2 }}></span>
          <ConSumeTicket consume={maxConsumeTicket} />
        </strong>
      </Button>
    </div>
  )
}

export default memo(RollItem)
