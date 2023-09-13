import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { moneySelector } from 'modules/PercentGame/selectors'

import { CrownCoin } from 'components/Icons/Game'

const Money = () => {
  const money = useSelector(moneySelector)
  return (
    <div
      className="consume-item coins"
      style={{
        display: 'flex',
        alignItems: 'center',
        marginRight: 10,
      }}
    >
      <CrownCoin
        size={20}
        classNames="coin-icon"
        fill={'var(--coin-color)'}
        marginRight={4}
      />
      <span className="text number-coin">{money}</span>
    </div>
  )
}

export default memo(Money)
