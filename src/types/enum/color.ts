import { GradientSet } from 'types/enum/icon'
export interface GradientColorFromTo {
  FROM: string
  TO: string
}

export interface GradientColorSet {
  [key: string]: GradientColorFromTo
}

export interface GradientSetColorFromTo {
  FROM: string
  TO: string
}

export type GradientSetColors = {
  [key in GradientSet]?: GradientSetColorFromTo
}
