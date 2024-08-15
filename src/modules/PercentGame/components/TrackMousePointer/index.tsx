import React, { useMemo, useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Type, Shape } from 'types'
import { GameIcon } from 'components/Icons/types'
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

const TrackMouse = ({
  icon: Icon,
}: {
  icon: (props: GameIcon) => JSX.Element
}) => {
  const isMirror = useSelector(isMirrorSelector)
  const iconName = useSelector(prizeNameHoverSelector)
  const gradient = useSelector(prizeGradientHoverSelector)
  const gradientSet = useSelector(prizeGradientSetHoverSelector)
  const containerRef = useRef<HTMLDivElement>(null)

  const [containerWidth, setContainerWidth] = useState(0)
  const [visibility, setVisibility] = useState<'visible' | 'hidden'>('hidden')

  const { x, y } = useTrackMouse({
    offsetWidth: containerWidth,
  })

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth } = containerRef.current
      setContainerWidth(offsetWidth)
    }
  }, [])

  useEffect(() => {
    setVisibility(x === 0 && y === 0 ? 'hidden' : 'visible')
  }, [x, y])

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
        display: 'flex',
        top: `${y}px`,
        left: `${x}px`,
        visibility,
        pointerEvents: 'none',
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

const TrackMouseRender = () => {
  const iconId = useSelector(prizeIconIdHoverSelector)
  const isDisabledAction = useSelector(isDisabledActionSelector)
  const Icon = useMemo(() => (!iconId ? null : getIconPrize(iconId)), [iconId])
  const isDisplay = !!(Icon && !isDisabledAction)
  if (!isDisplay) return null
  return <TrackMouse icon={Icon} />
}

export default TrackMouseRender
