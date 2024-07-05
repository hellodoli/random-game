import type { GetMapCss, MapCssProp, GlobalMapCssProp } from 'types/theme'
import { addStylesheetRules, mirrorStyleEl, styleEl } from 'utils/stylesheet'
import {
  getGlobalThemeFromStorage,
  getLocalStorage,
  STORAGE_KEYS,
  removeLocalStorage,
} from 'utils/storages'
import { GLOBAL_THEME, defaultGetMapCss } from '../constants'

// Global variables
const CSS_ROOT = getInitGlobalCss()
const CSS_GLOBAL: MapCssProp = { ...CSS_ROOT.CSS_GLOBAL }
const COLORS_GLOBAL: MapCssProp = { ...CSS_ROOT.COLORS_GLOBAL }
const COLORS_GRADIENT: MapCssProp = { ...CSS_ROOT.COLORS_GRADIENT }
const MIRROR_CSS = getMirrorCss()

const themeProviderClass = 'theme-provider-class'
const themeProviderMirrorClass = 'theme-mirror-provider-class'

export { themeProviderClass, themeProviderMirrorClass }

// function scope
export function getInitGlobalCss() {
  const clearTheme = () => {
    removeLocalStorage(STORAGE_KEYS.IS_REMEMBER_THEME)
    removeLocalStorage(STORAGE_KEYS.SETTING_GLOBAL_THEME)
  }
  const isRememberTheme = getLocalStorage(STORAGE_KEYS.IS_REMEMBER_THEME)
  const globalTheme = getGlobalThemeFromStorage()
  if (isRememberTheme && globalTheme) return globalTheme
  clearTheme()
  return GLOBAL_THEME
}
export function getMirrorCss(): GlobalMapCssProp {
  return {
    CSS_GLOBAL: { ...CSS_GLOBAL },
    COLORS_GLOBAL: { ...COLORS_GLOBAL },
    COLORS_GRADIENT: { ...COLORS_GRADIENT },
  }
}
export function getGlobalCss(
  { injected = {} }: { injected?: MapCssProp } = {
    injected: {},
  },
) {
  const cssGlobal = { ...CSS_GLOBAL }
  const colorsGlobal = { ...COLORS_GLOBAL }
  const colorsGradient = { ...COLORS_GRADIENT }
  const keys = Object.keys(injected)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = injected[key]
    if (cssGlobal[key]) {
      cssGlobal[key] = value
    } else if (colorsGlobal[key]) {
      colorsGlobal[key] = value
    } else if (colorsGradient[key]) {
      colorsGradient[key] = value
    }
  }
  return {
    CSS_GLOBAL: cssGlobal,
    COLORS_GLOBAL: colorsGlobal,
    COLORS_GRADIENT: colorsGradient,
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
    injected: injected,
    isMirror: true,
  })
}

export const updateMainTheme = (injected: MapCssProp = {}) => {
  updateTheme({
    styleEl: styleEl,
    classNameProvider: themeProviderClass,
    injected: injected,
    isMirror: false,
  })
}

const defaultParamsResetMirrorCss = {
  resetDefault: false,
}
export const getInjectedMirrorCss = (cssProp: GlobalMapCssProp) => {
  const injectedArr = Object.values(cssProp)
  return injectedArr.reduce((cur, mapCss) => {
    cur = { ...cur, ...mapCss }
    return cur
  }, {})
}
export const resetMirrorCss = ({
  resetDefault = false,
}: {
  resetDefault?: boolean
} = defaultParamsResetMirrorCss) => {
  const cssProp = !resetDefault ? getMirrorCss() : GLOBAL_THEME
  const injected = getInjectedMirrorCss(cssProp)
  updateTheme({
    styleEl: mirrorStyleEl,
    classNameProvider: themeProviderMirrorClass,
    isMirror: true,
    injected,
  })
}
