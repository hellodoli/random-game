import { addStylesheetRules, mirrorStyleEl, styleEl } from 'utils/stylesheet'

export interface MapCssProp {
  [key: string]: string
}

interface MirrorMapCssProp {
  [key: string]: MapCssProp
}

export interface GetMapCss {
  global?: boolean
  colorsGlobal?: boolean
  colorsGradient?: boolean
}

const defaultGetMapCss = {
  global: true,
  colorsGlobal: true,
  colorsGradient: true,
}

const CSS_GLOBAL: MapCssProp = {
  '--body-gap': '20px',
  '--modal-content-gap-x': '16px',
  '--modal-content-gap-y': '20px',
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

const MIRROR_CSS = getMirrorCss()

export const themeProviderClass = 'theme-provider-class'
export const themeProviderMirrorClass = 'theme-mirror-provider-class'

export function getMirrorCss(): MirrorMapCssProp {
  return {
    CSS_GLOBAL: { ...CSS_GLOBAL },
    COLORS_GLOBAL: { ...COLORS_GLOBAL },
    COLORS_GRADIENT: { ...COLORS_GRADIENT },
  }
}

const getCssVariablePick = (isMirror = false) => {
  return {
    CSS_GLOBAL: isMirror ? MIRROR_CSS['CSS_GLOBAL'] : CSS_GLOBAL,
    COLORS_GLOBAL: isMirror ? MIRROR_CSS['COLORS_GLOBAL'] : COLORS_GLOBAL,
    COLORS_GRADIENT: isMirror ? MIRROR_CSS['COLORS_GRADIENT'] : COLORS_GRADIENT,
  }
}

const getCssVariables = (
  injected: MapCssProp = {},
  getMapCss: GetMapCss = defaultGetMapCss,
  isMirror = false,
) => {
  const {
    global = true,
    colorsGlobal = true,
    colorsGradient = true,
  } = { ...defaultGetMapCss, ...getMapCss }
  const { CSS_GLOBAL, COLORS_GLOBAL, COLORS_GRADIENT } =
    getCssVariablePick(isMirror)
  return {
    ...(global && CSS_GLOBAL),
    ...(colorsGlobal && COLORS_GLOBAL),
    ...(colorsGradient && COLORS_GRADIENT),
    ...injected,
  }
}

const updateCssVariables = (injected: MapCssProp = {}, isMirror = false) => {
  const keys = Object.keys(injected)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = injected[key]
    const { CSS_GLOBAL, COLORS_GLOBAL, COLORS_GRADIENT } =
      getCssVariablePick(isMirror)
    if (CSS_GLOBAL[key]) {
      CSS_GLOBAL[key] = value
    } else if (COLORS_GLOBAL[key]) {
      COLORS_GLOBAL[key] = value
    } else if (COLORS_GRADIENT[key]) {
      COLORS_GRADIENT[key] = value
    }
  }
  console.log({
    MIRROR_CSS,
    CSS_GLOBAL,
    COLORS_GLOBAL,
    COLORS_GRADIENT,
  })
}

export const getStyleSheetRules = (
  injected: MapCssProp = {},
  getMapCss: GetMapCss = defaultGetMapCss,
  isMirror = false,
) => {
  const cssProps = getCssVariables(injected, getMapCss, isMirror)
  const keys = Object.keys(cssProps)
  const rules = []
  for (let i = 0; i < keys.length; i++) {
    const prop = keys[i]
    const value = cssProps[prop]
    rules.push([prop, value])
  }
  return rules
}

export const addTheme = ({
  injected = {},
  getMapCss = defaultGetMapCss,
  styleEl,
  classNameProvider,
  isUpdate = false,
  isMirror = false,
}: {
  injected?: MapCssProp
  getMapCss?: GetMapCss
  styleEl: HTMLStyleElement
  classNameProvider: string
  isUpdate?: boolean
  isMirror?: boolean
}) => {
  if (isUpdate) updateCssVariables(injected, isMirror)
  const injectedCss = isUpdate ? {} : injected
  const rules = getStyleSheetRules(injectedCss, getMapCss, isMirror)
  addStylesheetRules([[`.${classNameProvider}`, ...rules]], styleEl)
}

export const updateTheme = ({
  injected = {},
  styleEl,
  classNameProvider,
  isMirror = false,
}: {
  injected?: MapCssProp
  styleEl: HTMLStyleElement
  classNameProvider: string
  isMirror?: boolean
}) => {
  const styleSheet = styleEl?.sheet
  if (!styleSheet) return
  // delete previous rules
  styleSheet.deleteRule(0)
  addTheme({
    classNameProvider,
    styleEl,
    injected,
    isUpdate: true,
    isMirror,
  })
}

export const updateMirrortheme = (injected: MapCssProp = {}) => {
  updateTheme({
    styleEl: mirrorStyleEl,
    classNameProvider: themeProviderMirrorClass,
    isMirror: true,
    injected: injected,
  })
}

export const updateMainTheme = (injected: MapCssProp = {}) => {
  updateTheme({
    styleEl: styleEl,
    classNameProvider: themeProviderClass,
    injected: injected,
  })
}

export const resetMirrorCss = () => {
  const injectedArr = Object.values(getMirrorCss())
  const injected = injectedArr.reduce((cur, mapCss) => {
    cur = { ...cur, ...mapCss }
    return cur
  }, {})
  updateTheme({
    styleEl: mirrorStyleEl,
    classNameProvider: themeProviderMirrorClass,
    isMirror: true,
    injected,
  })
}
