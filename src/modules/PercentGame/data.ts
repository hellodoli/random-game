import { ICONS, ListPrizeItemOb } from 'modules/PercentGame/types'
import * as JE from 'components/Icons/Jewellery'

const JEWELLERY_ICONS_OB: ListPrizeItemOb = {
  [ICONS.GEMCHAIN]: {
    id: ICONS.GEMCHAIN,
    name: 'Gem Chain',
    icon: JE.GemChain,
  },
  [ICONS.TRAIBALPENDANT]: {
    id: ICONS.TRAIBALPENDANT,
    name: 'Traibal Pendant',
    icon: JE.TribalPendant,
  },
  [ICONS.OYSTERPEARL]: {
    id: ICONS.OYSTERPEARL,
    name: 'Oyster Pearl',
    icon: JE.OysterPearl,
  },
  [ICONS.EMERALD]: {
    id: ICONS.EMERALD,
    name: 'Emerald',
    icon: JE.Emerald,
  },
  [ICONS.POWER_RING]: {
    id: ICONS.POWER_RING,
    name: 'Power Ring',
    icon: JE.PowerRing,
  },
  [ICONS.DIAMOND_HILT]: {
    id: ICONS.DIAMOND_HILT,
    name: 'Diamond Hilt',
    icon: JE.DiamondHilt,
  },
  [ICONS.CROWN]: {
    id: ICONS.CROWN,
    name: 'Crown',
    icon: JE.Crown,
  },
  [ICONS.JEWELED_CHALICE]: {
    id: ICONS.JEWELED_CHALICE,
    name: 'Jeweled Chalice',
    icon: JE.JeweledChalice,
  },
  [ICONS.HEART_NECKLACE]: {
    id: ICONS.HEART_NECKLACE,
    name: 'Heart Necklace',
    icon: JE.HeartNecklace,
  },
}

const JEWELLERY_ICONS_ARR = Object.values(JEWELLERY_ICONS_OB)
export const DEFAULT_LIST_PRIZE_ARR = JEWELLERY_ICONS_ARR
export const DEFAULT_LIST_PRIZE_OB = JEWELLERY_ICONS_OB
