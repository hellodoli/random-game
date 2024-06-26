import React, { useMemo } from 'react'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import { Gradient, Type } from 'types/enum/icon'
import { WrapperIcon } from '../types'
import {
  DEFAULT_BG_FILL,
  DEFAULT_WIDTH,
  DEFAULT_DIMENSION,
  DEFAULT_HEIGHT,
  DEFAULT_ICON_NAME,
  DEFAULT_SHAPE,
  DEFAULT_GRADIENT,
  DEFAULT_GRADIENT_SET,
  DEFAULT_FROM_COLOR,
  DEFAULT_TO_COLOR,
  DEFAULT_TYPE,
  DEFAULT_FILL,
  DEFAULT_SIZE,
} from './constants'

import BgShape from './BgShape'
import BgGradient from './BgGradient'
import './style.scss'

const Wrapper = ({
  children,
  type = DEFAULT_TYPE,
  width: widthProp = DEFAULT_WIDTH,
  size = DEFAULT_SIZE,
  height: heightProp = DEFAULT_HEIGHT,
  shape = DEFAULT_SHAPE,
  classNames = '',
  fill = DEFAULT_FILL,
  bgFill = DEFAULT_BG_FILL,
  dimension = DEFAULT_DIMENSION,
  gradient = DEFAULT_GRADIENT,
  gradientSet = DEFAULT_GRADIENT_SET,
  iconName = DEFAULT_ICON_NAME,
  fromColor = DEFAULT_FROM_COLOR,
  toColor = DEFAULT_TO_COLOR,

  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  marginBottom = 0,
  onClick: onClickProp = undefined,
}: WrapperIcon) => {
  const gradientId = useMemo(() => `${iconName}-gradient-${uuidv4()}`, [])
  const bgFillId = useMemo(
    () => (gradient === Gradient.PLAIN ? bgFill : `url(#${gradientId})`),
    [gradient, bgFill, gradientId],
  )
  const width = useMemo(() => size || widthProp, [size, widthProp])
  const height = useMemo(() => size || heightProp, [size, heightProp])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${dimension} ${dimension}`}
      className={clsx('game-svg-icon', 'game-icon', classNames)}
      style={{
        width,
        height,
        ...(fill && { fill }),
        ...(marginLeft && { marginLeft }),
        ...(marginRight && { marginRight }),
        ...(marginTop && { marginTop }),
        ...(marginBottom && { marginBottom }),
      }}
      onClick={() => onClickProp?.()}
    >
      {type === Type.GRADIENT && gradient !== Gradient.PLAIN && (
        <BgGradient
          gradientId={gradientId}
          gradient={gradient}
          gradientSet={gradientSet}
          fromColor={fromColor}
          toColor={toColor}
          bgFill={bgFillId}
        />
      )}
      {type === Type.GRADIENT && (
        <BgShape bgFill={bgFillId} shape={shape} dimension={dimension} />
      )}
      {children}
    </svg>
  )
}

export default Wrapper
