import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _unset from 'lodash/unset'
import { ModalState, Modal } from '../types'

export const initialState: ModalState = {
  shows: [],
  modals: {},
}

export const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state: ModalState, action: PayloadAction<{ modal: Modal }>) {
      const { modal } = action.payload
      if (!state.shows.includes(modal.type)) {
        state.shows.push(modal.type)
      }
      state.modals[modal.type] = modal
    },
    hideModal(state: ModalState, action: PayloadAction<{ type: string }>) {
      const { type } = action.payload
      state.shows = state.shows.filter((item) => item !== type)
      _unset(state.modals, type)
    },
    hideAllModal(state: ModalState) {
      state.shows = []
      state.modals = {}
    },
  },
})

export const { actions: modalActions } = slice
