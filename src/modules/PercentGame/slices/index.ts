import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initState'
import { ticketActions } from './actions/money'
import { rollActions } from './actions/roll'
import { modifyActions } from './actions/modify'
import { sortActions } from './actions/sort'
import { sellActions } from './actions/sell'
import { cutActions } from './actions/cut'
import { themeActions } from './actions/theme'
import { levelActions } from './actions/level'

export const slice = createSlice({
  initialState,
  name: 'percentGame',
  reducers: {
    resetState: () => initialState,
    ...themeActions,
    ...ticketActions,
    ...sortActions,
    ...rollActions,
    ...modifyActions,
    ...sellActions,
    ...cutActions,
    ...levelActions,
  },
})

export const { actions, reducer } = slice
