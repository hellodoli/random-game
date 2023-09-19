import React from 'react'
import clsx from 'clsx'

interface Props {
  iconSize: number
  gap?: number | string
  className?: string
  children?: React.ReactNode
}

const SlotHolder = ({ iconSize, gap = 0, className = '', children }: Props) => (
  <div
    className={clsx('game-prize-item game-prize-item--holder', {
      [className]: className,
    })}
    style={{ margin: gap }}
  >
    <div style={{ width: `${iconSize}px`, height: `${iconSize}px` }}>
      {children}
    </div>
  </div>
)

export default SlotHolder
