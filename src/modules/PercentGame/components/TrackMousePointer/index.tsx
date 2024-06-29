import React, { memo, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Type, Shape } from 'types'
import { themeProviderMirrorClass, themeProviderClass } from 'utils/settings'
import { isMirrorSelector } from 'modules/PercentGame/selectors'
import {
  prizeNameHoverSelector,
  prizeIconIdHoverSelector,
  prizeGradientHoverSelector,
  prizeGradientSetHoverSelector,
  isDisabledActionSelector,
} from 'modules/PercentGame/selectors'
import { getIconPrize } from 'modules/PercentGame/utils'
import useTrackMouse from 'modules/PercentGame/hooks/useTrackMouse'

import './style.scss'

const TrackMouse = () => {
  const isMirror = useSelector(isMirrorSelector)
  const iconId = useSelector(prizeIconIdHoverSelector)
  const iconName = useSelector(prizeNameHoverSelector)
  const gradient = useSelector(prizeGradientHoverSelector)
  const gradientSet = useSelector(prizeGradientSetHoverSelector)
  const isDisabledAction = useSelector(isDisabledActionSelector)
  const containerRef = useRef<HTMLDivElement>(null)
  const { x, y } = useTrackMouse({ offsetWidth: 120 })
  const Icon = useMemo(() => (!iconId ? null : getIconPrize(iconId)), [iconId])
  const isDisplay = !!(Icon && !isDisabledAction)

  const renderIcon = () => {
    if (!Icon) return null
    return (
      <Icon
        type={Type.GRADIENT}
        shape={Shape.ROUNDED_SQUARE}
        size={30}
        gradient={gradient}
        gradientSet={gradientSet}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: isDisplay ? 'flex' : 'none',
        top: `${y}px`,
        left: `${x}px`,
        visibility: isDisplay ? 'visible' : 'hidden',
      }}
      className={`${
        isMirror ? themeProviderMirrorClass : themeProviderClass
      } game-item-pointer-view`}
    >
      <div className="icon">{renderIcon()}</div>
      <div className="info-row">
        <span className="label">Name:</span>
        <strong>{iconName}</strong>
      </div>
    </div>
  )
}

export default memo(TrackMouse)
