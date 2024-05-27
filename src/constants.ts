import { GradientSet, GradientSetColors } from 'types'

const GRADIENT_COLOR_SET_DIAMOND = {
  // #87d068 -> #ff4d82
  FROM: 'var(--color-gradient-diamond-from)',
  TO: 'var(--color-gradient-diamond-to)',
}
const GRADIENT_COLOR_SET_GOLD = {
  // #a67c00 -> #ffbf00
  FROM: 'var(--color-gradient-gold-from)',
  TO: 'var(--color-gradient-gold-to)',
}
const GRADIENT_COLOR_SET_SILVER = {
  // #afafaf -> #c0c2ce
  FROM: 'var(--color-gradient-silver-from)',
  TO: 'var(--color-gradient-silver-to)',
}
const GRADIENT_COLOR_SET_BRONZE = {
  // #cd8500 -> #a0522d
  FROM: 'var(--color-gradient-bronze-from)',
  TO: 'var(--color-gradient-bronze-to)',
}

export const GRADIENT_COLOR_SET: GradientSetColors = {
  [GradientSet.DIAMOND]: GRADIENT_COLOR_SET_DIAMOND,
  [GradientSet.GOLD]: GRADIENT_COLOR_SET_GOLD,
  [GradientSet.SILVER]: GRADIENT_COLOR_SET_SILVER,
  [GradientSet.BRONZE]: GRADIENT_COLOR_SET_BRONZE,
  [GradientSet.CUSTOM]: GRADIENT_COLOR_SET_BRONZE,
}

export const DEFAULT_GRADIENT_COLOR_SET = GRADIENT_COLOR_SET[GradientSet.BRONZE]
