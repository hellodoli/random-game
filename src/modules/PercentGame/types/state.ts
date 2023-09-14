import { Prize, Slots } from './prize'
import { GradientColorFromTo } from 'types/enum/color'

export interface PercentGameState {
  money: number
  ticket: number
  isRolling: boolean
  progress: number
  prizes: Prize[]
  setPrizes: Prize[]
  prize: Prize | null
  prizeHover: Prize | null
  rollColorGradient: GradientColorFromTo | null
  slots: Slots
}
