import React, { ReactNode } from 'react'

const PrizeViewWrapp = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="game-prize-section section-border" style={{ flex: 1 }}>
      <div className="game-prize-section-wrapper">{children}</div>
    </div>
  )
}

export default PrizeViewWrapp
