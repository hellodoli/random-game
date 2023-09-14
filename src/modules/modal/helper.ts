import { getDispatch } from 'utils/reduxStore'
import { modalActions } from './slices'

export const showModal = (type: string) => {
  return () => {
    const dispatch = getDispatch()
    const modal = { type }
    dispatch(modalActions.showModal({ modal }))
  }
}
