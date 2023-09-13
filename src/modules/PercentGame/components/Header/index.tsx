import React, { memo } from 'react'
import Notes from './Notes'
import Money from './Money'
import Tickets from './Tickets'
import './style.scss'

const GameHeader = () => {
  return (
    <div className="game-header">
      <div className="consume">
        <Notes />
        <Money />
        <Tickets />
      </div>
    </div>
  )
}

export default memo(GameHeader)
