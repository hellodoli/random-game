import React, { memo } from 'react'
import { themeProviderMirrorClass } from 'utils/settings'
import Header from 'modules/PercentGame/components/Header'
import Menu from 'modules/PercentGame/components/Menu'
import RollAction from 'modules/PercentGame/components/RollAction'

const MirrorPreview = () => {
  return (
    <div
      className={`${themeProviderMirrorClass} game-module game-module-percent-game`}
      style={{ height: 'calc(100% - 10px)' }}
    >
      <div className="game-module-wrapper section-border">
        <Header />
        <Menu />
        <RollAction isMirror={true} />
      </div>
    </div>
  )
}

export default memo(MirrorPreview)
