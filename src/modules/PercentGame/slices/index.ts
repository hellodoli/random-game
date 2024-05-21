import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initState'
import { moneyActions } from './actions/money'
import { rollActions } from './actions/roll'
import { modifyActions } from './actions/modify'
import { sortActions } from './actions/sort'

export const slice = createSlice({
  initialState,
  name: 'percentGame',
  reducers: {
    resetState: () => {
      return initialState
    },
    ...moneyActions,
    ...sortActions,
    ...rollActions,
    ...modifyActions,
  },
})

export const { actions, reducer } = slice
