import React from 'react'
import IconWrapper from 'components/Icons/Wrapper'
import { GameIcon } from '../types'

const Ticket = (props: GameIcon) => {
  return (
    <IconWrapper {...props}>
      <g transform="translate(0,0)">
        <path
          d="M323.9 19.81l-55.2 55.15L285 91.24 272.2 104 256 87.73 19.81 323.9l45.57 45.6c28.5-14.6 56.22-11.7 72.52 4.6 16.3 16.3 19.2 44 4.6 72.5l45.6 45.6 236.1-236.1-16.2-16.3 12.8-12.8 16.3 16.2 55.1-55.1-45.6-45.6c-28.5 14.6-56.2 11.7-72.5-4.6-16.3-16.3-19.2-44.02-4.6-72.52zm-16.2 93.99l33.9 34-12.8 12.8-33.9-34zM256 130.2L381.8 256 222.1 415.8 96.16 289.9 249.6 136.5zm0 25.4L121.6 289.9l100.5 100.5L356.4 256zm108.2 14.8l34 33.9-12.8 12.8-34-33.9z"
          fill="#fff"
          fillOpacity={1}
        ></path>
      </g>
    </IconWrapper>
  )
}

export default Ticket
