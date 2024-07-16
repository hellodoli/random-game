import React, { memo } from 'react'
import Money from './Money'
import Tickets from './Tickets'
import Level from 'modules/PercentGame/components/Level'
import './style.scss'

const GameHeader = () => {
  return (
    <div className="game-header">
      <div className="consume flex flex-row items-center w-full">
        <Level />
        <Money />
        <Tickets />
      </div>
    </div>
  )
}

export default memo(GameHeader)
