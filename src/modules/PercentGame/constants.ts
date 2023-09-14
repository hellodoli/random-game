import {
  GRADIENT_COLOR_SET,
  GRADIENT_COLOR_SET_FROM_ENUM,
} from '../../constants'
import { GameIcon } from 'components/Icons/types'
import {
  ROLL_TYPE,
  RESULT_ROLL_TYPE,
  ICONS,
} from 'modules/PercentGame/types/enum'
import {
  TribalPendant,
  OysterPearl,
  GemChain,
  Emerald,
  PowerRing,
} from 'components/Icons/Jewellery'

export { GRADIENT_COLOR_SET, GRADIENT_COLOR_SET_FROM_ENUM }

/**
 * default state value
 */
export const DEFAULT_TICKET_PRICE = 5
export const DEFAULT_TICKET_NUMBER = 128
export const DEFAULT_MONEY = 0
export const DEFAULT_ROLL_TYPE = ROLL_TYPE.BRONZE
export const DEFAULT_LIST_ROLL_BTN = [
  {
    id: 1,
    rollType: ROLL_TYPE.BRONZE,
    consume: 1,
    rates: [
      { rate: 92, type: RESULT_ROLL_TYPE.BRONZE },
      { rate: 2, type: RESULT_ROLL_TYPE.NOTHING },
      { rate: 5, type: RESULT_ROLL_TYPE.SILVER },
      { rate: 1, type: RESULT_ROLL_TYPE.GOLD },
    ],
  },
  {
    id: 2,
    rollType: ROLL_TYPE.SILVER,
    consume: 4,
    rates: [
      { rate: 92, type: RESULT_ROLL_TYPE.SILVER },
      { rate: 2, type: RESULT_ROLL_TYPE.NOTHING },
      { rate: 5, type: RESULT_ROLL_TYPE.GOLD },
      { rate: 1, type: RESULT_ROLL_TYPE.DIAMOND },
    ],
  },
  {
    id: 3,
    rollType: ROLL_TYPE.GOLD,
    consume: 16,
    rates: [
      { rate: 93, type: RESULT_ROLL_TYPE.GOLD },
      { rate: 5, type: RESULT_ROLL_TYPE.DIAMOND },
      { rate: 2, type: RESULT_ROLL_TYPE.NOTHING },
    ],
  },
  {
    id: 4,
    rollType: ROLL_TYPE.DIAMOND,
    consume: 64,
    rates: [
      { rate: 98, type: RESULT_ROLL_TYPE.DIAMOND },
      { rate: 2, type: RESULT_ROLL_TYPE.NOTHING },
    ],
  },
]

/**
 * prize item
 */
interface PrizeItem {
  id: ICONS
  name: string
  icon: (props: GameIcon) => JSX.Element
}
type PrizeListOb = { [key in ICONS]: PrizeItem }

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
