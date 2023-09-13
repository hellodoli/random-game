import React from 'react'
import { Shape } from 'types/enum/icon'
import { BackgroundShape } from '../types'
import { DEFAULT_BG_FILL, DEFAULT_DIMENSION, DEFAULT_SHAPE } from './constants'

const BgShape = ({
  shape = DEFAULT_SHAPE,
  bgFill = DEFAULT_BG_FILL,
  dimension = DEFAULT_DIMENSION,
}: BackgroundShape) => {
  const props = { fill: bgFill, fillOpacity: 1 }
  switch (shape) {
    case Shape.CIRCLE: {
      const r = dimension / 2
      return <circle {...props} cx={r} cy={r} r={r} />
    }
    case Shape.SQUARE: {
      return <path d="M0 0h512v512H0z" {...props} />
    }
    default:
      return (
        <rect {...props} height={dimension} width={dimension} rx={32} ry={32} />
      )
  }
}

export default BgShape
