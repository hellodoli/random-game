import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'
import { initialState } from '../slices/initState'

const selectSlice = (state: RootState) => state.percentGame || initialState

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
  [selectSlice],
  (state) => state.prizes,
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
  [selectSlice],
  (state) => state.setPrizes,
)

export const colorGradientSelector = createSelector(
  [selectSlice],
  (state) => state.rollColorGradient,
)
