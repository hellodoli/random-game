import { GradientSet } from 'types/enum/icon'

export interface GradientSetColorFromTo {
  FROM: string
  TO: string
}

export type GradientSetColors = {
  [key in GradientSet]: GradientSetColorFromTo
}
