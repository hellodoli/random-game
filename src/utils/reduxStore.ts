import store from '../configStore'
import { RootState } from '../types'

export const getDispatch = () => store.dispatch

export const getState = (): RootState => store.getState() as RootState
