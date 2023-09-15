import { GradientSet, Gradient } from 'types'
import { GameIcon } from 'components/Icons/types'
import { ICONS } from './enum'

export interface Prize {
  id: string
  iconId: ICONS
  iconName: string
  gradientSet: GradientSet
  gradient: Gradient
  number?: number
}

export type OnMouseEnterPrize = (prize?: Prize | null) => void
export type OnMouseLeavePrize = () => void
export type OnSelectPrize = (id: string) => void
export type IconSize = 'big' | 'medium' | 'small' | number
export type Slots = [null | Prize, null | Prize, null | Prize, null | Prize]

export interface PrizeItem {
  id: ICONS
  name: string
  icon: (props: GameIcon) => JSX.Element
}
export type PrizeListOb = { [key in ICONS]: PrizeItem }
