import React from 'react'
import { Gradient, GradientSet } from 'types/enum/icon'
import { BackgroundGradient } from '../types'
import {
  DEFAULT_GRADIENT,
  DEFAULT_FROM_COLOR,
  DEFAULT_TO_COLOR,
  DEFAULT_GRADIENT_SET,
  GRADIENT_COLOR_SET,
} from './constants'

const getGradientSet = (
  gradientSet = GradientSet.BRONZE,
  fromColor = '',
  toColor = '',
) => {
  switch (gradientSet) {
    case GradientSet.BRONZE:
      return GRADIENT_COLOR_SET[GradientSet.BRONZE]
    case GradientSet.SILVER:
      return GRADIENT_COLOR_SET[GradientSet.SILVER]
    case GradientSet.GOLD:
      return GRADIENT_COLOR_SET[GradientSet.GOLD]
    case GradientSet.DIAMOND:
      return GRADIENT_COLOR_SET[GradientSet.DIAMOND]
    case GradientSet.CUSTOM: {
      return {
        FROM: fromColor,
        TO: toColor,
      }
    }
    default:
      return GRADIENT_COLOR_SET[GradientSet.BRONZE]
  }
}

const BgGradient = ({
  gradientId = '',
  gradient = DEFAULT_GRADIENT,
  gradientSet = DEFAULT_GRADIENT_SET,
  fromColor: fromColorProp = DEFAULT_FROM_COLOR,
  toColor: toColorProp = DEFAULT_TO_COLOR,
}: BackgroundGradient) => {
  const { FROM: fromColor, TO: toColor } = getGradientSet(
    gradientSet,
    fromColorProp,
    toColorProp,
  )
  switch (gradient) {
    case Gradient.HORIZONTAL: {
      return (
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="0%" stopColor={fromColor} stopOpacity={1} />
            <stop offset="100%" stopColor={toColor} stopOpacity={1} />
          </linearGradient>
        </defs>
      )
    }
    case Gradient.RADIAL: {
      return (
        <defs>
          <radialGradient id={gradientId}>
            <stop offset="0%" stopColor={fromColor} stopOpacity={1} />
            <stop offset="100%" stopColor={toColor} stopOpacity={1} />
          </radialGradient>
        </defs>
      )
    }
    default:
      return null
  }
}

export default BgGradient
