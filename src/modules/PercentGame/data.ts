import { ICONS, PrizeListOb } from 'modules/PercentGame/types'
import {
  TribalPendant,
  OysterPearl,
  GemChain,
  Emerald,
  PowerRing,
} from 'components/Icons/Jewellery'

const JEWELLERY_ICONS_OB: PrizeListOb = {
  [ICONS.GEMCHAIN]: {
    id: ICONS.GEMCHAIN,
    name: 'Gem Chain',
    icon: GemChain,
  },
  [ICONS.TRAIBALPENDANT]: {
    id: ICONS.TRAIBALPENDANT,
    name: 'Traibal Pendant',
    icon: TribalPendant,
  },
  [ICONS.OYSTERPEARL]: {
    id: ICONS.OYSTERPEARL,
    name: 'Oyster Pearl',
    icon: OysterPearl,
  },
  [ICONS.EMERALD]: {
    id: ICONS.EMERALD,
    name: 'Emerald',
    icon: Emerald,
  },
  [ICONS.POWER_RING]: {
    id: ICONS.POWER_RING,
    name: 'Power Ring',
    icon: PowerRing,
  },
}

const JEWELLERY_ICONS_ARR = Object.values(JEWELLERY_ICONS_OB)
export const DEFAULT_LIST_PRIZE_ARR = JEWELLERY_ICONS_ARR
export const DEFAULT_LIST_PRIZE_OB = JEWELLERY_ICONS_OB
