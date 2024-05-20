import React from 'react'
import { GameStartInfo } from './types'

const RowItem = ({ icon: Icon, title, value }: GameStartInfo) => {
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

export default RowItem
