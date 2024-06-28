import { styleEl, mirrorStyleEl } from 'utils/stylesheet'
import {
  addTheme,
  themeProviderClass,
  themeProviderMirrorClass,
} from 'utils/settings'

addTheme({ styleEl, classNameProvider: themeProviderClass })
addTheme({
  styleEl: mirrorStyleEl,
  classNameProvider: themeProviderMirrorClass,
})

const GlobalTheme = () => {
  return null
}

export default GlobalTheme
