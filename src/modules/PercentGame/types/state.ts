import { Prize, Slots } from './prize'
import { GradientColorFromTo } from 'types/enum/color'
import { MERGE_STATUS } from './enum'

export interface MergeActions {
  pickUpPrizeToBagAfterMerge: boolean
}

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
  mergeStatus: MERGE_STATUS
  mergeActions: MergeActions
}
