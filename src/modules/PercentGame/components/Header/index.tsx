import React, { memo } from 'react'
import { Flex } from '@gapo_ui/components'
import Notes from './Notes'
import Money from './Money'
import Tickets from './Tickets'
import './style.scss'

const GameHeader = () => {
  return (
    <div className="game-header">
      <Flex UNSAFE_className="consume" alignItems="center" flexGrow={1}>
        <Notes />
        <Money />
        <Tickets />
      </Flex>
    </div>
  )
}

export default memo(GameHeader)
