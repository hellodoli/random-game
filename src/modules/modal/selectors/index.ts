import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'types'

import { initialState } from '../slices'

const selectSlice = (state: RootState) => state.modal || initialState

export const selectModals = createSelector(
  [selectSlice],
  (state) => state.shows,
)

export const selectIsOpen = (type: string) =>
  createSelector([selectSlice], (state) => state.shows.includes(type))
