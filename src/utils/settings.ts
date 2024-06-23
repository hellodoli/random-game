import { addStylesheetRules, getStyleSheet } from 'utils/stylesheet'

interface MapCssProp {
  [key: string]: string
}

const CSS_GLOBAL: MapCssProp = {
  '--body-gap': '20px',
}

const COLORS_GLOBAL: MapCssProp = {
  '--color-primary': '#108ee9',
  '--color-secondary': '#87d068',
  '--color-black': '#000',
  '--color-white': '#fff',
}

const COLORS_GRADIENT: MapCssProp = {
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

const getCssVariables = (injected: MapCssProp = {}) => {
  return {
    ...CSS_GLOBAL,
    ...COLORS_GLOBAL,
    ...COLORS_GRADIENT,
    ...injected,
  }
}

const getStyleSheetRules = (injected: MapCssProp = {}) => {
  const cssProps = getCssVariables(injected)
  const keys = Object.keys(cssProps)
  const rules = []
  for (let i = 0; i < keys.length; i++) {
    const prop = keys[i]
    const value = cssProps[prop]
    rules.push([prop, value])
  }
  return rules
}

export const addTheme = (injected: MapCssProp = {}) => {
  const rules = getStyleSheetRules(injected)
  console.log({ rules })
  addStylesheetRules([[`.${themeProviderClass}`, ...rules]])
}

export const removeTheme = () => {
  const s = getStyleSheet()
  if (s) {
    s.deleteRule(0)
    addTheme({
      '--color-primary': 'red',
      '--color-secondary': 'yellow',
      '--color-black': '#000',
      '--color-white': '#fff',
    })
  }
}
