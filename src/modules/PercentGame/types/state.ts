import { Prize } from './prize'
import { GradientSet } from 'types/enum/color'

export interface PercentGameState {
  money: number
  ticket: number
  isRolling: boolean
  progress: number
  prizes: Prize[]
  setPrizes: Prize[]
  prize: Prize | null
  prizeHover: Prize | null
  rollColorGradient: GradientSet | null
}
