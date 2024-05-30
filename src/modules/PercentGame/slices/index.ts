import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initState'
import { ticketActions } from './actions/money'
import { rollActions } from './actions/roll'
import { modifyActions } from './actions/modify'
import { sortActions } from './actions/sort'
import { sellActions } from './actions/sell'
import { cutActions } from './actions/cut'

export const slice = createSlice({
  initialState,
  name: 'percentGame',
  reducers: {
    resetState: () => {
      return initialState
    },
    ...ticketActions,
    ...sortActions,
    ...rollActions,
    ...modifyActions,
    ...sellActions,
    ...cutActions,
  },
})

export const { actions, reducer } = slice
