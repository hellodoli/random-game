import { Prize, Slots, ListPrizeOb } from './prize'
import { GradientSetColorFromTo } from 'types/enum/color'
import { MERGE_STATUS, META_STATUS } from './enum'

export interface MergeActions {
  pickUpPrizeToBagAfterMerge: boolean
}

export interface PercentGameState {
  money: number
  ticket: number
  isRolling: boolean
  progress: number
  prizes: ListPrizeOb
  setPrizes: ListPrizeOb
  prize: Prize | null
  prizeHover: Prize | null
  rollColorGradient: GradientSetColorFromTo | null
  slots: Slots
  mergeStatus: MERGE_STATUS
  mergeActions: MergeActions
  isSelling: boolean
  isCutting: boolean
  metaStatus: META_STATUS
  isMirror: boolean
}
