import { addStylesheetRules } from 'utils/stylesheet'

interface Map {
  [key: string]: string
}

const CSS_GLOBAL: Map = {
  '--body-gap': '20px',
}

const COLORS_GLOBAL: Map = {
  '--color-primary': '#108ee9',
  '--color-secondary': '#87d068',
  '--color-black': '#000',
  '--color-white': '#fff',
}

const COLORS_GRADIENT: Map = {
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
}

export const themeProviderClass = 'theme-provider-class'

export const getDefaultCssVariables = () => {
  return {
    ...CSS_GLOBAL,
    ...COLORS_GLOBAL,
    ...COLORS_GRADIENT,
  }
}

const getGlobalCssVariablesRule = () => {
  const cssProps = getDefaultCssVariables()
  const keys = Object.keys(cssProps)
  const rules = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = cssProps[key]
    rules.push([key, value])
  }
  return rules
}

export const addTheme = () => {
  const rules = getGlobalCssVariablesRule()
  console.log({ rules })
  addStylesheetRules([[`.${themeProviderClass}`, ...rules]])
}
