import { GradientSet, Gradient } from 'types'
import { ICONS } from './enum'

export type OnMouseEnterPrize = (prize?: Prize | null) => void
export type OnMouseLeavePrize = () => void
export type IconSize = 'big' | 'medium' | 'small' | number
export interface Prize {
  id: string
  iconId: ICONS
  iconName: string
  gradientSet: GradientSet
  gradient: Gradient
  number?: number
}
