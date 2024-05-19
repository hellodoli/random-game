import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'types'

import { initialState } from '../slices'

import { MODAL_EXTRA_PROPS_DEFAULT } from '../constants'

const selectSlice = (state: RootState) => state.modal || initialState

export const selectModals = createSelector(
  [selectSlice],
  (state) => state.shows,
)

export const selectIsOpen = (type: string) =>
  createSelector([selectSlice], (state) => state.shows.includes(type))

export const selectModalExtraProps = (type: string) =>
  createSelector([selectSlice], (state) => {
    const modal = state.modals[type]
    return modal ? modal.modalExtraProps : MODAL_EXTRA_PROPS_DEFAULT
  })
