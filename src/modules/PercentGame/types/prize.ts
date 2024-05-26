import { GradientSet, Gradient } from 'types'
import { GameIcon } from 'components/Icons/types'
import { ICONS } from './icon'

export interface Prize {
  id: string
  iconId: ICONS
  iconName: string
  gradientSet: GradientSet
  gradient: Gradient
  number?: number
}
export type ListPrizeOb = { [key: string]: Prize }

export type OnMouseEnterPrize = (prize?: Prize | null) => void
export type OnMouseLeavePrize = () => void
export type OnSelectPrize = (id: string, slotId?: string) => void
export type IconSize = 'big' | 'medium' | 'small' | number
export interface Slot extends Prize {
  slotId: string
}
export type Slots = [null | Slot, null | Slot, null | Slot, null | Slot]

export interface PrizeItem {
  id: ICONS
  name: string
  icon: (props: GameIcon) => JSX.Element
}
export type ListPrizeItemOb = { [key in ICONS]: PrizeItem }

export type PrizeSet = {
  [key in GradientSet]: {
    consume: number
  }
}
