import { GradientSet, GradientSetColors, GlobalMapCssProp } from 'types'

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

export const GLOBAL_THEME: GlobalMapCssProp = {
  CSS_GLOBAL: {
    '--body-gap': '20px',
    '--modal-content-gap-x': '16px',
    '--modal-content-gap-y': '20px',
  },
  COLORS_GLOBAL: {
    '--color-primary': '#108ee9',
    '--color-secondary': '#87d068',
    '--color-black': '#000',
    '--color-white': '#fff',
  },
  COLORS_GRADIENT: {
    '--color-gradient-1-start': '#ff4d82',
    '--color-gradient-1-end': '#722ed1',
    '--color-gradient-diamond-from': '#87d068',
    '--color-gradient-diamond-to': '#ff4d82',
    '--color-gradient-gold-from': '#a67c00',
    '--color-gradient-gold-to': '#ffbf00',
    '--color-gradient-silver-from': '#afafaf',
    '--color-gradient-silver-to': '#c0c2ce',
    '--color-gradient-bronze-from': '#cd8500',
    '--color-gradient-bronze-to': '#a0522d',
  },
}
export const defaultGetMapCss = {
  global: true,
  colorsGlobal: true,
  colorsGradient: true,
}
