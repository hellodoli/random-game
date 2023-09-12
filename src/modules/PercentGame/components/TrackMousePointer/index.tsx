import React, { useEffect, useState, memo, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Type, Shape } from 'types'
import {
  prizeNameHoverSelector,
  prizeIconIdHoverSelector,
  prizeGradientHoverSelector,
  prizeGradientSetHoverSelector,
} from 'modules/PercentGame/selectors'
import { getIconPrize } from 'modules/PercentGame/utils'
import './style.scss'

const TrackMouse = () => {
  const iconId = useSelector(prizeIconIdHoverSelector)
  const iconName = useSelector(prizeNameHoverSelector)
  const gradient = useSelector(prizeGradientHoverSelector)
  const gradientSet = useSelector(prizeGradientSetHoverSelector)

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const Icon = useMemo(() => (!iconId ? null : getIconPrize(iconId)), [iconId])

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

  useEffect(() => {
    const track = (event) => {
      const threshold = 12
      const windowWidth = window.innerWidth
      const container = containerRef.current
      const containerWidth = container?.offsetWidth || 100
      const y = event.clientY + threshold
      let x = event.clientX
      const containerWithT = containerWidth + threshold
      if (x + containerWithT > windowWidth) x -= containerWithT
      else x += threshold
      setX(x)
      setY(y)
    }
    window.addEventListener('mousemove', track)
    return () => {
      window.removeEventListener('mousemove', track)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        display: !Icon ? 'none' : 'flex',
        top: `${y}px`,
        left: `${x}px`,
        visibility: !Icon ? 'hidden' : 'visible',
      }}
      className="game-item-pointer-view"
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
