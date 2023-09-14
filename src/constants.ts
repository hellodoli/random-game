import { GradientColorSet } from 'types/enum/color'

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

export const GRADIENT_COLOR_SET_FROM_ENUM: GradientColorSet = {
  0: GRADIENT_COLOR_SET_DIAMOND,
  1: GRADIENT_COLOR_SET_GOLD,
  2: GRADIENT_COLOR_SET_SILVER,
  3: GRADIENT_COLOR_SET_BRONZE,
}

export const GRADIENT_COLOR_SET: GradientColorSet = {
  DIAMOND: GRADIENT_COLOR_SET_DIAMOND,
  GOLD: GRADIENT_COLOR_SET_GOLD,
  SILVER: GRADIENT_COLOR_SET_SILVER,
  BRONZE: GRADIENT_COLOR_SET_BRONZE,
}
