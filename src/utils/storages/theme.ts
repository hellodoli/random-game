import {
  removeLocalStorage,
  setLocalStorage,
  getLocalStorage,
} from './localStorage'
import { STORAGE_KEYS } from './storageKeys'
import { GlobalMapCssProp } from 'types/theme'

export const saveLocalStorageByCheckbox = (checked = false, key = '') => {
  if (!key) return
  removeLocalStorage(key)
  if (checked) setLocalStorage(key, `${checked}`)
}

export const getGlobalThemeFromStorage = () => {
  try {
    const globalThemeStorage =
      getLocalStorage(STORAGE_KEYS.SETTING_GLOBAL_THEME) || ''
    const globalTheme = JSON.parse(globalThemeStorage)
    if (
      typeof globalTheme === 'object' &&
      globalTheme.CSS_GLOBAL &&
      globalTheme.COLORS_GLOBAL &&
      globalTheme.COLORS_GRADIENT
    )
      return globalTheme as GlobalMapCssProp
    return null
  } catch (error) {
    return null
  }
}
