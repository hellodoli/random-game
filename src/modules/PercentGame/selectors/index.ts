import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'
import { initialState } from '../slices/initState'

const selectSlice = (state: RootState) => state.percentGame || initialState

export const listPrizeObSelector = createSelector(
  [selectSlice],
  (state) => state.prizes,
)

export const listSetPrizeObSelector = createSelector(
  [selectSlice],
  (state) => state.setPrizes,
)

export const moneySelector = createSelector(
  [selectSlice],
  (state) => state.money || 0,
)

export const ticketSelector = createSelector(
  [selectSlice],
  (state) => state.ticket || 0,
)

export const isRollingSelector = createSelector(
  [selectSlice],
  (state) => state.isRolling || false,
)

export const progressSelector = createSelector(
  [selectSlice],
  (state) => state.progress || 0,
)

export const prizesSelector = createSelector(
  [listPrizeObSelector],
  (listPrizeOb) => Object.values(listPrizeOb),
)

export const slotsSelector = createSelector(
  [selectSlice],
  (state) => state.slots,
)

export const prizeSelector = createSelector(
  [selectSlice],
  (state) => state.prize,
)

export const prizeHoverSelector = createSelector(
  [selectSlice],
  (state) => state.prizeHover,
)

export const prizeNameHoverSelector = createSelector(
  [selectSlice],
  (state) => state.prizeHover?.iconName || '',
)

export const prizeIconIdHoverSelector = createSelector(
  [selectSlice],
  (state) => state.prizeHover?.iconId,
)

export const prizeGradientHoverSelector = createSelector(
  [selectSlice],
  (state) => state.prizeHover?.gradient,
)

export const prizeGradientSetHoverSelector = createSelector(
  [selectSlice],
  (state) => state.prizeHover?.gradientSet,
)

export const setPrizesSelector = createSelector(
  [listSetPrizeObSelector],
  (listPrizeOb) => Object.values(listPrizeOb),
)

export const colorGradientSelector = createSelector(
  [selectSlice],
  (state) => state.rollColorGradient,
)

export const mergeStatusSelector = createSelector(
  [selectSlice],
  (state) => state.mergeStatus,
)

export const mergeActionsSelector = createSelector(
  [selectSlice],
  (state) => state.mergeActions,
)

export const pickUpPrizeAfterMergeSelector = createSelector(
  [selectSlice],
  (state) => state.mergeActions?.pickUpPrizeToBagAfterMerge || false,
)

export const isSellingSelector = createSelector(
  [selectSlice],
  (state) => state.isSelling,
)

export const isCuttingSelector = createSelector(
  [selectSlice],
  (state) => state.isCutting,
)

export const metaStatusSelector = createSelector(
  [selectSlice],
  (state) => state.metaStatus,
)

export const isDisabledActionSelector = createSelector(
  [selectSlice],
  (state) => state.isSelling || state.isCutting || false,
)

export const isMirrorSelector = createSelector(
  [selectSlice],
  (state) => state.isMirror,
)

export const curLevelSelector = createSelector(
  [selectSlice],
  (state) => state.curLevel,
)

export const curExpSelector = createSelector(
  [selectSlice],
  (state) => state.curExp,
)
